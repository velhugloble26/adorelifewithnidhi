/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { ADMIN_BOOKINGS, ADMIN_CLIENT_REPORT } from "@/utils/api";
import { FormEvent, useCallback, useEffect, useState } from "react";
import {
  EmptyState,
  fieldClass,
  LoadingState,
  Modal,
  Notice,
  PageHeader,
  requestApi,
} from "./AdminUI";

type ReportRow = {
  bookingId: string;
  date: string;
  time: string;
  clientName: string;
  sessionNumber: number;
  amountPaid: number;
  mode: "Online" | "Offline";
  location?: string;
  remarks?: string;
  status?: string;
};
type BookingOption = {
  bookingId: string;
  firstName: string;
  lastName: string;
  email: string;
};
type FormState = {
  bookingId: string;
  clientName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  mode: "Online" | "Offline";
  location: string;
  amountPaid: string;
  remarks: string;
  status: "scheduled" | "confirmed" | "completed" | "cancelled" | "no_show";
};

const emptyForm: FormState = {
  bookingId: "",
  clientName: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  mode: "Offline",
  location: "",
  amountPaid: "0",
  remarks: "",
  status: "scheduled",
};

const reportColumns: Array<{ key: keyof ReportRow; label: string }> = [
  { key: "bookingId", label: "Booking ID" },
  { key: "date", label: "Date" },
  { key: "time", label: "Time" },
  { key: "clientName", label: "Client Name" },
  { key: "amountPaid", label: "Amount Paid" },
  { key: "mode", label: "Mode" },
  { key: "location", label: "Location" },
  { key: "remarks", label: "Remarks" },
  { key: "status", label: "Status" },
];

function exportValue(value: ReportRow[keyof ReportRow]) {
  return value == null ? "" : String(value);
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[character] || character);
}

