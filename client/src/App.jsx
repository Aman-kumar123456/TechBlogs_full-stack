import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import fetchuserDetails from "./utils/fetchUserdetails";
import { setUserdetails } from "./store/userSlice";
import getcategory from "./utils/getcategory";
import { setCategory } from "./store/categorySlice";
import { setBlog } from "./store/blogSlice";
import fetchAllBlogs from "./utils/fetchallBlogs";
import getallfavourite from "./utils/getFavouriteblog";
import { setFavourite } from "./store/favouriteSlice";
const App = () => {
  const dispatch = useDispatch();

  const fetchuser = async () => {
    const userdetails = await fetchuserDetails();
    // console.log("user details is:", userdetails.data);
    dispatch(setUserdetails(userdetails.data));
  };

  const allcategory = async () => {
    const allCategory = await getcategory();
    // console.log("category is:",allCategory);
    dispatch(setCategory(allCategory.data));
  };

  const allBlogs = async () => {
    const blogs = await fetchAllBlogs();

    dispatch(setBlog(blogs.data));
  };

  // get all favourite blogs.....
  const fetchallFavourite=async()=>{
    const allfavourite=await getallfavourite()
    dispatch(setFavourite(allfavourite.data))
  }

  useEffect(() => {
    fetchuser();
    allcategory();
    allBlogs();
    fetchallFavourite();
  }, []);
  return (
    <section>
      <Header />

      <main className="min-h-[78vh] mt-16">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </section>
  );
};

export default App;
