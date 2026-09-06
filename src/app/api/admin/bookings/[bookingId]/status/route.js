import connectDB from "../../../../../../config/dbconnection";
import { success, validationError, serverError } from "../../../../../../utils/apiResponse";
import { requireAdmin } from "../../../../../../utils/auth";
import { Booking } from "../../../../../../schema/schema";

const validStatuses = ["pending", "confirmed", "completed", "cancelled", "no_show"];
const validPaymentStatuses = ["pending", "paid", "cash_received", "failed", "cancelled"];

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;

    const { bookingId } = await params;
    const body = await req.json();
    const nextStatus = body.status;
    const nextPaymentStatus = body.paymentStatus;

    if ((!nextStatus || !validStatuses.includes(nextStatus)) && (!nextPaymentStatus || !validPaymentStatuses.includes(nextPaymentStatus))) {
      return validationError("A valid booking status is required.", null, 422);
    }

    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      return validationError("Booking not found.", null, 404);
    }

    if (nextPaymentStatus && !nextStatus) {
      const updatedBooking = await Booking.findOneAndUpdate(
        { bookingId },
        { $set: { paymentStatus: nextPaymentStatus, updated_at: new Date() } },
        { new: true, runValidators: true },
      ).lean();

      return success("Payment status updated successfully.", { booking: updatedBooking });
    }

    if (nextStatus) booking.bookingStatus = nextStatus;
    if (nextPaymentStatus) booking.paymentStatus = nextPaymentStatus;
    if (nextStatus === "cancelled" || nextPaymentStatus === "cancelled") {
      booking.paymentStatus = "cancelled";
    }
    if (nextStatus && booking.sessions?.length) {
      const sessionStatus = nextStatus === "pending" ? "scheduled" : nextStatus;
      if (["scheduled", "confirmed", "completed", "cancelled", "no_show"].includes(sessionStatus)) {
        booking.sessions.forEach((session) => {
          session.status = sessionStatus;
          session.updatedAt = new Date();
        });
      }
    }
    await booking.save({ validateModifiedOnly: true });

    return success("Booking status updated successfully.", { booking });
  } catch (error) {
    console.error("PATCH_ADMIN_BOOKING_STATUS_ERROR:", error);
    return serverError("Unable to update booking status.");
  }
}
