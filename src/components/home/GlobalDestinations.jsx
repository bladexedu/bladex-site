import React from 'react';
import { motion } from 'framer-motion';

export default function GlobalDestinations() {
  return (
    <section className="relative py-24 bg-white border-y border-slate-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Where We Can Take You</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Global Destinations & Fields of Study</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Destinations */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: 'easeOut' } }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm cursor-default"
          >
            <h3 className="text-xl font-bold text-slate-900 leading-snug mb-6">
              1. Global Destinations
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              We guide students toward top-tier educational hubs worldwide. Whether you are looking to study in the US, Canada, or the UK, or exploring diverse academic opportunities across Europe and Asia, we help you find the destination that fits your goals.
            </p>
            <div className="flex flex-wrap gap-2">
              {['United States', 'Canada', 'United Kingdom', 'France', 'Hungary', 'Italy', 'Japan', 'South Korea', 'Australia', 'and more...'].map((d) => (
                <span key={d} className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium">{d}</span>
              ))}
            </div>
          </motion.div>

          {/* Academic Majors */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: 'easeOut' } }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm cursor-default"
          >
            <h3 className="text-xl font-bold text-slate-900 leading-snug mb-6">
              2. Fields of Study
            </h3>
            <p className="text-slate-600 leading-relaxed mb-6">
              We strategically align your career ambitions with the right university programs. Our expertise covers a wide spectrum of competitive disciplines, including Business, Computer Science, Software Engineering, Data Science, Medicine, Biochemistry, and many more.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Business', 'Computer Science', 'Software Engineering', 'Data Science', 'Medicine', 'Biochemistry', 'and more...'].map((m) => (
                <span key={m} className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full font-medium">{m}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
