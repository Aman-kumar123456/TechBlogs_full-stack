import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import { logout } from "../store/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaUserGear } from "react-icons/fa6";
const Usermenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);

  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...summaryApi.logout,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        // console.log("register user data is:", response.data);
        // console.log("user details is:",userdetails.data);
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <section>
      <div className="border-b">
        <h2>My Account:</h2>
        <div className="flex items-center gap-2">
          <p className=" text-blue-600">{user.name}</p>
          <span className="text-red-400">{user.role === "admin" ? "(Admin)" : ""}</span>
          <Link to={'/dashboard/profile'}><div className="text-blue-500 hover:text-blue-600 cursor-pointer">
            <FaUserGear size={20} />
          </div>
          </Link>
        </div>
      </div>

      <div className="text-md flex flex-col mt-4 gap-2">
        <ul className="flex flex-col gap-2">
          {user.role === "admin" && (
            <>
              <Link to={"/dashboard/addblog"}>
                <li className=" hover:text-blue-500 cursor-pointer">
                  Add Blogs
                </li>
              </Link>
              <Link to={"/dashboard/allblogs"}>
                <li className=" hover:text-blue-500 cursor-pointer">
                  All Blogs
                </li>
              </Link>
              <Link to={"/dashboard/category"}>
                {" "}
                <li className=" hover:text-blue-500 cursor-pointer">
                  Add Category
                </li>
              </Link>
            </>
          )}
          <Link to={'/dashboard/favourite'}>
            <li className=" hover:text-blue-500 cursor-pointer">
              Favourite Blogs
            </li>
          </Link>
        </ul>
        <button
          onClick={handleLogout}
          className="flex items-center justify-start text-red-600 font-semibold cursor-pointer"
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default Usermenu;
