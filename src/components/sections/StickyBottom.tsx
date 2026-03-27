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
      const threshold = window.innerWidth < 768 ? 150 : 300;
      if (window.scrollY > threshold) {
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
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[100] w-[95vw] max-w-xl md:max-w-3xl"
        >
          <div className="bg-[#2F1B12]/95 border border-white/10 p-2 md:p-3 rounded-[3rem] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] flex items-center justify-between gap-1 backdrop-blur-3xl overflow-hidden">
            <motion.a
               href="tel:+919123456789"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="flex-1 py-3 md:py-4 flex flex-col items-center justify-center gap-1.5 text-cream/70 hover:text-white transition-all rounded-[2rem] hover:bg-white/5 group"
            >
              <Phone className="w-5 h-5 md:w-6 md:h-6 text-autumn-amber group-hover:scale-110 transition-transform" />
              <span className="font-outfit text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Call</span>
            </motion.a>

            <div className="w-px h-8 bg-white/5" />

            <motion.a
              href="https://wa.me/919123456789?text=Hi malai %26 co! I'd like to place an order."
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 md:py-4 flex flex-col items-center justify-center gap-1.5 transition-all rounded-[2rem] hover:bg-white/5 group"
            >
              <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400 group-hover:scale-110 transition-transform" />
              <span className="font-outfit text-[8px] md:text-[10px] font-bold text-white uppercase tracking-widest">Chat</span>
            </motion.a>

            <div className="w-px h-8 bg-white/5" />

            <Link
              href="/checkout"
              className="flex-1 py-3 md:py-4 flex flex-col items-center justify-center gap-1.5 text-white transition-all rounded-[2rem] hover:bg-white/10 relative group"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 md:w-6 md:h-6 text-autumn-orange group-hover:scale-110 transition-transform" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-white text-chocolate text-[9px] font-black rounded-full flex items-center justify-center shadow-lg border border-chocolate/5">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="font-outfit text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Cart</span>
            </Link>

            <div className="w-px h-8 bg-white/5" />

            <motion.button
              onClick={handleShare}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 md:py-4 flex flex-col items-center justify-center gap-1.5 text-cream/70 hover:text-white transition-all rounded-[2rem] hover:bg-white/5 group"
            >
              <Share2 className="w-5 h-5 md:w-6 md:h-6 text-sage group-hover:scale-110 transition-transform" />
              <span className="font-outfit text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Share</span>
            </motion.button>

            <div className="w-px h-8 bg-white/5" />

            <motion.a
              href="/#menu"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 md:py-4 flex flex-col items-center justify-center gap-1.5 text-cream/70 hover:text-white transition-all rounded-[2rem] hover:bg-white/5 group"
            >
              <Menu className="w-5 h-5 md:w-6 md:h-6 text-autumn-amber group-hover:scale-110 transition-transform" />
              <span className="font-outfit text-[8px] md:text-[10px] font-bold uppercase tracking-widest">Menu</span>
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
