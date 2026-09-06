import connectDB from "../../../../../config/dbconnection";
import { success, validationError, serverError } from "../../../../../utils/apiResponse";
import { requireAdmin } from "../../../../../utils/auth";
import { Booking } from "../../../../../schema/schema";

export async function GET(req, { params }) {
  try {
    await connectDB();
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;

    const { bookingId } = await params;
    const booking = await Booking.findOne({ bookingId }).lean();

    if (!booking) {
      return validationError("Booking not found.", null, 404);
    }

    return success("Booking loaded successfully.", { booking });
  } catch (error) {
    console.error("GET_ADMIN_BOOKING_DETAIL_ERROR:", error);
    return serverError("Unable to load booking details.");
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectDB();
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;

    const { bookingId } = await params;
    const body = await req.json();
    const booking = await Booking.findOne({ bookingId });
    if (!booking) return validationError("Booking not found.", null, 404);

    const editableFields = [
      "firstName", "lastName", "email", "phone", "whatsappNumber", "identifyYourGender", "dob",
      "location", "sessionMode", "occupation", "relationShipStatus", "numberOfChildren",
      "currentlyTakingAnyPsychiatricMedication", "medicationDetails", "whereuknowaboutus", "therapyGoals",
      "therapyGoalsOther", "addNotes", "InformedConsentforTherapySessions", "conformationOfBooking",
    ];
    const updates = Object.fromEntries(editableFields.filter((field) => Object.prototype.hasOwnProperty.call(body, field)).map((field) => [field, body[field]]));

    if (Object.keys(updates).length === 0) return validationError("No booking fields were provided.", null, 422);
    if (updates.numberOfChildren !== undefined) {
      updates.numberOfChildren = Number(updates.numberOfChildren);
      if (!Number.isInteger(updates.numberOfChildren) || updates.numberOfChildren < 0) return validationError("Number of children must be a non-negative whole number.", null, 422);
    }
    if (updates.currentlyTakingAnyPsychiatricMedication === true && !updates.medicationDetails?.trim() && !booking.medicationDetails?.trim()) {
      return validationError("Medication details are required when medication is selected.", null, 422);
    }

    booking.set(updates);
    await booking.save({ validateModifiedOnly: true });
    return success("Booking details updated successfully.", { booking: booking.toObject() });
  } catch (error) {
    console.error("PATCH_ADMIN_BOOKING_DETAIL_ERROR:", error);
    if (error.name === "ValidationError") return validationError("Booking details are invalid.", error.errors, 422);
    return serverError("Unable to update booking details.");
  }
}
