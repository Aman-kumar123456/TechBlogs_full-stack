import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/page'
import Mainlayout from './layout/Mainlayout'
import Otherlayout from './layout/Otherlayout'
import Login from './pages/Login/page'
import Signup from './pages/Signup/page'
import Profile from './pages/Profile/page'
import Blogs from './pages/Blogs/page'
import Dashboardprofile from './components/Profile/Dashboardprofile'
import Favourites from './components/Profile/Favourites'
import LikedBlogs from './components/Profile/LikedBlogs'
import Description from './pages/Description/Description'
import Categories from './pages/Categories/Categories'
import Adminlogin from './pages/Admin Login/Adminlogin'
import AdminDashboard from './pages/AdminDashboard/page'
import Dashboard from './components/Admin Components/Dashboard/Dashboard'
import AddBlog from './components/Admin Components/AddBlog/AddBlog'
import Editblog from './components/Admin Components/Edit Blog/Editblog'
import Updateblog from './components/Admin Components/Edit Blog/Compo/Updateblog'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'   
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { authActions } from './store/authReducer';
import ProtectedRoute from './components/ProtectedRoutes/protectedroutes'
import AdminprotectedRoutes from './components/ProtectedRoutes/AdminprotectedRoutes'
function App() {
  const backendLink=useSelector((state)=>state.prod.link);
  const dispatch=useDispatch();
  useEffect(()=>{
const fetch =async()=>{
  const res=await axios.get(`${backendLink}/api/user/checkCookie`,{
    withCredentials:true,
  }); 
  if(res.data.success===true){
    dispatch(authActions.login());
  }
};
fetch()
  },[])
  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Mainlayout />} >
          <Route index element={<Home />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/description/:id" element={<Description />} />
          <Route path="/cat/:id" element={<Categories/>} />

          <Route path="/profile" element={
            <ProtectedRoute>
            <Profile />
            </ProtectedRoute>
          } >
            <Route index element={<Dashboardprofile />} />
            <Route index element={<Dashboardprofile />} />
            <Route path='/profile/favourites' element={<Favourites />} />
            <Route path='/profile/liked-blogs' element={<LikedBlogs />} />

          </Route>
        </Route>


        <Route element={<Otherlayout />} >
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/admin-login' element={<Adminlogin/>} />
          <Route path='/admin-dashboard' element={
            <AdminprotectedRoutes>
            <AdminDashboard />
            </AdminprotectedRoutes>
            } >
          <Route index element={<Dashboard/>} />
          <Route path='/admin-dashboard/add-blogs' element={<AddBlog/>} />
          <Route path='/admin-dashboard/edit-blogs' element={<Editblog/>} />
          <Route path='/admin-dashboard/update-blogs/:id' element={<Updateblog/>} />

          
          
          
          
          
          
          
          
          </Route>

        </Route>

      </Routes>
    </>
  )
}

export default App
