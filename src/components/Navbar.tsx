"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const LOGO_URL =
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBzUq9CxfMlZyYyJU5RWDlJwf27Uf6PWJqmAYXFD742d3u1I9nGWiImtfJE1wP-9KXTnDZSz16LsuIqYCq1hrzUk-hdHwsmiZTPmMu5KDzZZTT_qYLBKLgtdqESyJYkMEQnLthhiP1QJXzwB_WdlJLKkE5B3choWYd8BG4NcrhlwBdD6FPV6on-DQautDU1A4qQs0epEkodHeExtS1y57v4wnolCDdHA8-8WtBxaV0OoQ59n3ZpTWnBfnaMSEntw2Ba-Q";

const navLinks = [
    { href: "/home", label: "Home" },
    { href: "/story", label: "Story" },
    { href: "/therapy", label: "Therapy" },
    { href: "/conversation", label: "Conversation" },
];

export default function Navbar() {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <header className="glass-nav sticky top-0 z-50 w-full transition-all duration-500 ease-in-out">
                <div
                    className="flex justify-between items-center w-full py-5 max-w-[1440px] mx-auto"
                    style={{ paddingLeft: "clamp(1rem, 10vw, 9rem)", paddingRight: "clamp(1rem, 10vw, 9rem)" }}
                >
                    {/* Brand */}
                    <Link href="/home" aria-label="Adore Life – Home">
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
