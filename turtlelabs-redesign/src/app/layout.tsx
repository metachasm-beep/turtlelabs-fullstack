import type { Metadata } from "next";
import LogoSvg from "@/components/ui/LogoSvg";
import "./globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Turtle Labs | Sustainable R&D Agency",
  description: "Turtle Labs builds purposeful brands and drives research & development for sustainable solutions across Food, Water, Shelter, Education, Work, and Energy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <header className="fixed top-0 w-full z-50 glass border-b border-[var(--color-border)]">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo mark + wordmark */}
            <a href="#" className="flex items-center gap-2.5 group">
              <LogoSvg className="h-10 w-auto" aria-label="Turtle Labs Logo" />
              <span className="font-bold text-lg tracking-tight text-[var(--color-foreground)] group-hover:text-[var(--color-forest-mid)] transition-colors">
                Turtle Labs
              </span>
            </a>

            {/* Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: "Work", href: "#" },
                { label: "Services", href: "#services" },
                { label: "Initiatives", href: "#rd-projects" },
                { label: "Contact", href: "#contact" },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm font-medium text-white/60 hover:text-white transition-colors duration-200 relative group"
                >
                  {label}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300 rounded-full" />
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
}
