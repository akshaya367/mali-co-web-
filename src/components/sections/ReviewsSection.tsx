"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

const REVIEWS = [
  {
    name: "Siya Sharma",
    role: "Food Blogger",
    content: "The Best Kulfi Sundae I've ever had in India! mali&co really knows how to blend luxury with traditional flavors.",
    rating: 5,
    avatar: "/images/review_1.jpg",
  },
  {
    name: "Varun Verma",
    role: "Restaurateur",
    content: "An absolute visual delight. The ambiance at the store and the quality of dessert is just unmatched. 10/10 recommended!",
    rating: 5,
    avatar: "/images/review_2.jpg",
  },
  {
    name: "Ananya Iyer",
    role: "Design Architect",
    content: "Minimalist but incredibly rich in taste. Their Sea Salt Affogato is a game changer for coffee lovers.",
    rating: 4.5,
    avatar: "/images/review_3.jpg",
  },
  {
    name: "Rahul Mehra",
    role: "Epicurean Enthusiast",
    content: "The packaging itself is a luxury. Every scoop feels like pure happiness as their tagline says.",
    rating: 5,
    avatar: "/images/review_4.jpg",
  }
];

export default function ReviewsSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % REVIEWS.length);
  };
  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 500 : -500,
      opacity: 0,
    }),
  };

  return (
    <section id="reviews" className="py-32 bg-cream/50 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-autumn-orange font-outfit text-[10px] font-bold uppercase tracking-[0.5em] mb-4 italic"
          >
            Artisanal Appreciations
          </motion.div>
          <h2 className="text-6xl md:text-8xl font-black font-playfair text-chocolate tracking-tighter mb-8 leading-tight">
             Churned into <span className="italic text-autumn-orange font-medium">Happiness</span>
          </h2>
        </div>

        <div className="relative max-w-6xl mx-auto min-h-[500px] flex items-center justify-center">
            
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div 
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
                className="w-full"
              >
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl group">
                       <Image 
                         src={REVIEWS[index].avatar || "/images/malai_kulfi.png"} 
                         alt={REVIEWS[index].name} 
                         fill 
                         className="object-cover transition-transform duration-[3s] group-hover:scale-110"
                       />
                       <div className="absolute inset-0 bg-gradient-to-tr from-chocolate/40 via-transparent to-white/10" />
                       <div className="absolute bottom-10 left-10 text-white z-10">
                          <p className="font-playfair text-3xl font-bold italic mb-1">{REVIEWS[index].name}</p>
                          <p className="font-outfit text-[9px] font-black uppercase tracking-[0.3em] text-white/60">{REVIEWS[index].role}</p>
                       </div>
                    </div>

                    <div className="space-y-10 relative">
                       <Quote className="w-20 h-20 text-autumn-orange/10 absolute -top-10 -left-10" />
                       
                       <div className="flex gap-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`w-5 h-5 ${i < REVIEWS[index].rating ? 'fill-autumn-orange text-autumn-orange' : 'text-chocolate/10'}`} 
                            />
                          ))}
                       </div>

                       <h3 className="text-3xl md:text-5xl font-playfair text-chocolate leading-relaxed italic font-medium tracking-tight">
                         "{REVIEWS[index].content}"
                       </h3>

                       <div className="h-0.5 w-16 bg-autumn-orange/20" />
                       
                       <div className="flex gap-4">
                         {REVIEWS.map((_, i) => (
                           <button 
                             key={i}
                             onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                             className={`h-1.5 transition-all duration-500 rounded-full ${i === index ? 'w-12 bg-autumn-orange' : 'w-3 bg-chocolate/10'}`}
                           />
                         ))}
                       </div>
                    </div>
                 </div>
              </motion.div>
            </AnimatePresence>

            {/* Floatings */}
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 hidden xl:block">
               <button onClick={prev} className="w-16 h-16 rounded-full border border-chocolate/5 bg-white shadow-xl flex items-center justify-center text-chocolate hover:bg-chocolate hover:text-white transition-all">
                  <ChevronLeft className="w-6 h-6" />
               </button>
            </div>
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 hidden xl:block">
               <button onClick={next} className="w-16 h-16 rounded-full border border-chocolate/5 bg-white shadow-xl flex items-center justify-center text-chocolate hover:bg-chocolate hover:text-white transition-all">
                  <ChevronRight className="w-6 h-6" />
               </button>
            </div>
        </div>
      </div>

      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-autumn-orange/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none rotate-90">
         <span className="text-[18rem] font-playfair font-black text-chocolate">ARTISANAL</span>
      </div>
    </section>
  );
}
