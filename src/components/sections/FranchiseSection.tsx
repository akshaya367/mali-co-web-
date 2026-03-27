"use client";

import { motion } from "framer-motion";
import { Building2, TrendingUp, Users, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function FranchiseSection() {
  return (
    <section id="franchise" className="py-24 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative aspect-square rounded-[4rem] overflow-hidden shadow-2xl border border-chocolate/5 group"
            >
              <Image 
                src="/images/franchise_catering.png" 
                alt="Franchise Opportunity" 
                fill 
                className="object-cover group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-x-0 bottom-0 p-12 bg-gradient-to-t from-chocolate/80 to-transparent text-white">
                <div className="text-[10px] font-bold uppercase tracking-[0.4em] mb-2 opacity-60 italic">Investment Excellence</div>
                <h3 className="text-3xl font-playfair font-bold tracking-tight">Hand-churning Success with malai & co.</h3>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2 space-y-12">
            <div>
              <div className="text-autumn-orange font-outfit text-[10px] font-bold uppercase tracking-[0.4em] mb-4 italic">Partner with us</div>
              <h2 className="text-5xl md:text-8xl font-bold font-playfair text-chocolate tracking-tighter mb-8 leading-tight">
                Own a <span className="italic text-autumn-amber">Legacy</span>
              </h2>
              <p className="text-chocolate/60 font-outfit text-sm leading-relaxed max-w-lg mb-10">
                Join our family and bring the finest artisanal kulfis and sundae experiences to your city. We offer an elite business model with 100% operational support and signature menu curation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-4 p-8 bg-white/50 rounded-[2.5rem] border border-chocolate/5 hover:border-autumn-amber/30 transition-all">
                <div className="w-12 h-12 bg-autumn-orange/10 rounded-full flex items-center justify-center text-autumn-orange mb-4">
                  <Building2 className="w-6 h-6" />
                </div>
                <h4 className="font-playfair text-xl font-bold text-chocolate italic">Premium Formats</h4>
                <p className="text-chocolate/40 font-outfit text-xs leading-relaxed uppercase tracking-wider font-bold">Kiosk, Cafe & High-street experiences available.</p>
              </div>
              <div className="space-y-4 p-8 bg-white/50 rounded-[2.5rem] border border-chocolate/5 hover:border-autumn-amber/30 transition-all">
                <div className="w-12 h-12 bg-autumn-orange/10 rounded-full flex items-center justify-center text-autumn-orange mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="font-playfair text-xl font-bold text-chocolate italic">Proven ROI</h4>
                <p className="text-chocolate/40 font-outfit text-xs leading-relaxed uppercase tracking-wider font-bold">Sustainable growth with our artisanal dessert model.</p>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto px-12 py-6 bg-chocolate text-cream rounded-full font-outfit font-bold text-[10px] uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 hover:bg-autumn-orange transition-all"
            >
              Request Franchise PDF <ChevronRight className="w-5 h-5 text-autumn-amber" />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
