import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { sectionBadgeClass } from '@/utils/glassStyles';
import Tilt3DCard from '@/components/shared/Tilt3DCard';
import SpaceSectionBackground from '@/components/shared/SpaceSectionBackground';

const HERO_ACCENT = 'Every Step of the Way';

const values = [
  {
    iconSrc: 'https://img.icons8.com/external-kmg-design-flat-kmg-design/64/external-direction-maps-navigation-kmg-design-flat-kmg-design-1.png',
    iconAlt: 'Strategic direction icon',
    title: 'Strategic Academic Direction',
    description: "We offer targeted support to students who feel uncertain about their future trajectory, delivering clarity and a strategic plan to move forward with confidence.",
    color: 'blue',
  },
  {
    iconSrc: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-personalization-marketing-technology-flaticons-lineal-color-flat-icons.png',
    iconAlt: 'Personalized counselling icon',
    title: 'Personalized Counselling',
    description: "We explore your interests, goals, and situation to help you choose the right country and university — confidently.",
    color: 'rose',
  },
  {
    iconSrc: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-career-online-marketing-flaticons-lineal-color-flat-icons.png',
    iconAlt: 'Study to career pathway icon',
    title: 'Study-to-Career Pathway',
    description: "We help you strategically select a field of study that aligns with tangible career opportunities, delivering a robust, long-term foundation for your professional future.",
    color: 'indigo',
  },
];

const valuesIconColor = {
  blue: 'bg-blue-100 text-blue-600',
  rose: 'bg-rose-100 text-rose-600',
  indigo: 'bg-indigo-100 text-indigo-600',
};

const statCardStyle =
  'border border-blue-400/40 bg-blue-600/20';

const stats = [
  { value: 'Complimentary Advisory', label: 'High-quality, strategic guidance provided at absolutely no cost.' },
  { value: 'Global Mentor Network', label: 'A growing team of diverse experts from top universities worldwide.' },
  { value: 'Empowering Ambitions', label: 'Dedicated to helping Myanmar students achieve global academic success.' },
  { value: 'Founded in 2026', label: 'Built on real student experiences, authentic mentorship, and proven strategies.' },
];

function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.04 }}
      viewport={{ once: true }}
      transition={{ duration: 0.28, delay: index * 0.03, ease: 'easeOut' }}
      className={`rounded-2xl px-5 py-5 cursor-default transition-colors duration-300 ${statCardStyle}`}
    >
      <div className="text-base font-bold leading-snug text-blue-50">{stat.value}</div>
      <div className="text-xs mt-1 text-blue-200/80">{stat.label}</div>
    </motion.div>
  );
}

function VisionMissionShapes({ variant }) {
  if (variant === 'vision') {
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" aria-hidden>
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/20" />
        <div className="absolute -right-4 top-8 h-40 w-40 rounded-full border border-sky-300/25" />
        <div className="absolute right-20 top-24 h-3 w-3 rounded-full bg-white/30" />
        <div className="absolute right-32 top-40 h-2 w-2 rounded-full bg-sky-200/40" />
        <div className="absolute bottom-6 right-10 h-28 w-28 rotate-12 rounded-2xl border border-white/15 bg-white/5" />
        <div className="absolute -left-8 bottom-12 h-32 w-32 -rotate-6 rounded-full bg-blue-400/15" />
        <svg className="absolute left-6 top-1/2 h-24 w-24 -translate-y-1/2 text-white/10" viewBox="0 0 100 100" fill="none">
          <path d="M50 8 L92 50 L50 92 L8 50 Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M50 22 L78 50 L50 78 L22 50 Z" stroke="currentColor" strokeWidth="1" opacity="0.6" />
        </svg>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block" aria-hidden>
      <div className="absolute -left-20 -bottom-20 h-72 w-72 rounded-full border border-indigo-400/20" />
      <div className="absolute left-12 bottom-16 h-44 w-44 rounded-full border border-slate-500/30" />
      <div className="absolute right-8 top-6 h-20 w-20 rotate-45 border border-rose-300/20 bg-rose-400/5" />
      <div className="absolute right-24 top-20 h-4 w-4 rounded-full bg-indigo-300/35" />
      <div className="absolute right-40 top-12 h-2.5 w-2.5 rounded-full bg-slate-400/40" />
      <div className="absolute top-1/2 right-6 h-36 w-px bg-gradient-to-b from-transparent via-indigo-300/30 to-transparent" />
      <div className="absolute top-1/3 right-14 h-px w-24 bg-gradient-to-r from-transparent via-slate-400/25 to-transparent" />
      <svg className="absolute -right-6 top-1/2 h-32 w-32 -translate-y-1/2 text-indigo-300/15" viewBox="0 0 120 120" fill="none">
        <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="1.5" strokeDasharray="8 10" />
        <circle cx="60" cy="60" r="34" stroke="currentColor" strokeWidth="1" opacity="0.7" />
      </svg>
    </div>
  );
}

