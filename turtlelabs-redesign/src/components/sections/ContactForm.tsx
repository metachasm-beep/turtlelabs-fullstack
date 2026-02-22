"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, Mail, User, MessageSquare } from "lucide-react";

const formSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const inputClass =
    "w-full px-5 py-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] focus:border-[var(--color-forest)] focus:ring-2 focus:ring-[var(--color-forest)]/20 focus:outline-none transition-all placeholder:text-[var(--color-muted)]/60 text-[var(--color-foreground)] font-medium";

export function ContactForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isSubmitSuccessful },
    } = useForm<FormData>({ resolver: zodResolver(formSchema) });

    const onSubmit = async (data: FormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log(data);
    };

    return (
        <section className="py-32 px-6 w-full relative z-10" id="contact">
            {/* Background accent */}
            <div className="absolute inset-0 pointer-events-none -z-10 bg-gradient-to-br from-[var(--color-forest)]/5 via-transparent to-[var(--color-gold)]/5" />

            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                {/* Left: copy */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[var(--color-border)] bg-white/60 text-xs font-semibold uppercase tracking-widest text-[var(--color-forest)] mb-6">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-gold)]" />
                        Get in Touch
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
                        Let's Build Something <span className="gradient-text">Meaningful</span>.
                    </h2>
                    <p className="text-[var(--color-muted)] text-lg leading-relaxed mb-10">
                        Whether you're launching a sustainable brand, exploring R&D opportunities, or need a creative partner — we'd love to hear from you.
                    </p>

                    {/* contact chips */}
                    <div className="space-y-4">
                        {[
                            { icon: Mail, label: "hello@turtlelabs.co.in" },
                            { icon: MessageSquare, label: "@turtlelabs" },
                        ].map(({ icon: Icon, label }) => (
                            <div key={label} className="flex items-center gap-3 text-[var(--color-forest)] font-medium">
                                <div className="h-10 w-10 rounded-full bg-[var(--color-forest)]/10 flex items-center justify-center">
                                    <Icon size={16} />
                                </div>
                                <span>{label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Right: form */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                >
                    <GlassCard hoverEffect={false} className="p-8 md:p-10">
                        {isSubmitSuccessful ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12"
                            >
                                <CheckCircle2 className="h-16 w-16 mx-auto mb-4 text-[var(--color-forest)]" strokeWidth={1.5} />
                                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                <p className="text-[var(--color-muted)]">We'll get back to you as soon as possible.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-2">
                                        <User size={12} /> Name
                                    </label>
                                    <input {...register("name")} id="name" className={inputClass} placeholder="Your full name" />
                                    {errors.name && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.name.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="email" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-2">
                                        <Mail size={12} /> Email
                                    </label>
                                    <input {...register("email")} id="email" type="email" className={inputClass} placeholder="you@example.com" />
                                    {errors.email && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.email.message}</p>}
                                </div>

                                <div>
                                    <label htmlFor="message" className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)] mb-2">
                                        <MessageSquare size={12} /> Message
                                    </label>
                                    <textarea
                                        {...register("message")}
                                        id="message"
                                        rows={5}
                                        className={`${inputClass} resize-none`}
                                        placeholder="Tell us about your project or idea..."
                                    />
                                    {errors.message && <p className="text-red-500 text-xs mt-1.5 ml-1">{errors.message.message}</p>}
                                </div>

                                <Button type="submit" variant="primary" className="w-full justify-center" disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        "Sending..."
                                    ) : (
                                        <><Send size={15} /> Send Message</>
                                    )}
                                </Button>
                            </form>
                        )}
                    </GlassCard>
                </motion.div>
            </div>
        </section>
    );
}
