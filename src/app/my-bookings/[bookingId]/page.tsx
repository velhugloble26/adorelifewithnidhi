"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function BookingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`/api/bookings/my/${params.bookingId}`, { cache: "no-store" });
        const payload = await response.json();

        if (!response.ok || !payload.success) {
          if (response.status === 401 || response.status === 403) {
            router.replace(`/login?redirect=${encodeURIComponent(`/my-bookings/${params.bookingId}`)}`);
            return;
          }
          throw new Error(payload.message || "Unable to load booking details.");
        }

        setBooking(payload.data?.booking);
      } catch (err: any) {
        setError(err.message || "Unable to load booking details.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [params.bookingId, router]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="section-pad py-16 text-center text-body-lg ui-copy">Loading booking details…</main>
      </>
    );
  }

  if (error || !booking) {
    return (
      <>
        <Navbar />
        <main className="section-pad py-16">
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">{error || "Booking not found."}</div>
        </main>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="section-pad py-12 md:py-16 max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-label-md uppercase tracking-[0.2em] ui-accent">Booking Details</p>
            <h1 className="text-display-lg ui-heading mt-2">{booking.bookingId}</h1>
          </div>
          <Link href="/my-bookings" className="btn-primary bg-[#f4f4f3] text-[#003044] hover:bg-[#e5e8ea]">Back to bookings</Link>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-body-md ui-copy">
            <div><strong>Package:</strong> {booking.packageName}</div>
            <div><strong>Session type:</strong> {booking.sessionType}</div>
            <div><strong>Date:</strong> {booking.selectedDate}</div>
            <div><strong>Time:</strong> {booking.selectedTime}</div>
            <div><strong>Booking status:</strong> {booking.bookingStatus}</div>
            <div><strong>Payment method:</strong> {booking.paymentMethod}</div>
            <div><strong>Payment status:</strong> {booking.paymentStatus}</div>
            <div><strong>Created date:</strong> {new Date(booking.created_at).toLocaleDateString("en-IN")}</div>
            <div><strong>Customer:</strong> {booking.firstName} {booking.lastName}</div>
            <div><strong>Email:</strong> {booking.email}</div>
            <div><strong>Phone:</strong> {booking.phone}</div>
            <div><strong>WhatsApp:</strong> {booking.whatsappNumber}</div>
          </div>
        </div>
      </main>
    </>
  );
}
