import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

gsap.registerPlugin(ScrollTrigger);

const SECTION_COUNT = 10;

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      const panels = document.querySelectorAll(".panel");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = Array.from(panels).indexOf(entry.target as Element);
              setActiveSection(index);
            }
          });
        },
        { threshold: 0.3 }
      );
      panels.forEach((p) => observer.observe(p));
      return () => observer.disconnect();
    }

    const container = containerRef.current;
    const wrapper = scrollWrapperRef.current;
    if (!container || !wrapper) return;

    const sections = gsap.utils.toArray<Element>(".panel");

    gsap.set(sections, { willChange: "transform" });

    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (SECTION_COUNT - 1),
      ease: "none",
      scrollTrigger: {
        trigger: wrapper,
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (SECTION_COUNT - 1),
          duration: { min: 0.2, max: 0.5 },
          delay: 0.05,
          ease: "power1.inOut",
        },
        end: () => "+=" + (SECTION_COUNT - 1) * window.innerWidth,
        onUpdate: (self) => {
          const currentSection = Math.round(self.progress * (SECTION_COUNT - 1));
          setActiveSection(currentSection);
        },
        invalidateOnRefresh: true,
      },
    });

    const ro = new ResizeObserver(() => ScrollTrigger.refresh());
    ro.observe(document.body);

    return () => {
      try {
        scrollTween.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
        ScrollTrigger.clearScrollMemory();
      } catch (_) {}
      ro.disconnect();
    };
  }, []);

  return (
    <div className="bg-background text-foreground relative font-sans">
      <Navbar activeSection={activeSection} />
      <FloatingButtons activeSection={activeSection} />

      {/* Scroll progress line — desktop */}
      <div className="fixed bottom-0 left-0 h-[2px] bg-primary/15 w-full z-50 hidden md:block pointer-events-none">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${(activeSection / (SECTION_COUNT - 1)) * 100}%` }}
        />
      </div>

      {/* Desktop: GSAP horizontal scroll wrapper */}
      <div ref={scrollWrapperRef} className="md:h-screen md:overflow-hidden md:flex">
        <div
          ref={containerRef}
          className="md:flex md:flex-row md:w-[1000vw]"
        >
          <div className="panel md:w-screen md:h-screen md:flex-shrink-0 relative md:overflow-hidden min-h-screen" id="hero">
            <Hero />
          </div>
          <div className="panel md:w-screen md:h-screen md:flex-shrink-0 relative md:overflow-hidden min-h-screen" id="about">
            <About />
          </div>
          <div className="panel md:w-screen md:h-screen md:flex-shrink-0 relative md:overflow-hidden min-h-screen" id="services">
            <Services />
          </div>
          <div className="panel md:w-screen md:h-screen md:flex-shrink-0 relative md:overflow-hidden min-h-screen" id="process">
            <Process />
          </div>
          <div className="panel md:w-screen md:h-screen md:flex-shrink-0 relative md:overflow-hidden min-h-screen" id="why-us">
            <WhyUs />
          </div>
          <div className="panel md:w-screen md:h-screen md:flex-shrink-0 relative md:overflow-hidden min-h-screen" id="portfolio">
            <Portfolio />
          </div>
          <div className="panel md:w-screen md:h-screen md:flex-shrink-0 relative md:overflow-hidden min-h-screen" id="gallery">
            <Gallery />
          </div>
          <div className="panel md:w-screen md:h-screen md:flex-shrink-0 relative md:overflow-hidden min-h-screen" id="testimonials">
            <Testimonials />
          </div>
          <div className="panel md:w-screen md:h-screen md:flex-shrink-0 relative md:overflow-hidden min-h-screen" id="faq">
            <FAQ />
          </div>
          <div className="panel md:w-screen md:h-screen md:flex-shrink-0 relative md:overflow-hidden" id="appointment">
            <Appointment />
          </div>
        </div>
      </div>
    </div>
  );
}
