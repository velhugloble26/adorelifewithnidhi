import connectDB from "../../../../../../config/dbconnection";
import { success, validationError, serverError } from "../../../../../../utils/apiResponse";
import { requireAdmin } from "../../../../../../utils/auth";
import { Booking } from "../../../../../../schema/schema";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;

    const { bookingId } = await params;
    const booking = await Booking.findOne({ bookingId });

    if (!booking) {
      return validationError("Booking not found.", null, 404);
    }

    booking.bookingStatus = "cancelled";
    booking.paymentStatus = booking.paymentStatus === "paid" ? "refunded" : "cancelled";
    await booking.save();

    return success("Booking cancelled successfully.", { booking });
  } catch (error) {
    console.error("PATCH_ADMIN_BOOKING_CANCEL_ERROR:", error);
    return serverError("Unable to cancel the booking.");
  }
}
