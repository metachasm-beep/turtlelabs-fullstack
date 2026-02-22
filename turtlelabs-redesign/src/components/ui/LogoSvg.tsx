import React from "react";

export default function LogoSvg({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            fill="none"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            {/* Minimalist, Abstract Turtle Mark */}

            {/* Shell: An elegant, incomplete arc */}
            <path
                d="M20 70 C 20 20, 80 20, 80 70"
                stroke="var(--color-forest-mid)"
            />

            {/* Under-shell: A subtle base line */}
            <path
                d="M25 75 L 75 75"
                stroke="var(--color-forest)"
                opacity="0.5"
            />

            {/* Head: A clean small arc */}
            <path
                d="M85 60 C 95 60, 95 45, 85 45"
                stroke="var(--color-gold)"
            />

            {/* Fins: Minimalist taps */}
            <path d="M30 80 L 25 85" stroke="var(--color-forest)" />
            <path d="M70 80 L 75 85" stroke="var(--color-forest)" />
        </svg>
    );
}
