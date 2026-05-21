import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../layout/Dashboard";
import Profile from "../pages/Profile";
import Category from "../pages/Category";
import AddBlog from "../pages/AddBlog";
import Allblogs from "../pages/Allblogs";
import Blogdetailsdisplay from "../components/Blogdetailsdisplay";
import HomePageAllBlogs from "../pages/HomePageAllBlogs";
import Adminpremission from "../layout/Adminpremission";
import Favourite from "../pages/Favourite";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path:'Homeallblogs',
        element:<HomePageAllBlogs/>
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile/>,
          },
          {
            path:'category',
            element:<Adminpremission><Category/></Adminpremission>
          },
          {
            path:'addblog',
            element:<Adminpremission><AddBlog/></Adminpremission>
          },
          {
            path:'allblogs',
            element:<Adminpremission><Allblogs/></Adminpremission>
          },
          {
            path:'favourite',
            element:<Favourite/>
          }
        ],
      },
      {
        path:'blog/:blog',
        element:<Blogdetailsdisplay/>
      }
    ],
  },
]);

export default router;