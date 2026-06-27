import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    q: "What types of projects do you handle?",
    a: "We handle the full spectrum — residential homes, luxury villas, apartments, offices, commercial spaces, and more. Whether you need a complete architectural design from scratch or an interior redesign, we deliver end-to-end.",
  },
  {
    q: "Where are you based and do you work outside Aurangabad?",
    a: "Our studio is based in Aurangabad, Maharashtra. We do take select projects in Pune, Nashik, Mumbai, and other cities. Contact us to discuss your location and requirements.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines vary by scope. Interior design projects typically run 3–6 months; full architectural and construction projects 12–24 months. We always share a detailed project timeline upfront so you know exactly what to expect.",
  },
  {
    q: "Do you offer 3D visualization before construction?",
    a: "Absolutely. We provide photorealistic 3D renders of every space before a single brick is laid. This allows you to see, review, and approve the design with full confidence.",
  },
  {
    q: "What is your pricing model?",
    a: "Our fees are based on project scope — area, complexity, and service level. We offer transparent, itemized estimates and there are no hidden surprises. Book a free consultation to discuss your budget and requirements.",
  },
  {
    q: "Can you manage the entire construction process?",
    a: "Yes. We offer full turnkey services — design, material procurement, site supervision, and handover. You get a single point of accountability from concept to completion.",
  },
  {
    q: "Do you work with a client's preferred contractor?",
    a: "Yes, we can collaborate with your existing contractor or introduce you to our trusted network of craftsmen and vendors, depending on your preference.",
  },
  {
    q: "What makes PWA different from other firms?",
    a: "We combine design artistry with rigorous project management. Our commitment is to deliver spaces that feel personal, premium, and purposeful — on time and on budget.",
  },
];

export default function FAQ() {
  return (
    <div className="relative w-full min-h-screen bg-[#0a0908] flex flex-col">
      {/* Grain texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")" }} />

      <div className="relative z-10 flex flex-col pt-28 pb-16 px-6 md:px-14 lg:px-20 xl:px-24 max-w-[1000px] mx-auto w-full">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 text-primary/60 mb-3">
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Common Questions</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight"
          >
            Frequently Asked <span className="text-primary italic">Questions</span>
          </motion.h2>
        </div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-0">
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`item-${idx}`}
                className="border-b border-white/[0.08] first:border-t"
              >
                <AccordionTrigger className="text-left text-sm md:text-base font-serif text-foreground/90 hover:text-primary py-5 pr-4 transition-colors duration-200 [&[data-state=open]]:text-primary">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground/80 font-light leading-relaxed pb-5 pr-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        >
          <p className="text-sm text-muted-foreground/70 max-w-xs">
            Still have questions? Our team is happy to help you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="tel:08668805662"
              className="text-xs uppercase tracking-[0.18em] text-white/60 border border-white/15 px-5 py-2.5 hover:text-white hover:border-white/40 transition-all duration-300 text-center"
            >
              Call Us
            </a>
            <button
              onClick={() => {
                const el = document.getElementById("appointment");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs uppercase tracking-[0.18em] text-primary border border-primary/50 px-5 py-2.5 hover:bg-primary hover:text-background transition-all duration-400 text-center"
            >
              Book Free Consult
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
