import mongoose from "mongoose";

export const ConnectDB = async ()=>{
    // setup mongoose db
    // connect mongoose 
    await mongoose.connect('mongodb+srv://food:food@cluster0.1u3ejlu.mongodb.net/blog-app')
    console.log("DB Connected");
}