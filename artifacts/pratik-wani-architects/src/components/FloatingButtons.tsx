import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, ArrowUp } from "lucide-react";

interface FloatingButtonsProps {
  activeSection: number;
}

export default function FloatingButtons({ activeSection }: FloatingButtonsProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const panels = document.querySelectorAll('.panel');
    if (panels.length > 0) {
      panels[0].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      <motion.a
        href="https://wa.me/918668805662"
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg group relative"
      >
        <MessageCircle size={24} />
        <div className="absolute right-full mr-4 bg-white text-black px-3 py-1.5 rounded-sm text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-medium tracking-wide">
          Chat on WhatsApp
        </div>
      </motion.a>

      <motion.a
        href="tel:08668805662"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-primary text-black flex items-center justify-center shadow-lg group relative"
      >
        <Phone size={22} fill="currentColor" />
        <div className="absolute right-full mr-4 bg-white text-black px-3 py-1.5 rounded-sm text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-medium tracking-wide">
          Call Us
        </div>
      </motion.a>

      <AnimatePresence>
        {activeSection > 0 && (
          <motion.button
            onClick={scrollToTop}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 rounded-full bg-[#0d0c0b] border border-primary text-primary flex items-center justify-center shadow-lg group relative mt-2"
          >
            <ArrowUp size={24} />
            <div className="absolute right-full mr-4 bg-white text-black px-3 py-1.5 rounded-sm text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity font-medium tracking-wide">
              Back to Top
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
