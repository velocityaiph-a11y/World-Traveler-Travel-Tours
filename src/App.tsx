import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Globe, 
  MapPin, 
  Compass, 
  CheckCircle2, 
  XCircle, 
  Palmtree, 
  Calendar, 
  Users, 
  ShieldCheck, 
  Zap, 
  Smile, 
  Heart, 
  Star,
  Quote,
  Instagram,
  Facebook,
  Youtube,
  Twitter,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Layout,
  Briefcase,
  Target,
  Image as ImageIcon,
  MessageSquare,
  Award,
  Hash,
  Upload,
  Download,
  Copy,
  Menu,
  X
} from 'lucide-react';

const logos = [
  'input_file_0.png',
  'input_file_1.png',
  'input_file_2.png',
  'input_file_3.png',
  'input_file_4.png',
  'input_file_5.png',
  'input_file_6.png',
  'input_file_7.png',
];

const Section = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string, key?: string }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`py-12 md:py-16 max-w-5xl mx-auto ${className}`}
  >
    {children}
  </motion.section>
);

const SectionHeader = ({ label, title, subtitle }: { label: string, title: string, subtitle?: string }) => (
  <div className="mb-12">
    <span className="text-[10px] font-semibold tracking-[0.3em] uppercase text-orange mb-4 block">
      {label}
    </span>
    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-midnight leading-tight mb-6">
      {title.split(' ').map((word, i) => (
        <span key={i} className={['TRAVELER', 'Transformation.', 'Story', 'Services', 'Identity', 'Voice', 'System', 'Palette', 'Strategy'].includes(word) ? "text-orange" : ""}>
          {word}{' '}
        </span>
      ))}
    </h2>
    <div className="w-12 h-0.5 bg-orange mb-8" />
    {subtitle && <p className="text-xl text-midnight/70 max-w-2xl font-serif italic">{subtitle}</p>}
  </div>
);

