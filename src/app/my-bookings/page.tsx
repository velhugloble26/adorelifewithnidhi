"use client";

import { AUTH_ME, MY_BOOKINGS } from "@/utils/api";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

function MyBookingsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(AUTH_ME, { cache: "no-store" });
        const payload = await response.json();

        if (!payload.success || !payload.data?.user) {
          const redirectTo = encodeURIComponent(`/my-bookings${searchParams.toString() ? `?${searchParams.toString()}` : ""}`);
          router.replace(`/login?redirect=${redirectTo}`);
          return;
        }

        const bookingsResponse = await fetch(MY_BOOKINGS, { cache: "no-store" });
        const bookingsPayload = await bookingsResponse.json();

        if (!bookingsResponse.ok || !bookingsPayload.success) {
          throw new Error(bookingsPayload.message || "Unable to load bookings.");
        }

        setBookings(bookingsPayload.data?.bookings || []);
      } catch (err: any) {
        setError(err.message || "Unable to load bookings.");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, searchParams]);

  return (
    <>
      <Navbar />
      <main className="section-pad py-12 md:py-16 max-w-6xl mx-auto">
        <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <p className="text-label-md uppercase tracking-[0.2em] ui-accent">Account</p>
            <h1 className="text-display-lg ui-heading mt-2">My Bookings</h1>
          </div>
          <Link href="/book-session" className="btn-primary">Book another session</Link>
        </div>

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-body-lg ui-copy">Loading bookings…</div>
        ) : error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">{error}</div>
        ) : bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <div className="text-4xl mb-4">📋</div>
            <h2 className="text-headline-md ui-heading">No bookings yet</h2>
            <p className="mt-3 text-body-md ui-copy">Your upcoming and past sessions will appear here.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <Link
                key={booking.bookingId}
                href={`/my-bookings/${booking.bookingId}`}
                className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                  <div>
                    <div className="text-label-md uppercase tracking-[0.12em] text-[#4a4f52]">{booking.bookingId}</div>
                    <h3 className="text-headline-md ui-heading mt-1">{booking.packageName}</h3>
                  </div>
                  <span className="rounded-full bg-[#edf2f5] px-3 py-1 text-label-md text-[#003044]">{booking.bookingStatus}</span>
                </div>

                <div className="mt-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 text-body-md ui-copy">
                  <div><strong>Sessions:</strong> {booking.packageId === "regular" ? 1 : booking.packageId === "four" ? 4 : 8}</div>
                  <div><strong>Type:</strong> {booking.sessionType}</div>
                  <div><strong>Date:</strong> {booking.selectedDate}</div>
                  <div><strong>Time:</strong> {booking.selectedTime}</div>
                  <div><strong>Payment:</strong> {booking.paymentMethod}</div>
                  <div><strong>Paid:</strong> {booking.paymentStatus}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </>
  );
}

export default function MyBookingsPage() {
  return (
    <Suspense fallback={<div className="section-pad py-12 md:py-16"><div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-body-lg ui-copy">Loading bookings…</div></div>}>
      <MyBookingsContent />
    </Suspense>
  );
}
