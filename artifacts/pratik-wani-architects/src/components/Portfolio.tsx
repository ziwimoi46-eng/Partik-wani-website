import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import img1 from "@assets/Screenshot_20260627-172950_Maps_1782562014958.jpg";
import img2 from "@assets/Screenshot_20260627-172953_Maps_1782562014930.jpg";
import img3 from "@assets/Screenshot_20260627-172957_Maps_1782562014909.jpg";
import img4 from "@assets/Screenshot_20260627-173004_Maps_1782562014882.jpg";
import img5 from "@assets/Screenshot_20260627-173007_Maps_1782562014858.jpg";
import img6 from "@assets/Screenshot_20260627-173012_Maps_1782562014833.jpg";
import img7 from "@assets/Screenshot_20260627-173016_Maps_1782562014819.jpg";
import img8 from "@assets/Screenshot_20260627-173023_Maps_1782562014807.jpg";
import img9 from "@assets/Screenshot_20260627-173038_Maps_1782562014793.jpg";
import img10 from "@assets/Screenshot_20260627-173048_Maps_1782562014781.jpg";
import img11 from "@assets/Screenshot_20260627-173053_Maps_1782562014761.jpg";
import img12 from "@assets/Screenshot_20260627-173100_Maps_1782562014737.jpg";
import img13 from "@assets/Screenshot_20260627-173108_Maps_1782562014677.jpg";

const portfolioItems = [
  { src: img4, type: "Modern Dining Space", span: "col-span-2 row-span-2" },
  { src: img3, type: "Sun Mural Living Room", span: "col-span-1 row-span-1" },
  { src: img8, type: "Golden Chandelier", span: "col-span-1 row-span-1" },
  { src: img9, type: "Building Exterior", span: "col-span-1 row-span-2" },
  { src: img7, type: "Blue Accent Bedroom", span: "col-span-1 row-span-1" },
  { src: img13, type: "Modular Kitchen", span: "col-span-2 row-span-1" },
  { src: img2, type: "Memory Wall Bedroom", span: "col-span-1 row-span-2" },
  { src: img10, type: "Garden Terrace", span: "col-span-1 row-span-1" },
  { src: img5, type: "Luxury Bedroom", span: "col-span-1 row-span-1" },
  { src: img6, type: "Round Bed Suite", span: "col-span-1 row-span-1" },
  { src: img11, type: "Contemporary TV Unit", span: "col-span-1 row-span-1" },
  { src: img12, type: "Monstera Dining Wall", span: "col-span-1 row-span-1" },
  { src: img1, type: "Courtyard Exterior", span: "col-span-1 row-span-1" },
];

export default function Portfolio() {
  const [selected, setSelected] = useState<number | null>(null);
  const touchStartX = useRef(0);

  return (
    <div className="relative w-full h-full bg-background flex flex-col overflow-hidden">
      <div className="flex flex-col h-full pt-20 md:pt-22 pb-4 px-4 md:px-10 lg:px-14 xl:px-18 max-w-[1500px] mx-auto w-full">

        {/* Header */}
        <div className="flex-shrink-0 mb-3 md:mb-4">
          <div className="flex items-center gap-3 text-primary/70 mb-2">
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Featured Works</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
            Selected <span className="text-primary italic">Projects</span>
          </h2>
        </div>

        {/* Bento grid */}
        <div className="flex-1 min-h-0 overflow-y-auto hide-scrollbar">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 md:gap-3 auto-rows-[100px] md:auto-rows-[130px] lg:auto-rows-[150px] pb-4">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: index * 0.04 }}
                onClick={() => setSelected(index)}
                className={`relative group overflow-hidden cursor-pointer ${item.span}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                  style={{ backgroundImage: `url(${item.src})` }}
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute inset-0 p-4 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                  <div className="w-6 h-px bg-primary mb-2" />
                  <h4 className="text-white font-serif text-sm md:text-base leading-snug">{item.type}</h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/96 flex items-center justify-center"
            onClick={() => setSelected(null)}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const dx = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(dx) > 50) {
                setSelected((p) => dx > 0
                  ? (p! + 1) % portfolioItems.length
                  : (p! - 1 + portfolioItems.length) % portfolioItems.length);
              }
            }}
          >
            <button
              className="absolute top-5 right-5 text-white/60 hover:text-white p-2 z-50"
              onClick={() => setSelected(null)}
            >
              <X size={26} />
            </button>
            <button
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 z-50"
              onClick={(e) => { e.stopPropagation(); setSelected((p) => (p! - 1 + portfolioItems.length) % portfolioItems.length); }}
            >
              <ChevronLeft size={34} />
            </button>
            <button
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 z-50"
              onClick={(e) => { e.stopPropagation(); setSelected((p) => (p! + 1) % portfolioItems.length); }}
            >
              <ChevronRight size={34} />
            </button>
            <div
              className="relative max-w-5xl w-full mx-10 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selected}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={portfolioItems[selected].src}
                alt={portfolioItems[selected].type}
                className="max-w-full max-h-[78vh] object-contain rounded-sm shadow-2xl"
              />
              <div className="mt-5 text-center">
                <h3 className="text-lg font-serif text-white mb-1">{portfolioItems[selected].type}</h3>
                <span className="text-primary/70 text-xs uppercase tracking-widest">
                  {`${selected + 1} / ${portfolioItems.length}`}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
