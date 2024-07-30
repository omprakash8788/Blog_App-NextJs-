import { ConnectDB } from "@/lib/config/db";
import emailModel from "@/lib/models/EmailModel";
import { NextResponse } from "next/server";

// connect db - Now we will get the support of data base connection in this file
const LoadDB = async () => {
  await ConnectDB();
};

LoadDB();

// now here we have create the custome header function for the delete method , and post method , and get method

// 1. first we will create the post method. using this we can store the email id in db.
export async function POST(request) {
  const formData = await request.formData(); // using this what we are sending in the formData that will be store in the formData variable
  // after that we will create the formate for email data
  const emailData = {
    // here we will enter the email fields
    email: `${formData.get("email")}`, //here we have to provide the email id that will be get from the fromData, inside get('') we provide field name , that will be email
  };
  // our email data is ready , after creating the emailData we have to save the emailData in db, for that we will use our emailModel, so import it

  // here we can use our emailModel
  await emailModel.create(emailData); // using this our email will be save in our database.
  // after storing an email we will generating a response.

  return NextResponse.json({ success: true, msg: "Email Subscribed" });

  // Our post method is ready.
  // now we have linked the component , so open the component folders and go inside Headers.jsx component.
}


// get email from db
export async function GET(request){
    // here we have to find the all email from the db
    const emails = await emailModel.find({}); // here we need all email so just add {} 
    // after that in this emails variable get all the email from db
    // now we will generate response
    return NextResponse.json({emails}) ;
    // our api endpoints is ready for get method. where we have all the subscribe email

    // Now go inside Subscriptions/page.js file.


}


// delete method.
export async function DELETE(request){
    // in this request we will pass the mongoId from the admin panel , using that mongoId we will delete particular email data from the database.

    // first we have to get mongoId
    const id = await request.nextUrl.searchParams.get("id");
    await emailModel.findByIdAndDelete(id);
    return NextResponse.json({success:true, msg:"Email Deleted"})
}
