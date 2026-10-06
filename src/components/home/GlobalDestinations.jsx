import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Briefcase, Check, Code2, FlaskConical, HeartPulse, Monitor } from 'lucide-react';

const destinations = [
  { name: 'United States', flag: '🇺🇸' },
  { name: 'Canada', flag: '🇨🇦' },
  { name: 'United Kingdom', flag: '🇬🇧' },
  { name: 'France', flag: '🇫🇷' },
  { name: 'Hungary', flag: '🇭🇺' },
  { name: 'Italy', flag: '🇮🇹' },
  { name: 'Japan', flag: '🇯🇵' },
  { name: 'South Korea', flag: '🇰🇷' },
  { name: 'Australia', flag: '🇦🇺' },
];

const fields = [
  { name: 'Business', Icon: Briefcase },
  { name: 'Computer Science', Icon: Monitor },
  { name: 'Software Engineering', Icon: Code2 },
  { name: 'Data Science', Icon: BarChart3 },
  { name: 'Medicine', Icon: HeartPulse },
  { name: 'Biochemistry', Icon: FlaskConical },
];

function CheckPoint({ label, tone }) {
  const circle = tone === 'violet' ? 'bg-violet-600' : 'bg-blue-600';
  return (
    <span className="inline-flex shrink-0 items-center gap-2 text-xs font-semibold text-slate-900 sm:text-sm">
      <span className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${circle}`}>
        <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />
      </span>
      {label}
    </span>
  );
}

function Marquee({ items, duration, label }) {
  return (
    <div className="dest-marquee w-full min-w-0 overflow-hidden" aria-label={label}>
      <ul className="sr-only">
        {items.map((item) => (
          <li key={item.name}>{item.name}</li>
        ))}
      </ul>
      <div
        className="dest-marquee-track flex w-max min-h-5 items-center gap-6"
        style={{ animationDuration: duration }}
        aria-hidden
      >
        {[0, 1].flatMap((copy) =>
          items.map((item) => (
            <span key={`${item.name}-${copy}`} className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-slate-900">
              {item.flag ? (
                <span>{item.flag}</span>
              ) : (
                <item.Icon className={`h-4 w-4 ${item.iconClass}`} strokeWidth={2} />
              )}
              {item.name}
            </span>
          )),
        )}
      </div>
    </div>
  );
}

export default function GlobalDestinations() {
  const fieldItems = fields.map((field) => ({ ...field, iconClass: 'text-violet-600' }));

  return (
    <section className="relative bg-white py-24">
      <style>{`
        @keyframes dest-marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .dest-marquee-track {
          animation-name: dest-marquee;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .dest-marquee:hover .dest-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .dest-marquee-track { animation: none; }
        }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mb-14 text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">Where We Can Take You</span>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-slate-900 md:text-5xl">Your Future Has No Borders</h2>
          <p className="mx-auto mt-4 max-w-3xl leading-relaxed text-slate-500">
            The world is full of opportunities, and we're here to help you explore them. Whether you already have a country or field of study in mind or are still figuring out where to begin, BladeX connects you with guidance to help you discover the possibilities and find a path that fits your aspirations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid min-w-0 grid-cols-1 rounded-[2rem] bg-blue-50 px-8 py-14 sm:px-10 lg:row-span-5 lg:grid-rows-subgrid"
          >
            <h3 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">Destinations Around the World</h3>
            <p className="mt-3 text-center text-sm leading-relaxed text-slate-600">
              From North America and Europe to Asia, Oceania, the UK, and beyond, explore study opportunities across the world with guidance from our global community.
            </p>
            <div className="mt-8 -mx-8 border-t border-blue-200/80 sm:-mx-10" />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">
              {['30+ Countries', 'Multiple Continents', 'Countless Possibilities'].map((label) => (
                <CheckPoint key={label} label={label} tone="blue" />
              ))}
            </div>
            <div className="mt-5 w-full min-w-0 overflow-hidden">
              <Marquee items={destinations} duration="58s" label="Study destinations" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid min-w-0 grid-cols-1 rounded-[2rem] bg-violet-50 px-8 py-14 sm:px-10 lg:row-span-5 lg:grid-rows-subgrid"
          >
            <h3 className="text-center text-xl font-bold text-slate-900 sm:text-2xl">Find Your Field</h3>
            <p className="mt-3 text-center text-sm leading-relaxed text-slate-600">
              Our consultants come from diverse academic backgrounds, with firsthand experience in many different fields. Get insights from people who understand your field beyond what you can find on a university website.
            </p>
            <div className="mt-8 -mx-8 border-t border-violet-200/80 sm:-mx-10" />
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:gap-x-5">
              {['Insights from experience', 'Guidance for your field'].map((label) => (
                <CheckPoint key={label} label={label} tone="violet" />
              ))}
            </div>
            <div className="mt-5 w-full min-w-0 overflow-hidden">
              <Marquee items={fieldItems} duration="40s" label="Fields of study" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
