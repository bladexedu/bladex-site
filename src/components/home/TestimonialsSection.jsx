import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const quotes = [
  {
    quote: "I was feeling lost and unsure where to start, but the support and patience I received made all the difference. Now, I am finally in the application process. I'm so grateful for this program!",
    author_name: "Htet H.",
    author_role: "One-on-one Consulting Student",
  },
  {
    quote: "The session was so comfortable — like discussing my situation with a trusted friend! It was exactly what I needed to gain clarity on my major and academic journey. The discussion was truly meaningful.",
    author_name: "Kyaw Z.",
    author_role: "One-on-one Consulting Student",
  },
  {
    quote: "I gained new perspectives I had never considered before. The team took the time to explain everything clearly, helping me decide my study journey with confidence. Thank you for your precious time.",
    author_name: "Nang S.",
    author_role: "One-on-one Consulting Student",
  },
  {
    quote: "I wasn't sure if I should book at first, but talking through my ideas gave me the exact clarity I needed for my career trajectory. The dedication to helping with every question is remarkable.",
    author_name: "Phyu W.",
    author_role: "One-on-one Consulting Student",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Student Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Voices from the Community</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="bg-slate-50 rounded-2xl p-7 relative"
            >
              <Quote className="w-4 h-4 text-blue-400 absolute top-5 right-5" />
              <p className="text-slate-700 leading-relaxed mb-6 text-sm">"{q.quote}"</p>
              <div>
                <p className="font-semibold text-slate-900 text-sm">{q.author_name}</p>
                <p className="text-xs text-slate-500">{q.author_role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}