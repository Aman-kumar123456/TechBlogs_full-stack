
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Axios from '../utils/Axios.js'
// import summaryApi from "../common/summaryApi";
// import AxiosToastError from "../utils/AxiosToastError.js";
// import toast from "react-hot-toast";
// import { uploadAvatar } from "../Store/userSlice.js";
import Profileedit from "../components/Profileedit";
import Axios from "../utils/Axios";
import summaryApi from "../common/summaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { uploadAvatar } from "../store/userSlice";
const Profile = () => {
  const user = useSelector((state) => state.user);
const dispatch=useDispatch();
const [editopen,seteditOpen]=useState(false);
  const handleformrefresh = (e) => {
    e.preventDefault();
  };
  const handleUploadavatar =async (e) => {
const file=e.target.files[0]

const formData=new FormData();
formData.append('Techblog',file);

try {
  const response=await Axios({
  ...summaryApi.uploadavatar,
  data:formData
})

if(response.data.error){
  toast.error(response.data.message);
}
if(response.data.success){
  toast.success(response.data.message);
  dispatch(uploadAvatar(response.data.data.avatar))
// console.log("response",  response.data.data.avatar)

}
} catch (error) {
  AxiosToastError(error);
}

  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Profile</h1>

      <div className="bg-white shadow-md rounded-sm p-6 max-w-3xl">
        <div className="flex items-center gap-6">
          <div  className=" flex flex-col gap-2">
            <img
              src={user?.avatar}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border"
            />
            <form onSubmit={handleformrefresh}>
              <label htmlFor="uploadavatar">
                <div className="text-sm text-white bg-blue-500 p-1 rounded-md">
                  Uplaoad Profile
                </div>
                <input type="file" id="uploadavatar" className="hidden" onChange={handleUploadavatar} />
              </label>
            </form>
          </div>

          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">
              {user?.name}
            </h2>

            <p className="text-gray-600">{user?.email}</p>

            <p className="text-sm text-gray-500">
              Role: {user?.role}
            </p>
            <button className="text-sm text-white bg-blue-500 p-1 rounded-md" onClick={()=>seteditOpen(true)} >Edit Profile</button>

          </div>
        </div>

        <div className="border-t my-6"></div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-gray-500 text-sm">Full Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Email Address</p>
            <p className="font-medium">{user?.email}</p>
          </div>

          <div>
            <p className="text-gray-500 text-sm">Role</p>
            <p className="font-medium">{user?.role}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Mobile</p>
            <p className="font-medium">{user?.mobile}</p>
          </div>
        </div>
        {
          editopen &&<Profileedit close={()=>seteditOpen(false)} data={user}/>
        }

      </div>
    </div>
  );
};

export default Profile;