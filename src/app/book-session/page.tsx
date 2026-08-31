"use client";

import { BOOKING_AVAILABILITY, BOOKING_PACKAGES, CREATE_BOOKING, CREATE_BOOKING_ORDER, VERIFY_BOOKING_PAYMENT } from "@/utils/api";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";

const steps = [
  "Select Session",
  "Schedule",
  "Booking Details",
  "Payment",
  "Confirmation",
];

const initialBooking = {
  packageId: "regular",
  selectedDate: "",
  selectedTime: "",
  sessionType: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  whatsappNumber: "",
  paymentMethod: "cash",
};

export default function BookSessionPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [packages, setPackages] = useState<any[]>([]);
  const [dates, setDates] = useState<any[]>([]);
  const [activeDate, setActiveDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);
  const [booking, setBooking] = useState(initialBooking);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<any>(null);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  const selectedPackage = useMemo(
    () => packages.find((pkg) => pkg.id === booking.packageId) || packages[0],
    [booking.packageId, packages]
  );

  const selectedDateData = useMemo(
    () => dates.find((date) => date.date === booking.selectedDate),
    [booking.selectedDate, dates]
  );

  const fetchPackages = async () => {
    const response = await fetch(BOOKING_PACKAGES);
    const result = await response.json();
    if (result.success) {
      setPackages(result.data.packages);
      setBooking((prev) => ({ ...prev, packageId: result.data.packages[0]?.id || "regular" }));
    }
  };

  const fetchAvailability = async () => {
    setAvailabilityLoading(true);
    try {
      const response = await fetch(BOOKING_AVAILABILITY);
      const result = await response.json();
      if (result.success) {
        const upcomingDates = (result.data.dates || []).slice(1, 6);
        setDates(upcomingDates);
        setActiveDate((current) =>
          upcomingDates.some((date: any) => date.date === current)
            ? current
            : upcomingDates[0]?.date || ""
        );
      }
    } finally {
      setAvailabilityLoading(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        await fetchPackages();
        await fetchAvailability();
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  const updateField = (field: string, value: string) => {
    setBooking((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "" }));
  };

  const validateFields = () => {
    const nextErrors: Record<string, string> = {};

    if (!booking.firstName || booking.firstName.trim().length < 2) nextErrors.firstName = "First name is required.";
    if (!booking.lastName || booking.lastName.trim().length < 2) nextErrors.lastName = "Last name is required.";
    if (!/^\S+@\S+\.\S+$/.test(booking.email)) nextErrors.email = "Enter a valid email address.";
    if (!/^[0-9+\-\s()]{7,15}$/.test(booking.phone)) nextErrors.phone = "Enter a valid phone number.";
    if (!/^[0-9+\-\s()]{7,15}$/.test(booking.whatsappNumber)) nextErrors.whatsappNumber = "Enter a valid WhatsApp number.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 0 && !booking.packageId) {
      setErrors({ packageId: "Please select a package." });
      return;
    }

    if (currentStep === 1) {
      if (!booking.selectedDate || !booking.selectedTime || !booking.sessionType) {
        setErrors({
          selectedDate: !booking.selectedDate ? "Please select a date." : "",
          selectedTime: !booking.selectedTime ? "Please select a time." : "",
          sessionType: !booking.sessionType ? "Please select session type." : "",
        });
        return;
      }
    }

    if (currentStep === 2) {
      if (!validateFields()) return;
    }

    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const previousStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

  const handleCashBooking = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(CREATE_BOOKING, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...booking, packageId: booking.packageId, paymentMethod: "cash" }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        setErrors({ submit: result.message || "Unable to create booking." });
        return;
      }

      setConfirmation({
        ...result.data,
        paymentMethod: "Cash",
        paymentStatus: "Pending",
        bookingStatus: "Pending",
      });
      setCurrentStep(steps.length - 1);
    } catch (error: any) {
      setErrors({ submit: error.message || "Unable to create booking." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOnlinePayment = async () => {
    if (!validateFields()) return;
    setPaymentProcessing(true);

    try {
      const orderResponse = await fetch(CREATE_BOOKING_ORDER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...booking, paymentMethod: "online" }),
      });
      const orderData = await orderResponse.json();

      if (!orderResponse.ok || !orderData.success) {
        throw new Error(orderData.message || "Unable to create payment order.");
      }

      const { order, keyId, amount, currency, bookingId } = orderData.data;
      const paymentOptions = {
        key: keyId,
        amount,
        currency,
        name: "Adore Life",
        description: selectedPackage?.name || "Session booking",
        order_id: order.id,
        handler: async function (response: any) {
          const verifyResponse = await fetch(VERIFY_BOOKING_PAYMENT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: response.razorpay_order_id,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              bookingId,
            }),
          });

          const verifyResult = await verifyResponse.json();
          if (!verifyResult.success) {
            setErrors({ submit: verifyResult.message || "Payment verification failed." });
            setPaymentProcessing(false);
            return;
          }

          setConfirmation({
            ...verifyResult.data,
            paymentMethod: "Online Payment",
            paymentStatus: "Paid",
            bookingStatus: "Confirmed",
          });
          setCurrentStep(steps.length - 1);
          setPaymentProcessing(false);
        },
        prefill: {
          name: `${booking.firstName} ${booking.lastName}`,
          email: booking.email,
          contact: booking.phone,
        },
        theme: {
          color: "#003044",
        },
        modal: {
          ondismiss: () => {
            setPaymentProcessing(false);
          },
        },
      };

      const razorpayScript = "https://checkout.razorpay.com/v1/checkout.js";
      const script = document.createElement("script");
      script.src = razorpayScript;
      script.onload = () => {
        const Razorpay = (window as any).Razorpay;
        const razorpay = new Razorpay(paymentOptions);
        razorpay.open();
        setPaymentProcessing(false);
      };
      script.onerror = () => {
        throw new Error("Unable to load Razorpay checkout.");
      };
      document.body.appendChild(script);
    } catch (error: any) {
      setErrors({ submit: error.message || "Payment failed." });
      setPaymentProcessing(false);
    }
  };

  const visibleDates = dates.length > 0 ? dates : [
    { date: "", label: "No upcoming dates", isAvailable: false, slots: [] },
  ];

  const activeDateData = visibleDates.find((date) => date.date === activeDate) || visibleDates[0];
  const visibleSlots = (activeDateData?.slots || []).slice(0, 6);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="section-pad py-20 text-center">
          <p className="text-body-lg ui-copy">Loading your booking options…</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="section-pad py-10 md:py-16 max-w-6xl mx-auto">
        <div className="mb-8">
          <p className="text-label-md uppercase tracking-[0.2em] ui-accent">Book your session</p>
          <h1 className="text-display-lg ui-heading mt-2">Book a Session</h1>
        </div>

        <div className="mb-10 overflow-hidden rounded-xl border border-slate-200 bg-white/70">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-2 p-3">
            {steps.map((label, index) => {
              const isCompleted = index < currentStep;
              const isActive = index === currentStep;
              return (
                <div
                  key={label}
                  className={`flex items-center justify-center rounded-lg px-3 py-3 text-center text-label-md ${
                    isCompleted ? "bg-[#003044] text-white" : isActive ? "bg-[#e9f2f5] text-[#003044]" : "bg-[#f4f4f3] text-[#4a4f52]"
                  }`}
                >
                  <span className="mr-2 font-semibold">{index + 1}</span>
                  {label}
                </div>
              );
            })}
          </div>
        </div>

        {currentStep === 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {packages.map((pkg) => {
              const selected = booking.packageId === pkg.id;
              return (
                <div
                  key={pkg.id}
                  className={`rounded-2xl border p-6 transition ${selected ? "border-[#003044] bg-[#f0f7f9] shadow-lg" : "border-slate-200 bg-white"}`}
                >
                  <div className="mb-4 text-label-md uppercase tracking-[0.1em] text-[#4a4f52]">{pkg.name}</div>
                  <div className="text-display-lg ui-heading">₹{pkg.price.toLocaleString("en-IN")}</div>
                  <button
                    type="button"
                    className="btn-primary mt-6 w-full"
                    onClick={() => {
                      updateField("packageId", pkg.id);
                      setCurrentStep(1);
                    }}
                  >
                    Book Now
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-8">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="flex items-center justify-between gap-4 mb-5">
                <h2 className="text-headline-md ui-heading">Schedule Your Service</h2>
                <button type="button" className="btn-primary" onClick={fetchAvailability} disabled={availabilityLoading}>
                  {availabilityLoading ? "Checking..." : "Check Availability"}
                </button>
              </div>

              <div className="space-y-6">
                <div role="tablist" aria-label="Choose a session date" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                  {visibleDates.map((date) => {
                    const isActive = date.date === activeDateData?.date;
                    return (
                      <button
                        key={date.date || "no-upcoming-dates"}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="available-time-slots"
                        onClick={() => {
                          setActiveDate(date.date);
                          if (booking.selectedDate !== date.date) {
                            setBooking((current) => ({ ...current, selectedDate: "", selectedTime: "", sessionType: "" }));
                          }
                          setErrors((current) => ({ ...current, selectedDate: "", selectedTime: "", sessionType: "" }));
                        }}
                        className={`rounded-xl border px-3 py-4 text-center transition ${isActive ? "border-[#003044] bg-[#003044] text-white shadow-md" : "border-slate-200 bg-[#f9fafb] text-[#1b1c19] hover:border-[#003044]"}`}
                      >
                        <span className="text-label-md font-semibold">{date.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div id="available-time-slots" role="tabpanel" className="rounded-xl border border-slate-200 bg-[#f9fafb] p-4">
                  <div className="mb-3 text-label-md uppercase tracking-[0.12em] text-[#4a4f52]">
                    Available times for {activeDateData?.label}
                  </div>
                  <div className="mb-4 flex flex-wrap gap-4 text-sm ui-copy" aria-label="Slot status legend">
                    <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm border border-emerald-300 bg-emerald-100" />Booked</span>
                    <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm border border-slate-300 bg-white" />Available</span>
                    <span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm border border-red-300 bg-red-100" />Not Available</span>
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {visibleSlots.length === 0 ? (
                      <div className="text-body-md ui-copy md:col-span-2 lg:col-span-3">No slots configured for this date.</div>
                    ) : (
                      visibleSlots.map((slot: any) => {
                        const active = booking.selectedDate === activeDateData.date && booking.selectedTime === slot.time && booking.sessionType === slot.sessionType;
                        const isAvailable = slot.status === "available";
                        const statusClass = slot.status === "booked"
                          ? "border-emerald-300 bg-emerald-100 text-emerald-950 cursor-not-allowed"
                          : slot.status === "unavailable"
                            ? "border-red-300 bg-red-100 text-red-950 cursor-not-allowed"
                            : active
                              ? "border-[#003044] bg-[#e9f2f5] text-[#003044] ring-2 ring-[#003044]/20"
                              : "border-slate-200 bg-white text-[#1b1c19] hover:border-[#003044]";
                        return (
                          <button
                            type="button"
                            key={`${activeDateData.date}-${slot.time}-${slot.sessionType}`}
                            disabled={!isAvailable}
                            aria-label={`${slot.label}, ${slot.status === "unavailable" ? "not available" : slot.status}`}
                            onClick={() => {
                              updateField("selectedDate", activeDateData.date);
                              updateField("selectedTime", slot.time);
                              updateField("sessionType", slot.sessionType);
                            }}
                            className={`rounded-xl border p-3 text-left transition ${statusClass}`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <span className="text-label-md uppercase tracking-[0.08em]">{slot.sessionType}</span>
                              <span className="text-xs font-semibold uppercase tracking-wide">{slot.status === "unavailable" ? "Not Available" : slot.status}</span>
                            </div>
                            <div className="mt-2 text-body-lg font-medium">{slot.time}</div>
                          </button>
                        );
                      })
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="btn-primary" onClick={nextStep}>Continue</button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-headline-md ui-heading mb-6">Booking Form</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-label-md ui-copy block mb-2">First Name</label>
                <input className="ghost-input" value={booking.firstName} onChange={(e) => updateField("firstName", e.target.value)} />
                {errors.firstName && <div className="text-sm text-red-600 mt-1">{errors.firstName}</div>}
              </div>
              <div>
                <label className="text-label-md ui-copy block mb-2">Last Name</label>
                <input className="ghost-input" value={booking.lastName} onChange={(e) => updateField("lastName", e.target.value)} />
                {errors.lastName && <div className="text-sm text-red-600 mt-1">{errors.lastName}</div>}
              </div>
              <div>
                <label className="text-label-md ui-copy block mb-2">Email</label>
                <input type="email" className="ghost-input" value={booking.email} onChange={(e) => updateField("email", e.target.value)} />
                {errors.email && <div className="text-sm text-red-600 mt-1">{errors.email}</div>}
              </div>
              <div>
                <label className="text-label-md ui-copy block mb-2">Phone Number</label>
                <input type="tel" className="ghost-input" value={booking.phone} onChange={(e) => updateField("phone", e.target.value)} />
                {errors.phone && <div className="text-sm text-red-600 mt-1">{errors.phone}</div>}
              </div>
              <div className="md:col-span-2">
                <label className="text-label-md ui-copy block mb-2">WhatsApp Number</label>
                <input type="tel" className="ghost-input" value={booking.whatsappNumber} onChange={(e) => updateField("whatsappNumber", e.target.value)} />
                {errors.whatsappNumber && <div className="text-sm text-red-600 mt-1">{errors.whatsappNumber}</div>}
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button type="button" onClick={previousStep} className="btn-primary bg-[#f4f4f3] text-[#003044] hover:bg-[#e5e8ea]">Back</button>
              <button type="button" onClick={nextStep} className="btn-primary">Continue</button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <h2 className="text-headline-md ui-heading mb-6">Payment</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                type="button"
                className={`rounded-2xl border p-5 text-left ${booking.paymentMethod === "cash" ? "border-[#003044] bg-[#ecf7f8]" : "border-slate-200 bg-[#f9fafb]"}`}
                onClick={() => updateField("paymentMethod", "cash")}
              >
                <div className="text-label-md uppercase tracking-[0.12em]">Cash</div>
                <div className="mt-2 text-body-lg">Pay in person / manual booking</div>
              </button>
              <button
                type="button"
                className={`rounded-2xl border p-5 text-left ${booking.paymentMethod === "online" ? "border-[#003044] bg-[#ecf7f8]" : "border-slate-200 bg-[#f9fafb]"}`}
                onClick={() => updateField("paymentMethod", "online")}
              >
                <div className="text-label-md uppercase tracking-[0.12em]">Online Payment</div>
                <div className="mt-2 text-body-lg">Secure Razorpay checkout</div>
              </button>
            </div>

            {errors.submit && <div className="mt-4 text-sm text-red-600">{errors.submit}</div>}

            <div className="flex justify-between mt-8">
              <button type="button" onClick={previousStep} className="btn-primary bg-[#f4f4f3] text-[#003044] hover:bg-[#e5e8ea]">Back</button>
              <button
                type="button"
                className="btn-primary"
                onClick={booking.paymentMethod === "cash" ? handleCashBooking : handleOnlinePayment}
                disabled={isSubmitting || paymentProcessing}
              >
                {booking.paymentMethod === "cash"
                  ? isSubmitting ? "Processing..." : "Confirm Booking"
                  : paymentProcessing ? "Processing Payment..." : "Pay Now"}
              </button>
            </div>
          </div>
        )}

        {currentStep === 4 && confirmation && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-10">
            <div className="text-center mb-8">
              <div className="text-5xl mb-3">✅</div>
              <h2 className="text-headline-md ui-heading">Booking Confirmed</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-body-md ui-copy">
              <div><strong>Booking ID:</strong> {confirmation.bookingId || confirmation._id}</div>
              <div><strong>Status:</strong> {confirmation.bookingStatus || "Confirmed"}</div>
              <div><strong>Package:</strong> {confirmation.packageName || selectedPackage?.name}</div>
              <div><strong>Session Type:</strong> {confirmation.sessionType || booking.sessionType}</div>
              <div><strong>Date:</strong> {confirmation.selectedDate || booking.selectedDate}</div>
              <div><strong>Time:</strong> {confirmation.selectedTime || booking.selectedTime}</div>
              <div><strong>Customer:</strong> {confirmation.firstName || booking.firstName} {confirmation.lastName || booking.lastName}</div>
              <div><strong>Payment Method:</strong> {confirmation.paymentMethod || booking.paymentMethod}</div>
              <div><strong>Payment Status:</strong> {confirmation.paymentStatus || "Pending"}</div>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/" className="btn-primary">Return Home</Link>
              <Link href={typeof window !== "undefined" && document.cookie.includes("accessToken=") ? "/my-bookings" : "/login?redirect=/my-bookings"} className="btn-primary bg-[#f4f4f3] text-[#003044] hover:bg-[#e5e8ea]">
                View My Booking
              </Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
