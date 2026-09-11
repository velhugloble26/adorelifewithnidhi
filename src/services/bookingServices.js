import crypto from "crypto";
import { Booking, UnavailableSlot } from "../schema/schema";
import { THERAPY_CONTENT } from "../constants/therapyContent.js";

export const BOOKING_PACKAGES = [
  { id: "regular", name: "Regular Session", price: 2000 },
  { id: "four", name: "4 Sessions", price: 4000 },
  { id: "eight", name: "8 Sessions", price: 12000 },
  { id: "india-couple-therapy-regular", name: "Couple Therapy · Regular Session", price: 2500 },
  { id: "india-couple-therapy-4-session", name: "Couple Therapy · 4 Sessions", price: 4500 },
  { id: "india-couple-therapy-8-session", name: "Couple Therapy · 8 Sessions", price: 12500 },
  { id: "india-psychologist-psychotherapist-regular", name: "Psychologist & Psychotherapist · Regular Session", price: 2500 },
  { id: "india-psychologist-psychotherapist-4-session", name: "Psychologist & Psychotherapist · 4 Sessions", price: 4500 },
  { id: "india-psychologist-psychotherapist-8-session", name: "Psychologist & Psychotherapist · 8 Sessions", price: 12500 },
  { id: "foreign-couple-therapy-regular", name: "Couple Therapy · Regular Session", price: 5000 },
  { id: "foreign-couple-therapy-4-session", name: "Couple Therapy · 4 Sessions", price: 10000 },
  { id: "foreign-couple-therapy-8-session", name: "Couple Therapy · 8 Sessions", price: 18000 },
  { id: "foreign-psychologist-psychotherapist-regular", name: "Psychologist & Psychotherapist · Regular Session", price: 5000 },
  { id: "foreign-psychologist-psychotherapist-4-session", name: "Psychologist & Psychotherapist · 4 Sessions", price: 10000 },
  { id: "foreign-psychologist-psychotherapist-8-session", name: "Psychologist & Psychotherapist · 8 Sessions", price: 18000 },
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
  const allowedGenders = ['Male', 'Female', 'Non-Binary', 'Transgender', 'Prefer not to say', 'Other'];
  const allowedSessionModes = ['Online', 'Offline'];
  const allowedRelationshipStatuses = ['Single', 'In a relationship', 'Married', 'Divorced', 'Widowed', 'Other'];
  const allowedReferralSources = ['Social Media', 'Friend/Family', 'Search Engine', 'Advertisement', 'Other'];
  const allowedTherapyGoals = [
    'Managing stress, anxiety, or overwhelming emotions',
    'Healing from past trauma or unresolved emotional pain',
    'Improving self-confidence and self-esteem',
    'Navigating relationship challenges (family, partner, friends, etc.)',
    'Coping with grief or loss',
    'Developing healthier coping mechanisms and habits',
    'Enhancing communication and interpersonal skills',
    'Gaining clarity and direction in life',
    'Overcoming workplace or career-related challenges',
    'Achieving emotional balance and inner peace',
    'Other',
  ];

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
  if (!data.phone || !/^\d{10}$/.test(data.phone)) {
    errors.phone = "Enter a valid 10-digit phone number.";
  }
  if (!data.whatsappNumber || !/^\d{10}$/.test(data.whatsappNumber)) {
    errors.whatsappNumber = "Enter a valid 10-digit WhatsApp number.";
  }
  if (!allowedGenders.includes(data.identifyYourGender)) errors.identifyYourGender = "Select a valid gender.";
  if (!data.dob || Number.isNaN(Date.parse(data.dob))) errors.dob = "Enter a valid date of birth.";
  if (!data.location?.trim()) errors.location = "Location is required.";
  if (!allowedSessionModes.includes(data.sessionMode)) errors.sessionMode = "Select a valid session mode.";
  if (!allowedRelationshipStatuses.includes(data.relationShipStatus)) errors.relationShipStatus = "Select a valid relationship status.";
  if (data.numberOfChildren === undefined || Number(data.numberOfChildren) < 0 || !Number.isInteger(Number(data.numberOfChildren))) {
    errors.numberOfChildren = "Enter a valid number of children.";
  }
  if (!allowedReferralSources.includes(data.whereuknowaboutus)) errors.whereuknowaboutus = "Select how you heard about us.";
  if (!Array.isArray(data.therapyGoals) || data.therapyGoals.length === 0 || data.therapyGoals.some((goal) => !allowedTherapyGoals.includes(goal))) {
    errors.therapyGoals = "Select at least one valid therapy goal.";
  }
  if (data.therapyGoals?.includes('Other') && !data.therapyGoalsOther?.trim()) errors.therapyGoalsOther = "Please describe your other therapy goal.";
  if (typeof data.currentlyTakingAnyPsychiatricMedication !== 'boolean') errors.currentlyTakingAnyPsychiatricMedication = "Select whether you are taking psychiatric medication.";
  if (data.currentlyTakingAnyPsychiatricMedication && !data.medicationDetails?.trim()) errors.medicationDetails = "Please provide medication details.";
  if ((data.informedConsent || data.InformedConsentforTherapySessions) !== 'I agree') errors.informedConsent = "Consent is required.";
  if (data.conformationOfBooking !== true) errors.conformationOfBooking = "Booking confirmation is required.";

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
    meetYourTherapist: "Therapy by Nidhi",
    meetYourTherapistContent: THERAPY_CONTENT.meetYourTherapist,
    firstName: payload.firstName,
    lastName: payload.lastName,
    email: payload.email,
    phone: payload.phone,
    identifyYourGender: payload.identifyYourGender,
    dob: payload.dob,
    whatsappNumber: payload.whatsappNumber,
    location: payload.location,
    sessionMode: payload.sessionMode,
    occupation: payload.occupation,
    relationShipStatus: payload.relationShipStatus,
    numberOfChildren: Number(payload.numberOfChildren),
    currentlyTakingAnyPsychiatricMedication: payload.currentlyTakingAnyPsychiatricMedication,
    medicationDetails: payload.medicationDetails || null,
    whereuknowaboutus: payload.whereuknowaboutus,
    therapyGoals: payload.therapyGoals,
    addNotes: payload.addNotes || null,
    therapyGoalsOther: payload.therapyGoalsOther || null,
    informedConsent: payload.informedConsent || payload.InformedConsentforTherapySessions,
    InformedConsentforTherapySessions: payload.InformedConsentforTherapySessions || payload.informedConsent,
    informedConsentContent: THERAPY_CONTENT.informedConsent,
    conformationOfBooking: payload.conformationOfBooking,
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
