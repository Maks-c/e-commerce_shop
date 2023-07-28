import {model, models, Schema} from "mongoose";

const OrderSchema=new Schema({
    line_items:Object,
    name:String,
    email:String,
    postalCode:String,
    city:String,
    streetAddress:String,
    country:String,
    paid:Boolean
},{timestamps:true})


export const Order=models?.Order || model('Order',OrderSchema)