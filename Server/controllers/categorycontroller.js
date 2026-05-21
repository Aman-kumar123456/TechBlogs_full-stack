import CategoryModel from "../models/category.model.js";

export async function addcategorycontroller(request, response) {
  try {
    const { title } = request.body;

    if (!title) {
      return response.status(400).json({
        message: "provide title",
        success: false,
        error: true,
      });
    }
    const category = new CategoryModel({ title });
    const savecategory = await category.save();
    return response.json({
      message: "Category Added",
      success: true,
      error: false,
      data: savecategory,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// get all category controller.....
export async function getcategorycontroller(request, response) {
  try {
    const data = await CategoryModel.find().sort({ createdAt: -1 });

    return response.json({
      data: data,
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// delete category controller......

export async function deleteCategoryController(request, response) {
  try {
    const { _id } = request.body;

    const deleteCategory = await CategoryModel.deleteOne({ _id: _id });

    if (!deleteCategory) {
      return response.status(400).json({
        message: "Category not delete",
        success: false,
        error: true,
      });
    }

    return response.json({
      message: "Category deleted",
      success: true,
      error: false,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
