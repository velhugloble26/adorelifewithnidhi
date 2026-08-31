import connectDB from "../../../../../../config/dbconnection";
import { success, validationError, serverError } from "../../../../../../utils/apiResponse";
import { requireAdmin } from "../../../../../../utils/auth";
import { Booking } from "../../../../../../schema/schema";
import { isSlotUnavailable } from "../../../../../../services/bookingServices";

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;

    const { bookingId } = await params;
    const body = await req.json();

    if (!body.date || !body.time || !body.sessionType) {
      return validationError("Date, time, and session type are required.", null, 422);
    }

    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      return validationError("Booking not found.", null, 404);
    }

    if (await isSlotUnavailable(body.date, body.time, body.sessionType)) {
      return validationError("This slot is marked as not available.", null, 409);
    }

    const conflictingBooking = await Booking.findOne({
      _id: { $ne: booking._id },
      selectedDate: body.date,
      selectedTime: body.time,
      sessionType: body.sessionType,
      bookingStatus: { $ne: "cancelled" },
    });

    if (conflictingBooking) {
      return validationError("This slot is no longer available.", null, 409);
    }

    booking.selectedDate = body.date;
    booking.selectedTime = body.time;
    booking.sessionType = body.sessionType;
    await booking.save();

    return success("Booking rescheduled successfully.", { booking });
  } catch (error) {
    console.error("PATCH_ADMIN_BOOKING_RESCHEDULE_ERROR:", error);
    return serverError("Unable to reschedule the booking.");
  }
}
