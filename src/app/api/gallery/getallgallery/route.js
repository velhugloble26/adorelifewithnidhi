import connectDB from "@/config/database";
import GalleryService from "@/services/galleryServices";
import { success, serverError } from "@/utils/apiResponse";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 20, 1), 100);
    return success("Gallery items fetched successfully.", await GalleryService.getAllGallery({ page, limit, search: searchParams.get("search") || undefined }));
  } catch (error) {
    console.error("GET_GALLERY_ERROR:", error);
    return serverError("Unable to fetch gallery items.");
  }
}
