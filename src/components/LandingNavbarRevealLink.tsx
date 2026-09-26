"use client";

import { useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

export const NAVBAR_REVEAL_EVENT = "adore-life:reveal-navbar";
export const NAVBAR_REVEAL_STORAGE_KEY = "adore-life:navbar-revealed";

interface LandingNavbarRevealLinkProps {
    href: string;
    className?: string;
    children: ReactNode;
}

export default function LandingNavbarRevealLink({
    href,
    className,
    children,
}: LandingNavbarRevealLinkProps) {
    const router = useRouter();
    const prefersReducedMotion = useReducedMotion();

    const revealAndNavigate = (event: MouseEvent<HTMLAnchorElement>) => {
        if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        event.preventDefault();
        try {
            window.sessionStorage.setItem(NAVBAR_REVEAL_STORAGE_KEY, "true");
        } catch {
            // The reveal still works when storage is unavailable.
        }
        window.dispatchEvent(new Event(NAVBAR_REVEAL_EVENT));

        if (prefersReducedMotion) {
            router.push(href);
            return;
        }

        window.setTimeout(() => router.push(href), 520);
    };

    return (
        <Link href={href} className={className} onClick={revealAndNavigate}>
            {children}
        </Link>
    );
}
