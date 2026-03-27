"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Star, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useAuth } from "@/lib/useAuth";
import AuthModal from "./AuthModal";
import { useToastStore } from "@/components/Toast";

const MENU_DATA = {
  "Sundaes": [
    { id: "s1", name: "Death by Chocolate", price: "₹249", description: "Pure chocolate decadence - fudgy brownies, malai kulfi, molten chocolate sauce, topped with nuts and whipped cream.", image: "/images/death_by_chocolate.png", bestseller: true },
    { id: "s2", name: "Rabdi Royale", price: "₹199", description: "The ultimate dessert fusion - malai kulfi, luscious rabdi, crunchy nuts, and a cherry on top.", image: "/images/death_by_chocolate.png", bestseller: true },
    { id: "s3", name: "Desi Tresleches", price: "₹199", description: "Royal indulgence - vanilla cake drenched in sweet cream, topped with whipped cream.", image: "/images/death_by_chocolate.png" },
  ],
  "Cones": [
    { id: "c1", name: "Golden Malai Cone", price: "₹120", description: "Our heritage malai kulfi served in a crisp, freshly baked waffle cone.", image: "/images/malai_kulfi.png", bestseller: true },
    { id: "c2", name: "Persian Pista Cone", price: "₹130", description: "Classic pista kulfi with crushed Iranian pistachios in a crunchy chocolate-lined cone.", image: "/images/malai_kulfi.png" },
  ],
  "Milkshakes": [
    { id: "m1", name: "Royal Falooda Shake", price: "₹179", description: "A drinkable dessert adventure - rose milk, basil seeds, semiya, and vanilla kulfi scoop.", image: "/images/royal_falooda.png", bestseller: true },
    { id: "m2", name: "Chocolate Fudge Shake", price: "₹189", description: "Thick chocolate milkshake blended with brownie bits and topped with whipped cream.", image: "/images/death_by_chocolate.png" },
  ]
};

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState<keyof typeof MENU_DATA>("Sundaes");
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { session } = useAuth();
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state: any) => state.showToast);

  const handleAddToCart = (item: any) => {
    addItem({ id: item.id, name: item.name, price: item.price });
    showToast(`${item.name} Churned into Cart!`);
  };

  return (
    <section id="menu" className="py-32 bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg viewBox="0 0 1440 320" className="relative block w-full h-[60px] fill-autumn-orange/5">
          <path d="M0,192L48,202.7C96,213,192,235,288,229.3C384,224,480,192,576,186.7C672,181,768,203,864,197.3C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-6 py-2 bg-autumn-orange/10 rounded-full border border-autumn-orange/20 text-autumn-orange font-outfit text-[10px] font-bold uppercase tracking-[0.3em] mb-8"
          >
            <Star className="w-3 h-3 fill-autumn-orange" /> Honesty in Every Scoop
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-bold font-playfair text-chocolate mb-8 tracking-tighter"
          >
            Explore our <span className="italic text-autumn-amber">Flavors</span>
          </motion.h2>
          <p className="max-w-xl mx-auto text-chocolate/50 font-outfit text-sm uppercase tracking-widest font-bold">
            Hand-Churned • No Preservatives • Real Ingredients
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {Object.keys(MENU_DATA).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-10 py-4 rounded-full font-outfit text-[10px] font-bold tracking-[0.2em] uppercase transition-all duration-300 ${
                activeTab === tab 
                ? "bg-autumn-orange text-white shadow-xl shadow-autumn-orange/30 scale-105" 
                : "bg-white text-chocolate/40 hover:text-chocolate border border-chocolate/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="min-h-[600px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {MENU_DATA[activeTab].map((item: any, index: number) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -10 }}
                  className="bg-white p-10 rounded-none group hover:shadow-2xl hover:shadow-chocolate/5 border border-chocolate/5 h-full flex flex-col relative transition-all duration-500"
                >
                  {item.bestseller && (
                    <div className="absolute top-8 left-8 bg-autumn-orange text-white text-[9px] font-bold px-4 py-2 rounded-none shadow-lg z-20 uppercase tracking-[0.2em]">
                      Bestseller
                    </div>
                  )}

                  <div className="mb-10 aspect-square rounded-none bg-chocolate/5 relative overflow-hidden group-hover:bg-chocolate/10 transition-colors duration-500">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="flex justify-between items-end mb-4">
                    <h3 className="text-3xl font-bold font-playfair text-chocolate group-hover:text-autumn-orange transition-colors leading-[1]">
                      {item.name}
                    </h3>
                    <span className="font-outfit font-bold text-autumn-amber text-sm">{item.price}</span>
                  </div>
                  <p className="text-chocolate/50 font-outfit text-sm leading-relaxed mb-10 flex-grow">
                    {item.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <motion.button
                      onClick={() => handleAddToCart(item)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="py-5 bg-[#3E2723] text-cream rounded-none flex items-center justify-center gap-2 font-outfit font-bold text-[10px] uppercase tracking-widest transition-all"
                    >
                      <ShoppingCart className="w-4 h-4" /> Add to Cart
                    </motion.button>
                    
                    <motion.a
                      href={`https://wa.me/911234567890?text=I'd like to order: ${item.name}`}
                      target="_blank"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="py-5 border border-chocolate/10 text-chocolate rounded-none flex items-center justify-center gap-2 font-outfit font-bold text-[10px] uppercase tracking-widest hover:bg-autumn-orange/5 transition-all"
                    >
                      WhatsApp
                    </motion.a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      
      {/* Bottom Wavy Decor */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 320" className="relative block w-full h-[80px] fill-sage/10">
          <path d="M0,192L48,202.7C96,213,192,235,288,229.3C384,224,480,192,576,186.7C672,181,768,203,864,197.3C960,192,1056,160,1152,149.3C1248,139,1344,149,1392,154.7L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
    </section>
  );
}
