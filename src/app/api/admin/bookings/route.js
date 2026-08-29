import connectDB from "../../../../config/dbconnection";
import { success, validationError, serverError } from "../../../../utils/apiResponse";
import { requireAdmin } from "../../../../utils/auth";
import { Booking } from "../../../../schema/schema";

export async function GET(req) {
  try {
    await connectDB();
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;

    const { searchParams } = new URL(req.url);

    const filter = {};
    if (searchParams.get("date")) filter.selectedDate = searchParams.get("date");
    if (searchParams.get("status")) filter.bookingStatus = searchParams.get("status");
    if (searchParams.get("sessionType")) filter.sessionType = searchParams.get("sessionType");
    if (searchParams.get("paymentStatus")) filter.paymentStatus = searchParams.get("paymentStatus");
    if (searchParams.get("packageId")) filter.packageId = searchParams.get("packageId");

    const search = searchParams.get("search");
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phone: { $regex: search, $options: "i" } },
        { whatsappNumber: { $regex: search, $options: "i" } },
        { bookingId: { $regex: search, $options: "i" } },
      ];
    }

    const page = Math.max(Number(searchParams.get("page") || 1), 1);
    const limit = Math.min(Math.max(Number(searchParams.get("limit") || 20), 1), 100);
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Booking.find(filter).sort({ created_at: -1 }).skip(skip).limit(limit).lean(),
      Booking.countDocuments(filter),
    ]);

    return success("Bookings fetched successfully.", {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("GET_ADMIN_BOOKINGS_ERROR:", error);
    return serverError("Unable to fetch bookings.");
  }
}
