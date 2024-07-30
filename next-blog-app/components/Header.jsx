import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {
  //1 create state variable
  const [email, setEmail]=useState("");
  //2 Now we will linked this state with our input fields

  // 4. for form tag we have to create onSubmit function.
  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    //5. Now we write the logic using that we can send  the input field data on our email api.

    // first we have to create formData
    const formData = new FormData();
    // after that in this form Data object we will add the input field value 
    formData.append("email", email)  // email is a field name

    // Now using this formData we will make api call
    const response = await axios.post('/api/email',formData);

    // now we will check the response , it is true or not.
    if(response.data.success){
      toast.success(response.data.msg)
      // if response is success then we will clear the input field
      setEmail("")
    }
    else{
      toast.error("Error")
      
    }

  }

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <Image
          src={assets.logo}
          width={180}
          alt="logo"
          className="w-[130px] sm:w-auto"
        />
        <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000]">
          Get started <Image src={assets.arrow} />
        </button>
      </div>
      <div className="text-center my-8">
        <h1 className="text-3xl sm:text-5xl font-medium">Latest Blogs</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsum
          expedita nihil tenetur? Minus, placeat ipsa!
        </p>
        <form onSubmit={onSubmitHandler}
          className="flex justify-between max-w-[500px] scale-50 sm:scale-100 mx-auto mt-10 border border-solid border-black shadow-[-7px_7px_0px_#000000]"
          action=""
        >
          <input
            type="email"
            placeholder="Enter Your Email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            className="pl-4 outline-none"
            //3. whatever we will add in this input fields that data will be store in state 
          />
          <button
            type="submit"
            className="border-l border-black py-4 px-4 sm:px-8 active:bg-gray-600 active:text-white"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
