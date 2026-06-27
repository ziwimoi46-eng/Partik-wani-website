import { motion } from "framer-motion";

const services = [
  "Architectural Design", "Interior Design", "Residential Architecture", "Commercial Architecture",
  "Villa & Bungalow Design", "Apartment Interiors", "Office Interiors", "Luxury Interiors",
  "Modular Kitchen Design", "Bedroom Interiors", "Living Room Design", "Space Planning",
  "Landscape Design", "3D Visualization", "Renovation", "Turnkey Projects",
  "Construction Consultation", "Site Supervision", "Custom Furniture", "Lighting Design",
  "False Ceiling Design", "Elevation Design", "Material & Finish Selection"
];

export default function Services() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="relative w-full h-full bg-[#110f0e] flex flex-col justify-center p-6 md:p-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-16 flex items-center gap-3 text-primary/80">
          <span className="text-sm uppercase tracking-[0.2em]">Our Expertise</span>
          <div className="h-[1px] w-16 bg-primary/40" />
        </div>
        
        <h2 className="text-4xl md:text-6xl font-serif text-foreground mb-16">
          Comprehensive <span className="text-primary italic">Services</span>
        </h2>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-10%" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-6"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={item}
              className="group relative cursor-default pb-4 border-b border-white/5"
            >
              <h3 className="text-lg md:text-xl font-light text-muted-foreground group-hover:text-primary transition-colors duration-500">
                {service}
              </h3>
              <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-primary transition-all duration-500 group-hover:w-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
