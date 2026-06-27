import { motion } from "framer-motion";
import { Star } from "lucide-react";
import img1 from "@assets/Screenshot_20260627-173004_Maps_1782562014882.jpg";
import img2 from "@assets/Screenshot_20260627-172957_Maps_1782562014909.jpg";

export default function About() {
  return (
    <div className="relative w-full h-full bg-[#0a0908] flex items-center justify-center p-6 md:p-24">
      {/* Background Images with Parallax effect via GSAP scrub in parent */}
      <div className="absolute inset-0 w-full h-full flex z-0 opacity-40 mix-blend-screen">
        <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url(${img1})` }} />
        <div className="w-1/2 h-full bg-cover bg-center" style={{ backgroundImage: `url(${img2})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col justify-center h-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-8 flex items-center gap-3 text-primary/80">
            <span className="text-sm uppercase tracking-[0.2em]">The Philosophy</span>
            <div className="h-[1px] w-16 bg-primary/40" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif leading-tight text-foreground mb-12">
            We transform spaces into <br className="hidden md:block"/>
            <span className="text-primary italic">lived art.</span>
          </h2>
          
          <p className="text-lg md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl">
            Every project we deliver carries a signature: warmth, precision, and an instinctive sense of luxury. We believe architecture is not just about building structures, but crafting experiences that evoke awe.
          </p>

          <div className="mt-16 inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-full backdrop-blur-sm">
            <div className="flex text-primary">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium tracking-wide">4.8 ★ — 27 Reviews on Google</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
