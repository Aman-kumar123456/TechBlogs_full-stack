import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-toastify';
import { useSelector } from 'react-redux';










function Signup() {
  const  navigate = useNavigate();
const backendLink=useSelector((state)=>state.prod.link)

  const [inputs,setinputs]=useState({
    username: '', 
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
  const handleSubmit = async(e) => {
    e.preventDefault();



    




    try {
    const response=  await axios.post(`${backendLink}/api/user/signup`,
        inputs,
        {withCredentials:true}
      );
       console.log(response);
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
toast.error(error.response.data.message);
}finally{
    setinputs({
      username: '',
      email: '',
      password: ''
    }); 
  }
    // Handle signup logic here
    // console.log('Signup data:', inputs);
    // Reset form after submission        

  } 
  // Render the signup form
  // The form includes fields for username, email, and password   
  // Each field has a label and uses controlled components for input handling
  // The form submission is handled by handleSubmit function  



  // The form is styled with Tailwind CSS classes for a clean and modern look
  // The form is centered on the page with a responsive design    

  return (
<div className="min-h-screen bg-gray-100 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Welcome! Signup as a new user
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label htmlFor="username" className="block text-gray-700 text-lg font-bold mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={inputs.username}
            onChange={handleChange}
              required
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

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
            Signup
          </button>

          <div>
            <p className="text-gray-600 mt-4">
              Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login here</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup


