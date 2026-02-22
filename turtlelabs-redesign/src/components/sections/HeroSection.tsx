"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import * as THREE from "three";
import { ArrowRight } from "lucide-react";

// ─── Mouse-reactive torus knot ────────────────────────────────────────────────
function AnimatedTorusKnot({
    mouseRef,
}: {
    mouseRef: React.MutableRefObject<{ x: number; y: number }>;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!groupRef.current || !meshRef.current) return;
        const t = clock.getElapsedTime();

        // Gentle self-rotation
        meshRef.current.rotation.x = t * 0.18;
        meshRef.current.rotation.y = t * 0.28;

        // Subtle parallax tilt toward mouse
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            mouseRef.current.x * 0.35,
            0.03,
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x,
            -mouseRef.current.y * 0.25,
            0.03,
        );
    });

    return (
        <Float speed={1.2} rotationIntensity={0} floatIntensity={0.8}>
            <group ref={groupRef}>
                <mesh ref={meshRef}>
                    <torusKnotGeometry args={[1.1, 0.32, 200, 48]} />
                    <MeshDistortMaterial
                        color="#00a86b"
                        envMapIntensity={1.4}
                        clearcoat={1}
                        clearcoatRoughness={0.03}
                        metalness={0.95}
                        roughness={0.05}
                        distort={0.22}
                        speed={1.8}
                    />
                </mesh>
            </group>
        </Float>
    );
}

// ─── Luminance sampler: reads canvas pixel, reports to parent ─────────────────
function LuminanceSampler({ onLuminance }: { onLuminance: (lum: number) => void }) {
    const { gl, size } = useThree();
    const frame = useRef(0);
    const buf = useRef(new Uint8Array(4));
    const last = useRef(-1);

    useFrame(() => {
        if (++frame.current % 14 !== 0) return;
        const cx = Math.floor(size.width / 2);
        const cy = Math.floor(size.height / 2);

        // Correctly access the native WebGL context from the renderer
        const context = gl.getContext();
        if (context) {
            context.readPixels(
                cx,
                cy,
                1,
                1,
                context.RGBA,
                context.UNSIGNED_BYTE,
                buf.current
            );
        }

        const [r, g, b, a] = buf.current;

        // Alpha-composite against CSS background (#f4f7f4 = 244,247,244)
        const alpha = a / 255;
        const cr = r * alpha + 244 * (1 - alpha);
        const cg = g * alpha + 247 * (1 - alpha);
        const cb = b * alpha + 244 * (1 - alpha);
        const lum = Math.round(0.299 * cr + 0.587 * cg + 0.114 * cb);
        if (Math.abs(lum - last.current) > 8) {
            last.current = lum;
            onLuminance(lum);
        }
    });
    return null;
}

// ─── Scene ────────────────────────────────────────────────────────────────────
function Scene({
    mouseRef,
    onLuminance,
}: {
    mouseRef: React.MutableRefObject<{ x: number; y: number }>;
    onLuminance: (lum: number) => void;
}) {
    return (
        <>
            <ambientLight intensity={0.15} color="#d4e8d4" />
            {/* Key light: warm gold — mirrors the logo accent  */}
            <directionalLight position={[6, 6, 6]} intensity={0.6} color="#e8d4a0" />
            {/* Fill light: cool forest green from below */}
            <directionalLight position={[-5, -4, -3]} intensity={0.3} color="#2d6045" />
            {/* Rim light: white top-back */}
            <directionalLight position={[0, 8, -4]} intensity={0.2} color="#ffffff" />

            <AnimatedTorusKnot mouseRef={mouseRef} />
            <Environment preset="forest" />
            <LuminanceSampler onLuminance={onLuminance} />
        </>
    );
}

// ─── Stats ────────────────────────────────────────────────────────────────────
const STATS = [
    { value: "6", label: "Core Needs" },
    { value: "3+", label: "Years R&D" },
    { value: "40+", label: "Brands Launched" },
];

