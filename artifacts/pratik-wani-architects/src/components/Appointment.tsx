import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, MapPin, Phone, Mail, UploadCloud } from "lucide-react";

export default function Appointment() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", projectType: "", budget: "",
    timeline: "", location: "", message: "", files: [] as File[],
  });
  const [submitted, setSubmitted] = useState(false);

  const projectTypes = [
    "Residential Architecture", "Interior Design", "Commercial Architecture",
    "Villa / Bungalow", "Office Interiors", "Renovation", "3D Visualization", "Other",
  ];

  const budgetRanges = [
    "₹5 – 15 Lacs", "₹15 – 30 Lacs", "₹30 – 60 Lacs", "₹60 Lacs – 1 Cr", "₹1 Cr+",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="relative w-full bg-[#0d0c0b] flex flex-col">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 flex flex-col pt-28 px-6 md:px-14 lg:px-20 xl:px-24 max-w-[1400px] mx-auto w-full">
        {/* Header */}
        <div className="mb-8 md:mb-10">
          <div className="flex items-center gap-3 text-primary/60 mb-3">
            <div className="h-px w-8 bg-primary/50" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Get Started</span>
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-tight">
            Book Your <span className="text-primary italic">Free Consultation</span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground/70 font-light mt-3 max-w-xl">
            Tell us about your dream project. Our team will reach out within 24 hours.
          </p>
        </div>

        {/* Form + Contact */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16">
          {/* Form */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center mb-6">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif text-foreground mb-3">Thank you, {formData.name.split(" ")[0]}!</h3>
                  <p className="text-sm text-muted-foreground/80 max-w-sm">
                    Your consultation request has been received. We will contact you at{" "}
                    <span className="text-primary">{formData.email || formData.phone}</span> within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  {/* Step indicators */}
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3].map((s) => (
                      <div key={s} className="flex items-center gap-2">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-medium border transition-colors duration-300 ${
                          step >= s ? "bg-primary border-primary text-background" : "border-white/20 text-white/30"
                        }`}>
                          {step > s ? <Check className="w-3 h-3" /> : s}
                        </div>
                        {s < 3 && <div className={`h-px w-8 transition-colors duration-300 ${step > s ? "bg-primary" : "bg-white/10"}`} />}
                      </div>
                    ))}
                    <span className="text-xs text-muted-foreground/50 ml-2">Step {step} of 3</span>
                  </div>

                  {/* Step 1 */}
                  {step === 1 && (
                    <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] uppercase tracking-widest text-muted-foreground/60">Full Name *</label>
                          <input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/60 transition-colors"
                            placeholder="Your full name" />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] uppercase tracking-widest text-muted-foreground/60">Phone *</label>
                          <input required type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/60 transition-colors"
                            placeholder="+91 XXXXX XXXXX" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] uppercase tracking-widest text-muted-foreground/60">Email Address</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/60 transition-colors"
                          placeholder="your@email.com" />
                      </div>
                      <button type="button" onClick={() => formData.name && formData.phone && setStep(2)}
                        className="mt-2 self-start px-8 py-3 bg-primary text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-primary/90 transition-colors duration-300">
                        Continue
                      </button>
                    </motion.div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] uppercase tracking-widest text-muted-foreground/60">Project Type *</label>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {projectTypes.map((type) => (
                            <button key={type} type="button" onClick={() => setFormData({ ...formData, projectType: type })}
                              className={`px-3 py-2.5 text-[11px] border transition-all duration-300 text-left leading-snug ${
                                formData.projectType === type ? "border-primary bg-primary/15 text-primary" : "border-white/10 text-muted-foreground/70 hover:border-white/30"
                              }`}>
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] uppercase tracking-widest text-muted-foreground/60">Budget Range</label>
                        <div className="flex flex-wrap gap-2">
                          {budgetRanges.map((b) => (
                            <button key={b} type="button" onClick={() => setFormData({ ...formData, budget: b })}
                              className={`px-3 py-2 text-[11px] border transition-all duration-300 ${
                                formData.budget === b ? "border-primary bg-primary/15 text-primary" : "border-white/10 text-muted-foreground/70 hover:border-white/30"
                              }`}>
                              {b}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] uppercase tracking-widest text-muted-foreground/60">Project Location</label>
                        <input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                          className="bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/60 transition-colors"
                          placeholder="City / Area" />
                      </div>
                      <div className="flex gap-3 mt-2">
                        <button type="button" onClick={() => setStep(1)}
                          className="px-6 py-3 border border-white/15 text-white/50 text-xs uppercase tracking-[0.2em] hover:text-white hover:border-white/40 transition-colors duration-300">
                          Back
                        </button>
                        <button type="button" onClick={() => formData.projectType && setStep(3)}
                          className="px-8 py-3 bg-primary text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-primary/90 transition-colors duration-300">
                          Continue
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 */}
                  {step === 3 && (
                    <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex flex-col gap-4">
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] uppercase tracking-widest text-muted-foreground/60">Your Message</label>
                        <textarea rows={4} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="bg-white/[0.04] border border-white/10 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary/60 transition-colors resize-none"
                          placeholder="Tell us about your vision, requirements, or any specific ideas you have in mind..." />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] uppercase tracking-widest text-muted-foreground/60">Attach Files (optional)</label>
                        <label className="flex flex-col items-center justify-center gap-2 py-6 border border-dashed border-white/15 cursor-pointer hover:border-primary/40 transition-colors duration-300 bg-white/[0.02]">
                          <UploadCloud className="w-6 h-6 text-muted-foreground/40" />
                          <span className="text-xs text-muted-foreground/50">Drag & drop or click to upload</span>
                          <span className="text-[10px] text-muted-foreground/30 uppercase tracking-wider">Floor plans, inspiration, references</span>
                          <input type="file" className="hidden" multiple accept=".jpg,.jpeg,.png,.pdf,.dwg" onChange={(e) => setFormData({ ...formData, files: Array.from(e.target.files || []) })} />
                        </label>
                        {formData.files.length > 0 && (
                          <p className="text-xs text-primary/70">{formData.files.length} file(s) attached</p>
                        )}
                      </div>
                      <div className="flex gap-3 mt-2">
                        <button type="button" onClick={() => setStep(2)}
                          className="px-6 py-3 border border-white/15 text-white/50 text-xs uppercase tracking-[0.2em] hover:text-white hover:border-white/40 transition-colors duration-300">
                          Back
                        </button>
                        <button type="submit"
                          className="px-8 py-3 bg-primary text-background text-xs uppercase tracking-[0.2em] font-medium hover:bg-primary/90 transition-colors duration-300">
                          Submit Request
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Contact info */}
          <div className="lg:w-72 xl:w-80 flex-shrink-0 flex flex-col gap-6">
            <div className="border border-white/8 bg-white/[0.02] p-6 flex flex-col gap-5">
              <h3 className="text-sm font-serif text-foreground uppercase tracking-widest">Contact Us Directly</h3>
              <div className="flex flex-col gap-4">
                {[
                  { Icon: Phone, label: "Call / WhatsApp", value: "08668805662", href: "tel:08668805662" },
                  { Icon: Mail, label: "Email", value: "pratikwaniarchitects@gmail.com", href: "mailto:pratikwaniarchitects@gmail.com" },
                  { Icon: MapPin, label: "Studio", value: "Aurangabad, Maharashtra", href: "#" },
                  { Icon: Clock, label: "Studio Hours", value: "Mon – Sat, 10am – 7pm", href: "#" },
                ].map(({ Icon, label, value, href }) => (
                  <a key={label} href={href} className="flex items-start gap-3 group">
                    <Icon className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors mt-0.5 flex-shrink-0" />
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground/40 mb-0.5">{label}</div>
                      <div className="text-sm text-muted-foreground/80 group-hover:text-foreground transition-colors leading-snug">{value}</div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <a
              href="https://wa.me/918668805662?text=Hi%20Pratik%20Wani%20Architects%2C%20I%20am%20interested%20in%20a%20free%20consultation."
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2.5 py-3 bg-[#25D366]/10 border border-[#25D366]/30 text-[#25D366] text-xs uppercase tracking-[0.2em] hover:bg-[#25D366]/20 transition-all duration-300"
            >
              <span className="text-base">●</span>
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-16 border-t border-white/5 px-6 md:px-14 lg:px-20 xl:px-24 py-8">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-serif text-xl font-bold tracking-[0.2em] text-primary">PWA</span>
            <p className="text-xs text-muted-foreground/50 leading-relaxed max-w-[18ch]">Pratik Wani Architects — Where Architecture Meets Artistry.</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40 mb-1">Studio</span>
            <p className="text-xs text-muted-foreground/60">Aurangabad, Maharashtra</p>
            <p className="text-xs text-muted-foreground/60">Mon – Sat, 10am – 7pm</p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40 mb-1">Contact</span>
            <a href="tel:08668805662" className="text-xs text-muted-foreground/60 hover:text-primary transition-colors">08668805662</a>
            <a href="mailto:pratikwaniarchitects@gmail.com" className="text-xs text-muted-foreground/60 hover:text-primary transition-colors break-all">pratikwaniarchitects@gmail.com</a>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/40 mb-1">Follow</span>
            <a href="https://www.instagram.com/pratikwaniarchitects" target="_blank" rel="noreferrer" className="text-xs text-muted-foreground/60 hover:text-primary transition-colors">Instagram</a>
            <a href="https://www.facebook.com/pratikwaniarchitects" target="_blank" rel="noreferrer" className="text-xs text-muted-foreground/60 hover:text-primary transition-colors">Facebook</a>
          </div>
        </div>
        <div className="max-w-[1400px] mx-auto mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[10px] text-muted-foreground/30 tracking-wide">© 2025 Pratik Wani Architects. All rights reserved.</p>
          <p className="text-[10px] text-muted-foreground/20 tracking-wide">Aurangabad · Maharashtra · India</p>
        </div>
      </div>
    </div>
  );
}
