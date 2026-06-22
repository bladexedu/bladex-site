import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { solidButton } from '@/utils/glassStyles';
import { ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import imgAboutStudents from '@/assests/about-students.jpg';

const pillars = [
  {
    iconSrc: 'https://img.icons8.com/external-kmg-design-flat-kmg-design/64/external-direction-maps-navigation-kmg-design-flat-kmg-design-1.png',
    iconAlt: 'Strategic direction icon',
    title: 'Strategic Academic Direction',
    description: "We offer targeted support to students who feel uncertain about their future trajectory, delivering clarity and a strategic plan to move forward with confidence.",
  },
  {
    iconSrc: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-personalization-marketing-technology-flaticons-lineal-color-flat-icons.png',
    iconAlt: 'Personalized counselling icon',
    title: 'Personalized Counselling',
    description: "We explore your interests, goals, and circumstances to help you choose the right country and university — confidently.",
  },
  {
    iconSrc: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-career-online-marketing-flaticons-lineal-color-flat-icons.png',
    iconAlt: 'Study to career pathway icon',
    title: 'Study-to-Career Pathway',
    description: "We help you choose subjects that align with real career opportunities abroad, building a strong foundation.",
  },
];

function PillarCard({ pillar, index }) {
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
      className="flex gap-5 bg-slate-50 rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-lg hover:shadow-slate-200/80 transition-shadow duration-300 cursor-default"
    >
      <img
        src={pillar.iconSrc}
        alt={pillar.iconAlt}
        className="w-10 h-10 object-contain flex-shrink-0"
        loading="lazy"
        style={{ transform: 'translateZ(24px)' }}
      />
      <div style={{ transform: 'translateZ(16px)' }}>
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
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-5 leading-snug">
              More than a consultancy.<br />We are your strategic partners.
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              BladeX Education is a dedicated advisory platform for <strong>Myanmar students who aspire to study abroad</strong>. Rather than just focusing on paperwork, we take the time to sit with you, understand your unique story, and help you build a strategic roadmap for your future.
            </p>
            <p className="text-slate-600 leading-relaxed mb-8">
              We believe every student deserves access to high-tier guidance, regardless of their background. Our consultants provide the objective insights and mentorship you need to move forward with confidence.
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
            style={{ perspective: 1000 }}
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