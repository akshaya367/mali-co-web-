"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight } from "lucide-react";
import { useCartStore } from "@/lib/store";
import Link from "next/link";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-chocolate/40 backdrop-blur-md z-[200]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white/95 backdrop-blur-3xl z-[201] shadow-2xl flex flex-col border-l border-chocolate/5"
          >
            <div className="p-10 border-b border-chocolate/5 flex justify-between items-center bg-sage/5">
              <div className="flex items-center gap-4">
                <ShoppingBag className="w-8 h-8 text-sage" />
                <div>
                  <h2 className="text-3xl font-bold font-playfair text-chocolate tracking-tighter">My Cart</h2>
                  <p className="text-[10px] font-outfit font-bold uppercase tracking-[0.2em] text-chocolate/40">{totalItems()} scoops selected</p>
                </div>
              </div>
              <button onClick={onClose} className="p-3 hover:bg-sage/10 rounded-full transition-all">
                <X className="w-6 h-6 text-chocolate/30" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <div className="w-24 h-24 bg-sage/10 rounded-full flex items-center justify-center mb-8">
                    <ShoppingBag className="w-10 h-10 text-sage" />
                  </div>
                  <p className="font-outfit text-sm font-bold uppercase tracking-widest italic">Your cart is as empty as a finished cone.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex flex-col gap-4 group">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold font-playfair text-2xl text-chocolate leading-tight mb-2 group-hover:text-sage transition-colors">{item.name}</h3>
                        <p className="text-sage font-bold font-outfit text-sm">{item.price}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-chocolate/10 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="flex items-center bg-sage/5 rounded-full px-4 py-2 border border-sage/10">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:text-sage transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-12 text-center font-outfit font-bold text-lg">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:text-sage transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-sm font-outfit font-bold text-chocolate/30 uppercase tracking-widest">
                        Item Subtotal
                      </div>
                    </div>
                    <div className="h-px w-full bg-chocolate/5 mt-4" />
                  </div>
                ))
              )}
            </div>

            <div className="p-10 bg-sage/5 border-t border-chocolate/5">
              <div className="flex justify-between items-center mb-10">
                <span className="text-chocolate/40 font-outfit font-bold uppercase tracking-[0.3em] text-[10px]">Total Indulgence</span>
                <span className="text-4xl font-bold font-playfair text-chocolate tracking-tighter">₹{totalPrice()}</span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className={`w-full py-6 bg-chocolate text-cream rounded-full font-outfit font-bold text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-2xl disabled:opacity-50 disabled:grayscale transition-all hover:scale-[1.02] active:scale-[0.98] ${items.length === 0 ? 'pointer-events-none opacity-50 grayscale' : ''}`}
              >
                Proceed to Checkout <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
