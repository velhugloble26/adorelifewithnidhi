"use client";

import { FORGET_PASSWORD } from "@/utils/api";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function validateEmail() {
    const value = email.trim();
    if (!value) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(value)) return "Enter a valid email address.";
    return "";
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const validationError = validateEmail();
    if (validationError) { setError(validationError); return; }
    setLoading(true); setError(""); setSuccess("");
    try {
      const response = await fetch(FORGET_PASSWORD, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });
      const payload = await response.json().catch(() => null);
      if (!response.ok || !payload?.success) {
        const details = Array.isArray(payload?.errors) ? payload.errors.join(" ") : payload?.message;
        throw new Error(details || "Unable to request a password reset.");
      }
      setSuccess(payload.message || "If an account exists with this email, a reset link will be sent.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to request a password reset.");
    } finally { setLoading(false); }
  }

  return <main className="auth-page"><div className="auth-card">
    <h1 className="auth-title">Forgot password?</h1>
    <p className="auth-subtitle">Enter your account email and we’ll send you a secure link to choose a new password.</p>
    <form onSubmit={submit} className="auth-form" noValidate>
      <div><label htmlFor="forgot-email" className="auth-field">Email</label><input id="forgot-email" type="email" autoComplete="email" className="auth-input" value={email} onChange={(event) => { setEmail(event.target.value); setError(""); }} disabled={loading || Boolean(success)} required autoFocus />{error && <div role="alert" className="auth-inline-message mt-1">{error}</div>}</div>
      {success && <div role="status" className="auth-inline-message success">{success} Please check your inbox and spam folder. The link expires in 15 minutes.</div>}
      <button type="submit" className="auth-button" disabled={loading || Boolean(success)}>{loading ? "Sending reset link…" : success ? "Reset link sent" : "Send reset link"}</button>
    </form>
    <div className="auth-footer"><Link href="/login" className="auth-link">Back to login</Link></div>
  </div></main>;
}
