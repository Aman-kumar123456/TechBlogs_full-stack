import uploadImageClodinary from "../utils/uploadCloudinaryImage.js";

export async function uploadimagecontroller(request, response) {
  try {
    const image = request.file;

    const imageurl = await uploadImageClodinary(image);

    return response.json({
      message: "image uploaded",
      success: true,
      error: false,
      data: imageurl,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
