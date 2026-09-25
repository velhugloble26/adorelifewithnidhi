"use client";

import { AUTH_ME } from "@/utils/api";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { NAVBAR_REVEAL_EVENT, NAVBAR_REVEAL_STORAGE_KEY } from "@/components/LandingNavbarRevealLink";

const LOGO_URL = "/website_logo.png";

export default function Navbar() {
    const pathname = usePathname();
    const prefersReducedMotion = useReducedMotion();
    const isLandingPage = pathname === "/";
    const [landingNavRevealed, setLandingNavRevealed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const navLinksVisible = !isLandingPage || landingNavRevealed;

    useEffect(() => {
        if (!isLandingPage) return;

        const revealNavbar = () => setLandingNavRevealed(true);
        let storedAsRevealed = false;
        try {
            storedAsRevealed = window.sessionStorage.getItem(NAVBAR_REVEAL_STORAGE_KEY) === "true";
        } catch {
            // Session storage can be unavailable in strict privacy modes.
        }
        const frame = storedAsRevealed ? window.requestAnimationFrame(revealNavbar) : null;

        window.addEventListener(NAVBAR_REVEAL_EVENT, revealNavbar);
        return () => {
            if (frame !== null) window.cancelAnimationFrame(frame);
            window.removeEventListener(NAVBAR_REVEAL_EVENT, revealNavbar);
        };
    }, [isLandingPage]);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 12);
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        let active = true;

        fetch(AUTH_ME)
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
        <AnimatePresence>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`glass-nav sticky top-0 z-50 w-full transition-all duration-300 ease-in-out${isScrolled ? " navbar-scrolled" : ""}`}
            >
                <div
                    className="flex justify-between items-center w-full py-5 max-w-[1440px] mx-auto"
                    style={{ paddingLeft: "clamp(1rem, 4vw, 4rem)", paddingRight: "clamp(1rem, 4vw, 4rem)" }}
                >
                    {/* Brand */}
                    <Link href="/" aria-label="Adore Life – Home">
                        <Image
                            src={LOGO_URL}
                            alt="Adore Life"
                            width={1080}
                            height={897}
                            className="h-29 w-auto object-contain transition-transform duration-500 hover:scale-105 hover:opacity-90"
                            loading="eager"
                        />
                    </Link>

                    {/* Desktop nav */}
                    <motion.nav
                        initial={false}
                        animate={{ opacity: navLinksVisible ? 1 : 0, y: navLinksVisible ? 0 : -10 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
                        className="hidden md:flex items-center gap-8"
                        aria-label="Main navigation"
                        aria-hidden={!navLinksVisible}
                        inert={!navLinksVisible ? true : undefined}
                        style={{ pointerEvents: navLinksVisible ? "auto" : "none" }}
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
                                    className="nav-link relative pb-1"
                                    style={{ color: active ? "var(--color-primary)" : "var(--color-on-surface-variant)" }}
                                >
                                    {label}
                                    {active && (
                                        <motion.div
                                            layoutId="nav-indicator"
                                            className="absolute left-0 right-0 bottom-0 h-[1.5px] bg-soft-teal"
                                            style={{ backgroundColor: "var(--color-soft-teal)" }}
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </motion.nav>

                    {/* CTA + mobile toggle */}
                    <div className="flex items-center gap-4">
                        <Link
                            href="/conversation"
                            className="hidden md:inline-flex btn-primary hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                            style={{ paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
                        >
                            Begin
                        </Link>
                        <motion.div
                            className="md:hidden"
                            initial={false}
                            animate={{ opacity: navLinksVisible ? 1 : 0, scale: navLinksVisible ? 1 : 0.92 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.35 }}
                            style={{ pointerEvents: navLinksVisible ? "auto" : "none" }}
                            aria-hidden={!navLinksVisible}
                            inert={!navLinksVisible ? true : undefined}
                        >
                        <button
                            className="transition-transform duration-300 hover:scale-110 active:scale-95"
                            aria-label="Open menu"
                            onClick={() => setMobileOpen((o) => !o)}
                            style={{ color: "var(--color-primary)" }}
                        >
                            <span className="material-symbols-outlined text-2xl">
                                {mobileOpen ? "close" : "menu"}
                            </span>
                        </button>
                        </motion.div>
                    </div>
                </div>

                {/* Mobile drawer */}
                <AnimatePresence>
                    {mobileOpen && navLinksVisible && (
                        <motion.nav
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="md:hidden flex flex-col gap-1 px-6 pb-6 overflow-hidden"
                            aria-label="Mobile navigation"
                            style={{ backgroundColor: "var(--color-surface)" }}
                        >
                            {navLinks.map(({ href, label }, i) => {
                                const active =
                                    href === "/home"
                                        ? pathname === "/home"
                                        : pathname.startsWith(href);
                                return (
                                    <motion.div
                                        key={href}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + i * 0.05, duration: 0.4 }}
                                    >
                                        <Link
                                            href={href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`nav-link py-3 block border-b${active ? " nav-link-active" : ""}`}
                                            style={{ borderColor: "var(--color-outline-variant)" }}
                                        >
                                            {label}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 + navLinks.length * 0.05, duration: 0.4 }}
                            >
                                <Link
                                    href="/conversation"
                                    onClick={() => setMobileOpen(false)}
                                    className="btn-primary mt-4 self-start inline-flex hover:-translate-y-1 hover:shadow-md transition-all duration-300"
                                >
                                    Begin
                                </Link>
                            </motion.div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </motion.header>
        </AnimatePresence>
    );
}
