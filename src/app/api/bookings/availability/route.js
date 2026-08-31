import connectDB from "../../../../config/dbconnection";
import { success, serverError } from "../../../../utils/apiResponse";
import { getBookingAvailability } from "../../../../services/bookingServices";

export async function GET() {
  try {
    await connectDB();
    // Return today plus the next five dates. The booking UI intentionally skips today.
    const dates = await getBookingAvailability(6);
    return success("Availability fetched successfully.", {
      dates,
      todayFullyBooked: !dates[0]?.isAvailable,
    });
  } catch (error) {
    console.error("GET_BOOKING_AVAILABILITY_ERROR:", error);
    return serverError("Unable to fetch booking availability.");
  }
}
