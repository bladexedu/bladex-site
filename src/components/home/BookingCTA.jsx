import React from 'react';
import { ArrowRight, CalendarCheck } from 'lucide-react';
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
            <CalendarCheck className="w-8 h-8 text-blue-600" />
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
          <Link
            to={createPageUrl('Consultants')}
            className="group inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-full text-base shadow-lg shadow-blue-800/40 hover:scale-105 transition-transform duration-200"
            style={{
              background: 'linear-gradient(270deg, #1e3a8a, #1d4ed8, #2563eb, #1e40af, #1e3a8a)',
              backgroundSize: '300% 300%',
              animation: 'btn-gradient 4s ease infinite',
            }}
          >
            Meet Our Consultants
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}