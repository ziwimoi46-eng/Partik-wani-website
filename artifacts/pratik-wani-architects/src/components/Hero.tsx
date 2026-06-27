import { motion } from "framer-motion";
import ThreeBackground from "./ThreeBackground";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center bg-background overflow-hidden px-6">
      <ThreeBackground />

      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-serif font-medium tracking-tight text-foreground uppercase mb-6 drop-shadow-2xl leading-none">
            Pratik Wani <br />
            <span className="text-primary italic font-light tracking-wider">Architects</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="flex flex-col items-center gap-4"
        >
          <p className="text-base sm:text-lg md:text-2xl text-muted-foreground font-light tracking-wide uppercase">
            Where Architecture Meets Artistry
          </p>
          <div className="w-12 h-[1px] bg-primary/50 my-2" />
          <p className="text-xs sm:text-sm text-muted-foreground/60 tracking-widest uppercase">
            Aurangabad, Maharashtra · Est. 2015
          </p>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="w-4 h-4 md:w-5 md:h-5" />
        </motion.div>
      </motion.div>
    </div>
  );
}
