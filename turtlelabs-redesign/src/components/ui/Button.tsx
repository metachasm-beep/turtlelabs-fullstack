"use client";

import { ReactNode } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps extends HTMLMotionProps<"button"> {
    children: ReactNode;
    variant?: "primary" | "secondary" | "outline" | "gold";
    className?: string;
}

export function Button({ children, variant = "primary", className = "", ...props }: ButtonProps) {
    const base = "relative inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold tracking-wide rounded-full overflow-hidden transition-all focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants: Record<string, string> = {
        primary: "bg-[var(--color-forest)] text-white hover:bg-[var(--color-forest-mid)] focus:ring-[var(--color-forest)] shadow-md",
        secondary: "bg-[var(--color-surface)] text-[var(--color-foreground)] hover:bg-[var(--color-border)] focus:ring-[var(--color-border)]",
        outline: "bg-white/50 backdrop-blur border border-[var(--color-border)] text-[var(--color-forest)] hover:border-[var(--color-forest)] hover:bg-[var(--color-forest-light)]/40 focus:ring-[var(--color-forest)]",
        gold: "bg-[var(--color-gold)] text-[var(--color-forest)] hover:brightness-95 focus:ring-[var(--color-gold)] shadow-md",
    };

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className={`${base} ${variants[variant]} ${className}`}
            {...props}
        >
            <span className="relative z-10 flex items-center gap-2">{children}</span>
        </motion.button>
    );
}
