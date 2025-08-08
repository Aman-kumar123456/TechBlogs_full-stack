import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function Category() {
  const backendLink = useSelector((state) => state.prod.link);

const [cat,setCat]=useState();






  useEffect(()=>{
const fetch=async()=>{
  const res= await axios.get(`${backendLink}/api/category/getcategory`,{
        withCredentials: true
      }
    );
  setCat(res.data.categories)
}
 fetch();  
  },[backendLink])
  return (
    <div className='mb-4 py-4'>
      <h1 className='text-xl font-semibold mb-4'>All Categories</h1>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {cat &&
          cat.map((item, index) => <Link className={`me-4 px-4 py-2 text-center text-normal md:text-xl bg-yellow-500 rounded `} to={`/cat/${item._id}`} key={index}>{item.title}</Link>)
        }
      </div>
    </div>
  )
}

export default Category
