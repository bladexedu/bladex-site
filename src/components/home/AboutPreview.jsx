import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { solidButton } from '@/utils/glassStyles';
import { ArrowRight, Compass, Globe, HeartHandshake } from 'lucide-react';
import { motion } from 'framer-motion';
import imgAboutStudents from '@/assests/about-students.jpg';

const pillars = [
  {
    Icon: Compass,
    title: 'Find Your Direction',
    description: "Every student's journey is different. We help you explore your options, understand your strengths, and identify academic pathways that align with your goals and circumstances.",
  },
  {
    Icon: HeartHandshake,
    title: 'Guidance That Understands You',
    description: "Your ambitions, background, and circumstances matter. Our consultants offer personalized insights and practical guidance to help you navigate university choices, applications, and important decisions.",
  },
  {
    Icon: Globe,
    title: 'A Global Community, Closer to You',
    description: "Connect with consultants and mentors who have firsthand experience studying abroad. From choosing a university to adjusting to a new academic environment, learn from people who have been through the journey themselves.",
  },
];

function PillarCard({ pillar, index }) {
  const Icon = pillar.Icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: 'easeOut' } }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
      className="flex gap-5 bg-slate-50 rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/80 transition-shadow duration-300 cursor-default"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
        <Icon className="h-5 w-5 text-blue-500" strokeWidth={1.75} aria-hidden />
      </div>
      <div>
        <h3 className="font-semibold text-slate-900 mb-1">{pillar.title}</h3>
        <p className="text-sm text-slate-600 leading-relaxed">{pillar.description}</p>
      </div>
    </motion.div>
  );
}

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
            <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-5 leading-snug">
              <span className="block text-slate-900">More Than Admissions & Consultancy.</span>
              <span className="block text-blue-600">A Partner In Your Journey.</span>
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              BladeX Education is a global education advisory platform dedicated to helping Myanmar students turn their aspirations of studying abroad into reality. Whether you're just beginning to explore your options or already have a destination in mind but need guidance on how to get there, we're here to help.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Through our global network of consultants, personalized guidance, and mentorship, we help students navigate their educational journeys, make informed decisions, and take meaningful steps toward their future.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              We believe that every student deserves the opportunity to pursue an education beyond borders, regardless of their background or circumstances. At BladeX, we're here to make that journey a little clearer, more accessible, and less overwhelming.
            </p>
            <Link to={createPageUrl('About')} className="inline-block transition-transform duration-200 hover:scale-105">
              <button className={`group ${solidButton.navySolid} ${solidButton.md}`}>
                <span>Learn More About Us</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-[transform,margin] duration-500 ease-out group-hover:translate-x-2 group-hover:scale-110" />
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
                src={imgAboutStudents}
                alt="Students walking through a university campus at dusk"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {pillars.map((p, i) => (
              <PillarCard key={p.title} pillar={p} index={i} />
            ))}
          </motion.div>
        </div>
      </div>

    </section>
  );
}