const SidebarContent = ({ activeTab, setActiveTab, tabs, tabGroups }: { 
  activeTab: string, 
  setActiveTab: (id: string) => void, 
  tabs: any[], 
  tabGroups: any[] 
}) => (
  <nav className="flex-1 py-8 px-5 space-y-9 overflow-y-auto custom-scrollbar">
    {tabGroups.map((group) => (
      <div key={group.id} className="space-y-4">
        <h3 className="px-4 text-[10px] font-bold tracking-[0.4em] uppercase text-white/20 font-bebas">{group.label}</h3>
        <div className="space-y-1">
          {tabs.filter(t => t.group === group.id).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-md transition-all duration-300 group ${
                  isActive 
                    ? 'bg-orange text-white font-bold shadow-[0_4px_20px_rgba(201,107,44,0.4)] translate-x-1' 
                    : 'text-white/40 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-orange group-hover:scale-110 transition-transform'} />
                <span className="text-[11px] tracking-widest uppercase truncate font-bebas">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    ))}
  </nav>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Briefcase Overview', icon: Briefcase, group: 'Strategy' },
    { id: 'audit', label: 'Strategic Audit', icon: Target, group: 'Strategy' },
    { id: 'audience', label: 'The Explorer', icon: Users, group: 'Strategy' },
    { id: 'dna', label: 'Brand DNA', icon: BookOpen, group: 'Core' },
    { id: 'visuals', label: 'Visual System', icon: Layout, group: 'Design' },
    { id: 'logos', label: 'Logo Showcase', icon: ImageIcon, group: 'Design' },
    { id: 'execution', label: 'Product & Social', icon: Compass, group: 'Product' },
  ];

  const tabGroups = [
    { id: 'Strategy', label: 'Strategic Intelligence' },
    { id: 'Core', label: 'Brand DNA' },
    { id: 'Design', label: 'Visual System' },
    { id: 'Product', label: 'Execution & Assets' },
  ];

  return (
    <div className="flex min-h-screen bg-sand/20 font-sans selection:bg-orange selection:text-white">
      {/* --- SIDEBAR --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-midnight/80 z-[60] lg:hidden backdrop-blur-sm"
            />
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[280px] bg-midnight z-[70] lg:hidden flex flex-col shadow-2xl"
            >
              <div className="p-8 border-b border-white/5 flex justify-between items-center bg-black/20">
                <h2 className="text-xl font-serif font-bold text-white tracking-tight">WORLD <span className="text-orange">TRAVELER</span></h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/40 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <SidebarContent activeTab={activeTab} setActiveTab={(id) => { setActiveTab(id); setIsMobileMenuOpen(false); }} tabs={tabs} tabGroups={tabGroups} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside className="w-72 bg-midnight fixed h-full z-50 flex flex-col hidden lg:flex shadow-2xl border-r border-white/5">
        <div className="p-8 pb-10 border-b border-white/5 bg-black/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2.5 h-2.5 bg-orange rounded-full animate-pulse shadow-[0_0_10px_#F97316]" />
            <span className="text-[9px] tracking-[0.4em] uppercase text-orange font-bold font-serif italic">MA Siddiqui</span>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white leading-tight tracking-tight">
            WORLD <span className="text-orange">TRAVELER</span>
          </h1>
          <p className="text-[8px] tracking-[0.5em] uppercase text-white/30 mt-2 font-medium">Internal Briefcase v2.1</p>
        </div>
        <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} tabGroups={tabGroups} />
        <div className="p-8 border-t border-white/5 bg-black/10">
          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center text-[10px] tracking-widest uppercase text-white/40">
              <span>Status</span>
              <span className="text-orange">Live Draft</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-orange" />
            </div>
            <p className="text-[9px] text-white/30 leading-relaxed italic">
              "68 countries, 7 years, one vision."
            </p>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 lg:ml-72 min-h-screen relative overflow-x-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-midnight p-6 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-white/40 hover:text-orange"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-serif font-bold text-white tracking-tight">WORLD <span className="text-orange">TRAVELER</span></h2>
          </div>
          <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse" />
          </div>
        </div>

        <div className="relative z-10 p-6 md:p-12 lg:p-20">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <Section key="overview">
                <SectionHeader 
                  label="Welcome back, Explorer" 
                  title="Briefcase Overview"
                  subtitle="Your complete branding identity and strategic guideline system, finalized for the GHL Mastery Project."
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-midnight text-white p-12 relative overflow-hidden"
                  >
                    <div className="absolute top-[-40px] right-[-40px] w-64 h-64 border border-orange/10 rounded-full" />
                    <div className="relative z-10">
                      <div className="text-5xl mb-6">🖋️</div>
                      <h3 className="text-4xl font-bebas tracking-widest font-bold mb-4 leading-tight">WORLD <span className="text-orange">TRAVELER</span></h3>
                      <p className="text-white/60 mb-8 font-serif italic text-lg leading-relaxed">
                        Travel & Tours — Helping modern travelers explore the world confidently.
                      </p>
                      <div className="flex gap-12">
                        <div>
                          <div className="text-3xl font-bebas font-bold text-orange">21.1k</div>
                          <div className="text-[10px] uppercase tracking-widest opacity-40">IG Followers</div>
                        </div>
                        <div>
                          <div className="text-3xl font-bebas font-bold text-orange">3.5k</div>
                          <div className="text-[10px] uppercase tracking-widest opacity-40">YouTube Subs</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <div className="bg-orange text-midnight p-12 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6 text-white/60">The Brand Mission</h4>
                      <p className="text-xl font-serif italic leading-relaxed mb-8">
                        "To empower individuals and families to explore the world with purpose through seamless, affordable, and unforgettable travel experiences."
                      </p>
                      <div className="h-px bg-midnight/10 mb-8" />
                      <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-4 text-white/60">Core Purpose</h4>
                      <p className="text-sm font-medium">To empower travelers through honest guidance, practical support, and memorable global experiences.</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                   <div className="bg-white p-8 border border-midnight/5 shadow-sm">
                      <div className="text-[10px] uppercase tracking-widest text-midnight/30 mb-2">Category</div>
                      <div className="text-xl font-bebas font-bold text-forest">Premium Accessible</div>
                   </div>
                   <div className="bg-white p-8 border border-midnight/5 shadow-sm">
                      <div className="text-[10px] uppercase tracking-widest text-midnight/30 mb-2">Positioning</div>
                      <div className="text-xl font-bebas font-bold text-midnight">Travel Beyond Destinations</div>
                   </div>
                   <div className="bg-white p-8 border border-midnight/5 shadow-sm">
                      <div className="text-[10px] uppercase tracking-widest text-midnight/30 mb-2">Status</div>
                      <div className="text-xl font-bebas font-bold text-orange">Final Presentation</div>
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'audit' && (
              <Section key="audit">
                <SectionHeader 
                  label="Brand Discovery" 
                  title="Strategic Brand Audit"
                  subtitle="Analyzing current perception, strengths, and market opportunities."
                />
                
                <div className="bg-white p-12 mb-12 shadow-sm border border-midnight/5">
                   <h3 className="text-2xl font-bebas tracking-widest mb-6">Current Brand Perception</h3>
                   <p className="text-midnight/70 font-serif italic text-lg leading-relaxed mb-8">
                     "World Traveller Travel & Tours is currently perceived as a creator-led travel brand built on authenticity, lived experience, and practical international travel guidance."
                   </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
                      {["Trust through experience", "Confidence", "Adventure with purpose", "Relatable stories", "Accessible travel"].map((p, i) => (
                        <div key={i} className="bg-sand/10 p-4 text-[10px] uppercase font-bold tracking-widest text-center border border-sand/30">{p}</div>
                      ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                   <div className="space-y-6">
                      <h4 className="text-[10px] tracking-widest uppercase text-forest font-bold mb-4">Existing Strengths</h4>
                      <div className="space-y-3">
                         {[
                           "Strong founder credibility through 68 countries",
                           "Authentic and grounded storytelling",
                           "Practical educational value for travelers",
                           "Masculine, adventurous, and confident energy",
                           "Experience-driven positioning"
                         ].map((s, i) => (
                           <div key={i} className="flex gap-3 text-sm items-start">
                              <CheckCircle2 size={16} className="text-forest mt-0.5" />
                              <span className="text-midnight/60 italic">{s}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-6">
                      <h4 className="text-[10px] tracking-widest uppercase text-red-800 font-bold mb-4">Current Weaknesses</h4>
                      <div className="space-y-3">
                         {[
                           "No cohesive visual identity system",
                           "Inconsistent layouts and typography",
                           "Creator identity overshadows the agency",
                           "Weak differentiation visually across platforms",
                           "Lacks scalable identity beyond founder"
                         ].map((s, i) => (
                           <div key={i} className="flex gap-3 text-sm items-start">
                              <XCircle size={16} className="text-red-800 mt-0.5" />
                              <span className="text-midnight/60 italic">{s}</span>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="bg-forest text-cream p-12 mb-20">
                   <h3 className="text-3xl font-bebas mb-6 tracking-widest">Market Gap & Opportunity</h3>
                   <p className="text-cream/80 text-lg font-serif italic leading-relaxed mb-8">
                     "There is currently no travel agency combining creator-led trust, premium-accessible presentation, and relatable travel experiences."
                   </p>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="p-8 border border-white/10 bg-white/5">
                         <h5 className="text-[10px] font-bold tracking-widest uppercase text-orange mb-4">Strategic Slot</h5>
                         <p className="text-sm font-medium">Position the brand as: “A trusted premium accessible travel brand helping aspiring travelers experience the world confidently.”</p>
                      </div>
                      <div className="p-8 border border-white/10 bg-white/5">
                         <h5 className="text-[10px] font-bold tracking-widest uppercase text-orange mb-4">Core Differentiator</h5>
                         <p className="text-sm font-medium">Selling confidence through lived experience. A guide who understands the fears and realities of exploration.</p>
                      </div>
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'dna' && (
              <Section key="dna">
                <SectionHeader 
                  label="Our Essence" 
                  title="Brand DNA"
                  subtitle="Defining the core mission, vision, and character that drives World Traveller."
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                   <div className="bg-forest text-cream p-12">
                      <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-6">Mission</h4>
                      <p className="text-xl font-serif italic leading-relaxed">
                        To empower individuals, families, entrepreneurs, and leaders to explore the world with purpose by providing seamless, affordable, and unforgettable travel experiences that inspire growth, connection, and transformation.
                      </p>
                   </div>
                   <div className="bg-midnight text-white p-12">
                      <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-6">Vision</h4>
                      <p className="text-xl font-serif italic leading-relaxed">
                        To become a globally recognized travel and tours brand that transforms lives through meaningful travel, builds a community of world explorers, and creates opportunities for financial freedom.
                      </p>
                   </div>
                </div>

                <div className="mb-20">
                   <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-8">Core Values</h4>
                   <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-midnight/10 border border-midnight/10">
                      {[
                        { v: "Excellence", d: "High-quality, reliable experiences." },
                        { v: "Integrity", "d": "Transparent pricing and honest service." },
                        { v: "Innovation", "d": "Creative packages and unique paths." },
                        { v: "Purpose", "d": "Travel that inspires growth and learning." },
                        { v: "Empowerment", "d": "Helping others travel and earn." },
                        { v: "Passion", "d": "Love for cultures and destinations." },
                        { v: "Service", "d": "Stress-free journeys, client first." },
                        { v: "Growth", "d": "Transformation through discovery." }
                      ].map((item, i) => (
                        <div key={i} className="bg-white p-6 hover:bg-forest hover:text-cream transition-all group">
                           <div className="text-sm font-bold tracking-widest uppercase mb-2">{item.v}</div>
                           <p className="text-[10px] text-midnight/40 italic group-hover:text-cream/60">{item.d}</p>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                   <div>
                      <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-8">Brand Personality</h4>
                      <div className="space-y-6">
                         {[
                           { t: "The Leader", d: "A strategist guiding every intentional journey." },
                           { t: "The Storyteller", d: "Turning trips into life-changing narratives." },
                           { t: "The Go-Getter", d: "Fearless in exploring new opportunities." },
                           { t: "The Servant-Leader", d: "Genuinely caring about client dreams." }
                         ].map((p, i) => (
                           <div key={i} className="flex gap-4 items-start">
                              <div className="w-8 h-8 rounded bg-forest/10 flex items-center justify-center shrink-0 text-forest font-bebas">{i+1}</div>
                              <div>
                                 <div className="font-bebas text-lg tracking-widest text-midnight">{p.t}</div>
                                 <p className="text-xs text-midnight/50 italic">{p.d}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="bg-sand/20 p-10 border border-sand/50">
                      <h4 className="text-[10px] tracking-widest uppercase text-midnight/40 font-bold mb-8">Brand Voice Guide</h4>
                      <div className="flex flex-wrap gap-2 mb-8">
                         {["Confident", "Human", "Educational", "Inspiring", "Grounded"].map(v => (
                           <span key={v} className="bg-midnight text-cream text-[9px] font-bold px-3 py-1 uppercase tracking-widest">{v}</span>
                         ))}
                      </div>
                      <p className="text-sm font-serif italic text-midnight/70 leading-relaxed mb-6">
                        "World Traveler sounds like a bold, trusted global guide helping travelers move with confidence, purpose, and unforgettable experiences."
                      </p>
                      <div className="space-y-2">
                         <div className="flex justify-between text-[8px] uppercase font-bold tracking-widest">
                            <span className="text-forest">Authentic</span>
                            <span className="text-midnight/30">Not Corporate</span>
                         </div>
                         <div className="h-1 bg-midnight/5 rounded-full overflow-hidden">
                            <div className="h-full bg-forest w-[85%]" />
                         </div>
                      </div>
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'visuals' && (
              <Section key="visuals">
                <SectionHeader label="Visual Strategy" title="Visual System" />
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                  <div className="space-y-4">
                    <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-6">Visual Mood Direction</h4>
                    <div className="bg-white p-8 border border-midnight/5 shadow-sm space-y-4">
                       <p className="text-sm font-bold uppercase tracking-widest text-forest">Modern Explorer / Premium Energy</p>
                       <p className="text-xs text-midnight/60 italic leading-relaxed">
                         The palette balances the stability of nature (forest) and the night (midnight) with high-visibility accents found in transit hubs. Cinematic, documentary-inspired, and authentic.
                       </p>
                    </div>
                  </div>
                  
                  <div className="bg-midnight p-10 text-white flex flex-col justify-center">
                    <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-8">Photography Direction</h4>
                    <div className="text-4xl font-bebas font-bold mb-4 tracking-widest uppercase">Cinematic Realism</div>
                    <p className="text-white/50 leading-relaxed text-sm mb-8">
                      Documentary-inspired moments. Airports, urban exploration, maps, passports, and street-level cultural immersion. Natural lighting only.
                    </p>
                    <div className="flex gap-3">
                       {['Authentic', 'Movement', 'Documentary'].map(t => <span key={t} className="text-[9px] border border-orange/50 text-orange px-3 py-1 uppercase tracking-widest">{t}</span>)}
                    </div>
                  </div>
                </div>

                <div className="mb-20">
                   <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-8">Primary Color Palette</h4>
                   <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                     {[
                       { n: "Deep Forest", hex: "#18392B", r: "Heritage", h: "bg-[#18392B]" },
                       { n: "Midnight Navy", hex: "#0D1B2A", r: "Tech/Gear", h: "bg-[#0D1B2A]" },
                       { n: "Sand Beige", hex: "#D6C2A1", r: "Tactical", h: "bg-[#D6C2A1]" },
                       { n: "Burnt Orange", hex: "#C96B2C", r: "Transit", h: "bg-[#C96B2C]" },
                       { n: "Off White", hex: "#F4F1EA", r: "Neutral", h: "bg-[#F4F1EA]" },
                     ].map(c => (
                       <div key={c.hex} className="space-y-3 group">
                          <div className={`h-40 w-full ${c.h} shadow-lg relative overflow-hidden flex items-end p-4 border border-midnight/5`}>
                             <button 
                               onClick={() => navigator.clipboard.writeText(c.hex)}
                               className="absolute inset-0 bg-midnight/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2"
                             >
                               <Copy size={20} />
                               <span className="text-[8px] font-bold tracking-widest uppercase">Copy HEX</span>
                             </button>
                          </div>
                          <div>
                             <div className="text-xs font-bold">{c.n}</div>
                             <div className="text-[9px] font-mono opacity-50 mb-1">{c.hex}</div>
                             <div className="text-[8px] tracking-widest uppercase text-orange font-bold">{c.r}</div>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-6">Headlines / Display</h4>
                      <p className="text-6xl font-bebas text-midnight leading-none">BEBAS NEUE — BOLD AUTHORITY.</p>
                      <p className="text-xs opacity-50 italic">All-caps, tight tracking, urgent and functional like a departure board.</p>
                   </div>
                   <div className="space-y-6">
                      <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-6">Body & Reading</h4>
                      <p className="text-2xl font-sans font-medium text-midnight leading-tight">Inter — Modern, accessible, clean readability across platforms.</p>
                      <p className="text-xs opacity-50 italic">Allows typography and imagery to do the heavy lifting.</p>
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'logos' && (
              <Section key="logos">
                <SectionHeader 
                  label="Brand Identity" 
                  title="Logo System & Guidelines"
                  subtitle="A sophisticated visual anchor that balances warm energy with professional authority."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                   <div className="bg-midnight text-white p-12 flex flex-col justify-between">
                      <div>
                         <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-8">Suggested Direction</h4>
                         <ul className="space-y-6">
                            {[
                              { t: "Custom Wordmark", d: "Unique typography treatment for 'World Traveller'." },
                              { t: "Monogram Symbol", d: "A compact 'WT' mark for social and icon use." },
                              { t: "Path Iconography", d: "Directional elements representing global movement." },
                              { t: "Geometric Mark", d: "Exploration-inspired shapes for a modern feel." }
                            ].map((item, i) => (
                              <li key={i} className="flex gap-4 items-start">
                                 <div className="w-1.5 h-1.5 bg-orange rotate-45 mt-2 shrink-0" />
                                 <div>
                                    <div className="font-bebas text-lg tracking-widest">{item.t}</div>
                                    <p className="text-[10px] text-white/40 italic">{item.d}</p>
                                 </div>
                              </li>
                            ))}
                         </ul>
                      </div>
                      <div className="mt-12 pt-8 border-t border-white/10 italic text-xs text-white/40">
                        "Minimal, bold, recognizable, and masculine. Avoiding generic globes or airplane icons."
                      </div>
                   </div>

                   <div className="space-y-12">
                      <div>
                         <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-8">Logo Aesthetic Role</h4>
                         <p className="text-sm font-serif italic text-midnight/70 leading-relaxed">
                           "This logo uses a sophisticated and high-contrast color palette that balances warm, energetic tones with cool, professional neutrals. It evokes both the excitement of a sunset and the reliability of a corporate brand."
                         </p>
                      </div>

                      <div className="bg-white p-8 border border-midnight/5 shadow-sm">
                         <h4 className="text-[10px] tracking-widest uppercase text-midnight/40 font-bold mb-6">Logo Color Roles</h4>
                         <div className="space-y-4">
                            {[
                              { c: "#122A44", n: "Deep Navy Blue", r: "Main typography & Compass needles" },
                              { c: "#E59623", n: "Golden Amber", r: "Outer frame & Sunset glow" },
                              { c: "#A1C9E5", n: "Sky Blue", r: "Water ripples & Highlights" },
                              { c: "#4A5B6D", n: "Slate Gray", r: "Mountain & Skyline shading" }
                            ].map((color, i) => (
                              <div key={i} className="flex items-center gap-4">
                                 <div className="w-10 h-10 shrink-0 border border-midnight/5" style={{ backgroundColor: color.c }} />
                                 <div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest">{color.n}</div>
                                    <p className="text-[9px] text-midnight/40">{color.r}</p>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>

                <div className="mb-20">
                   <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-12">Logo Typography & Scale</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                      <div className="space-y-8">
                         <div className="p-10 bg-white border border-midnight/5">
                            <span className="text-[10px] text-orange uppercase font-bold tracking-widest mb-4 block">Display / Headlines</span>
                            <div className="text-5xl font-serif font-bold text-midnight leading-tight mb-2 italic">Explore the World.</div>
                            <p className="text-[10px] text-midnight/40 font-bold uppercase tracking-widest">Cormorant Garamond — Bold, Elegant</p>
                         </div>
                         <div className="p-10 bg-midnight text-white">
                            <span className="text-[10px] text-orange uppercase font-bold tracking-widest mb-4 block">Body / UI</span>
                            <div className="text-xl font-sans font-medium mb-2 leading-relaxed">Seamless journeys crafted for you.</div>
                            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">DM Sans — Clean, Modern</p>
                         </div>
                      </div>

                      <div className="bg-sand/10 p-10 space-y-6">
                         <h5 className="text-[10px] tracking-widest uppercase text-midnight/40 font-bold">Standard Scale</h5>
                         <div className="space-y-6 border-l border-sand/50 pl-6">
                            {[
                               { l: "H1 Hero", s: "80px / 800", v: "Explore." },
                               { l: "H2 Section", s: "52px / 700", v: "Our Services" },
                               { l: "H3 Card", s: "28px / 700", v: "Tour Packages" },
                               { l: "Body", s: "18px / 400", v: "Seamless, affordable experiences." },
                               { l: "Button", s: "18px / 600", v: "Book Your Journey →" }
                            ].map((scale, i) => (
                               <div key={i}>
                                  <div className="flex justify-between items-baseline mb-1">
                                     <span className="text-[8px] uppercase tracking-widest font-bold text-midnight/40">{scale.l}</span>
                                     <span className="text-[8px] font-mono text-orange">{scale.s}</span>
                                  </div>
                                  <div className={`text-midnight truncate ${i === 0 ? 'text-2xl font-serif' : i === 1 ? 'text-xl font-serif' : i === 2 ? 'text-lg font-serif' : 'text-xs'}`}>
                                    {scale.v}
                                  </div>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                </div>

                <div className="bg-forest text-cream p-12 text-center">
                   <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-6">Moodboard Direction</h4>
                   <p className="text-xl font-serif italic text-cream/80 max-w-2xl mx-auto leading-relaxed mb-8">
                     "Modern explorer with masculine premium energy. Airports, movement, maps, and authentic street-level cultural immersion."
                   </p>
                   <div className="flex justify-center gap-4 flex-wrap">
                      {["Airports", "Urban", "Cinematic", "Authentic", "Rugged"].map(tag => (
                        <span key={tag} className="px-4 py-1 border border-cream/20 text-[9px] uppercase tracking-widest font-bold">{tag}</span>
                      ))}
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'audience' && (
              <Section key="audience">
                <SectionHeader 
                  label="Who We Serve" 
                  title="The Purpose-Driven Global Explorer"
                  subtitle="Research-backed persona representing the core World Traveller audience."
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                  <div className="lg:col-span-1">
                    <div className="bg-white p-8 border border-midnight/5 shadow-sm sticky top-32">
                       <div className="w-24 h-24 bg-sand/30 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">🧔</div>
                       <h3 className="text-2xl font-bebas tracking-widest text-center mb-1">Global Explorer</h3>
                       <p className="text-[10px] uppercase text-midnight/40 font-bold text-center tracking-widest mb-8">Primary Persona</p>
                       
                       <div className="space-y-4">
                          {[
                            { l: "Age", v: "27 to 42" },
                            { l: "Income", v: "Middle to Upper Middle" },
                            { l: "Mindset", v: "Experience Driven" },
                            { l: "Travel Style", v: "Organized, Comfortable" }
                          ].map((d, i) => (
                            <div key={i} className="flex justify-between border-b border-sand/30 pb-2">
                               <span className="text-[10px] uppercase tracking-widest text-midnight/30">{d.l}</span>
                               <span className="text-[10px] uppercase font-bold text-midnight">{d.v}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                           <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-6">Buying Triggers</h4>
                           <ul className="space-y-4 text-sm italic font-serif text-midnight/60 leading-relaxed text-left">
                              <li>• Founder’s real travel experience</li>
                              <li>• Honest recommendations</li>
                              <li>• Transparent expectations</li>
                              <li>• Educational travel content</li>
                              <li>• Human-centered guidance</li>
                           </ul>
                        </div>
                        <div>
                           <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-6">Emotional Drivers</h4>
                           <ul className="space-y-4 text-sm italic font-serif text-midnight/60 leading-relaxed text-left">
                              <li>• Wants confidence before travel</li>
                              <li>• Wants guidance from someone relatable</li>
                              <li>• Needs stress-free planning</li>
                              <li>• Seeks meaningful experiences</li>
                           </ul>
                        </div>
                     </div>

                     <div className="bg-midnight text-white p-10">
                        <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-6">Competitive Landscapes</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                           <div className="space-y-2">
                              <p className="text-orange text-xs font-bold uppercase tracking-widest">The Creators</p>
                              <p className="text-xs text-white/50 leading-relaxed italic">High trust, but hard to scale into professional services.</p>
                           </div>
                           <div className="space-y-2">
                              <p className="text-orange text-xs font-bold uppercase tracking-widest">The Platforms</p>
                              <p className="text-xs text-white/50 leading-relaxed italic">High convenience, but no human trust or emotional connection.</p>
                           </div>
                        </div>
                     </div>
                  </div>
                </div>
              </Section>
            )}

            {activeTab === 'execution' && (
              <Section key="execution">
                <SectionHeader label="Strategic Delivery" title="Product & Content" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                   <div className="bg-white p-10 border-t-4 border-forest shadow-sm leading-relaxed">
                      <h4 className="font-bebas text-2xl tracking-widest text-forest mb-6 uppercase">Service Catalog</h4>
                      <div className="grid grid-cols-1 gap-3">
                         {[
                            "International Tour Packages", "Local Tour Packages", "Group & Joiner Tours",
                            "Customized Private Tours", "Flight & Accommodation Assistance",
                            "Visa Assistance & Insurance", "Corporate & Incentive Trips",
                            "Partner Opportunities"
                         ].map((s, i) => (
                            <div key={i} className="flex items-center gap-3 py-2 border-b border-sand/30 last:border-0">
                               <div className="w-1 h-1 bg-orange rotate-45" />
                               <span className="text-xs font-bold text-midnight/80 uppercase tracking-widest">{s}</span>
                            </div>
                         ))}
                      </div>
                   </div>

                   <div className="space-y-6">
                      <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold">Content Pillar Strategy</h4>
                      <div className="grid grid-cols-1 gap-4">
                         {[
                           { t: "Travel Guidance", d: "Visas, tips, logistics, budgeting (30%)", p: "30%" },
                           { t: "Storytelling", d: "Cultural discovery & hidden gems (40%)", p: "40%" },
                           { t: "Honest Realities", d: "Warnings, expectations, truths (20%)", p: "20%" },
                           { t: "Founder Insights", d: "Personal growth & credibility (10%)", p: "10%" }
                         ].map((pillar, i) => (
                           <div key={i} className="bg-midnight p-6 text-white border border-white/5">
                              <div className="flex justify-between items-center mb-2">
                                 <span className="text-xs font-bebas tracking-widest text-orange uppercase">{pillar.t}</span>
                                 <span className="text-[10px] text-white/40">{pillar.p}</span>
                              </div>
                              <p className="text-[10px] text-white/50 italic font-serif">{pillar.d}</p>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="mb-20">
                   <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-8">Social Identity System</h4>
                   <div className="bg-forest p-12 text-cream">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                         <div className="space-y-6">
                            <p className="text-2xl font-serif italic text-cream/90">"Hook → Problem → Experience → Solution → CTA"</p>
                            <p className="text-xs leading-relaxed opacity-60">The primary Reel formula for high-engagement travel storytelling.</p>
                         </div>
                         <ul className="space-y-4">
                            {[
                              "Documentary-inspired Visual Style",
                              "Bold Sans-Serif Typography",
                              "Natural Light, Real Travel Moments",
                              "Masculine Composition & Color Grading"
                            ].map((u, i) => (
                              <li key={i} className="flex gap-4 items-center text-xs font-bold uppercase tracking-widest">
                                 <div className="w-1.5 h-1.5 bg-orange" />
                                 {u}
                              </li>
                            ))}
                         </ul>
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                   {[
                     { p: Instagram, likes: "1.2k", coms: "84", cap: "68 countries down, forever to go." },
                     { p: Facebook, likes: "5k", coms: "1.2k", cap: "New Group Tour announcement for 2026!" },
                     { p: Youtube, likes: "12k", coms: "3k", cap: "WATCH: 10 Days in Japan Vlog is LIVE." },
                     { p: Twitter, likes: "200", coms: "45", cap: "Quick update: Visa processes for Japan are now easier." },
                   ].map((item, i) => (
                     <motion.div 
                      key={i} 
                      whileHover={{ y: -4 }}
                      className="aspect-square bg-midnight relative group cursor-pointer overflow-hidden border border-white/5"
                     >
                        <div className="absolute top-3 right-3 text-white/20 z-10 group-hover:text-orange transition-colors">
                           <item.p size={14} />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center text-white/5 group-hover:scale-110 transition-transform duration-700">
                           <ImageIcon size={48} />
                        </div>
                        <div className="absolute inset-0 bg-midnight/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                           <div className="flex gap-4 mb-4">
                              <div className="flex items-center gap-1 text-orange text-[10px] font-bold"><Heart size={14} fill="#C96B2C" /> {item.likes}</div>
                              <div className="flex items-center gap-1 text-white text-[10px] font-bold"><MessageSquare size={14} fill="white" /> {item.coms}</div>
                           </div>
                           <p className="text-white/80 text-[10px] font-serif italic leading-relaxed">"{item.cap}"</p>
                        </div>
                     </motion.div>
                   ))}
                </div>
              </Section>
            )}
          </AnimatePresence>
        </div>

        {/* --- GLOBAL FOOTER --- */}
        <footer className="px-12 py-12 border-t border-midnight/5 text-center md:text-left">
           <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                 <div className="text-lg font-serif font-bold text-midnight mb-1">WORLD <span className="text-orange">TRAVELER</span></div>
                 <p className="text-[9px] tracking-widest uppercase text-midnight/40">Explore with Purpose. Experience Transformation.</p>
              </div>
              <div className="flex gap-4">
                 {[
                   { Icon: Facebook, url: "https://www.facebook.com/profile.php?id=61573780471680" },
                   { Icon: Instagram, url: "https://www.instagram.com/adventurerasad/" },
                   { Icon: Youtube, url: "https://www.youtube.com/@AsadtheLionTravelover" },
                   { Icon: Twitter, url: "#" },
                   { Icon: ExternalLink, url: "#" }
                 ].map((social, i) => (
                    <a 
                      key={i} 
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-8 h-8 rounded-full bg-midnight/5 flex items-center justify-center text-midnight/40 hover:bg-orange hover:text-white transition-all"
                    >
                      <social.Icon size={14} />
                    </a>
                 ))}
              </div>
              <div className="text-[9px] tracking-widest uppercase text-midnight/20">© 2026 Travel and Tours - GHL Mastery Project / Siddiqui - prepared by Jonnaliza Dy</div>
           </div>
        </footer>
      </main>
    </div>
  );
}
