import { motion } from "framer-motion";

const services = [
  { name: "Architectural Design", icon: "◈" },
  { name: "Interior Design", icon: "◈" },
  { name: "Residential Architecture", icon: "◈" },
  { name: "Commercial Architecture", icon: "◈" },
  { name: "Villa & Bungalow Design", icon: "◈" },
  { name: "Apartment Interiors", icon: "◈" },
  { name: "Office Interiors", icon: "◈" },
  { name: "Luxury Interiors", icon: "◈" },
  { name: "Modular Kitchen Design", icon: "◈" },
  { name: "Bedroom Interiors", icon: "◈" },
  { name: "Living Room Design", icon: "◈" },
  { name: "Space Planning", icon: "◈" },
  { name: "Landscape Design", icon: "◈" },
  { name: "3D Visualization", icon: "◈" },
  { name: "Renovation & Remodeling", icon: "◈" },
  { name: "Turnkey Projects", icon: "◈" },
  { name: "Construction Consultation", icon: "◈" },
  { name: "Site Supervision", icon: "◈" },
  { name: "Custom Furniture Design", icon: "◈" },
  { name: "Lighting Design", icon: "◈" },
  { name: "False Ceiling Design", icon: "◈" },
  { name: "Elevation Design", icon: "◈" },
  { name: "Material & Finish Selection", icon: "◈" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 260, damping: 22 },
  },
};

export default function Services() {
  return (
    <div className="relative w-full h-full bg-[#110f0e] flex flex-col">
      {/* Decorative glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-1/4 w-[28rem] h-[28rem] rounded-full bg-primary/5 blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col h-full pt-20 md:pt-24 pb-6 px-6 md:px-14 lg:px-20 xl:px-24 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="mb-5 md:mb-7 flex-shrink-0">
          <div className="flex items-center gap-3 text-primary/70 mb-3">
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Our Expertise</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
            Comprehensive{" "}
            <span className="text-primary italic">Services</span>
          </h2>
        </div>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-0 flex-1"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={item}
              className="group flex items-start gap-2 py-3 border-b border-white/[0.06] cursor-default"
            >
              <span className="text-primary/40 text-xs mt-[3px] group-hover:text-primary transition-colors duration-300 flex-shrink-0">
                {service.icon}
              </span>
              <div className="relative overflow-hidden">
                <span className="block text-[13px] md:text-sm font-light text-muted-foreground group-hover:text-foreground transition-colors duration-400 leading-snug">
                  {service.name}
                </span>
                <div className="absolute bottom-0 left-0 h-px w-0 bg-primary transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer CTA */}
        <div className="flex-shrink-0 mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground/60 tracking-wide">
            Every service crafted with precision, delivered with care.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 9 * window.innerHeight, behavior: "smooth" })}
            className="text-xs uppercase tracking-[0.18em] text-primary border border-primary/40 px-5 py-2.5 hover:bg-primary hover:text-background transition-all duration-400"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
}