// ─── Hero ─────────────────────────────────────────────────────────────────────
export function HeroSection() {
    const mouseRef = useRef({ x: 0, y: 0 });
    const sectionRef = useRef<HTMLElement>(null);
    const [lightBg, setLightBg] = useState(true);
    const prevLight = useRef(true);

    // Normalised mouse tracking
    const handleMouseMove = useCallback((e: MouseEvent) => {
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        mouseRef.current = {
            x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
            y: -((e.clientY - rect.top) / rect.height - 0.5) * 2,
        };
    }, []);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        el.addEventListener("mousemove", handleMouseMove, { passive: true });
        return () => el.removeEventListener("mousemove", handleMouseMove);
    }, [handleMouseMove]);

    const onLuminance = useCallback((lum: number) => {
        const isLight = lum > 148;
        if (isLight !== prevLight.current) {
            prevLight.current = isLight;
            setLightBg(isLight);
        }
    }, []);

    // Reactive text tokens - ultra-slow 3000ms crossfade
    const tc = "transition-colors duration-[3000ms] ease-[cubic-bezier(0.4,0,0.2,1)]";
    const c1 = lightBg ? "text-[var(--color-foreground)]" : "text-[#f0f2f0]";
    const c2 = lightBg ? "text-[var(--color-muted)]" : "text-[#f0f2f0]/70";
    const bBg = lightBg
        ? "bg-white/50 border-[var(--color-border)] text-[var(--color-forest)]"
        : "bg-black/20 border-white/5 text-[#f0f2f0]";
    const sv = lightBg ? "text-[var(--color-forest)]" : "text-[#f0f2f0]";
    const sl = lightBg ? "text-[var(--color-muted)]" : "text-[#f0f2f0]/50";

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen w-full overflow-hidden flex items-center justify-center pt-20"
            style={{ background: "#ebf0eb" }}
        >
            {/* 3-D canvas */}
            <div className="absolute inset-0 z-0 opacity-85">
                <Canvas
                    camera={{ position: [0, 0, 5.5], fov: 44 }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        preserveDrawingBuffer: true,
                        toneMapping: THREE.ACESFilmicToneMapping,
                        toneMappingExposure: 0.7,  // Further dimmed exposure
                    }}
                    style={{ background: "transparent" }}
                    dpr={[1, 1.5]}
                >
                    <Scene mouseRef={mouseRef} onLuminance={onLuminance} />
                </Canvas>
            </div>

            {/* Vignette — softens edges, keeps centre transparent */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background: [
                        "radial-gradient(ellipse 65% 65% at 50% 50%, transparent 20%, var(--color-background) 100%)",
                    ].join(","),
                }}
            />

            {/* Bottom fade into next section */}
            <div className="absolute bottom-0 left-0 right-0 h-36 z-[1] pointer-events-none"
                style={{ background: "linear-gradient(to top, var(--color-background), transparent)" }} />

            {/* Hero copy */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 text-center flex flex-col items-center">

                {/* Eyebrow badge */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.55 }}
                    className={`mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-sm text-xs font-semibold uppercase tracking-widest shadow-sm ${bBg} ${tc}`}
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)] animate-pulse" />
                    Sustainable Brand &amp; R&amp;D Studio
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, delay: 0.1 }}
                    className={`text-[clamp(3rem,8vw,6.5rem)] font-extrabold leading-[1.05] tracking-tight mb-6 max-w-5xl ${c1} ${tc}`}
                >
                    <span className="gradient-text">Launch</span> Your Brand<br />
                    With <span className="gradient-text">Purpose</span>.
                </motion.h1>

                {/* Sub */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, delay: 0.25 }}
                    className={`text-lg md:text-xl mb-10 max-w-2xl leading-relaxed font-medium ${c2} ${tc}`}
                >
                    We build visually compelling brands for sustainable businesses, with a singular mission: protecting and enhancing the human condition.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 mb-20 pointer-events-auto"
                >
                    <a href="#contact">
                        <Button variant="primary">Book a Call <ArrowRight size={15} /></Button>
                    </a>
                    <a href="#services">
                        <Button variant="outline">View Services</Button>
                    </a>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.85, delay: 0.55 }}
                    className="flex gap-12 md:gap-24 pointer-events-auto"
                >
                    {STATS.map(({ value, label }) => (
                        <div key={label} className="text-center">
                            <p className={`text-3xl font-extrabold ${sv} ${tc}`}>{value}</p>
                            <p className={`text-xs font-semibold uppercase tracking-widest mt-1 ${sl} ${tc}`}>{label}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
