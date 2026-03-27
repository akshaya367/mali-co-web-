"use client";

import { useEffect, useState } from "react";
import { ShieldAlert } from "lucide-react";
import { motion } from "framer-motion";

export default function DemoGuard({ children }: { children: React.ReactNode }) {
  const [isDenied, setIsDenied] = useState(false);

  useEffect(() => {
    // We show the site immediately, but check the limit in the background.
    // This avoids the "Stuck on Loading" screen.
    const isVisitCounted = sessionStorage.getItem("isVisitCounted");
    
    const verify = async () => {
      try {
        const res = await fetch("/api/view-limit", {
          method: isVisitCounted ? "GET" : "POST",
        });
        const data = await res.json();
        
        if (data.count > 150) {
          setIsDenied(true);
        } else {
          if (!isVisitCounted) sessionStorage.setItem("isVisitCounted", "true");
        }
      } catch (err) {
        console.warn("View limit check bypassed for smooth demo experience.");
      }
    };

    verify();
  }, []);

  // Use a portal or fixed overlay if denied, otherwise show children
  if (isDenied) {
    return (
      <div className="fixed inset-0 bg-cream z-[5000] flex flex-col items-center justify-center p-10 text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-10"
        >
          <ShieldAlert className="w-12 h-12 text-red-400" />
        </motion.div>
        
        <h1 className="text-4xl font-playfair text-chocolate mb-6 tracking-tighter">Access <span className="italic text-red-400">Expired</span></h1>
        
        <div className="max-w-md p-8 bg-white/50 rounded-[3rem] border border-red-100 mb-10">
          <p className="text-chocolate/60 font-outfit text-[11px] leading-relaxed uppercase tracking-[0.2em]">
            This demo link has reached its maximum view limit (150/150). 🧁✨
          </p>
        </div>

        <p className="text-[10px] font-outfit font-bold uppercase tracking-[0.4em] text-chocolate/20">
          malai & co • Contact Admin for Revivals
        </p>
      </div>
    );
  }

  return <>{children}</>;
}
