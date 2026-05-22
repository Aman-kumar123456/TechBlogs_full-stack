# TechBlog - Full Stack Blogging Platform

A full-stack tech blogging platform where users can read blogs, like posts, save favourites, and admins can publish and manage articles.

## Live Demo

Frontend: https://tech-blogs-full-stack.vercel.app
Backend: https://techblogs-full-stack.onrender.com

## Features

- User Authentication (Login/Register)
- Create & Publish Blogs
- Blog Categories
- Like & Dislike System
- Favourite Blogs
- Admin Dashboard
- Responsive Design
- JWT Authentication
- REST API Integration



## Tech Stack

### Frontend
- React.js
- Redux Toolkit
- Tailwind CSS
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### Other Tools
- JWT Authentication
- Cloudinary (for image upload)
- Render/Vercel Deployment




## Folder Structure

/client     -> Frontend
/server     -> Backend




## Installation

### Clone Repository

git clone https://github.com/Aman-kumar123456/TechBlogs_full-stack.git
### Install Frontend Dependencies

cd client
npm install

### Install Backend Dependencies

cd server
npm install


## Run Project

### Backend

npm run server

### Frontend

npm run dev





## API Endpoints

POST /api/user/register
POST /api/user/login
GET /api/blog/get
POST /api/blog/create
