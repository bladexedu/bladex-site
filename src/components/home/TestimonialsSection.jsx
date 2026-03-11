import React from 'react';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const quotes = [
  {
    quote: "I had no idea where to start with studying abroad. BladeX sat with me, asked the right questions, and now I have a clear plan. I finally feel ready.",
    author_name: "Thiri M.",
    author_role: "Aspiring CS student, Yangon",
  },
  {
    quote: "The one-on-one session helped me understand which countries fit my budget and goals. I didn't know Germany was an option until they told me.",
    author_name: "Ko Aung Z.",
    author_role: "Engineering student, Mandalay",
  },
  {
    quote: "They don't just give you a list of schools. They actually listen and help you figure out what you really want. That made all the difference.",
    author_name: "Ma Hnin P.",
    author_role: "Business student, Yangon",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Student Stories</span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">What Students Are Saying</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {quotes.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 rounded-2xl p-7 relative"
            >
              <Quote className="w-5 h-5 text-blue-200 absolute top-5 right-5" />
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