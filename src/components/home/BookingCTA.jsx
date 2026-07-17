import React from 'react';
import { solidButton } from '@/utils/glassStyles';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function BookingCTA() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="w-16 h-16 bg-blue-100 border border-blue-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <img
              src="https://img.icons8.com/stickers/100/event-accepted.png"
              alt="Event accepted icon"
              className="w-10 h-10 object-contain"
              loading="lazy"
            />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ready to Take the First Step?
          </h2>
          <p className="text-slate-600 text-lg mb-3 leading-relaxed">
            Our consultants are ready to help you navigate your study abroad journey. Whether you're just starting or need clarity, we're here for you.
          </p>
          <p className="text-slate-400 text-sm mb-10">
            No commitment. Just a conversation to help you move forward.
          </p>
          <Link to={createPageUrl('Consultants')} className="inline-block transition-transform duration-200 hover:scale-105">
            <button
              className={`group inline-flex items-center justify-center gap-2 rounded-full font-bold text-white bg-shine-gradient ${solidButton.lg}`}
            >
              <span>Meet Our Consultants</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-[transform,margin] duration-500 ease-out group-hover:translate-x-2 group-hover:scale-110" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}