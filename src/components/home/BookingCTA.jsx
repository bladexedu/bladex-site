import React from 'react';
import { ArrowRight, CalendarCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

export default function BookingCTA() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <CalendarCheck className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Take the First Step?
          </h2>
          <p className="text-slate-400 text-lg mb-3 leading-relaxed">
            Our consultants are ready to help you navigate your study abroad journey. Whether you're just starting or need clarity, we're here for you.
          </p>
          <p className="text-slate-500 text-sm mb-10">
            No commitment. Just a conversation to help you move forward.
          </p>
          <Link
            to={createPageUrl('Consultants')}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-full text-base transition-colors"
          >
            Meet Our Consultants
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}