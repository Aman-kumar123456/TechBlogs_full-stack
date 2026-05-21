import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Favourite = () => {
  const favouriteblog = useSelector((state) => state?.favourite?.Allfavourite);
  console.log("all favourite in favourite page:", favouriteblog);
  return (
    <section>
      <div className="h-10 w-full shadow-md rounded-sm">
        <h2 className="ml-2">Favourites Blogs</h2>
      </div>
      <div className="max-h-[300px] overflow-auto">
        {favouriteblog.map((Blog, index) => {
          return (
            <div className="flex items-center h-[150px] bg-white rounded-sm shadow-md overflow-hidden p-4 gap-4">
              <div className="h-full w-[220px] flex-shrink-0">
                <img
                  src={Blog?.blogId.image}
                  alt="recentImage"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              <div className="flex flex-col justify-between h-full py-1">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {Blog?.blogId.title}
                  </h2>

                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {Blog?.blogId.description}
                  </p>
                </div>

                <Link to={`/blog/${Blog?.blogId._id}`}>
                  <button className="w-fit px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300">
                    Read More...
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Favourite;
