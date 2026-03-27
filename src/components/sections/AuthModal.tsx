"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, Globe, UserPlus, LogIn, Loader2, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
        });
        if (error) throw error;
        onClose();
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        onClose();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-chocolate/40 backdrop-blur-md z-[300]"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 m-auto w-full max-w-md h-fit bg-cream z-[301] shadow-2xl rounded-[3rem] p-10 flex flex-col items-center"
          >
            <button onClick={onClose} className="absolute right-6 top-6 p-3 bg-white/80 hover:bg-white text-chocolate rounded-full shadow-lg z-[310] transition-all">
              <X className="w-6 h-6" />
            </button>

            <div className="w-20 h-20 bg-sage/10 rounded-full flex items-center justify-center mb-8">
              {mode === "login" ? <LogIn className="text-sage w-8 h-8" /> : <UserPlus className="text-sage w-8 h-8" />}
            </div>

            <h2 className="text-3xl font-playfair text-chocolate mb-2">
              {mode === "login" ? "Welcome Back" : "Join malai & co"}
            </h2>
            <p className="text-chocolate/60 font-outfit text-[10px] uppercase font-bold tracking-[0.2em] mb-10 text-center">
              {mode === "login" ? "Enjoy your membership & faster scoops!" : "Become a member for exclusive ice cream rewards."}
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4 mb-8">
              {error && (
                <div className="p-4 bg-red-50 text-red-500 text-[10px] font-bold rounded-xl text-center border border-red-100 uppercase tracking-widest italic animate-pulse">
                  {error}
                </div>
              )}
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-chocolate/30" />
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address" 
                  required
                  className="w-full pl-12 pr-6 py-4 rounded-2xl border border-chocolate/5 bg-white/50 focus:bg-white outline-none focus:border-sage/40 transition-all font-outfit text-sm text-black"
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-chocolate/30" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password" 
                  required
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border border-chocolate/5 bg-white/50 focus:bg-white outline-none focus:border-sage/40 transition-all font-outfit text-sm text-black"
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-chocolate/20 hover:text-sage transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {mode === "login" && (
                <div className="flex justify-end pr-2">
                  <button 
                    type="button" 
                    onClick={() => alert("Password reset link sent to " + email)}
                    className="text-[9px] font-bold font-outfit text-sage uppercase tracking-widest hover:underline"
                  >
                    Forgot your scoop password?
                  </button>
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-5 bg-chocolate text-cream rounded-full font-outfit font-bold text-[10px] uppercase tracking-[0.2em] shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : (mode === "login" ? "Login to malai & co" : "Create My Account")}
              </button>
            </form>

            <div className="w-full flex items-center gap-4 mb-8">
              <div className="h-px flex-1 bg-chocolate/5" />
              <span className="text-[10px] uppercase tracking-widest text-chocolate/20 font-bold">OR</span>
              <div className="h-px flex-1 bg-chocolate/5" />
            </div>

            <button 
              onClick={handleGoogleSignIn}
              className="w-full py-4 border border-chocolate/5 bg-white/50 text-chocolate rounded-full font-outfit font-bold shadow-sm flex items-center justify-center gap-3 hover:bg-white transition-all text-[10px] uppercase tracking-widest"
            >
              <Globe className="w-5 h-5 text-sage" />
              Sign in with Google
            </button>

            <div className="mt-10 flex flex-col items-center gap-4">
               <span className="text-[10px] font-outfit text-chocolate/30 uppercase tracking-widest font-bold">
                 {mode === "login" ? "New around here?" : "Already part of the family?"}
               </span>
               <button 
                onClick={() => setMode(mode === "login" ? "signup" : "login")}
                className="text-[10px] font-outfit text-sage uppercase tracking-[0.3em] font-bold border-b border-sage/20 pb-1 hover:text-autumn-orange transition-colors"
              >
                {mode === "login" ? "Join and taste happiness" : "Login to your account"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
