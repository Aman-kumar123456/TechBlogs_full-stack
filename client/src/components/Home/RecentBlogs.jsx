import React from 'react'
import BlogCard from '../Blogcard/BlogCard'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react'

function RecentBlogs() {
           const backendLink=useSelector((state)=>state.prod.link);
const [data,setData]=useState("");

  useEffect(()=>{

const fetch =async()=>{
  const res=await axios.get(`${backendLink}/api/blog/getrecentblogs`,{
    withCredentials:true,
  }); 
setData(res.data.blogs);
};
fetch()
  },[])

  return (
    <div className='mb-4 py-4'>
    <h1 className='text-xl font-semibold mb-4'>RecentBlogs</h1>
   <div className='flex flex-col gap-8 lg:gap-12'>
     {
        data &&
        data.map((item, index) => (
         <div key={index} className='flex flex-col lg:flex-row my-4 gap-2 lg:gap-4'>
              <BlogCard item={item}/>
         </div>
        ))
    }
   </div>
    </div>
  )
}

export default RecentBlogs
