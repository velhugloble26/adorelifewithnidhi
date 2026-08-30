"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<"credentials" | "otp">("credentials");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectTarget, setRedirectTarget] = useState("/my-bookings");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextTarget = params.get("redirect") || "/my-bookings";
    setRedirectTarget(nextTarget);

    fetch("/api/auth/me", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((payload) => {
        if (payload?.success && payload?.data?.user) {
          router.replace(nextTarget);
        }
      })
      .catch(() => undefined);
  }, [router]);

  const submitCredentials = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || payload.errors?.[0] || "Unable to sign in.");
      }

      setStep("otp");
    } catch (err: any) {
      setError(err.message || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  const submitOtp = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const payload = await response.json();

      if (!response.ok || !payload.success) {
        throw new Error(payload.message || payload.errors?.[0] || "Invalid OTP.");
      }

      router.replace(redirectTarget);
    } catch (err: any) {
      setError(err.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Login</h1>

        <p className="auth-subtitle">Access your bookings and session details securely.</p>

        {step === "credentials" ? (
          <form onSubmit={submitCredentials} className="auth-form">
            <div>
              <label className="auth-field">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
                placeholder="sandeep01@gmail"
              />
            </div>

            <div>
              <label className="auth-field">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
                placeholder="••••••••"
              />
            </div>

            {error && <div className="auth-inline-message">{error}</div>}

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? "Sending OTP..." : "Continue"}
            </button>
          </form>
        ) : (
          <form onSubmit={submitOtp} className="auth-form">
            <div>
              <label className="auth-field">OTP</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="auth-input"
              />
            </div>

            <p className="auth-inline-message" style={{ color: "#173f4d" }}>
              We sent a 6-digit OTP to {email}.
            </p>

            {error && <div className="auth-inline-message">{error}</div>}

            <button type="submit" disabled={loading} className="auth-button">
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            <button type="button" className="text-[15px] font-medium text-[#173f4d] underline" onClick={() => setStep("credentials")}>
              Change email
            </button>
          </form>
        )}

        <div className="auth-footer">
          <span>Don’t have an account?</span>
          <br />
          <Link href="/signup" className="auth-link">
            Create one
          </Link>
        </div>
      </div>
    </main>
  );
}
