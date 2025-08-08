import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { FaRegUserCircle } from 'react-icons/fa';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

function Dashboardprofile() {
  const [changeavatar, setChangeAvatar] = useState(null);
  const navigate = useNavigate();




  const backendLink = useSelector((state) => state.prod.link);
  const [userdata, setUserdata] = useState("");

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(`${backendLink}/api/user/userdetail`, {
        withCredentials: true,
      });
      setUserdata(res.data.data);
    };
    fetch();
  }, []);








  const [passwords, setPasswords] = useState({
    password: "",
    newPassword: "",
    confirmNewpassword: "",
  });



  const changepassword = (e) => {
    const { name, value } = e.target;

    setPasswords((preve) => ({
      ...preve,
      [name]: value
    }))
  }








  const handlesubmitpassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.patch(`${backendLink}/api/user/updatepassword`, passwords, {
        withCredentials: true
      });
      toast.success(res.data.message);
      // navigate("/login");
      setPasswords({
        password: "",
        newPassword: "",
        confirmNewpassword: "",
      })

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  const handleImageChange = (event) => {


    const file = event.target.files[0];
    if (file) {
      setChangeAvatar(file); // Set the file to state to display the preview
    }
  };












  const changeAvatar = async () => {
    try {
      const formData = new FormData();
      formData.append("image", changeavatar);
      const res = await axios.put(`${backendLink}/api/user/changeavatar`, formData, {
        withCredentials: true
      });
      toast.success(res.data.message);
      // navigate("/login");
      setChangeAvatar(null);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  return (
    <>{userdata &&
      <div className='flex flex-col p-4 sm:p-6 md:p-8 lg:p-10'> {/* Increased padding for larger screens */}
        <div className='flex flex-col sm:flex-row items-center gap-6 sm:gap-12 mb-8'> {/* Changed to flex-col on small, flex-row on sm+ */}
          <div className='flex flex-col items-center sm:items-start'> {/* Centralize items on small screens */}
            <div className='size-[15vh] border rounded-full overflow-hidden flex justify-center items-center flex-shrink-0'> {/* flex-shrink-0 to prevent shrinking */}
              <label htmlFor='ProfileUpdate' className='w-[100%] h-[100%] flex justify-center items-center cursor-pointer'>
                {userdata && userdata.avatar ? (
                  <img
                    src={
                      changeavatar
                        ? URL.createObjectURL(changeavatar)
                        : `${userdata.avatar}`
                    }
                    alt='Profile' className='rounded-full w-[100%] h-[100%] object-cover' />
                ) : (
                  <FaRegUserCircle size={110} color='#ccc' />
                )}
              </label>
              <input
                id='ProfileUpdate'
                type='file'
                accept='.jpeg,.jpg,.png'
                className='hidden'
                onChange={handleImageChange}
              />
            </div>
            <div className='mt-4'>
              <button className='bg-zinc-900 hover:bg-zinc-700 text-white py-2 px-4 rounded' onClick={changeAvatar}>Update</button>
            </div>
          </div>

          {/* This div contains the email and name */}
          <div className='text-center sm:text-left mt-4 sm:mt-0'> {/* Text alignment for small screens */}
            <p className='text-zinc-700'>{userdata.email}</p>
            <h1 className='text-2xl md:text sm:text-3xl mt-2 font-semibold'>{userdata.username}</h1> {/* Responsive font size */}
          </div>
        </div>
        <hr className='my-8' />

        {/* Password change section */}
        <div>
          <h1 className='text-xl sm:text-2xl font-semibold mb-4'>Change Account's Password</h1> {/* Responsive font size */}
          <form action={''} onSubmit={handlesubmitpassword} className='flex flex-col w-full max-w-lg mt-8 mx-auto sm:mx-0'> {/* Max width and center for forms */}
            <div className='flex flex-col mb-4'> {/* Added margin-bottom */}
              <label htmlFor='currentPassword' className='mb-2'>Current Password</label> {/* Added margin-bottom */}
              <input
                type='password'
                id='currentPassword'
                name='password' // Changed name for clarity
                value={passwords.password}
                placeholder='Enter current password'
                onChange={changepassword}
                required
                className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            <div className='flex flex-col mb-4'> {/* Added margin-bottom */}
              <label htmlFor='newPassword' className='mb-2'>New Password</label> {/* Added margin-bottom */}
              <input
                type='password'
                id='newPassword'
                name='newPassword' // Changed name for clarity
                value={passwords.newPassword}
                placeholder='Enter New Password'
                onChange={changepassword}
                required
                className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            <div className='flex flex-col mb-4'> {/* Added margin-bottom */}
              <label htmlFor='confirmNewPassword' className='mb-2'>Confirm New Password</label> {/* Added margin-bottom */}
              <input
                type='password'
                id='confirmNewPassword'
                name='confirmNewpassword' // Changed name for clarity
                placeholder='Enter Confirm New Password'

                onChange={changepassword}
                value={passwords.confirmNewpassword}

                required
                className='shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
              />
            </div>

            <div>
              <button className='mt-4 bg-zinc-900 hover:bg-zinc-700 text-white py-2 px-4 rounded'>Update Password</button>
            </div>
          </form>
        </div>
      </div>
    }</>

  );
}

export default Dashboardprofile;