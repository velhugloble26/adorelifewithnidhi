import connectDB from "../../../../config/dbconnection";
import { success, validationError, serverError } from "../../../../utils/apiResponse";
import { verifyRazorpaySignature } from "../../../../services/bookingServices";
import { Booking } from "../../../../schema/schema";

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const orderId = body?.orderId || body?.razorpay_order_id;
    const paymentId = body?.paymentId || body?.razorpay_payment_id;
    const signature = body?.signature || body?.razorpay_signature;
    const bookingId = body?.bookingId;

    if (!orderId || !paymentId || !signature || !bookingId) {
      return validationError("Payment verification data is incomplete.", null, 422);
    }

    const booking = await Booking.findOne({ bookingId });
    if (!booking) {
      return validationError("Booking not found. Please contact support.", null, 404);
    }

    if (!booking.razorpayOrderId || booking.razorpayOrderId !== orderId) {
      return validationError("Payment order does not match this booking.", null, 400);
    }

    const isValid = verifyRazorpaySignature({
      orderId: booking.razorpayOrderId,
      paymentId,
      signature,
    });

    if (!isValid) {
      return validationError("Payment verification failed. Please contact support if your account was charged.", null, 400);
    }

    booking.paymentStatus = "paid";
    booking.bookingStatus = "confirmed";
    booking.razorpayPaymentId = paymentId;
    booking.razorpaySignature = signature;
    await booking.save();

    return success("Payment verified and booking confirmed.", booking);
  } catch (error) {
    console.error("VERIFY_PAYMENT_ERROR:", error);
    if (error.statusCode) {
      return validationError(error.message, error.details || null, error.statusCode);
    }
    return serverError("Unable to verify payment.");
  }
}
