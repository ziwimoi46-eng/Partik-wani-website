import { motion } from "framer-motion";
import { Star } from "lucide-react";
import img1 from "@assets/Screenshot_20260627-173004_Maps_1782562014882.jpg";
import img2 from "@assets/Screenshot_20260627-172957_Maps_1782562014909.jpg";
import img3 from "@assets/Screenshot_20260627-173038_Maps_1782562014793.jpg";

export default function About() {
  return (
    <div className="relative w-full min-h-screen bg-[#0a0908] flex items-center overflow-hidden">
      {/* Background images */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 flex">
          <div className="w-1/2 h-full bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${img1})` }} />
          <div className="w-1/2 h-full bg-cover bg-center opacity-30" style={{ backgroundImage: `url(${img2})` }} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0908] via-[#0a0908]/75 to-[#0a0908]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0908]/80 via-transparent to-[#0a0908]/60" />
      </div>

      {/* Right accent image */}
      <div className="absolute right-0 top-0 bottom-0 w-[30%] md:w-[35%] bg-cover bg-center opacity-20 hidden md:block" style={{ backgroundImage: `url(${img3})` }} />
      <div className="absolute right-0 inset-y-0 w-[40%] bg-gradient-to-l from-transparent to-[#0a0908]/90 hidden md:block" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center w-full pt-28 pb-16 px-6 md:px-14 lg:px-20 xl:px-28 max-w-[900px]">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-3 text-primary/80 mb-5">
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium">The Philosophy</span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-serif leading-tight text-foreground mb-6">
            We transform spaces <br className="hidden md:block" />
            into <span className="text-primary italic">lived art.</span>
          </h2>

          <p className="text-base md:text-lg lg:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mb-5">
            Every project we deliver carries a signature: warmth, precision, and an instinctive
            sense of luxury. We believe architecture is not just about building structures — it is
            about crafting experiences that endure.
          </p>

          <p className="text-sm md:text-base text-muted-foreground/70 font-light leading-relaxed max-w-xl mb-8 hidden md:block">
            Based in Aurangabad, Maharashtra, our studio has spent over a decade shaping homes, villas,
            offices, and commercial spaces that reflect the highest standards of design and craftsmanship.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-8 pt-6 border-t border-white/8">
            {[
              { value: "150+", label: "Projects" },
              { value: "10+", label: "Years" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl md:text-3xl font-serif text-primary leading-none mb-1">{stat.value}</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* Rating badge */}
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-full backdrop-blur-sm">
            <div className="flex text-primary gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
            </div>
            <span className="text-sm font-medium tracking-wide">4.8 — 27 Reviews on Google</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
