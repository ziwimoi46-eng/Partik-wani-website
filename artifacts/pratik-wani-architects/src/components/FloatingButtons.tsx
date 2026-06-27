import { motion, AnimatePresence } from "framer-motion";
import { Phone, ArrowUp, MessageCircle } from "lucide-react";

interface FloatingButtonsProps {
  activeSection: number;
}

export default function FloatingButtons({ activeSection }: FloatingButtonsProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const panels = document.querySelectorAll(".panel");
    if (panels.length > 0) panels[0].scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-5 right-4 md:bottom-7 md:right-6 z-[100] flex flex-col items-center gap-3">
      {/* WhatsApp */}
      <motion.a
        href="https://wa.me/918668805662"
        target="_blank"
        rel="noreferrer"
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        className="w-12 h-12 md:w-13 md:h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg shadow-black/40 group relative"
      >
        <MessageCircle size={20} strokeWidth={2} />
        <span className="absolute right-full mr-3 bg-[#0d0c0b] text-white text-[10px] px-2.5 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-white/10 font-medium tracking-wide shadow-lg">
          Chat on WhatsApp
        </span>
      </motion.a>

      {/* Call */}
      <motion.a
        href="tel:08668805662"
        aria-label="Call us"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.4, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.93 }}
        className="w-12 h-12 md:w-13 md:h-13 rounded-full bg-primary text-[#0d0c0b] flex items-center justify-center shadow-lg shadow-black/40 group relative"
      >
        <Phone size={18} fill="currentColor" strokeWidth={0} />
        <span className="absolute right-full mr-3 bg-[#0d0c0b] text-white text-[10px] px-2.5 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-white/10 font-medium tracking-wide shadow-lg">
          Call Us
        </span>
      </motion.a>

      {/* Back to top */}
      <AnimatePresence>
        {activeSection > 0 && (
          <motion.button
            onClick={scrollToTop}
            aria-label="Back to top"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.93 }}
            className="w-12 h-12 md:w-13 md:h-13 rounded-full bg-[#0d0c0b] border border-primary/60 text-primary flex items-center justify-center shadow-lg shadow-black/40 group relative"
          >
            <ArrowUp size={18} />
            <span className="absolute right-full mr-3 bg-[#0d0c0b] text-white text-[10px] px-2.5 py-1.5 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity border border-white/10 font-medium tracking-wide shadow-lg">
              Back to Top
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
