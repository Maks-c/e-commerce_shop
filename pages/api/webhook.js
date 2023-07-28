import {mongooseConnect} from "../../lib/mongoose";

const stripe = require('stripe')(process.env.STRIPE_SK);
import {buffer} from "micro";
import {Order} from "../../models/Orders";

const endpointSecret = "whsec_af325980ff879489b348bdc48f3452911b9aa9b3f42d6357628ed07df3839800";


export default async function handler(req, res){
    await mongooseConnect()
    const sig = req.headers['stripe-signature'];

    let event;

    try{
        event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
    } catch (err){
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type){
        case 'checkout.session.completed':
            const data = event.data.object;
            const orderId = data.metadata.orderId
            const paid=data.payment_status==="paid";
            if(orderId&&paid){
              await  Order.findByIdAndUpdate(orderId,{
                  paid:true
              })
            }
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    res.status(200).send('ok')
}


export const config = {
    api: {bodyParser: false}
}