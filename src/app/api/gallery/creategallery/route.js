import connectDB from "../../../../config/dbconnection";
import {
  success,
  serverError,
  validationError,
} from "../../../../utils/apiResponse";
import GalleryService from "../../../../services/galleryServices";
import { requireAdmin } from "../../../../utils/auth";
import { z } from "zod";

const schema = z.object({ title: z.string().trim().min(1).max(200), description: z.string().trim().min(1).max(2000), image: z.string().trim().min(1).max(1000) });

export async function POST(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();
    const validation = schema.safeParse(await req.json());
    if (!validation.success) return validationError(validation.error.issues.map((issue) => issue.message), 422);
    return success("Gallery item created successfully.", await GalleryService.createGallery(validation.data), 201);
  } catch (error) {
    console.error("CREATE_GALLERY_ERROR:", error);
    return serverError("Unable to create gallery item.");
  }
}
