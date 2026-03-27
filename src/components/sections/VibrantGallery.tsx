"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const GALLERY_ITEMS = [
  {
    title: "Alphonso & Pistachio",
    description: "Hand-picked Ratnagiri mangoes meet premium Persian pistachios.",
    image: "/images/mali_co_vibrant_mango_pistachio_galllery_asset.png",
    color: "from-orange-500/20",
  },
  {
    title: "Wild Berry Swirl",
    description: "A dance of Himalayan raspberries and slow-cooled malai.",
    image: "/images/mali_co_vibrant_berry_swirl_asset.png",
    color: "from-pink-500/20",
  },
  {
    title: "Death by Chocolate",
    description: "The ultimate sin with dark cocoa and brownie melt.",
    image: "/images/death_by_chocolate.png",
    color: "from-chocolate/20",
  }
];

export default function VibrantGallery() {
  return (
    <section className="py-32 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-sage font-outfit text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
            >
              Artisanal Palette
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-8xl font-bold font-playfair text-chocolate tracking-tighter leading-none"
            >
              Vibrant <span className="italic text-sage">Creations</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-chocolate/50 font-outfit max-w-xs text-sm leading-relaxed mt-6 md:mt-0"
          >
            Inspired by the colors of nature. We use no artificial dyes, just the pure pigment of real fruits.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="group relative h-[600px] rounded-[3rem] overflow-hidden bg-white shadow-2xl hover:shadow-sage/20 transition-all duration-700"
            >
              <div className={`absolute inset-0 bg-gradient-to-b ${item.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
              
              <div className="absolute inset-0 p-12 flex flex-col justify-end z-20">
                <h3 className="text-3xl font-bold font-playfair text-chocolate mb-2 transform group-hover:-translate-y-2 transition-transform duration-500">{item.title}</h3>
                <p className="text-chocolate/60 font-outfit text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">{item.description}</p>
                
                <div className="w-12 h-1 bg-sage mt-6 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
              </div>

              <div className="absolute inset-0 scale-100 group-hover:scale-110 transition-transform duration-[2000ms]">
                <Image 
                  src={item.image} 
                  alt={item.title} 
                  fill 
                  className="object-contain p-12 transition-all duration-700"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
