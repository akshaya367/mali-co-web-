"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Coffee, IceCream, MessageCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative min-h-screen flex flex-col bg-[#BE0027] overflow-hidden">
      {/* Striking Top Image - Directly from the top edge */}
      <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full h-[70vh] md:h-screen absolute top-0 left-0 z-10"
      >
        <Image 
          src="/images/top_dripping_scoop.png" 
          alt="Dripping Malai Scoop" 
          fill 
          className="object-cover object-top"
          priority
        />
        
        {/* Subtle Dark Gradient at the bottom to blend with the text area */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#BE0027] opacity-80" />
      </motion.div>

      {/* Content Section - Pushed to the very bottom */}
      <div className="relative z-30 flex-1 flex flex-col items-center justify-end pb-16 md:pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="flex flex-col items-center max-w-4xl px-6"
        >
          <div className="text-[#3E2723] font-black font-outfit text-[11px] md:text-sm uppercase tracking-[0.7em] mb-8 drop-shadow-[0_1px_2px_rgba(255,255,255,0.5)]">
            Artisanal Unexpected Flavors
          </div>
          
          <h1 className="text-5xl md:text-8xl lg:text-[9rem] font-bold font-playfair text-white mb-6 tracking-tighter uppercase leading-[0.8] drop-shadow-2xl">
            malai <span className="text-white/30">& co.</span>
          </h1>

          <p className="text-white/80 font-outfit text-sm md:text-xl mb-12 italic max-w-xl mx-auto font-light tracking-wide leading-relaxed">
            "Taste the slow-churned happiness that melts in your soul."
          </p>

          <div className="flex gap-6">
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-14 py-5 bg-white text-[#BE0027] font-black font-outfit text-[10px] uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
            >
              Order Now
            </motion.a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-12 text-white/20 flex flex-col items-center gap-2"
        >
          <div className="text-[10px] uppercase tracking-[0.4em] font-bold">Scroll</div>
          <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
        </motion.div>
      </div>
      
      {/* Global Grain/Pulse Overlay */}
      <div className="absolute inset-0 bg-black/5 opacity-40 mix-blend-overlay pointer-events-none" />
    </section>
  );
}
