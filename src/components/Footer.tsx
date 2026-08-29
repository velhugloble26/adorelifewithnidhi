"use client";

import Link from "next/link";

const LOGO_URL = "/website_logo.png";

export default function Footer() {
    return (
        <footer
            className="w-full"
            style={{ backgroundColor: "var(--color-surface-container-low)" }}
        >
            <div
                className="flex flex-col md:flex-row justify-between items-center gap-8 py-16 max-w-[1440px] mx-auto"
                style={{
                    paddingLeft: "clamp(1rem, 10vw, 9rem)",
                    paddingRight: "clamp(1rem, 10vw, 9rem)",
                }}
            >
                {/* Brand */}
                <Link href="/" aria-label="Adore Life – Home">
                    <img
                        src={LOGO_URL}
                        alt="Adore Life"
                        style={{ width: 180, height: "auto" }}
                        loading="lazy"
                    />
                </Link>

                {/* Copyright */}
                <p
                    className="text-body-md text-center md:text-right"
                    style={{ color: "var(--color-on-surface)" }}
                >
                    © Adore Life. Because everyone deserves to be understood.
                </p>

                {/* Footer action */}
                <div className="flex items-center justify-center">
                    <Link
                        href="/login?redirect=/my-bookings"
                        className="btn-primary"
                        style={{ paddingTop: "0.7rem", paddingBottom: "0.7rem" }}
                    >
                        My Bookings
                    </Link>
                </div>
            </div>
        </footer>
    );
}
