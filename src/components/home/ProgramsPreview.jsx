import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { solidButton } from '@/utils/glassStyles';
import { ArrowRight, GraduationCap, MessageCircle, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const programs = [
  {
    Icon: MessageCircle,
    label: 'Program 1',
    title: 'One-on-One Consulting',
    description: "A personalized session with a consultant who takes the time to understand your goals, circumstances, and aspirations. Get clarity on your options and practical guidance on what to do next.",
    highlights: [
      'Explore potential majors and academic pathways',
      'Identify suitable countries and universities',
      'Understand admission requirements',
      'Discuss application strategies and next steps',
      "Find motivation, clarity, and direction when you're unsure where to begin",
    ],
    color: 'indigo',
  },
  {
    Icon: Users,
    label: 'Program 2',
    title: 'Mentorship Program',
    description: "More than a one-time conversation, our mentorship program connects students with experienced consultants for continued guidance throughout their academic journey. Work toward your goals with someone who understands the path you're pursuing.",
    highlights: [
      'Personalized academic guidance',
      'Support with university and application planning',
      'Guidance from people with firsthand experience',
      'Goal setting and next-step planning',
      'A connection to the wider BladeX community',
    ],
    color: 'blue',
  },
  {
    Icon: GraduationCap,
    label: 'Program 3',
    title: 'Career & Future Guidance Program',
    description: "Your education is part of a bigger picture. We help you explore how your academic choices connect with your long-term interests and career aspirations, so you can make decisions with a clearer sense of direction.",
    highlights: [
      'Explore career paths and academic interests',
      'Learn about industries and opportunities',
      'Understand internship and co-op pathways',
      'Get guidance on resumes and professional profiles',
      'Plan your next academic or career steps',
    ],
    color: 'emerald',
  },
];

const colorMap = {
  blue: { badge: 'bg-blue-600', dot: 'bg-blue-600', icon: 'text-blue-500', iconBg: 'bg-blue-50', border: 'border-blue-400' },
  indigo: { badge: 'bg-violet-600', dot: 'bg-violet-500', icon: 'text-violet-500', iconBg: 'bg-violet-50', border: 'border-violet-400' },
  emerald: { badge: 'bg-emerald-600', dot: 'bg-emerald-500', icon: 'text-emerald-500', iconBg: 'bg-emerald-50', border: 'border-emerald-400' },
};

function ProgramCard({ program, index }) {
  const c = colorMap[program.color];
  const Icon = program.Icon;

  return (
    <div className="row-span-6 grid grid-rows-subgrid">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: 'easeOut' } }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
        className={`relative row-span-5 grid grid-rows-subgrid items-start bg-white rounded-3xl border ${c.border} shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-default`}
      >
        <span className={`absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 text-[11px] font-bold uppercase tracking-wider text-white ${c.badge} px-3 py-1 rounded-full`}>
          {program.label}
        </span>
        <div className="flex w-full justify-center pt-10">
          <div className={`w-12 h-12 rounded-2xl ${c.iconBg} flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${c.icon}`} strokeWidth={1.75} aria-hidden />
          </div>
        </div>
        <h3 className="w-full px-8 pt-5 text-center text-xl font-bold leading-snug text-slate-900">{program.title}</h3>
        <p className="w-full px-8 pt-3 pb-6 text-center text-sm leading-relaxed text-slate-500">{program.description}</p>
        <div className="w-full border-t border-slate-200" />
        <ul className="w-full space-y-4 px-8 py-6">
          {program.highlights.map((h) => (
            <li key={h} className="flex items-start gap-2.5 text-sm text-slate-600">
              <span aria-hidden className={`mt-1.5 w-1.5 h-1.5 rotate-45 ${c.dot} shrink-0`} />
              {h}
            </li>
          ))}
        </ul>
      </motion.div>
      <div aria-hidden className="h-10 lg:h-0" />
    </div>
  );
}

export default function ProgramsPreview() {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-3 mb-5 leading-tight">
            Guidance for Every Step of Your<br className="hidden sm:block" /> Journey
          </h2>
          <div className="text-slate-500 max-w-2xl mx-auto space-y-4 leading-relaxed">
            <p>
              From exploring your options to preparing for your next chapter, BladeX Education connects Myanmar students with the{' '}
              <span className="text-blue-600">guidance</span>,{' '}
              <span className="text-violet-600">experience</span>, and{' '}
              <span className="text-emerald-600">support</span>{' '}
              they need to pursue their ambitions abroad.
            </p>
            <p>Our complimentary programs are designed to meet you where you are, whether you're just starting to explore studying abroad or already have a plan and need someone to help you move forward.</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 pt-3">
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
