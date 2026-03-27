"use client";

import { motion } from "framer-motion";
import { Heart, Shovel as Scoop, LoaderPinwheel as Churn, Leaf } from "lucide-react";

const WHY_US_DATA = [
  {
    id: "w1",
    title: "Heritage Malai",
    description: "Our signature base is made with high-fat, small-batch malai, delivering a creaminess that modern machines simply cannot replicate.",
    icon: Churn,
  },
  {
    id: "w2",
    title: "Zero Stabilizers",
    description: "We don't use gums, emulsifiers, or artificial thickeners. Just pure dairy, sugar, and natural flavors. RA!",
    icon: Leaf,
  },
  {
    id: "w3",
    title: "Hand-Churned Soul",
    description: "Every batch is slow-churned in traditional pots to preserve the delicate structure and prevent air-overrun.",
    icon: Scoop,
  },
  {
    id: "w4",
    title: "Honest Sourcing",
    description: "From Guntur chillies for experimental flavors to Himalayan saffron, we source only from the best local farms.",
    icon: Heart,
  }
];

export default function WhyUsSection() {
  return (
    <section id="story" className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-autumn-orange font-outfit text-xs font-bold uppercase tracking-[0.4em] mb-6"
            >
              The Artisanal Difference
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold font-playfair text-chocolate tracking-tighter mb-10 leading-[0.9]"
            >
              Why <span className="italic text-autumn-orange">malai & co</span> ?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-chocolate/60 font-outfit text-lg leading-relaxed mb-12 max-w-xl"
            >
              We don't just make ice cream; we preserve a legacy. Our process takes three times longer than standard brands because perfection cannot be rushed.
            </motion.p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {WHY_US_DATA.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-none bg-cream border border-chocolate/5 hover:bg-autumn-orange/5 transition-all group"
                >
                  <item.icon className="w-10 h-10 text-autumn-orange mb-6 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-xl font-bold font-playfair text-chocolate mb-3">{item.title}</h3>
                  <p className="text-chocolate/50 font-outfit text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative h-[600px] w-full bg-autumn-orange/5 rounded-none overflow-hidden group">
            <div className="absolute inset-0 bg-chocolate/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-10" />
            <img 
              src="https://images.unsplash.com/photo-1501443762994-82bd5dace89a?q=80&w=2670&auto=format&fit=crop" 
              alt="Artisanal Ice Cream" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
            />
            <div className="absolute bottom-10 left-10 z-20">
               <div className="glass-light p-6 rounded-3xl border border-white/20 backdrop-blur-xl max-w-xs shadow-2xl">
                  <div className="text-chocolate/40 text-[10px] uppercase font-bold tracking-widest mb-2">Our Motto</div>
                  <div className="text-xl font-playfair font-bold text-chocolate leading-tight italic">"Pure & Honest in Every Single Scoop."</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
