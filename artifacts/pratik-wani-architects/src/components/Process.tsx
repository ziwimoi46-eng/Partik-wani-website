import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery & Briefing",
    desc: "Understanding your vision, lifestyle, and requirements"
  },
  {
    num: "02",
    title: "Concept Design",
    desc: "Sketches, mood boards, and 3D concept visualization"
  },
  {
    num: "03",
    title: "Design Development",
    desc: "Detailed drawings, material selection, and specification"
  },
  {
    num: "04",
    title: "Client Approval",
    desc: "Review, iterate, and finalize every detail to your satisfaction"
  },
  {
    num: "05",
    title: "Execution & Construction",
    desc: "Precision craftsmanship with site supervision"
  },
  {
    num: "06",
    title: "Handover & Styling",
    desc: "Final installation, styling, and walkthrough with you"
  }
];

export default function Process() {
  return (
    <div className="relative w-full h-full bg-[#0d0c0b] flex flex-col justify-center px-8 md:px-20 py-16">
      <div className="absolute inset-0 pointer-events-none opacity-10 mix-blend-overlay"
           style={{
             backgroundImage: `linear-gradient(to right, #c8a96e 1px, transparent 1px), linear-gradient(to bottom, #c8a96e 1px, transparent 1px)`,
             backgroundSize: '4rem 4rem'
           }}
      />
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3 text-primary/60">
            <div className="h-[1px] w-3 bg-primary/60" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium">How We Work</span>
            <div className="h-[1px] w-3 bg-primary/60" />
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight"
          >
            A Refined Process,<br />Delivered with Precision
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row gap-8 overflow-x-auto hide-scrollbar pb-8 pt-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="flex-shrink-0 w-64 group relative flex flex-col gap-6 p-6 border border-white/5 bg-white/[0.02] hover:border-primary/50 transition-all duration-300"
            >
              <div className="text-5xl font-serif text-primary/30 group-hover:text-primary transition-colors duration-300">
                {step.num}
              </div>
              <div className="w-12 h-[1px] bg-primary/40 group-hover:bg-primary transition-colors duration-300" />
              <div>
                <h3 className="text-xl font-serif text-foreground mb-3">{step.title}</h3>
                <p className="text-sm font-sans text-muted-foreground/80 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
