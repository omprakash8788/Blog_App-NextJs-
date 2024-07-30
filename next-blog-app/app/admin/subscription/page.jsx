"use client"

import SubscriptionTableItem from '@/components/AdminComponents/SubscriptionTableItem'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {
  // to store the api data first we create the state variable
  const [emails, setEmails]=useState([])

  // fetch email
  const fetchEmails=async()=>{
    const response = await axios.get('/api/email') // using this we will get all email response here
    // Now we have to save the email data in the state variable
    setEmails(response.data.emails) // using this our email store in the emails variable
    // Now call the fetchEmails function so we use useEffect hooks.

  }
  // Delete email function
  const deleteEmail = async (mongoId)=>{
    // after that we will create one api endpoint for the delete method, so open email/route.js file.
    // in this function we will use the endpoints to delete the email
    const response = await axios.delete("/api/email",{
      params:{
        id:mongoId
      }
    })
    if(response.data.success){
      // when we have deleted the email id and it will generate the toast notification , after that gain we have to called the fetchEmails() function so that it will update the new data on the admin dashboard., after that toast.success simply we called fetchEmails();
      toast.success(response.data.msg)
      fetchEmails();  // 
    }
    else{
      toast.error("Error")
    }
    // Now we link this delete function to SubscriptionTableItem.jsx 

  }
  useEffect(()=>{
    fetchEmails()
  },[])


  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16'>
      <h1>All subscriptions</h1>
      <div className='relative max-w-[600px] h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
         <table className='w-full text-sm text-gray-500'>
              <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Email Subscription
                    </th>
                    <th scope='col' className='px-6 py-3 hidden sm:block'>
                      Data
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Action
                    </th>
                  </tr>
              </thead>
              <tbody>
                {emails.map((item, index)=>{
                   return <SubscriptionTableItem key={index} mongoId={item._id} email={item.email} date={item.date} deleteEmail={deleteEmail}/>
                })}
               
              </tbody>
         </table>
      </div>

    </div>
  )
}

export default page