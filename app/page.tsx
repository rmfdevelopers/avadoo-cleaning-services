'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  ShieldCheck, 
  Settings, 
  Clock, 
  Search, 
  FileText, 
  Zap, 
  CheckCircle, 
  Home, 
  Users, 
  Phone, 
  Mail, 
  MapPin, 
  ImageOff, 
  Menu, 
  X, 
  ArrowRight, 
  CheckCheck, 
  Loader2,
  ChevronRight,
  Instagram
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: mono-accent

const brand = {
  name: "Avadoo Cleaning Services",
  tagline: "Pristine Spaces, Professional Standards",
  description: "Lagos's premier facility management and industrial cleaning partner, specializing in estate maintenance and precision fumigation for corporate and residential clients.",
  industry: "services",
  region: "Nigeria",
  currency: "₦"
};

const contact = {
  whatsapp: "2348000000000",
  instagram: "avadoocleaningservices",
  email: "info@avadoo.ng",
  address: "Victoria Island, Lagos, Nigeria"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1772001936267-b6058748eff4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBqYW5pdG9yJTIwY2xlYW5pbmclMjBtb2Rlcm4lMjBjb3Jwb3JhdGUlMjBvZmZpY2UlMjBsb2JieXxlbnwxfDB8fHwxNzc5MTg4NTg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  products: [
    "https://images.unsplash.com/photo-1739292774892-0bb523c51a34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBjbGVhbmluZyUyMGNyZXclMjBpbiUyMG1vZGVybiUyMExhZ29zJTIwYXBhcnRtZW50fGVufDF8MHx8fDE3NzkxODg1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1772299121503-cd62a57e3a26?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxjb21tZXJjaWFsJTIwd2FyZWhvdXNlJTIwcGVzdCUyMGNvbnRyb2wlMjBzcHJheWluZyUyMGRpc2luZmVjdGlvbiUyMHNlcnZpY2V8ZW58MXwwfHx8MTc3OTE4ODU5MHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1597201278257-3687be27d954?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxtYW5pY3VyZWQlMjBnYXJkZW4lMjBsYW5kc2NhcGUlMjBwcm9mZXNzaW9uYWwlMjBlc3RhdGUlMjBtYW5hZ2VtZW50JTIwc2VydmljZXxlbnwxfDB8fHwxNzc5MTg4NTkxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1694521787149-ee0b6a3d9f78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwdmFjdXVtaW5nJTIwY2xlYW4lMjBidWlsZGluZyUyMGNvbnN0cnVjdGlvbiUyMHNpdGUlMjBmaW5pc2h8ZW58MXwwfHx8MTc3OTE4ODU5Mnww&ixlib=rb-4.1.0&q=80&w=1080"
  ]
};

const products = [
  { name: "Executive Deep Cleaning", description: "Comprehensive top-to-bottom sanitization for luxury residential apartments and corporate offices.", price: "₦55,000", image: IMAGES.products[0] },
  { name: "Industrial Fumigation", description: "Hospital-grade pest control and disinfection services for warehouses and commercial estates.", price: "₦120,000", image: IMAGES.products[1] },
  { name: "Estate Grounds Management", description: "Full-scale facility maintenance including landscaping, waste management, and common area upkeep.", price: "₦350,000", image: IMAGES.products[2] },
  { name: "Post-Construction Scour", description: "Intensive debris removal and detailed cleaning for newly completed building projects.", price: "₦95,000", image: IMAGES.products[3] }
];

const features = [
  { title: "Vetted Professionals", description: "Every team member undergoes rigorous background checks and specialized technical training.", icon: ShieldCheck },
  { title: "Industrial Grade Equipment", description: "We utilize high-capacity machinery and eco-safe chemicals for superior results.", icon: Settings },
  { title: "24/7 Facility Support", description: "Round-the-clock management for estates and corporate headquarters to ensure zero downtime.", icon: Clock }
];

