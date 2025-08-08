import React from 'react'
import  { useEffect, useState } from 'react'

import Allblogcomponents from '../../Allblogcomponents'
import { useSelector } from 'react-redux';
import axios from 'axios';
function Dashboard() {
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
    <div className='p-4'>
      <Allblogcomponents data={data}/>
    </div>
  )
}

export default Dashboard
