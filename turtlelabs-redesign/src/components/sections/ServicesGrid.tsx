"use client";

import { motion, Variants } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { PenTool, Megaphone, MonitorSmartphone, Package, Printer, Video, Camera, Contact } from "lucide-react";

const services = [
    {
        title: "Branding & Logo",
        icon: PenTool,
        description: "Research, strategy, and execution for natural and sustainable businesses.",
        tag: "Identity",
    },
    {
        title: "Digital Marketing",
        icon: Megaphone,
        description: "Increasing brand presence and connecting with audiences across channels.",
        tag: "Growth",
    },
    {
        title: "Web UI/UX",
        icon: MonitorSmartphone,
        description: "Designing intuitive web and mobile applications from first principles.",
        tag: "Digital",
    },
    {
        title: "Packaging Design",
        icon: Package,
        description: "Custom, sustainable packaging solutions tailored to product and industry.",
        tag: "Print",
    },
    {
        title: "Printing Solutions",
        icon: Printer,
        description: "Designs that communicate your brand's unique selling proposition at scale.",
        tag: "Print",
    },
    {
        title: "Videography",
        icon: Video,
        description: "Conceptual high-definition video production and storytelling.",
        tag: "Media",
    },
    {
        title: "Photography",
        icon: Camera,
        description: "Professional brand, product, and event photography that converts.",
        tag: "Media",
    },
    {
        title: "Digital Business Cards",
        icon: Contact,
        description: "Modern, touch-free NFC contact sharing for forward-thinking professionals.",
        tag: "Tech",
    },
];

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 22 } },
};

export function ServicesGrid() {
    return (
        <section className="py-32 px-6 w-full max-w-7xl mx-auto relative z-10" id="services">

            {/* Section header */}
            <div className="text-center mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-white/60 text-xs font-semibold uppercase tracking-widest text-[var(--color-forest)] mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                        What We Do
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[var(--color-foreground)] mb-4">
                        Core <span className="gradient-text">Services</span>
                    </h2>
                    <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
                        Everything you need to take your brand to the next level, delivered with excellence and precision.
                    </p>
                </motion.div>
            </div>

            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
                {services.map((service, index) => (
                    <motion.div key={index} variants={item} className="h-full">
                        <GlassCard className="h-full p-7 flex flex-col gap-5 group">
                            {/* Icon */}
                            <div className="flex items-start justify-between">
                                <div className="h-11 w-11 rounded-xl bg-[var(--color-forest)]/10 flex items-center justify-center text-[var(--color-forest)] group-hover:bg-[var(--color-forest)] group-hover:text-white transition-colors duration-300">
                                    <service.icon size={20} strokeWidth={1.5} />
                                </div>
                                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[var(--color-gold-light)] text-[var(--color-forest)] uppercase tracking-widest">
                                    {service.tag}
                                </span>
                            </div>

                            <div>
                                <h3 className="text-base font-semibold mb-2 text-[var(--color-foreground)]">{service.title}</h3>
                                <p className="text-[var(--color-muted)] text-sm leading-relaxed">{service.description}</p>
                            </div>
                        </GlassCard>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
}
