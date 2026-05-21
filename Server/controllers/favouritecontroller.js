import FavouriteBlog from "../models/favourite.model.js";

// add to Favourite.....
export async function addToFavouritecontroller(request, response) {
  try {
    const userId = request.userId;
    const { blogId } = request.body;

    if (!userId || !blogId) {
      return response.status(400).json({
        message: "provide userId And blogId",
        error: true,
        success: false,
      });
    }
    const check = await FavouriteBlog.findOne({ userId, blogId });
    if (check) {
      return response.json({
        message: "Already in Favourite blogs",
        success: false,
        error: true,
      });
    }

    const favouriteblog = new FavouriteBlog({ userId, blogId });

    const savefavourite = await favouriteblog.save();

    return response.json({
      message: "Add To Favourite",
      success: true,
      error: false,
      data: savefavourite,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// get all favourite controller.....
export async function getFavouritecontroller(request, response) {
  try {
    const userId = request.userId;
    const favouriteblogs = await FavouriteBlog.find({ userId: userId })
      .populate("blogId")
      .sort({ createdAt: -1 });

    return response.json({
      message: "Favourite got",
      success: true,
      error: false,
      data: favouriteblogs,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// remove to favourite controler.....
export async function removeFavouritecontroller(request, response) {
  try {
    const userId = request.userId;
    const { blogId } = request.body;

    const removefavouriteblogs = await FavouriteBlog.deleteOne({
      userId: userId,
      blogId: blogId,
    });

    return response.json({
      message: "Blog delete from favourite",
      success: true,
      error: false,
      data: removefavouriteblogs,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}
