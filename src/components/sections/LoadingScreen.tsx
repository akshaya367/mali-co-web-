"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const LOADING_IMAGES = [
  "/images/mali_co_autumn_harvest_scoop.png",
  "/images/mali_co_matching_chocolate_scoops.png",
  "/images/mali_co_vibrant_loading_asset.png"
];

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[1000] bg-[#1B0F0B] flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Main Background Image - Filling the screen with the craving bowls */}
          <div className="absolute inset-0 z-0">
             <Image 
               src="/images/loading_bg.png" 
               alt="Sweet Cravings" 
               fill 
               className="object-cover opacity-60 filter brightness-50"
               priority
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#1B0F0B] via-transparent to-[#1B0F0B] opacity-80" />
          </div>

          <div className="relative z-10 w-full max-w-5xl px-8 flex flex-col items-center text-center">
            {/* BRANDING */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.2 }}
            >
              <h1 className="text-7xl md:text-[12rem] font-playfair font-bold text-cream tracking-tighter mb-6 leading-none drop-shadow-2xl">
                malai <span className="text-autumn-orange italic text-5xl md:text-8xl">&</span> co.
              </h1>
              
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.5, delay: 0.5 }}
                className="h-px bg-gradient-to-r from-transparent via-autumn-orange to-transparent mb-12"
              />

              {/* CRAVING QUOTE */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
                className="space-y-6"
              >
                <p className="font-playfair text-3xl md:text-5xl text-white italic font-medium leading-relaxed tracking-tight max-w-2xl mx-auto drop-shadow-lg">
                  "Indulge in your deepest <span className="text-autumn-amber">cravings</span>, one artisanal scoop at a time."
                </p>
                <p className="font-outfit text-autumn-amber/60 font-bold text-[10px] uppercase tracking-[0.8em] opacity-90 drop-shadow-md">
                   Hand-Churned Happiness is Loading
                </p>
              </motion.div>
            </motion.div>

            {/* PROGRESS BAR */}
            <div className="mt-20 w-64 h-[2px] bg-white/10 rounded-full mx-auto overflow-hidden">
              <motion.div 
                 initial={{ x: "-100%" }}
                 animate={{ x: "100%" }}
                 transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                 className="w-full h-full bg-autumn-orange shadow-[0_0_15px_rgba(186,74,0,0.8)]"
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            className="absolute bottom-12 text-center"
          >
            <p className="text-[10px] font-outfit font-bold uppercase tracking-[0.5em] text-white/20 italic">
               Preparing Your Premium Experience...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
