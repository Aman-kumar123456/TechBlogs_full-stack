import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { toast } from 'react-toastify';
import { AiOutlineLike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";


function Description() {
             const backendLink=useSelector((state)=>state.prod.link);
  const [data,setData]=useState();
  const [favourite,setFavourite]=useState(false);
    const [likes,setLikes]=useState(false);

const {id}=  useParams();
  useEffect(()=>{

const fetch =async()=>{
  const res=await axios.get(`${backendLink}/api/blog/getdescriptionbyid/${id}`,{
    withCredentials:true,
  }); 
setData(res.data.blog);
// console.log(res);
if(res.data.favourite){
  setFavourite(true);
}
if(res.data.like){
  setLikes(true);
}
// if(res.data.l)
};
fetch();
  },[id])


const favouritehandler=async()=>{
  if(!favourite){
const res=await axios.put(`${backendLink}/api/blog/addblogatofavourite/${id}`,{},{
    withCredentials:true,
  }); 
  toast.success(res.data.message);
  }else{
    const res=await axios.put(`${backendLink}/api/blog/removeblogfromfavourites/${id}`,{},{
    withCredentials:true,
  }); 
  toast.success(res.data.message);
  }
    setFavourite(!favourite);

}



const likeshandler=async()=>{
   if(!likes){
const res=await axios.put(`${backendLink}/api/blog/addblogstolikes/${id}`,{},{
    withCredentials:true,
  }); 
  toast.success(res.data.message);
  }else{
    const res=await axios.put(`${backendLink}/api/blog/removeblogfromlikes/${id}`,{},{
    withCredentials:true,
  }); 
  toast.success(res.data.message);
  }
setLikes(!likes);
}

  return (
    <div>
      {data && <>
     
     
     
     
<div className='w-full flex items-center justify-center'>      
  <h1 className='text-2xl font-semibold w-5/6'>{data.title}</h1>
<div className=' w-1/6 text-2xl lg:text-3xl  flex justify-end gap-8'>
<button onClick={favouritehandler}>{favourite ? <FaHeart className='hover:cursor-pointer text-red-600'  />
 :<FaRegHeart className='hover:cursor-pointer' />
}
</button>
</div>

  <div className=' w-1/6 text-2xl lg:text-3xl  flex justify-end' >
  <button onClick={likeshandler}>{likes ? <AiFillLike className='hover:cursor-pointer text-green-600'  />
 :<AiOutlineLike className='hover:cursor-pointer' />}
</button>
</div>
</div>     
 <img className='mt-4 w-full h-[400px] object-cover' src={`${data.image}`} alt='blog-img'/>
      <p className='mt-4'>{data.description}</p> </>}
     
    </div>
  )
}

export default Description
