import connectDB from "../../../../../../config/dbconnection";
import { success, validationError, serverError } from "../../../../../../utils/apiResponse";
import { requireAdmin } from "../../../../../../utils/auth";
import { Booking } from "../../../../../../schema/schema";

const validStatuses = ["pending", "confirmed", "completed", "cancelled", "no_show"];

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;

    const { bookingId } = await params;
    const body = await req.json();
    const nextStatus = body.status;

    if (!nextStatus || !validStatuses.includes(nextStatus)) {
      return validationError("A valid booking status is required.", null, 422);
    }

    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      return validationError("Booking not found.", null, 404);
    }

    booking.bookingStatus = nextStatus;
    if (nextStatus === "cancelled") {
      booking.paymentStatus = "cancelled";
    }
    await booking.save();

    return success("Booking status updated successfully.", { booking });
  } catch (error) {
    console.error("PATCH_ADMIN_BOOKING_STATUS_ERROR:", error);
    return serverError("Unable to update booking status.");
  }
}
