"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShoppingCart, X } from "lucide-react";
import { useEffect } from "react";
import { create } from "zustand";

interface ToastStore {
  message: string | null;
  type: "success" | "error";
  showToast: (message: string, type?: "success" | "error") => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  message: null,
  type: "success",
  showToast: (message, type = "success") => set({ message, type }),
  hideToast: () => set({ message: null }),
}));

export default function Toast() {
  const { message, type, hideToast } = useToastStore();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(hideToast, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, hideToast]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 100 }}
          className="fixed bottom-32 left-1/2 -translate-x-1/2 z-[1000] w-[90vw] max-w-sm"
        >
          <div className="bg-chocolate border border-white/10 p-5 rounded-[2rem] shadow-2xl flex items-center justify-between gap-4 backdrop-blur-3xl">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-autumn-orange/20 rounded-full flex items-center justify-center text-autumn-orange">
                  <ShoppingCart className="w-5 h-5" />
               </div>
               <div>
                  <div className="text-white text-[10px] uppercase font-bold tracking-[0.2em] mb-1">Sweet News!</div>
                  <div className="text-white/60 text-[9px] uppercase font-bold tracking-[0.1em]">{message}</div>
               </div>
            </div>
            <button onClick={hideToast} className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <X className="w-4 h-4 text-white/30" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
