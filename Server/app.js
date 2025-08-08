const express = require('express');
const app = express();
const cookieParser=require('cookie-parser'); // Import cookie-parser
const cors = require('cors'); // Import CORS middleware
 // Use CORS middleware to allow cross-origin requests
require('dotenv').config();
const conn = require('./conn/conn'); // Import the conn function

conn(); // Call the function to connect to MongoDB
const userApi=require('./routes/user.route');
const adminApi=require('./routes/admin.route');
const categoryApi=require('./routes/category.route');
const blogApi=require("./routes/blog.route");
app.use(cors({
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true // Allow cookies to be sent with requests
}));
// app.get('/', (req, res) => { 
//     res.send('Welcome to Aman\'s Blog Server!');
// });
app.use(express.json());
app.use(cookieParser());
 // Middleware to parse JSON bodies
app.use('/api/user',userApi); // Use the user API routes
app.use('/api/admin',adminApi); // Use the user API routes
app.use('/api/category',categoryApi); // Use the user API routes
app.use('/api/blog',blogApi);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port} `);
})