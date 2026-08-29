import connectDB from "../../../../config/dbconnection";
import { success, serverError } from "../../../../utils/apiResponse";
import { getBookingAvailability } from "../../../../services/bookingServices";

export async function GET() {
  try {
    await connectDB();
    const dates = await getBookingAvailability(7);
    return success("Availability fetched successfully.", {
      dates,
      todayFullyBooked: !dates[0]?.isAvailable,
    });
  } catch (error) {
    console.error("GET_BOOKING_AVAILABILITY_ERROR:", error);
    return serverError("Unable to fetch booking availability.");
  }
}
