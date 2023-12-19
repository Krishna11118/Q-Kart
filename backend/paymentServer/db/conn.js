import mongoose from "mongoose";
// import * as dotenv from 'dotenv' 
// dotenv.config()

mongoose.set('strictQuery', true);
export default async function connect(){
    mongoose.connect("mongodb+srv://Durgesh:Durgesh02042001@cluster0.skc6gmq.mongodb.net/?retryWrites=true&w=majority")
    console.log("Database Connected")
}