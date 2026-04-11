import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowRight, Compass, Heart, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const pillars = [
  {
    icon: Compass,
    title: 'Strategic Academic Direction',
    description: "We offer targeted support to students who feel uncertain about their future trajectory, delivering clarity and a strategic plan to move forward with confidence.",
  },
  {
    icon: Heart,
    title: 'Personalized Counselling',
    description: "We explore your interests, goals, and circumstances to help you choose the right country and university — confidently.",
  },
  {
    icon: GraduationCap,
    title: 'Study-to-Career Pathway',
    description: "We help you choose subjects that align with real career opportunities abroad, building a strong foundation.",
  },
];

export default function AboutPreview() {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Who We Are</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-5 leading-snug">
              More than a consultancy.<br />We are your strategic partners.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              BladeX Education is a dedicated advisory platform for <strong>Myanmar students who aspire to study abroad</strong>. Rather than just focusing on paperwork, we take the time to sit with you, understand your unique story, and help you build a strategic roadmap for your future.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              We believe every student deserves access to high-tier guidance, regardless of their background. Our consultants provide the objective insights and mentorship you need to move forward with confidence.
            </p>
            <Link to={createPageUrl('About')}>
              <button className="group inline-flex items-center rounded-full px-5 py-2.5 font-bold text-white shadow-lg shadow-teal-800/40 hover:scale-105 transition-transform duration-200"
                style={{
                  background: 'linear-gradient(270deg, #134e4a, #0f766e, #14b8a6, #0d9488, #134e4a)',
                  backgroundSize: '300% 300%',
                  animation: 'btn-gradient 4s ease infinite',
                }}>
                Learn More About Us <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.div>

          {/* Pillars + photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="space-y-5"
          >
            <div className="rounded-2xl overflow-hidden h-48 mb-2">
              <img
                src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800&q=80"
                alt="Students collaborating"
                className="w-full h-full object-cover"
              />
            </div>
            {pillars.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex gap-5 bg-slate-50 rounded-2xl p-5"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <p.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}