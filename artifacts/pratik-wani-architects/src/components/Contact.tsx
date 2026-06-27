import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="relative w-full h-full bg-[#080706] flex items-center justify-center p-6 md:p-24 overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-primary/10 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-6 flex items-center gap-3 text-primary/80"
        >
          <div className="h-[1px] w-12 bg-primary/40" />
          <span className="text-sm uppercase tracking-[0.2em]">Begin The Journey</span>
          <div className="h-[1px] w-12 bg-primary/40" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="text-4xl md:text-6xl lg:text-8xl font-serif text-foreground mb-12 leading-tight"
        >
          Let's Build Something <br />
          <span className="text-primary italic">Extraordinary</span>
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-col md:flex-row gap-12 text-left w-full justify-center mt-12 border-t border-white/5 pt-12"
        >
          <div className="flex flex-col gap-2">
            <span className="text-xs uppercase tracking-widest text-muted-foreground/60 mb-2">Connect</span>
            <a href="tel:08668805662" className="text-xl md:text-2xl font-light hover:text-primary transition-colors">08668805662</a>
          </div>

          <div className="hidden md:block w-[1px] h-16 bg-white/5" />

          <div className="flex flex-col gap-2 max-w-xs">
            <span className="text-xs uppercase tracking-widest text-muted-foreground/60 mb-2">Studio</span>
            <p className="text-base font-light text-muted-foreground leading-relaxed">
              Adalat Road, Chhatrapati Sambhajinagar (Aurangabad), Maharashtra, India
            </p>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 group relative px-10 py-5 bg-transparent border border-primary/30 overflow-hidden rounded-sm"
        >
          <div className="absolute inset-0 bg-primary translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          <span className="relative z-10 text-sm uppercase tracking-[0.2em] text-primary group-hover:text-background transition-colors duration-500">
            Book a Consultation
          </span>
        </motion.button>
      </div>

      <div className="absolute bottom-8 left-0 right-0 text-center z-10">
        <p className="text-xs text-muted-foreground/40 tracking-widest uppercase">
          © {new Date().getFullYear()} Pratik Wani Architects. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
