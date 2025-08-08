import {createSlice} from '@reduxjs/toolkit';
const prodSlice=createSlice({
    name:"prod",
    initialState:{
        link:"http://localhost:3000"
    },
});

export default prodSlice.reducer;