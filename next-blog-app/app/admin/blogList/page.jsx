"use client"

import BlogTableItem from '@/components/AdminComponents/BlogTableItem'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  // here we create state variable where can i store all blog data.
  const [blogs, setBlogs]=useState([])
  // after that we will create asyn function where we can hit our endpoint
  const fetchBlogs=async()=>{
    const response = await axios.get('/api/blog');
    // after that we will get the blog data in this response then we will store that blog data in blogs state so just add setters function setBlogs
    setBlogs(response.data.blogs)
  }

  // for delete 
  const deleteBlog = async(mongoId)=>{
    //  we have to pass this function in BlogTableItem.jsx component 
    const response = await axios.delete('/api/blog', {
      params:{
        id:mongoId
      }
    })
    // display one toast notification
    toast.success(response.data.msg);
    fetchBlogs();
    // now we have send this function in the BlogTableItem component using props

  }
  // after that we run this function so we will use useEffect
  useEffect(()=>{
    fetchBlogs()
  },[])

  // Now we have to render this blogs table items using this blogs array

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
       <h1>All blogs</h1>
       <div className='relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
        <table className='w-full text-sm text-gray-500'>
          <thead className='text-sm text-gray-700 text-left uppercase bg-gray-50'>
            <tr>
              <th scope='col' className='hidden sm:block px-6 py-3'> Author Name</th>
              <th scope='col' className='px-6 py-3'>Blog Title</th>
              <th scope='col' className='px-6 py-3'>Date</th>
              <th scope='col' className='px-6 py-3'>Action</th>
           
            </tr>
          </thead>
          <tbody>
            {blogs.map((item, index)=>{
              return <BlogTableItem key={index} deleteBlog={deleteBlog} mongoId={item._id} title={item.title} author={item.author} authorImg={item.authorImg} date={item.date} />
            })}
          </tbody>
        </table>
       </div>
    </div>
  )
}

export default page