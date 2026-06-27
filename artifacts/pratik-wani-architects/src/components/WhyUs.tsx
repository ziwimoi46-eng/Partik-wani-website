import { motion } from "framer-motion";

const features = [
  { title: "Innovative Designs", desc: "Pushing the boundaries of form and function" },
  { title: "10+ Years Experience", desc: "Decade of transforming spaces across Maharashtra" },
  { title: "Premium Materials", desc: "Curated finishes from the world's finest suppliers" },
  { title: "Transparent Process", desc: "Clear timelines, budgets, and communication throughout" },
  { title: "On-Time Delivery", desc: "We respect your time as much as your vision" },
  { title: "360° Service", desc: "From concept to completion, we handle everything" },
  { title: "3D Visualization", desc: "See your space before it's built" },
  { title: "Personalized Design", desc: "Every project crafted uniquely for you" },
];

export default function WhyUs() {
  return (
    <div className="relative w-full h-full bg-[#0d0c0b] flex flex-col justify-center px-8 md:px-20 py-16 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-2/5 flex flex-col gap-8">
          <div className="flex items-center gap-3 text-primary/60">
            <div className="h-[1px] w-3 bg-primary/60" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Why Choose Us</span>
            <div className="h-[1px] w-3 bg-primary/60" />
          </div>
          
          <motion.h2 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight"
          >
            Why Leading Clients Choose <br />
            <span className="text-primary italic">Pratik Wani Architects</span>
          </motion.h2>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-6 pt-6 border-t border-white/10"
          >
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-primary">150+</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Projects</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-primary">10+</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Years</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-primary">4.8★</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Rating</span>
            </div>
            <div className="w-[1px] h-10 bg-white/10 hidden sm:block" />
            <div className="flex flex-col">
              <span className="text-2xl font-serif text-primary">100%</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Satisfaction</span>
            </div>
          </motion.div>
        </div>

        <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="bg-white/[0.03] border border-white/5 border-t-primary/30 hover:border-t-primary p-6 transition-all duration-300 group"
            >
              <div className="text-primary mb-4 opacity-70 group-hover:opacity-100 transition-opacity">✦</div>
              <h3 className="text-xl font-serif text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm font-sans text-muted-foreground/80">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
