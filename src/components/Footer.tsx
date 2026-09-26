"use client";

import { AUTH_ME, MY_BOOKINGS } from "@/utils/api";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import { PiWhatsappLogo } from "react-icons/pi";
import { LiaYoutube } from "react-icons/lia";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { useEffect, useState } from "react";

const LOGO_URL = "/website_logo.png";

const footerSocialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/", icon: FaInstagram },
    { label: "YouTube", href: "https://www.youtube.com/", icon: LiaYoutube },
    { label: "Facebook", href: "https://www.facebook.com/", icon: BsFacebook },
    { label: "Twitter", href: "https://twitter.com/", icon: BsTwitter },
    { label: "Call Adore Life", href: "tel:+917304490951", icon: Phone },
    { label: "Chat on WhatsApp", href: "https://wa.me/917304490951", icon: PiWhatsappLogo },
];

export default function Footer() {
    const [hasBookings, setHasBookings] = useState(false);

    useEffect(() => {
        let active = true;

        async function loadBookingState() {
            try {
                const authResponse = await fetch(AUTH_ME, { cache: "no-store" });
                const authPayload = authResponse.ok ? await authResponse.json() : null;
                if (!authPayload?.success || !authPayload?.data?.user) {
                    if (active) setHasBookings(false);
                    return;
                }

                const bookingsResponse = await fetch(MY_BOOKINGS, { cache: "no-store" });
                const bookingsPayload = bookingsResponse.ok ? await bookingsResponse.json() : null;
                if (active) {
                    setHasBookings(Boolean(bookingsPayload?.success && bookingsPayload?.data?.bookings?.length));
                }
            } catch {
                if (active) setHasBookings(false);
            }
        }

        loadBookingState();

        return () => {
            active = false;
        };
    }, []);

    const bookingHref = hasBookings ? "/my-bookings" : "/conversation";
    const bookingLabel = hasBookings ? "My Bookings" : "Begin";

    return (
        <footer
            className="w-full relative overflow-hidden"
            style={{ backgroundColor: "var(--color-surface-container-low)" }}
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col md:flex-row justify-between items-center gap-8 py-16 max-w-[1440px] mx-auto"
                style={{
                    paddingLeft: "clamp(1rem, 4vw, 4rem)",
                    paddingRight: "clamp(1rem, 4vw, 4rem)",
                }}
            >
                {/* Brand */}
                <Link href="/" aria-label="Adore Life – Home">
                    <Image
                        src={LOGO_URL}
                        alt="Adore Life"
                        width={1080}
                        height={897}
                        className="transition-transform duration-500 hover:scale-105 hover:opacity-80"
                        style={{ width: 180, height: "auto" }}
                        loading="lazy"
                    />
                </Link>

                {/* Footer navigation */}
                <div className="flex flex-col items-center gap-4 text-center">
                    <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3" aria-label="Footer navigation">
                        <Link className="nav-link" href="/blog">Blog</Link>
                        <Link className="nav-link" href="/gallery">Gallery</Link>
                    </nav>
                    <nav className="flex flex-wrap items-center justify-center gap-3" aria-label="Social media and contact links">
                        {footerSocialLinks.map(({ label, href, icon: Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                aria-label={label}
                                title={label}
                                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--color-outline-variant)] text-[var(--color-primary)] transition-all duration-300 hover:-translate-y-1 hover:border-[var(--color-soft-teal)] hover:bg-[var(--color-soft-teal)] hover:text-white hover:shadow-md"
                            >
                                <Icon size={22} aria-hidden="true" />
                            </a>
                        ))}
                    </nav>
                    <p className="text-body-md" style={{ color: "var(--color-on-surface)" }}>
                        © Adore Life. Because everyone deserves to be understood.
                    </p>
                </div>

                {/* Footer action */}
                <motion.div whileHover={{ y: -2 }} className="flex items-center justify-center">
                    <Link
                        href={bookingHref}
                        className="btn-primary hover:shadow-lg transition-shadow duration-300"
                        style={{ paddingTop: "0.7rem", paddingBottom: "0.7rem" }}
                    >
                        {bookingLabel}
                    </Link>
                </motion.div>
            </motion.div>
        </footer>
    );
}
