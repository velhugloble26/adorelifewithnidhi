"use client";

import { AUTH_ME } from "@/utils/api";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const LOGO_URL = "/website_logo.png";

export default function Footer() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        let active = true;

        fetch(AUTH_ME, { cache: "no-store" })
            .then((response) => response.ok ? response.json() : null)
            .then((payload) => {
                if (!active) return;
                setIsAuthenticated(Boolean(payload?.success && payload?.data?.user));
            })
            .catch(() => setIsAuthenticated(false));

        return () => {
            active = false;
        };
    }, []);

    const bookingHref = isAuthenticated ? "/my-bookings" : "/login?redirect=/my-bookings";

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

                {/* Copyright */}
                <p
                    className="text-body-md text-center md:text-right"
                    style={{ color: "var(--color-on-surface)" }}
                >
                    © Adore Life. Because everyone deserves to be understood.
                </p>

                {/* Footer action */}
                <motion.div whileHover={{ y: -2 }} className="flex items-center justify-center">
                    <Link
                        href={bookingHref}
                        className="btn-primary hover:shadow-lg transition-shadow duration-300"
                        style={{ paddingTop: "0.7rem", paddingBottom: "0.7rem" }}
                    >
                        My Bookings
                    </Link>
                </motion.div>
            </motion.div>
        </footer>
    );
}
