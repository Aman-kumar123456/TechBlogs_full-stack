import React, { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import {Link} from 'react-router-dom';

const Home = () => {
  const allcategory = useSelector((state) => state.category.Allcategory);
  // console.log("all category is in home page is:", allcategory);
  const [cattitle, setCattitle] = useState();
  const [recentBlogs, setrecentBlog] = useState(null);
  const [recentLimitBlogs, setrecentLimitBlog] = useState([]);
  const [categoryBlogs, setCategoryBlogs] = useState([]);
  const fetchrecentoneblog = async () => {
    try {
      const recentblog = await Axios({
        ...summaryApi.getonerecentblog,
      });
      if (recentblog.data.error) {
        toast.error(recentblog.data.message);
      }
      if (recentblog.data.success) {
        // toast.success(recentblog.data.message);
        setrecentBlog(recentblog.data.data);

        // console.log("recent blog is:", recentblog.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const frtchRecentLimitBlog = async () => {
    try {
      const recentLimitblog = await Axios({
        ...summaryApi.getBlogsInLimit,
      });
      if (recentLimitblog.data.error) {
        toast.error(recentLimitblog.data.message);
      }
      if (recentLimitblog.data.success) {
        // toast.success(recentblog.data.message);
        setrecentLimitBlog(recentLimitblog.data.data);

        // console.log("recent blog is:", recentLimitblog.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handlecategoryBlogs = async (categoryId, categoryTitle) => {
    setCattitle(categoryTitle);
    // console.log("category Id and Title is:", cattitle);
    // console.log("category id and title is:", categoryId);
    try {
      const response = await Axios({
        ...summaryApi.getblogByCategoryId,
        data: {
          _id: categoryId,
        },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        // toast.success(response.data.message);
        setCategoryBlogs(response?.data.data);

        // console.log("categoryBlogs blog is:", response?.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    fetchrecentoneblog();
    frtchRecentLimitBlog();
  }, []);
  return (
    <section className="grid grid-cols-[1fr_280px] h-screen gap-4">
      <div className="">
        {recentBlogs && (
          <div className="flex items-center h-[150px] bg-white rounded-sm shadow-md overflow-hidden p-4 gap-4 mt-4">
            <div className="h-full w-[220px] flex-shrink-0">
              <img
                src={recentBlogs.image}
                alt="recentImage"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="flex flex-col justify-between h-full py-1">
              <div>
                <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                  {recentBlogs.title}
                </h2>

                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {recentBlogs.description}
                </p>
              </div>

             <Link to={`/blog/${recentBlogs._id}`}> <button className="w-fit px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300">
                Read More...
              </button>
              </Link>
            </div>
          </div>
        )}
        <div mt-2 p-4>
          <div className="flex items-center">
            <h2 className="ml-4 font-semibold mt-5">
              {cattitle ? cattitle : "Category"} Blogs
            </h2>
          </div>
          <div className="max-h-[300px] overflow-auto">
            {categoryBlogs.length > 0 ? (
              <>
                {categoryBlogs.map((Blog, index) => {
                  return (
                    <div className="flex items-center h-[150px] bg-white rounded-sm shadow-md overflow-hidden p-4 gap-4">
                      <div className="h-full w-[220px] flex-shrink-0">
                        <img
                          src={Blog.image}
                          alt="recentImage"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex flex-col justify-between h-full py-1">
                        <div>
                          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                            {Blog.title}
                          </h2>

                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {Blog.description}
                          </p>
                        </div>

                        <Link to={`/blog/${Blog._id}`}><button className="w-fit px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300">
                          Read More...
                        </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {recentLimitBlogs.map((Blog, index) => {
                  return (
                    <div className="flex items-center h-[150px] bg-white rounded-sm shadow-md overflow-hidden p-4 gap-4">
                      <div className="h-full w-[220px] flex-shrink-0">
                        <img
                          src={Blog.image}
                          alt="recentImage"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex flex-col justify-between h-full py-1">
                        <div>
                          <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                            {Blog.title}
                          </h2>

                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {Blog.description}
                          </p>
                        </div>

                        <Link to={`/blog/${Blog._id}`}><button className="w-fit px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300">
                          Read More...
                        </button>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-2">
        <h3 className="font-semibold">Categories</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {allcategory.map((cat, index) => {
            return (
              <p
                onClick={() => handlecategoryBlogs(cat._id, cat.title)}
                key={cat._id + "Category"}
                className="py-1 px-1 border rounded-full hover:border-2 hover:border-blue-400 cursor-pointer"
              >
                {cat.title}
              </p>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default Home;
