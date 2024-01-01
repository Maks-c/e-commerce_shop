import {mongooseConnect} from "../../lib/mongoose";
import {Setting} from "../../models/Setting";


export default async function handle(req,res){
    await mongooseConnect()
 const {name}=req.query
    res.json(await Setting.findOne({name}))



}

