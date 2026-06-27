import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Process from "@/components/Process";
import WhyUs from "@/components/WhyUs";
import Portfolio from "@/components/Portfolio";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Appointment from "@/components/Appointment";
import Navbar from "@/components/Navbar";
import FloatingButtons from "@/components/FloatingButtons";

export default function Home() {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const panels = document.querySelectorAll(".panel");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Array.from(panels).indexOf(entry.target as Element);
            if (index !== -1) setActiveSection(index);
          }
        });
      },
      { threshold: 0.3 }
    );
    panels.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground relative font-sans">
      <Navbar activeSection={activeSection} />
      <FloatingButtons activeSection={activeSection} />

      {/* Scroll progress bar */}
      <div className="fixed bottom-0 left-0 h-[2px] bg-primary/15 w-full z-50 pointer-events-none">
        <div
          className="h-full bg-primary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      <div id="hero" className="panel"><Hero /></div>
      <div id="about" className="panel"><About /></div>
      <div id="services" className="panel"><Services /></div>
      <div id="process" className="panel"><Process /></div>
      <div id="why-us" className="panel"><WhyUs /></div>
      <div id="portfolio" className="panel"><Portfolio /></div>
      <div id="gallery" className="panel"><Gallery /></div>
      <div id="testimonials" className="panel"><Testimonials /></div>
      <div id="faq" className="panel"><FAQ /></div>
      <div id="appointment" className="panel"><Appointment /></div>
    </div>
  );
}
