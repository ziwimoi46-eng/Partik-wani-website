import { motion } from "framer-motion";

interface NavbarProps {
  activeSection: number;
}

export default function Navbar({ activeSection }: NavbarProps) {
  const sections = ["Hero", "Philosophy", "Expertise", "Portfolio", "Contact"];

  const scrollToSection = (index: number) => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      const panels = document.querySelectorAll('.panel');
      if (panels[index]) {
        panels[index].scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    const wrapper = document.querySelector('.md\\:flex.md\\:w-\\[500vw\\]');
    if (!wrapper) return;
    
    // In horizontal scrolling setup, we scroll the window vertically
    const windowHeight = window.innerHeight;
    window.scrollTo({
      top: index * windowHeight,
      behavior: 'smooth'
    });
  };

  return (
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

      <div className="hidden md:flex items-center gap-8">
        <div className="flex gap-4">
          {sections.map((name, idx) => (
            <button
              key={name}
              onClick={() => scrollToSection(idx)}
              className="group relative px-2 py-1 flex items-center justify-center"
            >
              <div className="flex flex-col items-center">
                <span 
                  className={`text-xs tracking-[0.15em] uppercase transition-colors duration-500 ${
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

      <div className="md:hidden flex gap-2">
        {sections.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => scrollToSection(idx)}
            className="p-1"
          >
            <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              activeSection === idx ? 'bg-primary' : 'bg-white/20'
            }`} />
          </button>
        ))}
      </div>
    </motion.nav>
  );
}
