import React, { useEffect, useState } from 'react'
import BlogCard from '../../components/Blogcard/BlogCard'
import Allblogcomponents from '../../components/Allblogcomponents'
import { useSelector } from 'react-redux';
import axios from 'axios';
function Blogs() {

          const backendLink=useSelector((state)=>state.prod.link);
const [data,setData]=useState("");

  useEffect(()=>{

const fetch =async()=>{
  const res=await axios.get(`${backendLink}/api/blog/getblogs`,{
    withCredentials:true,
  }); 
setData(res.data.blogs);
};
fetch()
  },[])

  return (
    <div className='mb-4 py-4'>
   <div className='flex flex-col gap-8 lg:gap-4'>
    {
      data && <>  <h1 className='text-xl font-semibold mb-4'> All Blogs</h1>
  <Allblogcomponents data={data}/></>
    }
      
   </div>
    </div>
  )
}

export default Blogs
