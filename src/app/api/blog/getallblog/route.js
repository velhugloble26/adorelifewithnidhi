import connectDB from "../../../../config/dbconnection";
import {
  success,
  serverError,
} from "../../../../utils/apiResponse";
import BlogService from "../../../../services/blogServices";

export async function GET(req) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 20, 1), 100);
    return success("Blogs fetched successfully.", await BlogService.getAllBlogs({ page, limit, search: searchParams.get("search") || undefined, category: searchParams.get("category") || undefined }));
  } catch (error) {
    console.error("GET_BLOGS_ERROR:", error);
    return serverError("Unable to fetch blogs.");
  }
}
