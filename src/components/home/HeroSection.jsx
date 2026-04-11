import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#060b18]">
      {/* Animated styles */}
      <style>{`
        @keyframes blob-drift {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          33% { transform: translate(-40%, -60%) scale(1.1); }
          66% { transform: translate(-60%, -45%) scale(0.95); }
        }
        @keyframes blob-drift-2 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          33% { transform: translate(8%, -10%) scale(1.08); }
          66% { transform: translate(-5%, 8%) scale(0.96); }
        }
        @keyframes grid-pan {
          0% { background-position: 0px 0px; }
          100% { background-position: 36px 36px; }
        }
      `}</style>

      {/* Geometric dot grid background */}
      <div className="absolute inset-0 z-0">
        {/* Slowly panning dot grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.35) 1.5px, transparent 1.5px)',
          backgroundSize: '36px 36px',
          animation: 'grid-pan 8s linear infinite',
        }} />
        {/* Vignette to fade dots at edges */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, #0f172a 100%)',
        }} />
        {/* Primary drifting glow blob */}
        <div className="absolute top-1/2 left-1/4 w-[600px] h-[400px] rounded-full blur-3xl opacity-20"
          style={{
            background: 'radial-gradient(ellipse, #3b82f6, #1d4ed8)',
            animation: 'blob-drift 10s ease-in-out infinite',
          }} />
        {/* Secondary accent blob */}
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[300px] rounded-full blur-3xl opacity-10"
          style={{
            background: 'radial-gradient(ellipse, #6366f1, #0ea5e9)',
            animation: 'blob-drift-2 13s ease-in-out infinite',
          }} />
      </div>

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
              <button className="group inline-flex items-center text-white px-8 py-2.5 text-base rounded-full font-bold shadow-lg shadow-blue-800/40 hover:scale-105 transition-transform duration-200"
                style={{
                  background: 'linear-gradient(270deg, #1e3a8a, #1d4ed8, #2563eb, #1e40af, #1e3a8a)',
                  backgroundSize: '300% 300%',
                  animation: 'btn-gradient 4s ease infinite',
                }}>
                Meet Our Consultants
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </Link>
            <Link to={createPageUrl('Programs')}>
              <button className="group inline-flex items-center text-white px-8 py-2.5 text-base rounded-full font-bold shadow-lg shadow-blue-800/40 hover:scale-105 transition-transform duration-200 border-0"
                style={{
                  background: 'linear-gradient(270deg, #1e3a8a, #1d4ed8, #2563eb, #1e40af, #1e3a8a)',
                  backgroundSize: '300% 300%',
                  animation: 'btn-gradient 4s ease infinite',
                }}>
                Our Programs
                <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
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

      {/* Wave transition → white */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none pointer-events-none">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20 block">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}