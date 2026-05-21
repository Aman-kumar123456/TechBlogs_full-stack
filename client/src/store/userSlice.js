import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  _id: "",
  name: "",
  email: "",
  role: "",
  avatar: "",
  favouriteBlogs: [],
  likedBlogs: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialValue,
  reducers: {
    setUserdetails: (state, action) => {
      // console.log("userdetails in redux is:",action.payload);
      state._id = action.payload?._id;
      state.name = action.payload?.name;
      state.email = action.payload?.email;
      state.role = action.payload?.role;
      state.avatar = action.payload?.avatar;
      state.favouriteBlogs = action.payload?.favouriteBlogs;
      state.likedBlogs = action.payload?.likedBlogs;
    },
    logout:(state,action)=>{
      state._id="",
      state.name = "",
      state.email = "",
      state.role ="",
      state.avatar = "",
      state.favouriteBlogs = [],
      state.likedBlogs =[]
    },
    uploadAvatar:(state,action)=>{
      state.avatar=action.payload
    }
  },
});

 export const { setUserdetails,logout,uploadAvatar} = userSlice.actions

export default userSlice.reducer