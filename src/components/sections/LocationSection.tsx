"use client";

import { motion } from "framer-motion";
import { Clock, Navigation, MapPin, Phone, MessageCircle } from "lucide-react";

const STORE_INFO = {
  name: "malai & co ice cream",
  timings: "Open Daily 11 AM – 11 PM",
  phone: "+91 9123456789",
  whatsapp: "+91 9123456789",
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15133.5!2d73.81!3d18.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf3e45!2smalai%20%26%20co%20ice%20cream!5e0!3m2!1sen!2sin!4v1711200000000",
  directions: "https://maps.app.goo.gl/5NwrypjpSkyzSYwKA"
};

export default function LocationSection() {
  return (
    <section id="location" className="py-24 bg-cream/30 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-8 lg:gap-16">
        
        {/* Contact Info Card */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex-shrink-0 w-full md:w-[400px] lg:w-[480px] p-8 md:p-12 glass rounded-[3rem] shadow-2xl relative bg-white/40"
        >
          <div className="flex items-center gap-4 mb-10 pb-10 border-b border-chocolate/5">
            <div className="p-4 bg-autumn-amber/10 rounded-2xl">
              <MapPin className="text-autumn-amber w-6 h-6" />
            </div>
            <div>
              <h3 className="text-2xl font-playfair text-chocolate mb-1">{STORE_INFO.name}</h3>
              <p className="text-sm font-outfit text-chocolate/50 uppercase tracking-widest leading-relaxed">Artisanal Creamery</p>
            </div>
          </div>

          <div className="space-y-10 mb-12">
            <div className="flex items-start gap-5">
              <Clock className="w-6 h-6 text-chocolate/40 mt-1" />
              <div>
                <p className="font-outfit text-sm text-autumn-amber uppercase tracking-widest font-bold mb-2">Timings</p>
                <p className="text-lg text-chocolate font-playfair">{STORE_INFO.timings}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <motion.a
                href={`tel:${STORE_INFO.phone}`}
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-chocolate/5 hover:bg-white transition-all shadow-sm"
              >
                <Phone className="w-5 h-5 text-chocolate/60" />
                <span className="font-outfit text-chocolate">{STORE_INFO.phone}</span>
              </motion.a>

              <motion.a
                href={`https://wa.me/${STORE_INFO.whatsapp.replace(/\+/g, '')}?text=Hi! I am looking for mali%26co.`}
                target="_blank"
                whileHover={{ scale: 1.02, x: 5 }}
                className="flex items-center gap-4 p-4 rounded-2xl border border-chocolate/5 hover:bg-white transition-all shadow-sm"
              >
                <MessageCircle className="w-5 h-5 text-green-600" />
                <span className="font-outfit text-chocolate">WhatsApp Now</span>
              </motion.a>
            </div>
          </div>

          <motion.a
            href={STORE_INFO.directions}
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full py-5 bg-chocolate text-cream rounded-full flex items-center justify-center gap-3 font-outfit font-bold shadow-lg shadow-chocolate/20"
          >
            Get Directions <Navigation className="w-5 h-5" />
          </motion.a>
        </motion.div>

        {/* Map Embed */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex-grow min-h-[400px] md:min-h-auto rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/60 relative"
        >
          {/* I'll use a better looking placeholder if possible, but an iframe is needed for real map */}
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1891.1!2d73.856!3d18.52!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPune!5e0!3m2!1sen!2sin!4v1620000000000" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(0.5) contrast(1.2)' }} 
            loading="lazy"
            allowFullScreen
          />
        </motion.div>
      </div>

    </section>
  );
}
