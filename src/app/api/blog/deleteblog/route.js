import { requireAdmin } from "@/utils/auth";
import connectDB from "@/config/database";
import BlogService from "@/services/blogServices";
import { success, serverError, validationError } from "@/utils/apiResponse";
import { z } from "zod";

export async function DELETE(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();
    const validation = z.object({ blogId: z.string().min(1) }).safeParse(await req.json());
    if (!validation.success) return validationError(["Blog id is required."], 422);
    return success("Blog deleted successfully.", await BlogService.deleteBlog(validation.data.blogId));
  } catch (error) {
    console.error("DELETE_BLOG_ERROR:", error);
    return error.statusCode ? validationError([error.message], error.statusCode) : serverError("Unable to delete blog.");
  }
}
