import jwt from "jsonwebtoken";
import Razorpay from "razorpay";
import connectDB from "../../../../config/dbconnection";
import { success, validationError, serverError } from "../../../../utils/apiResponse";
import {
  BOOKING_PACKAGES,
  generateBookingId,
  validateBookingRequest,
  isSlotUnavailable,
} from "../../../../services/bookingServices";
import { Booking } from "../../../../schema/schema";

function getRazorpayClient() {
  const keyId = process.env.RAZZER_PAY_KEY_ID;
  const keySecret = process.env.RAZZER_PAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("RAZORPAY credentials are not configured.");
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
}

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
    const errors = validateBookingRequest(body);

    if (Object.keys(errors).length > 0) {
      return validationError("Please complete the booking details correctly.", errors, 422);
    }

    const keyId = process.env.RAZZER_PAY_KEY_ID;
    if (!keyId) {
      return serverError("Razorpay is not configured for this environment.");
    }

    if (await isSlotUnavailable(body.selectedDate, body.selectedTime, body.sessionType)) {
      return validationError("This slot is marked as not available. Please select another time.", null, 409);
    }

    const packageInfo = BOOKING_PACKAGES.find((item) => item.id === body.packageId) || BOOKING_PACKAGES[0];
    const duplicateBooking = await Booking.findOne({
      selectedDate: body.selectedDate,
      selectedTime: body.selectedTime,
      sessionType: body.sessionType,
      bookingStatus: { $ne: "cancelled" },
    });

    if (duplicateBooking) {
      return validationError("This time slot is already booked. Please select another time.", null, 409);
    }

    const bookingId = generateBookingId();
    const booking = await Booking.create({
      userId: authUser?.id || null,
      userEmail: authUser?.email || body.email || null,
      bookingId,
      packageId: packageInfo.id,
      packageName: packageInfo.name,
      packagePrice: packageInfo.price,
      selectedDate: body.selectedDate,
      selectedTime: body.selectedTime,
      sessionType: body.sessionType,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      whatsappNumber: body.whatsappNumber,
      paymentMethod: "online",
      paymentStatus: "pending",
      bookingStatus: "pending",
    });

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: Number(packageInfo.price) * 100,
      currency: "INR",
      receipt: booking.bookingId,
      notes: {
        bookingId: booking.bookingId,
        packageId: packageInfo.id,
        selectedDate: body.selectedDate,
        selectedTime: body.selectedTime,
        sessionType: body.sessionType,
      },
    });

    booking.razorpayOrderId = order.id;
    await booking.save();

    return success("Razorpay order created successfully.", {
      order,
      keyId,
      amount: Number(packageInfo.price) * 100,
      currency: "INR",
      bookingId: booking.bookingId,
    });
  } catch (error) {
    console.error("CREATE_RAZORPAY_ORDER_ERROR:", error);
    if (error.statusCode) {
      return validationError(error.message, error.details || null, error.statusCode);
    }
    return serverError("Unable to create the Razorpay order.");
  }
}
