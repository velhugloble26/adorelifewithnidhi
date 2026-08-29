import jwt from "jsonwebtoken";
import connectDB from "../../../../config/dbconnection";
import { success, validationError, serverError } from "../../../../utils/apiResponse";
import { createCashBooking } from "../../../../services/bookingServices";

function getRequestUser(req) {
  const token = req.cookies.get("accessToken")?.value;
  if (!token) return null;

  try {
    const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    if (payload.type !== "access") return null;
    return { id: payload.sub, email: payload.email };
  } catch {
    return null;
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const authUser = getRequestUser(req);

    try {
      const booking = await createCashBooking({
        ...body,
        userId: authUser?.id || null,
        userEmail: authUser?.email || body.email || null,
      });
      return success("Booking created successfully.", booking, 201);
    } catch (error) {
      if (error.statusCode === 409 || error.statusCode === 422) {
        return validationError(error.message, error.details || null, error.statusCode);
      }
      throw error;
    }
  } catch (error) {
    console.error("CREATE_BOOKING_ERROR:", error);
    if (error.statusCode) {
      return validationError(error.message, error.details || null, error.statusCode);
    }
    return serverError("Unable to create booking.");
  }
}
