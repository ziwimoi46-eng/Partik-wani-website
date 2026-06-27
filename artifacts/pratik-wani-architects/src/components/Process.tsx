import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Discovery & Briefing",
    desc: "We listen deeply — understanding your vision, lifestyle, spatial requirements, and aspirations before a single line is drawn.",
  },
  {
    num: "02",
    title: "Concept Design",
    desc: "Mood boards, sketches, and 3D concept visualizations that translate your brief into a compelling spatial narrative.",
  },
  {
    num: "03",
    title: "Design Development",
    desc: "Detailed architectural drawings, material palettes, specifications, and engineering coordination — every detail resolved.",
  },
  {
    num: "04",
    title: "Client Approval",
    desc: "We review, refine, and iterate together until every element meets your expectation. Nothing moves forward without your sign-off.",
  },
  {
    num: "05",
    title: "Execution & Construction",
    desc: "Precision craftsmanship on site, with our team supervising every stage to maintain quality and timeline.",
  },
  {
    num: "06",
    title: "Handover & Styling",
    desc: "Final furniture placement, accessory styling, and a full walkthrough — your space, perfectly complete.",
  },
];

export default function Process() {
  return (
    <div className="relative w-full md:h-full min-h-screen bg-[#0d0c0b] flex flex-col">
      {/* Blueprint grid bg */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #c8a96e 1px, transparent 1px), linear-gradient(to bottom, #c8a96e 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }}
      />

      <div className="relative z-10 flex flex-col pt-20 md:pt-24 pb-8 px-6 md:px-14 lg:px-20 xl:px-24 max-w-[1400px] mx-auto w-full md:h-full">
        {/* Header */}
        <div className="mb-6 md:mb-8 flex-shrink-0">
          <div className="flex items-center gap-3 text-primary/60 mb-3">
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium">How We Work</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight"
          >
            A Refined Process,{" "}
            <span className="text-primary italic">Delivered with Precision</span>
          </motion.h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 md:flex-1 md:min-h-0 md:content-start pb-4">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: idx * 0.08, duration: 0.55 }}
              className="group relative flex flex-col gap-3 p-5 md:p-6 border border-white/[0.07] bg-white/[0.02] hover:border-primary/40 hover:bg-white/[0.04] transition-all duration-400 cursor-default"
            >
              <div className="text-4xl md:text-5xl font-serif text-primary/25 group-hover:text-primary/50 transition-colors duration-400 leading-none">
                {step.num}
              </div>
              <div className="w-8 h-px bg-primary/40 group-hover:w-14 group-hover:bg-primary transition-all duration-500" />
              <div className="flex flex-col gap-1.5">
                <h3 className="text-base md:text-lg font-serif text-foreground leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs md:text-sm font-sans text-muted-foreground/75 leading-relaxed">
                  {step.desc}
                </p>
              </div>
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-primary/0 group-hover:border-primary/30 transition-colors duration-400" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
