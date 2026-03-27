"use client";

import { motion } from "framer-motion";
import { Camera, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";

const FEED_IMAGES = [
  { id: 1, url: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?auto=format&fit=crop&w=400&q=80" },
  { id: 2, url: "https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=400&q=80" },
  { id: 3, url: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=400&q=80" },
  { id: 4, url: "https://images.unsplash.com/photo-1576506295286-5cda18df43e7?auto=format&fit=crop&w=400&q=80" },
];

export default function InstagramPreview() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-autumn-orange font-outfit uppercase tracking-[0.3em] font-bold text-[10px] mb-6"
            >
              <Camera className="w-5 h-5" /> @malaiandco
            </motion.div>
            <h2 className="text-5xl md:text-8xl font-bold font-playfair text-chocolate tracking-tighter">
              Scoops of<br />
              <span className="italic text-autumn-orange">Joy on Feed</span>
            </h2>
          </div>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-12 py-6 border border-chocolate/10 rounded-full font-outfit text-[10px] uppercase font-bold tracking-[0.2em] hover:bg-autumn-orange hover:text-white transition-all shadow-xl"
          >
            Follow our Journey
          </motion.a>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {FEED_IMAGES.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-chocolate/5"
            >
              <Image 
                src={img.url} 
                alt="Instagram Feed" 
                fill 
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-100" 
              />
              <div className="absolute inset-0 bg-autumn-orange/70 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-8">
                 <div className="flex flex-col items-center gap-2 text-white">
                   <Heart className="w-6 h-6 fill-white" />
                   <span className="font-outfit font-bold text-xs">2.4k</span>
                 </div>
                 <div className="flex flex-col items-center gap-2 text-white">
                   <MessageCircle className="w-6 h-6 fill-white" />
                   <span className="font-outfit font-bold text-xs">84</span>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
