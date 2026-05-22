'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  CheckCheck, 
  Loader2, 
  ArrowRight, 
  ImageOff, 
  Menu, 
  X, 
  Leaf, 
  ShieldCheck, 
  Clock, 
  Settings2, 
  Users, 
  Award, 
  Shield, 
  Home, 
  Building2, 
  Droplets,
  Star,
  ChevronDown
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: dense
// Depth Treatment: glassmorphic
// Divider Style: D-STAT
// Typography Personality: refined

// --- Hooks ---

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
  }, []);
  return { ref, isVisible };
};

// --- Components ---

function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-primary via-primary/80 to-secondary/20 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

const BRIEF = {
  brand: {
    name: "Avadoo Cleaning Services",
    tagline: "Pristine Spaces, Professional Management",
    description: "Premium cleaning, fumigation, and facilities management solutions for homes, offices, and estates in Abuja.",
    industry: "services",
    region: "nigeria"
  },
  contact: {
    whatsapp: "2348132566416",
    instagram: "avadoocleaningservices",
    email: "",
    address: "Plot E178c, Orange Plaza Kurudu, Abuja"
  },
  colors: {
    primary: "#002147",
    secondary: "#87CEEB",
    accent: "#F8FAFC"
  }
};

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-primary/95 backdrop-blur-xl py-4 shadow-2xl border-b border-white/5' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-secondary flex items-center justify-center rounded-lg font-black text-primary text-xl">A</div>
            <span className="font-heading text-xl font-bold tracking-tight text-white hidden sm:block">AVADOO</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10">
            {['Services', 'About', 'Testimonials'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-white/70 hover:text-secondary transition-colors uppercase tracking-widest">
                {link}
              </a>
            ))}
            <a href="#contact" className="bg-secondary text-primary px-6 py-2.5 rounded-full font-bold text-sm hover:brightness-110 transition-all">
              Request a Quote
            </a>
          </div>

          <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${mobileMenu ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-xs bg-primary shadow-2xl transition-transform duration-500 flex flex-col p-8 ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
          <button className="self-end text-white mb-12" onClick={() => setMobileMenu(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8">
            {['Services', 'About', 'Testimonials', 'Contact'].map((link) => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenu(false)} className="text-2xl font-heading font-bold text-white border-b border-white/10 pb-4">
                {link}
              </a>
            ))}
          </div>
          <div className="mt-auto space-y-4">
             <p className="text-white/40 text-xs uppercase tracking-widest">Connect With Us</p>
             <div className="flex gap-4">
               <Instagram className="text-secondary" />
               <Phone className="text-secondary" />
             </div>
          </div>
        </div>
      </div>

      {/* Hero Section (HR-B) */}
      <section id="home" className="min-h-screen relative flex items-end pb-32 px-6 md:px-16 overflow-hidden">
        <SafeImage 
          src="https://images.unsplash.com/photo-1724906019868-93ad2c79414f" 
          alt="Avadoo Professional Cleaning" 
          fill 
          className="object-cover" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-transparent to-transparent" />
        
        <div className="relative z-10 max-w-4xl animate-slideUp">
          <h1 className="font-heading text-6xl md:text-[6.5rem] font-bold text-white leading-[0.85] tracking-tight">
            Redefining the <span className="text-secondary">Standard</span> of Cleanliness
          </h1>
          <p className="text-white/70 mt-8 text-xl max-w-xl leading-relaxed">
            {BRIEF.brand.description}
          </p>
          <div className="flex flex-wrap gap-5 mt-10">
            <a href="#contact" className="bg-secondary text-primary px-10 py-4 font-black text-lg
              hover:brightness-110 hover:scale-105 transition-all duration-300 rounded-full flex items-center gap-3">
              Request a Quote <ArrowRight size={20} />
            </a>
            <a href="#services" className="text-white border-b-2 border-white/30 pb-1
              hover:border-secondary hover:text-secondary transition-all font-medium self-center text-lg">
              Explore Our Services
            </a>
          </div>
        </div>
      </section>

      {/* Features Section (F-BENTO) */}
      <Features />

      {/* Divider D-STAT */}
      <div className="bg-secondary py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-primary/10 text-center">
          {[
            { number: '200+', label: 'Satisfied Clients' },
            { number: '50+',  label: 'Team Experts' },
            { number: '1000+', label: 'Projects Completed' }
          ].map((s, i) => (
            <div key={i} className="px-8 py-8 md:py-4">
              <p className="text-5xl font-heading font-bold text-primary tracking-tighter">{s.number}</p>
              <p className="text-primary/60 text-sm mt-1 font-bold uppercase tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Process Section (LIST) */}
      <Process />

      {/* Products/Services Section (P-ASYMMETRIC) */}
      <Products />

      {/* About Section (V3 Horizontal Split) */}
      <About />

      {/* Testimonials (T-MASONRY) */}
      <Testimonials />

      {/* Contact Section (C4 Full-bleed Accent) */}
      <Contact />

      {/* Footer (F2) */}
      <footer className="bg-primary pt-24 pb-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-secondary flex items-center justify-center rounded font-black text-primary">A</div>
                <span className="font-heading text-xl font-bold tracking-tight text-white">AVADOO</span>
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed mb-8">
                Abuja's premier choice for sophisticated facilities management and clinical-grade sanitation. Pristine spaces, guaranteed.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                  <Instagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-secondary hover:text-primary transition-all">
                  <Phone size={18} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li>Residential Deep Clean</li>
                <li>Post-Construction Cleaning</li>
                <li>Fumigation & Pest Control</li>
                <li>Estate Management</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6">Contact</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li className="flex items-start gap-3"><MapPin size={16} className="shrink-0 text-secondary" /> {BRIEF.contact.address}</li>
                <li className="flex items-center gap-3"><Phone size={16} className="shrink-0 text-secondary" /> {BRIEF.contact.whatsapp}</li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-white/20 text-xs uppercase tracking-[0.3em]">
              © {new Date().getFullYear()} Avadoo Cleaning Services. Sharp delivery, nationwide.
            </p>
            <div className="flex gap-8 text-[10px] uppercase tracking-widest text-white/20">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// --- Section Components ---

function Features() {
  const { ref, isVisible } = useScrollReveal();
  const features = [
    { title: "Eco-Friendly Products", description: "We use non-toxic, biodegradable chemicals safe for pets and children.", icon: Leaf },
    { title: "Certified Professionals", description: "Every member of our team is background-checked and expert-trained.", icon: ShieldCheck },
    { title: "24/7 Availability", description: "Round-the-clock support for facility emergencies and scheduling.", icon: Clock },
    { title: "Tailored Solutions", description: "Custom cleaning schedules designed to fit your specific lifestyle.", icon: Settings2 }
  ];

  return (
    <section id="features" ref={ref} className="py-28 px-6 bg-primary">
      <div className="max-w-6xl mx-auto">
        <h2 className={`font-heading text-5xl md:text-6xl font-bold text-white mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Why Choose <span className="text-secondary">Avadoo?</span>
        </h2>
        <p className={`text-white/40 mb-14 text-lg transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          Setting the benchmark in Abuja&apos;s facility management industry.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={`md:col-span-2 bg-white/5 rounded-[2.5rem] p-10 border border-white/10
            hover:border-secondary/40 transition-all duration-500 flex flex-col justify-between group min-h-[300px] ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center
              group-hover:scale-110 transition-transform duration-300">
              <Shield size={32} className="text-secondary" />
            </div>
            <div>
              <h3 className="font-heading text-4xl font-bold text-white">Clinical Perfection</h3>
              <p className="text-white/50 mt-4 text-lg leading-relaxed max-w-xl">
                We don&apos;t just clean; we sanitize. Our methodology ensures that harmful pathogens and microscopic dust are eliminated from your workspace and home.
              </p>
            </div>
          </div>
          {features.map((f, i) => (
            <div key={i} className={`bg-white/5 rounded-[2.5rem] p-8 border border-white/8
              hover:bg-white/10 hover:border-white/15 transition-all duration-300 flex flex-col justify-between min-h-[280px] group
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              style={{ transitionDelay: `${(i + 2) * 150}ms` }}>
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-secondary group-hover:text-primary transition-colors">
                <f.icon size={24} />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-white">{f.title}</h3>
                <p className="text-white/45 text-sm mt-2 leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { ref, isVisible } = useScrollReveal();
  const steps = [
    { number: "01", title: "Inspection", description: "Comprehensive site walkthrough to identify focus areas and specific requirements." },
    { number: "02", title: "Planning", description: "Custom resource allocation and scheduling strategy for zero disruption." },
    { number: "03", title: "Execution", description: "Systematic deep clean or facility maintenance by our specialized task force." },
    { number: "04", title: "Quality Audit", description: "Final assessment to ensure our Avadoo signature standard is met." }
  ];

  return (
    <section ref={ref} className="py-28 px-6 bg-[#001835]">
      <div className="max-w-5xl mx-auto">
        <h2 className={`font-heading text-5xl font-bold text-white mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          Our Methodology
        </h2>
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-secondary/40 via-secondary/10 to-transparent hidden md:block" />
          <div className="space-y-12">
            {steps.map((step, i) => (
              <div key={i} className={`flex gap-8 items-start group transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}
                style={{ transitionDelay: `${i * 150}ms` }}>
                <div className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/30
                  flex items-center justify-center shrink-0 relative z-10
                  group-hover:bg-secondary group-hover:border-secondary transition-all duration-300">
                  <span className="font-heading font-bold text-secondary group-hover:text-primary transition-colors text-sm">
                    {step.number}
                  </span>
                </div>
                <div className="pt-2">
                  <h3 className="font-heading text-2xl font-bold text-white group-hover:text-secondary transition-colors">{step.title}</h3>
                  <p className="text-white/50 mt-2 leading-relaxed max-w-2xl">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Products() {
  const { ref, isVisible } = useScrollReveal();
  const products = [
    { name: "Residential Deep Clean", description: "A comprehensive top-to-bottom sanitization of your living space.", price: "₦45,000", url: "https://images.unsplash.com/photo-1778062863058-63b7a27a9770" },
    { name: "Post-Construction Cleaning", description: "Removal of debris, dust, and paint stains for new buildings.", price: "₦180,000", url: "https://images.unsplash.com/photo-1694521787799-ad4ad241cb39" },
    { name: "Fumigation & Pest Control", description: "Advanced chemical treatment to eliminate pests and termites.", price: "₦35,000", url: "https://images.unsplash.com/photo-1772164521253-4d27835f6fac" },
    { name: "Estate Management", description: "Full-service facility maintenance and security coordination.", price: "₦150,000", url: "https://images.unsplash.com/photo-1639774275491-71d62502a4e0" }
  ];

  return (
    <section id="services" ref={ref} className="py-28 px-6 bg-primary">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-14">
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-white max-w-sm leading-tight">Our <span className="text-secondary">Services</span></h2>
          <p className="text-white/40 max-w-xs text-right hidden md:block uppercase tracking-widest text-xs font-bold">Expert Care For Your Space</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className={`md:col-span-7 group relative rounded-[2rem] overflow-hidden transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
            <div className="relative h-[500px]">
              <SafeImage src={products[0].url} alt={products[0].name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/20 to-transparent" />
              <div className="absolute bottom-0 p-10">
                <h3 className="font-heading text-4xl font-bold text-white">{products[0].name}</h3>
                <div className="flex items-center justify-between mt-4">
                  <p className="text-white/70 text-lg line-clamp-2 max-w-md">{products[0].description}</p>
                  <span className="text-secondary font-bold text-2xl ml-4 shrink-0">{products[0].price}</span>
                </div>
                <a href="#contact" className="inline-block mt-8 bg-secondary text-primary px-8 py-3
                  rounded-full font-bold hover:brightness-110 transition">Book Now</a>
              </div>
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col gap-6">
            {products.slice(1, 3).map((p, i) => (
              <div key={i} className={`group relative rounded-[2rem] overflow-hidden h-[240px] transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`} style={{ transitionDelay: `${(i+1) * 200}ms` }}>
                <SafeImage src={p.url} alt={p.name} fill className="object-cover group-hover:scale-105 transition-transform duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 p-6 w-full">
                  <h3 className="font-heading text-2xl font-bold text-white">{p.name}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-secondary font-bold">{p.price}</span>
                    <a href="#contact" className="text-xs text-white/60 hover:text-secondary transition uppercase tracking-widest font-bold">Inquire →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, isVisible } = useScrollReveal();
  return (
    <section id="about" ref={ref} className="py-28 px-6 bg-primary border-y border-white/5">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <div className="relative aspect-square max-w-md">
            <div className="absolute inset-0 bg-secondary/10 rounded-[3rem] rotate-6 border border-secondary/20" />
            <div className="relative h-full w-full rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
              <SafeImage src="https://images.unsplash.com/photo-1772001936267-b6058748eff4" alt="Abuja Modern Office" fill className="object-cover" />
            </div>
            <div className="absolute -bottom-10 -right-10 bg-primary/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] shadow-2xl hidden lg:block">
               <p className="text-4xl font-heading font-bold text-secondary">Abuja&apos;s</p>
               <p className="text-white/60 uppercase tracking-[0.3em] text-[10px] mt-1">Most Trusted Partner</p>
            </div>
          </div>
        </div>
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          <p className="text-secondary font-heading text-xs tracking-[0.4em] uppercase mb-6 font-bold">Our Story</p>
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-white leading-tight mb-8">
            Elevating Abuja&apos;s <span className="text-secondary">Hygiene</span> Standard
          </h2>
          <p className="text-white/60 text-xl leading-relaxed mb-10">
            Avadoo Cleaning Services provides high-end hygiene solutions, ensuring every environment we touch becomes a sanctuary of health and productivity. Based in Kurudu, we serve the entire Abuja metropolis with uncompromised precision.
          </p>
          <div className="space-y-6">
            {[
              { icon: Home, text: "Serving Premium Estates & Residential Clusters" },
              { icon: Building2, text: "High-Rise Commercial Facility Management" },
              { icon: Droplets, text: "Eco-Chemical Specialized Sanitization" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 text-white/80">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary">
                  <item.icon size={20} />
                </div>
                <span className="font-medium text-lg">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { ref, isVisible } = useScrollReveal();
  const reviews = [
    { name: "Chika Okoro", text: "Avadoo transformed our new office space. Their attention to detail during the post-construction clean was incredible.", role: "Business Owner" },
    { name: "Ibrahim Musa", text: "The fumigation service was thorough and professional. I haven't seen a single pest in months. Highly recommend.", role: "Estate Resident" },
    { name: "Funmi Adeyemi", text: "Best facility management team in Kurudu. They handle our estate security and cleaning with zero complaints.", role: "Homeowner" }
  ];

  return (
    <section id="testimonials" ref={ref} className="py-28 px-6 bg-[#001b3a]">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-5xl font-bold text-white text-center mb-16">Client Success Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((t, i) => (
            <div key={i} className={`bg-gradient-to-br from-white/5 to-white/2
              p-10 rounded-[2.5rem] border border-white/8 relative overflow-hidden group
              hover:border-secondary/25 transition-all duration-500
              ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-6 blur-sm'}`}
              style={{ transitionDelay: `${i * 150}ms` }}>
              <div className="flex gap-1 mb-8">
                {[1,2,3,4,5].map(n => <Star key={n} size={14} className="fill-secondary text-secondary" />)}
              </div>
              <p className="text-white/80 text-xl leading-relaxed italic mb-10">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-4 border-t border-white/10 pt-8">
                <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-xl border border-secondary/25">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-lg">{t.name}</p>
                  <p className="text-secondary/60 text-xs font-bold uppercase tracking-widest mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, isVisible } = useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-32 px-6 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[40%] h-full bg-white/10 -skew-x-12 translate-x-20" />
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 skew-y-0 translate-y-0' : 'opacity-0 skew-y-2 translate-y-8'}`}>
          <h2 className="font-heading text-6xl md:text-8xl font-black text-primary leading-none mb-12">
            Start Your <br /><span className="text-white">Transformation</span>
          </h2>
          <div className="space-y-8 border-l-4 border-primary/20 pl-8">
            <div>
               <p className="text-primary/60 text-xs font-bold uppercase tracking-widest mb-2">WhatsApp Us</p>
               <p className="text-primary text-2xl font-bold">{BRIEF.contact.whatsapp}</p>
            </div>
            <div>
               <p className="text-primary/60 text-xs font-bold uppercase tracking-widest mb-2">Location</p>
               <p className="text-primary text-2xl font-bold">{BRIEF.contact.address}</p>
            </div>
          </div>
        </div>

        <div className="w-full">
          {sent ? (
            <div className="flex flex-col items-center justify-center p-16 text-center animate-scaleIn bg-primary rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden min-h-[500px]">
              <div className="w-24 h-24 rounded-full bg-secondary/20 flex items-center justify-center mb-8 border border-secondary/40 relative z-10">
                <CheckCheck size={48} className="text-secondary" />
              </div>
              <h3 className="font-heading text-4xl font-bold text-white mb-4">Request Received</h3>
              <p className="text-white/60 max-w-sm text-lg">Thank you. Our facilities specialist will contact you shortly to schedule an inspection.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-primary p-10 md:p-12 rounded-[3rem] border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden transition-all duration-700">
              <div className="relative z-10">
                <h3 className="font-heading text-3xl font-bold text-white mb-10">Get a Free Inspection</h3>
                <div className="space-y-5">
                  {(['name', 'email', 'phone'] as const).map(field => (
                    <input
                      key={field}
                      type={field === 'email' ? 'email' : 'text'}
                      placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                      value={form[field]}
                      onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                      required={field !== 'phone'}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-base outline-none transition-all duration-300 focus:bg-white/10 focus:border-secondary focus:ring-1 focus:ring-secondary"
                    />
                  ))}
                  <textarea rows={4} placeholder="Specific needs (e.g. 3-Bedroom Deep Clean)"
                    value={form.message}
                    onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white placeholder-white/30 text-base outline-none resize-none transition-all duration-300 focus:bg-white/10 focus:border-secondary focus:ring-1 focus:ring-secondary"
                  />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full mt-10 bg-secondary text-primary py-5 rounded-2xl font-bold text-lg hover:brightness-110 hover:shadow-[0_0_30px_rgba(135,206,235,0.3)] transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3 group">
                  {loading ? (
                    <Loader2 className="animate-spin" size={24} />
                  ) : (
                    <>
                      Send Inquiry <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}