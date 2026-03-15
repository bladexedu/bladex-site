import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Users, MessageCircle, Map, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const programs = [
  {
    icon: MessageCircle,
    label: 'Program 1',
    title: 'One-on-One Consulting',
    description: "A private, personalized session where we listen to your situation, explore your interests, and help you make confident, informed decisions about studying abroad.",
    highlights: ['Major Exploration', 'Country Selection', 'University Direction', 'Application Planning', 'Document Review (SOP, CV)'],
    color: 'blue',
  },
  {
    icon: Users,
    label: 'Program 2',
    title: 'Mentorship Program',
    description: "A continuous partnership where we guide you through every step of your academic journey — from application to offer acceptance.",
    highlights: ['Ongoing Check-ins', 'Application Assistance', 'Offer Support', 'Goal Setting & Progress Tracking', 'Community Connection'],
    color: 'indigo',
  },
  {
    icon: Map,
    label: 'Program 3',
    title: 'Career Guidance Program',
    description: "Choosing a major is only the beginning. We help you connect your academic path to real-world opportunities — so you graduate with direction, not just a degree.",
    highlights: ['Career Path Exploration', 'Industry Insights', 'Internship & Co-op Strategy', 'Resume & LinkedIn Review', 'Long-term Roadmapping'],
    color: 'emerald',
  },
];

const colorMap = {
  blue: { bg: 'bg-blue-50', icon: 'bg-blue-100 text-blue-600', badge: 'bg-blue-600', dot: 'bg-blue-500' },
  indigo: { bg: 'bg-indigo-50', icon: 'bg-indigo-100 text-indigo-600', badge: 'bg-indigo-600', dot: 'bg-indigo-500' },
  emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-600', badge: 'bg-emerald-600', dot: 'bg-emerald-500' },
};

export default function ProgramsPreview() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">What We Offer</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-3">Our Complimentary Programs</h2>
          <p className="text-slate-500 max-w-xl mx-auto">We offer high-quality, complimentary guidance tailored to your goals. Explore our core services and take the first step toward your study abroad journey today.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog, i) => {
            const c = colorMap[prog.color];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className={`${c.bg} px-8 pt-8 pb-6 flex-grow`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${c.icon} rounded-xl flex items-center justify-center`}>
                      <prog.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest text-white ${c.badge} px-3 py-1 rounded-full`}>
                      {prog.label}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{prog.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{prog.description}</p>
                </div>
                <div className="px-8 py-6">
                  <ul className="space-y-2">
                    {prog.highlights.map((h, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-slate-700">
                        <span className={`w-2 h-2 rounded-full ${c.dot} flex-shrink-0`} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link to={createPageUrl('Programs')}>
            <button className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all text-sm">
              See full program details <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}