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
  Copy
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

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Briefcase Overview', icon: Briefcase, group: 'Intelligence' },
    { id: 'foundation', label: 'Brand Foundation', icon: BookOpen, group: 'Intelligence' },
    { id: 'strategy', label: 'Market Strategy', icon: Target, group: 'Intelligence' },
    { id: 'identity', label: 'Visual Identity', icon: Layout, group: 'Creative' },
    { id: 'logos', label: 'Logo Showcase', icon: ImageIcon, group: 'Creative' },
    { id: 'services', label: 'Service Catalog', icon: Compass, group: 'Product' },
    { id: 'assets', label: 'Content Assets', icon: ImageIcon, group: 'Product' },
  ];

  const tabGroups = [
    { id: 'Intelligence', label: 'Strategic Intelligence' },
    { id: 'Creative', label: 'Visual System' },
    { id: 'Product', label: 'Offerings & Assets' },
  ];

  return (
    <div className="flex min-h-screen bg-sand/20 font-sans selection:bg-orange selection:text-white">
      {/* --- SIDEBAR --- */}
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

        <nav className="flex-1 py-8 px-5 space-y-9 overflow-y-auto custom-scrollbar">
          {tabGroups.map((group) => (
            <div key={group.id} className="space-y-4">
              <h3 className="px-4 text-[9px] font-bold tracking-[0.3em] uppercase text-white/20">{group.label}</h3>
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
                          ? 'bg-orange text-midnight font-bold shadow-[0_4px_20px_rgba(249,115,22,0.3)] translate-x-1' 
                          : 'text-white/40 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Icon size={16} className={isActive ? 'text-midnight' : 'text-orange group-hover:scale-110 transition-transform'} />
                      <span className="text-[10px] tracking-widest uppercase truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

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
          <h2 className="text-lg font-serif font-bold text-white tracking-tight">WORLD <span className="text-orange">TRAVELER</span></h2>
          <select 
            value={activeTab} 
            onChange={(e) => setActiveTab(e.target.value)}
            className="bg-white/5 text-orange text-[10px] tracking-widest uppercase border border-orange/30 rounded px-3 py-1.5 outline-none"
          >
            {tabs.map(t => <option key={t.id} value={t.id}>{t.label}</option>)}
          </select>
        </div>

        <div className="relative z-10 p-6 md:p-12 lg:p-20">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <Section key="overview">
                <SectionHeader 
                  label="Welcome back, Explorer" 
                  title="Briefcase Overview"
                  subtitle="Your complete brand identity and strategic guidelines organized for easy access."
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-midnight text-white p-12 relative overflow-hidden"
                  >
                    <div className="absolute top-[-40px] right-[-40px] w-64 h-64 border border-orange/10 rounded-full" />
                    <div className="relative z-10">
                      <div className="text-5xl mb-6">🌏</div>
                      <h3 className="text-4xl font-serif font-bold mb-4 leading-tight">WORLD <span className="text-orange">TRAVELER</span></h3>
                      <p className="text-white/60 mb-8 font-serif italic text-lg leading-relaxed">
                        Travel & Tours — Empowering the world to move with purpose.
                      </p>
                      <div className="flex gap-12">
                        <div>
                          <div className="text-3xl font-serif font-bold text-orange">68</div>
                          <div className="text-[10px] uppercase tracking-widest opacity-40">Countries</div>
                        </div>
                        <div>
                          <div className="text-3xl font-serif font-bold text-orange">7</div>
                          <div className="text-[10px] uppercase tracking-widest opacity-40">Years</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <div className="bg-orange text-midnight p-12 flex flex-col justify-between">
                    <div>
                      <h4 className="text-[10px] font-bold tracking-[0.4em] uppercase mb-6">V2 Updates — May 2026</h4>
                      <ul className="space-y-4 text-sm font-medium leading-relaxed">
                        <li className="flex gap-3"><span>✦</span> Color system updated to "Explorer Palette"</li>
                        <li className="flex gap-3"><span>✦</span> Personality reinforced — jolly, fun, real</li>
                        <li className="flex gap-3"><span>✦</span> New "Logo Showcase" dedicated portal</li>
                        <li className="flex gap-3"><span>✦</span> Expanded Voice and Social Asset guides</li>
                      </ul>
                    </div>
                    <div className="mt-12 text-[10px] tracking-widest uppercase border border-midnight/20 p-4 text-center">
                      Pending final logo approval by Coach Katt
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { label: "Status", val: "Active Draft", color: "text-green-600" },
                    { label: "Version", val: "2.1.b", color: "text-midnight" },
                    { label: "Agency", val: "Travel and Tours - GHL Mastery Project", color: "text-orange" },
                  ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 shadow-sm">
                      <div className="text-[10px] uppercase tracking-widest text-midnight/30 mb-2">{stat.label}</div>
                      <div className={`text-xl font-serif font-bold ${stat.color}`}>{stat.val}</div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {activeTab === 'foundation' && (
              <Section key="foundation">
                <SectionHeader 
                  label="Our Core" 
                  title="Brand Foundation"
                  subtitle="Built across 68 countries by a founder who lived every moment."
                />
                
                <div className="bg-white p-12 mb-12 shadow-sm leading-relaxed text-lg font-serif text-midnight/80 space-y-6">
                  <p>Mohammed Asad Siddiqui didn't study travel from behind a desk. He lived it — in moments that quietly rewired how he saw the world and himself.</p>
                  <blockquote className="border-l-4 border-orange pl-8 py-4 my-10 text-2xl font-bold not-italic">
                    "The world does not just need more tourists. It needs more people who have been transformed by it."
                  </blockquote>
                  <p>World Traveler was built from that conviction — for the first-timer gripping their passport, the family taking that long-overdue trip, and the entrepreneur who realized the world is both the classroom and the reward.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   <div className="bg-midnight p-10 text-white">
                      <span className="text-[10px] tracking-widest uppercase text-orange mb-4 block">The Mission</span>
                      <p className="text-white/70 leading-relaxed font-serif text-xl italic">
                        To empower people to explore with purpose — providing seamless, affordable travel experiences that inspire growth.
                      </p>
                   </div>
                   <div className="bg-orange p-10 text-midnight">
                      <span className="text-[10px] tracking-widest uppercase text-white mb-4 block">The Vision</span>
                      <p className="leading-relaxed font-serif text-xl italic">
                        To be a globally recognized brand that transforms lives and builds a joyful community of world explorers.
                      </p>
                   </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-0.5 bg-midnight/10 border border-midnight/10">
                  {["Excellence", "Integrity", "Joy", "Service", "Empowerment", "Passion", "Purpose", "Innovation"].map((v, i) => (
                    <div key={i} className="bg-white p-6 hover:bg-orange hover:text-white transition-all cursor-default">
                      <div className="text-sm font-bold tracking-widest uppercase mb-1">{v}</div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {activeTab === 'identity' && (
              <Section key="identity">
                <SectionHeader label="Character & Visuals" title="Brand Identity" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                  <div className="space-y-4">
                    <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-6">Tone Scales</h4>
                    {[
                      { l: "Calm", r: "Exciting", p: 85 },
                      { l: "Formal", r: "Casual", p: 40 },
                      { l: "Affordable", r: "Premium", p: 65 },
                      { l: "Corporate", r: "Personal", p: 20 },
                    ].map((s, i) => (
                      <div key={i} className="bg-white p-6 flex flex-col gap-3">
                        <div className="flex justify-between text-[10px] uppercase tracking-widest text-midnight/40 font-bold">
                          <span>{s.l}</span>
                          <span>{s.r}</span>
                        </div>
                        <div className="h-1 bg-midnight/5 rounded-full relative">
                          <div className="h-full bg-orange rounded-full" style={{ width: `${s.p}%` }} />
                          <div className="absolute top-[-4px] w-3 h-3 bg-midnight border-2 border-orange rounded-full" style={{ left: `${s.p}%`, transform: 'translateX(-50%)' }} />
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-midnight p-10 text-white flex flex-col justify-center">
                    <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-8">Primary Archetype</h4>
                    <div className="text-4xl font-serif font-bold mb-4">The Jolly Guide</div>
                    <p className="text-white/50 leading-relaxed text-sm mb-8">
                      Genuinely happy, warm, and real. Like a friend who has been everywhere and can't wait to show you.
                    </p>
                    <div className="flex gap-3">
                       {['Jolly', 'Bold', 'Authentic'].map(t => <span key={t} className="text-[9px] border border-orange/50 text-orange px-3 py-1 uppercase tracking-widest">{t}</span>)}
                    </div>
                  </div>
                </div>

                <div className="mb-20">
                  <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-8">Explorer Palette</h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {[
                      { n: "Sunset Orange", hex: "#F97316", r: "Primary", h: "bg-orange" },
                      { n: "Midnight Navy", hex: "#0F172A", r: "Trust", h: "bg-midnight" },
                      { n: "Ocean Teal", hex: "#0F766E", r: "Growth", h: "bg-teal" },
                      { n: "Sand Beige", hex: "#F5E6CA", r: "Warmth", h: "bg-sand" },
                      { n: "Palm Green", hex: "#4D7C0F", r: "Nature", h: "bg-palm" },
                    ].map(c => (
                      <div key={c.hex} className="space-y-3 group">
                         <div className={`h-40 w-full ${c.h} shadow-lg relative overflow-hidden flex items-end p-4`}>
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
                      <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-6">Headlines</h4>
                      <p className="text-5xl font-serif font-bold text-midnight leading-tight">Cormorant Garamond — Bold, Timeless.</p>
                      <p className="text-xs opacity-50">Used for statements of fact, identity, and inspiration.</p>
                   </div>
                   <div className="space-y-6">
                      <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-6">Body & Interface</h4>
                      <p className="text-2xl font-sans font-medium text-midnight leading-tight">DM Sans — Clear, Modern, Reliable journeys.</p>
                      <p className="text-xs opacity-50">Used for functionality, data, and detailed descriptions.</p>
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'logos' && (
              <Section key="logos">
                <SectionHeader 
                  label="Asset Library" 
                  title="Logo System Showcase"
                  subtitle="A versatile set of marks designed for every medium from social media to large-scale print."
                />
                
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                  {logos.map((logo, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -4 }}
                      className="bg-white group overflow-hidden shadow-xl flex flex-col border border-midnight/5"
                    >
                      <div className="p-6 border-b border-sand flex justify-between items-center transition-colors group-hover:bg-midnight group-hover:text-white">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-midnight group-hover:text-orange transition-colors">Variant 0{i + 1}</span>
                        <div className="flex gap-2">
                           <button title="Upload/Replace" className="p-2 bg-sand/50 text-midnight hover:bg-orange hover:text-white transition-all rounded shadow-sm"><Upload size={12} /></button>
                           <button title="Save/Download" className="p-2 bg-sand/50 text-midnight hover:bg-orange hover:text-white transition-all rounded shadow-sm"><Download size={12} /></button>
                        </div>
                      </div>
                      <div className={`flex-1 flex items-center justify-center p-12 ${i % 2 === 0 ? 'bg-white' : 'bg-midnight'} min-h-[300px] relative`}>
                        <img 
                          src={logo} 
                          alt={`Logo variant ${i + 1}`} 
                          className={`max-w-full max-h-48 object-contain transition-transform duration-500 group-hover:scale-105 ${i % 2 === 0 ? 'mix-blend-multiply' : 'brightness-0 invert'}`}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-6 bg-sand/20 flex justify-between items-center">
                        <span className="text-[9px] tracking-widest uppercase text-midnight/40 font-mono">SRC: {logo}</span>
                        <span className="text-[8px] tracking-widest uppercase text-orange font-bold">Vector Ready</span>
                      </div>
                    </motion.div>
                  ))}
                  
                  {/* --- UPLOAD NEW ASSET CARD --- */}
                  <motion.button 
                    whileHover={{ y: -4, borderColor: '#F97316' }}
                    className="bg-white/50 border-2 border-dashed border-midnight/10 p-12 flex flex-col items-center justify-center text-center gap-6 group transition-all h-[426px]"
                  >
                    <div className="w-20 h-20 bg-sand rounded-full flex items-center justify-center text-midnight/20 group-hover:text-orange group-hover:bg-orange/10 transition-all shadow-inner">
                       <ImageIcon size={36} />
                    </div>
                    <div>
                       <div className="text-xs font-bold tracking-[0.2em] uppercase text-midnight">Add New Asset</div>
                       <p className="text-[10px] text-midnight/30 mt-2 font-medium">Drop SVG, PNG, or AI files here</p>
                    </div>
                    <div className="mt-4 px-6 py-2 border border-midnight/5 text-[9px] tracking-widest uppercase text-midnight/40 group-hover:bg-midnight group-hover:text-white transition-colors">
                      Browse Files
                    </div>
                  </motion.button>
                </div>

                <div className="mt-20 pt-20 border-t border-midnight/5">
                  <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-8">Social Media Marks</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      { name: "Facebook Mark", icon: Facebook, color: "text-[#1877F2]" },
                      { name: "Instagram Gradient", icon: Instagram, color: "text-[#E4405F]" },
                      { name: "YouTube Red", icon: Youtube, color: "text-[#FF0000]" },
                      { name: "Twitter / X", icon: Twitter, color: "text-black" },
                    ].map((mark, i) => (
                      <div key={i} className="bg-white p-8 border border-midnight/5 flex flex-col items-center justify-center gap-6 group hover:shadow-xl transition-all relative">
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button title="Replace" className="p-1.5 bg-midnight/5 text-midnight hover:bg-orange hover:text-white transition-all rounded"><Upload size={10} /></button>
                           <button title="Download" className="p-1.5 bg-midnight/5 text-midnight hover:bg-orange hover:text-white transition-all rounded"><Download size={10} /></button>
                        </div>
                        <div className={`w-16 h-16 flex items-center justify-center ${mark.color} transition-transform group-hover:scale-110`}>
                           <mark.icon size={40} />
                        </div>
                        <div className="text-[10px] font-bold tracking-widest uppercase text-midnight/40">{mark.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-32">
                   <SectionHeader label="Rules of Application" title="Logo Standards" />
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                      <div className="bg-white p-10 border border-midnight/5 group hover:shadow-xl transition-all">
                         <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-8">Clear Space</h4>
                         <div className="aspect-video bg-sand/20 flex items-center justify-center relative mb-8 overflow-hidden rounded-sm">
                            <div className="w-3/4 h-1/2 border border-dashed border-orange/40 flex items-center justify-center p-8 bg-white/80 shadow-inner relative">
                               <img src={logos[0]} className="max-h-full opacity-30 mix-blend-multiply" />
                               <div className="absolute -top-3 left-0 right-0 flex justify-center"><div className="w-full border-t border-orange/20" /></div>
                               <div className="absolute -bottom-3 left-0 right-0 flex justify-center"><div className="w-full border-t border-orange/20" /></div>
                            </div>
                            <div className="absolute top-4 left-4 text-[7px] uppercase tracking-widest text-orange font-bold bg-white px-2 py-1 rounded-sm shadow-sm">Safe Zone: 0.5x</div>
                         </div>
                         <div className="space-y-4">
                            <p className="text-sm font-bold text-midnight uppercase tracking-widest">Protective Boundary</p>
                            <p className="text-xs text-midnight/60 leading-relaxed italic">
                              Maintain a clear space around the logo equal to half the height of the "TRAVELER" wordmark. This ensures maximum visibility and impact across busy backgrounds and layouts.
                            </p>
                         </div>
                      </div>

                      <div className="bg-white p-10 border border-midnight/5 group hover:shadow-xl transition-all">
                         <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-8">Minimum Size</h4>
                         <div className="aspect-video bg-sand/20 flex flex-col items-center justify-center gap-10 mb-8 rounded-sm">
                            <div className="flex flex-col items-center gap-3">
                               <img src={logos[0]} className="w-40 opacity-80 mix-blend-multiply" />
                               <span className="text-[8px] text-midnight/40 tracking-[0.2em] font-bold uppercase">Print Output: 45mm Width</span>
                            </div>
                            <div className="flex flex-col items-center gap-3">
                               <img src={logos[0]} className="w-16 opacity-80 mix-blend-multiply" />
                               <span className="text-[8px] text-midnight/40 tracking-[0.2em] font-bold uppercase">Digital UI: 140px Width</span>
                            </div>
                         </div>
                         <div className="space-y-4">
                            <p className="text-sm font-bold text-midnight uppercase tracking-widest">Legibility Standards</p>
                            <p className="text-xs text-midnight/60 leading-relaxed italic">
                              To preserve the integrity of the stylized "TRAVELER" typography, the logo should never be scaled below these minimums. For micro-applications, use the simplified Globe icon.
                            </p>
                         </div>
                      </div>
                   </div>

                   <div className="mb-16">
                      <h4 className="text-[10px] tracking-widest uppercase text-red-500 font-bold mb-8">Incorrect Usage Examples</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                          { t: "Do Not Stretch", i: "Proportions", d: "Never stretch or compress the mark." },
                          { t: "Do Not Re-color", i: "Brand Palette", d: "Stick to the approved Explorer palette." },
                          { t: "Do Not Outline", i: "Visual Style", d: "Avoid adding strokes or outlines." },
                          { t: "Do Not Add Effects", i: "Clarity", d: "Shadows/glows must remain as designed." },
                        ].map((u, i) => (
                          <div key={i} className="bg-white border border-red-100 p-8 flex flex-col items-center justify-center text-center gap-6 group hover:bg-red-50 transition-colors">
                             <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                                <XCircle size={24} />
                             </div>
                             <div>
                                <div className="text-[10px] font-bold tracking-widest uppercase text-red-900 mb-2">{u.t}</div>
                                <p className="text-[9px] text-red-900/40 uppercase font-medium leading-tight">{u.d}</p>
                             </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>

                <div className="mt-12 bg-white border border-orange/20 p-8 flex gap-6 items-center">
                   <div className="text-2xl">🖋️</div>
                   <div className="text-sm font-medium italic text-midnight/60">
                     "Logo assets currently awaiting technical sign-off. High-resolution vector exports will be automatically provided upon final approval."
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'strategy' && (
              <Section key="strategy">
                <SectionHeader label="Positioning & Market" title="Targeting Strategy" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                  <div className="space-y-12">
                    <div className="bg-white p-10 border-l-4 border-orange group relative">
                       <button 
                         onClick={() => navigator.clipboard.writeText(`"For explorers who want travel that goes beyond the destination — World Traveler delivers life-changing experiences anchored in integrity and joy."`)}
                         className="absolute top-4 right-4 p-2 bg-sand/50 text-midnight/20 hover:bg-orange hover:text-white transition-all opacity-0 group-hover:opacity-100 rounded shadow-sm"
                         title="Copy Statement"
                       >
                         <Copy size={12} />
                       </button>
                       <h4 className="text-[10px] tracking-widest uppercase text-midnight/40 mb-6">Positioning Statement</h4>
                       <p className="font-serif text-2xl italic leading-relaxed text-midnight">
                         "For explorers who want travel that goes beyond the destination — <span className="text-orange">World Traveler</span> delivers life-changing experiences anchored in integrity and joy."
                       </p>
                    </div>
                    <div className="bg-midnight p-10 text-white">
                       <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-6">The Brand Promise</h4>
                       <p className="font-serif text-xl leading-relaxed text-white/70">
                         "We take care of every detail so you can be fully present for every moment. Your journey is in trusted, experienced hands."
                       </p>
                    </div>
                  </div>

                  <div>
                     <h4 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-8 text-center md:text-left">Target Market Segments</h4>
                     <div className="grid grid-cols-2 gap-4">
                        {[
                          { l: "First-timers", i: Globe },
                          { l: "Families", i: Users },
                          { l: "Entrepreneurs", i: Briefcase },
                          { l: "Corporates", i: Award },
                          { l: "OFW Families", i: Heart },
                          { l: "Students", i: BookOpen },
                          { l: "Budget Focus", i: Zap },
                          { l: "Premium Focus", i: Star },
                        ].map((m, i) => (
                          <div key={i} className="bg-white p-6 flex flex-col items-center justify-center text-center gap-3 hover:bg-orange group transition-all cursor-default">
                             <m.i size={20} className="text-orange group-hover:text-white transition-colors" />
                             <span className="text-[10px] font-bold tracking-widest uppercase text-midnight group-hover:text-white transition-colors">{m.l}</span>
                          </div>
                        ))}
                     </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-midnight/10 border border-midnight/10">
                   <div className="p-12 bg-white">
                      <h5 className="text-[10px] tracking-widest uppercase text-red-400 font-bold mb-8">What We Are NOT</h5>
                      <ul className="space-y-4 text-sm text-midnight/40">
                         <li>❌ Just a booking platform</li>
                         <li>❌ Cold, corporate, transactional</li>
                         <li>❌ All promo, no actual substance</li>
                         <li>❌ Stiff or unapproachable</li>
                      </ul>
                   </div>
                   <div className="p-12 bg-midnight text-white">
                      <h5 className="text-[10px] tracking-widest uppercase text-orange font-bold mb-8">What We ARE</h5>
                      <ul className="space-y-4 text-sm text-white/40">
                         <li>✅ A movement for purposeful travel</li>
                         <li>✅ A trusted guide with real credibility</li>
                         <li>✅ Premium yet approachable experience</li>
                         <li>✅ A voice that inspires, not just informs</li>
                      </ul>
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'services' && (
              <Section key="services">
                <SectionHeader label="How We Serve" title="Service Catalog" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 bg-white p-12 shadow-sm border-t-4 border-orange">
                   {[
                      "International Tour Packages", "Local Tour Packages", "Group Tours & Joiner Tours",
                      "Customized Private Tours", "Flight Booking Assistance", "Accommodation Booking",
                      "Visa Assistance", "Travel Insurance", "Corporate & Incentive Trips",
                      "Educational Tours", "Honeymoon Packages", "Family Vacations",
                      "Itinerary Planning", "Partner Opportunities"
                   ].map((s, i) => (
                      <div key={i} className="flex items-start gap-4 py-4 border-b border-sand last:border-0">
                         <div className="w-1.5 h-1.5 rounded-full bg-orange mt-2 shrink-0" />
                         <span className="text-sm font-semibold text-midnight/80">{s}</span>
                      </div>
                   ))}
                </div>
              </Section>
            )}

            {activeTab === 'assets' && (
              <Section key="assets">
                <SectionHeader label="Content Library" title="Social Assets" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                   <div className="bg-midnight p-12 text-white border-l-4 border-orange">
                      <h4 className="text-xl font-serif font-bold mb-4 text-orange">Client Testimonials</h4>
                      <p className="text-sm text-white/60 mb-8 leading-relaxed">
                         credibility is built on real stories. Use these as high-trust conversion touchpoints.
                      </p>
                      <ul className="space-y-3 text-xs tracking-widest uppercase text-white/40">
                         <li className="flex gap-2"><span>→</span> Video Testimonials (Priority)</li>
                         <li className="flex gap-2"><span>→</span> Transformation Stories</li>
                         <li className="flex gap-2"><span>→</span> Photo Reposts & Mentions</li>
                      </ul>
                   </div>
                   <div className="bg-white p-12 border-l-4 border-teal shadow-sm">
                      <h4 className="text-xl font-serif font-bold mb-4 text-teal">Travel Imagery</h4>
                      <p className="text-sm text-midnight/40 mb-8 leading-relaxed">
                        Asad's first-person travel content from 68 countries is the primary differentiator.
                      </p>
                      <ul className="space-y-3 text-xs tracking-widest uppercase text-midnight/30">
                         <li className="flex gap-2"><span>→</span> Destination Lifestyle Clips</li>
                         <li className="flex gap-2"><span>→</span> "Asad in Destination" Stills</li>
                         <li className="flex gap-2"><span>→</span> Cultural Deep-Dive Content</li>
                      </ul>
                   </div>
                </div>

                <div className="bg-sand p-10 flex flex-col items-center text-center">
                   <h4 className="text-[10px] tracking-widest uppercase text-midnight/40 font-bold mb-6">Asset Request Status</h4>
                   <p className="text-sm italic font-serif text-midnight/70 max-w-xl leading-relaxed">
                     "Travel photos, videos, and testimonials have been requested from Coach Katt. Assets will be organized by destination and format once received."
                   </p>
                </div>

                {/* --- DYNAMIC SOCIAL FEED --- */}
                <div className="mt-24">
                  <SectionHeader label="Real-time Engagement" title="Multi-Platform Social Sync" />
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                    {[
                      { platform: "Instagram", icon: Instagram, color: "bg-orange", handle: "@adventurerasad", status: "Active", url: "https://www.instagram.com/adventurerasad/" },
                      { platform: "Facebook", icon: Facebook, color: "bg-blue-600", handle: "World Traveler", status: "Connected", url: "https://www.facebook.com/profile.php?id=61573780471680" },
                      { platform: "YouTube", icon: Youtube, color: "bg-red-600", handle: "Adventurer Asad", status: "Syncing", url: "https://www.youtube.com/@AsadtheLionTravelover" },
                      { platform: "Twitter / X", icon: Twitter, color: "bg-black", handle: "@asad_travels", status: "Active", url: "#" },
                    ].map((item, i) => (
                      <a 
                        key={i}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white p-6 border border-midnight/5 hover:border-orange transition-all group shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-6">
                           <div className={`w-10 h-10 ${item.color} text-white rounded-lg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                              <item.icon size={20} />
                           </div>
                           <div className="flex items-center gap-1.5 pt-1">
                              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                              <span className="text-[7px] uppercase tracking-widest font-bold text-green-600">{item.status}</span>
                           </div>
                        </div>
                        <h5 className="font-bold text-[10px] tracking-widest uppercase text-midnight">{item.platform}</h5>
                        <p className="text-[9px] text-midnight/40 font-medium mt-0.5">{item.handle}</p>
                      </a>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[
                       { p: Instagram, color: "bg-orange/10", likes: "1.2k", coms: "84", cap: "68 countries down, forever to go." },
                       { p: Facebook, color: "bg-blue-600/5", likes: "5k", coms: "1.2k", cap: "New Group Tour announcement for 2026!" },
                       { p: Youtube, color: "bg-red-600/5", likes: "12k", coms: "3k", cap: "WATCH: 10 Days in Japan Vlog is LIVE." },
                       { p: Twitter, color: "bg-black/5", likes: "200", coms: "45", cap: "Quick update: Visa processes for Japan are now easier." },
                       { p: Instagram, color: "bg-orange/5", likes: "1.5k", coms: "98", cap: "Transformation starts when you leave your comfort zone." },
                       { p: Facebook, color: "bg-blue-600/5", likes: "2.1k", coms: "400", cap: "Check out common travel myths debunked here." },
                       { p: Youtube, color: "bg-red-600/5", likes: "8k", coms: "1.1k", cap: "Tutorial: Finding cheap flights like a pro." },
                       { p: Instagram, color: "bg-sand/20", likes: "3.2k", coms: "210", cap: "THANK YOU for 7 years of World Traveler! ❤️" },
                     ].map((item, i) => (
                       <motion.div 
                        key={i} 
                        whileHover={{ y: -4 }}
                        className={`aspect-square ${item.color} relative group cursor-pointer overflow-hidden border border-midnight/5`}
                       >
                          <div className="absolute top-3 right-3 text-midnight/20 z-10 group-hover:text-orange transition-colors">
                             <item.p size={14} />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center text-midnight/5 group-hover:scale-110 transition-transform duration-700">
                             <ImageIcon size={48} />
                          </div>
                          <div className="absolute inset-0 bg-midnight/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center">
                             <div className="flex gap-4 mb-4">
                                <div className="flex items-center gap-1 text-orange text-[10px] font-bold"><Heart size={14} fill="#F97316" /> {item.likes}</div>
                                <div className="flex items-center gap-1 text-white text-[10px] font-bold"><MessageSquare size={14} fill="white" /> {item.coms}</div>
                             </div>
                             <p className="text-white/80 text-[10px] font-serif italic leading-relaxed mb-4">"{item.cap}"</p>
                             <button className="text-[8px] tracking-widest uppercase text-orange font-bold border-b border-orange/30 pb-0.5 hover:border-orange transition-colors">View Link</button>
                          </div>
                       </motion.div>
                     ))}
                  </div>

                  <div className="mt-12 flex justify-center">
                    <button className="bg-midnight text-white px-8 py-4 text-[10px] tracking-[0.3em] uppercase font-bold hover:bg-orange transition-colors flex items-center gap-3">
                      Load More Posts <ChevronRight size={14} />
                    </button>
                  </div>
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
              <div className="text-[9px] tracking-widest uppercase text-midnight/20">© 2026 Travel and Tours - GHL Mastery Project / Siddiqui</div>
           </div>
        </footer>
      </main>
    </div>
  );
}
