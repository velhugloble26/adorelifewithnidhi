import crypto from "crypto";
import { Booking, UnavailableSlot } from "../schema/schema";

export const BOOKING_PACKAGES = [
  { id: "regular", name: "Regular Session", price: 2000 },
  { id: "four", name: "4 Sessions", price: 4000 },
  { id: "eight", name: "8 Sessions", price: 12000 },
];

export const DEFAULT_TIME_SLOTS = [
  { time: "09:00 AM", type: "Offline" },
  { time: "10:30 AM", type: "Offline" },
  { time: "12:00 PM", type: "Offline" },
  { time: "04:00 PM", type: "Online" },
  { time: "06:00 PM", type: "Online" },
  { time: "07:30 PM", type: "Online" },
];

export function generateBookingId() {
  const stamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `AL-${stamp}-${random}`;
}

export function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatDateLabel(date) {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

export function validateBookingRequest(data) {
  const errors = {};

  if (!data.packageId) errors.packageId = "Please select a session package.";
  if (!data.selectedDate) errors.selectedDate = "Please select a date.";
  if (!data.selectedTime) errors.selectedTime = "Please select a time.";
  if (!data.sessionType || !["Online", "Offline"].includes(data.sessionType)) {
    errors.sessionType = "Please select a valid session type.";
  }
  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.firstName = "First name is required.";
  }
  if (!data.lastName || data.lastName.trim().length < 2) {
    errors.lastName = "Last name is required.";
  }
  if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!data.phone || !/^[0-9+\-\s()]{7,15}$/.test(data.phone)) {
    errors.phone = "Enter a valid phone number.";
  }
  if (!data.whatsappNumber || !/^[0-9+\-\s()]{7,15}$/.test(data.whatsappNumber)) {
    errors.whatsappNumber = "Enter a valid WhatsApp number.";
  }

  return errors;
}

export async function getBookingAvailability(days = 7) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const dates = [];
  for (let offset = 0; offset < days; offset += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + offset);
    const dateKey = formatDateKey(date);

    const [bookings, unavailableSlots] = await Promise.all([
      Booking.find({ selectedDate: dateKey, bookingStatus: { $ne: "cancelled" } }).lean(),
      UnavailableSlot.find({ selectedDate: dateKey }).lean(),
    ]);

    const bookedKeys = new Set(bookings.map((booking) => `${booking.selectedTime}|${booking.sessionType}`));
    const unavailableKeys = new Set(unavailableSlots.map((slot) => `${slot.selectedTime}|${slot.sessionType}`));
    const slots = DEFAULT_TIME_SLOTS.map((slot) => {
      const key = `${slot.time}|${slot.type}`;
      const status = bookedKeys.has(key) ? "booked" : unavailableKeys.has(key) ? "unavailable" : "available";
      return { time: slot.time, sessionType: slot.type, label: `${slot.type} • ${slot.time}`, status };
    });

    dates.push({
      date: dateKey,
      label: formatDateLabel(date),
      isAvailable: slots.some((slot) => slot.status === "available"),
      slots,
    });
  }

  return dates;
}

export async function isSlotUnavailable(selectedDate, selectedTime, sessionType) {
  return Boolean(await UnavailableSlot.exists({ selectedDate, selectedTime, sessionType }));
}

export async function createCashBooking(payload) {
  const errors = validateBookingRequest(payload);
  if (Object.keys(errors).length > 0) {
    const error = new Error("Validation failed.");
    error.statusCode = 422;
    error.details = errors;
    throw error;
  }

  if (await isSlotUnavailable(payload.selectedDate, payload.selectedTime, payload.sessionType)) {
    const error = new Error("This slot is marked as not available. Please select another time.");
    error.statusCode = 409;
    throw error;
  }

  const existingBooking = await Booking.findOne({
    selectedDate: payload.selectedDate,
    selectedTime: payload.selectedTime,
    sessionType: payload.sessionType,
    bookingStatus: { $ne: "cancelled" },
  });

  if (existingBooking) {
    const error = new Error("This slot is already booked. Please select another time.");
    error.statusCode = 409;
    throw error;
  }

  const packageInfo = BOOKING_PACKAGES.find((item) => item.id === payload.packageId) || BOOKING_PACKAGES[0];

  const booking = await Booking.create({
    userId: payload.userId || null,
    userEmail: payload.userEmail || null,
    bookingId: generateBookingId(),
    packageId: packageInfo.id,
    packageName: packageInfo.name,
    packagePrice: packageInfo.price,
    selectedDate: payload.selectedDate,
    selectedTime: payload.selectedTime,
    sessionType: payload.sessionType,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
    whatsappNumber: payload.whatsappNumber,
    paymentMethod: "cash",
    paymentStatus: "pending",
    bookingStatus: "pending",
  });

  return booking.toObject();
}

export async function getUserBookings(user) {
  return Booking.find({
    $or: [
      { userId: user.id },
      { userEmail: user.email },
    ],
  }).sort({ created_at: -1 }).lean();
}

export async function getUserBookingById(user, bookingId) {
  return Booking.findOne({
    bookingId,
    $or: [
      { userId: user.id },
      { userEmail: user.email },
    ],
  }).lean();
}

export function verifyRazorpaySignature({ orderId, paymentId, signature }) {
  const keySecret = process.env.RAZZER_PAY_KEY_SECRET;

  if (!keySecret) {
    throw new Error("RAZZER_PAY_KEY_SECRET is not configured.");
  }

  const generatedSignature = crypto
    .createHmac("sha256", keySecret)
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  return generatedSignature === signature;
}
