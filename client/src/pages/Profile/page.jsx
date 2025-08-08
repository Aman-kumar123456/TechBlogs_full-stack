import React, { useState } from 'react'
import Sidebar from '../../components/Profile/Sidebar'
import { Outlet } from 'react-router-dom'
import { GoArrowRight } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

function Profile() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className='relative mb-4 py-4 flex items-start justify-between gap-8'>
      <div className={`bg-white ${isSidebarOpen?"text-xl h-screen fixed top-0 left-0 w-[70%]":"hidden"}  lg:text-normal  lg:h-auto lg:block  flex items-center justify-center p-4 lg:p-0 border-r lg:relative lg:w-1/6 z-[10]`}>
      <div className='absolute top-8 right-8 lg:hidden'>
        <button className='text-xl' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          <RxCross2 />
        </button>
</div>
        <Sidebar />

      </div>
      <div className='absolute top-0 left-0 lg:hidden z-[2]'>
<button onClick={()=>setIsSidebarOpen(!isSidebarOpen)}><GoArrowRight className='text-2xl' />
</button>
      </div>
      <div className='w-full lg:w-5/6 max-h-auto min-h-screen'>
     
      <Outlet/>
      
      
      </div>
    </div>
  )
}

export default Profile
