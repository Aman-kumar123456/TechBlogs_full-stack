import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import fetchuserDetails from "../utils/fetchUserdetails";
import { useDispatch } from "react-redux";
import { setUserdetails } from "../store/userSlice";
import getallfavourite from "../utils/getFavouriteblog";
import { setFavourite } from "../store/favouriteSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputs, setinputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setinputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("inputs login data is",inputs)
    try {
      const response = await Axios({
        ...summaryApi.login,
        data: inputs,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("accesstoken", response.data.data.accesstoken);
        localStorage.setItem("refreshtoken", response.data.data.refreshtoken);
        // console.log("register user data is:", response.data);
        const userdetails = await fetchuserDetails();
        // console.log("user details is:",userdetails.data);
        dispatch(setUserdetails(userdetails.data));

        // after login favourite is come 
        const fetchallfavourite = await getallfavourite();
        dispatch(setFavourite(fetchallfavourite.data));
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-8">
          Login Here
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-left">
            <label
              htmlFor="email"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
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
            <label
              htmlFor="password"
              className="block text-gray-700 text-lg font-bold mb-2"
            >
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
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Signup here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
