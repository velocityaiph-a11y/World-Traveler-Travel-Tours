import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot, getDocFromServer } from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { db, auth, loginWithGoogle, logout, handleFirestoreError, OperationType } from './lib/firebase';
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
  Type,
  Upload,
  Download,
  Copy,
  Menu,
  X,
  LogIn,
  LogOut,
  Save,
  Loader2
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

const Section = ({ children, className = "", id = "", full = false }: { children: React.ReactNode, className?: string, id?: string, key?: string, full?: boolean }) => (
  <motion.section 
    id={id}
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`py-8 md:py-12 ${full ? 'w-full' : 'max-w-[1600px] px-4 md:px-8 lg:px-16 mx-auto'} ${className}`}
  >
    {children}
  </motion.section>
);

const SectionHeader = ({ label, title, subtitle }: { label: string, title: string, subtitle?: string }) => (
  <div className="mb-12">
    <span className="text-sm font-bold tracking-[0.3em] uppercase text-orange mb-4 block">
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
        <h3 className="px-4 text-sm font-bold tracking-[0.4em] uppercase text-white/20 font-bebas">{group.label}</h3>
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
                <span className="text-sm tracking-widest uppercase truncate font-bebas">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    ))}
  </nav>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('welcome');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const defaultLogos = [
    'input_file_0.png',
    'input_file_1.png',
    'input_file_2.png',
    'input_file_3.png'
  ];

  const [uploadedLogos, setUploadedLogos] = useState<(string | null)[]>(defaultLogos);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch Logos from Firestore
  const [logoSavedStatus, setLogoSavedStatus] = useState<'synced' | 'unsaved' | 'offline' | 'idle'>('idle');

  useEffect(() => {
    // Use onSnapshot for real-time updates
    const brandingDocRef = doc(db, 'branding', 'config');
    let retryCount = 0;
    const maxRetries = 3;
    let unsubscribe: () => void;

    const startListener = () => {
      console.log(`[Firebase] Initializing branding listener (Attempt ${retryCount + 1})...`);
      unsubscribe = onSnapshot(brandingDocRef, (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.logos && Array.isArray(data.logos)) {
            console.log("[Firebase] Branding synced successfully");
            const mergedLogos = [...defaultLogos];
            data.logos.forEach((logo, idx) => {
              if (logo && idx < mergedLogos.length) mergedLogos[idx] = logo;
            });
            setUploadedLogos(mergedLogos);
            setLogoSavedStatus('synced');
          } else {
            setLogoSavedStatus('unsaved');
          }
        } else {
          console.log("[Firebase] No remote branding config found; using defaults.");
          setLogoSavedStatus('unsaved');
        }
      }, (error) => {
        console.error("[Firebase] Sync error:", error.message);
        
        // Handle Permission Denied with retry (often rule propagation lag)
        if (error.message.toLowerCase().includes('permission') && retryCount < maxRetries) {
          retryCount++;
          console.warn(`[Firebase] Permission denied. Retrying in 5s... (${retryCount}/${maxRetries})`);
          setTimeout(startListener, 5000);
          return;
        }

        // Structured logging
        try {
          handleFirestoreError(error, OperationType.GET, 'branding/config');
        } catch (err) { }
        
        setLogoSavedStatus('offline');
      });
    };

    startListener();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const compressImage = (base64: string, maxWidth = 400, maxHeight = 400, quality = 0.2): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Fill with white first to ensure transparency is handled if converted to jpeg
          // but we prefer png/webp for logos.
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
        }
        
        // Use JPEG for maximum compression if it's over a certain size, 
        // but logos usually need transparency.
        // We'll stick to PNG/WebP but at much lower res.
        try {
          const webp = canvas.toDataURL('image/webp', quality);
          if (webp.length > 100) { 
            resolve(webp);
            return;
          }
        } catch (e) {}
        
        resolve(canvas.toDataURL('image/png'));
      };
      img.onerror = () => resolve(base64);
    });
  };

  const handleLogoUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File is too large. Please select a file under 5MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64String = reader.result as string;
        try {
          setIsSaving(true); // Show loader during compression
          const compressed = await compressImage(base64String);
          const newLogos = [...uploadedLogos];
          newLogos[index] = compressed;
          setUploadedLogos(newLogos);
        } catch (err) {
          console.error("Compression failed:", err);
        } finally {
          setIsSaving(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const saveLogosToFirebase = async () => {
    setIsSaving(true);
    setSaveStatus('idle');
    
    let currentUser = user;
    if (!currentUser) {
      try {
        currentUser = await loginWithGoogle();
        if (!currentUser) {
          setIsSaving(false);
          return;
        }
      } catch (err) {
        setIsSaving(false);
        return;
      }
    }
    
    const brandingDocRef = doc(db, 'branding', 'config');
    let totalSize = 0;
    try {
      // Small delay to ensure state is settled
      await new Promise(r => setTimeout(r, 100));
      
      totalSize = uploadedLogos.reduce((acc, logo) => acc + (logo ? logo.length : 0), 0);
      // Firestore limit is 1MB, but we'll try to be generous if possible 
      // or at least give a better error.
      const maxSize = 1048576; // 1MB exact

      console.log("Persistence Diagnostic:", {
        path: brandingDocRef.path,
        size: totalSize,
        user: currentUser?.email,
        uid: currentUser?.uid
      });

      if (totalSize > maxSize) {
        alert(`Logo data is too large (${(totalSize / 1024).toFixed(0)}KB). Firestore limits individual documents to 1MB. Please use smaller logo files.`);
        setIsSaving(false);
        return;
      }
      
      const savePromise = setDoc(brandingDocRef, {
        logos: uploadedLogos,
        updatedAt: serverTimestamp(),
        updatedBy: currentUser.uid,
        updatedByEmail: currentUser.email || 'unknown'
      }, { merge: true });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error("The database operation is taking too long. This may be due to a poor connection or large payload.")), 35000)
      );

      await Promise.race([savePromise, timeoutPromise]);

      console.log("Database write confirmed.");
      // Check if we can read it back to verify sync
      try {
        const verifySnap = await getDoc(brandingDocRef);
        console.log("Post-write verification snap exists:", verifySnap.exists());
      } catch (e) {
        console.warn("Could not verify write immediately, but it might have succeeded.");
      }

      setSaveStatus('success');
      setLogoSavedStatus('synced');
      setTimeout(() => setSaveStatus('idle'), 5000);
    } catch (error: any) {
      console.error("Critical storage error:", error);
      
      // Use our handleFirestoreError to get structured logs
      try {
        handleFirestoreError(error, OperationType.WRITE, 'branding/config');
      } catch (err) {
        // This is expected as handleFirestoreError throws
      }

      setSaveStatus('error');
      
      const errorMessage = error.message || String(error);
      const logInfo = {
        msg: errorMessage,
        code: error.code,
        userEmail: currentUser?.email,
        uid: currentUser?.uid,
        emailVerified: currentUser?.emailVerified,
        payloadSize: (totalSize / 1024).toFixed(1) + " KB",
        dbPath: brandingDocRef?.path || 'branding/config'
      };
      console.log("Persistence Failure Report:", logInfo);

      if (errorMessage.toLowerCase().includes('quota')) {
        alert("Daily database limit reached. Please try again tomorrow.");
      } else if (errorMessage.toLowerCase().includes('permission')) {
        alert(`Permission Denied (Firebase).
        
Current User: ${currentUser?.email || 'Logged Out'}
UID: ${currentUser?.uid || 'None'}

Please ensure the database rules allow this UID to write to 'branding/config'. If you just updated rules, wait 30 seconds and try again.`);
      } else if (errorMessage.toLowerCase().includes('timed out')) {
        alert("Network Timeout: The server is not responding fast enough. Try using smaller images.");
      } else {
        alert("Persistence Error: " + errorMessage + "\n\nPlease try again or use smaller files.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: 'welcome', label: 'Welcome (You are here)', icon: Compass, group: 'Intelligence' },
    { id: 'overview', label: 'Brand Overview', icon: Briefcase, group: 'Intelligence' },
    { id: 'audit', label: 'Brand Audit', icon: Target, group: 'Intelligence' },
    { id: 'market', label: 'Market Opportunity', icon: Target, group: 'Intelligence' },
    { id: 'audience', label: 'Audience Research', icon: Users, group: 'Intelligence' },
    { id: 'strategy', label: 'Brand Strategy', icon: BookOpen, group: 'Foundation' },
    { id: 'personality', label: 'Brand Personality', icon: Smile, group: 'Foundation' },
    { id: 'voice', label: 'Brand Voice Guide', icon: MessageSquare, group: 'Foundation' },
    { id: 'visuals', label: 'Mood Board Direction', icon: ImageIcon, group: 'Visuals' },
    { id: 'identity', label: 'Visual Identity System', icon: Layout, group: 'Visuals' },
    { id: 'logos', label: 'Logo Presentation', icon: ImageIcon, group: 'Visuals' },
    { id: 'applications', label: 'Brand Applications', icon: Layout, group: 'Execution' },
    { id: 'social', label: 'Social Media Identity', icon: Hash, group: 'Execution' },
    { id: 'web', label: 'Website Direction', icon: Globe, group: 'Execution' },
  ];

  const tabGroups = [
    { id: 'Intelligence', label: 'Strategic Intelligence' },
    { id: 'Foundation', label: 'Brand Foundation' },
    { id: 'Visuals', label: 'Visual Identity System' },
    { id: 'Execution', label: 'Brand Execution' },
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
              <div className="p-8 border-b border-white/5 flex flex-col bg-black/20">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-serif font-bold text-white tracking-tight uppercase">WORLD <span className="text-orange">TRAVELER</span></h2>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/40 hover:text-white">
                    <X size={20} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-orange rounded-full animate-pulse" />
                  <span className="text-sm tracking-[0.4em] uppercase text-orange font-bold font-serif italic">MA Siddiqui</span>
                </div>
              </div>
              <SidebarContent activeTab={activeTab} setActiveTab={(id) => { setActiveTab(id); setIsMobileMenuOpen(false); }} tabs={tabs} tabGroups={tabGroups} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <aside className="w-72 bg-midnight fixed h-full z-50 flex flex-col hidden lg:flex shadow-2xl border-r border-white/5">
        <div className="p-8 pb-10 border-b border-white/5 bg-black/20">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2.5 h-2.5 bg-orange rounded-full animate-pulse shadow-[0_0_10px_#F97316]" />
            <span className="text-sm tracking-[0.4em] uppercase text-orange font-bold font-serif italic">MA Siddiqui</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-white leading-tight tracking-tight uppercase">
            WORLD <span className="text-orange">TRAVELER</span>
          </h1>
          <p className="text-sm tracking-[0.4em] uppercase text-white/50 mt-4 font-medium">Internal Briefcase v2.1</p>
        </div>
        <div className="px-8 py-4 border-b border-white/5">
          {isLoading ? (
            <div className="flex items-center gap-2 text-white/40 text-sm">
               <Loader2 size={16} className="animate-spin text-orange" />
               <span>Verifying Authority...</span>
            </div>
          ) : user ? (
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <img src={user.photoURL || ""} alt={user.displayName || ""} className="w-8 h-8 rounded-full border border-orange/30" />
                <div className="flex flex-col">
                  <span className="text-xs text-white/80 font-bold uppercase tracking-widest truncate max-w-[120px]">{user.displayName}</span>
                  <span className="text-[10px] text-orange uppercase tracking-widest font-bold font-dm">Authenticated Admin</span>
                </div>
              </div>
              <button 
                onClick={() => logout()}
                className="flex items-center gap-2 text-white/40 hover:text-red-400 text-xs uppercase tracking-widest transition-colors mt-2"
              >
                <LogOut size={12} />
                <span>Revoke Access</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => loginWithGoogle()}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white/5 border border-white/10 text-white hover:bg-orange hover:shadow-[0_0_20px_rgba(201,107,44,0.3)] transition-all group"
            >
              <LogIn size={16} className="text-orange group-hover:text-white" />
              <span className="text-xs font-bold uppercase tracking-widest">Admin Auth</span>
            </button>
          )}
        </div>
        <SidebarContent activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} tabGroups={tabGroups} />
        <div className="p-8 border-t border-white/5 bg-black/10">
          <div className="bg-white/5 rounded-lg p-6 space-y-4">
            <div className="flex justify-between items-center text-sm tracking-widest uppercase text-white/50">
              <span>Status</span>
              <span className="text-orange">Live Draft</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} className="h-full bg-orange" />
            </div>
            <p className="text-sm text-white/50 leading-relaxed italic">
              "68 countries, 7 years, one vision."
            </p>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 lg:ml-72 min-h-screen relative overflow-x-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden bg-midnight p-6 flex justify-between items-center sticky top-0 z-50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 -ml-2 text-white/40 hover:text-orange"
            >
              <Menu size={24} />
            </button>
            <h2 className="text-lg font-serif font-bold text-white tracking-tight uppercase">WORLD <span className="text-orange">TRAVELER</span></h2>
          </div>
          <div className="w-8 h-8 rounded-full bg-orange/10 flex items-center justify-center">
             <div className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse" />
          </div>
        </div>

        <div className={`relative z-10 ${activeTab === 'welcome' ? 'p-0' : 'p-4 md:p-6 lg:p-8'}`}>
          <AnimatePresence mode="wait">
            {activeTab === 'welcome' && (
              <Section key="welcome" full className="min-h-screen flex flex-col justify-center py-0 md:py-0">
                 <div className="relative w-full min-h-screen flex items-center justify-center bg-midnight overflow-hidden">
                    {/* Background Visual */}
                    <div className="absolute inset-0 z-0 scale-105">
                       <img 
                          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80" 
                          alt="Explorer Hero" 
                          className="w-full h-full object-cover opacity-30 transform hover:scale-110 transition-transform duration-[10s]"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/60 to-transparent" />
                       <div className="absolute inset-0 bg-black/40" />
                    </div>

                    <div className="relative z-10 text-center max-w-6xl mx-auto px-8 py-24">
                       <motion.div
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
                       >
                          <div className="inline-flex items-center gap-4 mb-12 border border-white/10 px-8 py-2.5 bg-white/5 backdrop-blur-2xl rounded-full shadow-2xl">
                             <div className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse shadow-[0_0_12px_#F97316]" />
                             <span className="text-sm font-bold uppercase tracking-[0.6em] text-white/60">Project Briefing v2.10 • 2026</span>
                          </div>
                          
                          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-serif font-bold italic text-white leading-[0.9] mb-16 drop-shadow-2xl tracking-tighter">
                             The <span className="text-orange italic">World</span> <br className="hidden md:block" />
                             Traveler.
                          </h1>
                          
                          <div className="flex flex-col items-center mb-20">
                             <div className="w-12 h-px bg-orange/40 mb-10" />
                             <p className="text-2xl md:text-3xl font-serif italic text-white/50 max-w-3xl leading-relaxed">
                               "You’ve watched enough travel stories. <br className="hidden md:block" />
                               <span className="text-white text-3xl md:text-4xl">It’s time to live yours.</span>"
                             </p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-20">
                             {[
                               { t: "The Mission", d: "Transforming passive observers into purpose-driven explorers through authentic guidance.", i: Compass },
                               { t: "The Authority", d: "68 countries of real exploration. Not just aesthetics, but street-level intelligence.", i: ShieldCheck },
                               { t: "The Promise", d: "Confidence. We provide the systems and strategy for your global journey.", i: Star }
                             ].map((item, idx) => (
                               <motion.div 
                                 key={idx}
                                 initial={{ opacity: 0, x: -30 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 transition={{ delay: 0.6 + (idx * 0.15) }}
                                 className="p-10 border border-white/5 bg-white/[0.02] backdrop-blur-xl group hover:bg-white/[0.08] transition-all duration-700 relative overflow-hidden"
                               >
                                  <div className="absolute top-0 right-0 w-24 h-24 bg-orange/5 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-orange/10 transition-colors" />
                                  <div className="mb-8 w-12 h-12 flex items-center justify-center rounded-xl bg-midnight border border-white/10 group-hover:border-orange/50 transition-all">
                                     <item.i className="text-orange group-hover:scale-110 transition-transform" size={22} />
                                  </div>
                                  <h4 className="text-sm font-bold uppercase tracking-[0.4em] text-orange mb-5 flex items-center gap-3">
                                     <span className="opacity-50">0{idx+1}</span>
                                     <span className="italic">{item.t}</span>
                                  </h4>
                                  <p className="text-[13px] text-white/40 italic leading-relaxed font-serif group-hover:text-white/70 transition-colors">
                                     {item.d}
                                  </p>
                               </motion.div>
                             ))}
                          </div>

                          <motion.button 
                            onClick={() => setActiveTab('overview')}
                            whileHover={{ gap: '2rem' }}
                            className="group flex items-center gap-6 mx-auto text-white/30 hover:text-orange transition-all duration-500"
                          >
                             <span className="text-sm font-bold uppercase tracking-[0.6em] whitespace-nowrap">Begin The Journey</span>
                             <div className="w-16 h-px bg-white/20 group-hover:w-32 group-hover:bg-orange transition-all duration-500" />
                          </motion.button>
                       </motion.div>
                    </div>

                   {/* Scroll Indicator */}
                    <motion.div 
                       initial={{ opacity: 0 }}
                       animate={{ opacity: 1 }}
                       transition={{ delay: 2, duration: 1 }}
                       className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
                    >
                       <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-orange" />
                       <span className="text-sm uppercase tracking-[0.3em] text-white/50">Scroll to Explore</span>
                    </motion.div>
                 </div>
              </Section>
            )}

            {activeTab === 'overview' && (
              <Section key="overview">
                <SectionHeader 
                  label="Welcome back, Explorer" 
                  title="Confidence Through Experience"
                  subtitle="A trusted premium accessible travel brand helping modern travellers explore the world confidently through real experience and practical guidance."
                />
                
                <div className="mb-20">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-midnight text-white p-12 md:p-24 text-center relative overflow-hidden shadow-2xl border border-white/5"
                  >
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109c0f?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-overlay" />
                    <div className="relative z-10 max-w-5xl mx-auto">
                      <div className="w-16 h-0.5 bg-orange mx-auto mb-12" />
                      <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold italic text-white leading-tight mb-12">
                        "You’ve watched enough travel stories. <span className="text-orange">It’s time to live yours.</span>"
                      </h3>
                      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                        <div className="flex items-center gap-4">
                          <div className="text-4xl font-bebas font-bold text-orange">21.1k</div>
                          <div className="text-sm text-left uppercase tracking-widest opacity-40 leading-none">Global<br/>Followers</div>
                        </div>
                        <div className="w-px h-12 bg-white/10 hidden md:block" />
                        <div className="flex items-center gap-4">
                          <div className="text-4xl font-bebas font-bold text-orange">68</div>
                          <div className="text-sm text-left uppercase tracking-widest opacity-40 leading-none">Countries<br/>Explored</div>
                        </div>
                      </div>
                      <div className="p-8 bg-white/5 border border-white/10 backdrop-blur-md">
                        <p className="text-sm font-serif italic text-white/70 leading-relaxed">
                          Built by a globally experienced traveller for aspiring world explorers. We don't just sell destinations; we sell the confidence to start your own story.
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                  <div className="bg-forest text-cream p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Compass size={120} className="text-orange" />
                    </div>
                    <div className="relative z-10">
                      <h4 className="text-sm font-bold tracking-[0.4em] uppercase mb-6 text-orange">Agency Identity</h4>
                      <h3 className="text-4xl font-bebas tracking-widest font-bold mb-4 leading-tight uppercase">WORLD <span className="text-orange">TRAVELLER</span></h3>
                      <p className="text-cream/60 font-serif italic text-lg leading-relaxed">
                        Your travel guide turned trusted travel partner. Providing street-level intelligence for the purpose-driven explorer.
                      </p>
                    </div>
                  </div>

                  <div className="bg-orange text-midnight p-12 flex flex-col justify-between shadow-xl">
                    <div>
                      <h4 className="text-sm font-bold tracking-[0.4em] uppercase mb-6 text-white/60">Strategic Position</h4>
                      <p className="text-2xl font-serif font-bold italic leading-tight mb-8">
                        The "Premium Accessible" Category Leader.
                      </p>
                    </div>
                    <div className="space-y-4">
                      {["Authentic Experience", "Practical Guidance", "Cultural Immersion"].map(val => (
                        <div key={val} className="flex items-center gap-3 border-t border-midnight/10 pt-3">
                          <div className="w-1.5 h-1.5 bg-midnight rounded-full" />
                          <span className="text-sm font-bold uppercase tracking-widest">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                   <div className="bg-white p-8 border border-midnight/5 shadow-sm">
                      <div className="text-sm uppercase tracking-widest text-midnight/30 mb-2">Category</div>
                      <div className="text-xl font-bebas font-bold text-forest">Premium Accessible</div>
                   </div>
                   <div className="bg-white p-8 border border-midnight/5 shadow-sm">
                      <div className="text-sm uppercase tracking-widest text-midnight/30 mb-2">Core Differentiator</div>
                      <div className="text-xl font-bebas font-bold text-midnight">Confidence Through Lived Experience</div>
                   </div>
                   <div className="bg-white p-8 border border-midnight/5 shadow-sm">
                      <div className="text-sm uppercase tracking-widest text-midnight/30 mb-2">Strategic Essence</div>
                      <div className="text-xl font-bebas font-bold text-orange">"Travel Beyond Destinations"</div>
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'audit' && (
              <Section key="audit">
                <SectionHeader 
                  label="Strategic Insights" 
                  title="Brand Audit"
                  subtitle="Analyzing current perception, strengths, and existing brand equity."
                />
                
                <div className="bg-white p-12 mb-12 shadow-sm border border-midnight/5">
                   <h3 className="text-2xl font-bebas tracking-widest mb-6 uppercase">Current Brand Perception</h3>
                   <p className="text-midnight/70 font-serif italic text-lg leading-relaxed mb-8">
                     "Built on authenticity, lived experience, and practical travel guidance. The founder’s credibility comes from real-world exploration rather than highly polished influencer aesthetics."
                   </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-20">
                      {[
                        { t: "Trust through experience", c: "bg-forest/5" },
                        { t: "Practical guidance", c: "bg-orange/5" },
                        { t: "Adventure with purpose", c: "bg-forest/5" },
                        { t: "Relatable storytelling", c: "bg-orange/5" },
                        { t: "Accessible exploration", c: "bg-forest/5" }
                      ].map((p, i) => (
                        <div key={i} className={`p-4 text-sm uppercase font-bold tracking-widest text-center border border-midnight/5 ${p.c}`}>{p.t}</div>
                      ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                   <div>
                      <h4 className="text-sm tracking-widest uppercase text-forest font-bold mb-6">Brand Strengths</h4>
                      <ul className="space-y-4">
                         {[
                           "Strong founder credibility through extensive international travel",
                           "Authentic and grounded storytelling",
                           "Practical educational value for first-time travellers",
                           "Strong audience trust from creator content",
                           "Masculine, adventurous, and confident energy"
                         ].map((s, i) => (
                           <li key={i} className="flex gap-4 text-sm items-start">
                              <CheckCircle2 size={16} className="text-forest mt-0.5 shrink-0" />
                              <span className="text-midnight/60 italic leading-relaxed">{s}</span>
                           </li>
                         ))}
                      </ul>
                   </div>
                   <div>
                      <h4 className="text-sm tracking-widest uppercase text-red-800 font-bold mb-6">Brand Weaknesses</h4>
                      <ul className="space-y-4">
                         {[
                           "No cohesive visual identity system",
                           "Creator identity overshadows the agency brand",
                           "Raw content style lowers perceived premium quality",
                           "Weak differentiation visually across platforms",
                           "Premium positioning is not reflected consistently"
                         ].map((s, i) => (
                           <li key={i} className="flex gap-4 text-sm items-start">
                              <XCircle size={16} className="text-red-800 mt-0.5 shrink-0" />
                              <span className="text-midnight/60 italic leading-relaxed">{s}</span>
                           </li>
                         ))}
                      </ul>
                   </div>
                </div>

                <div className="bg-sand/10 p-12 border border-sand/30">
                   <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-8">Existing Opportunities</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex gap-4 items-start">
                         <Star size={14} className="text-orange mt-1 shrink-0" />
                         <p className="text-sm font-serif italic text-midnight/70 leading-relaxed">Own the “premium-accessible” travel category by combining creator trust with professional service presentation.</p>
                      </div>
                      <div className="flex gap-4 items-start">
                         <Star size={14} className="text-orange mt-1 shrink-0" />
                         <p className="text-sm font-serif italic text-midnight/70 leading-relaxed">Expand into curated tours and guided travel experiences that provide street-level travel intelligence.</p>
                      </div>
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'market' && (
              <Section key="market">
                <SectionHeader 
                  label="Competitive Landscape" 
                  title="Market Opportunity"
                  subtitle="Identifying the market gap between generic platforms and personal creators."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                   <div className="bg-white p-10 border border-midnight/5 shadow-sm">
                      <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-8">Competitor Categories</h4>
                      <div className="space-y-8">
                         <div className="pb-8 border-b border-sand">
                            <p className="text-sm font-bold uppercase tracking-widest text-midnight mb-2">Personality-Led Creators</p>
                            <p className="text-sm text-midnight/50 italic mb-4">Examples: Drew Binsky, Bald and Bankrupt, Nas Daily</p>
                            <div className="flex gap-4">
                               <div className="text-sm text-forest font-bold uppercase font-sans">Strengths: Trust/Authentic</div>
                               <div className="text-sm text-red-800 font-bold uppercase font-sans">Weaknesses: Scale/Execution</div>
                            </div>
                         </div>
                         <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-midnight mb-2">Transactional Platforms</p>
                            <p className="text-sm text-midnight/50 italic mb-4">Examples: Expedia, Traveloka, Klook</p>
                            <div className="flex gap-4">
                               <div className="text-sm text-forest font-bold uppercase font-sans">Strengths: Convenience/Inventory</div>
                               <div className="text-sm text-red-800 font-bold uppercase font-sans">Weaknesses: Connection/Trust</div>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="bg-midnight text-white p-10 flex flex-col justify-between">
                      <div>
                         <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-8">Market Gap Analysis</h4>
                         <div className="space-y-4 mb-8">
                            {[
                              "No agency combining creator-led trust with premium presentation.",
                              "Lack of practical, street-level travel intelligence in bookings.",
                              "Generic transactional experiences lack human support.",
                              "Need for relatable, purpose-driven travel exploration."
                            ].map((gap, i) => (
                              <div key={i} className="flex gap-3 text-sm font-serif italic text-white/50 leading-relaxed border-b border-white/5 pb-2 last:border-0">
                                 <span className="text-orange">•</span>
                                 <span>{gap}</span>
                              </div>
                            ))}
                         </div>
                      </div>
                      <div className="p-6 bg-white/5 border border-white/10 text-center shadow-lg">
                         <div className="text-sm uppercase tracking-widest text-orange mb-2">The Positioning Gap</div>
                         <div className="text-sm font-bold leading-tight font-serif italic">"Founder is selling confidence through lived experience, not just destinations."</div>
                      </div>
                   </div>
                </div>

                <div className="bg-sand/10 p-12 border border-sand/30 text-center">
                   <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-6">Unique Brand Position</h4>
                   <p className="text-2xl font-serif italic text-midnight max-w-4xl mx-auto leading-relaxed">
                     “A trusted premium accessible travel brand helping aspiring international travellers experience the world confidently.”
                   </p>
                </div>
              </Section>
            )}

            {activeTab === 'strategy' && (
              <Section key="strategy">
                <SectionHeader 
                  label="The Blueprint" 
                  title="Brand Strategy"
                  subtitle="Defining the mission, vision, and core purpose that drives every journey."
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                   <div className="bg-forest text-cream p-12">
                      <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-6">Brand Mission</h4>
                      <p className="text-xl font-serif italic leading-relaxed">
                        To empower individuals, families, entrepreneurs, and leaders to explore the world with purpose by providing seamless, affordable, and unforgettable travel experiences that inspire growth, connection, and transformation.
                      </p>
                   </div>
                   <div className="bg-midnight text-white p-12">
                      <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-6">Brand Vision</h4>
                      <p className="text-xl font-serif italic leading-relaxed">
                        To become a globally recognized travel and tours brand that transforms lives through meaningful travel, builds a community of world explorers, and creates opportunities for financial freedom through the travel industry.
                      </p>
                   </div>
                </div>

                <div className="bg-white p-12 border border-midnight/5 shadow-sm mb-20 content-center">
                   <div className="max-w-4xl mx-auto text-center">
                      <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-6">Brand Purpose</h4>
                      <p className="text-2xl font-serif italic text-midnight leading-relaxed mb-4">
                        "To empower travellers through honest guidance, practical support, and memorable global experiences."
                      </p>
                      <div className="w-12 h-0.5 bg-orange mx-auto" />
                   </div>
                </div>

                <div className="mb-20">
                   <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-8">Core Values</h4>
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-midnight/5 border border-midnight/5">
                      {[
                        { v: "Excellence", d: "Delivering high-quality, reliable travel experiences." },
                        { v: "Integrity", d: "Transparent pricing and honest communication." },
                        { v: "Service", d: "Putting clients first for stress-free journeys." },
                        { v: "Innovation", d: "Creative travel packages and unique experiences." },
                        { v: "Empowerment", d: "Helping others travel more and earn through travel." },
                        { v: "Passion", d: "Love for exploring cultures, destinations, and people." },
                        { v: "Purpose", d: "Travel that inspires growth and transformation." },
                      ].map((item, i) => (
                        <div key={i} className="bg-white p-6 hover:bg-forest hover:text-cream transition-all group">
                           <div className="text-sm font-bold tracking-widest uppercase mb-2 leading-tight">{item.v}</div>
                           <p className="text-sm text-midnight/40 italic group-hover:text-cream/60 leading-relaxed font-serif uppercase tracking-wider">{item.d}</p>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-sand/10 p-12 border border-sand/30">
                   <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-6">Brand Positioning</h4>
                   <p className="text-sm font-serif italic text-midnight/70 leading-relaxed">
                     "The World Traveller Agency is not just about selling destinations. It’s about creating meaningful travel experiences inspired by real journeys, cultural connection, freedom, and personal transformation. Instead of focusing on destinations alone, the brand focuses on what travel makes people feel, discover, and become."
                   </p>
                   <div className="mt-8 pt-8 border-t border-sand flex items-center justify-between">
                      <span className="text-sm font-bold uppercase tracking-[0.3em] text-midnight">The Essence</span>
                      <span className="text-lg font-bebas tracking-widest text-orange uppercase">"Travel beyond destinations"</span>
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'personality' && (
              <Section key="personality">
                <SectionHeader 
                  label="The Human Side" 
                  title="Brand Personality"
                  subtitle="Defining the archetypes and character traits that make the brand relatable."
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                   <div>
                      <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-8">Primary Archetypes</h4>
                      <div className="space-y-6">
                         {[
                           { t: "The Leader & Guide", d: "Not just a service provider, but a mentor for the modern explorer." },
                           { t: "The Strategist", d: "Making every journey intentional, seamless, and optimized." },
                           { t: "The Storyteller", d: "Turning raw trips into life-changing narratives and growth." },
                           { t: "The Go-Getter", d: "Fearless in exploring new destinations and hidden opportunities." },
                           { t: "The Servant-Leader", d: "Genuinely caring about people’s dreams, safety, and personal growth." }
                         ].map((p, i) => (
                           <div key={i} className="flex gap-4 items-start bg-white p-6 border border-midnight/5 shadow-sm">
                              <div className="w-10 h-10 border border-forest/20 flex items-center justify-center shrink-0 text-forest font-bebas italic text-xl">{i+1}</div>
                              <div>
                                 <div className="font-bebas text-lg tracking-widest text-midnight">{p.t}</div>
                                 <p className="text-sm text-midnight/50 italic leading-snug">{p.d}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                   <div className="space-y-8">
                      <div className="bg-midnight text-white p-10 flex flex-col justify-between shadow-xl">
                        <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-8">Character Traits</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { l: "Confident", v: "Authority without arrogance." },
                            { l: "Human", v: "Real, relatable, accessible." },
                            { l: "Educational", v: "Always providing value." },
                            { l: "Inspiring", v: "Expanding horizons." },
                            { l: "Grounded", v: "Rooted in real experience." },
                            { l: "Direct", v: "No fluff, just the truth." }
                          ].map(trait => (
                            <div key={trait.l} className="space-y-1">
                              <div className="text-orange text-sm font-bold uppercase tracking-widest">{trait.l}</div>
                              <div className="text-sm text-white/50 italic">{trait.v}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="p-8 bg-orange text-midnight">
                        <h4 className="text-sm tracking-widest uppercase text-white/60 font-bold mb-4">Personality Essence</h4>
                        <p className="text-xl font-serif italic font-bold">"Bold, trusted global guide helping aspiring explorers travel with purpose."</p>
                      </div>
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'voice' && (
              <Section key="voice">
                <SectionHeader 
                  label="Messaging System" 
                  title="Brand Voice Guide"
                  subtitle="How we speak, write, and communicate our authority to the world."
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                    <div className="bg-midnight text-white p-10 flex flex-col justify-between shadow-xl">
                      <div>
                         <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-8">Voice Characteristics</h4>
                         <div className="flex flex-wrap gap-3 mb-8">
                            {["Confident", "Human", "Educational", "Inspiring", "Grounded", "Direct"].map(v => (
                              <span key={v} className="bg-white/10 text-white text-sm font-bold px-3 py-2 uppercase tracking-widest border border-white/10">{v}</span>
                            ))}
                         </div>
                         <div className="space-y-6">
                            <div className="space-y-2">
                               <p className="text-sm uppercase tracking-widest text-orange font-bold">Messaging Style</p>
                               <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                                  {[
                                    { m: "Straightforward", d: "No fluff, direct talk." },
                                    { m: "Inspiring", d: "Expands mindsets." },
                                    { m: "Passionate", d: "Energy and belief." },
                                    { m: "Persuasive", d: "Moves hearts." },
                                    { m: "Authentic", d: "Real and aligned." }
                                  ].map(item => (
                                    <div key={item.m} className="space-y-1">
                                      <div className="text-sm font-serif italic text-white/80 leading-none">{item.m}</div>
                                      <div className="text-sm text-white/40">{item.d}</div>
                                    </div>
                                  ))}
                               </div>
                            </div>
                         </div>
                      </div>
                      <div className="mt-12 p-6 bg-forest/20 border border-forest/30">
                         <h5 className="text-sm uppercase tracking-widest text-orange font-bold mb-4">Voice Direction</h5>
                         <p className="text-sm font-serif italic text-white/90 leading-relaxed">
                           "World Traveller Travel & Tours sounds like a bold, trusted global guide helping travelers explore with purpose and confidence."
                         </p>
                      </div>
                   </div>

                   <div className="bg-white p-12 border border-midnight/5 shadow-sm">
                      <h4 className="text-sm tracking-widest uppercase text-red-800 font-bold mb-8">Tone to Avoid</h4>
                      <div className="space-y-8">
                         {[
                           { t: "Avoid Generic Luxury", d: "Reject standard 'diamond five-star' clichés. We are premium, not pretentious." },
                           { t: "Avoid Over-Corporate", d: "No stiff, emotionless travel jargon or cold bureaucratic tone." },
                           { t: "Avoid Excess Slang", d: "Stay grounded; avoid 'lit', 'bestie', or meme-style humor." },
                           { t: "Avoid Over-Poetic", d: "Keep descriptions real and backed by experience, not flowery fluff." }
                         ].map((item, i) => (
                           <div key={i} className="flex gap-6 items-start border-b border-sand pb-6 last:border-0 last:pb-0">
                              <div className="w-8 h-8 rounded-full bg-red-50 text-red-800 flex items-center justify-center shrink-0"><X size={14} /></div>
                              <div>
                                <p className="text-sm font-bold uppercase tracking-widest text-midnight mb-1">{item.t}</p>
                                <p className="text-sm text-midnight/50 italic leading-relaxed">{item.d}</p>
                              </div>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'visuals' && (
              <Section key="visuals">
                <SectionHeader label="Visual Strategy" title="Visual Identity System" />
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                  <div className="space-y-4">
                    <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-6">Visual Mood Direction</h4>
                    <div className="bg-white p-8 border border-midnight/5 shadow-sm space-y-4">
                       <p className="text-sm font-bold uppercase tracking-widest text-forest">Modern Explorer / Masculine Premium Energy</p>
                       <p className="text-sm text-midnight/70 italic leading-relaxed">
                         The palette balances warm, energetic tones with cool, professional neutrals. It evokes both the excitement of a sunset and the reliability of a global leader.
                       </p>
                    </div>
                  </div>
                  
                  <div className="bg-midnight p-10 text-white flex flex-col justify-center shadow-2xl">
                    <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-8">Photography Direction</h4>
                    <div className="text-4xl font-bebas font-bold mb-4 tracking-widest uppercase text-orange">Documentary Realism</div>
                    <p className="text-white/50 leading-relaxed text-sm mb-8">
                      Focus on airports, movement, urban exploration, maps, and authentic street-level cultural immersion. Natural lighting and cinematic composition.
                    </p>
                    <div className="flex gap-3">
                       {['Authentic', 'Movement', 'Cinematic'].map(t => <span key={t} className="text-sm border border-orange/50 text-orange px-4 py-2 uppercase tracking-widest">{t}</span>)}
                    </div>
                  </div>
                </div>

                <div className="mb-20">
                   <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-8">The Color Palette</h4>
                   <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                     {[
                       { n: "Deep Navy Blue", hex: "#122A44", r: "Professional Weight", h: "bg-[#122A44]" },
                       { n: "Golden Amber", hex: "#E59623", r: "Warmth & energy", h: "bg-[#E59623]" },
                       { n: "Sky Blue", hex: "#A1C9E5", r: "Cool refreshing", h: "bg-[#A1C9E5]" },
                       { n: "Slate Gray", hex: "#4A5B6D", r: "Depth & Dimension", h: "bg-[#4A5B6D]" },
                       { n: "Bright White", hex: "#FFFFFF", r: "Clean space", h: "bg-[#FFFFFF]" },
                     ].map(c => (
                       <div key={c.hex} className="space-y-4 group">
                          <div className={`h-48 w-full ${c.h} shadow-xl relative overflow-hidden flex items-end p-4 border border-midnight/5`}>
                             <button 
                               onClick={() => navigator.clipboard.writeText(c.hex)}
                               className="absolute inset-0 bg-midnight/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white gap-2"
                             >
                               <Copy size={24} />
                               <span className="text-sm font-bold tracking-widest uppercase">Copy HEX</span>
                             </button>
                          </div>
                          <div>
                             <div className="text-sm font-bold uppercase tracking-widest mb-1">{c.n}</div>
                             <div className="text-sm font-mono text-orange mb-1">{c.hex}</div>
                             <div className="text-sm italic text-midnight/50 leading-tight">{c.r}</div>
                          </div>
                       </div>
                     ))}
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'identity' && (
              <Section key="identity">
                <SectionHeader 
                  label="Visual Identity" 
                  title="Typography"
                  subtitle="A precise typographic system that balances editorial elegance with modern functional clarity."
                />

                <div className="bg-midnight p-12 lg:p-20 shadow-2xl relative overflow-hidden mb-12">
                   <div className="absolute top-0 right-0 w-96 h-96 bg-forest/10 rounded-full blur-3xl -mr-48 -mt-48" />
                   
                   <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                      <div className="bg-white/5 border border-white/10 p-10 backdrop-blur-sm">
                         <span className="text-sm text-orange uppercase font-bold tracking-[0.3em] mb-6 block">Display / Headlines</span>
                         <div className="text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-4 italic">Explore the World.</div>
                         <p className="text-sm text-white/60 font-bold uppercase tracking-widest font-sans">Cormorant Garamond — Bold, Elegant</p>
                      </div>

                      <div className="bg-white/5 border border-white/10 p-10 backdrop-blur-sm">
                         <span className="text-sm text-orange uppercase font-bold tracking-[0.3em] mb-6 block">Body / UI</span>
                         <div className="text-2xl lg:text-3xl font-dm text-white leading-relaxed mb-6">Seamless journeys crafted for you.</div>
                         <p className="text-sm text-white/60 font-bold uppercase tracking-widest font-sans">DM Sans — Clean, Modern</p>
                      </div>
                   </div>

                   <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-12">
                         <div className="h-px bg-orange/30 flex-1" />
                         <h4 className="text-sm tracking-[0.4em] uppercase text-orange font-bold">Type Scale</h4>
                         <div className="h-px bg-orange/30 flex-1" />
                      </div>

                      <div className="space-y-12">
                         {[
                            { l: "H1 Hero", s: "80px / 700", v: "Explore.", f: "font-serif text-6xl lg:text-8xl italic" },
                            { l: "H2 Section", s: "52px / 700", v: "Our Services", f: "font-serif text-4xl lg:text-5xl font-bold" },
                            { l: "H3 Card", s: "28px / 700", v: "Tour Packages", f: "font-serif text-2xl lg:text-3xl font-bold" },
                            { l: "Body", s: "18px / 400", v: "Seamless, affordable, and unforgettable travel experiences.", f: "font-dm text-lg lg:text-xl opacity-80" },
                            { l: "Button", s: "18px / 600", v: "Book Your Journey →", f: "font-dm text-lg font-bold text-orange tracking-wide" }
                         ].map((scale, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-baseline border-b border-white/5 pb-8 last:border-0 last:pb-0">
                               <div className="md:col-span-1">
                                  <div className="text-sm uppercase tracking-widest font-bold text-white/30 mb-1">{scale.l}</div>
                                  <div className="text-sm font-mono text-orange/60">{scale.s}</div>
                               </div>
                               <div className={`md:col-span-3 text-white ${scale.f}`}>
                                  {scale.v}
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'logos' && (
              <Section key="logos">
                <SectionHeader 
                  label="Brand Identity" 
                  title="Logo Presentation"
                  subtitle="A sophisticated 4-variant logo system optimized for global brand consistency."
                />

                <div className="flex justify-center mb-12 -mt-4">
                  <div className="flex items-center gap-3 px-6 py-2 bg-white shadow-sm rounded-full border border-midnight/5">
                    <div className={`w-2 h-2 rounded-full ${logoSavedStatus === 'synced' ? 'bg-forest' : logoSavedStatus === 'offline' ? 'bg-red-500' : 'bg-orange'} ${logoSavedStatus !== 'synced' ? 'animate-pulse' : ''}`} />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold opacity-60">
                      Sync Status: {logoSavedStatus === 'synced' ? 'Cloud Secure' : logoSavedStatus === 'offline' ? 'Network Restricted' : 'Local Draft (Save Required)'}
                    </span>
                  </div>
                </div>

                <div className="mb-20">
                   <h4 className="text-lg tracking-widest uppercase text-orange font-bold mb-10 italic text-center underline decoration-orange/20 underline-offset-8">Logo Variants & Application Moodboard</h4>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                      {[0, 1, 2, 3].map((index) => (
                        <div key={index} className="relative group">
                          <div className={`aspect-square w-full flex flex-col items-center justify-center border-2 border-dashed transition-all duration-500 overflow-hidden relative ${
                             uploadedLogos[index] ? 'border-midnight/10 bg-white' : 'border-orange/20 bg-sand/5 hover:border-orange/50 hover:bg-sand/10'
                          }`}>
                             {uploadedLogos[index] ? (
                               <div className="w-full h-full p-12 flex items-center justify-center">
                                  <img 
                                    src={uploadedLogos[index]!} 
                                    alt={`Logo Variant ${index + 1}`} 
                                    className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-110" 
                                  />
                                  <div className="absolute inset-0 bg-midnight/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                     <label className="cursor-pointer bg-orange text-white px-6 py-3 font-bebas tracking-widest text-lg hover:bg-orange/90 transition-colors">
                                        Replace Logo
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleLogoUpload(index, e)} />
                                     </label>
                                  </div>
                               </div>
                             ) : (
                               <label className="cursor-pointer flex flex-col items-center gap-6 text-orange group-hover:scale-110 transition-transform">
                                  <Upload size={64} className="opacity-50" />
                                  <span className="font-bebas tracking-widest text-2xl uppercase">Upload Variant 0{index + 1}</span>
                                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleLogoUpload(index, e)} />
                               </label>
                             )}
                             <div className="absolute top-6 left-6 text-sm font-mono opacity-50 uppercase tracking-widest font-bold">v.0{index + 1}</div>
                          </div>
                          <div className="mt-6 text-center">
                             <span className="text-base uppercase tracking-widest text-midnight/60 font-bold group-hover:text-orange transition-colors">
                                {index === 0 ? "Primary Badge" : index === 1 ? "High Contrast" : index === 2 ? "Icon Mark" : "Global Lockup"}
                             </span>
                          </div>
                        </div>
                      ))}
                   </div>

                    {/* Save Logos Action */}
                    <div className="mt-16 flex flex-col items-center gap-6">
                       <button 
                         onClick={saveLogosToFirebase}
                         disabled={isSaving}
                         className={`group relative flex items-center gap-4 px-12 py-5 bg-midnight text-white text-xl font-bebas tracking-[0.2em] uppercase transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-orange/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                       >
                          <div className="relative z-10 flex items-center gap-4">
                             {isSaving ? (
                               <Loader2 size={24} className="animate-spin text-orange" />
                             ) : !user ? (
                               <LogIn size={24} className="text-orange group-hover:scale-110 transition-transform" />
                             ) : (
                               <Save size={24} className="text-orange group-hover:scale-110 transition-transform" />
                             )}
                             <span>
                               {isSaving ? "Persisting Logos..." : !user ? "Admin Auth to Save" : "Save Branding Assets"}
                             </span>
                          </div>
                          <div className="absolute inset-0 bg-orange opacity-0 group-hover:opacity-10 transition-opacity duration-700" />
                       </button>
                       
                       {!user && (
                         <p className="text-sm font-serif italic text-midnight/40 max-w-md text-center">
                           Note: You must be authorized as an administrator (<span className="text-orange font-bold">velocityaiph@gmail.com</span>) to persist changes to the global branding system.
                         </p>
                       )}

                      {saveStatus === 'success' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex items-center gap-2 text-forest font-bold text-sm tracking-widest uppercase bg-forest/10 px-4 py-2 rounded-full"
                        >
                          <CheckCircle2 size={16} />
                          <span>Branding Successfully Persisted</span>
                        </motion.div>
                      )}

                      {saveStatus === 'error' && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex flex-col items-center gap-2"
                        >
                          <div className="flex items-center gap-2 text-red-600 font-bold text-sm tracking-widest uppercase bg-red-50 px-4 py-2 rounded-full border border-red-100">
                            <XCircle size={16} />
                            <span>Failed to sync branding</span>
                          </div>
                          <p className="text-[10px] text-red-400 font-mono max-w-xs text-center">
                            Check console for details or verify database rules.
                          </p>
                        </motion.div>
                      )}
                   </div>
                </div>
                   <div className="bg-midnight text-white p-12 flex flex-col justify-between">
                      <div>
                         <h4 className="text-base tracking-[0.4em] uppercase text-orange font-bold mb-10 italic border-b border-orange/20 pb-4">Design Strategy</h4>
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
                                    <div className="font-bebas text-xl tracking-widest">{item.t}</div>
                                    <p className="text-lg text-white/80 italic leading-relaxed">{item.d}</p>
                                 </div>
                              </li>
                            ))}
                         </ul>
                      </div>
                      <div className="mt-12 pt-8 border-t border-white/10 italic text-base text-white/80">
                        "Minimal, bold, recognizable, and masculine. Avoiding generic globes or airplane icons."
                      </div>
                   </div>

                   <div className="space-y-12">
                      <div className="bg-sand/30 p-12 border border-sand/50">
                         <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-8 italic">Global Weight</h4>
                         <p className="text-xl font-serif italic text-midnight leading-relaxed">
                           "This logo uses a sophisticated and high-contrast color palette that balances warm, energetic tones with cool, professional neutrals. It evokes both the excitement of a sunset and the reliability of a corporate brand."
                         </p>
                      </div>

                      <div className="bg-white p-8 border border-midnight/5 shadow-sm">
                         <h4 className="text-sm tracking-widest uppercase text-midnight/40 font-bold mb-6">Logo Color Roles</h4>
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
                                    <div className="text-sm font-bold uppercase tracking-widest">{color.n}</div>
                                    <p className="text-sm text-midnight/40">{color.r}</p>
                                 </div>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>
              </Section>
            )}

            {activeTab === 'audience' && (
              <Section key="audience">
                <SectionHeader 
                  label="Target Persona" 
                  title="The Purpose-Driven Global Explorer"
                  subtitle="Modern, digitally connected, and ambitious individuals seeking more than just a destination."
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
                  <div className="lg:col-span-1">
                    <div className="bg-white p-8 border border-midnight/5 shadow-sm sticky top-30">
                       <div className="w-24 h-24 bg-sand/30 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">🧔</div>
                       <div className="text-center mb-10">
                          <h3 className="text-3xl font-bebas tracking-[0.2em] uppercase">Global Explorer</h3>
                          <p className="text-sm uppercase text-orange font-bold tracking-[0.4em] mt-2">Primary Persona</p>
                       </div>
                       <div className="space-y-6">
                          {[
                            { l: "Age", v: "27 to 42 years old" },
                            { l: "Location", v: "UAE, SE Asia, Int'l" },
                            { l: "Occupation", v: "Entrepreneurs, OFWs" },
                            { l: "Income", v: "Middle to Upper" },
                            { l: "Platforms", v: "IG, YT, TikTok" }
                          ].map((d, i) => (
                            <div key={i} className="flex justify-between border-b border-sand/30 pb-3">
                               <span className="text-xs uppercase tracking-widest text-midnight/40 font-bold">{d.l}</span>
                               <span className="text-sm uppercase font-bold text-midnight text-right ml-4">{d.v}</span>
                            </div>
                          ))}
                       </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2 space-y-12">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-8">
                           <div className="flex items-center gap-4 border-b border-orange/40 pb-6">
                              <Heart className="text-orange" size={24} />
                              <h4 className="text-lg tracking-[0.3em] uppercase text-midnight font-bold font-bebas">Emotional Drivers</h4>
                           </div>
                           <div className="grid grid-cols-1 gap-4">
                              {[
                                "Wants confidence before travelling internationally",
                                "Wants guidance from someone relatable and real",
                                "Wants honest travel advice and practical support",
                                "Wants smooth, stress-free planning systems",
                                "Wants experiences that feel meaningful and rewarding"
                              ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-5 bg-white border border-midnight/5 shadow-sm group hover:border-orange/30 transition-all">
                                   <div className="w-6 h-6 rounded-full bg-orange/10 flex items-center justify-center shrink-0">
                                      <CheckCircle2 size={12} className="text-orange" />
                                   </div>
                                   <p className="text-base text-midnight/80 font-serif italic leading-relaxed group-hover:text-midnight transition-colors">
                                      {item}
                                   </p>
                                </div>
                              ))}
                           </div>
                        </div>

                        <div className="space-y-8">
                           <div className="flex items-center gap-4 border-b border-orange/40 pb-6">
                              <Zap className="text-orange" size={24} />
                              <h4 className="text-lg tracking-[0.3em] uppercase text-midnight font-bold font-bebas">Buying Triggers</h4>
                           </div>
                           <div className="grid grid-cols-1 gap-4">
                              {[
                                "Founder’s real-world international travel experience",
                                "Honest recommendations and transparent pricing",
                                "Educational travel content that solves problems",
                                "Human-centered guidance and personal trust",
                                "Realistic budgeting and authentic storytelling"
                              ].map((item, i) => (
                                <div key={i} className="flex gap-4 p-5 bg-midnight text-white shadow-xl relative overflow-hidden group">
                                   <div className="absolute top-0 right-0 w-16 h-16 bg-orange/5 rounded-full blur-2xl -mr-8 -mt-8" />
                                   <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                      <Star size={12} className="text-orange" />
                                   </div>
                                   <p className="text-base text-white/80 font-serif italic leading-relaxed group-hover:text-white transition-colors relative z-10">
                                      {item}
                                   </p>
                                </div>
                              ))}
                           </div>
                        </div>
                     </div>

                     <div className="bg-forest text-cream p-10">
                        <div className="flex gap-2 items-center mb-6">
                           <Zap size={14} className="text-orange" />
                           <h4 className="text-sm tracking-widest uppercase text-orange font-bold">Audience Mindset</h4>
                        </div>
                        <p className="text-lg font-serif italic text-cream/80 leading-relaxed">
                          "They are research-heavy and trust-based explorers. They have watched enough stories; they are looking for the partner that will help them start their own confidently."
                        </p>
                     </div>
                  </div>
                </div>
              </Section>
            )}

            {activeTab === 'social' && (
              <Section key="social">
                <SectionHeader 
                  label="Digital Presence" 
                  title="Social Media Identity"
                  subtitle="Transforming from creator-style posting into a structured global travel brand identity."
                />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
                   <div className="space-y-10">
                      <div>
                         <h4 className="text-base tracking-[0.4em] uppercase text-orange font-bold mb-10 font-bebas underline decoration-orange/20 underline-offset-8">Main Content Pillars</h4>
                         <div className="space-y-6">
                            {[
                              { t: "Travel storytelling (40%)", d: "Authentic, cinematic narratives of global journeys.", w: "0.4" },
                              { t: "Educational content (30%)", d: "Visas, tips, logistics, and budgeting intelligence.", w: "0.3" },
                              { t: "Destination visuals (20%)", d: "Cinematic realism and documentary-style immersion.", w: "0.2" },
                              { t: "Founder insights (10%)", d: "Credibility, personal path, and brand philosophy.", w: "0.1" }
                            ].map((p, i) => (
                              <div key={i} className="bg-white p-8 border border-midnight/10 shadow-lg group hover:border-orange/40 transition-all">
                                 <div className="flex justify-between items-center mb-5">
                                    <span className="text-lg font-bebas tracking-widest uppercase text-midnight">{p.t}</span>
                                    <div className="h-1.5 bg-midnight/5 w-32 rounded-full overflow-hidden">
                                       <motion.div 
                                         initial={{ scaleX: 0 }}
                                         whileInView={{ scaleX: 1 }}
                                         className="h-full bg-orange origin-left"
                                         style={{ width: `${parseFloat(p.w) * 100}%` }}
                                       />
                                    </div>
                                 </div>
                                 <p className="text-lg text-midnight/70 font-serif italic leading-relaxed">{p.d}</p>
                              </div>
                            ))}
                         </div>
                      </div>

                      <div className="bg-sand/10 p-10 border border-sand/30">
                         <h4 className="text-sm tracking-widest uppercase text-midnight/70 font-bold mb-6">Reel Structure Formula</h4>
                         <div className="space-y-4">
                            {[
                              "Hook: One clear emotional focal point or hard-hitting truth.",
                              "Problem: Addressing the fear or gap in international travel.",
                              "Experience: Documenting the real-world reality.",
                              "Solution: Practical intelligence and guidance.",
                              "CTA: Strategic push to bio, consultation, or comment."
                            ].map((step, i) => (
                              <div key={i} className="flex gap-4 text-lg font-serif italic text-midnight/90">
                                 <span className="text-orange font-bold font-sans not-italic">{i+1}.</span>
                                 <span>{step}</span>
                              </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   <div className="space-y-12">
                      <div className="bg-midnight text-white p-10 shadow-2xl">
                         <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-8">Thumbnails & Overlays</h4>
                         <div className="space-y-8">
                            <div className="pb-8 border-b border-white/5">
                               <p className="text-sm font-bold uppercase tracking-widest text-orange mb-3">Hook Direction</p>
                               <p className="text-base text-white/50 italic leading-relaxed mb-4">
                                 "What nobody tells you about traveling here..."<br/>
                                 "How much this country actually costs..."<br/>
                                 "Biggest mistakes travelers make..."
                               </p>
                            </div>
                            <div className="pb-8 border-b border-white/5">
                               <p className="text-sm font-bold uppercase tracking-widest text-orange mb-3">Typography System</p>
                               <p className="text-base text-white/50 italic leading-relaxed">
                                 "Bold typography, strong emotional focal points, and a cleaner premium layout structure than standard creator content."
                               </p>
                            </div>
                            <div>
                               <p className="text-sm font-bold uppercase tracking-widest text-orange mb-3">Feed Goal</p>
                               <p className="text-base text-white/50 italic leading-relaxed">
                                 "Move from 'vlogger feed' to 'global travel agency' authority while maintaining authentic human connection."
                               </p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'web' && (
              <Section key="web">
                <SectionHeader 
                  label="Digital Ecosystem" 
                  title="Website Direction"
                  subtitle="Building a seamless hub for trust, transformation, and direct conversion."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
                   <div className="bg-white p-12 border border-midnight/5 shadow-sm space-y-8">
                      <h4 className="text-sm tracking-widest uppercase text-midnight/40 font-bold mb-4">UX & Atmospheric Direction</h4>
                      <p className="text-xl font-serif italic text-midnight/70 leading-relaxed mb-6">
                        "The feeling should be Experienced Traveller turned Trusted Travel Partner—modeled after a premium departure lounge."
                      </p>
                      <div className="space-y-4">
                         {[
                           { l: "Goal", v: "Premium organization and global experience." },
                           { l: "Trust Blocks", v: "Reviews, Map of 68 countries, Founder trip diary." },
                           { l: "Navigation", v: "Simplified, outcome-focused structure." },
                           { l: "Support", v: "Smooth travel support via integrated CTAs." }
                         ].map((item, i) => (
                           <div key={i} className="flex justify-between border-b border-sand/30 pb-2">
                              <span className="text-sm uppercase tracking-widest text-midnight/30 font-bold">{item.l}</span>
                              <span className="text-sm uppercase font-bold text-midnight text-right">{item.v}</span>
                           </div>
                         ))}
                      </div>
                   </div>

                   <div className="bg-forest text-cream p-12 flex flex-col justify-between shadow-2xl">
                      <div>
                         <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-8">Strategic CTA Style</h4>
                         <div className="space-y-6">
                            <div className="p-6 bg-white/5 border border-white/10 group hover:bg-white/10 transition-colors">
                               <p className="text-sm uppercase font-bold tracking-widest mb-3 text-orange">Primary Hook</p>
                               <p className="text-sm font-serif italic opacity-70">"Book Your Strategy Consultation" — Focus on high-level guidance.</p>
                            </div>
                            <div className="p-6 bg-white/5 border border-white/10 group hover:bg-white/10 transition-colors">
                               <p className="text-sm uppercase font-bold tracking-widest mb-3 text-orange">Secondary Action</p>
                               <p className="text-sm font-serif italic opacity-70">"Explore Tour Catalog" — Browsing with purpose-driven intention.</p>
                            </div>
                         </div>
                      </div>
                      <div className="mt-8 text-sm tracking-widest uppercase opacity-60 font-bold text-center">Outcome Focused • Trust Driven • Premium Organization</div>
                   </div>
                </div>
              </Section>
            )}

            {activeTab === 'applications' && (
              <Section key="applications">
                <SectionHeader 
                  label="Brand in Action" 
                  title="Brand Applications"
                  subtitle="Visualizing World Traveller across real-world digital and physical touchpoints."
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {[
                     { t: "Business Cards", d: "Minimalist Sand Beige cards with spot-UV logo treatment.", i: "📄" },
                     { t: "Facebook Cover", d: "Cinematic urban landscape with brand statement overlay.", i: "🏙️" },
                     { t: "Instagram Feed", d: "A cohesive set of 12 recurring post types for consistency.", i: "📱" },
                     { t: "Instagram Story", d: "Authentic movement-focused storytelling templates.", i: "🎬" },
                     { t: "Homepage Direction", d: "Premium departure lounge feel with smooth navigation.", i: "🖥️" },
                     { t: "Travel Itinerary", d: "Detailed strategic travel intelligence and guidance.", i: "💼" },
                     { t: "Merchandise", d: "Technical hoodies, caps, and travel-ready gear.", i: "🧢" },
                     { t: "Email Signature", d: "Professional, minimal, with verified explorer status.", i: "✉️" },
                     { t: "Ticket / Passport", d: "Relatable travel documentation and passport holder.", i: "🎫" }
                   ].map((item, i) => (
                     <div key={i} className="p-8 border border-midnight/5 shadow-sm group hover:shadow-xl transition-all cursor-default bg-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-2 h-full bg-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all">{item.i}</div>
                        <h5 className="font-bebas text-lg tracking-widest text-midnight mb-2">{item.t}</h5>
                        <p className="text-sm text-midnight/50 italic leading-relaxed">{item.d}</p>
                     </div>
                   ))}
                </div>

                <div className="mt-20 p-12 bg-midnight text-white text-center">
                   <h4 className="text-sm tracking-widest uppercase text-orange font-bold mb-4">Final Summary</h4>
                   <p className="text-2xl font-serif italic text-white leading-relaxed max-w-2xl mx-auto">
                     "Move beyond selling destinations. Connect with the purpose of exploration and the transformation of the traveler."
                   </p>
                </div>
              </Section>
            )}
          </AnimatePresence>
        </div>

        {/* --- GLOBAL FOOTER --- */}
        <footer className="px-12 py-12 border-t border-midnight/5 text-center md:text-left bg-white/50 backdrop-blur-sm">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
              <div>
                 <div className="text-lg font-serif font-bold text-midnight mb-1 uppercase tracking-tighter">THE WORLD <span className="text-orange italic">TRAVELER</span> Agency.</div>
                 <p className="text-xs tracking-[0.4em] uppercase text-midnight/40 leading-relaxed font-bold">Strategic Identity System v2.1 • Siddiqui Portfolio</p>
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
                      className="w-10 h-10 rounded-full border border-midnight/5 flex items-center justify-center text-midnight/40 hover:bg-orange hover:text-white hover:border-orange transition-all duration-500 shadow-sm"
                    >
                      <social.Icon size={16} />
                    </a>
                 ))}
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase text-midnight/30 font-bold max-w-xs text-center md:text-right">
                Developed for MA Siddiqui <br/> 
                Design Direction by Jonnaliza Dy <br/>
                All Rights Reserved © 2026
              </div>
           </div>
        </footer>
      </main>
    </div>
  );
}
