import connectDB from "../../../../config/dbconnection";
import QuickQuoteService from "../../../../services/quickQuoteServices";
import apiResponse from "../../../../utils/common/apiResponse";
export async function GET(req) {
  try {
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    await connectDB();
    const { searchParams } = new URL(req.url);
    const page = Math.max(Number(searchParams.get("page")) || 1, 1);
    const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 20, 1), 100);
    const service = new QuickQuoteService();
    const result = await service.getAllQuickQuotes({ page, limit, search: searchParams.get("search") || undefined });
    return apiResponse.success("Quick quotes fetched successfully.", result);
  } catch (error) {
    return apiResponse.error(error);
  }
}
