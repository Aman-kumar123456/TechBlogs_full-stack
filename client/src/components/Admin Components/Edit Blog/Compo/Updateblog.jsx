import React from 'react'
import axios from 'axios';

import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Updateblog() {

  const {id}=useParams();
    const [data,setData]=useState({title:"",description:""});
  
               const backendLink=useSelector((state)=>state.prod.link);
  useEffect(()=>{
  const fetch =async()=>{
  const res=await axios.get(`${backendLink}/api/blog/getdescriptionbyid/${id}`,{
    withCredentials:true,
  }); 
setData(res.data.blog);
};
fetch();
  },[id])



const handleChange=(e)=>{
const {name,value}=e.target;
setData((data)=>(
  {...data,
    [name]:value
  }
))
}
  









const handleupdateblogs=async(e)=>{
  e.preventDefault();
try {
  const res=await axios.put(`${backendLink}/api/blog/editblogs/${id}`,data,{
    withCredentials:true,
  }); 
  toast.success(res.data.message);
} catch (error) {
 toast.error(error.data.message);
}
}
  return (
    <div className='p-4 h-screen'>
<h1 className='text-2xl font-semibold'>      Update Blog
</h1>
{data && 
<form action="" onSubmit={handleupdateblogs} className='my-4 flex flex-col gap-4'>
    <input type='text' placeholder='Title' className=' outline-none p-4 bg-transparent text-3xl border-b border-zinc-400 font-semibold'
    name='title' value={data.title} onChange={handleChange}/>

        <textarea type='text' placeholder='Description' className=' outline-none p-4 bg-transparent text-xl border-b border-zinc-400 font-semibold'
        name='description' value={data.description} onChange={handleChange}/>

<div><input type='file' className='bg-blue-400 text-xl text-white rounded ' accept='.jpeg, .png, .jpg'/></div>
<div>
    <button type='submit' className='bg-zinc-900 hover:bg-zinc-700 transition-all duration-300 text-white rounded px-4 py-2 shadow-xl '>UPdate Blog</button>

</div>
</form>}









    </div>
  )
}

export default Updateblog
