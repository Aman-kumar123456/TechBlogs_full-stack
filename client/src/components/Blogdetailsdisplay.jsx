import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { setFavourite } from "../store/favouriteSlice";
import getallfavourite from "../utils/getFavouriteblog";

const Blogdetailsdisplay = () => {
  const allfavourite = useSelector((state) => state?.favourite?.Allfavourite);
  console.log("favourite is coming from redux is:", allfavourite);
  const user=useSelector(state=>state?.user);
  console.log("user Is :",user);
  const navigate=useNavigate();
  const dispatch = useDispatch();
  const [blogdetail, setblogDetails] = useState(null);
  const [switchfavouritelogo, setSwitchfavouritelogo] = useState();

  const params = useParams();

  const blogId = params.blog;

  // console.log(blogId);

  const fetchblogdetail = async () => {
    try {
      const response = await Axios({
        ...summaryApi.blogdetails,
        data: {
          _id: blogId,
        },
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        setblogDetails(response.data.data);

        // console.log("blogDetails is:", response.data.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  //add to cart here.......
  const handleAddToFavourite = async () => {
    if(!user?._id){
      toast.error("Please Login First with your email");

      navigate('/login');
      return;
    }
    try {
      const response = await Axios({
        ...summaryApi.addToFavourite,
        data: {
          blogId: blogId,
        },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        // console.log("favourite Blog is:", response.data.data);
        const fetchallfavourite = await getallfavourite();
        dispatch(setFavourite(fetchallfavourite.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // remove to favourite here.....
  const handleremoveTofavourite = async () => {
    try {
      const response = await Axios({
        ...summaryApi.deleteTofavourite,
        data: {
          blogId: blogId,
        },
      });
      if (response.data.error) {
        toast.error(response.data.message);
      }
      if (response.data.success) {
        toast.success(response.data.message);
        // console.log("favourite Blog is:", response.data.data);
        const fetchallfavourite = await getallfavourite();
        dispatch(setFavourite(fetchallfavourite.data));
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  // check blog is in favourite or not.....
  useEffect(() => {
    const isfavourite = allfavourite.some((fav) => fav?.blogId?._id === blogId);
    // console.log(isfavourite);
    setSwitchfavouritelogo(isfavourite);
  }, [allfavourite, blogId]);

  useEffect(() => {
    fetchblogdetail();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 md:px-12 lg:px-20 pb-16 mt-30">
      <div className="mb-2 flex items-center justify-between">
        <h1 className=" md:text-2xl font-semibold text-gray-900 leading-tight">
          {blogdetail?.title}
        </h1>
        <div className="flex items-center gap-6">
          {/* <div className="flex items-center gap-2">
            <BiLike size={25} />
            <BiDislike size={25} />
          </div> */}
          <div>
            {switchfavouritelogo ? (
              <FcLike size={25} onClick={handleremoveTofavourite} />
            ) : (
              <MdFavoriteBorder size={25} onClick={handleAddToFavourite} />
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-[300px] md:h-[500px] overflow-hidden rounded-2xl shadow-sm mb-10">
        <img
          src={blogdetail?.image}
          alt="Blogimage"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="bg-white rounded-sm shadow-sm p-4 md:p-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Description
        </h2>

        <p className="text-gray-700 text-lg leading-9 tracking-wide">
          {blogdetail?.description}
        </p>
      </div>
    </section>
  );
};

export default Blogdetailsdisplay;