function downloadReportFile(content: string, fileName: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function downloadCsv(rows: ReportRow[]) {
  const csv = [
    reportColumns.map(({ label }) => label),
    ...rows.map((row) => reportColumns.map(({ key }) => exportValue(row[key]))),
  ]
    .map((line) => line.map((value) => `"${value.replace(/"/g, '""')}"`).join(","))
    .join("\r\n");

  downloadReportFile(`\uFEFF${csv}`, "client-report.csv", "text/csv;charset=utf-8");
}

function downloadExcel(rows: ReportRow[]) {
  const header = reportColumns.map(({ label }) => `<th>${escapeHtml(label)}</th>`).join("");
  const body = rows.map((row) => `<tr>${reportColumns.map(({ key }) => `<td>${escapeHtml(exportValue(row[key]))}</td>`).join("")}</tr>`).join("");
  const workbook = `<html><head><meta charset="utf-8"></head><body><table><thead><tr>${header}</tr></thead><tbody>${body}</tbody></table></body></html>`;

  downloadReportFile(workbook, "client-report.xls", "application/vnd.ms-excel;charset=utf-8");
}

export default function ClientReport() {
  const [rows, setRows] = useState<ReportRow[]>([]);
  const [bookings, setBookings] = useState<BookingOption[]>([]);
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [mode, setMode] = useState("");
  const [form, setForm] = useState<FormState>(emptyForm);
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<ReportRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const query = new URLSearchParams();
      if (search.trim()) query.set("search", search.trim());
      if (date) query.set("date", date);
      if (mode) query.set("mode", mode);
      const [report, bookingList] = await Promise.all([
        requestApi(`${ADMIN_CLIENT_REPORT}?${query}`),
        requestApi(`${ADMIN_BOOKINGS}?limit=100`),
      ]);
      setRows(report.data?.data || []);
      setBookings(
        (bookingList.data?.data || []).map((booking: BookingOption) => ({
          bookingId: booking.bookingId,
          firstName: booking.firstName,
          lastName: booking.lastName,
          email: booking.email,
        })),
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load client report.",
      );
    } finally {
      setLoading(false);
    }
  }, [date, mode, search]);

  useEffect(() => {
    load();
  }, [load]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setSuccess("");
    try {
      await requestApi(ADMIN_CLIENT_REPORT, {
        method: "POST",
        body: JSON.stringify({ ...form, amountPaid: Number(form.amountPaid) }),
      });
      setAdding(false);
      setForm(emptyForm);
      setSuccess("Client session saved successfully.");
      await load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to save client session.",
      );
    } finally {
      setBusy(false);
    }
  }

  async function updateSession(event: FormEvent) {
    event.preventDefault();
    if (!editing) return;
    setBusy(true);
    setError("");
    setSuccess("");
    const target = editing;
    try {
      await requestApi(ADMIN_CLIENT_REPORT, {
        method: "PATCH",
        body: JSON.stringify(target),
      });
      setEditing(null);
      setSuccess("Client session updated successfully.");
      await load();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update client session.",
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <PageHeader
        eyebrow="Sessions"
        title="Client Report"
        description="All booking sessions, including additional sessions, from the shared Booking collection."
        // action={
        //   <button
        //     type="button"
        //     className="btn-primary"
        //     onClick={() => {
        //       setError("");
        //       setAdding(true);
        //     }}
        //   >
        //     + Add Client / Session
        //   </button>
        // }
      />
      {success && <Notice kind="success">{success}</Notice>}
      {error && <Notice>{error}</Notice>}
      <div className="admin-toolbar">
        <input
          className="admin-search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search client or booking ID"
        />
        <input
          className="admin-filter"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          aria-label="Filter by date"
        />
        <select
          className="admin-filter"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          aria-label="Filter by mode"
        >
          <option value="">All modes</option>
          <option>Online</option>
          <option>Offline</option>
        </select>
        <button
          type="button"
          className="admin-button-secondary"
          onClick={() => downloadExcel(rows)}
          disabled={!rows.length}
        >
          Download Excel
        </button>
        <button
          type="button"
          className="admin-button-secondary"
          onClick={() => downloadCsv(rows)}
          disabled={!rows.length}
        >
          Download CSV
        </button>
        <button type="button" className="admin-button-secondary" onClick={load}>
          Refresh
        </button>
      </div>
      {loading ? (
        <LoadingState label="Loading client report…" />
      ) : rows.length === 0 ? (
        <EmptyState
          icon="assignment"
          title="No client sessions found"
          body="Existing booking sessions will appear here automatically."
        />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name of the Client</th>
                {/* <th>Session No</th> */}
                <th>Amount Paid</th>
                <th>Online/Offline</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.bookingId}-${row.sessionNumber}`}>
                  <td>
                    <strong>{row.date}</strong>
                    <span>{row.time}</span>
                  </td>
                  <td>
                    <strong>{row.clientName}</strong>
                    <span>{row.bookingId}</span>
                  </td>
                  <td>
                    {/* Session {row.sessionNumber} */}
                    <span>{row.status}</span>
                  </td>
                  <td>₹{row.amountPaid.toLocaleString("en-IN")}</td>
                  <td>
                    {row.mode}
                    <span>{row.location}</span>
                  </td>
                  <td>{row.remarks || ""}</td>
                  <td>
                    <button
                      type="button"
                      className="admin-button-secondary"
                      onClick={() => setEditing({ ...row })}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {editing && (
        <Modal
          title={`Edit Session ${editing.sessionNumber}`}
          onClose={() => !busy && setEditing(null)}
        >
          <form onSubmit={updateSession} className="space-y-4">
            <label className="admin-label">
              Date
              <input
                className={fieldClass}
                type="date"
                required
                value={editing.date}
                onChange={(e) =>
                  setEditing(
                    (current) =>
                      current && { ...current, date: e.target.value },
                  )
                }
              />
            </label>
            <label className="admin-label">
              Time
              <input
                className={fieldClass}
                required
                value={editing.time}
                onChange={(e) =>
                  setEditing(
                    (current) =>
                      current && { ...current, time: e.target.value },
                  )
                }
              />
            </label>
            <label className="admin-label">
              Mode
              <select
                className={fieldClass}
                value={editing.mode}
                onChange={(e) =>
                  setEditing(
                    (current) =>
                      current && {
                        ...current,
                        mode: e.target.value as ReportRow["mode"],
                      },
                  )
                }
              >
                <option>Online</option>
                <option>Offline</option>
              </select>
            </label>
            <label className="admin-label">
              Location
              <input
                className={fieldClass}
                value={editing.location || ""}
                onChange={(e) =>
                  setEditing(
                    (current) =>
                      current && { ...current, location: e.target.value },
                  )
                }
              />
            </label>
            <label className="admin-label">
              Amount paid
              <input
                className={fieldClass}
                type="number"
                min="0"
                value={editing.amountPaid}
                onChange={(e) =>
                  setEditing(
                    (current) =>
                      current && {
                        ...current,
                        amountPaid: Number(e.target.value),
                      },
                  )
                }
              />
            </label>
            <label className="admin-label">
              Status
              <select
                className={fieldClass}
                value={editing.status || "scheduled"}
                onChange={(e) =>
                  setEditing(
                    (current) =>
                      current && { ...current, status: e.target.value },
                  )
                }
              >
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no_show">No show</option>
              </select>
            </label>
            <label className="admin-label">
              Remarks
              <textarea
                className={fieldClass}
                value={editing.remarks || ""}
                onChange={(e) =>
                  setEditing(
                    (current) =>
                      current && { ...current, remarks: e.target.value },
                  )
                }
              />
            </label>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="admin-button-secondary"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button className="btn-primary" disabled={busy}>
                {busy ? "Saving…" : "Save"}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {adding && (
        <Modal
          title="Add Client / Session"
          onClose={() => !busy && setAdding(false)}
        >
          <form onSubmit={submit} className="space-y-4">
            <label className="admin-label">
              Existing booking (optional)
              <select
                className={fieldClass}
                value={form.bookingId}
                onChange={(e) => {
                  const selected = bookings.find(
                    (booking) => booking.bookingId === e.target.value,
                  );
                  setForm((current) => ({
                    ...current,
                    bookingId: e.target.value,
                    clientName: selected
                      ? `${selected.firstName} ${selected.lastName}`
                      : current.clientName,
                    email: selected?.email || current.email,
                  }));
                }}
              >
                <option value="">New client</option>
                {bookings.map((booking) => (
                  <option key={booking.bookingId} value={booking.bookingId}>
                    {booking.bookingId} · {booking.firstName} {booking.lastName}
                  </option>
                ))}
              </select>
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="admin-label">
                Client name
                <input
                  className={fieldClass}
                  required
                  value={form.clientName}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      clientName: e.target.value,
                    }))
                  }
                />
              </label>
              <label className="admin-label">
                Email (optional)
                <input
                  className={fieldClass}
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      email: e.target.value,
                    }))
                  }
                />
              </label>
              <label className="admin-label">
                Date
                <input
                  className={fieldClass}
                  type="date"
                  required
                  value={form.date}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, date: e.target.value }))
                  }
                />
              </label>
              <label className="admin-label">
                Time
                <input
                  className={fieldClass}
                  required
                  placeholder="10:30 AM"
                  value={form.time}
                  onChange={(e) =>
                    setForm((current) => ({ ...current, time: e.target.value }))
                  }
                />
              </label>
              <label className="admin-label">
                Mode
                <select
                  className={fieldClass}
                  value={form.mode}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      mode: e.target.value as FormState["mode"],
                    }))
                  }
                >
                  <option>Online</option>
                  <option>Offline</option>
                </select>
              </label>
              <label className="admin-label">
                Location
                <input
                  className={fieldClass}
                  value={form.location}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      location: e.target.value,
                    }))
                  }
                />
              </label>
              <label className="admin-label">
                Amount paid
                <input
                  className={fieldClass}
                  type="number"
                  min="0"
                  value={form.amountPaid}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      amountPaid: e.target.value,
                    }))
                  }
                />
              </label>
              <label className="admin-label">
                Status
                <select
                  className={fieldClass}
                  value={form.status}
                  onChange={(e) =>
                    setForm((current) => ({
                      ...current,
                      status: e.target.value as FormState["status"],
                    }))
                  }
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="no_show">No show</option>
                </select>
              </label>
            </div>
            <label className="admin-label">
              Remarks
              <input
                className={fieldClass}
                value={form.remarks}
                onChange={(e) =>
                  setForm((current) => ({
                    ...current,
                    remarks: e.target.value,
                  }))
                }
              />
            </label>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="admin-button-secondary"
                disabled={busy}
                onClick={() => setAdding(false)}
              >
                Cancel
              </button>
              <button className="btn-primary" disabled={busy}>
                {busy ? "Saving…" : "Save session"}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
}
