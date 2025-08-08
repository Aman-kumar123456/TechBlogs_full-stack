import React from 'react'
import BlogCard from './Blogcard/BlogCard'

function Allblogcomponents({data}) {


  return (
    <div className='mb-4 py-4'>
    <h1 className='text-xl font-semibold mb-4'> All Blogs</h1>
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

export default Allblogcomponents
