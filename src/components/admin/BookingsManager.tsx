/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import {
  ADMIN_AVAILABILITY,
  ADMIN_BOOKING,
  ADMIN_BOOKING_CANCEL,
  ADMIN_BOOKING_RESCHEDULE,
  ADMIN_BOOKING_STATUS,
  ADMIN_BOOKINGS,
  CREATE_BOOKING,
} from "@/utils/api";
import { THERAPY_CONTENT } from "@/constants/therapyContent";

import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  EmptyState,
  fieldClass,
  LoadingState,
  Modal,
  Notice,
  PageHeader,
  Pager,
  Pagination,
  requestApi,
  SearchBar,
} from "./AdminUI";

type Slot = {
  time: string;
  sessionType: string;
  label: string;
  status: "available" | "booked" | "unavailable";
};
type AvailabilityDate = { date: string; label: string; slots: Slot[] };
type BookingSession = { sessionNumber: number; date: string; time: string; sessionType: "Online" | "Offline"; location?: string; amountPaid?: number; remarks?: string; status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show"; createdAt?: string; updatedAt?: string };
type Booking = {
  bookingId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  identifyYourGender?: string;
  dob?: string;
  location?: string;
  sessionMode?: string;
  occupation?: string;
  relationShipStatus?: string;
  numberOfChildren?: number;
  currentlyTakingAnyPsychiatricMedication?: boolean;
  medicationDetails?: string;
  whereuknowaboutus?: string;
  therapyGoals?: string[];
  therapyGoalsOther?: string;
  addNotes?: string;
  meetYourTherapist?: string;
  meetYourTherapistContent?: string;
  informedConsent?: string;
  InformedConsentforTherapySessions?: string;
  informedConsentContent?: string;
  conformationOfBooking?: boolean;
  packageId: string;
  packageName: string;
  packagePrice: number;
  selectedDate: string;
  selectedTime: string;
  sessionType: string;
  paymentMethod: string;
  paymentStatus: string;
  bookingStatus: string;
  sessions?: BookingSession[];
  created_at?: string;
};
const statuses = ["pending", "confirmed", "completed", "cancelled", "no_show"];
const paymentStatuses = [
  "pending",
  "paid",
  "cash_received",
  "failed",
  "cancelled",
];
const therapyGoalOptions = [
  "Managing stress, anxiety, or overwhelming emotions",
  "Healing from past trauma or unresolved emotional pain",
  "Improving self-confidence and self-esteem",
  "Navigating relationship challenges (family, partner, friends, etc.)",
  "Coping with grief or loss",
  "Developing healthier coping mechanisms and habits",
  "Enhancing communication and interpersonal skills",
  "Gaining clarity and direction in life",
  "Overcoming workplace or career-related challenges",
  "Achieving emotional balance and inner peace",
  "Other",
];

function getBookingSessions(booking: Booking): BookingSession[] {
  if (booking.sessions?.length) return booking.sessions;
  return [{ sessionNumber: 1, date: booking.selectedDate, time: booking.selectedTime, sessionType: booking.sessionType as "Online" | "Offline", location: booking.location, amountPaid: booking.paymentStatus === "paid" || booking.paymentStatus === "cash_received" ? booking.packagePrice : 0, remarks: "", status: "scheduled" }];
}

export default function BookingsManager() {
  const [items, setItems] = useState<Booking[]>([]);
  const [pagination, setPagination] = useState<Pagination>();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    date: "",
    status: "",
    sessionType: "",
    paymentStatus: "",
    packageId: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editing, setEditing] = useState<Booking | null>(null);
  const [viewing, setViewing] = useState<Booking | null>(null);
  const [previewing, setPreviewing] = useState<Booking | null>(null);
  const [creating, setCreating] = useState(false);
  const [acting, setActing] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const query = new URLSearchParams({ page: String(page), limit: "20" });
      if (search) query.set("search", search);
      Object.entries(filters).forEach(
        ([key, value]) => value && query.set(key, value),
      );
      const payload = await requestApi(`${ADMIN_BOOKINGS}?${query}`);
      setItems(payload.data?.data || []);
      setPagination(payload.data?.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load bookings.");
    } finally {
      setLoading(false);
    }
  }, [filters, page, search]);
  useEffect(() => {
    load();
  }, [load]);
  function filter(name: string, value: string) {
    setFilters((current) => ({ ...current, [name]: value }));
    setPage(1);
  }
  async function updateStatus(booking: Booking, status: string) {
    if (
      status === "cancelled" &&
      !window.confirm(`Cancel booking ${booking.bookingId}?`)
    )
      return;
    setActing(booking.bookingId);
    setError("");
    setSuccess("");
    try {
      const url =
        status === "cancelled"
          ? ADMIN_BOOKING_CANCEL(booking.bookingId)
          : ADMIN_BOOKING_STATUS(booking.bookingId);
      const payload = await requestApi(url, {
        method: "PATCH",
        body: JSON.stringify(status === "cancelled" ? {} : { status }),
      });
      setSuccess(payload.message);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed.");
    } finally {
      setActing("");
    }
  }
  async function updatePaymentStatus(booking: Booking, paymentStatus: string) {
    setActing(booking.bookingId);
    setError("");
    setSuccess("");
    try {
      const payload = await requestApi(
        ADMIN_BOOKING_STATUS(booking.bookingId),
        { method: "PATCH", body: JSON.stringify({ paymentStatus }) },
      );
      setSuccess(payload.message);
      await load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Payment status update failed.",
      );
    } finally {
      setActing("");
    }
  }
  return (
    <>
      <PageHeader
        eyebrow="Sessions"
        title="Bookings"
        description="Search and filter all appointments, then update status, cancel, or reschedule using the dedicated admin booking APIs."
        action={<button type="button" className="btn-primary" onClick={() => setCreating(true)}>+ Book for Client</button>}
      />
      {success && <Notice kind="success">{success}</Notice>}
      {error && <Notice>{error}</Notice>}
      <SlotAvailabilityManager />
      <SearchBar
        value={search}
        onChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        placeholder="Search name, email, phone or booking ID"
      >
        <input
          type="date"
          className="admin-filter"
          value={filters.date}
          onChange={(e) => filter("date", e.target.value)}
          aria-label="Filter by date"
        />
        <select
          className="admin-filter"
          value={filters.status}
          onChange={(e) => filter("status", e.target.value)}
          aria-label="Filter by booking status"
        >
          <option value="">All statuses</option>
          {statuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <select
          className="admin-filter"
          value={filters.sessionType}
          onChange={(e) => filter("sessionType", e.target.value)}
          aria-label="Filter by session type"
        >
          <option value="">All session types</option>
          <option>Online</option>
          <option>Offline</option>
        </select>
        <select
          className="admin-filter"
          value={filters.paymentStatus}
          onChange={(e) => filter("paymentStatus", e.target.value)}
          aria-label="Filter by payment status"
        >
          <option value="">All payments</option>
          {paymentStatuses.map((status) => (
            <option key={status}>{status}</option>
          ))}
        </select>
      </SearchBar>
      {loading ? (
        <LoadingState label="Loading bookings…" />
      ) : items.length === 0 ? (
        <EmptyState
          icon="calendar_month"
          title="No bookings found"
          body="Try changing the search or filters."
        />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Booking</th>
                <th>Client</th>
                <th>Session</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((booking) => (
                <tr key={booking.bookingId}>
                  <td>
                    <strong>{booking.bookingId}</strong>
                    <span>{booking.packageName}</span>
                  </td>
                  <td>
                    <strong>
                      {booking.firstName} {booking.lastName}
                    </strong>
                    <span>{booking.email}</span>
                    <span>{booking.phone}</span>
                  </td>
                  <td>
                    <strong>{booking.selectedDate}</strong>
                    <span>
                      {booking.selectedTime} · {booking.sessionType}
                    </span>
                  </td>
                  <td>
                    <strong>
                      ₹{booking.packagePrice?.toLocaleString("en-IN")}
                    </strong>
                    {booking.paymentMethod === "cash" ? (
                      <select
                        className="admin-filter mt-1"
                        value={booking.paymentStatus}
                        disabled={acting === booking.bookingId}
                        onChange={(e) =>
                          updatePaymentStatus(booking, e.target.value)
                        }
                        aria-label={`Payment status for ${booking.bookingId}`}
                      >
                        {paymentStatuses.map((status) => (
                          <option key={status}>{status}</option>
                        ))}
                      </select>
                    ) : (
                      <span>
                        {booking.paymentMethod} · {booking.paymentStatus}
                      </span>
                    )}
                  </td>
                  <td>
                    <select
                      className="admin-filter min-w-[130px]"
                      value={booking.bookingStatus}
                      disabled={acting === booking.bookingId}
                      onChange={(e) => updateStatus(booking, e.target.value)}
                    >
                      {statuses.map((status) => (
                        <option key={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="admin-button-secondary"
                        onClick={() => setPreviewing(booking)}
                      >
                        Preview
                      </button>
                      <button
                        className="admin-button-secondary"
                        onClick={() => setViewing(booking)}
                      >
                        View / Edit
                      </button>
                      <button
                        className="admin-button-secondary"
                        onClick={() => setEditing(booking)}
                      >
                        Reschedule
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pager value={pagination} onChange={setPage} />
      {editing && (
        <RescheduleForm
          booking={editing}
          onClose={() => setEditing(null)}
          onSaved={(message) => {
            setEditing(null);
            setSuccess(message);
            load();
          }}
        />
      )}
      {previewing && (
        <BookingPreview
          booking={previewing}
          onClose={() => setPreviewing(null)}
        />
      )}
      {viewing && (
        <BookingDetailsForm
          booking={viewing}
          onClose={() => setViewing(null)}
          onSaved={(message, updated) => {
            setViewing(null);
            setSuccess(message);
            setItems((current) =>
              current.map((item) =>
                item.bookingId === updated.bookingId ? updated : item,
              ),
            );
          }}
        />
      )}
      {creating && (
        <AdminCreateBooking
          onClose={() => setCreating(false)}
          onSaved={(message) => {
            setCreating(false);
            setSuccess(message);
            load();
          }}
        />
      )}
    </>
  );
}

type AdminCreateBookingState = {
  packageId: string;
  selectedDate: string;
  selectedTime: string;
  sessionType: "Online" | "Offline";
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  identifyYourGender: string;
  dob: string;
  location: string;
  occupation: string;
  relationShipStatus: string;
  numberOfChildren: number;
  whereuknowaboutus: string;
  therapyGoals: string[];
  currentlyTakingAnyPsychiatricMedication: boolean;
  medicationDetails: string;
  addNotes: string;
  informedConsent: string;
  InformedConsentforTherapySessions: string;
  conformationOfBooking: boolean;
};

const adminCreateInitial: AdminCreateBookingState = {
  packageId: "regular", selectedDate: "", selectedTime: "", sessionType: "Offline",
  firstName: "", lastName: "", email: "", phone: "", whatsappNumber: "", identifyYourGender: "Prefer not to say", dob: "1970-01-01",
  location: "", occupation: "", relationShipStatus: "Other", numberOfChildren: 0, whereuknowaboutus: "Other", therapyGoals: [therapyGoalOptions[0]],
  currentlyTakingAnyPsychiatricMedication: false, medicationDetails: "", addNotes: "", informedConsent: "", InformedConsentforTherapySessions: "", conformationOfBooking: false,
};

function AdminCreateBooking({ onClose, onSaved }: { onClose: () => void; onSaved: (message: string) => void }) {
  const [form, setForm] = useState(adminCreateInitial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const update = <K extends keyof AdminCreateBookingState>(field: K, value: AdminCreateBookingState[K]) => setForm((current) => ({ ...current, [field]: value }));
  async function submit(event: FormEvent) {
    event.preventDefault(); setBusy(true); setError("");
    try {
      const payload = await requestApi(CREATE_BOOKING, { method: "POST", body: JSON.stringify({ ...form, sessionMode: form.sessionType, paymentMethod: "cash" }) });
      onSaved(payload.message || "Booking created successfully.");
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to create booking."); }
    finally { setBusy(false); }
  }
  return <Modal title="Book for Client" onClose={() => !busy && onClose()}><form onSubmit={submit} className="max-h-[78vh] space-y-5 overflow-y-auto pr-2">{error && <Notice>{error}</Notice>}<div className="grid gap-4 sm:grid-cols-2"><label className="admin-label">Package<select className={fieldClass} value={form.packageId} onChange={(e) => update("packageId", e.target.value)}><option value="regular">Regular Session</option><option value="four">4 Sessions</option><option value="eight">8 Sessions</option><option value="foreign-couple-therapy-8-session">Foreign Couple Therapy · 8 Sessions</option><option value="foreign-psychologist-psychotherapist-8-session">Foreign Psychologist · 8 Sessions</option></select></label><label className="admin-label">Session type<select className={fieldClass} value={form.sessionType} onChange={(e) => update("sessionType", e.target.value as AdminCreateBookingState["sessionType"])}><option>Online</option><option>Offline</option></select></label><label className="admin-label">Date<input className={fieldClass} type="date" required value={form.selectedDate} onChange={(e) => update("selectedDate", e.target.value)} /></label><label className="admin-label">Time<input className={fieldClass} required placeholder="10:30 AM" value={form.selectedTime} onChange={(e) => update("selectedTime", e.target.value)} /></label><label className="admin-label">First name<input className={fieldClass} required value={form.firstName} onChange={(e) => update("firstName", e.target.value)} /></label><label className="admin-label">Last name<input className={fieldClass} required value={form.lastName} onChange={(e) => update("lastName", e.target.value)} /></label><label className="admin-label">Email<input className={fieldClass} type="email" required value={form.email} onChange={(e) => update("email", e.target.value)} /></label><label className="admin-label">Phone<input className={fieldClass} required value={form.phone} onChange={(e) => update("phone", e.target.value)} /></label><label className="admin-label">WhatsApp number<input className={fieldClass} required value={form.whatsappNumber} onChange={(e) => update("whatsappNumber", e.target.value)} /></label><label className="admin-label">Date of birth<input className={fieldClass} type="date" required value={form.dob} onChange={(e) => update("dob", e.target.value)} /></label><label className="admin-label">Gender<select className={fieldClass} value={form.identifyYourGender} onChange={(e) => update("identifyYourGender", e.target.value)}><option>Prefer not to say</option><option>Male</option><option>Female</option><option>Non-Binary</option><option>Transgender</option><option>Other</option></select></label><label className="admin-label">Location<input className={fieldClass} required value={form.location} onChange={(e) => update("location", e.target.value)} /></label><label className="admin-label">Relationship status<select className={fieldClass} value={form.relationShipStatus} onChange={(e) => update("relationShipStatus", e.target.value)}><option>Other</option><option>Single</option><option>In a relationship</option><option>Married</option><option>Divorced</option><option>Widowed</option></select></label><label className="admin-label">How they heard about us<select className={fieldClass} value={form.whereuknowaboutus} onChange={(e) => update("whereuknowaboutus", e.target.value)}><option>Other</option><option>Social Media</option><option>Friend/Family</option><option>Search Engine</option><option>Advertisement</option></select></label><label className="admin-label">Number of children<input className={fieldClass} type="number" min="0" value={form.numberOfChildren} onChange={(e) => update("numberOfChildren", Number(e.target.value))} /></label></div><label className="admin-label">Occupation<input className={fieldClass} value={form.occupation} onChange={(e) => update("occupation", e.target.value)} /></label><label className="admin-label">Additional notes<textarea className={fieldClass} value={form.addNotes} onChange={(e) => update("addNotes", e.target.value)} /></label><div className="space-y-2 text-sm"><strong>Therapy goal</strong>{therapyGoalOptions.slice(0, 1).map((goal) => <label key={goal} className="flex gap-2"><input type="checkbox" checked={form.therapyGoals.includes(goal)} onChange={(e) => update("therapyGoals", e.target.checked ? [goal] : [])} />{goal}</label>)}</div><label className="flex gap-2 text-sm"><input type="checkbox" checked={form.informedConsent === "I agree"} onChange={(e) => { const value = e.target.checked ? "I agree" : ""; update("informedConsent", value); update("InformedConsentforTherapySessions", value); }} /> Consent given</label><label className="flex gap-2 text-sm"><input type="checkbox" checked={form.conformationOfBooking} onChange={(e) => update("conformationOfBooking", e.target.checked)} /> Booking confirmed by client</label><div className="flex justify-end gap-3"><button type="button" className="admin-button-secondary" onClick={onClose}>Cancel</button><button className="btn-primary" disabled={busy}>{busy ? "Creating…" : "Create Booking"}</button></div></form></Modal>;
}

function escapeHtml(value: unknown) {
  return String(value ?? "Not provided").replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        character
      ] || character,
  );
}

function BookingPreview({
  booking,
  onClose,
}: {
  booking: Booking;
  onClose: () => void;
}) {
  const therapistContent =
    booking.meetYourTherapistContent || THERAPY_CONTENT.meetYourTherapist;
  const consentContent =
    booking.informedConsentContent || THERAPY_CONTENT.informedConsent;
  const sessions = getBookingSessions(booking);
  const therapistBody = therapistContent.replace(
    /^Meet your therapist\s*/i,
    "",
  );
  const consentBody = consentContent.replace(/^Informed Consent\s*/i, "");

  function downloadPdf() {
    const rows = [
      ["Booking ID", booking.bookingId],
      ["Client", `${booking.firstName} ${booking.lastName}`],
      ["Email", booking.email],
      ["Phone", booking.phone],
      ["Package", booking.packageName],
      ["Date", booking.selectedDate],
      ["Time", booking.selectedTime],
      [
        "Session",
        `${booking.sessionType} (${booking.sessionMode || "Not provided"})`,
      ],
      ["Gender", booking.identifyYourGender],
      ["Date of birth", booking.dob],
      ["Location", booking.location],
      ["Relationship status", booking.relationShipStatus],
      // ["Meet your therapist", therapistContent], ["Informed consent", consentContent],
      [
        "Agreement",
        booking.informedConsent || booking.InformedConsentforTherapySessions,
      ],
      ["Occupation", booking.occupation],
      ["Children", booking.numberOfChildren],
      ["Therapy goals", booking.therapyGoals?.join(", ")],
      [
        "Booking confirmation",
        booking.conformationOfBooking ? "Confirmed" : "Not confirmed",
      ],
      ["Payment", `${booking.paymentMethod} · ${booking.paymentStatus}`],
      ["Status", booking.bookingStatus],
    ];
    const sessionsHtml = sessions.map((session, index) => `<div class="session-card"><h3>Session ${index + 1}</h3><p><strong>Date:</strong> ${escapeHtml(session.date)}</p><p><strong>Time:</strong> ${escapeHtml(session.time)}</p><p><strong>Session Type:</strong> ${escapeHtml(session.sessionType)}</p><p><strong>Location:</strong> ${escapeHtml(session.location || "Not provided")}</p><p><strong>Amount Paid:</strong> ₹${escapeHtml(session.amountPaid ?? 0)}</p><p><strong>Remarks:</strong> ${escapeHtml(session.remarks || "")}</p><p><strong>Status:</strong> ${escapeHtml(session.status)}</p></div>`).join("");
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>Booking ${escapeHtml(booking.bookingId)}</title><style>body{font-family:Arial,sans-serif;color:#172126;max-width:760px;margin:40px auto;padding:0 24px;position:relative}body:before{content:"Adore Life With Nidhi";position:fixed;top:45%;left:8%;z-index:10;pointer-events:none;color:#003044;opacity:.08;font-size:56px;font-weight:700;letter-spacing:4px;transform:rotate(-28deg);white-space:nowrap}h1{color:#003044;border-bottom:2px solid #003044;padding-bottom:12px}.print-section{break-before:page;page-break-before:always;break-inside:auto;page-break-inside:auto}.content{white-space:pre-wrap;line-height:1.55;border:1px solid #d9e0e2;padding:16px;background:rgba(255,255,255,.94)}.content h2{color:#003044;margin:0 0 14px;break-after:avoid;page-break-after:avoid}.content-body{white-space:pre-wrap}.session-card{break-inside:avoid;page-break-inside:avoid;border:1px solid #d9e0e2;padding:14px;margin:12px 0;background:rgba(255,255,255,.94)}.session-card h3{color:#003044;margin:0 0 10px}table{width:100%;border-collapse:collapse;background:rgba(255,255,255,.94)}td{border-bottom:1px solid #d9e0e2;padding:10px 6px;vertical-align:top}td:first-child{font-weight:700;width:30%;color:#506356}@media print{body{margin:0}body:before{position:fixed}}</style></head><body><h1>Booking Details</h1><table>${rows.map(([label, value]) => `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(value)}</td></tr>`).join("")}</table><section class="print-section"><div class="content"><h2>Therapy Sessions</h2>${sessionsHtml}</div></section><section class="print-section"><div class="content"><h2>Meet your therapist</h2><div class="content-body">${escapeHtml(therapistBody)}</div></div></section><section class="print-section"><div class="content"><h2>Informed Consent</h2><div class="content-body">${escapeHtml(consentBody)}</div></div></section><section class="print-section"><div class="content"><h2>User Agreement</h2><div class="content-body">${escapeHtml(booking.informedConsent || booking.InformedConsentforTherapySessions || "Not provided")}</div></div></section></body></html>`;
    const url = URL.createObjectURL(new Blob([html], { type: "text/html;charset=utf-8" }));
    const printWindow = window.open(url, "_blank");
    if (!printWindow) {
      URL.revokeObjectURL(url);
      return;
    }
    printWindow.addEventListener(
      "load",
      () => {
        printWindow.focus();
        printWindow.print();
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      },
      { once: true },
    );
  }

  const detail = (label: string, value: unknown) => (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-1 whitespace-pre-line text-sm text-slate-900">
        {String(value || "Not provided")}
      </dd>
    </div>
  );
  return (
    <Modal title={`Booking preview: ${booking.bookingId}`} onClose={onClose}>
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {detail("Client", `${booking.firstName} ${booking.lastName}`)}
          {detail("Email", booking.email)}
          {detail("Phone", booking.phone)}
          {detail("Package", booking.packageName)}
          {detail("Date", booking.selectedDate)}
          {detail("Time", booking.selectedTime)}
          {detail(
            "Session",
            `${booking.sessionType} (${booking.sessionMode || "Not provided"})`,
          )}
          {detail("Location", booking.location)}
          {detail("Gender", booking.identifyYourGender)}
          {detail("Date of birth", booking.dob)}
          {detail("Relationship status", booking.relationShipStatus)}
          {detail("Occupation", booking.occupation)}
          {detail("Therapy goals", booking.therapyGoals?.join(", "))}
          {detail(
            "Agreement",
            booking.informedConsent ||
              booking.InformedConsentforTherapySessions,
          )}
          {detail(
            "Booking confirmation",
            booking.conformationOfBooking ? "Confirmed" : "Not confirmed",
          )}
          {detail(
            "Payment",
            `${booking.paymentMethod} · ${booking.paymentStatus}`,
          )}
          {detail("Status", booking.bookingStatus)}
        </div>
        <section className="space-y-3">
          <h3 className="text-lg font-semibold text-[#003044]">Therapy Sessions</h3>
          {sessions.map((session, index) => (
            <div key={`${session.sessionNumber}-${index}`} className="rounded-lg border border-slate-200 p-4">
              <strong>Session {index + 1}</strong>
              <dl className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
                {detail("Date", session.date)}
                {detail("Time", session.time)}
                {detail("Type", session.sessionType)}
                {detail("Location", session.location)}
                {detail("Amount paid", `₹${session.amountPaid ?? 0}`)}
                {detail("Remarks", session.remarks)}
                {detail("Status", session.status)}
              </dl>
            </div>
          ))}
        </section>
        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-[#003044]">
            Meet your therapist
          </h3>
          <p className="whitespace-pre-line text-sm text-slate-700">
            {therapistBody}
          </p>
        </section>
        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-[#003044]">
            Informed Consent
          </h3>
          <p className="whitespace-pre-line text-sm text-slate-700">
            {consentBody}
          </p>
        </section>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="admin-button-secondary"
            onClick={onClose}
          >
            Close
          </button>
          <button type="button" className="btn-primary" onClick={downloadPdf}>
            Download PDF
          </button>
        </div>
      </div>
    </Modal>
  );
}

function BookingDetailsForm({
  booking,
  onClose,
  onSaved,
}: {
  booking: Booking;
  onClose: () => void;
  onSaved: (message: string, booking: Booking) => void;
}) {
  const [form, setForm] = useState({
    ...booking,
    therapyGoals: booking.therapyGoals || [],
    sessions: getBookingSessions(booking),
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const update = (field: string, value: unknown) =>
    setForm((current) => ({ ...current, [field]: value }));
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const formValues = form as unknown as Record<string, unknown>;
      const payload = await requestApi(ADMIN_BOOKING(booking.bookingId), {
        method: "PATCH",
        body: JSON.stringify({
          ...Object.fromEntries(Object.entries(formValues).filter(([, value]) => value !== undefined && value !== "" && value !== "sessions")),
          sessions: form.sessions,
        }),
      });
      onSaved(payload.message, payload.data.booking);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update booking.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal title={`Booking details: ${booking.bookingId}`} onClose={onClose}>
      <form
        onSubmit={submit}
        className="space-y-5 max-h-[75vh] overflow-y-auto pr-2"
      >
        {error && <Notice>{error}</Notice>}
        <div className="grid sm:grid-cols-2 gap-4">
          {(
            [
              ["firstName", "First name"],
              ["lastName", "Last name"],
              ["email", "Email"],
              ["phone", "Phone"],
              ["whatsappNumber", "WhatsApp"],
              ["dob", "Date of birth"],
              ["location", "Location"],
              ["occupation", "Occupation"],
              ["medicationDetails", "Medication details"],
              ["therapyGoalsOther", "Other therapy goal"],
              ["addNotes", "Additional notes"],
            ] as const
          ).map(([field, label]) => (
            <label key={field} className="admin-label">
              {label}
              <input
                className={fieldClass}
                value={String(
                  (form as unknown as Record<string, unknown>)[field] || "",
                )}
                onChange={(e) => update(field, e.target.value)}
              />
            </label>
          ))}
          <label className="admin-label">
            Gender
            <select
              className={fieldClass}
              value={form.identifyYourGender || ""}
              onChange={(e) => update("identifyYourGender", e.target.value)}
            >
              <option value="">Not provided</option>
              <option>Male</option>
              <option>Female</option>
              <option>Non-Binary</option>
              <option>Transgender</option>
              <option>Prefer not to say</option>
              <option>Other</option>
            </select>
          </label>
          <label className="admin-label">
            Session mode
            <select
              className={fieldClass}
              value={form.sessionMode || ""}
              onChange={(e) => update("sessionMode", e.target.value)}
            >
              <option value="">Not provided</option>
              <option>Online</option>
              <option>Offline</option>
            </select>
          </label>
          <label className="admin-label">
            Relationship status
            <select
              className={fieldClass}
              value={form.relationShipStatus || ""}
              onChange={(e) => update("relationShipStatus", e.target.value)}
            >
              <option value="">Not provided</option>
              <option>Single</option>
              <option>In a relationship</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
              <option>Other</option>
            </select>
          </label>
          <label className="admin-label">
            Number of children
            <input
              className={fieldClass}
              type="number"
              min="0"
              value={form.numberOfChildren ?? 0}
              onChange={(e) =>
                update("numberOfChildren", Number(e.target.value))
              }
            />
          </label>
          <label className="admin-label">
            How they heard about us
            <select
              className={fieldClass}
              value={form.whereuknowaboutus || ""}
              onChange={(e) => update("whereuknowaboutus", e.target.value)}
            >
              <option value="">Not provided</option>
              <option>Social Media</option>
              <option>Friend/Family</option>
              <option>Search Engine</option>
              <option>Advertisement</option>
              <option>Other</option>
            </select>
          </label>
        </div>
        <div className="space-y-3 text-sm">
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={Boolean(form.currentlyTakingAnyPsychiatricMedication)}
              onChange={(e) =>
                update(
                  "currentlyTakingAnyPsychiatricMedication",
                  e.target.checked,
                )
              }
            />{" "}
            Taking psychiatric medication
          </label>
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={Boolean(form.InformedConsentforTherapySessions)}
              onChange={(e) =>
                update(
                  "InformedConsentforTherapySessions",
                  e.target.checked ? "I agree" : "",
                )
              }
            />{" "}
            Consent given
          </label>
          <label className="flex gap-2">
            <input
              type="checkbox"
              checked={Boolean(form.conformationOfBooking)}
              onChange={(e) =>
                update("conformationOfBooking", e.target.checked)
              }
            />{" "}
            Booking confirmed by client
          </label>
        </div>
        <div>
          <div className="mb-3 flex items-center justify-between">
            <strong className="text-sm">Sessions</strong>
            <button
              type="button"
              className="admin-button-secondary"
              onClick={() => setForm((current) => ({
                ...current,
                sessions: [...(current.sessions || []), { sessionNumber: (current.sessions?.length || 0) + 1, date: "", time: "", sessionType: "Online", location: "", amountPaid: 0, remarks: "", status: "scheduled" }],
              }))}
            >
              + Add More Session
            </button>
          </div>
          <div className="space-y-4">
            {(form.sessions || []).map((session, index) => (
              <div key={`${session.sessionNumber}-${index}`} className="rounded-lg border border-slate-200 p-4">
                <div className="mb-3 flex items-center justify-between">
                  <strong className="text-sm">Session {index + 1}</strong>
                  {index > 0 && <button type="button" className="admin-button-quiet" onClick={() => setForm((current) => ({ ...current, sessions: (current.sessions || []).filter((_, sessionIndex) => sessionIndex !== index).map((item, sessionIndex) => ({ ...item, sessionNumber: sessionIndex + 1 })) }))}>Remove</button>}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <label className="admin-label">Date<input className={fieldClass} type="date" value={session.date} onChange={(e) => setForm((current) => ({ ...current, sessions: (current.sessions || []).map((item, sessionIndex) => sessionIndex === index ? { ...item, date: e.target.value } : item) }))} /></label>
                  <label className="admin-label">Time<input className={fieldClass} value={session.time} placeholder="10:30 AM" onChange={(e) => setForm((current) => ({ ...current, sessions: (current.sessions || []).map((item, sessionIndex) => sessionIndex === index ? { ...item, time: e.target.value } : item) }))} /></label>
                  <label className="admin-label">Session type<select className={fieldClass} value={session.sessionType} onChange={(e) => setForm((current) => ({ ...current, sessions: (current.sessions || []).map((item, sessionIndex) => sessionIndex === index ? { ...item, sessionType: e.target.value as BookingSession["sessionType"] } : item) }))}><option>Online</option><option>Offline</option></select></label>
                  <label className="admin-label">Location<input className={fieldClass} value={session.location || ""} onChange={(e) => setForm((current) => ({ ...current, sessions: (current.sessions || []).map((item, sessionIndex) => sessionIndex === index ? { ...item, location: e.target.value } : item) }))} /></label>
                  <label className="admin-label">Amount paid<input className={fieldClass} type="number" min="0" value={session.amountPaid ?? 0} onChange={(e) => setForm((current) => ({ ...current, sessions: (current.sessions || []).map((item, sessionIndex) => sessionIndex === index ? { ...item, amountPaid: Number(e.target.value) } : item) }))} /></label>
                  <label className="admin-label">Remarks<input className={fieldClass} value={session.remarks || ""} onChange={(e) => setForm((current) => ({ ...current, sessions: (current.sessions || []).map((item, sessionIndex) => sessionIndex === index ? { ...item, remarks: e.target.value } : item) }))} /></label>
                  <label className="admin-label">Status<select className={fieldClass} value={session.status} onChange={(e) => setForm((current) => ({ ...current, sessions: (current.sessions || []).map((item, sessionIndex) => sessionIndex === index ? { ...item, status: e.target.value as BookingSession["status"] } : item) }))}><option value="scheduled">Scheduled</option><option value="confirmed">Confirmed</option><option value="completed">Completed</option><option value="cancelled">Cancelled</option><option value="no_show">No show</option></select></label>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <strong className="text-sm">Therapy goals</strong>
          <div className="mt-2 grid gap-2 text-sm">
            {therapyGoalOptions.map((goal) => (
              <label key={goal} className="flex gap-2">
                <input
                  type="checkbox"
                  checked={form.therapyGoals?.includes(goal)}
                  onChange={(e) =>
                    update(
                      "therapyGoals",
                      e.target.checked
                        ? [...(form.therapyGoals || []), goal]
                        : (form.therapyGoals || []).filter(
                            (item) => item !== goal,
                          ),
                    )
                  }
                />{" "}
                {goal}
              </label>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="admin-button-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="btn-primary" disabled={busy}>
            {busy ? "Saving…" : "Save details"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function RescheduleForm({
  booking,
  onClose,
  onSaved,
}: {
  booking: Booking;
  onClose: () => void;
  onSaved: (message: string) => void;
}) {
  const [date, setDate] = useState(booking.selectedDate);
  const [time, setTime] = useState(booking.selectedTime);
  const [sessionType, setSessionType] = useState(booking.sessionType);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const payload = await requestApi(
        ADMIN_BOOKING_RESCHEDULE(booking.bookingId),
        { method: "PATCH", body: JSON.stringify({ date, time, sessionType }) },
      );
      onSaved(payload.message);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reschedule.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <Modal title={`Reschedule ${booking.bookingId}`} onClose={onClose}>
      <form onSubmit={submit} className="space-y-5">
        {error && <Notice>{error}</Notice>}
        <label className="admin-label">
          Date
          <input
            className={fieldClass}
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <div className="grid sm:grid-cols-2 gap-4">
          <label className="admin-label">
            Time
            <input
              className={fieldClass}
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="09:00 AM"
            />
          </label>
          <label className="admin-label">
            Session type
            <select
              className={fieldClass}
              value={sessionType}
              onChange={(e) => setSessionType(e.target.value)}
            >
              <option>Online</option>
              <option>Offline</option>
            </select>
          </label>
        </div>
        <div className="flex justify-end gap-3">
          <button
            type="button"
            className="admin-button-secondary"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="btn-primary" disabled={busy}>
            {busy ? "Saving…" : "Reschedule"}
          </button>
        </div>
      </form>
    </Modal>
  );
}

function SlotAvailabilityManager() {
  const [dates, setDates] = useState<AvailabilityDate[]>([]);
  const [activeDate, setActiveDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [acting, setActing] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const payload = await requestApi(ADMIN_AVAILABILITY);
      const nextDates: AvailabilityDate[] = payload.data?.dates || [];
      setDates(nextDates);
      setActiveDate((current) =>
        nextDates.some((date) => date.date === current)
          ? current
          : nextDates[0]?.date || "",
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load slot availability.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);
  const selected = dates.find((date) => date.date === activeDate) || dates[0];

  async function toggle(slot: Slot) {
    if (!selected || slot.status === "booked") return;
    const key = `${selected.date}-${slot.time}-${slot.sessionType}`;
    setActing(key);
    setError("");
    setMessage("");
    try {
      const nextStatus =
        slot.status === "unavailable" ? "available" : "unavailable";
      const payload = await requestApi(ADMIN_AVAILABILITY, {
        method: "PATCH",
        body: JSON.stringify({
          date: selected.date,
          time: slot.time,
          sessionType: slot.sessionType,
          status: nextStatus,
        }),
      });
      setMessage(payload.message);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update slot.");
    } finally {
      setActing("");
    }
  }

  return (
    <section className="mb-8 rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-label-md uppercase tracking-[0.14em] ui-accent">
            Availability
          </p>
          <h2 className="text-headline-md ui-heading">Manage Session Slots</h2>
          <p className="mt-1 text-sm ui-copy">
            Select a date, then toggle an empty slot between available and not
            available.
          </p>
        </div>
        <button
          className="admin-button-secondary"
          onClick={load}
          disabled={loading}
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      {message && <Notice kind="success">{message}</Notice>}
      {error && <Notice>{error}</Notice>}
      {loading && dates.length === 0 ? (
        <LoadingState label="Loading slot availability…" />
      ) : (
        <>
          <div
            role="tablist"
            aria-label="Manage availability by date"
            className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5"
          >
            {dates.map((date) => (
              <button
                key={date.date}
                type="button"
                role="tab"
                aria-selected={date.date === selected?.date}
                onClick={() => setActiveDate(date.date)}
                className={`rounded-lg border px-3 py-3 text-sm font-semibold transition ${date.date === selected?.date ? "border-[#003044] bg-[#003044] text-white" : "border-slate-200 bg-[#f8fafb] text-[#1b1c19] hover:border-[#003044]"}`}
              >
                {date.label}
              </button>
            ))}
          </div>
          <div className="mb-4 flex flex-wrap gap-4 text-sm ui-copy">
            <span>🟩 Booked</span>
            <span>⬜ Available</span>
            <span>🟥 Not Available</span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {selected?.slots.map((slot) => {
              const key = `${selected.date}-${slot.time}-${slot.sessionType}`;
              const booked = slot.status === "booked";
              const unavailable = slot.status === "unavailable";
              return (
                <button
                  key={key}
                  type="button"
                  disabled={booked || acting === key}
                  onClick={() => toggle(slot)}
                  className={`rounded-xl border p-4 text-left transition ${booked ? "cursor-not-allowed border-emerald-300 bg-emerald-100 text-emerald-950" : unavailable ? "border-red-300 bg-red-100 text-red-950 hover:bg-red-50" : "border-slate-200 bg-white text-[#1b1c19] hover:border-[#003044]"}`}
                >
                  <span className="flex justify-between gap-3">
                    <strong>{slot.time}</strong>
                    <span className="text-xs font-semibold uppercase">
                      {unavailable ? "Not Available" : slot.status}
                    </span>
                  </span>
                  <span className="mt-1 block text-sm">{slot.sessionType}</span>
                  {!booked && (
                    <span className="mt-3 block text-xs font-semibold ui-accent">
                      {acting === key
                        ? "Updating…"
                        : unavailable
                          ? "Mark Available"
                          : "Mark Not Available"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}
