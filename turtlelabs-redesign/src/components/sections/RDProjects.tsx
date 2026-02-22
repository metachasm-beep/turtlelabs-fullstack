"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Apple, Droplet, Home, BookOpen, Briefcase, Zap, Loader2 } from "lucide-react";

type Category = "FOOD" | "WATER" | "SHELTER" | "EDUCATION" | "WORK" | "ENERGY";
type Status = "PLANNING" | "ACTIVE" | "COMPLETED";

interface Project {
    id: string;
    title: string;
    description: string;
    category: Category;
    status: Status;
}

const categoryIcons: Record<Category, any> = {
    FOOD: Apple,
    WATER: Droplet,
    SHELTER: Home,
    EDUCATION: BookOpen,
    WORK: Briefcase,
    ENERGY: Zap,
};

const categoryColors: Record<Category, string> = {
    FOOD: "text-[#2d6045] bg-[#2d6045]/10",
    WATER: "text-[#1e5799] bg-[#1e5799]/10",
    SHELTER: "text-[#b5651d] bg-[#b5651d]/10",
    EDUCATION: "text-[#6b3fa0] bg-[#6b3fa0]/10",
    WORK: "text-[#1a3d2b] bg-[#1a3d2b]/10",
    ENERGY: "text-[#c8a96e] bg-[#c8a96e]/15",
};

const statusColors: Record<Status, string> = {
    PLANNING: "bg-[var(--color-gold-light)] text-[var(--color-forest)] border border-[var(--color-gold)]/40",
    ACTIVE: "bg-[var(--color-forest-light)] text-[var(--color-forest)] border border-[var(--color-forest)]/30",
    COMPLETED: "bg-[#ede9f6] text-[#6b3fa0] border border-[#6b3fa0]/30",
};

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const item: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function RDProjects() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                // Fetch all endpoints concurrently
                const endpoints = ['food', 'water', 'shelter', 'education', 'work', 'energy'];
                const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:3001';
                const responses = await Promise.all(
                    endpoints.map(ep => fetch(`${baseUrl}/api/${ep}`).catch(() => null))
                );

                const data = await Promise.all(
                    responses.map(res => (res && res.ok ? res.json() : []))
                );

                // Flatten and set projects
                const allProjects = data.flat();
                setProjects(allProjects);
            } catch (error) {
                console.error("Failed to fetch projects:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    return (
        <section className="py-32 px-6 w-full max-w-7xl mx-auto relative z-10" id="rd-projects">
            <div className="text-center mb-20 md:mb-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-white/60 text-xs font-semibold uppercase tracking-widest text-[var(--color-forest)] mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                        Research & Development
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-foreground)] mb-4">
                        Core <span className="gradient-text">Initiatives</span>
                    </h2>
                    <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
                        Live data from our systems driving sustainable innovation across six fundamental human needs.
                    </p>
                </motion.div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                    <Loader2 className="h-10 w-10 animate-spin mb-4" />
                    <p className="tracking-widest text-sm uppercase">Syncing with Core Systems...</p>
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-20 text-[var(--color-foreground)]/50">
                    No active initiatives found. Ensure backend systems are online.
                </div>
            ) : (
                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {projects.map((project, index) => {
                        const Icon = categoryIcons[project.category] || Apple;
                        return (
                            <motion.div key={project.id || index} variants={item} className="h-full">
                                <GlassCard className="h-full p-8 flex flex-col justify-between group hover:border-[var(--color-accent)]/30 transition-colors duration-500 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500 transform translate-x-4 -translate-y-4 group-hover:scale-110">
                                        <Icon size={120} />
                                    </div>

                                    <div>
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${categoryColors[project.category]}`}>
                                                <Icon size={24} strokeWidth={1.5} />
                                            </div>
                                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${statusColors[project.status]}`}>
                                                {project.status}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-semibold mb-3 pr-8">{project.title}</h3>
                                        <p className="text-[var(--color-foreground)]/70 text-sm leading-relaxed mb-6">
                                            {project.description}
                                        </p>
                                    </div>

                                    <div className="text-xs font-bold tracking-widest text-[var(--color-muted)] mt-auto pt-5 border-t border-[var(--color-border)] flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                                        {project.category}
                                    </div>
                                </GlassCard>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </section>
    );
}
