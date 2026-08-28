import connectDB from "@/config/database";
import BlogService from "@/services/blogServices";
import { success, serverError, validationError } from "@/utils/apiResponse";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const identifier = searchParams.get("id") || searchParams.get("slug");
    if (!identifier) return validationError(["Blog id or slug is required."], 422);
    return success("Blog fetched successfully.", await BlogService.getBlogByIdOrSlug(identifier));
  } catch (error) {
    console.error("GET_BLOG_ERROR:", error);
    return error.statusCode ? validationError([error.message], error.statusCode) : serverError("Unable to fetch blog.");
  }
}
