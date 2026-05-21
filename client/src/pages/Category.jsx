import React, { useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { IoCloseSharp } from "react-icons/io5";
import getcategory from "../utils/getcategory";
import { setCategory } from "../store/categorySlice";
function Category() {
  const [deletecategory, setdeleteCategory] = useState();
  const dispatch = useDispatch();
  const allcategory = useSelector((state) => state?.category.Allcategory);
  // console.log("allcategory is:", allcategory);
  const [data, setData] = useState({
    title: "",
  });

  const handlechange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handlesumitcategory = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios({
        ...summaryApi.addcategory,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        const category = await getcategory();
        dispatch(setCategory(category.data));
        // console.log("category data is:", response);

        setData({
          title: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  const handledelete = async (categoryId) => {
    try {
      const response = await Axios({
        ...summaryApi.deletecategory,
        data: {
          _id: categoryId,
        }
      })
       if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        const category = await getcategory();
        dispatch(setCategory(category.data));
        // console.log("category data is:", response);

      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-sm rounded-sm p-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Category Blogs</h1>
      </div>

      <div className="w-full bg-white shadow-lg rounded-md p-6">
        <form
          onSubmit={handlesumitcategory}
          className="flex flex-row gap-5 w-full"
        >
          <div className="flex flex-row gap-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700 w-full flex flex-row"
            >
              Category Title :
            </label>

            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter your category title"
              value={data.title}
              onChange={handlechange}
              className="border min-w-90 border-gray-300 rounded-sm px-4 py-2 outline-none autofocus transition w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-sm transition duration-300 w-full"
          >
            Add Category
          </button>
        </form>
      </div>
      <br />
      <div className="grid grid-cols-3 gap-2">
        {allcategory.map((cat, index) => {
          return (
            <div
              key={cat._id + "category"}
              className="flex items-center justify-between min-w-[120px] bg-green-400 py-1 px-1 rounded-sm mr-2"
            >
              <h2 className="text-black ">{cat.title}</h2>
              <IoCloseSharp
                onClick={() => handledelete(cat._id)}
                className="hover:text-white"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Category;
