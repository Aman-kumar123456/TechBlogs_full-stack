import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import fetchuserDetails from "../utils/fetchUserdetails";
import { useDispatch } from "react-redux";
import { setUserdetails } from "../store/userSlice";

const Profileedit = ({ close,}) => {
    const dispatch=useDispatch();
  const [data, setData] = useState({
    name:"",
    email: "",
    password:""
  });

  const handlechange=(e)=>{
const {name,value}=e.target

setData((preve)=>{
    return{
        ...preve,
        [name]:value
    }
})
  }


  const handlesubmit=async(e)=>{
e.preventDefault();

try {
    const response=await Axios({
        ...summaryApi.updateuserdetails,
        data:data
    })
    if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        // console.log("register user data is:", response.data);
        const userdetails = await fetchuserDetails();
        // console.log("user details is:",userdetails.data);
        dispatch(setUserdetails(userdetails.data));
      }
} catch (error) {
    AxiosToastError(error)
}
  }
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 z-60 bg-neutral-700 opacity-100 ">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 mt-10 ">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Edit Profile
          </h2>
          <div className="hover:text-red-500">
            <IoCloseSharp onClick={close} size={20} />
          </div>
        </div>

        <form className="space-y-4" onSubmit={handlesubmit}>
          <div>
            <label htmlFor="name" className="block mb-1 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={data.name}
              onChange={handlechange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handlechange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handlechange}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Update Profile
          </button>
        </form>
      </div>
    </section>
  );
};

export default Profileedit;
