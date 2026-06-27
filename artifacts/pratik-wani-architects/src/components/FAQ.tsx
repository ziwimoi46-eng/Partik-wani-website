import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does your design process work?",
    a: "We follow a 6-step process: Discovery, Concept Design, Design Development, Client Approval, Execution, and Handover. Every step is collaborative and transparent, ensuring your vision guides the outcome.",
  },
  {
    q: "How long does a typical project take?",
    a: "Interior projects typically take 3–6 months, residential architecture 8–18 months, and turnkey projects depend on scope. We provide a detailed schedule at the start of every engagement.",
  },
  {
    q: "Do you provide turnkey interior solutions?",
    a: "Yes. We handle everything from concept design to furniture selection, material sourcing, civil work, and final styling — a complete, stress-free turnkey experience.",
  },
  {
    q: "Can I book a consultation online?",
    a: "Absolutely. Use our online appointment booking system to select your preferred date, time, and service. You can also reach us directly at 08668805662.",
  },
  {
    q: "Do you handle both residential and commercial projects?",
    a: "Yes. We have extensive experience across residential (apartments, villas, bungalows) and commercial (offices, showrooms, hospitality) projects across Maharashtra.",
  },
  {
    q: "What areas do you serve?",
    a: "We primarily serve Chhatrapati Sambhajinagar (Aurangabad) and surrounding areas including Pune, Nashik, Latur, and across Maharashtra. We also accept select projects nationally.",
  },
  {
    q: "How do you handle material selection?",
    a: "Our in-house team curates materials and finishes from trusted suppliers, presenting options with samples and 3D visualizations so you can see exactly how your space will look before execution.",
  },
];

export default function FAQ() {
  return (
    <div className="relative w-full md:h-full min-h-screen bg-[#080808] flex flex-col overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #c8a96e 1px, transparent 1px), linear-gradient(to bottom, #c8a96e 1px, transparent 1px)",
          backgroundSize: "3rem 3rem",
        }}
      />

      <div className="relative z-10 flex flex-col pt-20 md:pt-24 pb-8 px-6 md:px-14 lg:px-20 xl:px-24 max-w-[1400px] mx-auto w-full md:h-full">

        {/* Header */}
        <div className="flex-shrink-0 mb-5 md:mb-7">
          <div className="flex items-center gap-3 text-primary/60 mb-3">
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Questions & Answers</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-foreground leading-tight"
            >
              Everything You{" "}
              <span className="text-primary italic">Need to Know</span>
            </motion.h2>
            <a
              href="tel:08668805662"
              className="text-sm text-muted-foreground/70 hover:text-primary transition-colors font-sans tracking-wide flex-shrink-0"
            >
              Still have questions?{" "}
              <span className="text-primary font-medium">Call 08668805662</span>
            </a>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 md:flex-1 md:min-h-0">
          {/* Accordion — scrollable on desktop */}
          <div className="lg:flex-1 md:overflow-y-auto hide-scrollbar">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem
                  key={idx}
                  value={`item-${idx}`}
                  className="border-white/[0.08] mb-1"
                >
                  <AccordionTrigger className="text-left font-serif text-base md:text-lg text-white/85 hover:text-primary data-[state=open]:text-primary py-4 md:py-5 transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground/80 font-sans text-sm leading-relaxed border-l-2 border-primary/60 pl-5 ml-1 pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Right CTA card — hidden on mobile */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0 hidden md:flex flex-col justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.65 }}
              className="p-7 border border-primary/20 bg-primary/5 flex flex-col gap-4"
            >
              <div className="text-3xl font-serif text-primary/30 leading-none">"</div>
              <p className="text-sm text-muted-foreground font-sans leading-relaxed">
                Not finding what you're looking for? Our team is available Monday–Saturday, 10 AM–7 PM to discuss your project in detail.
              </p>
              <a
                href="tel:08668805662"
                className="text-xl font-serif text-primary hover:text-white transition-colors"
              >
                08668805662
              </a>
              <a
                href="https://wa.me/918668805662"
                target="_blank"
                rel="noreferrer"
                className="text-xs text-muted-foreground/60 hover:text-[#25D366] transition-colors uppercase tracking-widest"
              >
                or Message on WhatsApp
              </a>
            </motion.div>

            <div className="flex flex-col gap-3 pl-1">
              {[
                { label: "Projects Delivered", val: "150+" },
                { label: "Years in Practice", val: "10+" },
                { label: "Google Rating", val: "4.8★" },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between border-b border-white/5 pb-3">
                  <span className="text-xs text-muted-foreground/60 uppercase tracking-wider">{s.label}</span>
                  <span className="text-base font-serif text-primary">{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
