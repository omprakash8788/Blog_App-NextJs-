// first we will create schema for emailModel

import mongoose from "mongoose";

const schema = new mongoose.Schema({
    // for this object we will create two fields that will be email id and date
    email:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default:Date.now()

    }
})

// using this schema we will create our emailModel

const emailModel = mongoose.models.email || mongoose.model('email',schema); // here we can get one error because when we run the project it will try to create the emailModel again and again , so first we will check our model is available 

// after that we will go in api folder , 


export default emailModel;
