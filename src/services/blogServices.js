import { Blog } from "../schema/schema";
import { deleteLocalUpload } from "../utils/uploads";

class BlogService {
  async createBlog(data) {
    if (await Blog.exists({ slug: data.slug })) {
      throw Object.assign(new Error("Blog slug already exists."), { statusCode: 409 });
    }
    return Blog.create(data);
  }

  async getAllBlogs({ page = 1, limit = 20, search, category } = {}) {
    const filter = {};
    if (category) filter.category = category.trim();
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Blog.find(filter).sort({ created_at: -1 }).skip(skip).limit(limit),
      Blog.countDocuments(filter),
    ]);
    return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getBlogByIdOrSlug(identifier) {
    const blog = await Blog.findOne({ $or: [{ _id: identifier }, { slug: identifier }] });
    if (!blog) throw Object.assign(new Error("Blog not found."), { statusCode: 404 });
    return blog;
  }

  async updateBlog(blogId, data) {
    const previous = data.image ? await Blog.findById(blogId).select("image") : null;
    const blog = await Blog.findByIdAndUpdate(blogId, { ...data, updated_at: new Date() }, { new: true, runValidators: true });
    if (!blog) throw Object.assign(new Error("Blog not found."), { statusCode: 404 });
    if (previous?.image && previous.image !== blog.image) await deleteLocalUpload(previous.image);
    return blog;
  }

  async deleteBlog(blogId) {
    const result = await Blog.findByIdAndDelete(blogId);
    if (!result) throw Object.assign(new Error("Blog not found."), { statusCode: 404 });
    await deleteLocalUpload(result.image);
    return { message: "Blog deleted successfully." };
  }
}

export default new BlogService();
