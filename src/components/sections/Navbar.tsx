"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, ChevronDown, Music, VolumeX, Users, Navigation } from "lucide-react";
import Link from "next/link";
import { useCartStore } from "@/lib/store";
import { useAuth } from "@/lib/useAuth";
import { supabase } from "@/lib/supabase";
import CartDrawer from "./CartDrawer";
import AuthModal from "./AuthModal";

export default function Navbar() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const totalItems = useCartStore((state) => state.totalItems());
  const { session } = useAuth();

  useEffect(() => {
    audioRef.current = new Audio("https://cdn.pixabay.com/audio/2022/05/27/audio_1808fbf07a.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("Audio play failed:", e));
      }
      setIsMusicPlaying(!isMusicPlaying);
    }
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#story" },
    { name: "Product", href: "/#menu" },
    { name: "Reviews", href: "/#reviews" },
    { name: "Help", href: "/#location" },
  ];

  return (
    <>
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-[150] bg-[#2F1B12]/40 backdrop-blur-xl border-b border-white/5 px-4 md:px-12 py-4 flex justify-between items-center"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className="w-full h-0.5 bg-white rounded-full" />
              <span className="w-2/3 h-0.5 bg-white rounded-full" />
              <span className="w-full h-0.5 bg-white rounded-full" />
            </div>
          </button>

          <Link href="/" className="text-xl md:text-2xl font-black font-outfit text-white tracking-tighter cursor-pointer uppercase">
             malai <span className="text-white/50">& co.</span>
          </Link>
        </div>

        <div className="hidden lg:flex gap-12 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="font-outfit text-[11px] uppercase font-bold tracking-widest text-white/70 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex gap-2 md:gap-4 items-center">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-white/70 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-autumn-orange text-white text-[8px] font-bold rounded-full flex items-center justify-center shadow-lg">
                  {totalItems}
                </span>
              )}
            </button>
          <div className="relative">
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="px-4 md:px-10 py-2.5 md:py-3 border border-white/20 font-outfit text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-chocolate transition-all flex items-center gap-2 rounded-full backdrop-blur-md"
            >
               <span className="hidden sm:inline">Explore</span> <ChevronDown className={`w-3 h-3 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="absolute right-0 mt-4 w-64 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-2 z-[200] rounded-3xl overflow-hidden"
                >
                  <div className="flex flex-col">
                    <button onClick={() => { setIsAuthOpen(true); setIsUserMenuOpen(false); }} className="w-full text-left px-6 py-4 font-outfit text-[10px] font-bold uppercase tracking-widest text-chocolate hover:bg-cream transition-all rounded-2xl">
                      {session ? "My Account" : "Access Membership"}
                    </button>
                    <Link href="/#customize" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 p-4 hover:bg-cream rounded-2xl transition-all group">
                      <div className="w-10 h-10 bg-sage/10 rounded-xl flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-white transition-all">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-outfit font-bold text-[10px] uppercase tracking-widest text-chocolate">Bespoke Scoops</p>
                        <p className="text-[9px] text-chocolate/40 font-medium tracking-tight">Personalize your delight</p>
                      </div>
                    </Link>
                    <div className="h-px bg-chocolate/5 my-2 mx-4" />
                    <Link href="/#bulk" onClick={() => setIsUserMenuOpen(false)} className="w-full text-left px-6 py-4 font-outfit text-[10px] font-bold uppercase tracking-widest text-chocolate hover:bg-cream transition-all rounded-2xl">
                      Events & Catering
                    </Link>
                    {session && (
                      <button 
                        onClick={async () => { await supabase.auth.signOut(); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-6 py-4 font-outfit text-[10px] font-bold uppercase tracking-widest text-autumn-orange hover:bg-autumn-orange/5 transition-all rounded-2xl"
                      >
                        Sign Out
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-chocolate/80 backdrop-blur-xl z-[200]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed inset-y-0 left-0 w-[85vw] bg-[#FDFBF0] z-[201] p-6 md:p-8 flex flex-col overflow-y-auto"
            >
              <div className="flex-1 space-y-8 md:space-y-12">
                <div className="flex justify-between items-center mb-10 md:mb-16">
                  <span className="text-2xl font-black font-outfit text-chocolate tracking-tighter uppercase">
                     malai <span className="text-chocolate/30">& co.</span>
                  </span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="w-12 h-12 rounded-full bg-chocolate/5 flex items-center justify-center text-chocolate">
                    <ChevronDown className="w-6 h-6 rotate-90" />
                  </button>
                </div>

                <div className="flex flex-col gap-4 md:gap-6">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link 
                        href={link.href} 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-4xl md:text-5xl font-playfair font-bold text-chocolate hover:text-autumn-orange transition-colors flex items-center justify-between group"
                      >
                        {link.name}
                        <Navigation className="w-6 h-6 rotate-90 opacity-0 group-hover:opacity-100 transition-all text-autumn-orange" />
                      </Link>
                    </motion.div>
                  ))}
                  
                  <div className="h-px bg-chocolate/10 my-4 md:my-6" />

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Link 
                      href="/#customize" 
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl md:text-3xl font-playfair font-bold text-sage flex flex-col"
                    >
                      <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-sage/40 mb-2">Signature Experience</span>
                      Bespoke Scoops
                    </Link>
                  </motion.div>
                </div>
              </div>

              <div className="mt-auto pt-10 pb-12 md:pb-8 space-y-6">
                 <button 
                   onClick={() => { toggleMusic(); }}
                   className="flex items-center gap-4 text-chocolate font-outfit text-sm font-bold uppercase tracking-widest"
                 >
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isMusicPlaying ? 'bg-autumn-orange text-white animate-pulse' : 'bg-chocolate/5 text-chocolate'}`}>
                     {isMusicPlaying ? <VolumeX className="w-4 h-4" /> : <Music className="w-4 h-4" />}
                   </div>
                   <span className="text-[11px]">{isMusicPlaying ? "Mute Melodies" : "Play Melodies"}</span>
                 </button>
                 
                 <div className="flex gap-3">
                    <div className="flex-1 p-3 bg-chocolate text-cream rounded-2xl text-center shadow-lg">
                       <p className="text-[7px] uppercase font-bold tracking-widest opacity-50 mb-1">Status</p>
                       <p className="text-[10px] font-bold">Open Daily</p>
                    </div>
                    <Link 
                      href="https://wa.me/919123456789"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex-1 p-3 bg-sage text-white rounded-2xl text-center border border-sage/10 shadow-lg block"
                    >
                       <p className="text-[7px] uppercase font-bold tracking-widest opacity-50 mb-1">Contact</p>
                       <p className="text-[10px] font-bold">WhatsApp</p>
                    </Link>
                 </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
