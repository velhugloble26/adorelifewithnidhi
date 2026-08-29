import connectDB from "../../../../../config/dbconnection";
import { success, validationError, serverError } from "../../../../../utils/apiResponse";
import { requireAdmin } from "../../../../../utils/auth";
import { Booking } from "../../../../../schema/schema";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;

    const { bookingId } = await params;
    const booking = await Booking.findOne({ bookingId }).lean();

    if (!booking) {
      return validationError("Booking not found.", null, 404);
    }

    return success("Booking loaded successfully.", { booking });
  } catch (error) {
    console.error("GET_ADMIN_BOOKING_DETAIL_ERROR:", error);
    return serverError("Unable to load booking details.");
  }
}
