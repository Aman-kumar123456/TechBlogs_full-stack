import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const HomePageAllBlogs = () => {
  const allBlog = useSelector((state) => state?.blog?.Allblog);
  console.log("Home page all blog is:", allBlog);
  return (
    <section>
      <div className="h-10 w-full flex items-center shadow-sm">
        <h2 className="ml-2 font-semibold">Blogs</h2>
      </div>
      <div className="px-6 py-8 flex flex-col gap-8">
        {allBlog.map((blog) => {
          return (
            <div
              key={blog._id + "blogs"}
              className="w-full bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row"
            >
              <div className="md:w-1/3 w-full h-[250px] overflow-hidden">
                <img
                  src={blog.image}
                  alt="blogImage"
                  className="w-full h-full object-cover hover:scale-105 transition-all duration-500"
                />
              </div>

              <div className="md:w-2/3 w-full p-6 flex flex-col justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-gray-600 leading-7 line-clamp-3">
                    {blog.description}
                  </p>
                </div>

                <div className="mt-6">
                  <Link to={`/blog/${blog._id}`}><button className="px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-all duration-300">
                    Read More...
                  </button></Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default HomePageAllBlogs;
