"use client";

import { ReactLenis, useLenis } from 'lenis/react';
import { ReactNode } from 'react';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
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
