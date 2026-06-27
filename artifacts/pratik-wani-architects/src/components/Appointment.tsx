import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, MapPin, Phone, Mail, UploadCloud } from "lucide-react";

export default function Appointment() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    service: "", projectType: "", budget: "",
    date: "", time: "",
    name: "", phone: "", email: "", location: "", notes: ""
  });

  const updateForm = (key: string, val: string) =>
    setFormData((prev) => ({ ...prev, [key]: val }));

  const nextStep = () => {
    if (step === 1 && (!formData.service || !formData.projectType || !formData.budget)) return;
    if (step === 2 && (!formData.date || !formData.time)) return;
    if (step === 3 && (!formData.name || !formData.phone)) return;
    setStep((s) => Math.min(s + 1, 4));
  };

  const submitForm = () => {
    setTimeout(() => setSubmitted(true), 800);
  };

  return (
    <div className="relative w-full md:h-full bg-[#0d0c0b] flex flex-col overflow-y-auto hide-scrollbar">
      {/* Form area */}
      <div className="flex-grow flex flex-col items-center pt-24 pb-16 px-6 md:px-20 max-w-5xl mx-auto w-full">

        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 text-primary/60 mb-4">
            <div className="h-[1px] w-3 bg-primary/60" />
            <span className="text-xs uppercase tracking-[0.2em] font-medium">Book a Consultation</span>
            <div className="h-[1px] w-3 bg-primary/60" />
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-foreground">Start Your Project</h2>
        </div>

        {!submitted ? (
          <div className="w-full bg-white/[0.02] border border-white/10 rounded-sm p-6 md:p-10 relative">
            {/* Step indicators */}
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-white/5 relative">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="flex flex-col items-center relative z-10 flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-serif mb-2 transition-colors ${
                      step >= num ? "bg-primary text-background" : "bg-white/10 text-white/40"
                    }`}
                  >
                    {step > num ? <Check size={16} /> : num}
                  </div>
                  <span
                    className={`text-[10px] uppercase tracking-wider hidden md:block ${
                      step >= num ? "text-primary" : "text-white/40"
                    }`}
                  >
                    {num === 1 ? "Project" : num === 2 ? "Schedule" : num === 3 ? "Details" : "Review"}
                  </span>
                </div>
              ))}
              <div className="absolute top-4 left-[12.5%] right-[12.5%] h-[1px] bg-white/10 z-0">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${((step - 1) / 3) * 100}%` }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="s1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <label className="text-sm text-muted-foreground uppercase tracking-wider mb-3 block">
                      Service Required
                    </label>
                    <select
                      className="w-full bg-transparent border border-white/20 p-4 text-white focus:border-primary outline-none font-sans"
                      value={formData.service}
                      onChange={(e) => updateForm("service", e.target.value)}
                    >
                      <option value="" disabled className="bg-black text-white/50">Select a service...</option>
                      <option value="Architecture" className="bg-black">Architectural Design</option>
                      <option value="Interior" className="bg-black">Interior Design</option>
                      <option value="Turnkey" className="bg-black">Turnkey Projects</option>
                      <option value="Consultation" className="bg-black">Consultation</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground uppercase tracking-wider mb-3 block">
                      Project Type
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {["Residential", "Commercial", "Villa", "Renovation"].map((type) => (
                        <div
                          key={type}
                          onClick={() => updateForm("projectType", type)}
                          className={`p-4 border text-center cursor-pointer transition-all text-sm ${
                            formData.projectType === type
                              ? "border-primary bg-primary/10 text-primary"
                              : "border-white/10 hover:border-white/30 text-white/70"
                          }`}
                        >
                          {type}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground uppercase tracking-wider mb-3 block">
                      Budget Range
                    </label>
                    <select
                      className="w-full bg-transparent border border-white/20 p-4 text-white focus:border-primary outline-none font-sans"
                      value={formData.budget}
                      onChange={(e) => updateForm("budget", e.target.value)}
                    >
                      <option value="" disabled className="bg-black text-white/50">Select range...</option>
                      <option value="<10L" className="bg-black">Under ₹10 Lakhs</option>
                      <option value="10-25L" className="bg-black">₹10–25 Lakhs</option>
                      <option value="25-50L" className="bg-black">₹25–50 Lakhs</option>
                      <option value="50-1Cr" className="bg-black">₹50 Lakhs–1 Crore</option>
                      <option value=">1Cr" className="bg-black">Above ₹1 Crore</option>
                    </select>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="s2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <label className="text-sm text-muted-foreground uppercase tracking-wider mb-3 block">
                      Select Date
                    </label>
                    <input
                      type="date"
                      className="w-full bg-transparent border border-white/20 p-4 text-white focus:border-primary outline-none"
                      value={formData.date}
                      onChange={(e) => updateForm("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground uppercase tracking-wider mb-3 block">
                      Select Time
                    </label>
                    <div className="flex flex-wrap gap-3">
                      {["10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"].map(
                        (time) => (
                          <div
                            key={time}
                            onClick={() => updateForm("time", time)}
                            className={`px-4 py-2 border rounded-full text-sm cursor-pointer transition-all ${
                              formData.time === time
                                ? "border-primary bg-primary text-black font-medium"
                                : "border-white/20 text-white/70 hover:border-white/50"
                            }`}
                          >
                            {time}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="s3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-5"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input
                      type="text"
                      placeholder="Full Name *"
                      className="bg-transparent border border-white/20 p-4 text-white focus:border-primary outline-none"
                      value={formData.name}
                      onChange={(e) => updateForm("name", e.target.value)}
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number *"
                      className="bg-transparent border border-white/20 p-4 text-white focus:border-primary outline-none"
                      value={formData.phone}
                      onChange={(e) => updateForm("phone", e.target.value)}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="bg-transparent border border-white/20 p-4 text-white focus:border-primary outline-none"
                    value={formData.email}
                    onChange={(e) => updateForm("email", e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Project Location / Address"
                    className="bg-transparent border border-white/20 p-4 text-white focus:border-primary outline-none"
                    value={formData.location}
                    onChange={(e) => updateForm("location", e.target.value)}
                  />
                  <textarea
                    placeholder="Additional Notes..."
                    rows={3}
                    className="bg-transparent border border-white/20 p-4 text-white focus:border-primary outline-none resize-none"
                    value={formData.notes}
                    onChange={(e) => updateForm("notes", e.target.value)}
                  />
                  <div className="border border-dashed border-primary/50 p-8 flex flex-col items-center justify-center text-primary/60 hover:bg-primary/5 hover:border-primary cursor-pointer transition-colors">
                    <UploadCloud size={32} className="mb-2" />
                    <span className="text-sm">Drop reference images or click to browse</span>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="s4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-6 text-white/80"
                >
                  <h3 className="text-2xl font-serif text-white mb-2">Review Details</h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8 bg-black/40 p-6 border border-white/5">
                    <div>
                      <span className="text-xs text-white/40 uppercase block mb-1">Service</span>
                      <span className="text-primary">{formData.service}</span>
                    </div>
                    <div>
                      <span className="text-xs text-white/40 uppercase block mb-1">Type</span>
                      <span>{formData.projectType}</span>
                    </div>
                    <div>
                      <span className="text-xs text-white/40 uppercase block mb-1">Schedule</span>
                      <span>{formData.date} at {formData.time}</span>
                    </div>
                    <div>
                      <span className="text-xs text-white/40 uppercase block mb-1">Contact</span>
                      <span>{formData.name}<br />{formData.phone}</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex justify-between mt-10 pt-6 border-t border-white/10">
              {step > 1 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="px-6 py-3 border border-white/20 hover:border-white/50 text-white/80 transition-colors uppercase tracking-widest text-sm"
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              {step < 4 ? (
                <button
                  onClick={nextStep}
                  className="px-8 py-3 bg-primary text-black font-medium hover:bg-primary/90 transition-colors uppercase tracking-widest text-sm"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={submitForm}
                  className="px-8 py-3 bg-primary text-black font-medium hover:bg-primary/90 transition-colors uppercase tracking-widest text-sm"
                >
                  Confirm Booking
                </button>
              )}
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full bg-white/[0.02] border border-primary/30 rounded-sm p-12 flex flex-col items-center text-center"
          >
            <div className="w-24 h-24 rounded-full bg-primary/20 text-primary flex items-center justify-center mb-6">
              <Check size={48} />
            </div>
            <h3 className="text-3xl font-serif text-white mb-3">Appointment Confirmed!</h3>
            <p className="text-white/60 mb-8 max-w-md mx-auto font-sans">
              Thank you, {formData.name}. We have received your request. Our team will contact you within
              24 hours to confirm the details.
            </p>
            <button
              onClick={() => { setSubmitted(false); setStep(1); }}
              className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-black transition-colors uppercase tracking-widest text-sm"
            >
              Book Another
            </button>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-[#060504] border-t border-primary/30 pt-14 pb-8 px-6 md:px-20 w-full flex-shrink-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          <div>
            <div className="font-serif text-4xl text-primary font-bold tracking-widest mb-4">PWA</div>
            <p className="text-white/60 italic font-serif text-lg mb-5">Where Architecture Meets Artistry</p>
            <div className="inline-flex items-center gap-2 px-3 py-1 border border-white/10 bg-white/5 rounded-full">
              <span className="text-primary text-xs">★</span>
              <span className="text-xs text-white/80">4.8 Rating · 27 Reviews</span>
            </div>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest text-sm mb-5 font-medium">Quick Links</h4>
            <ul className="space-y-3 text-white/50 text-sm">
              {["Home", "About", "Services", "Process", "Portfolio", "FAQ"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="hover:text-primary transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest text-sm mb-5 font-medium">Expertise</h4>
            <ul className="space-y-3 text-white/50 text-sm">
              <li>Architectural Design</li>
              <li>Interior Design</li>
              <li>Villa & Bungalow</li>
              <li>Commercial Spaces</li>
              <li>Turnkey Projects</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white uppercase tracking-widest text-sm mb-5 font-medium">Contact</h4>
            <ul className="space-y-4 text-white/60 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>Adalat Road, Chhatrapati Sambhajinagar, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <a href="tel:08668805662" className="hover:text-primary transition-colors">08668805662</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary shrink-0" />
                <a href="mailto:hello@pratikwaniarchitects.com" className="hover:text-primary transition-colors break-all">
                  hello@pratikwaniarchitects.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={18} className="text-primary shrink-0" />
                <span>Mon–Sat 10:00 AM – 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mb-10">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.7!2d75.3433!3d19.8762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDUyJzM0LjMiTiA3NcKwMjAnMzUuOSJF!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="240"
            style={{ border: 0, borderRadius: "4px", opacity: 0.8, filter: "grayscale(100%) invert(90%)" }}
            allowFullScreen
            loading="lazy"
          />
        </div>

        <div className="max-w-7xl mx-auto border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>© 2025 Pratik Wani Architects. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </div>
  );
}
