"use client";

import { ReactLenis } from 'lenis/react';
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from 'react';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
    const pathname = usePathname();

    useEffect(() => {
        const resetScrollPosition = () => window.scrollTo(0, 0);

        resetScrollPosition();
        const frame = window.requestAnimationFrame(resetScrollPosition);

        return () => window.cancelAnimationFrame(frame);
    }, [pathname]);

    // Lenis options for smooth, premium feel
    return (
        <ReactLenis root options={{
            lerp: 0.1,
            duration: 1.2,
            smoothWheel: true
        }}>
            {children}
        </ReactLenis>
    );
}
