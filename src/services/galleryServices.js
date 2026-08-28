import { Gallery } from "../schema/schema";
import { deleteLocalUpload } from "../utils/uploads";

class GalleryService {
  async createGallery(data) {
    return Gallery.create(data);
  }

  async getAllGallery({ page = 1, limit = 20, search } = {}) {
    const filter = search ? { $or: [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ] } : {};
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Gallery.find(filter).sort({ created_at: -1 }).skip(skip).limit(limit),
      Gallery.countDocuments(filter),
    ]);
    return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }

  async getGalleryById(id) {
    const item = await Gallery.findById(id);
    if (!item) throw Object.assign(new Error("Gallery item not found."), { statusCode: 404 });
    return item;
  }

  async updateGallery(id, data) {
    const previous = data.image ? await Gallery.findById(id).select("image") : null;
    const item = await Gallery.findByIdAndUpdate(id, { ...data, updated_at: new Date() }, { new: true, runValidators: true });
    if (!item) throw Object.assign(new Error("Gallery item not found."), { statusCode: 404 });
    if (previous?.image && previous.image !== item.image) await deleteLocalUpload(previous.image);
    return item;
  }

  async deleteGallery(id) {
    const item = await Gallery.findByIdAndDelete(id);
    if (!item) throw Object.assign(new Error("Gallery item not found."), { statusCode: 404 });
    await deleteLocalUpload(item.image);
    return { message: "Gallery item deleted successfully." };
  }
}

export default new GalleryService();
