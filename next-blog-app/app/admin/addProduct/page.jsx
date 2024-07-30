"use client";
import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(false);
  // in this state we will store our data
  const [data, setData] = useState({
    // here we will define the structure of data variable
    title: "",
    description: "",
    category: "Startup",
    author: "Om",
    authorImg: "/author_img.png", // this is coming from public folder
  });
  // now we have to save these inputs fields , for that we will use controller component so first we will create one function
  const onChangeHandler = (event) => {
    // using this event we will extract the name and value property.
    const name = event.target.name;
    // then we will extract the value
    const value = event.target.value;
    setData((data) => ({ ...data, [name]:value }));
    // now we have create the onChangeHandler function
    // console.log(data);
    // now we will link this function to our input fields.
  };
  const onSubmitHandler = async (e) => {
    // and we will link this function to form
    e.preventDefault();
    // now we will add the logic so that we can called the API that we have created in the blog api, using that api we can store the data in our mongoDB database
    // for that first we create one form data that will send on our backend.
    const formData = new FormData();
    // first we will add title in the formData
    formData.append("title", data.title); //in append we provide two items, first is field name ,second is data with title
    // similar for description, category, author, authorImage
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("author", data.author);
    formData.append("authorImg", data.authorImg);
    // we are stroing image in image state.
    formData.append("image", image);
    // we have created the form data.
    // After that we will send the form data on the API
    // To send the data on API we will use axios
    const response = await axios.post("/api/blog", formData); //on post we are providing two things our api url and our formData.

    // now we add if else statement
    if (response.data.success) {
      toast.success(response.data.msg);
      setImage(false);
      setData({
        title: "",
        description: "",
        category: "Startup",
        author: "Om",
        authorImg: "/author_img.png",
      });
    } else {
      toast.error("Error");
    }
  };

  return (
    <>
      <form onSubmit={onSubmitHandler} className="pt-5 px-5 sm:pt-12 sm:pl-16">
        <p className="text-xl">Upload Thumbnails</p>
        <label htmlFor="image">
          <Image
            className="mt-4"
            src={!image ? assets.upload_area : URL.createObjectURL(image)}
            width={140}
            height={70}
            alt=""
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        {/*blogs title*/}
        <p className="text-xl mt-4">Blog title</p>
        <input
          name="title"
          onChange={onChangeHandler}
          value={data.title}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="Type here"
          required
        />
        {/*Blog Description  */}
        <p className="text-xl mt-4">Blog Description</p>
        <textarea
          name="description"
          onChange={onChangeHandler}
          value={data.description}
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border"
          type="text"
          placeholder="write content here"
          rows={6}
          required
        />
        {/* Blog category */}
        <p className="text-xl mt-4">Blog category</p>
        <select
          onChange={onChangeHandler}
          value={data.category}
          className="w-40 mt-4 px-4 py-3 border text-gray-500"
          name="category"
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button className="mt-8 w-40 h-12 bg-black text-white" type="submit">
          ADD
        </button>
      </form>
    </>
  );
};

export default page;

