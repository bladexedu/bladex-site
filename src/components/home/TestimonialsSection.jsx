import React from 'react';
import { motion } from 'framer-motion';

const quotes = [
  {
    quote: "I was feeling lost and unsure where to start, but the support and patience I received made all the difference. Now, I am finally in the application process. I'm so grateful for this program!",
    author_name: "Htet H.",
    author_role: "One-on-one Consulting Student",
    theme: {
      bg: 'bg-gradient-to-br from-blue-100 via-sky-50 to-white border border-blue-200/70',
      shadow: 'shadow-md shadow-blue-200/40',
      quote: 'text-blue-300/80',
      divider: 'border-blue-200/60',
    },
  },
  {
    quote: "The session was so comfortable — like discussing my situation with a trusted friend! It was exactly what I needed to gain clarity on my major and academic journey. The discussion was truly meaningful.",
    author_name: "Kyaw Z.",
    author_role: "One-on-one Consulting Student",
    theme: {
      bg: 'bg-gradient-to-br from-blue-100 via-sky-50 to-white border border-blue-200/70',
      shadow: 'shadow-md shadow-blue-200/40',
      quote: 'text-blue-300/80',
      divider: 'border-blue-200/60',
    },
  },
  {
    quote: "I gained new perspectives I had never considered before. The team took the time to explain everything clearly, helping me decide my study journey with confidence. Thank you for your precious time.",
    author_name: "Nang S.",
    author_role: "One-on-one Consulting Student",
    theme: {
      bg: 'bg-gradient-to-br from-blue-100 via-sky-50 to-white border border-blue-200/70',
      shadow: 'shadow-md shadow-blue-200/40',
      quote: 'text-blue-300/80',
      divider: 'border-blue-200/60',
    },
  },
  {
    quote: "I wasn't sure if I should book at first, but talking through my ideas gave me the exact clarity I needed for my career trajectory. The dedication to helping with every question is remarkable.",
    author_name: "Phyu W.",
    author_role: "One-on-one Consulting Student",
    theme: {
      bg: 'bg-gradient-to-br from-blue-100 via-sky-50 to-white border border-blue-200/70',
      shadow: 'shadow-md shadow-blue-200/40',
      quote: 'text-blue-300/80',
      divider: 'border-blue-200/60',
    },
  },
];

function TestimonialCard({ item, index }) {
  const { theme } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.3, delay: index * 0.04, ease: 'easeOut' }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`relative overflow-hidden rounded-3xl p-5 md:p-6 flex flex-col ${theme.bg} ${theme.shadow} hover:shadow-lg transition-shadow duration-300`}
    >
      <span
        className={`relative z-10 text-4xl font-serif leading-none select-none ${theme.quote}`}
        aria-hidden
      >
        &ldquo;
      </span>

      <p className="relative z-10 mt-1.5 text-slate-700 text-sm leading-relaxed font-medium">
        &ldquo;{item.quote}&rdquo;
      </p>

      <div className={`relative z-10 mt-4 pt-3 border-t ${theme.divider}`}>
        <p className="font-bold text-slate-900 text-sm">{item.author_name}</p>
        <p className="text-xs text-slate-500 mt-0.5">{item.author_role}</p>
      </div>
    </motion.div>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 bg-white">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-14">
          <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Student Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Voices from the Community</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 md:gap-6 max-w-4xl mx-auto">
          {quotes.map((q, i) => (
            <TestimonialCard key={q.author_name} item={q} index={i} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
