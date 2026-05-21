import React, { useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import { useDispatch, useSelector } from "react-redux";
import { IoCloudUpload } from "react-icons/io5";
import summaryApi from "../common/summaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import fetchAllBlogs from "../utils/fetchallBlogs";
import { setBlog } from "../store/blogSlice.js";
import { IoCloseSharp } from "react-icons/io5";
const Editblog = ({ close, editdata }) => {
  const dispatch = useDispatch();

  const allcategory = useSelector((state) => state?.category?.Allcategory);
  // console.log("category is:", allcategory);
  const [data, setData] = useState({
    _id: editdata._id,
    title: editdata.title,
    description: editdata.description,
    image: editdata.image,
    category: editdata.category,
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadimagehndler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("Techblog", file);

    try {
      const response = await Axios({
        ...summaryApi.uploadimage,
        data: formData,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);

        setData((preve) => {
          return {
            ...preve,
            image: response.data.data.url,
          };
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    // console.log("Blog data is:", data);
    try {
      const response = await Axios({
        ...summaryApi.editblog,
        data: data,
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        const blogs = await fetchAllBlogs();
        dispatch(setBlog(blogs.data));
        if (close) {
          close();
        }
        setData({
          title: "",
          description: "",
          image: "",
          category: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handleaddcategory = (e) => {
    const value = e.target.value;
    const categorydata = allcategory.find((el) => el._id === value);

    setData((preve) => {
      return {
        ...preve,
        category: categorydata,
      };
    });
  };
  return (
    <section className="p-6 min-h-screen w-full fixed top-0 right-0 left-0 bottom-0 bg-neutral-500 z-50 overflow-auto">
      <div className="flex items-center justify-between bg-white px-6 py-4 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold text-gray-700">Edit Blog</h2>
        <IoCloseSharp onClick={close} size={20} />
      </div>

      <div className="bg-white w-full max-w-3xl mx-auto p-2">
        <form onSubmit={handlesubmit} className="flex flex-col gap-5">
          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="title" className="font-medium text-gray-700">
              Blog Title
            </label>

            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter your Blog title"
              value={data.title}
              onChange={handlechange}
              className="border border-gray-300 rounded-sm px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description" className="font-medium text-gray-700">
              description
            </label>

            <textarea
              id="description"
              name="description"
              placeholder="Enter your Blog description"
              value={data.description}
              rows={3}
              required
              onChange={handlechange}
              className="border border-gray-300 rounded-sm px-4 py-1 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-medium text-gray-700">Blog Images</p>

            <label htmlFor="image">
              <div className="w-full h-20 bg-blue-100 rounded-sm flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition">
                <IoCloudUpload size={28} className="text-blue-500" />

                <span className="text-sm text-gray-600 mt-1">
                  Click to Upload Image
                </span>

                <input
                  type="file"
                  id="image"
                  hidden
                  onChange={uploadimagehndler}
                />
              </div>
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-medium text-gray-700">Category:</label>

            <div className="flex flex-wrap  items-center gap-2 border border-gray-300 rounded-sm p-3 bg-gray-50">
              <select
                onChange={handleaddcategory}
                className="border border-gray-300 rounded-sm px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value={""} disabled>
                  Select Category
                </option>

                {allcategory.map((cat, index) => {
                  return (
                    <option value={cat._id} key={cat._id + "category"}>
                      {cat.title}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 bg-yellow-400 text-black font-medium py-2 rounded-lg hover:bg-yellow-500 transition"
          >
            Update Blog
          </button>
        </form>
      </div>
    </section>
  );
};

export default Editblog;
