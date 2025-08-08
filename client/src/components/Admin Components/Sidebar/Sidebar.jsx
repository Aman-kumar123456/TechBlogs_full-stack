import React from 'react'
import { Link } from 'react-router-dom'
import {useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../../store/authReducer';
function Sidebar() {



    const links = [
        { name: 'Dashboard', to: '/admin-dashboard' },
                { name: 'Add Blog', to: '/admin-dashboard/add-blogs' },
                { name: 'Edit Blog', to: '/admin-dashboard/edit-blogs' },
    ]
  const dispatch=useDispatch();
  const backendLink=useSelector((state)=>state.prod.link)
const navigate=useNavigate()
    const handlelogout=async()=>{
await axios.post(
  `${backendLink}/api/user/logout`,
  {},
  { withCredentials: true }
);
dispatch(authActions.logout());    
navigate("/");
};
  return (
    <div className='p-4 '>
      <h1 className='text-2xl font-semibold'>Admin Page</h1>
      <hr className='my-4'/>
      <div className='flex flex-col gap-4'>
        {
        links.map((link, index) =>(
        <Link className='text-xl hover:scale-105 traansition-all duration-300' key={index} to={link.to}>
            {link.name}
        </Link> ))
      }
      </div>
      <div>
        <button className='mt-5 bg-black text-white px-4 py-2 w-[100%] rounded ' onClick={handlelogout}>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar
