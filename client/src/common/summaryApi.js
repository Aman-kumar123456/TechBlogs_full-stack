export const baseURL =import.meta.env.VITE_BACKEND_URL;

const summaryApi = {
  register: {
    url: "/api/user/register-user",
    method: "post",
  },
  login: {
    url: "/api/user/login-user",
    method: "post",
  },
  getuserDetails: {
    url: "/api/user/get-userdetails",
    method: "get",
  },
  updateuserdetails: {
    url: "/api/user/update-user-details",
    method: "put",
  },
  logout: {
    url: "/api/user/logout-user",
    method: "get",
  },
  uploadavatar: {
    url: "/api/user/upload-avatar",
    method: "post",
  },
  addcategory: {
    url: "/api/category/add-category",
    method: "post",
  },
  refreshtoken:{
    url:'/api/user/refresh-token',
    method:'post'
  },
  getcategory:{
    url:'/api/category/get-category',
    method:'get'
  },
  deletecategory:{
    url:'/api/category/delete-category',
    method:'delete'
  },
  addblog:{
    url:'/api/blog/add-blog',
    method:'post'
  },
  uploadimage:{
    url:'/api/uploadimage/upload-image',
    method:'post'
  },
  getblogs:{
    url:'/api/blog/get-blogs',
    method:'get'
  },
  deleteblog:{
    url:'/api/blog/delete-blog',
    method:'delete'
  },
  editblog:{
    url:'/api/blog/edit-blog',
    method:'post'
  },
  blogdetails:{
    url:'/api/blog/get-blogdetails',
    method:'post'
  },
  getonerecentblog:{
    url:'/api/blog/get-recentblog',
    method:'get'
  },
  getBlogsInLimit:{
    url:'/api/blog/get-morerecentBlog',
    method:'get'
  },
  getblogByCategoryId:{
    url:'/api/blog/get-categoryId',
    method:'post'
  },
  addToFavourite:{
    url:'/api/favourite/add-favourite',
    method:'post'
  },
  getfavouriteblog:{
    url:'/api/favourite/get-favourite',
    method:'get'
  },
  deleteTofavourite:{
    url:'/api/favourite/rempve-favourite',
    method:'post'
  }
};
export default summaryApi;
