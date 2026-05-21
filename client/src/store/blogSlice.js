import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  Allblog:[]
};

const blogSlice = createSlice({
  name: "blog",
  initialState: initialValue,
  reducers: {
    setBlog: (state, action) => {
        // console.log("blog in redux is:",...action.payload);
      state.Allblog = [...action.payload];
    },
  },
});

export const { setBlog } = blogSlice.actions;

export default blogSlice.reducer;
