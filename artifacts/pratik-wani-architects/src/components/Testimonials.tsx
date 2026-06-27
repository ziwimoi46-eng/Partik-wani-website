import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img3 from "@assets/Screenshot_20260627-172957_Maps_1782562014909.jpg";

const testimonials = [
  {
    name: "Rahul Deshmukh",
    role: "Homeowner, Aurangabad",
    rating: 5,
    text: "Working with Pratik Wani Architects was an extraordinary experience. They transformed our bare apartment into a stunning, functional masterpiece. Every detail was thought through — from the lighting to the material palette.",
  },
  {
    name: "Priya Kulkarni",
    role: "Business Owner",
    rating: 5,
    text: "Our office redesign exceeded all expectations. Pratik and his team brought a level of professionalism and creativity that was truly impressive. The 3D renders helped us visualize the space perfectly before construction.",
  },
  {
    name: "Anand Joshi",
    role: "Villa Owner, Nashik",
    rating: 5,
    text: "The team completed our villa project on time and within budget — which is rare in this industry. Their attention to quality and their communication throughout the process were exceptional.",
  },
  {
    name: "Meera Patil",
    role: "Interior Enthusiast",
    rating: 5,
    text: "I was blown away by the transformation. Our living room and kitchen went from dull to absolutely breathtaking. I highly recommend PWA to anyone who wants a premium result without the usual headaches.",
  },
  {
    name: "Vikram Shah",
    role: "Property Developer",
    rating: 5,
    text: "We partnered with PWA for three commercial projects and each one was delivered with remarkable precision. Their elevation designs consistently impress our clients and help our properties sell faster.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const go = (dir: 1 | -1) => {
    setIsAutoPlaying(false);
    setCurrent((c) => (c + dir + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    timerRef.current = setInterval(() => setCurrent((c) => (c + 1) % testimonials.length), 5000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isAutoPlaying]);

  return (
    <div className="relative w-full min-h-screen bg-[#0d0c0b] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-cover bg-center opacity-15" style={{ backgroundImage: `url(${img3})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d0c0b]/90 via-[#0d0c0b]/70 to-[#0d0c0b]/90" />
      </div>

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center pt-28 pb-16 px-6 md:px-14 lg:px-20">
        <div className="flex items-center gap-3 text-primary/60 mb-3">
          <div className="h-px w-8 bg-primary/50" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Client Stories</span>
          <div className="h-px w-8 bg-primary/50" />
        </div>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-foreground text-center mb-10 md:mb-12">
          Words from Our <span className="text-primary italic">Clients</span>
        </h2>

        {/* Card */}
        <div className="relative w-full max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center text-center px-4 md:px-8"
            >
              {/* Stars */}
              <div className="flex text-primary gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <span key={i} className="text-base">★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="text-base md:text-lg lg:text-xl text-foreground/90 font-light leading-relaxed italic mb-8 max-w-2xl">
                &ldquo;{testimonials[current].text}&rdquo;
              </p>

              <div className="w-8 h-px bg-primary/50 mb-5" />

              {/* Author */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-sm md:text-base font-serif text-foreground">{testimonials[current].name}</span>
                <span className="text-xs text-primary/70 uppercase tracking-widest">{testimonials[current].role}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button onClick={() => go(-1)} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-10 text-white/40 hover:text-primary transition-colors p-2">
            <ChevronLeft size={26} />
          </button>
          <button onClick={() => go(1)} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-10 text-white/40 hover:text-primary transition-colors p-2">
            <ChevronRight size={26} />
          </button>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => { setIsAutoPlaying(false); setCurrent(i); }}
              className={`rounded-full transition-all duration-300 ${
                i === current ? "w-5 h-1.5 bg-primary" : "w-1.5 h-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Google badge */}
        <div className="mt-8 md:mt-10 flex items-center gap-3 border border-white/10 px-5 py-3 rounded-full bg-white/5 backdrop-blur-sm">
          <div className="flex text-primary gap-0.5">
            {[1,2,3,4,5].map((s) => <span key={s} className="text-xs">★</span>)}
          </div>
          <span className="text-xs text-muted-foreground font-light tracking-wide">
            4.8 Rating · 27 Reviews on Google Maps
          </span>
        </div>
      </div>
    </div>
  );
}
