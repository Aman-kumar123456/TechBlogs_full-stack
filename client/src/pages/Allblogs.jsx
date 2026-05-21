import React, { useEffect, useState } from "react";
import fetchAllBlogs from "../utils/fetchallBlogs";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setBlog } from "../store/blogSlice";
import Editblog from "../components/Editblog";
import { Link } from "react-router-dom";

const Allblogs = () => {
  const dispatch = useDispatch();
  const [openEdit, setOpenedit] = useState(false);
  const [editdata, setEditdata] = useState();

  const allBlog = useSelector((state) => state.blog.Allblog);

  const getallBlogs = async () => {
    const allblog = await fetchAllBlogs();

    dispatch(setBlog(allblog.data));

    // console.log("All blogs is:", allblog.data);
  };

  const handledeleteblog = async (blogId) => {
    try {
      const response = await Axios({
        ...summaryApi.deleteblog,
        data: {
          _id: blogId,
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);

        const blogs = await fetchAllBlogs();

        dispatch(setBlog(blogs.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    getallBlogs();
  }, []);

  return (
    <section className="min-h-screen pb-10">
      <div className="h-14 w-full shadow-md bg-white flex items-center px-4 sticky top-0 z-10">
        <h2 className="text-2xl font-bold text-gray-800">All Blogs</h2>
      </div>

      <div className="p-6 flex flex-col gap-6">
        {allBlog.map((blog, index) => (
          <div
            key={index}
            className="w-full bg-white rounded-xl overflow-hidden shadow-md flex flex-col md:flex-row"
          >
            {/* Image Section */}
            <div className="md:w-1/2 w-full h-[250px]">
              <img
                src={blog.image}
                alt="Blog"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Content Section */}
            <div className="md:w-1/2 w-full p-6 flex flex-col justify-between">
              <div>
                <h1 className="text-xl font-bold text-gray-800 mb-4">
                  {blog.title}
                </h1>

                <p className="text-gray-600 leading-7 line-clamp-3">{blog.description}</p>
              </div>

              <div className="flex gap-8 mt-4">
                <button
                  onClick={() => {
                    setOpenedit(true);
                    setEditdata(blog);
                  }}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handledeleteblog(blog._id)}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {openEdit && <Editblog close={() => setOpenedit(false)} editdata={editdata} />}
    </section>
  );
};

export default Allblogs;
