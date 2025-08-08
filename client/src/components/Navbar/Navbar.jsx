import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoReorderThree } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useSelector } from 'react-redux';

function Navbar() {
  const [MobileNav,setMobileNav]=useState(false);
    const links = [
        { name: 'Home',
         to: '/'
        },
        {
          name: 'Blogs',
            to: '/blogs'
        },
        {
            name: 'Login',
            to: '/login'
        },
        {
            name: 'Profile',
            to: '/profile'
        },
    ]
const isloggedin=useSelector((state)=>state.auth.isloggedIn);
if(!isloggedin){
  links.splice(3,1);
}else{
  links.splice(2,1);
}

  return (
<nav className='flex justify-between items-center py-4 h-24 shadow-md  top-0 left-0 right-0 bg-green-200 z-50 px-5'>
<div className='w-3/6 lg:w-2/6 brandName'>

<Link to='/' className=' text-xl font-bold text-green-600'>AmanBlog</Link>
    
</div>
<div className='w-4/6 hidden lg:flex items-center justify-end'>
{
    links.map((link,index)=><Link to={link.to} key={index} className='mx-4 text-lg font-semibold hover:text-blue-500 transition-colors duration-300'>
    {link.name}
    </Link>)
}
{
  (!isloggedin) && <Link to='/Signup' className='text-xl bg-green-400 px-4 py-2 rounded hover:bg-green-500'>Signup</Link>

}
</div>




<div className='relative flex w-3/6 block lg:hidden items-center justify-end'>
<button className='text-3xl'><IoReorderThree size={25} onClick={()=>setMobileNav(!MobileNav)} />
</button>

</div>
<div className={`fixed top-0 left-0 nav-bg backdrop-blur-md h-screen w-full ${MobileNav ?"translate-y-[0%] flex flex-col":" translate-y-[100%]"} transition-all duration-300 p-8 `}>
  <div className='flex justify-end w-full  '>
    <button className='text-2xl' onClick={()=>setMobileNav(!MobileNav)}><IoMdClose size={25} /></button>
</div>
  <div className='h-[100%] flex flex-col items-center justify-center'>
    {
    links.map((link,index)=><Link to={link.to} key={index} className='mb-4 text-lg font-semibold hover:text-blue-500 transition-colors duration-300'>
    {link.name}
    </Link>)
}
{
  (!isloggedin) && <Link to='/Signup' className='mb-4 text-xl bg-green-400 px-4 py-2 rounded hover:bg-green-500 '>Signup</Link>

} 
 </div>
</div>
</nav>
  )
}

export default Navbar
