import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { RDProjects } from "@/components/sections/RDProjects";
import { BrandLab } from "@/components/sections/BrandLab";
import { ContactForm } from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center w-full">
      <HeroSection />
      <ServicesGrid />
      <RDProjects />
      <BrandLab />
      <ContactForm />

      <footer className="w-full border-t border-[var(--color-border)] mt-20">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[var(--color-muted)]">
            © {new Date().getFullYear()} <span className="font-semibold text-[var(--color-forest)]">Turtle Labs</span>. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs font-semibold uppercase tracking-widest text-[var(--color-muted)]">
            {["Food", "Water", "Shelter", "Education", "Work", "Energy"].map((s) => (
              <span key={s} className="hover:text-[var(--color-forest)] transition-colors cursor-default">{s}</span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}

