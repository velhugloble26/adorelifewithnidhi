import connectDB from "../../../../config/dbconnection";
import {
  success,
  serverError,
  validationError,
} from "../../../../utils/apiResponse";
import BlogService from "../../../../services/blogServices";
import { requireAdmin } from "../../../../utils/auth";
import { z } from "zod";

const schema = z.object({
  title: z.string().trim().min(1).max(200),
  slug: z.string().trim().min(1).max(200).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  category: z.string().trim().min(1).max(100),
  excerpt: z.string().trim().min(1).max(1000),
  image: z.string().trim().min(1).max(1000),
  content: z.string().trim().min(1),
});

export async function POST(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();
    const validation = schema.safeParse(await req.json());
    if (!validation.success) return validationError(validation.error.issues.map((issue) => issue.message), 422);
    return success("Blog created successfully.", await BlogService.createBlog(validation.data), 201);
  } catch (error) {
    console.error("CREATE_BLOG_ERROR:", error);
    if (error.code === 11000) return validationError(["Blog slug already exists."], 409);
    return error.statusCode ? validationError([error.message], error.statusCode) : serverError("Unable to create blog.");
  }
}
