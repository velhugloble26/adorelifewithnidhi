"use client";

import { CREATE_QUOTE_CONTACTS } from "@/utils/api";

import { FormEvent, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  preferredSession: "",
  preferredFormat: "",
  message: "",
};
type FormState = typeof initialForm;
type FormErrors = Partial<Record<keyof FormState | "submit", string>>;

export default function EnquiryModal() {
  const pathname = usePathname();
  const [open, setOpen] = useState(() => !pathname.startsWith("/admin"));
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const submitting = useRef(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !loading) setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open, loading]);

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "", submit: "" }));
  }

  function validate() {
    const next: FormErrors = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone.trim()))
      next.phone = "Enter a valid phone or WhatsApp number.";
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    if (form.message.length > 5000)
      next.message = "Message must not exceed 5000 characters.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting.current || !validate()) return;
    submitting.current = true;
    setLoading(true);
    setSuccess("");
    setErrors({});
    try {
      const payloadBody = {
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim().toLowerCase(),
        preferredSession: form.preferredSession,
        preferredFormat: form.preferredFormat,
        message: form.message.trim(),
      };
      const response = await fetch(CREATE_QUOTE_CONTACTS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payloadBody),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.success) {
        const detail = Array.isArray(payload?.errors)
          ? payload.errors.join(" ")
          : payload?.message;
        throw new Error(detail || "Unable to send your enquiry.");
      }
      setForm(initialForm);
      setSuccess("Thank you. Your session request has been sent successfully.");
      window.setTimeout(() => setOpen(false), 1000);
    } catch (error) {
      setErrors({
        submit:
          error instanceof Error
            ? error.message
            : "Unable to send your enquiry.",
      });
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  }

  if (!open || pathname.startsWith("/admin")) return null;
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#001e2d]/55 p-3 sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) setOpen(false);
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        className="surface-base relative max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-slate-200 p-5 shadow-2xl sm:p-8"
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          disabled={loading}
          className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-[#003044] transition hover:bg-[#e9f2f5] disabled:opacity-50"
          aria-label="Close enquiry form"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="mb-7 pr-12">
          <p className="text-label-md uppercase tracking-[0.18em] ui-accent">
            Begin a conversation
          </p>
          <h2
            id="enquiry-modal-title"
            className="text-headline-lg mt-2 ui-heading"
          >
            Tell us a little about yourself.
          </h2>
          <p className="text-body-md mt-2 ui-copy">
            You don&apos;t need to tell us your entire story here. Just share
            enough for us to understand how we can begin.
          </p>
        </div>
        <form onSubmit={submit} className="space-y-6" noValidate>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Name" error={errors.name}>
              <input
                className="ghost-input"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="How should we address you?"
                autoComplete="name"
              />
            </Field>
            <Field label="Phone / WhatsApp" error={errors.phone}>
              <input
                type="tel"
                className="ghost-input"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="Best number to reach you"
                autoComplete="tel"
              />
            </Field>
          </div>
          <Field label="Email Address" error={errors.email}>
            <input
              type="email"
              className="ghost-input"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="Where should we send details?"
              autoComplete="email"
            />
          </Field>
          <div className="grid gap-6 md:grid-cols-2">
            <Field label="Preferred Session">
              <select
                className="ghost-input w-full"
                value={form.preferredSession}
                onChange={(e) => update("preferredSession", e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="individual">Individual Therapy</option>
                <option value="couples">Couples Therapy</option>
                <option value="unsure">I&apos;m Not Sure</option>
              </select>
            </Field>
            <Field label="Preferred Format">
              <select
                className="ghost-input w-full"
                value={form.preferredFormat}
                onChange={(e) => update("preferredFormat", e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="online">Online</option>
                <option value="in-person">In-person</option>
                <option value="either">Either</option>
              </select>
            </Field>
          </div>
          <Field
            label="What would you like us to understand about you before we meet?"
            error={errors.message}
          >
            <textarea
              rows={3}
              className="ghost-input resize-none"
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              placeholder="Your message..."
              maxLength={5000}
            />
          </Field>
          {errors.submit && (
            <div
              role="alert"
              className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errors.submit}
            </div>
          )}
          {success && (
            <div
              role="status"
              className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700"
            >
              {success}
            </div>
          )}
          <button
            type="submit"
            disabled={loading || Boolean(success)}
            className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Sending..."
              : success
                ? "Sent successfully"
                : "Request a Session"}
          </button>
        </form>
      </section>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="flex flex-col">
      <span className="text-label-md mb-1 ui-muted">{label}</span>
      {children}
      {error && <span className="mt-1 text-sm text-red-700">{error}</span>}
    </label>
  );
}
