import React from 'react'
import  { useEffect, useState } from 'react'

import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
function Editblog() {









    
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
  },[data])










  const deletehandler=async(id)=>{
        try {
                 const res=await axios.put(`${backendLink}/api/blog/deleteblogs/${id}`,{},{
    withCredentials:true,
  }); 
 toast.success(res.data.message);
        } catch (error) {
              console.log(error)  
        }
  }
        return (
                <div className='p-4 '>
                        <h1 className='text-2xl font-semibold'>      Edit Blog
                        </h1>
                        <div className='mb-4 py-4'>
                                <h1 className='text-xl font-semibold mb-4'> All Blogs</h1>
                                <div className='grid grid-cols-3 gap-8 lg:gap-4 my-4'>
                                        {
                                         data &&
                                        data.map((item, index) => (
                                                        <div className='bg-white rounded-xl p-4 flex flex-col items-center justify-center'>




                                                         <div className='w-full lg:w-4/6'>
                                                                <img
                                                                        src={item.image}
                                                                        alt='image'
                                                                        className='w-full h-32 object-cover rounded-lg mb-2'

                                                                        />
                                                                </div>
                                                                <div className='mt-4'>
                                                                        <h1 className='text-2xl font-semibold'>
                                                                                {item.title}</h1>
                                                                        <p className='my-2'>{item.description.slice(0, 170)}.....</p>
                                                                </div>
                                                                <div className='w-[100%] flex  items-center justify-between  gap-4 mt-4'>
                                                                        <Link className='bg-green-500 w-[100%] text-center text-green-900 rounded px-4 py-2 ' to={`/admin-dashboard/update-blogs/${item._id}`}>Edit</Link>
                                                                <Link className='bg-red-500 w-[100%] text-center text-red-900  rounded px-4 py-2' onClick={()=>deletehandler(item._id)}>Delete</Link>
                                                                </div>

                                                        </div>
                                                ))
                                        }
                                </div>
                        </div>
                </div>
        )
}

export default Editblog
