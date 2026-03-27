"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ShoppingCart, User, Globe, LogOut, ChevronDown, Music, VolumeX, Users } from "lucide-react";
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
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const totalItems = useCartStore((state) => state.totalItems());
  const { session, user } = useAuth();

  useEffect(() => {
    // We use a public domain / free subtle lofi track link
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

  return (
    <>
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-[150] bg-white/10 backdrop-blur-lg border-b border-white/10 px-6 md:px-12 py-4 flex justify-between items-center"
      >
        <div className="flex items-center gap-6">
          <span className="text-2xl font-black font-outfit text-white tracking-tighter cursor-pointer uppercase">
             malai <span className="text-white/50">& co.</span>
          </span>
        </div>

        <div className="hidden lg:flex gap-12 items-center">
          <Link href="/" className="font-outfit text-[11px] uppercase font-bold tracking-widest text-white/70 hover:text-white transition-colors">Home</Link>
          <Link href="/#story" className="font-outfit text-[11px] uppercase font-bold tracking-widest text-white/70 hover:text-white transition-colors">About</Link>
          <Link href="/#menu" className="font-outfit text-[11px] uppercase font-bold tracking-widest text-white/70 hover:text-white transition-colors">Product</Link>
          <Link href="/#reviews" className="font-outfit text-[11px] uppercase font-bold tracking-widest text-white/70 hover:text-white transition-colors">Reviews</Link>
          <Link href="/#location" className="font-outfit text-[11px] uppercase font-bold tracking-widest text-white/70 hover:text-white transition-colors">Help</Link>
        </div>

        <div className="flex gap-4 items-center">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-white hover:text-white/70 transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-[#BE0027] text-[8px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          <div className="relative">
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="px-10 py-3 border-2 border-white font-outfit text-[11px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-[#BE0027] transition-all flex items-center gap-2"
            >
               More <ChevronDown className={`w-3 h-3 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isUserMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-56 bg-white border-2 border-chocolate shadow-2xl p-2 z-[200]"
                >
                  <div className="flex flex-col">
                    <button onClick={() => { setIsAuthOpen(true); setIsUserMenuOpen(false); }} className="w-full text-left px-6 py-4 font-outfit text-[10px] font-bold uppercase tracking-widest text-chocolate hover:bg-chocolate hover:text-white transition-all">
                      {session ? "My Account" : "Login / Register"}
                    </button>
                    <Link href="/#customize" className="flex items-center gap-3 p-4 hover:bg-cream rounded-2xl transition-all group">
                      <div className="w-10 h-10 bg-sage/10 rounded-full flex items-center justify-center text-sage group-hover:bg-sage group-hover:text-white transition-all">
                        <Users className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-outfit font-bold text-[10px] uppercase tracking-widest text-chocolate">Bespoke Scoops</p>
                        <p className="text-[9px] text-chocolate/40 font-medium tracking-tight">Craft your unique flavor</p>
                      </div>
                    </Link>
                    <Link href="/#bulk" className="w-full text-left px-6 py-4 font-outfit text-[10px] font-bold uppercase tracking-widest text-chocolate hover:bg-chocolate hover:text-white transition-all border-t border-chocolate/5">
                      Bulk Orders
                    </Link>
                    {session && (
                      <button 
                        onClick={async () => { await supabase.auth.signOut(); setIsUserMenuOpen(false); }}
                        className="w-full text-left px-6 py-4 font-outfit text-[10px] font-bold uppercase tracking-widest text-autumn-orange hover:bg-autumn-orange hover:text-white transition-all border-t border-chocolate/5"
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

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
