"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
    children: ReactNode;
    className?: string;
    hoverEffect?: boolean;
}

export function GlassCard({ children, className = "", hoverEffect = true, ...props }: GlassCardProps) {
    return (
        <motion.div
            whileHover={hoverEffect ? { y: -4, scale: 1.005 } : {}}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className={`relative overflow-hidden rounded-2xl border border-[var(--color-border)] shadow-[var(--shadow-card)] bg-white/55 backdrop-blur-2xl ${className}`}
            {...props}
        >
            {/* inner shimmer gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-[var(--color-forest-light)]/10 pointer-events-none" />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
