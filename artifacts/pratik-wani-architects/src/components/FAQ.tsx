import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqs = [
  {
    q: "How does your design process work?",
    a: "We follow a 6-step process: Discovery, Concept Design, Design Development, Client Approval, Execution, and Handover. Every step is collaborative and transparent, ensuring your vision guides the outcome."
  },
  {
    q: "How long does a typical project take?",
    a: "Project timelines vary: Interior projects typically take 3–6 months, residential architecture 8–18 months, and turnkey projects depend on scope. We provide a detailed schedule at the start of every engagement."
  },
  {
    q: "Do you provide turnkey interior solutions?",
    a: "Yes. We handle everything from concept design to furniture selection, material sourcing, civil work, and final styling — a complete, stress-free turnkey experience."
  },
  {
    q: "Can I book a consultation online?",
    a: "Absolutely. Use our online appointment booking system to select your preferred date, time, and service. You can also reach us directly at 08668805662."
  },
  {
    q: "Do you handle both residential and commercial projects?",
    a: "Yes. We have extensive experience across residential (apartments, villas, bungalows) and commercial (offices, showrooms, hospitality) projects across Maharashtra."
  },
  {
    q: "What areas do you serve?",
    a: "We primarily serve Chhatrapati Sambhajinagar (Aurangabad) and surrounding areas including Pune, Nashik, Latur, and across Maharashtra. We also take select projects nationally."
  },
  {
    q: "How do you handle material selection?",
    a: "Our in-house team curates materials and finishes from trusted suppliers. We present options with samples and 3D visualizations so you can see exactly how your space will look before execution."
  }
];

export default function FAQ() {
  return (
    <div className="relative w-full h-full bg-[#080808] flex items-center justify-center px-8 md:px-20 py-16">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: `linear-gradient(to right, #c8a96e 1px, transparent 1px), linear-gradient(to bottom, #c8a96e 1px, transparent 1px)`, backgroundSize: '3rem 3rem' }}
      />
      
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="md:w-1/3 flex flex-col justify-start pt-4">
          <div className="flex items-center gap-3 text-primary/60 mb-4">
            <div className="h-[1px] w-3 bg-primary/60" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Questions & Answers</span>
            <div className="h-[1px] w-3 bg-primary/60" />
          </div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-foreground mb-8 leading-tight"
          >
            Everything You <br />Need to Know
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="p-6 border border-primary/20 bg-primary/5 rounded-sm"
          >
            <p className="text-sm text-muted-foreground mb-4 font-sans">
              Still have questions? Our team is ready to discuss your project requirements.
            </p>
            <a href="tel:08668805662" className="text-xl font-serif text-primary hover:text-white transition-colors">
              08668805662
            </a>
          </motion.div>
        </div>

        <div className="md:w-2/3 max-h-[70vh] overflow-y-auto pr-4 hide-scrollbar">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, idx) => (
              <AccordionItem key={idx} value={`item-${idx}`} className="border-white/10 mb-2">
                <AccordionTrigger className="text-left font-serif text-lg md:text-xl text-white/90 hover:text-primary data-[state=open]:text-primary py-6">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-sans leading-relaxed border-l-2 border-primary pl-6 ml-2 pb-6">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
