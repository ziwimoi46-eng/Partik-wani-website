import { motion } from "framer-motion";
import ThreeBackground from "./ThreeBackground";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center bg-background overflow-hidden px-6">
      <ThreeBackground />
      
      <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        >
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-serif font-medium tracking-tight text-foreground uppercase mb-6 drop-shadow-2xl">
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
          <p className="text-lg md:text-2xl text-muted-foreground font-light tracking-wide uppercase">
            Where Architecture Meets Artistry
          </p>
          <div className="w-12 h-[1px] bg-primary/50 my-2" />
          <p className="text-sm md:text-base text-muted-foreground/60 tracking-widest uppercase">
            Aurangabad, Maharashtra · Est. 2015
          </p>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-12 right-12 z-10 flex items-center gap-4 text-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs tracking-[0.2em] uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ x: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowRight className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </div>
  );
}
