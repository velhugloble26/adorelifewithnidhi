import { QuickContacts } from "../modal/schema";

class QuickQuoteService {
  async createQuickQuote({ name, email, phone, service, message }) {
    return QuickContacts.create({ name, email, phone, selectedOption: service, message });
  }

  async getAllQuickQuotes({ page = 1, limit = 20, search } = {}) {
    const filter = search ? { $or: [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { selectedOption: { $regex: search, $options: "i" } },
    ] } : {};
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      QuickContacts.find(filter).sort({ created_at: -1 }).skip(skip).limit(limit),
      QuickContacts.countDocuments(filter),
    ]);
    return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
  }
}
export default QuickQuoteService;
