import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import img3 from "@assets/Screenshot_20260627-172957_Maps_1782562014909.jpg";

const testimonials = [
  {
    quote: "Pratik Wani Architects transformed our 3BHK into a stunning work of art. Every corner was designed with intent. Truly world-class.",
    author: "Rajesh Mehta",
    location: "Aurangabad",
    rating: 5
  },
  {
    quote: "We trusted them with our villa project and the result exceeded every expectation. The 3D visualization saved us so much time in decision making.",
    author: "Priya & Sunil Kulkarni",
    location: "Pune",
    rating: 5
  },
  {
    quote: "Their modular kitchen design is the highlight of our home. Functional, beautiful, and built to last. Highly recommend!",
    author: "Anita Sharma",
    location: "Aurangabad",
    rating: 5
  },
  {
    quote: "The team handled our commercial office interior with absolute professionalism. Delivered on time, within budget, with zero compromise on quality.",
    author: "Vikram Deshmukh",
    location: "Nashik",
    rating: 5
  },
  {
    quote: "From concept to handover, the communication was flawless. They understood our lifestyle and designed around it. We feel at home every single day.",
    author: "Meera & Aditya Joshi",
    location: "Chhatrapati Sambhajinagar",
    rating: 4
  },
  {
    quote: "The living room they designed for us has become the talking point for every guest. Creative, elegant, and perfectly personal.",
    author: "Sanjay Patil",
    location: "Latur",
    rating: 5
  }
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="relative w-full h-full bg-[#0d0c0b] flex flex-col items-center justify-center px-8 md:px-20 py-16 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.06] mix-blend-luminosity"
        style={{ backgroundImage: `url(${img3})` }}
      />
      
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-sm mb-6">
            <span className="text-primary">★</span>
            <span className="text-sm text-white/90">4.8 Google Rating · 27 Reviews</span>
          </div>
          
          <div className="flex items-center justify-center gap-3 text-primary/60 mb-4">
            <div className="h-[1px] w-3 bg-primary/60" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Client Stories</span>
            <div className="h-[1px] w-3 bg-primary/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">What Our Clients Say</h2>
        </motion.div>

        <div className="w-full relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col items-center justify-center w-full max-w-3xl mx-auto"
            >
              <div className="text-6xl text-primary/40 font-serif leading-none mb-4">"</div>
              <p className="text-xl md:text-3xl font-serif text-white/90 leading-relaxed mb-8">
                {testimonials[currentIndex].quote}
              </p>
              <div className="flex flex-col items-center">
                <h4 className="text-lg font-serif text-primary mb-1">{testimonials[currentIndex].author}</h4>
                <p className="text-sm text-muted-foreground mb-3 uppercase tracking-widest">{testimonials[currentIndex].location}</p>
                <div className="flex gap-1 text-primary text-sm">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className={i < testimonials[currentIndex].rating ? "opacity-100" : "opacity-30"}>★</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <button onClick={prev} className="absolute left-0 md:-left-12 p-3 text-white/50 hover:text-primary transition-colors">
            <ChevronLeft size={32} />
          </button>
          <button onClick={next} className="absolute right-0 md:-right-12 p-3 text-white/50 hover:text-primary transition-colors">
            <ChevronRight size={32} />
          </button>
        </div>

        <div className="flex gap-3 mt-12">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1 transition-all duration-300 ${currentIndex === idx ? "w-8 bg-primary" : "w-2 bg-white/20 hover:bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
