"use client";

import { Globe, Heart, Mail, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative bg-[#1B0F0B] text-cream pt-40 pb-20 overflow-hidden">
      {/* Top Wavy Decor */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 320" className="relative block w-full h-[100px] fill-cream">
          <path d="M0,192L48,202.7C96,213,192,235,288,229.3C384,224,480,192,576,186.7C672,181,768,203,864,197.3C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="text-sm font-outfit uppercase tracking-[0.5em] font-bold mb-8 opacity-60 text-white/80">
            Crafted Happiness in Every Scoop
          </div>
          <h2 className="text-6xl md:text-[8rem] font-bold font-playfair mb-10 tracking-tighter text-cream">malai <span className="text-autumn-orange italic">&</span> co</h2>
          
          <div className="flex justify-center flex-wrap gap-4 md:gap-8 mb-12">
            <a href="#" className="px-6 py-3 bg-autumn-orange text-cream rounded-none font-bold text-[10px] uppercase tracking-widest hover:bg-white transition-colors shadow-lg">Instagram</a>
            <a href="#" className="px-6 py-3 bg-[#1877F2] text-white rounded-none font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg">Facebook</a>
            <a href="#" className="px-6 py-3 bg-[#FC8019] text-white rounded-none font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg">Order on Swiggy</a>
            <a href="#" className="px-6 py-3 bg-[#E23744] text-white rounded-none font-bold text-[10px] uppercase tracking-widest hover:opacity-90 transition-opacity shadow-lg">Order on Zomato</a>
          </div>

          <div className="flex justify-center flex-wrap gap-4 md:gap-12 mb-20 font-outfit text-[10px] font-bold uppercase tracking-[0.3em]">
            <a href="#menu" className="hover:text-white/60 transition-colors">Experience Menu</a>
            <a href="#locate" className="hover:text-white/60 transition-colors">Locate Parlours</a>
            <a href="#story" className="hover:text-white/60 transition-colors">Our Artisanal Story</a>
            <a href="mailto:hello@malai.co" className="hover:text-white/60 transition-colors">Contact US</a>
          </div>

          <div className="h-px w-full bg-white/10 mb-12" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 font-outfit">
            <p>© 2026 malai & co. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors flex items-center gap-2">
                India <Globe className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
