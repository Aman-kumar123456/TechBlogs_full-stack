import React from 'react'
import { Link } from 'react-router-dom'

function BlogCard({ item }) {

  return (
    <>
      <div className='w-full lg:w-4/6'>
        <img
          src={item.image}
          alt='image'
          className='w-full h-[250px] object-contain rounded mb-2 shadow-xl'


        />
      </div>
      <div className='w-full lg:w-4/6'>
        <h1 className={`text-2xl font-semibold ${window.location.href.includes('/profile') && 'mb-4'} `}>
          {item.title}</h1>
        {!window.location.href.includes('/profile') && <p className='my-2'>{item.description.slice(0, 170)}.....</p>
        }

        <Link className='bg-black text-white px-4 py-2 rounded' to={`/description/${item._id}`}>Read Blog</Link>



      </div>
    </>
  )
}

export default BlogCard