const testimonials = [
  { name: "Engr. Tunde Adebayor", text: "The only firm we trust with our estate's fumigation and common area maintenance. Absolutely thorough.", role: "Estate Manager, Lekki" },
  { name: "Mrs. Funke Williams", text: "Their post-construction cleaning saved our move-in schedule. Professional, punctual, and precise.", role: "Homeowner" },
  { name: "Chief Emeka Okafor", text: "Consistent quality for our corporate headquarters. They understand the nuances of industrial janitorial needs.", role: "COO, Logistics Firm" }
];

const processSteps = [
  { number: "01", title: "Site Inspection", description: "Comprehensive audit of the facility to identify specific cleaning and maintenance requirements.", icon: Search },
  { number: "02", title: "Custom Plan", description: "Developing a tailored service schedule that minimizes disruption while maximizing hygiene standards.", icon: FileText },
  { number: "03", title: "Execution", description: "Mobilization of specialized crews and industrial equipment for meticulous service delivery.", icon: Zap }
];

const stats = [
  { number: "500+", label: "Projects Completed" },
  { number: "12", label: "Estates Managed" },
  { number: "98%", label: "Client Retention" }
];

function SafeImage({ src, alt, fill, width, height, className, priority }: any) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-zinc-900 border border-white/5 ${className}`}>
        <ImageOff size={24} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill} 
      width={!fill ? width : undefined} 
      height={!fill ? height : undefined} 
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

const useTypewriter = (text: string, speed = 55) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { setDisplay(prev => prev + text.charAt(i)); i++; }
      else clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const typedHeadline = useTypewriter("Total Facility Care for Lagos's Elite Estates");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const heroReveal = useScrollReveal(0);
  const featureReveal = useScrollReveal();
  const productReveal = useScrollReveal();
  const processReveal = useScrollReveal();
  const aboutReveal = useScrollReveal();
  const testimonialReveal = useScrollReveal();
  const contactReveal = useScrollReveal();

  return (
    <main className="bg-black text-white selection:bg-primary/30">
      
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary flex items-center justify-center font-heading font-black text-white text-xl rounded">A</div>
            <span className="font-heading font-bold text-xl tracking-tight hidden sm:block uppercase italic">Avadoo</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Services', 'Process', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium text-white/70 hover:text-white transition-colors uppercase tracking-widest">{item}</a>
            ))}
            <a href="#contact" className="bg-accent text-white px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">
              Request Quote
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-8 flex flex-col shadow-2xl">
          <div className="flex justify-between items-center mb-12">
            <span className="font-heading font-black text-2xl italic italic uppercase">Avadoo</span>
            <button onClick={() => setIsMenuOpen(false)}><X size={32} /></button>
          </div>
          <div className="flex flex-col gap-8">
            {['Services', 'Process', 'About', 'Contact'].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-3xl font-heading font-bold">{item}</a>
            ))}
          </div>
          <div className="mt-auto space-y-4">
            <p className="text-white/60 text-sm">Sharp delivery, nationwide.</p>
            <a href="#contact" className="block w-full bg-white text-primary py-4 rounded-xl font-bold text-center">Get Started</a>
          </div>
        </div>
      </div>

      {/* Hero Section - Pattern HR-D */}
      <section id="home" ref={heroReveal.ref} className="min-h-screen flex flex-col justify-center bg-black px-6 overflow-hidden relative pt-20">
        <div className="absolute inset-0 opacity-25 grayscale mix-blend-screen pointer-events-none">
           <SafeImage src={IMAGES.hero} alt="Avadoo Facility Management" fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-grid pointer-events-none opacity-40" />
        <div className="absolute inset-0 bg-grain pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto w-full">
          <h1 className="font-heading text-[12vw] md:text-[8vw] font-black text-white leading-none tracking-tighter uppercase italic">
            {typedHeadline}<span className="text-primary animate-pulse">_</span>
          </h1>
          <div className="mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-10 border-t border-white/10 pt-10">
            <p className="text-white/45 text-lg md:text-xl max-w-lg leading-relaxed font-light">
              Lagos's premier facility management partner. High-end standards for industrial cleaning, estate maintenance, and precision fumigation.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 shrink-0">
              <a href="#contact" className="bg-primary text-white px-10 py-5 font-black text-lg
                shadow-[6px_6px_0px_rgba(0,71,171,0.5)]
                hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0px_rgba(0,71,171,0.5)]
                transition-all duration-200 uppercase tracking-widest">
                Request a Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* D-STAT Divider */}
      <div className="bg-accent py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20 text-center">
          {stats.map((s, i) => (
            <div key={i} className="px-8 py-4">
              <p className="text-4xl md:text-5xl font-black text-white tracking-tight">{s.number}</p>
              <p className="text-white/70 text-xs mt-2 font-mono uppercase tracking-[0.3em]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Features - Pattern F-BENTO */}
      <section id="services" ref={featureReveal.ref} className={`py-32 px-6 bg-zinc-950 transition-all duration-1000 ${featureReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-20">
            <span className="text-primary font-mono text-xs tracking-[0.5em] uppercase mb-4 block">Our Advantage</span>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white">Why Trust Avadoo?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-primary/5 rounded-3xl p-10 border border-primary/20
              hover:border-primary/50 transition-all duration-500 flex flex-col justify-between group min-h-[320px]">
              <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center
                group-hover:scale-110 transition-transform duration-500 group-hover:bg-primary/40">
                <ShieldCheck className="text-primary" size={32} />
              </div>
              <div>
                <h3 className="font-heading text-4xl font-black text-white uppercase italic">{features[0].title}</h3>
                <p className="text-white/50 mt-4 text-lg max-w-md">{features[0].description}</p>
              </div>
            </div>
            {features.slice(1).map((f, i) => (
              <div key={i} className="bg-white/5 rounded-3xl p-8 border border-white/5
                hover:bg-white/10 hover:border-white/15 transition-all duration-500 flex flex-col justify-between min-h-[320px] group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-accent transition-colors duration-500">
                  {i === 0 ? <Settings className="text-white/60 group-hover:text-white" size={24} /> : <Clock className="text-white/60 group-hover:text-white" size={24} />}
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-white uppercase italic">{f.title}</h3>
                  <p className="text-white/40 text-sm mt-3 leading-relaxed">{f.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products - Pattern P-ASYMMETRIC */}
      <section id="products" ref={productReveal.ref} className="py-32 px-6 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-6">
            <div className={`transition-all duration-700 ${productReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <span className="text-accent font-mono text-xs tracking-[0.5em] uppercase mb-4 block">Service Catalog</span>
              <h2 className="font-heading text-5xl md:text-7xl font-black text-white uppercase italic leading-none">Our Solutions</h2>
            </div>
            <p className="text-white/40 max-w-xs text-left md:text-right font-light leading-relaxed">
              Precision services tailored for Lagos's most demanding facility environments.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className={`md:col-span-7 group relative rounded-[2.5rem] overflow-hidden transition-all duration-1000 ${productReveal.isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
              <div className="relative h-[550px]">
                <SafeImage src={products[0].image} alt={products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-10 w-full">
                  <div className="flex justify-between items-end gap-4">
                    <div>
                      <h3 className="font-heading text-4xl font-black text-white uppercase italic">{products[0].name}</h3>
                      <p className="text-white/60 mt-4 text-lg line-clamp-2 max-w-sm">{products[0].description}</p>
                    </div>
                    <span className="text-primary font-black text-3xl font-mono shrink-0 mb-1">{products[0].price}</span>
                  </div>
                  <a href="#contact" className="mt-8 inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                    Inquire <ChevronRight size={18} />
                  </a>
                </div>
              </div>
            </div>
            <div className="md:col-span-5 flex flex-col gap-6">
              {products.slice(1, 4).map((p, i) => (
                <div key={i} className={`group relative rounded-[2rem] overflow-hidden flex-1 transition-all duration-1000 delay-${(i + 1) * 200} ${productReveal.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}>
                  <div className="relative h-full min-h-[220px]">
                    <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                    <div className="absolute inset-0 bg-black/70 group-hover:bg-black/50 transition-all duration-500" />
                    <div className="absolute inset-0 p-8 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <h3 className="font-heading text-xl font-bold text-white uppercase italic leading-tight max-w-[180px]">{p.name}</h3>
                        <span className="text-primary font-black font-mono">{p.price}</span>
                      </div>
                      <a href="#contact" className="text-xs text-white/50 group-hover:text-white transition-colors uppercase tracking-[0.3em] font-black flex items-center gap-2">
                        Details <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process - Bonus Section */}
      <section id="process" ref={processReveal.ref} className="py-32 px-6 bg-zinc-950">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-primary font-mono text-xs tracking-[0.5em] uppercase mb-4 block">Work Flow</span>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-white italic uppercase">The Avadoo Method</h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/20 to-transparent" />
            <div className="space-y-24">
              {processSteps.map((step, i) => (
                <div key={i} className={`flex flex-col md:flex-row gap-12 items-center group transition-all duration-1000 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''} ${processReveal.isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${i * 200}ms` }}>
                  <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="w-16 h-16 rounded-full bg-primary/20 border border-primary/30
                      flex items-center justify-center shrink-0 relative z-10 mb-6
                      group-hover:bg-primary group-hover:scale-110 transition-all duration-500 shadow-[0_0_30px_rgba(0,128,128,0.2)]">
                      <step.icon className="text-primary group-hover:text-white" size={24} />
                    </div>
                    <h3 className="font-heading text-3xl font-black text-white italic uppercase">{step.title}</h3>
                    <p className="text-white/40 mt-4 text-lg leading-relaxed max-w-sm">{step.description}</p>
                  </div>
                  <div className="hidden md:block w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - T-MASONRY */}
      <section id="testimonials" ref={testimonialReveal.ref} className="py-32 px-6 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
             <span className="text-accent font-mono text-xs tracking-[0.5em] uppercase mb-4 block">Social Proof</span>
             <h2 className="font-heading text-5xl md:text-6xl font-black text-white uppercase italic">Trusted by Lagos Leaders</h2>
          </div>
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {testimonials.map((t, i) => (
              <div key={i} className={`break-inside-avoid bg-zinc-900/50 p-10 rounded-[2rem] border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-all duration-700 ${testimonialReveal.isVisible ? 'animate-fadeIn' : 'opacity-0'}`} style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <p className="text-white/80 text-xl leading-relaxed italic relative z-10">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center justify-between border-t border-white/10 pt-8 mt-8 relative z-10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-lg">{t.name.charAt(0)}</div>
                    <div>
                      <p className="font-heading font-bold text-white uppercase tracking-tight">{t.name}</p>
                      <p className="text-white/40 text-xs mt-1 font-mono">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Pattern C2 */}
      <section id="contact" ref={contactReveal.ref} className="py-32 px-6 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-0 right-0 w-1/2 h-full bg-black/10 -skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto relative z-10 grid md:grid-cols-2 gap-20 items-center">
          <div className={`transition-all duration-1000 ${contactReveal.isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
            <ContactForm />
          </div>
          <div className={`text-left transition-all duration-1000 delay-300 ${contactReveal.isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
            <span className="bg-black/20 text-white px-4 py-1.5 rounded-full font-mono text-[10px] tracking-[0.3em] uppercase mb-6 inline-block">Proposal Request</span>
            <h2 className="font-heading text-6xl md:text-7xl font-black text-white mb-8 leading-none uppercase italic">Get a Corporate Proposal</h2>
            <p className="text-white/80 text-xl leading-relaxed max-w-md">Our team is ready to audit your facility and provide a comprehensive maintenance plan that aligns with global hygiene standards.</p>
            
            <div className="mt-12 space-y-6">
              {contact.whatsapp && (
                <a href={`https://wa.me/${contact.whatsapp}`} className="flex items-center gap-4 text-white hover:translate-x-2 transition-transform duration-300 group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20"><Phone size={20} /></div>
                  <span className="text-xl font-bold font-mono">{contact.whatsapp}</span>
                </a>
              )}
              {contact.email && (
                <a href={`mailto:${contact.email}`} className="flex items-center gap-4 text-white hover:translate-x-2 transition-transform duration-300 group">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20"><Mail size={20} /></div>
                  <span className="text-xl font-bold font-mono">{contact.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Pattern F1 */}
      <footer className="bg-black py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 bg-primary flex items-center justify-center font-heading font-black text-white text-xl rounded">A</div>
                <span className="font-heading font-bold text-xl tracking-tight uppercase italic">Avadoo</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed max-w-xs">{brand.description}</p>
            </div>
            
            <div className="md:col-span-1">
              <h4 className="font-heading font-bold text-white mb-8 uppercase tracking-widest text-xs">Sitemap</h4>
              <ul className="space-y-4">
                {['Services', 'Process', 'About', 'Contact'].map(link => (
                  <li key={link}><a href={`#${link.toLowerCase()}`} className="text-white/40 hover:text-primary transition-colors text-sm uppercase tracking-wide">{link}</a></li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-1">
              <h4 className="font-heading font-bold text-white mb-8 uppercase tracking-widest text-xs">Reach Out</h4>
              <div className="space-y-4 text-sm text-white/40">
                <p className="flex items-center gap-2"><MapPin size={16} className="text-primary" /> {contact.address}</p>
                <p className="flex items-center gap-2"><Phone size={16} className="text-primary" /> {contact.whatsapp}</p>
                <div className="flex gap-4 mt-6">
                  {contact.instagram && (
                    <a href={`https://instagram.com/${contact.instagram}`} className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary transition-all">
                      <Instagram size={18} />
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <h4 className="font-heading font-bold text-white mb-8 uppercase tracking-widest text-xs">Our Region</h4>
              <p className="text-white/40 text-sm italic">Lagos Island, Lekki, Victoria Island, and beyond. Professional standards, local expertise.</p>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-primary font-mono text-[10px] tracking-[0.4em] uppercase">Sharp delivery, nationwide.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-6">
            <p className="text-white/20 text-[10px] uppercase tracking-widest font-mono">
              &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
            <div className="flex gap-10">
              <a href="#" className="text-white/20 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/20 text-[10px] uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  if (sent) {
    return (
      <div className="bg-black/20 backdrop-blur-3xl p-12 rounded-[2.5rem] border border-white/10 shadow-2xl flex flex-col items-center justify-center text-center animate-scaleIn">
        <div className="w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-8 border border-white/20">
          <CheckCheck size={40} className="text-white" />
        </div>
        <h3 className="font-heading text-4xl font-black text-white mb-4 uppercase italic">Message Received</h3>
        <p className="text-white/70 max-w-sm text-lg font-light leading-relaxed">Thank you. An Avadoo representative will review your request and contact you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-black/40 backdrop-blur-3xl p-10 md:p-12 rounded-[3rem] border border-white/10 shadow-2xl relative">
      <div className="relative z-10">
        <h3 className="font-heading text-3xl font-black text-white mb-10 uppercase italic">Send an Inquiry</h3>
        <div className="space-y-6">
          {(['name', 'email', 'phone'] as const).map(field => (
            <div key={field} className="relative">
              <input
                type={field === 'email' ? 'email' : 'text'}
                placeholder={field === 'phone' ? 'Phone Number' : field.charAt(0).toUpperCase() + field.slice(1)}
                value={form[field]}
                onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                required={field !== 'phone'}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-white/30"
              />
            </div>
          ))}
          <div className="relative">
            <textarea 
              rows={4} 
              placeholder="Tell us about your facility..."
              value={form.message}
              onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
              required
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-sm outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-white/30"
            />
          </div>
        </div>
        <button type="submit" disabled={loading}
          className="w-full mt-10 bg-white text-primary py-5 rounded-2xl font-black text-lg uppercase tracking-[0.2em] hover:brightness-110 transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-4 group">
          {loading ? (
            <Loader2 className="animate-spin" size={24} />
          ) : (
            <>Submit Proposal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
          )}
        </button>
      </div>
    </form>
  );
}