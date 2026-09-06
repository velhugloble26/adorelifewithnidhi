import connectDB from "../../../../config/dbconnection";
import { success, validationError, serverError } from "../../../../utils/apiResponse";
import { requireAdmin } from "../../../../utils/auth";
import { Booking } from "../../../../schema/schema";
import { generateBookingId } from "../../../../services/bookingServices";
import { THERAPY_CONTENT } from "../../../../constants/therapyContent.js";

const sessionStatuses = ["scheduled", "confirmed", "completed", "cancelled", "no_show"];

function validateSession(session) {
  return /^\d{4}-\d{2}-\d{2}$/.test(String(session.date || ""))
    && String(session.time || "").trim()
    && ["Online", "Offline"].includes(session.sessionType)
    && Number.isFinite(Number(session.amountPaid ?? 0))
    && Number(session.amountPaid ?? 0) >= 0
    && sessionStatuses.includes(session.status || "scheduled");
}

function flattenBooking(booking) {
  const sessions = booking.sessions?.length ? booking.sessions : [{
    sessionNumber: 1,
    date: booking.selectedDate,
    time: booking.selectedTime,
    sessionType: booking.sessionType,
    location: booking.location,
    amountPaid: booking.paymentStatus === "paid" || booking.paymentStatus === "cash_received" ? booking.packagePrice : 0,
    remarks: "",
    status: "scheduled",
  }];
  return sessions.map((session, index) => ({
    bookingId: booking.bookingId,
    date: session.date,
    time: session.time,
    clientName: `${booking.firstName} ${booking.lastName}`.trim(),
    sessionNumber: session.sessionNumber || index + 1,
    amountPaid: Number(session.amountPaid || 0),
    mode: session.sessionType,
    location: session.location || "",
    remarks: session.remarks || "",
    status: session.status || "scheduled",
  }));
}

export async function GET(req) {
  try {
    await connectDB();
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim().toLowerCase();
    const date = searchParams.get("date");
    const mode = searchParams.get("mode");
    const bookings = await Booking.find({}).sort({ created_at: -1 }).lean();
    const rows = bookings.flatMap(flattenBooking).filter((row) => (
      (!search || row.clientName.toLowerCase().includes(search) || row.bookingId.toLowerCase().includes(search))
      && (!date || row.date === date)
      && (!mode || row.mode === mode)
    ));
    return success("Client report loaded successfully.", { data: rows });
  } catch (error) {
    console.error("GET_CLIENT_REPORT_ERROR:", error);
    return serverError("Unable to load client report.");
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    const body = await req.json();
    const session = {
      date: String(body.date || "").trim(),
      time: String(body.time || "").trim(),
      sessionType: body.mode,
      location: String(body.location || "").trim(),
      amountPaid: Number(body.amountPaid ?? 0),
      remarks: String(body.remarks || "").trim(),
      status: body.status || "scheduled",
    };
    if (!validateSession(session)) return validationError("Date, time, mode, amount, and status are required.", null, 422);

    let booking = body.bookingId ? await Booking.findOne({ bookingId: body.bookingId }) : null;
    if (!booking && body.email) booking = await Booking.findOne({ email: body.email.trim().toLowerCase() });
    if (body.bookingId && !booking) return validationError("Booking not found.", null, 404);

    if (booking) {
      const existingSessions = booking.sessions?.length ? booking.sessions.map((item) => item.toObject?.() || item) : [{
        sessionNumber: 1,
        date: booking.selectedDate,
        time: booking.selectedTime,
        sessionType: booking.sessionType,
        location: booking.location || "",
        amountPaid: 0,
        remarks: "",
        status: "scheduled",
      }];
      const nextSession = { ...session, sessionNumber: existingSessions.length + 1 };
      booking.sessions = [...existingSessions, nextSession];
      booking.markModified("sessions");
      await booking.save({ validateModifiedOnly: true });
    } else {
      const clientName = String(body.clientName || "").trim();
      if (!clientName) return validationError("Client name is required.", null, 422);
      const nameParts = clientName.split(/\s+/);
      const firstName = nameParts.shift();
      const lastName = nameParts.join(" ") || "Client";
      const email = String(body.email || `manual-${Date.now()}@adorelife.local`).trim().toLowerCase();
      booking = await Booking.create({
        bookingId: generateBookingId(),
        packageId: "manual-client",
        packageName: "Manual Client Session",
        packagePrice: session.amountPaid,
        selectedDate: session.date,
        selectedTime: session.time,
        sessionType: session.sessionType,
        meetYourTherapist: "Therapy by Nidhi",
        meetYourTherapistContent: THERAPY_CONTENT.meetYourTherapist,
        firstName,
        lastName,
        email,
        phone: String(body.phone || "N/A"),
        identifyYourGender: "Prefer not to say",
        dob: "1970-01-01",
        whatsappNumber: String(body.phone || "N/A"),
        location: session.location,
        sessionMode: session.sessionType,
        occupation: "",
        relationShipStatus: "Other",
        numberOfChildren: 0,
        currentlyTakingAnyPsychiatricMedication: false,
        medicationDetails: null,
        whereuknowaboutus: "Other",
        therapyGoals: ["Other"],
        therapyGoalsOther: "Manual client session",
        addNotes: session.remarks,
        informedConsent: "I agree",
        informedConsentContent: THERAPY_CONTENT.informedConsent,
        InformedConsentforTherapySessions: "I agree",
        conformationOfBooking: true,
        paymentMethod: "cash",
        paymentStatus: "pending",
        bookingStatus: "pending",
        sessions: [{ sessionNumber: 1, ...session }],
      });
    }
    const savedBooking = await Booking.findOne({ _id: booking._id }).lean();
    return success("Client session saved successfully.", { booking: savedBooking }, 201);
  } catch (error) {
    console.error("POST_CLIENT_REPORT_ERROR:", error);
    if (error.name === "ValidationError") return validationError("Client session is invalid.", error.errors, 422);
    return serverError("Unable to save client session.");
  }
}

