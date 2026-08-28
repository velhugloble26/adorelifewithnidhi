import connectDB from "../../../../config/dbconnection";
import {
  success,
  serverError,
  validationError,
} from "../../../../utils/apiResponse";
import GalleryService from "../../../../services/galleryServices";
export async function GET(req) {
  try {
    await connectDB();
    const id = new URL(req.url).searchParams.get("id");
    if (!id) return validationError(["Gallery id is required."], 422);
    return success("Gallery item fetched successfully.", await GalleryService.getGalleryById(id));
  } catch (error) {
    console.error("GET_GALLERY_ITEM_ERROR:", error);
    return error.statusCode ? validationError([error.message], error.statusCode) : serverError("Unable to fetch gallery item.");
  }
}
