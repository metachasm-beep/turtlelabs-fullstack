"use client";

import { useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, ContactShadows, PresentationControls, MeshTransmissionMaterial } from "@react-three/drei";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import * as THREE from "three";

// ─── Component: 3D Logo Mark ────────────────────────────────────────────────
// Instead of complex SVG extrusion, we build a 3D geometric interpretation
// that matches the "turtle shell" logic.
function LogoMark3D({ color, accentColor }: { color: string; accentColor: string }) {
    const groupRef = useRef<THREE.Group>(null);

    return (
        <group ref={groupRef}>
            {/* The Essence of the Shell - Abstract Glass Sphere */}
            <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[1.1, 64, 64]} />
                <MeshTransmissionMaterial
                    backside
                    thickness={1}
                    samples={10}
                    transmission={0.97}
                    clearcoat={1}
                    clearcoatRoughness={0.02}
                    ior={1.2}
                    chromaticAberration={0.05}
                    color={color}
                    attenuationDistance={1.2}
                    attenuationColor={color}
                />
            </mesh>

            {/* The 'Arc' - A Gold Wireframe Orbital */}
            <mesh position={[0, 0, 0]} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
                <torusGeometry args={[1.35, 0.015, 16, 100]} />
                <meshStandardMaterial
                    color={accentColor}
                    metalness={1}
                    roughness={0.1}
                    emissive={accentColor}
                    emissiveIntensity={0.5}
                />
            </mesh>

            {/* A Secondary Emerald Accent Circle */}
            <mesh position={[0, 0, 0]} rotation={[-Math.PI / 3, 0, 0]}>
                <torusGeometry args={[1.25, 0.01, 16, 100]} />
                <meshStandardMaterial
                    color={color}
                    metalness={1}
                    roughness={0.1}
                    opacity={0.6}
                    transparent
                />
            </mesh>
        </group>
    );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export function BrandLab() {
    const [mode, setMode] = useState<"dark" | "light">("dark");

    const theme = {
        dark: {
            bg: "#0d0d0f",
            text: "#ffffff",
            subtext: "#7a9b83",
            card: "rgba(255, 255, 255, 0.03)",
            accent: "#c8a96e",
            primary: "#1a3d2b",
        },
        light: {
            bg: "#f4f7f4",
            text: "#1a3d2b",
            subtext: "#5c7a67",
            card: "rgba(26, 61, 43, 0.03)",
            accent: "#c8a96e",
            primary: "#2d6045",
        }
    }[mode];

    return (
        <section className="py-32 px-6 w-full max-w-7xl mx-auto relative z-10" id="brand-lab">
            <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8">
                <div>
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-white/60 text-xs font-semibold uppercase tracking-widest text-[var(--color-forest)] mb-4">
                        Brand Identity
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                        Design <span className="gradient-text">Laboratory</span>
                    </h2>
                </div>

                <div className="flex bg-[var(--color-surface)] p-1 rounded-full border border-[var(--color-border)] shadow-inner">
                    <button
                        onClick={() => setMode("dark")}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === "dark" ? "bg-[var(--color-forest)] text-white shadow-md" : "text-[var(--color-muted)] hover:text-[var(--color-forest)]"}`}
                    >
                        Forest Dark
                    </button>
                    <button
                        onClick={() => setMode("light")}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${mode === "light" ? "bg-[var(--color-forest)] text-white shadow-md" : "text-[var(--color-muted)] hover:text-[var(--color-forest)]"}`}
                    >
                        Sage Light
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* 3D LOGO VIEWPORT */}
                <div
                    className="h-[500px] rounded-3xl overflow-hidden relative border transition-colors duration-700"
                    style={{ backgroundColor: theme.bg, borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(26,61,43,0.1)" }}
                >
                    <div className="absolute top-6 left-6 z-10">
                        <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: theme.subtext }}>3D Mark Rendering</p>
                    </div>

                    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                        <ambientLight intensity={0.5} />
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                        <pointLight position={[-10, -10, -10]} intensity={0.5} color={theme.accent} />

                        <PresentationControls
                            global
                            snap
                            rotation={[0, 0.3, 0]}
                            polar={[-Math.PI / 3, Math.PI / 3]}
                            azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
                        >
                            <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                                <LogoMark3D color={theme.primary} accentColor={theme.accent} />
                            </Float>
                        </PresentationControls>

                        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={10} blur={2} far={4.5} />
                        <Environment preset="city" />
                    </Canvas>

                    <div className="absolute bottom-6 right-6">
                        <p className="text-[10px] font-mono opacity-40 uppercase" style={{ color: theme.text }}>Drag to rotate mark</p>
                    </div>
                </div>

                {/* TYPOGRAPHY & SYSTEM SPEC */}
                <div
                    className="rounded-3xl p-8 transition-all duration-700 flex flex-col justify-between border"
                    style={{ backgroundColor: theme.bg, borderColor: mode === "dark" ? "rgba(255,255,255,0.1)" : "rgba(26,61,43,0.1)" }}
                >
                    <div className="space-y-12">
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-6" style={{ color: theme.subtext }}>Typography Hierarchy</p>
                            <h1 className="text-5xl font-extrabold leading-tight tracking-tight mb-4" style={{ color: theme.text }}>
                                The Future is <span className="gradient-text">Sustainable</span>.
                            </h1>
                            <p className="text-lg leading-relaxed max-w-md" style={{ color: theme.subtext }}>
                                We bridge the gap between human needs and ecological preservation through purpose-led R&D and design.
                            </p>
                        </div>

                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] mb-4" style={{ color: theme.subtext }}>Colour Tokens</p>
                            <div className="flex gap-4">
                                {[theme.primary, theme.accent, theme.subtext, theme.bg, theme.text].map((c, i) => (
                                    <div key={i} className="group relative">
                                        <div
                                            className="h-12 w-12 rounded-full border border-black/5 shadow-sm transition-transform group-hover:scale-110"
                                            style={{ backgroundColor: c }}
                                        />
                                        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[8px] font-mono">
                                            {c.toUpperCase()}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-12 border-t border-black/5 mt-12">
                        <div className="flex items-center justify-between">
                            <p className="text-[10px] font-mono uppercase opacity-50" style={{ color: theme.text }}>System: Outfit / DM Sans</p>
                            <div className="flex gap-4">
                                <div className="h-1 w-8 rounded-full" style={{ backgroundColor: theme.primary }} />
                                <div className="h-1 w-8 rounded-full" style={{ backgroundColor: theme.accent }} />
                                <div className="h-1 w-8 rounded-full opacity-20" style={{ backgroundColor: theme.text }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
