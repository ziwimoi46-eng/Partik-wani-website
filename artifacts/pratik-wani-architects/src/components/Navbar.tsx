import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  activeSection: number;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const sections = ["Home", "About", "Services", "Process", "Why Us", "Portfolio", "Gallery", "Testimonials", "FAQ", "Appointment"];

  const scrollToSection = (index: number) => {
    setMobileMenuOpen(false);
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      const panels = document.querySelectorAll('.panel');
      if (panels[index]) {
        panels[index].scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const wrapper = document.querySelector('.md\\:flex.md\\:w-\\[1000vw\\]') || document.querySelector('.md\\:flex.md\\:w-\\[500vw\\]');
    if (!wrapper) return;
    
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: index * windowHeight,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 md:py-8 flex justify-between items-center mix-blend-difference"
      >
        <div 
          onClick={() => scrollToSection(0)}
          className="font-serif text-2xl font-bold tracking-widest text-primary cursor-pointer select-none"
        >
          PWA
        </div>

        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          <div className="flex gap-2 xl:gap-4">
            {sections.map((name, idx) => (
              <button
                key={name}
                onClick={() => scrollToSection(idx)}
                className="group relative px-2 py-1 flex items-center justify-center"
              >
                <div className="flex flex-col items-center">
                  <span 
                    className={`text-[10px] xl:text-xs tracking-[0.1em] xl:tracking-[0.15em] uppercase transition-colors duration-500 whitespace-nowrap ${
                      activeSection === idx ? 'text-primary' : 'text-white/40 group-hover:text-white/80'
                    }`}
                  >
                    {name}
                  </span>
                  {activeSection === idx && (
                    <motion.div 
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 h-[2px] w-full bg-primary"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:hidden">
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="text-white hover:text-primary transition-colors p-2"
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-[200] bg-[#0d0c0b] flex flex-col pt-24 px-8 pb-12 overflow-y-auto"
          >
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-primary transition-colors"
            >
              <X size={36} />
            </button>
            
            <div className="flex-1 flex flex-col justify-center gap-6">
              {sections.map((name, idx) => (
                <motion.button
                  key={name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => scrollToSection(idx)}
                  className={`text-left text-3xl font-serif tracking-wide transition-colors ${
                    activeSection === idx ? 'text-primary' : 'text-white/70 hover:text-white'
                  }`}
                >
                  {name}
                </motion.button>
              ))}
            </div>
            
            <div className="mt-8 border-t border-white/10 pt-8 flex flex-col gap-4">
              <a href="tel:08668805662" className="text-white/60 font-sans tracking-widest text-sm uppercase">Call: 08668805662</a>
              <a href="mailto:hello@pratikwaniarchitects.com" className="text-white/60 font-sans tracking-widest text-sm uppercase">Email Us</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
