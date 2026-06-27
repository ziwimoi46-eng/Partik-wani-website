import { motion } from "framer-motion";

const features = [
  { symbol: "◈", title: "Innovative Designs", desc: "Pushing the boundaries of form and function — every project is a creative breakthrough." },
  { symbol: "◈", title: "10+ Years Experience", desc: "A decade of transforming spaces across Maharashtra with consistent excellence." },
  { symbol: "◈", title: "Premium Materials", desc: "Curated finishes and materials sourced from the world's finest suppliers." },
  { symbol: "◈", title: "Transparent Process", desc: "Clear timelines, honest budgets, and open communication at every stage." },
  { symbol: "◈", title: "On-Time Delivery", desc: "We respect your time as much as your vision — deadlines are commitments." },
  { symbol: "◈", title: "360° Service", desc: "From concept to final styling, we handle every detail so you don't have to." },
  { symbol: "◈", title: "3D Visualization", desc: "See your space in stunning detail before construction begins." },
  { symbol: "◈", title: "Personalized Design", desc: "Every project is crafted uniquely around your lifestyle and aspirations." },
];

export default function WhyUs() {
  return (
    <div className="relative w-full md:h-full min-h-screen bg-[#0d0c0b] flex flex-col overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -left-32 w-[36rem] h-[36rem] bg-primary/4 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 -right-32 w-[36rem] h-[36rem] bg-primary/4 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 flex flex-col pt-20 md:pt-24 pb-8 px-6 md:px-14 lg:px-20 xl:px-24 max-w-[1400px] mx-auto w-full md:h-full">

        {/* Heading + stats */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-16 items-start lg:items-end mb-6 md:mb-8 flex-shrink-0">
          <div className="lg:flex-1">
            <div className="flex items-center gap-3 text-primary/60 mb-3">
              <div className="h-px w-8 bg-primary/50" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Why Choose Us</span>
            </div>
            <motion.h2
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75 }}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-foreground leading-tight"
            >
              Why Leading Clients Choose{" "}
              <span className="text-primary italic block">Pratik Wani Architects</span>
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="flex flex-wrap items-center gap-6 md:gap-8 lg:flex-shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/8 lg:border-l lg:border-white/8 lg:pl-12"
          >
            {[
              { value: "150+", label: "Projects" },
              { value: "10+", label: "Years" },
              { value: "4.8★", label: "Rating" },
              { value: "100%", label: "Satisfaction" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center min-w-[56px]">
                <span className="text-xl md:text-2xl font-serif text-primary leading-none mb-1">{stat.value}</span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted-foreground/60">{stat.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pb-4 md:flex-1 md:content-start md:min-h-0">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: idx * 0.07, duration: 0.5 }}
              whileHover={{ y: -3 }}
              className="group flex flex-col gap-2 md:gap-3 p-4 md:p-5 border border-white/[0.07] border-t-primary/20 bg-white/[0.02] hover:border-t-primary hover:border-white/15 hover:bg-white/[0.04] transition-all duration-400 cursor-default"
            >
              <span className="text-primary/50 group-hover:text-primary text-sm transition-colors duration-300">
                {feature.symbol}
              </span>
              <h3 className="text-sm md:text-base font-serif text-foreground leading-snug">{feature.title}</h3>
              <p className="text-[11px] md:text-xs font-sans text-muted-foreground/70 leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
