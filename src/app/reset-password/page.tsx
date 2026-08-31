"use client";

import { RESET_PASSWORD } from "@/utils/api";

import Link from "next/link";
import { FormEvent, Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";
  const [form, setForm] = useState({ password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);


  function validate() {
    if (!token) return "This password reset link is invalid or incomplete.";
    if (form.password.length < 8) return "Password must contain at least 8 characters.";
    if (form.password.length > 128) return "Password must not exceed 128 characters.";
    if (form.password !== form.confirmPassword) return "Passwords do not match.";
    return "";
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const validationError = validate();
    if (validationError) { setError(validationError); return; }
    setLoading(true); setError("");
    try {
      const response = await fetch(RESET_PASSWORD, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, ...form }) });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.success) {
        const details = Array.isArray(payload?.errors) ? payload.errors.join(" ") : payload?.message;
        throw new Error(details || "Unable to reset your password.");
      }
      setSuccess("Your password has been reset successfully. You can now log in with your new password.");
      setForm({ password: "", confirmPassword: "" });
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to reset your password."); }
    finally { setLoading(false); }
  }

  return <main className="auth-page"><div className="auth-card">
    <h1 className="auth-title">Create new password</h1>
    <p className="auth-subtitle">Choose a secure password with at least 8 characters.</p>
    {!success && <form onSubmit={submit} className="auth-form" noValidate>
      <div><label htmlFor="new-password" className="auth-field">New password</label><input id="new-password" type="password" autoComplete="new-password" className="auth-input" value={form.password} onChange={(e) => { setForm((current) => ({ ...current, password: e.target.value })); setError(""); }} minLength={8} maxLength={128} required autoFocus /></div>
      <div><label htmlFor="confirm-password" className="auth-field">Confirm new password</label><input id="confirm-password" type="password" autoComplete="new-password" className="auth-input" value={form.confirmPassword} onChange={(e) => { setForm((current) => ({ ...current, confirmPassword: e.target.value })); setError(""); }} required /></div>
      {error && <div role="alert" className="auth-inline-message">{error}</div>}
      <button type="submit" className="auth-button" disabled={loading || !token}>{loading ? "Resetting password…" : "Reset password"}</button>
    </form>}
    {success && <div role="status" className="auth-inline-message success">{success}</div>}
    {!token && !success && <div role="alert" className="auth-inline-message">This reset link is missing its security token. Request a new link.</div>}
    <div className="auth-footer"><Link href={success ? "/login" : "/forgot-password"} className="auth-link">{success ? "Continue to login" : "Request a new link"}</Link></div>
  </div></main>;
}

export default function ResetPasswordPage() {
  return <Suspense fallback={<main className="auth-page"><div className="auth-card"><p className="auth-subtitle">Loading reset form…</p></div></main>}><ResetPasswordForm /></Suspense>;
}
