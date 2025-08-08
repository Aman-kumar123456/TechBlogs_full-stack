import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='h-screen flex items-center justify-center flex-col '>
      <div className=' flex flex-col w-full items-start'>
        <h1 className='font-bold text-green-600 text-3xl'>Here's AmanBloger</h1>
        <h2 className='text-green-500 text-2xl '>Something's New For Future</h2>
      </div>
      <div className='flex flex-col md:flex-row items-center justify-center gap-8 my-4'>
        <div className='w-full md:w-1/2'>
            <img src='./OIP.jpg' alt='OIP' className='rounded w-full h-[30vh] md:h-[40vh] lg:h-[50vh] object-cover
            '/>
        </div>
        <div className='w-full md:w-1/2'>
            <h1 className='font-bold text-3xl'>Technology</h1>
            <p className='mt-2 mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.</p>
            <Link to='/description/:id' className='mt-2 bg-black text-white py-2 px-1 rounded '>Read Blogs</Link>
        </div>
      </div>
    </div>
  )
}

export default Header
