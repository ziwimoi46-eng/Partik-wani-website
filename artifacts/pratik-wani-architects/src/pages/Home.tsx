import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
      // Intersection Observer for mobile to update activeSection
      const panels = document.querySelectorAll('.panel');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = Array.from(panels).indexOf(entry.target as Element);
            setActiveSection(index);
          }
        });
      }, { threshold: 0.5 });
      
      panels.forEach(p => observer.observe(p));
      return () => observer.disconnect();
    }

    const container = containerRef.current;
    const wrapper = scrollWrapperRef.current;
    
    if (!container || !wrapper) return;

    const sections = gsap.utils.toArray(".panel");

    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        snap: 1 / (sections.length - 1),
        end: () => "+=" + container.offsetWidth,
        onUpdate: (self) => {
          const progress = self.progress;
          const currentSection = Math.round(progress * (sections.length - 1));
          setActiveSection(currentSection);
        }
      }
    });

    return () => {
      scrollTween.kill();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="bg-background text-foreground min-h-screen relative font-sans overflow-x-hidden">
      <Navbar activeSection={activeSection} />
      
      {/* Scroll Progress Line */}
      <div className="fixed bottom-0 left-0 h-1 bg-primary/20 w-full z-50 hidden md:block">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${(activeSection / 4) * 100}%` }}
        />
      </div>

      <div ref={scrollWrapperRef} className="md:h-screen md:overflow-hidden md:flex">
        <div 
          ref={containerRef} 
          className="md:flex md:w-[500vw] h-[100dvh] flex-col md:flex-row max-md:overflow-y-auto max-md:snap-y max-md:snap-mandatory hide-scrollbar"
        >
          <div className="panel md:w-screen h-screen flex-shrink-0 relative overflow-hidden max-md:h-[100dvh] max-md:snap-start" id="hero">
            <Hero />
          </div>
          <div className="panel md:w-screen h-screen flex-shrink-0 relative overflow-hidden max-md:h-[100dvh] max-md:snap-start" id="about">
            <About />
          </div>
          <div className="panel md:w-screen h-screen flex-shrink-0 relative overflow-hidden max-md:h-[100dvh] max-md:snap-start" id="services">
            <Services />
          </div>
          <div className="panel md:w-screen h-screen flex-shrink-0 relative overflow-hidden max-md:h-[100dvh] max-md:snap-start" id="portfolio">
            <Portfolio />
          </div>
          <div className="panel md:w-screen h-screen flex-shrink-0 relative overflow-hidden max-md:h-[100dvh] max-md:snap-start" id="contact">
            <Contact />
          </div>
        </div>
      </div>
      
      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </div>
  );
}
