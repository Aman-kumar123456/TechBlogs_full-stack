import React from 'react'
import Sidebar from '../../components/Admin Components/Sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function AdminDashboard() {
  
  return (
    <div className='flex '>
      <div className='w-1/6'></div>
      <div className='w-1/6 fixed md:w-1/6 lg:w-1/6 h-screen border-r2'>
              <Sidebar/>

      </div>
      <div className='w-5/6 md:w-5/6 lg:w-5/6 bg-zinc-200'>
              <Outlet/>

      </div>
    </div>
  )
}

export default AdminDashboard
