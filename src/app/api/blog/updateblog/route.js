import { requireAdmin } from "@/utils/auth";
import connectDB from "@/config/database";
import BlogService from "@/services/blogServices";
import { success, serverError, validationError } from "@/utils/apiResponse";
import { z } from "zod";

const schema = z.object({
  blogId: z.string().min(1),
  title: z.string().trim().min(1).max(200).optional(),
  slug: z.string().trim().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).optional(),
  category: z.string().trim().min(1).max(100).optional(),
  excerpt: z.string().trim().min(1).max(1000).optional(),
  image: z.string().trim().min(1).max(1000).optional(),
  content: z.string().trim().min(1).optional(),
});

export async function PATCH(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();
    const validation = schema.safeParse(await req.json());
    if (!validation.success) return validationError(validation.error.issues.map((issue) => issue.message), 422);
    const { blogId, ...data } = validation.data;
    return success("Blog updated successfully.", await BlogService.updateBlog(blogId, data));
  } catch (error) {
    console.error("UPDATE_BLOG_ERROR:", error);
    if (error.code === 11000) return validationError(["Blog slug already exists."], 409);
    return error.statusCode ? validationError([error.message], error.statusCode) : serverError("Unable to update blog.");
  }
}
