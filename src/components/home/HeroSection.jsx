import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-900">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
          alt="Students studying"
          className="w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900/90 to-blue-950/80" />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 z-0 opacity-10"
        style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 text-xs font-semibold tracking-wider uppercase mb-6">
              BladeX Educational Consulting & Mentorship
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            Find Your Path.<br />
            <span className="text-blue-400">Study Abroad</span><br />
            With Confidence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-300 mb-10 leading-relaxed"
          >
            Welcome to BladeX Education. We provide strategic educational advisory for students navigating their international academic journey. Our goal is to help you find clarity, direction, and a pathway that perfectly aligns with your ambitions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link to={createPageUrl('Consultants')}>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 text-base rounded-full font-semibold">
                Meet Our Consultants
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link to={createPageUrl('Programs')}>
              <Button size="lg" variant="outline" className="border-slate-400 text-slate-200 bg-slate-400/20 hover:bg-slate-300/30 px-8 py-5 text-base rounded-full">
                Our Programs
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Quick badge row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-3 mt-10"
          >
            {['One-on-One Mentorship', 'Study Abroad Guidance', 'Career Pathways', 'No Visa Processing'].map((tag) => (
              <span key={tag} className="text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                {tag}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}