import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  Allfavourite: [],
};

const favouriteSlice = createSlice({
  name: "favourite",
  initialState: initialValue,
  reducers: {
   setFavourite: (state, action) => {
      state.Allfavourite = action.payload;
    },
  },
});

export const { setFavourite } = favouriteSlice.actions;

export default favouriteSlice.reducer;
