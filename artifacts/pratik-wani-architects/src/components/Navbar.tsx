import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  activeSection: number;
}

const SECTION_COUNT = 10;

export default function Navbar({ activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const sections = [
    "Home", "About", "Services", "Process", "Why Us",
    "Portfolio", "Gallery", "Testimonials", "FAQ", "Appointment"
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (index: number) => {
    setMobileMenuOpen(false);
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      const panels = document.querySelectorAll(".panel");
      if (panels[index]) panels[index].scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Desktop: GSAP horizontal scroll — each section = 1 viewport-height of scroll
    const scrollPerSection = (SECTION_COUNT - 1) * window.innerWidth / (SECTION_COUNT - 1);
    window.scrollTo({ top: index * window.innerWidth, behavior: "smooth" });
  };

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className={`fixed top-0 left-0 right-0 z-[150] flex items-center justify-between px-5 md:px-10 lg:px-14 transition-all duration-500 ${
          scrolled || mobileMenuOpen
            ? "bg-[#0d0c0b]/95 backdrop-blur-md border-b border-white/8 py-4"
            : "bg-gradient-to-b from-[#0d0c0b]/80 to-transparent py-5 md:py-6"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollToSection(0)}
          className="font-serif text-xl md:text-2xl font-bold tracking-[0.2em] text-primary select-none shrink-0 hover:opacity-80 transition-opacity"
        >
          PWA
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2">
          {sections.map((name, idx) => (
            <button
              key={name}
              onClick={() => scrollToSection(idx)}
              className={`relative px-2 xl:px-3 py-2 text-[10px] xl:text-[11px] tracking-[0.12em] uppercase whitespace-nowrap transition-colors duration-300 ${
                activeSection === idx
                  ? "text-primary"
                  : "text-white/50 hover:text-white/90"
              }`}
            >
              {name}
              {activeSection === idx && (
                <motion.div
                  layoutId="nav-underline"
                  className="absolute bottom-0 left-2 right-2 h-[1.5px] bg-primary rounded-full"
                  transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open menu"
          className="lg:hidden p-2 text-white/80 hover:text-primary transition-colors"
        >
          <Menu size={26} />
        </button>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[200] bg-[#0d0c0b] flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <span className="font-serif text-2xl font-bold tracking-[0.2em] text-primary">PWA</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white/60 hover:text-white transition-colors"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pt-8 pb-12 flex flex-col gap-2">
              {sections.map((name, idx) => (
                <motion.button
                  key={name}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  onClick={() => scrollToSection(idx)}
                  className={`text-left py-4 border-b border-white/5 text-2xl font-serif tracking-wide transition-colors flex items-center justify-between ${
                    activeSection === idx ? "text-primary" : "text-white/70 hover:text-white"
                  }`}
                >
                  <span>{name}</span>
                  {activeSection === idx && <span className="text-primary text-sm">●</span>}
                </motion.button>
              ))}
            </div>

            <div className="px-6 py-6 border-t border-white/8 flex flex-col gap-3">
              <a
                href="tel:08668805662"
                className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors text-sm"
              >
                <span className="text-primary">✆</span> 08668805662
              </a>
              <a
                href="https://wa.me/918668805662"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-white/70 hover:text-primary transition-colors text-sm"
              >
                <span className="text-[#25D366]">●</span> WhatsApp Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
