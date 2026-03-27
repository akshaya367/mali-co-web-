"use client";

import { motion } from "framer-motion";
import { MessageSquare, CalendarCheck, MapPin, ChevronRight, Gift } from "lucide-react";

export default function BulkOrdersSection() {
  return (
    <section id="bulk" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="mb-20">
          <div className="text-autumn-orange font-outfit text-[10px] font-bold uppercase tracking-[0.4em] mb-4 italic">Catering & Gifting</div>
          <h2 className="text-5xl md:text-8xl font-bold font-playfair text-chocolate tracking-tighter mb-8 leading-tight">
            Celebrate with <span className="italic text-autumn-amber">Abundance</span>
          </h2>
          <p className="max-w-xl mx-auto text-chocolate/50 font-outfit text-sm uppercase tracking-widest font-bold">
            From Weddings to Corporate Gifting. We deliver happiness in bulk.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20">
          {[
            { 
              icon: <Gift className="w-8 h-8" />, 
              title: "Corporate Gifting", 
              desc: "Luxury hampers and kulfi boxes curated for teams and clients."
            },
            { 
              icon: <CalendarCheck className="w-8 h-8" />, 
              title: "Event Catering", 
              desc: "Live kulfi counters and sundae bars for weddings and parties."
            },
            { 
              icon: <MessageSquare className="w-8 h-8" />, 
              title: "Custom Flavors", 
              desc: "Collaborate with our chefs to create signature dessert experiences."
            }
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-12 bg-cream rounded-[4rem] border border-chocolate/5 hover:border-autumn-amber/30 transition-all flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 bg-autumn-orange/10 rounded-full flex items-center justify-center text-autumn-orange mb-8 group-hover:bg-autumn-orange group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="font-playfair text-3xl font-bold text-chocolate mb-4 group-hover:scale-105 transition-transform">{item.title}</h3>
              <p className="text-chocolate/40 font-outfit text-xs leading-relaxed uppercase tracking-wider font-bold">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto p-12 bg-chocolate text-cream rounded-[4rem] shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-125 transition-transform duration-1000">
             <MapPin className="w-64 h-64" />
           </div>
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-left">
                <h3 className="text-3xl font-playfair font-bold italic mb-4">Start your Bulk Order</h3>
                <p className="text-cream/50 font-outfit text-[10px] uppercase font-bold tracking-widest">Available across India for Corporate & Large Events.</p>
              </div>
              <motion.a 
                href="https://wa.me/911234567890?text=I'd like to discuss a bulk order/catering request."
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-12 py-6 bg-autumn-orange text-white rounded-full font-outfit font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-4 transition-all"
              >
                 WhatsApp Us Detail <ChevronRight className="w-5 h-5" />
              </motion.a>
           </div>
        </div>
      </div>
    </section>
  );
}
