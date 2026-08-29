"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";

type FormErrors = Partial<Record<"name" | "email" | "password" | "confirmPassword" | "submit", string>>;

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  function update(field: keyof typeof form, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: "", submit: "" }));
  }

  function validate() {
    const nextErrors: FormErrors = {};
    if (form.name.trim().length < 2) nextErrors.name = "Name must contain at least 2 characters.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Enter a valid email address.";
    if (form.password.length < 8) nextErrors.password = "Password must contain at least 8 characters.";
    if (form.password !== form.confirmPassword) nextErrors.confirmPassword = "Passwords do not match.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSuccess("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name.trim(), email: form.email.trim(), password: form.password }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        const details = Array.isArray(payload.errors) ? payload.errors.join(" ") : payload.message;
        throw new Error(details || "Unable to create your account.");
      }

      setSuccess("Account created successfully. Taking you to login…");
      window.setTimeout(() => router.replace("/login"), 900);
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : "Unable to create your account." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create an account</h1>

        <p className="auth-subtitle">Keep your session bookings and details together in one secure place.</p>

        <form onSubmit={submit} className="auth-form" noValidate>
          <div>
            <label className="auth-field">Name</label>
            <input
              className="auth-input"
              autoComplete="name"
              value={form.name}
              onChange={(event) => update("name", event.target.value)}
              required
              maxLength={100}
            />
            {errors.name && <span className="auth-inline-message mt-1 block">{errors.name}</span>}
          </div>

          <div>
            <label className="auth-field">Email</label>
            <input
              type="email"
              className="auth-input"
              autoComplete="email"
              value={form.email}
              onChange={(event) => update("email", event.target.value)}
              required
            />
            {errors.email && <span className="auth-inline-message mt-1 block">{errors.email}</span>}
          </div>

          <div>
            <label className="auth-field">Password</label>
            <input
              type="password"
              className="auth-input"
              autoComplete="new-password"
              value={form.password}
              onChange={(event) => update("password", event.target.value)}
              required
              minLength={8}
              maxLength={128}
            />
            {errors.password ? <span className="auth-inline-message mt-1 block">{errors.password}</span> : <span className="mt-1 block text-[11px] text-[#5a6770]">Use at least 8 characters.</span>}
          </div>

          <div>
            <label className="auth-field">Confirm password</label>
            <input
              type="password"
              className="auth-input"
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={(event) => update("confirmPassword", event.target.value)}
              required
            />
            {errors.confirmPassword && <span className="auth-inline-message mt-1 block">{errors.confirmPassword}</span>}
          </div>

          {errors.submit && <div role="alert" className="auth-inline-message">{errors.submit}</div>}
          {success && <div role="status" className="auth-inline-message success">{success}</div>}

          <button type="submit" className="auth-button" disabled={loading || Boolean(success)}>
            {loading ? "Creating account…" : "Create account"}
          </button>
        </form>

        <div className="auth-footer">
          <span>Already have an account?</span>
          <br />
          <Link href="/login" className="auth-link">Log in</Link>
        </div>
      </div>
    </main>
  );
}
