import { requireAdmin } from "@/utils/auth";
import connectDB from "@/config/database";
import GalleryService from "@/services/galleryServices";
import { success, serverError, validationError } from "@/utils/apiResponse";
import { z } from "zod";

export async function DELETE(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();
    const validation = z.object({ galleryId: z.string().min(1) }).safeParse(await req.json());
    if (!validation.success) return validationError(["Gallery id is required."], 422);
    return success("Gallery item deleted successfully.", await GalleryService.deleteGallery(validation.data.galleryId));
  } catch (error) {
    console.error("DELETE_GALLERY_ERROR:", error);
    return error.statusCode ? validationError([error.message], error.statusCode) : serverError("Unable to delete gallery item.");
  }
}
