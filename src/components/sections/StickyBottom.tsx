"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Phone, MessageCircle, Menu, ShoppingCart, Share2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useCartStore } from "@/lib/store";
import { useToastStore } from "@/components/Toast";
import Link from "next/link";

export default function StickyBottom() {
  const [isVisible, setIsVisible] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());
  const showToast = useToastStore((state: any) => state.showToast);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = async () => {
    const shareData = {
      title: 'malai & co | Crafted Happiness in Every Scoop',
      text: 'Indulge in artisanal slow-churned kulfis and bespoke sundaes at malai & co. Build your own bespoke scoop now!',
      url: window.location.origin
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.origin);
      showToast("Link Copied to Clipboard!");
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 100, x: "-50%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95vw] max-w-xl md:max-w-3xl"
        >
          <div className="bg-[#3E2723]/95 border border-white/20 p-2 rounded-[2rem] shadow-2xl flex items-center justify-between gap-1 overflow-hidden backdrop-blur-3xl">
            <motion.a
               href="tel:+919123456789"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="flex-1 py-4 flex flex-col items-center justify-center gap-1 text-cream/60 font-outfit text-[10px] uppercase tracking-widest hover:text-white transition-all rounded-none hover:bg-white/5"
            >
              <Phone className="w-5 h-5 text-autumn-amber" />
              <span className="hidden sm:inline">Call</span>
            </motion.a>

            <div className="w-px h-8 bg-white/10" />

            <motion.a
              href="https://wa.me/919123456789?text=Hi malai %26 co! I'd like to place an order."
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-4 flex items-center justify-center gap-2 group transition-all rounded-none hover:bg-white/5"
            >
              <MessageCircle className="w-5 h-5 text-green-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline font-bold text-white text-[10px] uppercase tracking-widest">WhatsApp</span>
            </motion.a>

            <div className="w-px h-8 bg-white/10" />

            <Link
              href="/checkout"
              className="flex-1 py-4 flex items-center justify-center gap-2 text-cream font-outfit text-sm uppercase tracking-widest hover:bg-white/10 rounded-none transition-all relative"
            >
              <ShoppingCart className="w-5 h-5 text-autumn-amber" />
              {totalItems > 0 && (
                <span className="absolute top-2 right-2 w-4 h-4 bg-autumn-orange text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
              <span className="hidden sm:inline font-bold text-[10px]">Cart</span>
            </Link>

            <div className="w-px h-8 bg-white/10" />

            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-4 flex flex-col items-center justify-center gap-1 text-cream/60 font-outfit text-[10px] uppercase tracking-widest hover:text-white transition-all rounded-none hover:bg-white/5"
            >
              <Share2 className="w-5 h-5 text-autumn-amber" />
              <span className="hidden sm:inline">Share</span>
            </motion.button>

            <div className="w-px h-8 bg-white/10" />

            <motion.a
              href="/#menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-4 flex flex-col items-center justify-center gap-1 text-cream/60 font-outfit text-[10px] uppercase tracking-widest hover:text-white transition-all rounded-none hover:bg-white/5"
            >
              <Menu className="w-5 h-5 text-autumn-amber" />
              <span className="hidden sm:inline">Menu</span>
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
