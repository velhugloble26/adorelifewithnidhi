"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LOGO_URL = "/website_logo.png";

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        let active = true;

        fetch("/api/auth/me")
            .then((res) => res.ok ? res.json() : null)
            .then((payload) => {
                if (!active) return;
                setIsAuthenticated(Boolean(payload?.success && payload?.data?.user));
            })
            .catch(() => setIsAuthenticated(false));

        return () => {
            active = false;
        };
    }, []);

    const navLinks = [
        { href: "/home", label: "Home" },
        { href: "/story", label: "Story" },
        { href: "/therapy", label: "Therapy" },
        { href: "/book-session", label: "Book Your Session" },
        { href: "/conversation", label: "Conversation" },
    ];

    return (
        <>
            <header className="glass-nav sticky top-0 z-50 w-full transition-all duration-500 ease-in-out">
                <div
                    className="flex justify-between items-center w-full py-5 max-w-[1440px] mx-auto"
                    style={{ paddingLeft: "clamp(1rem, 10vw, 9rem)", paddingRight: "clamp(1rem, 10vw, 9rem)" }}
                >
                    {/* Brand */}
                    <Link href="/" aria-label="Adore Life – Home">
                        <img
                            src={LOGO_URL}
                            alt="Adore Life"
                            className="h-14 w-auto object-contain"
                            loading="eager"
                        />
                    </Link>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
                        {navLinks.map(({ href, label }) => {
                            const active =
                                href === "/home"
                                    ? pathname === "/home"
                                    : pathname.startsWith(href);
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`nav-link${active ? " nav-link-active" : ""}`}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* CTA + mobile toggle */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/conversation"
                            className="hidden md:inline-flex btn-primary"
                            style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
                        >
                            Begin
                        </Link>
                        <button
                            className="md:hidden"
                            aria-label="Open menu"
                            onClick={() => setMobileOpen((o) => !o)}
                            style={{ color: "var(--color-primary)" }}
                        >
                            <span className="material-symbols-outlined text-2xl">
                                {mobileOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>

                {/* Mobile drawer */}
                {mobileOpen && (
                    <nav
                        className="md:hidden flex flex-col gap-1 px-6 pb-6"
                        aria-label="Mobile navigation"
                        style={{ backgroundColor: "var(--color-surface)" }}
                    >
                        {navLinks.map(({ href, label }) => {
                            const active =
                                href === "/home"
                                    ? pathname === "/home"
                                    : pathname.startsWith(href);
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    onClick={() => setMobileOpen(false)}
                                    className={`nav-link py-3 border-b${active ? " nav-link-active" : ""}`}
                                    style={{ borderColor: "var(--color-outline-variant)" }}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                        <Link
                            href="/conversation"
                            onClick={() => setMobileOpen(false)}
                            className="btn-primary mt-4 self-start"
                        >
                            Begin
                        </Link>
                    </nav>
                )}
            </header>
        </>
    );
}