export async function PATCH(req) {
  try {
    await connectDB();
    const auth = await requireAdmin(req);
    if (auth.error) return auth.error;
    const body = await req.json();
    const booking = await Booking.findOne({ bookingId: body.bookingId });
    if (!booking) return validationError("Booking not found.", null, 404);

    const existingSessions = booking.sessions?.length ? booking.sessions.map((item) => item.toObject?.() || item) : [{
      sessionNumber: 1,
      date: booking.selectedDate,
      time: booking.selectedTime,
      sessionType: booking.sessionType,
      location: booking.location || "",
      amountPaid: 0,
      remarks: "",
      status: "scheduled",
    }];
    const index = Number(body.sessionNumber) - 1;
    if (!Number.isInteger(index) || index < 0 || index >= existingSessions.length) {
      return validationError("Session not found.", null, 404);
    }

    const current = existingSessions[index];
    const session = {
      ...current,
      sessionNumber: index + 1,
      date: String(body.date ?? current.date).trim(),
      time: String(body.time ?? current.time).trim(),
      sessionType: body.mode || current.sessionType,
      location: String(body.location ?? current.location ?? "").trim(),
      amountPaid: Number(body.amountPaid ?? current.amountPaid ?? 0),
      remarks: String(body.remarks ?? current.remarks ?? "").trim(),
      status: body.status || current.status || "scheduled",
      updatedAt: new Date(),
    };
    if (!validateSession(session)) return validationError("Session details are invalid.", null, 422);

    existingSessions[index] = session;
    booking.set("sessions", existingSessions);
    booking.markModified("sessions");
    if (index === 0) {
      booking.selectedDate = session.date;
      booking.selectedTime = session.time;
      booking.sessionType = session.sessionType;
      booking.sessionMode = session.sessionType;
    }
    await booking.save({ validateModifiedOnly: true });
    return success("Client session updated successfully.", { booking: booking.toObject() });
  } catch (error) {
    console.error("PATCH_CLIENT_REPORT_ERROR:", error);
    if (error.name === "ValidationError") return validationError("Client session is invalid.", error.errors, 422);
    return serverError("Unable to update client session.");
  }
}