const steps = [
  {
    iconSrc: 'https://img.icons8.com/stickers/50/search.png',
    iconAlt: 'Search',
    number: '01',
    title: 'Discovery & Assessment',
    description: 'We start with a comprehensive consultation to understand your unique background, academic strengths, and where you feel uncertain about your future.',
  },
  {
    iconSrc: 'https://img.icons8.com/stickers/100/map-marker.png',
    iconAlt: 'Map marker',
    number: '02',
    title: 'Strategic Pathway Mapping',
    description: 'Our consultants analyze your goals to strategically recommend the right fields of study and academic destinations that align with your career ambitions.',
  },
  {
    iconSrc: 'https://img.icons8.com/stickers/100/checked-checkbox.png',
    iconAlt: 'Checked checkbox',
    number: '03',
    title: 'Actionable Roadmap',
    description: 'We equip you with a step-by-step preparation plan, giving you the clarity, confidence, and resources to independently navigate your applications.',
  },
];

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative flex min-h-[100dvh] items-center bg-[#060b18] overflow-hidden pt-28 pb-16 sm:pt-32">
        <div className="absolute inset-0 z-0">
          <SpaceSectionBackground starDensity={1.2} />
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
            <span className={`${sectionBadgeClass} mb-5`}>About BladeX Education</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6 leading-tight">
              We Walk With You,<br />
              <span className="text-blue-400" aria-label={HERO_ACCENT}>
                {HERO_ACCENT.split('').map((character, index) => (
                  <motion.span
                    key={`${character}-${index}`}
                    aria-hidden="true"
                    className="inline-block"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.01,
                      delay: reduceMotion ? 0 : 0.25 + index * 0.08,
                    }}
                  >
                    {character === ' ' ? '\u00A0' : character}
                  </motion.span>
                ))}
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              BladeX Education is a dedicated advisory platform empowering Myanmar students who aspire to study abroad. We go beyond standard consulting to act as your strategic partners in international education.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
          >
            {stats.map((s, i) => (
              <StatCard key={i} stat={s} index={i} />
            ))}
          </motion.div>
        </div>

      </section>

      {/* Mission & Vision */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Our Purpose</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Vision & Mission</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl p-10 text-white overflow-hidden">
              <VisionMissionShapes variant="vision" />
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl hidden md:block" aria-hidden />
              <div className="relative z-10">
                <img
                  src="https://img.icons8.com/stickers/100/visible.png"
                  alt="Vision"
                  className="w-14 h-14 object-contain mb-6"
                  loading="lazy"
                />
                <p className="text-sm font-extrabold uppercase tracking-widest mb-3 text-white">Our Vision</p>
                <p className="text-white text-lg leading-relaxed font-medium">
                  "To pave the way for Myanmar students toward quality international education, clear pathways, and successful long-term careers abroad."
                </p>
              </div>
            </div>

            <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-10 text-white overflow-hidden">
              <VisionMissionShapes variant="mission" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-600/20 rounded-full blur-2xl hidden md:block" aria-hidden />
              <div className="relative z-10">
                <img
                  src="https://img.icons8.com/color/96/goal--v1.png"
                  alt="Mission"
                  className="w-14 h-14 object-contain mb-6"
                  loading="lazy"
                />
                <p className="text-sm font-extrabold uppercase tracking-widest mb-3 text-white">Our Mission</p>
                <p className="text-slate-200 text-lg leading-relaxed font-medium">
                  "To guide and empower young individuals who feel lost and unsure where to start — by providing accessible educational guidance and helping them become knowledgeable and prepared for their future choices."
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Our Leadership Team */}
      <section className="relative py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">The People Behind BladeX</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Our Leadership Team</h2>          </motion.div>

          {/* Leadership cards */}
          <motion.div className="grid md:grid-cols-3 gap-6 mb-14" style={{ perspective: 1000 }}>
            {[
              {
                initials: 'NLK',
                name: 'Nyan Lin Kyaw',
                role: 'Founder & Lead Education Consultant',
                degree: 'Honours Bachelor of Commerce, Business Technology Management',
                university: 'University of Ottawa',
                note: 'Driving the organization\'s strategy, marketing initiatives, and long-term vision.',
                gradient: 'from-blue-500 to-indigo-600',
                photo: 'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/public/consultant-photos/1.jpg',
                location: 'Canada',
              },
              {
                initials: 'NSN',
                name: 'Nang Sayoon Noi',
                role: 'Co-Founder & Chief Operating Officer',
                degree: 'Bachelor of Science in Biochemistry (Chemistry Honors)',
                university: 'Sacramento State University',
                note: 'Overseeing the organizational structure, internal communications, and seamless day-to-day operations.',
                gradient: 'from-emerald-500 to-teal-600',
                photo: 'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/public/consultant-photos/2.jpg',
                location: 'United States',
              },
              {
                initials: 'KT',
                name: 'Khun Thu Rein',
                role: 'Chief Technology Officer',
                degree: 'Bachelor of Computer Science',
                university: 'Carleton University',
                note: 'Managing technical infrastructure, platform development, and digital systems for BladeX.',
                gradient: 'from-slate-600 to-slate-800',
                photo: 'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/sign/Team/ktr.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84ZWY5ZjAzNS00OWY3LTQ4MDUtYmRmZi02N2IxYzU3NWY5ZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUZWFtL2t0ci5qcGciLCJpYXQiOjE3NzUxNjg5MzIsImV4cCI6MjA5MDUyODkzMn0.d3OZOvYByl1VJDYs5aayrs6_3gD6Eu370-egVFqTo3A',
                location: 'Canada',
              },
            ].map((p, i) => (
              <Tilt3DCard
                key={i}
                delay={i * 0.03}
                className="bg-slate-900 border border-slate-700/50 rounded-3xl overflow-hidden shadow-md flex flex-col cursor-default"
              >
                {/* Top — dark with photo */}
                <div className="relative px-6 pt-8 pb-6 flex flex-col items-center text-center overflow-hidden">
                  <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full blur-2xl opacity-50" style={{ background: '#3b82f6' }} />
                  <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full blur-2xl opacity-40" style={{ background: '#6366f1' }} />
                  <div className="absolute top-4 right-8 w-20 h-20 rounded-full blur-xl opacity-30" style={{ background: '#0ea5e9' }} />
                  <div className="absolute inset-0 bg-slate-900/70" />
                  {[
                    { top: '10%', left: '8%',  size: 3, delay: 0 },
                    { top: '20%', left: '80%', size: 2, delay: 0.5 },
                    { top: '55%', left: '15%', size: 2, delay: 1.0 },
                    { top: '70%', left: '70%', size: 3, delay: 1.5 },
                    { top: '30%', left: '55%', size: 2, delay: 0.8 },
                    { top: '80%', left: '35%', size: 2, delay: 0.3 },
                    { top: '15%', left: '42%', size: 2, delay: 1.2 },
                    { top: '65%', left: '88%', size: 3, delay: 0.6 },
                    { top: '85%', left: '12%', size: 2, delay: 1.8 },
                    { top: '40%', left: '92%', size: 2, delay: 0.9 },
                  ].map((dot, di) => (
                    <motion.div key={di}
                      className="absolute rounded-full bg-blue-500/50 pointer-events-none"
                      style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
                      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity, delay: dot.delay, ease: 'easeInOut' }}
                    />
                  ))}
                  <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 flex items-center justify-center mb-4 ring-2 ring-slate-700/60 shadow-lg">
                    {p.photo
                      ? <img src={p.photo} alt={p.name} className="w-full h-full object-cover object-[center_10%]" />
                      : <span className={`text-lg font-bold bg-gradient-to-br ${p.gradient} bg-clip-text text-transparent`}>{p.initials}</span>
                    }
                  </div>
                  <h3 className="relative text-base font-bold text-white leading-tight">{p.name}</h3>
                  <p className="relative text-blue-400 text-xs font-semibold mt-1">{p.role}</p>
                  <p className="relative text-[#f7f6f3]/80 text-xs mt-1.5">📍 {p.location}</p>
                </div>

                {/* Bottom — beige */}
                <div className="px-6 py-5 bg-[#fdfcfa] flex-1 flex flex-col gap-4">
                  <div>
                    <p className="text-slate-800 font-bold text-sm leading-snug">{p.degree}</p>
                    <p className="text-blue-500 text-xs mt-1 font-medium">{p.university}</p>
                  </div>
                  <div>
                    <p className="text-slate-600 text-xs leading-relaxed">{p.note}</p>
                  </div>
                </div>
              </Tilt3DCard>
            ))}
          </motion.div>

          {/* Team members */}
          <div className="text-center mb-8">
            <span className="text-sm font-extrabold uppercase tracking-widest text-slate-500">Meet Our Team Members</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { name: 'Myat Min Htet', role: 'Operations Lead & Data Analyst' },
              { name: 'Thin Thiri San', role: 'Operations Lead & Market Research Analyst' },
              { name: 'Myint Zu Linn', role: 'Research & Operation Intern' },
            ].map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: 'easeOut' } }}
                viewport={{ once: true }}
                transition={{ duration: 0.28, ease: 'easeOut', delay: i * 0.03 }}
                className="bg-white rounded-2xl p-5 text-center shadow-sm border border-slate-100 cursor-default"
              >
                <div className="w-12 h-12 rounded-full bg-blue-900 text-white font-bold text-lg flex items-center justify-center mx-auto mb-3">
                  {m.name.charAt(0)}
                </div>
                <p className="font-bold text-slate-900 text-sm leading-tight">{m.name}</p>
                <p className="text-blue-500 text-xs mt-1 leading-snug font-medium">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* What We Focus On */}
      <section className="relative py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Three Key Areas</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">Everything we do centers around making your study abroad journey feel manageable, clear, and purposeful.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-100"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-14 h-14 shrink-0 ${valuesIconColor[v.color]} rounded-2xl flex items-center justify-center`}
                    >
                      <img
                        src={v.iconSrc}
                        alt={v.iconAlt}
                        className="w-8 h-8 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug min-w-0 m-0">
                      {v.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 leading-relaxed">{v.description}</p>
                </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* Our Process */}
      <section className="relative py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Our Process</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">From your first conversation to your final plan — here's how we walk with you.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" style={{ left: '17%', right: '17%' }} />

            {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                    <img
                      src={step.iconSrc}
                      alt={step.iconAlt ?? ''}
                      className="w-10 h-10 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">Step {step.number}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* CTA */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, ease: 'easeOut' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Let's Take the First Step Together</h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">Schedule a one-on-one session with our consultants and get the guidance you need for your study abroad journey.</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}