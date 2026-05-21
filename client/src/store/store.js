import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './userSlice'
import userReducer from './userSlice'
import categoryReducer from './categorySlice'
import blogReducer from './blogSlice'
import favouriteReducer from './favouriteSlice'
export const store = configureStore({
  reducer: {
    user : userReducer,
    category:categoryReducer,
    blog:blogReducer,
    favourite:favouriteReducer
  },
})