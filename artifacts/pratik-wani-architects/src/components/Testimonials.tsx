import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img3 from "@assets/Screenshot_20260627-172957_Maps_1782562014909.jpg";

const testimonials = [
  {
    quote: "Pratik Wani Architects transformed our 3BHK into a stunning work of art. Every corner was designed with intent. Truly world-class.",
    author: "Rajesh Mehta",
    location: "Aurangabad",
    rating: 5,
  },
  {
    quote: "We trusted them with our villa project and the result exceeded every expectation. The 3D visualization saved us so much time in decision making.",
    author: "Priya & Sunil Kulkarni",
    location: "Pune",
    rating: 5,
  },
  {
    quote: "Their modular kitchen design is the highlight of our home. Functional, beautiful, and built to last. Highly recommend!",
    author: "Anita Sharma",
    location: "Aurangabad",
    rating: 5,
  },
  {
    quote: "The team handled our commercial office interior with absolute professionalism. Delivered on time, within budget, with zero compromise on quality.",
    author: "Vikram Deshmukh",
    location: "Nashik",
    rating: 5,
  },
  {
    quote: "From concept to handover, the communication was flawless. They understood our lifestyle and designed around it. We feel at home every single day.",
    author: "Meera & Aditya Joshi",
    location: "Chhatrapati Sambhajinagar",
    rating: 4,
  },
  {
    quote: "The living room they designed for us has become the talking point for every guest. Creative, elegant, and perfectly personal.",
    author: "Sanjay Patil",
    location: "Latur",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef(0);

  useEffect(() => {
    const t = setInterval(() => setCurrent((p) => (p + 1) % testimonials.length), 5000);
    return () => clearInterval(t);
  }, []);

  const next = () => setCurrent((p) => (p + 1) % testimonials.length);
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative w-full h-full bg-[#0d0c0b] flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.05]"
        style={{ backgroundImage: `url(${img3})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0d0c0b]/80 via-transparent to-[#0d0c0b]/80" />

      <div
        className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center px-8 md:px-16 pt-20 pb-8 h-full justify-center"
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          const dx = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(dx) > 50) dx > 0 ? next() : prev();
        }}
      >
        {/* Rating */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 mb-6"
        >
          <span className="text-primary text-xs">★ ★ ★ ★ ★</span>
          <span className="text-xs text-white/80 tracking-wide">4.8 Google Rating · 27 Reviews</span>
        </motion.div>

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 text-primary/60 mb-4">
          <div className="h-px w-8 bg-primary/50" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Client Stories</span>
          <div className="h-px w-8 bg-primary/50" />
        </div>
        <h2 className="text-3xl md:text-4xl font-serif text-foreground mb-8">What Our Clients Say</h2>

        {/* Carousel */}
        <div className="relative w-full flex items-center justify-center min-h-[220px] md:min-h-[260px]">
          {/* Prev */}
          <button
            onClick={prev}
            className="absolute left-0 md:-left-4 p-2 text-white/40 hover:text-primary transition-colors z-10"
          >
            <ChevronLeft size={28} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="px-8 md:px-16 flex flex-col items-center text-center"
            >
              <div className="text-5xl text-primary/30 font-serif leading-none mb-3 select-none">"</div>
              <p className="text-lg md:text-xl lg:text-2xl font-serif text-white/90 leading-relaxed mb-6">
                {testimonials[current].quote}
              </p>
              <h4 className="text-base font-serif text-primary mb-1">{testimonials[current].author}</h4>
              <p className="text-xs text-muted-foreground/60 uppercase tracking-widest mb-3">
                {testimonials[current].location}
              </p>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`text-xs ${i < testimonials[current].rating ? "text-primary" : "text-white/20"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Next */}
          <button
            onClick={next}
            className="absolute right-0 md:-right-4 p-2 text-white/40 hover:text-primary transition-colors z-10"
          >
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2 mt-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`rounded-full transition-all duration-300 ${
                current === idx ? "w-6 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/25 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
