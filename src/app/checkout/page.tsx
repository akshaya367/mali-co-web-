"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/lib/store";
import { ArrowLeft, Wallet, Truck, MessageCircle, CheckCircle, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/sections/Navbar";
import Image from "next/image";
import { useAuth } from "@/lib/useAuth";
import AuthModal from "@/components/sections/AuthModal";

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const { session } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const handlePlaceOrder = () => {
    if (!session) {
      setIsAuthOpen(true);
      return;
    }

    setIsSuccess(true);
    
    // Preparation for WhatsApp
    const orderDetails = items.map(item => `${item.name} (x${item.quantity})`).join(", ");
    const message = `Hi malai %26 co! I'd like to place an order:
---------------------------
Order Details: ${orderDetails}
Total Amount: ₹${totalPrice()}
Payment Method: ${paymentMethod.toUpperCase()}
---------------------------
Please confirm my order.`;
    
    setTimeout(() => {
      window.open(`https://wa.me/911234567890?text=${encodeURIComponent(message)}`, "_blank");
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-cream selection:bg-sage selection:text-white pb-32">
      <Navbar />
      
      <div className="container mx-auto px-6 pt-40">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Form Side */}
          <div className="flex-1 space-y-12">
            <Link href="/" className="flex items-center gap-2 text-chocolate/30 hover:text-sage transition-all font-outfit uppercase tracking-[0.3em] text-[10px] font-bold">
              <ArrowLeft className="w-4 h-4" /> Return to Menu
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-8xl font-bold font-playfair text-chocolate tracking-tighter mb-4">Finalize your <span className="italic text-sage">Scoops</span></h1>
              <p className="font-outfit text-chocolate/40 text-[10px] font-bold uppercase tracking-[0.4em] mb-12">Carefully Churning Your Details</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="font-outfit text-[10px] font-bold uppercase tracking-[0.3em] text-chocolate/40 px-2">Your Name</label>
                  <input type="text" placeholder="Gaurav Sharma" className="w-full p-8 bg-white rounded-[2rem] outline-none border border-chocolate/5 focus:border-sage/40 transition-all font-outfit text-black text-sm" />
                </div>
                <div className="space-y-4">
                  <label className="font-outfit text-[10px] font-bold uppercase tracking-[0.3em] text-chocolate/40 px-2">Phone Number</label>
                  <input type="tel" placeholder="+91 98765 43210" className="w-full p-8 bg-white rounded-[2rem] outline-none border border-chocolate/5 focus:border-sage/40 transition-all font-outfit text-black text-sm" />
                </div>
                <div className="md:col-span-2 space-y-4">
                  <label className="font-outfit text-[10px] font-bold uppercase tracking-[0.3em] text-chocolate/40 px-2">Delivery Address</label>
                  <textarea rows={3} placeholder="Flat No, Apartment, Street, Locality" className="w-full p-8 bg-white rounded-[3rem] outline-none border border-chocolate/5 focus:border-sage/40 transition-all font-outfit text-black text-sm" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold font-playfair text-chocolate mb-10 tracking-tight">Select Payment Method</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <button 
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-10 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-6 relative overflow-hidden ${paymentMethod === 'upi' ? 'border-sage bg-white shadow-2xl scale-105' : 'border-chocolate/5 bg-white/50 hover:bg-white'}`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${paymentMethod === 'upi' ? 'bg-sage/10 text-sage' : 'bg-chocolate/5 text-chocolate/20'}`}>
                    <Wallet className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <span className="font-outfit font-bold uppercase tracking-[0.2em] text-[10px] block mb-1">UPI Payments</span>
                    <span className="text-[9px] font-outfit text-chocolate/40 font-medium">GPay, PhonePe, Paytm</span>
                  </div>
                </button>
                <button 
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-10 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-6 relative overflow-hidden ${paymentMethod === 'cod' ? 'border-sage bg-white shadow-2xl scale-105' : 'border-chocolate/5 bg-white/50 hover:bg-white'}`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${paymentMethod === 'cod' ? 'bg-sage/10 text-sage' : 'bg-chocolate/5 text-chocolate/20'}`}>
                    <Truck className="w-8 h-8" />
                  </div>
                  <div className="text-center">
                    <span className="font-outfit font-bold uppercase tracking-[0.2em] text-[10px] block mb-1">Cash On Delivery</span>
                    <span className="text-[9px] font-outfit text-chocolate/40 font-medium">Pay 100% at delivery</span>
                  </div>
                </button>
              </div>

              {/* Demo QR View for UPI */}
              {paymentMethod === 'upi' && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-10 p-10 bg-white rounded-[3rem] border border-sage/20 text-center flex flex-col items-center"
                >
                  <div className="text-sage font-outfit text-[10px] font-bold uppercase tracking-[0.4em] mb-8 animate-pulse italic">Awaiting Secure Payment</div>
                  <div className="relative w-64 h-64 mb-8 border-8 border-sage/5 rounded-[3rem] p-8 bg-[#FDFBF0] shadow-inner group">
                    <Image src="/images/luxury_qr.png" alt="Luxury QR Code" fill className="object-contain p-4 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-tr from-sage/10 via-transparent to-white/20 pointer-events-none" />
                  </div>
                  <div className="flex items-center gap-3 mb-8 bg-sage/5 px-6 py-3 rounded-full border border-sage/10 text-sage">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-[9px] font-outfit font-black uppercase tracking-widest">Payable to: malai & co.</span>
                  </div>
                  <p className="max-w-[300px] text-chocolate/40 font-outfit text-[10px] leading-relaxed italic">Scan using Google Pay, PhonePe, or Paytm. Once done, click 'Place Order' below to inform our artisanal chef!</p>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Summary Side */}
          <div className="w-full lg:w-[480px]">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white p-12 rounded-[4rem] border border-chocolate/5 shadow-2xl sticky top-40 flex flex-col"
            >
              <h2 className="text-3xl font-bold font-playfair text-chocolate tracking-tight mb-10 border-b border-chocolate/5 pb-8 flex items-center gap-4">
                Your <span className="italic text-sage">Indulgence</span>
              </h2>
              
              <div className="space-y-8 mb-12 max-h-[300px] overflow-y-auto pr-4 scrollbar-hide py-2">
                {items.length === 0 ? (
                  <p className="text-chocolate/30 italic font-outfit">Your cone is empty...</p>
                ) : (
                  items.map(item => (
                    <div key={item.id} className="flex justify-between items-center group">
                      <div>
                        <p className="font-outfit font-bold text-[10px] text-chocolate uppercase tracking-[0.2em] mb-2 group-hover:text-sage transition-colors">{item.name}</p>
                        <p className="text-chocolate/30 text-[9px] font-bold uppercase tracking-widest font-outfit">Quantity: {item.quantity}</p>
                      </div>
                      <span className="font-playfair font-bold text-sage">{item.price}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-4 border-t border-chocolate/5 pt-12 mb-12">
                <div className="flex justify-between items-center text-chocolate/40 font-outfit text-[10px] font-bold uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-chocolate">₹{totalPrice()}</span>
                </div>
                <div className="flex justify-between items-center text-chocolate/40 font-outfit text-[10px] font-bold uppercase tracking-widest">
                  <span>Traditional Delivery</span>
                  <span className="text-sage italic">Free</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-[0.4em] text-chocolate/30 pt-4">Final Sum</div>
                <div className="flex justify-between items-center text-4xl font-bold font-playfair text-chocolate tracking-tighter">
                  <span>₹{totalPrice()}</span>
                  <div className="text-[10px] font-outfit text-sage bg-sage/5 px-4 py-1 rounded-full uppercase tracking-widest">Inclusive</div>
                </div>
              </div>

              <button 
                onClick={handlePlaceOrder}
                disabled={items.length === 0}
                className="w-full py-6 bg-chocolate text-cream rounded-full font-outfit font-bold text-[12px] uppercase tracking-[0.2em] shadow-2xl flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
              >
                Place Order <ChevronRight className="w-5 h-5" />
              </button>
              <p className="text-center text-[9px] uppercase font-bold tracking-[0.3em] text-chocolate/20 mt-8">Order Will Be Confirmed on WhatsApp</p>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isSuccess && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-chocolate/60 backdrop-blur-xl z-[500]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 100 }}
              className="fixed inset-0 m-auto w-full max-w-lg h-fit bg-white rounded-[4rem] p-16 z-[501] shadow-2xl flex flex-col items-center text-center border-t-8 border-sage"
            >
              <div className="w-32 h-32 bg-sage/10 rounded-full flex items-center justify-center mb-10">
                <CheckCircle className="w-16 h-16 text-sage" />
              </div>
              <h2 className="text-5xl font-playfair font-bold text-chocolate mb-6 tracking-tighter">Order Placed!</h2>
              <p className="font-outfit text-[11px] font-bold uppercase tracking-[0.4em] text-sage mb-10 italic">Sweetness is on the way</p>
              
              <div className="p-8 bg-sage/5 rounded-[2.5rem] w-full mb-12 border border-sage/10">
                 <div className="flex items-center gap-4 justify-center mb-6">
                    <Image src="/images/malai_kulfi.png" alt="Happy Kulfi" width={40} height={40} />
                    <span className="text-chocolate/60 font-outfit text-[10px] font-bold uppercase tracking-widest">Order Handed to Chef</span>
                 </div>
                 <p className="text-chocolate/40 text-[10px] font-medium leading-relaxed">We're now redirecting you to WhatsApp to confirm delivery and finalise your payment details.</p>
              </div>

              <div className="flex items-center gap-4 animate-pulse">
                <LoaderIcon className="w-4 h-4 animate-spin text-sage" />
                <span className="text-[10px] font-bold font-outfit text-chocolate/20 uppercase tracking-[0.5em]">Redirecting...</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </main>
  );
}

function LoaderIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  );
}
