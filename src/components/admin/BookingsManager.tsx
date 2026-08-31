/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ADMIN_AVAILABILITY, ADMIN_BOOKING_CANCEL, ADMIN_BOOKING_RESCHEDULE, ADMIN_BOOKING_STATUS, ADMIN_BOOKINGS } from "@/utils/api";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { EmptyState, fieldClass, LoadingState, Modal, Notice, PageHeader, Pager, Pagination, requestApi, SearchBar } from "./AdminUI";

type Slot = { time: string; sessionType: string; label: string; status: "available" | "booked" | "unavailable" };
type AvailabilityDate = { date: string; label: string; slots: Slot[] };
type Booking = { bookingId: string; firstName: string; lastName: string; email: string; phone: string; whatsappNumber: string; packageId: string; packageName: string; packagePrice: number; selectedDate: string; selectedTime: string; sessionType: string; paymentMethod: string; paymentStatus: string; bookingStatus: string; created_at?: string };
const statuses = ["pending", "confirmed", "completed", "cancelled", "no_show"];

export default function BookingsManager() {
  const [items, setItems] = useState<Booking[]>([]); const [pagination, setPagination] = useState<Pagination>(); const [page, setPage] = useState(1); const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ date: "", status: "", sessionType: "", paymentStatus: "", packageId: "" }); const [loading, setLoading] = useState(true); const [error, setError] = useState(""); const [success, setSuccess] = useState(""); const [editing, setEditing] = useState<Booking | null>(null); const [acting, setActing] = useState("");
  const load = useCallback(async () => { setLoading(true); setError(""); try { const query = new URLSearchParams({ page: String(page), limit: "20" }); if (search) query.set("search", search); Object.entries(filters).forEach(([key, value]) => value && query.set(key, value)); const payload = await requestApi(`${ADMIN_BOOKINGS}?${query}`); setItems(payload.data?.data || []); setPagination(payload.data?.pagination); } catch (err) { setError(err instanceof Error ? err.message : "Unable to load bookings."); } finally { setLoading(false); } }, [filters, page, search]);
  useEffect(() => { load(); }, [load]);
  function filter(name: string, value: string) { setFilters((current) => ({ ...current, [name]: value })); setPage(1); }
  async function updateStatus(booking: Booking, status: string) { if (status === "cancelled" && !window.confirm(`Cancel booking ${booking.bookingId}?`)) return; setActing(booking.bookingId); setError(""); setSuccess(""); try { const url = status === "cancelled" ? ADMIN_BOOKING_CANCEL(booking.bookingId) : ADMIN_BOOKING_STATUS(booking.bookingId); const payload = await requestApi(url, { method: "PATCH", body: JSON.stringify(status === "cancelled" ? {} : { status }) }); setSuccess(payload.message); await load(); } catch (err) { setError(err instanceof Error ? err.message : "Update failed."); } finally { setActing(""); } }
  return <>
    <PageHeader eyebrow="Sessions" title="Bookings" description="Search and filter all appointments, then update status, cancel, or reschedule using the dedicated admin booking APIs." />
    {success && <Notice kind="success">{success}</Notice>}{error && <Notice>{error}</Notice>}
    <SlotAvailabilityManager />
    <SearchBar value={search} onChange={(value) => { setSearch(value); setPage(1); }} placeholder="Search name, email, phone or booking ID">
      <input type="date" className="admin-filter" value={filters.date} onChange={(e) => filter("date", e.target.value)} aria-label="Filter by date" />
      <select className="admin-filter" value={filters.status} onChange={(e) => filter("status", e.target.value)} aria-label="Filter by booking status"><option value="">All statuses</option>{statuses.map((status) => <option key={status}>{status}</option>)}</select>
      <select className="admin-filter" value={filters.sessionType} onChange={(e) => filter("sessionType", e.target.value)} aria-label="Filter by session type"><option value="">All session types</option><option>Online</option><option>Offline</option></select>
      <select className="admin-filter" value={filters.paymentStatus} onChange={(e) => filter("paymentStatus", e.target.value)} aria-label="Filter by payment status"><option value="">All payments</option><option>pending</option><option>paid</option><option>failed</option><option>cancelled</option></select>
    </SearchBar>
    {loading ? <LoadingState label="Loading bookings…" /> : items.length === 0 ? <EmptyState icon="calendar_month" title="No bookings found" body="Try changing the search or filters." /> : <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>Booking</th><th>Client</th><th>Session</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead><tbody>{items.map((booking) => <tr key={booking.bookingId}><td><strong>{booking.bookingId}</strong><span>{booking.packageName}</span></td><td><strong>{booking.firstName} {booking.lastName}</strong><span>{booking.email}</span><span>{booking.phone}</span></td><td><strong>{booking.selectedDate}</strong><span>{booking.selectedTime} · {booking.sessionType}</span></td><td><strong>₹{booking.packagePrice?.toLocaleString("en-IN")}</strong><span>{booking.paymentMethod} · {booking.paymentStatus}</span></td><td><select className="admin-filter min-w-[130px]" value={booking.bookingStatus} disabled={acting === booking.bookingId} onChange={(e) => updateStatus(booking, e.target.value)}>{statuses.map((status) => <option key={status}>{status}</option>)}</select></td><td><button className="admin-button-secondary" onClick={() => setEditing(booking)}>Reschedule</button></td></tr>)}</tbody></table></div>}
    <Pager value={pagination} onChange={setPage} />
    {editing && <RescheduleForm booking={editing} onClose={() => setEditing(null)} onSaved={(message) => { setEditing(null); setSuccess(message); load(); }} />}
  </>;
}

