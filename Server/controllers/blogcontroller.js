import BlogModel from "../models/blog.model.js";
import CategoryModel from "../models/category.model.js";

export async function addBlogcontroller(request, response) {
  try {
    const { title, description, image, category } = request.body;

    if (!title || !description || !image || !category) {
      return response.status(400).json({
        message: "Provide all fields",
        success: false,
        error: true,
      });
    }

    const Blog = new BlogModel({
      title,
      description,
      image,
      category,
    });
    const saveblog = await Blog.save();

    const updatecategory = await CategoryModel.findByIdAndUpdate(
      category,
      {
        $push: {
          blogs: saveblog._id,
        },
      },
      { new: true },
    );

    return response.json({
      message: "Blog created",
      success: true,
      error: false,
      data: saveblog,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// fetch all blogs controller.....

export async function getallblogcontroller(request, response) {
  try {
    const allblogs = await BlogModel.find();

    return response.json({
      message: "all blogs fetched successfully ",
      error: false,
      success: true,
      data: allblogs,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
//delete blogs controller.....

export async function deleteblogcontroller(request, response) {
  try {
    const { _id } = request.body;
    const deleteBlog = await BlogModel.deleteOne({ _id: _id });

    return response.json({
      message: "blog deleted",
      error: false,
      success: true,
      data: deleteBlog,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// edit blog controller.....
export async function editblogcontroller(request, response) {
  try {
    const { _id, title, description, image, category } = request.body;

    if (!_id || !title || !description || !image || !category) {
      return response.status(400).json({
        message: "Provide all fields",
        success: false,
        error: true,
      });
    }

    const updatedblog = await BlogModel.findByIdAndUpdate(
      { _id: _id },
      {
        ...(title && { title: title }),
        ...(description && { description: description }),
        ...(image && { image: image }),
        ...(category && { category: category }),
      },
      { new: true },
    );

    return response.json({
      message: "blog updated",
      success: true,
      error: false,
      data: updatedblog,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// fetch blog details by id controller......

export async function getBlogDetailsById(request, response) {
  try {
    const { _id } = request.body;

    const blogDetail = await BlogModel.findOne({ _id: _id });

    return response.json({
      message: "blog details got",
      success: true,
      error: false,
      data: blogDetail,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// fetch one blog which is created newes.....
export async function getrecentFirstBlogcontroller(request, response) {
  try {
    const recentblogs = await BlogModel.findOne().sort({ createdAt: -1 });
    return response.json({
      message: "recent blogs fetched successfully ",
      error: false,
      success: true,
      data: recentblogs,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

//fetch recent blog by limit at home page.....
export async function getRecentLimitBlogcontroller(request, response) {
  try {
    const recentblogs = await BlogModel.find()
      .sort({ createdAt: -1 })
      .limit(10);
    return response.json({
      message: "recent blogs fetched successfully ",
      error: false,
      success: true,
      data: recentblogs,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// fetch blogs By category Id controller.....

export async function getBlogByCategoryIdController(request, response) {
  try {
    const { _id } = request.body;

    if (!_id) {
      return response.status(400).json({
        message: "provide category Id",
        error: true,
        success: false,
      });
    }
    const categoryBlogs = await BlogModel.find({
      category: { $in: _id },
    })
      .sort({ createdAt: -1 })
      .limit(10);

    return response.json({
      message: "category Blogs got ",
      error: false,
      success: true,
      data: categoryBlogs,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
