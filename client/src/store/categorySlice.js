import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  Allcategory:[]
};

const categorySlice = createSlice({
  name: "category",
  initialState: initialValue,
  reducers: {
    setCategory: (state, action) => {
        // console.log("category in redux is:",...action.payload);
      state.Allcategory = [...action.payload];
    },
  },
});

export const { setCategory } = categorySlice.actions;

export default categorySlice.reducer;