function RescheduleForm({ booking, onClose, onSaved }: { booking: Booking; onClose: () => void; onSaved: (message: string) => void }) {
  const [date, setDate] = useState(booking.selectedDate); const [time, setTime] = useState(booking.selectedTime); const [sessionType, setSessionType] = useState(booking.sessionType); const [busy, setBusy] = useState(false); const [error, setError] = useState("");
  async function submit(event: FormEvent) { event.preventDefault(); setBusy(true); setError(""); try { const payload = await requestApi(ADMIN_BOOKING_RESCHEDULE(booking.bookingId), { method: "PATCH", body: JSON.stringify({ date, time, sessionType }) }); onSaved(payload.message); } catch (err) { setError(err instanceof Error ? err.message : "Unable to reschedule."); } finally { setBusy(false); } }
  return <Modal title={`Reschedule ${booking.bookingId}`} onClose={onClose}><form onSubmit={submit} className="space-y-5">{error && <Notice>{error}</Notice>}<label className="admin-label">Date<input className={fieldClass} type="date" required value={date} onChange={(e) => setDate(e.target.value)} /></label><div className="grid sm:grid-cols-2 gap-4"><label className="admin-label">Time<input className={fieldClass} required value={time} onChange={(e) => setTime(e.target.value)} placeholder="09:00 AM" /></label><label className="admin-label">Session type<select className={fieldClass} value={sessionType} onChange={(e) => setSessionType(e.target.value)}><option>Online</option><option>Offline</option></select></label></div><div className="flex justify-end gap-3"><button type="button" className="admin-button-secondary" onClick={onClose}>Cancel</button><button className="btn-primary" disabled={busy}>{busy ? "Saving…" : "Reschedule"}</button></div></form></Modal>;
}


function SlotAvailabilityManager() {
  const [dates, setDates] = useState<AvailabilityDate[]>([]);
  const [activeDate, setActiveDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const payload = await requestApi(ADMIN_AVAILABILITY);
      const nextDates: AvailabilityDate[] = payload.data?.dates || [];
      setDates(nextDates);
      setActiveDate((current) => nextDates.some((date) => date.date === current) ? current : nextDates[0]?.date || "");
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to load slot availability."); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { load(); }, [load]);
  const selected = dates.find((date) => date.date === activeDate) || dates[0];

  async function toggle(slot: Slot) {
    if (!selected || slot.status === "booked") return;
    const key = `${selected.date}-${slot.time}-${slot.sessionType}`;
    setActing(key); setError(""); setMessage("");
    try {
      const nextStatus = slot.status === "unavailable" ? "available" : "unavailable";
      const payload = await requestApi(ADMIN_AVAILABILITY, { method: "PATCH", body: JSON.stringify({ date: selected.date, time: slot.time, sessionType: slot.sessionType, status: nextStatus }) });
      setMessage(payload.message); await load();
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to update slot."); }
    finally { setActing(""); }
  }

  return <section className="mb-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
    <div className="mb-5 flex flex-wrap items-start justify-between gap-3"><div><p className="text-label-md uppercase tracking-[0.14em] ui-accent">Availability</p><h2 className="text-headline-md ui-heading">Manage Session Slots</h2><p className="mt-1 text-sm ui-copy">Select a date, then toggle an empty slot between available and not available.</p></div><button className="admin-button-secondary" onClick={load} disabled={loading}>{loading ? "Refreshing…" : "Refresh"}</button></div>
    {message && <Notice kind="success">{message}</Notice>}{error && <Notice>{error}</Notice>}
    {loading && dates.length === 0 ? <LoadingState label="Loading slot availability…" /> : <>
      <div role="tablist" aria-label="Manage availability by date" className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">{dates.map((date) => <button key={date.date} type="button" role="tab" aria-selected={date.date === selected?.date} onClick={() => setActiveDate(date.date)} className={`rounded-lg border px-3 py-3 text-sm font-semibold transition ${date.date === selected?.date ? "border-[#003044] bg-[#003044] text-white" : "border-slate-200 bg-[#f8fafb] text-[#1b1c19] hover:border-[#003044]"}`}>{date.label}</button>)}</div>
      <div className="mb-4 flex flex-wrap gap-4 text-sm ui-copy"><span>🟩 Booked</span><span>⬜ Available</span><span>🟥 Not Available</span></div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{selected?.slots.map((slot) => { const key = `${selected.date}-${slot.time}-${slot.sessionType}`; const booked = slot.status === "booked"; const unavailable = slot.status === "unavailable"; return <button key={key} type="button" disabled={booked || acting === key} onClick={() => toggle(slot)} className={`rounded-xl border p-4 text-left transition ${booked ? "cursor-not-allowed border-emerald-300 bg-emerald-100 text-emerald-950" : unavailable ? "border-red-300 bg-red-100 text-red-950 hover:bg-red-50" : "border-slate-200 bg-white text-[#1b1c19] hover:border-[#003044]"}`}><span className="flex justify-between gap-3"><strong>{slot.time}</strong><span className="text-xs font-semibold uppercase">{unavailable ? "Not Available" : slot.status}</span></span><span className="mt-1 block text-sm">{slot.sessionType}</span>{!booked && <span className="mt-3 block text-xs font-semibold ui-accent">{acting === key ? "Updating…" : unavailable ? "Mark Available" : "Mark Not Available"}</span>}</button>; })}</div>
    </>}
  </section>;
}
