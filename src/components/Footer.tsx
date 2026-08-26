"use client";

import Link from "next/link";

const LOGO_URL =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDjbnxJtbDFBXfipjblNxSEYqqz0CJSqSbzWq4LJwMUsJdpOW7-R9MrHjGJOCCo7UpP8NNRk6d59qBH8bM88iF3vGICwDzqu-4lDgrKr8d3zJ5e3y-LOqtGhfeQ738qV6CeNzLSCWaY0EjmCB3tZ0iLJzZ-ZNZyONqdUEEhxjM0RV-Q2QzwZKrkf6X8WrzTrFS0sXAg9pjOZFsXXe5RQSJg5DviG6kHewRfoTQEo6oKRL7HakascLABmvSbwLYi2TtiVQ";

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

                {/* Legal links */}
                <nav className="flex gap-6" aria-label="Footer navigation">
                    {["Privacy", "Terms", "Support"].map((label) => (
                        <Link
                            key={label}
                            href={`/${label.toLowerCase()}`}
                            className="text-label-md transition-colors duration-300"
                            style={{ color: "var(--color-on-surface-variant)" }}
                            onMouseEnter={(e) =>
                                (e.currentTarget.style.color = "var(--color-soft-teal)")
                            }
                            onMouseLeave={(e) =>
                            (e.currentTarget.style.color =
                                "var(--color-on-surface-variant)")
                            }
                        >
                            {label}
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    );
}
