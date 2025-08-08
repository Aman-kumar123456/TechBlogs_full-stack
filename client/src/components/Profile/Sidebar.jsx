import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../../store/authReducer'
function Sidebar() {
      const sidebar=[
        {
            name: 'Dashboard',
            to: '/profile',
        },
        {
            name: 'Favourites',
            to: '/profile/favourites',
        },
        {
            name: 'Liked Blogs',
            to: '/profile/liked-blogs',
        },
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
    <div className='w-[100%]  flex flex-col gap-10 md:gap-8 lg:gap-4 p-4'>
      {
        sidebar.map((item,index) => (
          <Link to={item.to} key={index} className="hover:font-semibold">
              {item.name}
            </Link>
        ))
        }
        <button onClick={handlelogout} className='bg-zinc-900 text-white rounded w-[100%] py-2 hover:bg-zinc-800 transition-all duration-300 text-center'>Logout</button>
    </div>
  )
}

export default Sidebar
