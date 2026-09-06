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
      "therapyGoalsOther", "addNotes", "meetYourTherapist", "informedConsent", "InformedConsentforTherapySessions", "conformationOfBooking",
    ];
    const updates = Object.fromEntries(editableFields.filter((field) => Object.prototype.hasOwnProperty.call(body, field)).map((field) => [field, body[field]]));

    if (body.sessions !== undefined) {
      if (!Array.isArray(body.sessions) || body.sessions.length === 0) {
        return validationError("At least one session is required.", null, 422);
      }
      const sessions = body.sessions.map((session, index) => ({
        sessionNumber: index + 1,
        date: String(session.date || "").trim(),
        time: String(session.time || "").trim(),
        sessionType: session.sessionType,
        location: String(session.location || "").trim(),
        amountPaid: Number(session.amountPaid || 0),
        remarks: String(session.remarks || "").trim(),
        status: session.status || "scheduled",
        ...(booking.sessions?.[index]?.createdAt ? { createdAt: booking.sessions[index].createdAt } : {}),
        updatedAt: new Date(),
      }));
      const invalidSession = sessions.find((session) => (
        !/^\d{4}-\d{2}-\d{2}$/.test(session.date)
        || !session.time
        || !["Online", "Offline"].includes(session.sessionType)
        || !Number.isFinite(session.amountPaid) || session.amountPaid < 0
        || !["scheduled", "confirmed", "completed", "cancelled", "no_show"].includes(session.status)
      ));
      if (invalidSession) return validationError("Each session needs a valid date, time, type, and status.", null, 422);
      updates.sessions = sessions;
    }

    if (Object.keys(updates).length === 0) return validationError("No booking fields were provided.", null, 422);
    if (updates.numberOfChildren !== undefined) {
      updates.numberOfChildren = Number(updates.numberOfChildren);
      if (!Number.isInteger(updates.numberOfChildren) || updates.numberOfChildren < 0) return validationError("Number of children must be a non-negative whole number.", null, 422);
    }
    if (updates.currentlyTakingAnyPsychiatricMedication === true && !updates.medicationDetails?.trim() && !booking.medicationDetails?.trim()) {
      return validationError("Medication details are required when medication is selected.", null, 422);
    }

    booking.set(updates);
    if (updates.sessions) {
      booking.set("sessions", updates.sessions);
      booking.markModified("sessions");
      booking.selectedDate = updates.sessions[0].date;
      booking.selectedTime = updates.sessions[0].time;
      booking.sessionType = updates.sessions[0].sessionType;
      booking.sessionMode = updates.sessions[0].sessionType;
    }
    await booking.save({ validateModifiedOnly: true });
    if (updates.sessions) {
      await Booking.collection.updateOne(
        { _id: booking._id },
        {
          $set: {
            sessions: updates.sessions,
            selectedDate: updates.sessions[0].date,
            selectedTime: updates.sessions[0].time,
            sessionType: updates.sessions[0].sessionType,
            sessionMode: updates.sessions[0].sessionType,
          },
        },
      );
    }
    const savedBooking = await Booking.findOne({ bookingId }).lean();
    return success("Booking details updated successfully.", { booking: savedBooking });
  } catch (error) {
    console.error("PATCH_ADMIN_BOOKING_DETAIL_ERROR:", error);
    if (error.name === "ValidationError") return validationError("Booking details are invalid.", error.errors, 422);
    return serverError("Unable to update booking details.");
  }
}
