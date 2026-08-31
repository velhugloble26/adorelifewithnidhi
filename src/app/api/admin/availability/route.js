import connectDB from "../../../../config/dbconnection";
import { success, validationError, serverError } from "../../../../utils/apiResponse";
import { requireAdmin } from "../../../../utils/auth";
import { Booking, UnavailableSlot } from "../../../../schema/schema";
import { DEFAULT_TIME_SLOTS, getBookingAvailability } from "../../../../services/bookingServices";

export async function GET(req) {
  try {
    await connectDB();
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    const dates = await getBookingAvailability(6);
    return success("Slot availability fetched successfully.", { dates: dates.slice(1, 6) });
  } catch (error) {
    console.error("GET_ADMIN_AVAILABILITY_ERROR:", error);
    return serverError("Unable to fetch slot availability.");
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    const { date, time, sessionType, status } = await req.json();
    const validSlot = DEFAULT_TIME_SLOTS.some((slot) => slot.time === time && slot.type === sessionType);
    if (!date || !validSlot || !["available", "unavailable"].includes(status)) {
      return validationError("A valid date, time, session type, and status are required.", null, 422);
    }
    if (status === "unavailable") {
      const booked = await Booking.exists({ selectedDate: date, selectedTime: time, sessionType, bookingStatus: { $ne: "cancelled" } });
      if (booked) return validationError("A booked slot cannot be marked as unavailable.", null, 409);
      await UnavailableSlot.findOneAndUpdate(
        { selectedDate: date, selectedTime: time, sessionType },
        { $set: { createdBy: auth.user.id, updated_at: new Date() } },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
    } else {
      await UnavailableSlot.deleteOne({ selectedDate: date, selectedTime: time, sessionType });
    }
    return success(`Slot marked as ${status === "unavailable" ? "not available" : "available"}.`, { date, time, sessionType, status });
  } catch (error) {
    console.error("PATCH_ADMIN_AVAILABILITY_ERROR:", error);
    return serverError("Unable to update slot availability.");
  }
}
