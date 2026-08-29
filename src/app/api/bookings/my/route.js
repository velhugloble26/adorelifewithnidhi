import connectDB from "../../../../config/dbconnection";
import { success, validationError, serverError } from "../../../../utils/apiResponse";
import { getAuthenticatedUser } from "../../../../utils/auth";
import { getUserBookings } from "../../../../services/bookingServices";

export async function GET(req) {
  try {
    await connectDB();
    const user = await getAuthenticatedUser(req);

    if (!user) {
      return validationError("Authentication required.", null, 401);
    }

    const bookings = await getUserBookings(user);
    return success("Bookings loaded successfully.", { bookings });
  } catch (error) {
    console.error("GET_MY_BOOKINGS_ERROR:", error);
    return serverError("Unable to load booking history.");
  }
}
