import React from "react";
import { useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { FaHouseUser } from "react-icons/fa";

const Header = () => {
  const user = useSelector((state) => state?.user);
  // console.log("user is", user);
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <Link to={"/"}>
            <h2 className="text-2xl font-bold text-blue-600 cursor-pointer">
              Tech-Blog
            </h2>
          </Link>
        </div>

        <div className="flex  gap-10">
          <nav>
            <ul className="flex items-center gap-8 text-gray-700 font-medium">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-600 transition duration-300"
                }
              >
                <li>Home</li>
              </NavLink>

              <NavLink
                to="/Homeallblogs"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-600 font-semibold"
                    : "hover:text-blue-600 transition duration-300"
                }
              >
                <li>Blogs</li>
              </NavLink>
            </ul>
          </nav>
          {user._id ? (
            <Link to={"dashboard/profile"}>
              <div className="text-blue-600 cursor-pointer hover:text-blue-700">
                <FaHouseUser size={25} />
              </div>
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link to={"/login"}>
                <button className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition duration-300">
                  Login
                </button>
              </Link>

              <Link to={"/signup"}>
                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                  Signup
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
