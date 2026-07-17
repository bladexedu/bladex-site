import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { solidButton, sectionBadgeBlue, sectionBadgeClass } from '@/utils/glassStyles';
import { ArrowRight, Ban, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import SpaceSectionBackground from '@/components/shared/SpaceSectionBackground';

const heroTagMuted =
  'border border-dashed border-slate-500/50 bg-slate-800/60 text-slate-400';

const heroTags = [
  { label: 'One-on-One Mentorship', className: sectionBadgeBlue, Icon: Check },
  { label: 'Study Abroad Guidance', className: sectionBadgeBlue, Icon: Check },
  { label: 'Career Pathways', className: sectionBadgeBlue, Icon: Check },
  { label: 'No Visa Processing', className: heroTagMuted, Icon: Ban },
];

export default function HeroSection() {
  return (
    <section className="relative pt-28 pb-24 sm:pt-36 sm:pb-32 overflow-hidden bg-[#060b18]">
      {/* Animated styles */}
      <style>{`
        @keyframes blob-drift {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          33% { transform: translate(-44%, -56%) scale(1.06); }
          66% { transform: translate(-52%, -48%) scale(0.97); }
        }
        @keyframes blob-drift-2 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          33% { transform: translate(8%, -10%) scale(1.08); }
          66% { transform: translate(-5%, 8%) scale(0.96); }
        }
        @keyframes blob-drift-3 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          50% { transform: translate(-12%, 14%) scale(1.12); }
        }
        @keyframes blob-drift-4 {
          0%, 100% { transform: translate(0%, 0%) scale(1); }
          40% { transform: translate(10%, -8%) scale(1.06); }
          70% { transform: translate(-6%, 6%) scale(0.94); }
        }
        @keyframes blob-pulse {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 0.28; }
        }
      `}</style>

      {/* Space starfield background */}
      <div className="absolute inset-0 z-0">
        <SpaceSectionBackground softVignette />
        {/* Primary drifting glow blob — kept smaller so left side isn’t washed out */}
        <div
          className="absolute top-[48%] left-[30%] w-[460px] h-[320px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(ellipse, #3b82f6 0%, #1d4ed8 45%, transparent 62%)',
            opacity: 0.26,
            animation: 'blob-drift 10s ease-in-out infinite',
          }}
        />
        {/* Secondary accent blob */}
        <div
          className="absolute bottom-1/4 right-1/5 w-[480px] h-[360px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(ellipse, #6366f1 0%, #0ea5e9 60%, transparent 75%)',
            opacity: 0.24,
            animation: 'blob-drift-2 13s ease-in-out infinite',
          }}
        />
        {/* Top-right cyan orb */}
        <div
          className="absolute -top-8 right-[12%] w-[380px] h-[320px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, #22d3ee 0%, #3b82f6 45%, transparent 70%)',
            opacity: 0.18,
            animation: 'blob-drift-3 16s ease-in-out infinite',
          }}
        />
        {/* Upper-left violet wash — reduced footprint */}
        <div
          className="absolute top-[20%] left-[10%] w-[280px] h-[200px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(ellipse, #818cf8 0%, #4f46e5 42%, transparent 58%)',
            opacity: 0.14,
            animation: 'blob-drift-4 11s ease-in-out infinite',
          }}
        />
        {/* Center-right warm accent */}
        <div
          className="absolute top-[42%] right-[8%] w-[300px] h-[300px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, #60a5fa 0%, #2563eb 55%, transparent 70%)',
            opacity: 0.22,
            animation: 'blob-drift-2 9s ease-in-out infinite reverse, blob-pulse 7s ease-in-out infinite',
          }}
        />
        {/* Lower-center depth orb */}
        <div
          className="absolute bottom-[10%] left-[42%] w-[400px] h-[240px] rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(ellipse, #1e40af 0%, #312e81 45%, transparent 68%)',
            opacity: 0.14,
            animation: 'blob-drift 14s ease-in-out infinite reverse',
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-5 text-left"
      >
          <span className={`${sectionBadgeClass} mb-5`}>
            BladeX Educational Consulting & Mentorship
          </span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="font-bold text-white leading-tight mb-6 sm:mb-8"
          >
            <span className="block text-4xl sm:text-5xl md:text-6xl">Find Your Path.</span>
            <span className="block text-2xl sm:text-4xl md:text-4xl whitespace-nowrap">
              <span className="text-blue-400">Study Abroad</span> With Confidence.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
            className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed mb-7 sm:mb-10"
          >
            Welcome to BladeX Education. We provide strategic educational advisory for students navigating their international academic journey. Our goal is to help you find clarity, direction, and a pathway that perfectly aligns with your ambitions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="flex flex-wrap justify-start gap-3 sm:gap-4"
          >
            <Link to={createPageUrl('Consultants')}>
              <button className={`group ${solidButton.navyHoverHero} ${solidButton.md}`}>
                <span>Meet Our Consultants</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-[transform,margin] duration-500 ease-out group-hover:translate-x-2 group-hover:scale-110" />
              </button>
            </Link>
            <Link to={createPageUrl('Programs')}>
              <button className={`group ${solidButton.navyHoverHero} ${solidButton.md}`}>
                <span>Our Programs</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-[transform,margin] duration-500 ease-out group-hover:translate-x-2 group-hover:scale-110" />
              </button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
            className="flex flex-wrap justify-start gap-2 sm:gap-3 mt-7 sm:mt-10"
          >
            {heroTags.map(({ label, className, Icon }) => (
              <span
                key={label}
                className={`inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-2xl ${className}`}
              >
                <Icon className="w-3 h-3 shrink-0" strokeWidth={2.5} aria-hidden />
                {label}
              </span>
            ))}
          </motion.div>
      </motion.div>
    </section>
  );
}