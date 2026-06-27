import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
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

const images = [img4, img3, img8, img9, img7, img13, img2, img10, img5, img6, img11, img12, img1];
const captions = [
  "Modern Dining Space", "Sun Mural Living Room", "Golden Chandelier", "Building Exterior",
  "Blue Accent Bedroom", "Modular Kitchen", "Memory Wall Bedroom", "Garden Terrace",
  "Luxury Bedroom", "Round Bed Suite", "Contemporary TV Unit", "Monstera Dining Wall", "Courtyard Exterior",
];

export default function Gallery() {
  const [featured, setFeatured] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <div className="relative w-full min-h-screen bg-[#0a0908] flex flex-col">
      <div className="flex flex-col pt-28 pb-16 px-5 md:px-10 lg:px-14 xl:px-18 max-w-[1500px] mx-auto w-full">
        {/* Header */}
        <div className="mb-5 md:mb-6">
          <div className="flex items-center gap-3 text-primary/60 mb-2">
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Visual Journey</span>
          </div>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
            Our <span className="text-primary italic">Gallery</span>
          </h2>
        </div>

        {/* Featured image */}
        <motion.div
          key={featured}
          initial={{ opacity: 0.6, scale: 0.99 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="relative rounded-sm overflow-hidden cursor-pointer mb-4 h-56 sm:h-72 md:h-[420px] lg:h-[520px]"
          onClick={() => setLightbox(featured)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{ backgroundImage: `url(${images[featured]})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/10" />
          <div className="absolute bottom-0 left-0 p-5 md:p-8">
            <div className="w-8 h-px bg-primary mb-2" />
            <h3 className="text-white font-serif text-lg md:text-2xl">{captions[featured]}</h3>
            <span className="text-primary/80 text-xs mt-1 block">{featured + 1} / {images.length}</span>
          </div>
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white text-xs uppercase tracking-wider border border-white/20 px-3 py-1.5 hover:border-white/60 transition-colors duration-300"
            onClick={(e) => { e.stopPropagation(); setLightbox(featured); }}
          >
            View Full
          </button>
        </motion.div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7 gap-1.5 md:gap-2">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.35 }}
              onClick={() => setFeatured(i)}
              className={`relative aspect-square overflow-hidden cursor-pointer transition-all duration-300 ${
                featured === i ? "ring-2 ring-primary ring-offset-1 ring-offset-[#0a0908]" : "opacity-55 hover:opacity-90"
              }`}
            >
              <div className="absolute inset-0 bg-cover bg-center hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url(${img})` }} />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/96 flex items-center justify-center"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-5 right-5 text-white/60 hover:text-white p-2 z-50" onClick={() => setLightbox(null)}>
              <X size={26} />
            </button>
            <button
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 z-50"
              onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! - 1 + images.length) % images.length); }}
            >
              <ChevronLeft size={34} />
            </button>
            <button
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white p-3 z-50"
              onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! + 1) % images.length); }}
            >
              <ChevronRight size={34} />
            </button>
            <div className="relative max-w-5xl w-full mx-10" onClick={(e) => e.stopPropagation()}>
              <motion.img
                key={lightbox}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={images[lightbox]}
                alt={captions[lightbox]}
                className="max-w-full max-h-[78vh] object-contain rounded-sm shadow-2xl mx-auto block"
              />
              <div className="mt-4 text-center">
                <h3 className="text-base font-serif text-white mb-1">{captions[lightbox]}</h3>
                <span className="text-primary/60 text-xs uppercase tracking-widest">{lightbox + 1} / {images.length}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
