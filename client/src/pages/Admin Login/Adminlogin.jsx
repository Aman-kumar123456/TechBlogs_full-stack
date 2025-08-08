import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { authActions } from '../../store/authReducer';
function Adminlogin() {
const navigate=useNavigate();
const dispatch=useDispatch();
const backendLink=useSelector((state)=>state.prod.link);







        const [inputs,setinputs]=useState({
          email: '',
          password: ''  
        })



            const handleChange = (e) => {
      const { name, value } = e.target;
      setinputs((prevInputs) => ({
        ...prevInputs,    
        [name]: value
      }));   
    }



    const handleadminlogin=async(e)=>{
e.preventDefault();
try {
  const res=await axios.post(`${backendLink}/api/admin/adminlogin`,inputs,{
    withCredentials:true
  })
        dispatch(authActions.login())

  toast.success(res.data.message);
    setinputs({
       email: '',
       password: ''  
    })
  navigate('/admin-dashboard');
} catch (error) {
  toast.error(error.response.data.error);
}
    }
  return (
<div className="min-h-screen bg-gray-100 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Admin Login Here
        </h2>
        <form onSubmit={handleadminlogin} className="space-y-6 ">

          <div className="text-left">
            <label htmlFor="email" className="block text-gray-700 text-lg font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="text-left">
            <label htmlFor="password" className="block text-gray-700 text-lg font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md w-full text-lg transition-colors duration-200"
          >
            Login
          </button>
          <div>
            <p className="text-gray-600 mt-4">
              Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Signup here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Adminlogin
