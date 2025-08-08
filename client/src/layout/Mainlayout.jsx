import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Navbar from '../components/Navbar/Navbar'

function Mainlayout() {
    return (
        <div className='px-10 md-:px-32 lg:px-64'>
            <Navbar />

              <main className='mx-4'>
                <Outlet /> 
              </main>

            <Footer />
        </div>
    )
}

export default Mainlayout
