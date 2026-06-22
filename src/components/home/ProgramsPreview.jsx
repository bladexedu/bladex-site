import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { solidButton } from '@/utils/glassStyles';
import { ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const programs = [
  {
    iconSrc: 'https://img.icons8.com/stickers/100/group-task.png',
    iconAlt: 'Group task icon',
    label: 'Program 1',
    title: 'One-on-One Consulting',
    description: "A private, personalized session where we listen to your situation, explore your interests, and help you make confident, informed decisions about studying abroad.",
    highlights: ['Major Exploration', 'Country Selection', 'University Direction', 'Application Planning', 'Document Review (SOP, CV)'],
    color: 'blue',
  },
  {
    iconSrc: 'https://img.icons8.com/stickers/100/classroom.png',
    iconAlt: 'Classroom icon',
    label: 'Program 2',
    title: 'Mentorship Program',
    description: "A continuous partnership where we guide you through every step of your academic journey — from application to offer acceptance.",
    highlights: ['Ongoing Check-ins', 'Application Assistance', 'Offer Support', 'Goal Setting & Progress Tracking', 'Community Connection'],
    color: 'indigo',
  },
  {
    iconSrc: 'https://img.icons8.com/stickers/100/user-manual.png',
    iconAlt: 'User manual icon',
    label: 'Program 3',
    title: 'Career Guidance Program',
    description: "Choosing a major is only the beginning. We help you connect your academic path to real-world opportunities — so you graduate with direction, not just a degree.",
    highlights: ['Career Path Exploration', 'Industry Insights', 'Internship & Co-op Strategy', 'Resume & LinkedIn Review', 'Long-term Roadmapping'],
    color: 'emerald',
  },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', badge: 'bg-blue-600', dot: 'bg-blue-500' },
  indigo: { bg: 'bg-indigo-50', badge: 'bg-indigo-600', dot: 'bg-indigo-500' },
  emerald: { bg: 'bg-emerald-50', badge: 'bg-emerald-600', dot: 'bg-emerald-500' },
};

function ProgramCard({ program, index }) {
  const c = colorMap[program.color];
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springConfig = { stiffness: 280, damping: 24, mass: 0.6 };

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);

  const handleMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100/80 transition-shadow duration-300 flex flex-col cursor-default"
    >
      <div className={`${c.bg} px-8 pt-8 pb-6 flex-grow`} style={{ transform: 'translateZ(20px)' }}>
        <div className="flex items-center gap-3 mb-4">
          <img
            src={program.iconSrc}
            alt={program.iconAlt}
            className="w-10 h-10 object-contain flex-shrink-0"
            loading="lazy"
            style={{ transform: 'translateZ(28px)' }}
          />
          <span className={`text-xs font-bold uppercase tracking-widest text-white ${c.badge} px-3 py-1 rounded-full`}>
            {program.label}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">{program.title}</h3>
        <p className="text-slate-600 text-sm leading-relaxed">{program.description}</p>
      </div>
      <div className="px-8 py-6" style={{ transform: 'translateZ(12px)' }}>
        <ul className="space-y-2">
          {program.highlights.map((h) => (
            <li key={h} className="flex items-center gap-2 text-sm text-slate-700">
              <span className={`w-2 h-2 rounded-full ${c.dot} flex-shrink-0`} />
              {h}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function ProgramsPreview() {
  return (
    <section className="relative py-24 bg-slate-50 border-y border-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-3">Our Complimentary Programs</h2>
          <p className="text-slate-500 max-w-xl mx-auto">We offer high-quality, complimentary guidance tailored to your goals. Explore our core services and take the first step toward your study abroad journey today.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: 1000 }}>
          {programs.map((prog, i) => (
            <ProgramCard key={prog.title} program={prog} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-center mt-10"
        >
          <Link to={createPageUrl('Programs')} className="inline-block transition-transform duration-200 hover:scale-105">
            <button className={`group ${solidButton.navySolid} ${solidButton.md}`}>
              <span>See full program details</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-[transform,margin] duration-500 ease-out group-hover:translate-x-2 group-hover:scale-110" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
