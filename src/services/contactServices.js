import { Contents } from "../modal/schema";

class ContactService {
  async createContact({ name, email, phone, subject, message }) {
    return Contents.create({ name, email, phone, selectedOption: subject, message });
  }

  async getAllContacts({ page = 1, limit = 20, search } = {}) {
    const filter = search ? { $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { selectedOption: { $regex: search, $options: "i" } },
    ] } : {};
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      Contents.find(filter).sort({ created_at: -1 }).skip(skip).limit(limit),
      Contents.countDocuments(filter),
    ]);
    return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };


  }
}
export default ContactService;
