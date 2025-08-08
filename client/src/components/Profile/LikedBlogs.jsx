import React from 'react'
import  { useEffect, useState } from 'react'
import BlogCard from '../Blogcard/BlogCard'
import axios from 'axios';
import { useSelector } from 'react-redux';
function LikedBlogs() {
                  const backendLink=useSelector((state)=>state.prod.link);
const [data,setData]=useState("");
 useEffect(()=>{

const fetch =async()=>{
  const res=await axios.get(`${backendLink}/api/user/fetchlikeblog`,{
    withCredentials:true,
  }); 
setData(res.data.likedBlogs);
};
fetch()
  },[])
  return (
    <div className='mb-4 py-4'>
    <h1 className='text-xl font-semibold mb-4'>Liked Blogs</h1>
   <div className='flex flex-col gap-8 lg:gap-4'>
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

export default LikedBlogs
