import { useState, useEffect, useRef } from "react";
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
  { id: 2, src: img2, categories: ["Bedrooms"], title: "Master Bedroom Suite" },
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

const categories = ["All", "Residential", "Villas", "Interior Design", "Modular Kitchen", "Bedrooms", "Living Rooms", "Office Interiors"];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const touchStartX = useRef(0);
  const thumbTouchStartX = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const filtered = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter((img) => img.categories.includes(activeCategory));

  const safeFeatured = Math.min(featuredIdx, filtered.length - 1);

  useEffect(() => {
    if (lightboxIdx !== null) return;
    intervalRef.current = setInterval(() => {
      setFeaturedIdx((p) => (p + 1) % filtered.length);
    }, 3500);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [filtered.length, lightboxIdx]);

  useEffect(() => { setFeaturedIdx(0); }, [activeCategory]);

  const featuredImage = filtered[safeFeatured];

  const prevFeatured = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setFeaturedIdx((p) => (p - 1 + filtered.length) % filtered.length);
  };
  const nextFeatured = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setFeaturedIdx((p) => (p + 1) % filtered.length);
  };

  return (
    <div className="relative w-full md:h-full min-h-screen bg-[#0d0c0b] flex flex-col overflow-hidden">
      <div className="relative z-10 flex flex-col pt-20 md:pt-22 pb-4 px-4 md:px-10 lg:px-16 xl:px-20 max-w-[1500px] mx-auto w-full md:h-full">

        {/* Header + category tabs */}
        <div className="flex-shrink-0 mb-3 md:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
            <div>
              <div className="flex items-center gap-3 text-primary/60 mb-1.5">
                <div className="h-px w-6 bg-primary/50" />
                <span className="text-[9px] uppercase tracking-[0.25em] font-medium">Selected Works</span>
              </div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight">
                Project <span className="text-primary italic">Gallery</span>
              </h2>
            </div>

            {/* Category pills */}
            <div className="flex gap-1.5 overflow-x-auto hide-scrollbar pb-1 sm:flex-wrap sm:justify-end flex-shrink-0 max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 text-[10px] tracking-wider uppercase whitespace-nowrap border transition-all flex-shrink-0 ${
                    activeCategory === cat
                      ? "border-primary text-primary bg-primary/10"
                      : "border-white/10 text-muted-foreground/70 hover:border-white/30 hover:text-white/80"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main layout: stacks on mobile, side-by-side on desktop */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 md:flex-1 md:min-h-0">

          {/* Featured image */}
          <div
            className="relative overflow-hidden cursor-pointer group flex-shrink-0 h-56 sm:h-72 md:h-auto md:w-[42%]"
            onClick={() => setLightboxIdx(safeFeatured)}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const dx = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(dx) > 40) dx > 0 ? nextFeatured() : prevFeatured();
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={featuredImage?.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.55 }}
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${featuredImage?.src})` }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

            <button
              onClick={(e) => { e.stopPropagation(); prevFeatured(); }}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-10"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextFeatured(); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors z-10"
            >
              <ChevronRight size={22} />
            </button>

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
              <span className="text-[9px] text-primary tracking-widest uppercase mb-1 block">
                {featuredImage?.categories[0]}
              </span>
              <h3 className="text-lg md:text-xl font-serif text-white">{featuredImage?.title}</h3>
              <span className="text-[10px] text-white/40 mt-1 block">Click to enlarge</span>
            </div>

            <div className="absolute top-4 left-0 right-0 flex justify-center gap-1">
              {filtered.map((_, i) => (
                <div
                  key={i}
                  className={`h-0.5 rounded-full transition-all duration-400 ${
                    i === safeFeatured ? "w-4 bg-primary" : "w-1.5 bg-white/25"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail grid */}
          <div
            className="flex-1 md:min-h-0 overflow-y-auto hide-scrollbar"
            onTouchStart={(e) => { thumbTouchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const dx = thumbTouchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(dx) > 50) dx > 0 ? nextFeatured() : prevFeatured();
            }}
          >
            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-2 md:gap-3 pb-4">
              <AnimatePresence>
                {filtered.map((img, idx) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.35 }}
                    className="aspect-square relative overflow-hidden cursor-pointer group"
                    onClick={() => { setFeaturedIdx(idx); setLightboxIdx(idx); }}
                    onMouseEnter={() => setFeaturedIdx(idx)}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${img.src})` }}
                    />
                    <div
                      className={`absolute inset-0 transition-all duration-300 ${
                        idx === safeFeatured
                          ? "ring-2 ring-primary ring-inset"
                          : "bg-black/30 group-hover:bg-black/10"
                      }`}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/70 to-transparent">
                      <span className="text-[8px] text-white uppercase tracking-wider line-clamp-1">{img.title}</span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] bg-black/96 flex items-center justify-center"
            onClick={() => setLightboxIdx(null)}
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const dx = touchStartX.current - e.changedTouches[0].clientX;
              if (Math.abs(dx) > 50) {
                setLightboxIdx((p) => dx > 0
                  ? (p! + 1) % filtered.length
                  : (p! - 1 + filtered.length) % filtered.length);
              }
            }}
          >
            <button
              className="absolute top-5 right-5 text-white/60 hover:text-white z-50 p-2"
              onClick={() => setLightboxIdx(null)}
            >
              <X size={28} />
            </button>
            <button
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-50 p-3"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => (p! - 1 + filtered.length) % filtered.length); }}
            >
              <ChevronLeft size={36} />
            </button>
            <button
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white z-50 p-3"
              onClick={(e) => { e.stopPropagation(); setLightboxIdx((p) => (p! + 1) % filtered.length); }}
            >
              <ChevronRight size={36} />
            </button>
            <div
              className="relative max-w-5xl w-full mx-8 flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={lightboxIdx}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                src={filtered[lightboxIdx].src}
                alt={filtered[lightboxIdx].title}
                className="max-w-full max-h-[78vh] object-contain rounded-sm shadow-2xl"
              />
              <div className="mt-5 text-center">
                <h3 className="text-xl font-serif text-white mb-1">{filtered[lightboxIdx].title}</h3>
                <span className="text-primary text-xs uppercase tracking-widest">
                  {filtered[lightboxIdx].categories.join(" · ")}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-4">
                {filtered.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIdx(i)}
                    className={`rounded-full transition-all ${
                      i === lightboxIdx ? "w-5 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
