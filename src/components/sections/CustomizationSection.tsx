"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronRight, Plus, Check, Info, ArrowLeft, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/lib/store";
import { useToastStore } from "@/components/Toast";

const BASES = [
  { id: "b1", name: "Classic Malai", price: 180, image: "/images/malai_kulfi.png", desc: "Our signature slow-churned dairy base." },
  { id: "b2", name: "Velvet Mango", price: 210, image: "/images/mali_co_autumn_harvest_scoop.png", desc: "Infused with Alphonso mango pulp." },
  { id: "b3", name: "Saffron Rose", price: 230, image: "/images/mali_co_vibrant_loading_asset.png", desc: "A royal blend of Kashmiri saffron and rose." }
];

const TOPPINGS = [
  { id: "t1", name: "Crushed Pistachio", price: 40 },
  { id: "t2", name: "Saffron Strands", price: 60 },
  { id: "t3", name: "Organic Honey", price: 30 },
  { id: "t4", name: "Silver Leaf (Vark)", price: 80 },
  { id: "t5", name: "Roasted Almonds", price: 40 },
  { id: "t6", name: "Rose Petals", price: 25 }
];

export default function CustomizationSection() {
  const [step, setStep] = useState(1);
  const [selectedBase, setSelectedBase] = useState<typeof BASES[0] | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<typeof TOPPINGS>([]);
  
  const addItem = useCartStore((state) => state.addItem);
  const showToast = useToastStore((state: any) => state.showToast);

  const toggleTopping = (topping: typeof TOPPINGS[0]) => {
    if (selectedToppings.find(t => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter(t => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  const calculateTotal = () => {
    const basePrice = selectedBase?.price || 0;
    const toppingsPrice = selectedToppings.reduce((sum, t) => sum + t.price, 0);
    return basePrice + toppingsPrice;
  };

  const handleAddToCart = () => {
    if (!selectedBase) return;
    
    const customName = `Custom ${selectedBase.name} (${selectedToppings.length} toppings)`;
    addItem({ 
      id: `custom-${selectedBase.id}-${Date.now()}`, 
      name: customName, 
      price: `₹${calculateTotal()}`
    });
    
    showToast(`${customName} Created & Churned!`);
    // Reset
    setStep(1);
    setSelectedBase(null);
    setSelectedToppings([]);
  };

  return (
    <section id="customize" className="py-32 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-stretch">
          
          {/* Left: Interactive Builder */}
          <div className="w-full lg:w-3/5 space-y-12">
            <div>
              <div className="text-autumn-orange font-outfit text-[10px] font-bold uppercase tracking-[0.5em] mb-4 italic">Artisanal Atelier</div>
              <h2 className="text-5xl md:text-8xl font-bold font-playfair text-chocolate tracking-tighter mb-8 leading-tight">
                Craft Your <span className="italic text-autumn-orange">Bespoke</span> Scoop
              </h2>
              <p className="text-chocolate/60 font-outfit text-sm leading-relaxed max-w-lg">
                Personalize your indulgence. Select a hand-churned base and adorn it with our curated selection of premium toppings.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur-3xl rounded-[4rem] p-10 md:p-16 border border-chocolate/5 shadow-[0_50px_100px_rgba(47,27,18,0.05)] relative min-h-[600px] flex flex-col">
              
              {/* Step Navigation */}
              <div className="flex items-center gap-4 mb-16 border-b border-chocolate/5 pb-8">
                <div className={`p-4 rounded-full transition-all flex items-center gap-3 ${step === 1 ? 'bg-chocolate text-cream shadow-xl' : 'text-chocolate/30'}`}>
                   <span className="font-outfit font-black text-[10px] uppercase tracking-widest">01</span>
                   <span className="font-playfair font-bold text-sm italic">Base Flavor</span>
                </div>
                <div className="w-12 h-px bg-chocolate/10" />
                <div className={`p-4 rounded-full transition-all flex items-center gap-3 ${step === 2 ? 'bg-chocolate text-cream shadow-xl' : 'text-chocolate/30'}`}>
                   <span className="font-outfit font-black text-[10px] uppercase tracking-widest">02</span>
                   <span className="font-playfair font-bold text-sm italic">Toppings</span>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {step === 1 ? (
                  <motion.div 
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1"
                  >
                    {BASES.map((base) => (
                      <button 
                        key={base.id}
                        onClick={() => setSelectedBase(base)}
                        className={`group relative p-8 rounded-[3rem] border-2 transition-all text-left flex flex-col gap-6 ${selectedBase?.id === base.id ? 'border-autumn-orange bg-white shadow-2xl' : 'border-chocolate/5 hover:border-chocolate/10 bg-white/50'}`}
                      >
                         <div className="relative w-full aspect-square rounded-[2rem] overflow-hidden">
                           <Image src={base.image} alt={base.name} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                         </div>
                         <div>
                            <div className="flex justify-between items-center mb-2">
                               <h3 className="text-2xl font-playfair font-bold text-chocolate italic">{base.name}</h3>
                               <p className="text-autumn-orange font-outfit text-sm font-bold">₹{base.price}</p>
                            </div>
                            <p className="text-chocolate/40 font-outfit text-[10px] font-bold uppercase tracking-widest leading-relaxed">{base.desc}</p>
                         </div>
                         {selectedBase?.id === base.id && (
                            <div className="absolute top-4 right-4 w-10 h-10 bg-autumn-orange text-white rounded-full flex items-center justify-center shadow-lg">
                              <Check className="w-5 h-5" />
                            </div>
                         )}
                      </button>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div 
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="flex-1"
                  >
                    <button onClick={() => setStep(1)} className="flex items-center gap-2 text-chocolate/30 hover:text-autumn-orange transition-all font-outfit font-bold uppercase tracking-widest text-[9px] mb-10">
                      <ArrowLeft className="w-4 h-4" /> Change Base Flavor
                    </button>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                      {TOPPINGS.map((topping) => {
                        const isSelected = selectedToppings.find(t => t.id === topping.id);
                        return (
                          <button 
                            key={topping.id}
                            onClick={() => toggleTopping(topping)}
                            className={`p-6 rounded-[2rem] border-2 transition-all flex flex-col items-center text-center gap-4 ${isSelected ? 'border-autumn-orange bg-white shadow-xl scale-105' : 'border-chocolate/5 bg-white/50 hover:bg-white'}`}
                          >
                             <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isSelected ? 'bg-autumn-orange text-white' : 'bg-chocolate/5 text-chocolate/20'}`}>
                               {isSelected ? <Check className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                             </div>
                             <div>
                                <h4 className="font-playfair font-bold text-chocolate italic">{topping.name}</h4>
                                <p className="text-autumn-orange/60 font-outfit text-[10px] font-bold mt-1">+₹{topping.price}</p>
                             </div>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-16 pt-8 border-t border-chocolate/5 flex justify-between items-center">
                 <div className="text-chocolate/30 font-outfit font-black text-[10px] uppercase tracking-[0.4em]">Step {step} of 02</div>
                 {step === 1 ? (
                   <button 
                    disabled={!selectedBase}
                    onClick={() => setStep(2)}
                    className="px-12 py-5 bg-chocolate text-cream rounded-full font-outfit font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl hover:bg-autumn-orange transition-all disabled:opacity-30 flex items-center gap-4"
                  >
                    Next Step <ChevronRight className="w-4 h-4" />
                  </button>
                 ) : (
                   <button 
                    onClick={handleAddToCart}
                    className="px-12 py-5 bg-autumn-orange text-white rounded-full font-outfit font-bold text-[10px] uppercase tracking-[0.2em] shadow-2xl hover:bg-chocolate transition-all flex items-center gap-4"
                  >
                    Add Custom Creation <ShoppingBag className="w-4 h-4" />
                  </button>
                 )}
              </div>
            </div>
          </div>

          {/* Right: Live Preview */}
          <div className="w-full lg:w-2/5">
             <div className="sticky top-40 bg-[#BE0027] rounded-[4rem] p-12 text-white h-fit shadow-2xl overflow-hidden border border-white/10 group">
                <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/40" />
                
                <div className="relative z-10 text-center space-y-8">
                  <div className="text-white/40 font-black font-outfit text-[10px] uppercase tracking-[0.5em] italic">Live Preview</div>
                  
                  <div className="relative w-64 h-64 mx-auto rounded-full overflow-hidden border-8 border-white/5 shadow-inner">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={selectedBase?.id || 'empty'}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="relative w-full h-full"
                      >
                        <Image 
                          src={selectedBase?.image || "/images/malai_kulfi.png"} 
                          alt="Bespoke Creation" 
                          fill 
                          className={`object-cover ${!selectedBase ? 'grayscale opacity-30 shadow-none' : 'group-hover:scale-110 transition-transform duration-[2s] shadow-2xl'}`} 
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-4xl md:text-5xl font-playfair font-bold tracking-tight mb-2">
                       {selectedBase?.name || "Choose A Flavor"}
                    </h3>
                    <div className="flex flex-wrap justify-center gap-2">
                      {selectedToppings.map(t => (
                        <span key={t.id} className="px-4 py-1.5 bg-white/10 rounded-full text-[9px] font-outfit font-bold uppercase tracking-widest border border-white/10">
                          {t.name}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-10 border-t border-white/10 mt-10">
                    <div className="flex justify-between items-center mb-2">
                       <span className="text-white/40 font-outfit text-[10px] font-bold uppercase tracking-widest">Estimated Indulgence</span>
                       <span className="text-3xl font-playfair font-bold italic">₹{calculateTotal()}</span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl" />
                <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-autumn-amber/10 rounded-full blur-3xl text-sm" />
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
