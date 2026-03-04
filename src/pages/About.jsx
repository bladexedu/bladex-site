import React from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Compass, Heart, GraduationCap, ExternalLink, ArrowRight, Search, Map, CheckSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const values = [
  {
    icon: Compass,
    title: 'Strategic Academic Direction',
    description: "We offer targeted support to students who feel uncertain about their future trajectory, delivering clarity and a strategic plan to move forward with confidence.",
    color: 'blue',
  },
  {
    icon: Heart,
    title: 'Personalized Counselling',
    description: "We explore your interests, goals, and situation to help you choose the right country and university — confidently.",
    color: 'rose',
  },
  {
    icon: GraduationCap,
    title: 'Study-to-Career Pathway',
    description: "We help you strategically select a field of study that aligns with tangible career opportunities, delivering a robust, long-term foundation for your professional future.",
    color: 'indigo',
  },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', icon: 'bg-blue-100 text-blue-600', label: 'text-blue-600' },
  rose: { bg: 'bg-rose-50', icon: 'bg-rose-100 text-rose-600', label: 'text-rose-600' },
  indigo: { bg: 'bg-indigo-50', icon: 'bg-indigo-100 text-indigo-600', label: 'text-indigo-600' },
};

const stats = [
  { value: 'Complimentary Advisory', label: 'High-quality, strategic guidance provided at absolutely no cost.' },
  { value: 'Global Mentor Network', label: 'A growing team of diverse experts from top universities worldwide.' },
  { value: 'Empowering Ambitions', label: 'Dedicated to helping Myanmar students achieve global academic success.' },
  { value: 'Founded in 2026', label: 'Built on real student experiences, authentic mentorship, and proven strategies.' },
];

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery & Assessment',
    description: 'We start with a comprehensive consultation to understand your unique background, academic strengths, and where you feel uncertain about your future.',
  },
  {
    icon: Map,
    number: '02',
    title: 'Strategic Pathway Mapping',
    description: 'Our consultants analyze your goals to strategically recommend the right fields of study and academic destinations that align with your career ambitions.',
  },
  {
    icon: CheckSquare,
    number: '03',
    title: 'Actionable Roadmap',
    description: 'We equip you with a step-by-step preparation plan, giving you the clarity, confidence, and resources to independently navigate your applications.',
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative pt-36 pb-32 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block text-blue-400 font-semibold text-xs uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full mb-5">About BladeX Education</span>
            <h1 className="text-5xl md:text-6xl font-bold text-white mt-2 mb-6 leading-tight">
              We Walk With You,<br />
              <span className="text-blue-400">Every Step of the Way</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              BladeX Education is a dedicated advisory platform empowering Myanmar students who aspire to study abroad. We go beyond standard consulting to act as your strategic partners in international education.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
          >
            {stats.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl px-5 py-5">
                <div className="text-base font-bold text-white leading-snug">{s.value}</div>
                <div className="text-slate-400 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Image Banner */}
      <section className="h-72 overflow-hidden">
        <img
          src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/69a2245d77b294d2ae3abe8f/de878602c_image.png"
          alt="Snowy mountain peaks panorama"
          className="w-full h-full object-cover object-center"
          style={{ display: 'block' }}
        />
      </section>

      {/* Mission & Vision */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Our Purpose</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Vision & Mission</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 text-white overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="w-14 h-14 bg-white/15 border border-white/20 rounded-2xl flex items-center justify-center mb-6">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <p className="text-blue-200 text-xs font-bold uppercase tracking-widest mb-3">Our Vision 🎯</p>
                <p className="text-white text-lg leading-relaxed font-medium">
                  "To pave the way for Myanmar students toward quality international education, clear pathways, and successful long-term careers abroad."
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-10 text-white overflow-hidden"
            >
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/20 rounded-full blur-2xl" />
              <div className="relative">
                <div className="w-14 h-14 bg-white/10 border border-white/15 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-7 h-7 text-indigo-300" />
                </div>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Our Mission ❤️</p>
                <p className="text-slate-200 text-lg leading-relaxed font-medium">
                  "To guide and empower young individuals who feel lost and unsure where to start — by providing accessible educational guidance and helping them become knowledgeable and prepared for their future choices."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Focus On */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Three Key Areas</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">Everything we do centers around making your study abroad journey feel manageable, clear, and purposeful.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => {
              const c = colorMap[v.color];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12 }}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-100"
                >
                  <div className={`w-14 h-14 ${c.icon} rounded-2xl flex items-center justify-center mb-6`}>
                    <v.icon className="w-7 h-7" />
                  </div>
                  <div className={`text-xs font-bold ${c.label} uppercase tracking-widest mb-2`}>0{i + 1}</div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{v.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Our Process</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">From your first conversation to your final plan — here's how we walk with you.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" style={{ left: '17%', right: '17%' }} />

            {steps.map((step, i) => {
              const StepIcon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                    <StepIcon className="w-9 h-9 text-white" />
                  </div>
                  <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">Step {step.number}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Let's Take the First Step Together</h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">Schedule a one-on-one session with our consultants and get the guidance you need for your study abroad journey.</p>

          </motion.div>
        </div>
      </section>
    </div>
  );
}