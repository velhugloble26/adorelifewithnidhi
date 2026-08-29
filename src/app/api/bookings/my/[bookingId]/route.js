import connectDB from "../../../../../config/dbconnection";
import { success, validationError, serverError } from "../../../../../utils/apiResponse";
import { getAuthenticatedUser } from "../../../../../utils/auth";
import { getUserBookingById } from "../../../../../services/bookingServices";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const user = await getAuthenticatedUser(req);

    if (!user) {
      return validationError("Authentication required.", null, 401);
    }

    const { bookingId } = await params;
    const booking = await getUserBookingById(user, bookingId);

    if (!booking) {
      return validationError("Booking not found or access denied.", null, 404);
    }

    return success("Booking loaded successfully.", { booking });
  } catch (error) {
    console.error("GET_MY_BOOKING_DETAIL_ERROR:", error);
    return serverError("Unable to load booking details.");
  }
}
