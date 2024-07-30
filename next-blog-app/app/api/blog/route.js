import { ConnectDB } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import { writeFile } from "fs/promises";

const fs = require('fs')

const { NextResponse } = require("next/server");

const LoadBD = async () => {
  // we will use this LoadBD to connect database.
  await ConnectDB();
};
LoadBD();

// API endpoints to get all blogs
export async function GET(request) {
  const blogId = request.nextUrl.searchParams.get('id') // keyname that is id
  // from our frontend we are getting one request where we will send the mongo id , in the backend we will store the id in blogId variable.
  if(blogId){
    const blog = await BlogModel.findById(blogId)
    // generate response
    return NextResponse.json(blog);
  }
  else{

    const blogs=await BlogModel.find({});
    return NextResponse.json({blogs}); // here in json we will pass new object where we pass the blogs
  }

}

// API Endpoints for Uploading the Blogs

// custom function for post request
export async function POST(request) {
  // in this function we will add the logic for store blog data in the database
  const formData = await request.formData();
  const timestamp = Date.now();

  const image = formData.get("image");

  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  //  now we have to define the path where we want to store the image
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const imageUrl = `/${timestamp}_${image.name}`;
//   console.log(imageUrl);
  const blogData= {
      title:`${formData.get('title')}`,
      description:`${formData.get('description')}`,
      category:`${formData.get('category')}`,
      author:`${formData.get('author')}`,
      image:`${imageUrl}`,
      authorImg:`${formData.get('authorImg')}`,

  }
  await BlogModel.create(blogData);
  console.log('Blog saved');

  return NextResponse.json({success:true, msg:"Blog Added"});
}

// creating API Endpoints to delete Blog
export async function DELETE(request){
  // To delete any blog we need the blog id ,so from the frontend we will get the blog id as a parameters and it will be sent on the backend in this delete methods
  // so first we get the id
  const id = await request.nextUrl.searchParams.get('id'); // so when we will sent the delete request from the admin panel we will send the mongo db id with the id key.

  // using this id variable we first finding blog
  const blog= await BlogModel.findById(id);
  // after that what we have to do , we have to take the image url of the blog and delete from the public folder.
  // so now we have to delete image from public folder
  fs.unlink(`./public${blog.image}`, ()=>{})
    // fs.unlink(`../../../public${blog.image}`,()=>{})
  // after that we have to delete blog from mongo db
  await BlogModel.findByIdAndDelete(id);
  return NextResponse.json({msg:"Blog Deleted"})

}
