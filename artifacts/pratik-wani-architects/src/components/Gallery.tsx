import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

const galleryImages = [
  { id: 1, src: img1, categories: ["Residential", "Commercial"], title: "Courtyard Exterior" },
  { id: 2, src: img2, categories: ["Bedrooms"], title: "Master Bedroom" },
  { id: 3, src: img3, categories: ["Living Rooms"], title: "Sun Mural Living Area" },
  { id: 4, src: img4, categories: ["Interior Design"], title: "Modern Dining Space" },
  { id: 5, src: img5, categories: ["Bedrooms"], title: "Green Accent Bedroom" },
  { id: 6, src: img6, categories: ["Bedrooms"], title: "Luxury Round Bed Suite" },
  { id: 7, src: img7, categories: ["Bedrooms"], title: "Blue Accent Bedroom" },
  { id: 8, src: img8, categories: ["Interior Design", "Residential"], title: "Golden Chandelier Space" },
  { id: 9, src: img9, categories: ["Residential", "Villas"], title: "Building Exterior Night" },
  { id: 10, src: img10, categories: ["Villas", "Residential"], title: "Garden Terrace" },
  { id: 11, src: img11, categories: ["Living Rooms", "Office Interiors"], title: "Contemporary TV Unit" },
  { id: 12, src: img12, categories: ["Interior Design"], title: "Monstera Dining Wall" },
  { id: 13, src: img13, categories: ["Modular Kitchen"], title: "Premium Modular Kitchen" },
];

const categories = ["All", "Residential", "Commercial", "Villas", "Interior Design", "Modular Kitchen", "Bedrooms", "Living Rooms", "Office Interiors"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = activeCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(img => img.categories.includes(activeCategory));

  useEffect(() => {
    const interval = setInterval(() => {
      if (hoveredIndex === null && lightboxIndex === null) {
        setFeaturedIndex(prev => (prev + 1) % filteredImages.length);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [filteredImages.length, hoveredIndex, lightboxIndex]);

  useEffect(() => {
    setFeaturedIndex(0);
  }, [activeCategory]);

  const displayedFeature = hoveredIndex !== null ? hoveredIndex : featuredIndex;
  const featuredImage = filteredImages[displayedFeature] || filteredImages[0];

  return (
    <div className="relative w-full h-full bg-[#0d0c0b] flex flex-col justify-center px-8 md:px-20 py-16">
      <div className="w-full max-w-[1400px] mx-auto h-full flex flex-col gap-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-4">
          <div>
            <div className="flex items-center gap-3 text-primary/60 mb-2">
              <div className="h-[1px] w-3 bg-primary/60" />
              <span className="text-xs uppercase tracking-[0.2em] font-medium">Selected Works</span>
              <div className="h-[1px] w-3 bg-primary/60" />
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-foreground">Project Gallery</h2>
          </div>
          
          <div className="flex flex-wrap gap-2 justify-end">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 text-xs tracking-wider uppercase transition-colors rounded-sm border ${
                  activeCategory === cat 
                    ? "border-primary text-primary bg-primary/10" 
                    : "border-white/10 text-muted-foreground hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-0 flex flex-col md:flex-row gap-6">
          <div className="md:w-2/5 relative rounded-sm overflow-hidden border border-white/10 group cursor-pointer"
               onClick={() => setLightboxIndex(displayedFeature)}>
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredImage?.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredImage?.src})` }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs text-primary tracking-widest uppercase mb-2 block">
                {featuredImage?.categories[0]}
              </span>
              <h3 className="text-2xl font-serif text-white">{featuredImage?.title}</h3>
            </div>
          </div>

          <div className="md:w-3/5 overflow-y-auto hide-scrollbar pr-2 pb-8">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              <AnimatePresence>
                {filteredImages.map((img, idx) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4 }}
                    className="aspect-square relative rounded-sm overflow-hidden cursor-pointer border border-white/5"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => setLightboxIndex(idx)}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-110"
                      style={{ backgroundImage: `url(${img.src})` }}
                    />
                    <div className={`absolute inset-0 bg-black/40 transition-opacity ${
                      displayedFeature === idx ? "opacity-0" : "hover:opacity-20"
                    }`} />
                    {displayedFeature === idx && (
                      <div className="absolute inset-0 border-2 border-primary" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4 md:p-12"
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white z-50 p-2"
              onClick={() => setLightboxIndex(null)}
            >
              <X size={32} />
            </button>
            
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-50 p-4"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! - 1 + filteredImages.length) % filteredImages.length); }}
            >
              <ChevronLeft size={48} />
            </button>
            
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-50 p-4"
              onClick={(e) => { e.stopPropagation(); setLightboxIndex((prev) => (prev! + 1) % filteredImages.length); }}
            >
              <ChevronRight size={48} />
            </button>

            <div className="relative max-w-6xl max-h-full w-full h-full flex flex-col items-center justify-center">
              <motion.img 
                key={lightboxIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={filteredImages[lightboxIndex].src} 
                className="max-w-full max-h-[85vh] object-contain rounded-sm"
                alt={filteredImages[lightboxIndex].title}
              />
              <div className="mt-6 text-center">
                <h3 className="text-2xl font-serif text-white mb-2">{filteredImages[lightboxIndex].title}</h3>
                <span className="text-primary text-sm uppercase tracking-widest">
                  {filteredImages[lightboxIndex].categories.join(" • ")}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
