import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import conn from "./conn/conn.js";
import userRouter from "./routes/user.route.js";
import categoryRouter from "./routes/category.route.js";
import blogRouter from "./routes/blog.route.js";
import uploadRouter from "./routes/uploadimage.route.js";
import favouriteRouter from "./routes/favouriteblog.route.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONT_END,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  }),
);

const PORT = 5000 || process.env.PORT;

// app.get("/",(req,res)=>{
//     res.send("Hello World");
// })
app.get("/", (req, res) => {
  res.send("Hello World is here --------------------" + PORT);
});

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/blog", blogRouter);
app.use("/api/uploadimage", uploadRouter);
app.use("/api/favourite", favouriteRouter);

conn().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port {http://localhost:${PORT}}`);
  });
});
