"use client";

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "none";

interface MotionProps {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
    delay?: number;
    direction?: Direction;
    amount?: number;
}

const offsets: Record<Direction, { x: number; y: number }> = {
    up: { x: 0, y: 32 },
    down: { x: 0, y: -32 },
    left: { x: 32, y: 0 },
    right: { x: -32, y: 0 },
    none: { x: 0, y: 0 },
};
// Premium ease curve
const ease = [0.16, 1, 0.3, 1] as const;

export function MotionReveal({
    children,
    className,
    style,
    delay = 0,
    direction = "up",
    amount = 0.2,
}: MotionProps) {
    return (
        <motion.div
            className={className}
            style={style}
            initial={{ opacity: 0, ...offsets[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount }}
            transition={{ duration: 0.9, delay, ease }}
        >
            {children}
        </motion.div>
    );
}

export function MotionSection({ children, ...props }: HTMLMotionProps<"section">) {
    return (
        <motion.section
            {...props}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1.2, ease }}
        >
            {children}
        </motion.section>
    );
}

const stagger: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const item: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease },
    },
};

export function MotionStagger({ children, className, style, amount = 0.15 }: MotionProps) {
    return (
        <motion.div
            className={className}
            style={style}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount }}
        >
            {children}
        </motion.div>
    );
}

export function MotionItem({ children, className, style }: Pick<MotionProps, "children" | "className" | "style">) {
    return <motion.div className={className} style={style} variants={item}>{children}</motion.div>;
}

export function MotionLift({ children, className, style }: Pick<MotionProps, "children" | "className" | "style">) {
    return (
        <motion.div
            className={className}
            style={style}
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ duration: 0.4, ease }}
        >
            {children}
        </motion.div>
    );
}

export function MotionText({
    children,
    className,
    style,
    delay = 0,
}: Omit<MotionProps, "direction" | "amount">) {
    return (
        <motion.div
            className={className}
            style={style}
            initial={{ opacity: 0, filter: "blur(4px)", y: 16 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay, ease }}
        >
            {children}
        </motion.div>
    );
}
