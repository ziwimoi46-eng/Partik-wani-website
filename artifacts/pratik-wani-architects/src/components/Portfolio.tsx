import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
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
  { src: img4, type: "Living Room Design", colSpan: 2, rowSpan: 2 },
  { src: img3, type: "Monstera Dining Area", colSpan: 1, rowSpan: 1 },
  { src: img8, type: "Luxury Bedroom", colSpan: 1, rowSpan: 1 },
  { src: img6, type: "Garden Terrace", colSpan: 1, rowSpan: 2 },
  { src: img1, type: "Modern Kitchen", colSpan: 1, rowSpan: 1 },
  { src: img9, type: "Golden Chandelier", colSpan: 2, rowSpan: 1 },
  { src: img2, type: "Building Exterior Night", colSpan: 1, rowSpan: 2 },
  { src: img7, type: "Bedroom Interior", colSpan: 1, rowSpan: 1 },
  { src: img5, type: "Living Room", colSpan: 1, rowSpan: 1 },
  { src: img10, type: "Interior Detailing", colSpan: 1, rowSpan: 1 },
  { src: img11, type: "Space Planning", colSpan: 1, rowSpan: 1 },
  { src: img12, type: "Luxury Bath", colSpan: 1, rowSpan: 1 },
  { src: img13, type: "Exterior Details", colSpan: 1, rowSpan: 1 },
];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    // Parallax effect applied when scrolling horizontally
    if (containerRef.current) {
      const items = containerRef.current.querySelectorAll('.portfolio-image');
      gsap.fromTo(items, 
        { x: -50 },
        { 
          x: 50,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            containerAnimation: gsap.getById("horizontal-scroll"),
            start: "left right",
            end: "right left",
            scrub: true
          }
        }
      );
    }
  }, []);

  return (
    <div className="relative w-full h-full bg-background flex items-center p-6 md:p-12 overflow-hidden" ref={containerRef}>
      <div className="h-full w-full flex flex-col justify-center max-w-[90vw] mx-auto">
        <div className="mb-8 flex items-center gap-3 text-primary/80">
          <span className="text-sm uppercase tracking-[0.2em]">Featured Works</span>
          <div className="h-[1px] w-16 bg-primary/40" />
        </div>
        
        <div className="flex-1 overflow-y-auto pr-4 pb-12 w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 auto-rows-[150px] md:auto-rows-[200px]">
          {portfolioItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              onClick={() => setSelectedImage(index)}
              className="relative group overflow-hidden rounded-sm cursor-pointer"
              style={{
                gridColumn: `span ${item.colSpan}`,
                gridRow: `span ${item.rowSpan}`,
              }}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat portfolio-image transition-transform duration-1000 group-hover:scale-110"
                style={{ backgroundImage: `url(${item.src})` }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <div className="w-8 h-[1px] bg-primary mb-3" />
                <h4 className="text-white font-serif text-xl tracking-wide">{item.type}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-12"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-50 p-4"
              onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev! - 1 + portfolioItems.length) % portfolioItems.length); }}
            >
              <ChevronLeft size={48} />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-50 p-4"
              onClick={(e) => { e.stopPropagation(); setSelectedImage((prev) => (prev! + 1) % portfolioItems.length); }}
            >
              <ChevronRight size={48} />
            </button>

            <div className="relative max-w-6xl max-h-full w-full h-full flex flex-col items-center justify-center">
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={portfolioItems[selectedImage].src} 
                className="max-w-full max-h-[85vh] object-contain rounded-sm"
                alt={portfolioItems[selectedImage].type}
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-serif text-white mb-2">{portfolioItems[selectedImage].type}</h3>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
