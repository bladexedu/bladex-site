import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { solidButton } from '@/utils/glassStyles';
import SpaceSectionBackground from '@/components/shared/SpaceSectionBackground';

/** 16×16 pixel icons — crispEdges for sharp pixel rendering */
function PixelIcon({ cells, className = '', size = 20 }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width={size}
      height={size}
      className={className}
      shapeRendering="crispEdges"
      aria-hidden
    >
      {cells.map(([x, y, w = 1, h = 1], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill="currentColor" />
      ))}
    </svg>
  );
}

const PIXEL_NEWS = [
  [2, 1, 12, 1], [2, 2, 1, 12], [13, 2, 1, 12], [2, 14, 12, 1],
  [4, 4, 8, 1], [4, 6, 8, 1], [4, 8, 5, 1], [4, 10, 8, 1], [4, 12, 6, 1],
];
const PIXEL_TREND = [
  [2, 13, 1, 1], [3, 12, 1, 1], [4, 11, 1, 1], [5, 10, 1, 1], [6, 9, 1, 1],
  [7, 10, 1, 1], [8, 11, 1, 1], [9, 8, 1, 1], [10, 7, 1, 1], [11, 6, 1, 1],
  [12, 5, 1, 1], [11, 4, 1, 1], [12, 4, 1, 1], [13, 4, 1, 1], [13, 5, 1, 1],
  [2, 14, 12, 1],
];
const PIXEL_SPARK = [
  [7, 1, 2, 2], [7, 4, 2, 2], [1, 7, 2, 2], [4, 7, 2, 2], [7, 7, 2, 2], [10, 7, 2, 2], [13, 7, 2, 2],
  [7, 10, 2, 2], [7, 13, 2, 2], [4, 4, 1, 1], [11, 4, 1, 1], [4, 11, 1, 1], [11, 11, 1, 1],
];
const PIXEL_CODE = [
  [3, 4, 1, 1], [2, 5, 1, 1], [1, 6, 1, 2], [2, 8, 1, 1], [3, 9, 1, 1],
  [12, 4, 1, 1], [13, 5, 1, 1], [14, 6, 1, 2], [13, 8, 1, 1], [12, 9, 1, 1],
  [6, 11, 1, 1], [7, 10, 1, 1], [8, 9, 1, 1], [9, 8, 1, 1],
];
const PIXEL_GLOBE = [
  [6, 1, 4, 1], [4, 2, 8, 1], [3, 3, 10, 1], [2, 4, 12, 1], [2, 5, 12, 1],
  [1, 6, 14, 1], [1, 7, 14, 1], [1, 8, 14, 1], [1, 9, 14, 1],
  [2, 10, 12, 1], [2, 11, 12, 1], [3, 12, 10, 1], [4, 13, 8, 1], [6, 14, 4, 1],
  [7, 2, 2, 12], [3, 5, 10, 1], [2, 8, 12, 1], [3, 11, 10, 1],
  [4, 4, 1, 1], [11, 4, 1, 1], [4, 12, 1, 1], [11, 12, 1, 1],
];
const PIXEL_SOON = [
  [2, 7, 2, 2], [7, 7, 2, 2], [12, 7, 2, 2],
  [3, 5, 1, 1], [8, 5, 1, 1], [13, 5, 1, 1],
  [3, 10, 1, 1], [8, 10, 1, 1], [13, 10, 1, 1],
  [1, 3, 14, 1], [1, 12, 14, 1], [1, 3, 1, 10], [14, 3, 1, 10],
];
const PIXEL_BOT = [
  [7, 1, 2, 1], [7, 2, 2, 2],
  [3, 4, 10, 1], [2, 5, 12, 1], [2, 6, 12, 1], [2, 7, 12, 1], [2, 8, 12, 1], [2, 9, 12, 1], [2, 10, 12, 1], [3, 11, 10, 1],
  [4, 7, 2, 2], [10, 7, 2, 2], [6, 10, 4, 1],
  [1, 7, 1, 3], [14, 7, 1, 3],
  [5, 12, 2, 2], [9, 12, 2, 2],
];
const PIXEL_NET = [
  [2, 2, 2, 2], [12, 2, 2, 2], [7, 7, 2, 2], [2, 12, 2, 2], [12, 12, 2, 2],
  [4, 3, 8, 1], [3, 4, 1, 3], [12, 4, 1, 3], [4, 12, 8, 1], [4, 8, 1, 4], [11, 8, 1, 4],
  [5, 8, 6, 1],
];
const PIXEL_CHART = [
  [2, 14, 12, 1], [2, 2, 1, 12],
  [4, 10, 2, 4], [7, 7, 2, 7], [10, 4, 2, 10], [13, 8, 1, 6],
];
const PIXEL_ZAP = [
  [9, 1, 3, 1], [8, 2, 3, 1], [7, 3, 3, 1], [6, 4, 3, 1], [5, 5, 6, 1],
  [4, 6, 5, 1], [5, 7, 3, 1], [6, 8, 3, 1], [7, 9, 3, 1], [8, 10, 3, 1], [9, 11, 3, 1], [10, 12, 2, 1],
];
const PIXEL_CPU = [
  [4, 4, 8, 8], [6, 6, 4, 4],
  [7, 1, 2, 2], [7, 13, 2, 2], [1, 7, 2, 2], [13, 7, 2, 2],
  [4, 2, 1, 1], [11, 2, 1, 1], [4, 13, 1, 1], [11, 13, 1, 1],
];
const PIXEL_GRAD = [
  [2, 7, 12, 1], [3, 6, 10, 1], [5, 5, 6, 1], [7, 4, 2, 1],
  [2, 8, 1, 3], [13, 8, 1, 1], [4, 9, 8, 1], [5, 10, 6, 1], [6, 11, 4, 1],
];
const PIXEL_MEDAL = [
  [6, 1, 4, 1], [5, 2, 2, 2], [9, 2, 2, 2],
  [4, 5, 8, 8], [6, 7, 4, 4], [7, 8, 2, 2],
];

const focusItems = [
  {
    Icon: (props) => <PixelIcon cells={PIXEL_NEWS} {...props} />,
    title: 'AI & Tech News',
    description:
      'The latest breakthroughs in artificial intelligence, machine learning, and emerging technology — curated and explained.',
  },
  {
    Icon: (props) => <PixelIcon cells={PIXEL_TREND} {...props} />,
    title: 'Emerging Trends',
    description:
      'Where the industry is heading. We track and analyze the shifts shaping the future of technology.',
  },
  {
    Icon: (props) => <PixelIcon cells={PIXEL_SPARK} {...props} />,
    title: 'What AI Can Do',
    description:
      'Practical explorations of AI capabilities — from automation to creativity, and everything in between.',
  },
  {
    Icon: (props) => <PixelIcon cells={PIXEL_CODE} {...props} />,
    title: 'Technical Projects',
    description:
      'We build and support real software. Our team designs, develops, and maintains technology initiatives.',
  },
];

const capabilities = [
  {
    Icon: (props) => <PixelIcon cells={PIXEL_BOT} {...props} />,
    title: 'Automation & Agents',
    description: 'AI systems that reason, plan, and act autonomously.',
  },
  {
    Icon: (props) => <PixelIcon cells={PIXEL_NET} {...props} />,
    title: 'Generative Models',
    description: 'Text, image, audio, and video generation at scale.',
  },
  {
    Icon: (props) => <PixelIcon cells={PIXEL_CHART} {...props} />,
    title: 'Data Intelligence',
    description: 'Turning raw data into decisions with analytics and BI.',
  },
  {
    Icon: (props) => <PixelIcon cells={PIXEL_GLOBE} {...props} />,
    title: 'Knowledge Access',
    description: 'Making information searchable, summarizable, and useful.',
  },
  {
    Icon: (props) => <PixelIcon cells={PIXEL_ZAP} {...props} />,
    title: 'Real-Time Tooling',
    description: 'Live integrations that connect AI to the tools you use.',
  },
  {
    Icon: (props) => <PixelIcon cells={PIXEL_CPU} {...props} />,
    title: 'Applied Research',
    description: 'Bridging academic research and usable products.',
  },
];

const leaders = [
  {
    name: 'Nyan Lin Kyaw',
    role: 'Founder',
    education: 'University of Ottawa — Telfer School of Management',
    offer: 'Received an admission offer from McGill University',
    tags: [
      'Data Analytics',
      'Business Intelligence',
      'Artificial Intelligence',
      'Emerging Technology Trends',
    ],
    photo: 'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/public/consultant-photos/1.jpg',
    photoClass: 'object-[center_10%]',
  },
  {
    name: 'Khun Thu Rein',
    role: 'Co-Founder & CTO',
    education: 'Carleton University',
    offer: 'Received an admission offer from the University of Toronto',
    tags: [
      'Broad expertise across technology-related fields',
      'Software & Systems',
      'AI & Tech Projects',
    ],
    photo:
      'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/sign/Team/ktr.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84ZWY5ZjAzNS00OWY3LTQ4MDUtYmRmZi02N2IxYzU3NWY5ZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUZWFtL2t0ci5qcGciLCJpYXQiOjE3NzUxNjg5MzIsImV4cCI6MjA5MDUyODkzMn0.d3OZOvYByl1VJDYs5aayrs6_3gD6Eu370-egVFqTo3A',
    photoClass: 'object-[center_35%]',
  },
];

const starDots = [
  { top: '10%', left: '8%', size: 3, delay: 0 },
  { top: '20%', left: '80%', size: 2, delay: 0.5 },
  { top: '55%', left: '15%', size: 2, delay: 1.0 },
  { top: '70%', left: '70%', size: 3, delay: 1.5 },
  { top: '30%', left: '55%', size: 2, delay: 0.8 },
  { top: '80%', left: '35%', size: 2, delay: 0.3 },
  { top: '15%', left: '42%', size: 2, delay: 1.2 },
  { top: '65%', left: '88%', size: 3, delay: 0.6 },
  { top: '85%', left: '12%', size: 2, delay: 1.8 },
  { top: '40%', left: '92%', size: 2, delay: 0.9 },
];

const HERO_TITLE = 'BladeX AI';

const sectionLabel = 'font-ai-display text-red-500 font-semibold text-xs uppercase tracking-widest';

export default function BladeXAI() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="bladex-ai-page min-h-screen bg-black">
      {/* Hero */}
      <section className="relative flex min-h-[100dvh] items-center overflow-hidden pt-28 pb-16 sm:pt-32">
        <div className="absolute inset-0 z-0">
          <SpaceSectionBackground starDensity={1.1} softVignette vignetteBlack />
        </div>

        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex flex-col items-center"
          >
            <div className="flex items-center gap-4 sm:gap-5">
              <img
                src="/bladex-ai-mark.png?v=4"
                alt=""
                className="h-14 w-auto sm:h-16 md:h-20 object-contain shrink-0"
              />
              <h1
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-none tracking-tight whitespace-nowrap"
                aria-label={HERO_TITLE}
              >
                {HERO_TITLE.split('').map((character, index) => {
                  const isAi = index >= HERO_TITLE.indexOf('AI');
                  return (
                    <motion.span
                      key={`${character}-${index}`}
                      aria-hidden="true"
                      className={`inline-block ${isAi ? 'text-red-500' : 'text-white'}`}
                      initial={reduceMotion ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.01,
                        delay: reduceMotion ? 0 : 0.2 + index * 0.08,
                      }}
                    >
                      {character === ' ' ? '\u00A0' : character}
                    </motion.span>
                  );
                })}
              </h1>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: reduceMotion ? 0 : 1.1 }}
              className="mt-5 text-lg sm:text-xl text-slate-300 max-w-xl"
            >
              Simplifying The Future Of AI and Technology
            </motion.p>
          </motion.div>
        </div>

        <button
          type="button"
          aria-label="Scroll to next section"
          onClick={() =>
            document.getElementById('bladex-ai-mission')?.scrollIntoView({ behavior: 'smooth' })
          }
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-slate-400 hover:text-red-400 transition-colors"
        >
          <svg
            width="18"
            height="28"
            viewBox="0 0 18 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden
          >
            <rect
              x="1"
              y="1"
              width="16"
              height="26"
              rx="8"
              stroke="currentColor"
              strokeWidth="2"
            />
            <motion.circle
              cx="9"
              cy="8"
              r="1.5"
              fill="currentColor"
              animate={{ cy: [8, 16, 8], opacity: [1, 0.35, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>
        </button>
      </section>

      {/* Mission */}
      <section id="bladex-ai-mission" className="relative py-20 sm:py-24 bg-black">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <span className={sectionLabel}>Our Mission</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Technology, Demystified</h2>
            <p className="mt-6 text-base sm:text-lg text-slate-400 leading-relaxed">
              BladeX AI is our dedicated technical division — focused on sharing the latest in artificial
              intelligence, emerging technology trends, and insights into what AI is truly capable of. Beyond
              content, our team builds and supports real technical projects, including the BladeX platform
              itself and initiatives yet to come.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Focus */}
      <section className="relative py-20 sm:py-24 bg-black overflow-visible">
        <div
          className="pointer-events-none absolute -right-24 top-24 h-80 w-80 rounded-full blur-3xl opacity-[0.14]"
          style={{ background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-10 h-64 w-64 rounded-full blur-3xl opacity-[0.1]"
          style={{ background: 'radial-gradient(circle, #991b1b 0%, transparent 70%)' }}
          aria-hidden
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className={sectionLabel}>What We Do</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Our Focus</h2>
            <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto">
              Four lanes we work in — from insight to shipped software.
            </p>
          </div>

          {/* Connected panel — stacking isolated so hub only tops these cards */}
          <div className="relative sm:p-3">
            <div className="relative isolate grid sm:grid-cols-2 gap-3 rounded-[14px]">
              {focusItems.map(({ Icon, title, description }, i) => {
                // peel toward each corner on hover
                const pull = [
                  { x: -16, y: -16 },
                  { x: 16, y: -16 },
                  { x: -16, y: 16 },
                  { x: 16, y: 16 },
                ][i];
                return (
                  <motion.div
                    key={title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            x: pull.x,
                            y: pull.y,
                            transition: { type: 'spring', stiffness: 380, damping: 26 },
                          }
                    }
                    className="group relative z-0 rounded-xl bg-[#0c0e12] p-6 sm:p-8 transition-[background-color,box-shadow] duration-300 hover:z-[1] hover:bg-[#12151c] hover:shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
                  >
                    <div
                      className={`pointer-events-none absolute h-24 w-24 rounded-full bg-red-500/[0.07] blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
                        i === 0
                          ? 'right-0 bottom-0'
                          : i === 1
                            ? 'left-0 bottom-0'
                            : i === 2
                              ? 'right-0 top-0'
                              : 'left-0 top-0'
                      }`}
                      aria-hidden
                    />
                    <div className="relative flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border-2 border-red-500/40 bg-red-500/10 transition-colors group-hover:border-red-500/70 group-hover:bg-red-500/15">
                        <Icon className="text-red-400" />
                      </div>
                      <div className="min-w-0 pt-0.5">
                        <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
                        <p className="mt-2 text-sm text-slate-400 leading-relaxed">{description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Hub above cards only (within isolate) */}
              <div
                className="pointer-events-none absolute left-1/2 top-1/2 z-[2] hidden -translate-x-1/2 -translate-y-1/2 sm:block"
                aria-hidden
              >
                <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500/70 bg-black shadow-[0_0_28px_rgba(239,68,68,0.55)] ring-4 ring-black">
                  <img
                    src="/bladex-ai-mark.png?v=4"
                    alt=""
                    className="h-8 w-8 object-contain"
                    draggable={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Projects */}
      <section className="relative py-20 sm:py-24 bg-black overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-20"
          style={{ background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)' }}
          aria-hidden
        />
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className={sectionLabel}>Built In-House</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Current Projects</h2>
            <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto">
              What we ship — and what we’re building next.
            </p>
          </div>

          <div className="relative space-y-5">
            {/* Timeline spine */}
            <div
              className="pointer-events-none absolute left-[2.35rem] top-14 bottom-14 w-px bg-gradient-to-b from-red-500 via-red-500/40 to-slate-700 hidden sm:block"
              aria-hidden
            />

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              whileHover={{ y: -3 }}
              className="relative flex gap-4 sm:gap-5 rounded-2xl border border-red-500/35 bg-gradient-to-br from-[#1a1216] to-[#151921] p-5 sm:p-6 shadow-[0_0_40px_rgba(239,68,68,0.08)]"
            >
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border-2 border-red-500/40 bg-red-500/15">
                <img
                  src="/bladex-ai-mark.png?v=4"
                  alt=""
                  className="h-7 w-7 object-contain"
                />
                <span className="absolute -right-0.5 -top-0.5 flex h-2.5 w-2.5">
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    BladeX Website
                  </h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Live
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-400 leading-relaxed max-w-lg">
                  The platform you are on right now — designed and built in-house by the BladeX AI & Tech
                  team.
                </p>
                <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-red-500/80">
                  In production
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.06 }}
              whileHover={{ y: -3 }}
              className="relative flex gap-4 sm:gap-5 rounded-2xl border border-dashed border-slate-600/80 bg-[#12151c]/80 p-5 sm:p-6 backdrop-blur-sm"
            >
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border-2 border-slate-500 bg-slate-800">
                <PixelIcon cells={PIXEL_SOON} size={24} className="text-slate-100" />
              </div>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white/90 tracking-tight">
                    Many more to come...
                  </h3>
                  <span className="rounded-full border border-slate-600 bg-slate-800/60 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Soon
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-lg">
                  New initiatives are already in the works. Stay tuned.
                </p>
                <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.2em] text-slate-600">
                  On the roadmap
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="relative py-20 sm:py-24 bg-black overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full blur-3xl opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)' }}
          aria-hidden
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-center mb-12"
          >
            <span className={sectionLabel}>The Minds Behind It</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">Leadership</h2>
            <p className="mt-4 text-sm text-slate-500 max-w-xl mx-auto">
              The vision and technical expertise driving BladeX AI & Technology forward.
            </p>
          </motion.div>

          <motion.div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {leaders.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: 'easeOut' } }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.03, ease: 'easeOut' }}
                className="group bg-white rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/10 border-t-2 border-red-600 flex flex-col cursor-default transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(239,68,68,0.18)]"
              >
                {/* Top — About-style photo header */}
                <div className="relative px-6 pt-8 pb-6 flex flex-col items-center text-center overflow-hidden bg-[#0b0f18]">
                  <div
                    className="absolute -top-6 -left-6 w-32 h-32 rounded-full blur-2xl opacity-50"
                    style={{ background: '#ef4444' }}
                  />
                  <div
                    className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full blur-2xl opacity-40"
                    style={{ background: '#991b1b' }}
                  />
                  <div
                    className="absolute top-4 right-8 w-20 h-20 rounded-full blur-xl opacity-30"
                    style={{ background: '#f87171' }}
                  />
                  <div className="absolute inset-0 bg-[#0b0f18]/70" />
                  {starDots.map((dot, di) => (
                    <motion.div
                      key={di}
                      className="absolute rounded-full bg-red-500/50 pointer-events-none"
                      style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
                      animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity, delay: dot.delay, ease: 'easeInOut' }}
                    />
                  ))}
                  <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-slate-800 flex items-center justify-center mb-4 ring-2 ring-red-500/30 shadow-[0_0_24px_rgba(239,68,68,0.25)] transition-transform duration-300 group-hover:scale-[1.03]">
                    <img
                      src={p.photo}
                      alt={p.name}
                      className={`w-full h-full object-cover ${p.photoClass}`}
                    />
                  </div>
                  <h3 className="relative text-lg font-bold text-white leading-tight tracking-tight">
                    {p.name}
                  </h3>
                  <p className="relative mt-1.5 text-[11px] font-bold text-red-400 uppercase tracking-[0.2em]">
                    {p.role}
                  </p>
                </div>

                {/* Bottom — education / offer / tags */}
                <div className="px-5 py-5 sm:px-6 sm:py-6 flex flex-col gap-4 text-left bg-[#fafafa]">
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-red-200 bg-red-50 text-red-500">
                      <PixelIcon cells={PIXEL_GRAD} size={14} />
                    </span>
                    <p className="text-sm text-slate-700 leading-snug pt-0.5">{p.education}</p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-red-200 bg-red-50 text-red-500">
                      <PixelIcon cells={PIXEL_MEDAL} size={14} />
                    </span>
                    <p className="text-sm text-slate-700 leading-snug pt-0.5">{p.offer}</p>
                  </div>
                  <div className="h-px w-full bg-slate-200/80" aria-hidden />
                  <div className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border border-red-200 bg-red-50 text-red-500">
                      <PixelIcon cells={PIXEL_SPARK} size={14} />
                    </span>
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-slate-200 bg-white px-2.5 py-0.5 text-[11px] text-slate-600 shadow-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <p className="mt-12 text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-500">
            <span className="text-red-500/80">BladeX</span> AI & Technology
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="relative py-20 sm:py-24 bg-black overflow-hidden">
        <div
          className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 translate-x-1/3 rounded-full blur-3xl opacity-[0.12]"
          style={{ background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-0 bottom-0 h-72 w-72 -translate-x-1/4 rounded-full blur-3xl opacity-[0.1]"
          style={{ background: 'radial-gradient(circle, #7f1d1d 0%, transparent 70%)' }}
          aria-hidden
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className={sectionLabel}>The Frontier</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white">What AI Is Capable Of</h2>
            <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto">
              A glimpse into the domains we explore and build within.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-3 sm:pb-6">
            {capabilities.map(({ Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                whileHover={{ y: -3 }}
                className={`group relative overflow-hidden rounded-2xl border border-slate-700/50 bg-[#12151c] px-5 py-4 transition-[border-color,box-shadow] duration-300 hover:border-red-500/45 hover:shadow-[0_0_32px_rgba(239,68,68,0.1)] ${
                  i % 2 === 1 ? 'sm:translate-y-6' : ''
                }`}
              >
                <div
                  className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-red-500/70 to-transparent opacity-50 group-hover:opacity-100 transition-opacity"
                  aria-hidden
                />
                <div className="relative flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border-2 border-red-500/25 bg-red-500/10 transition-colors group-hover:border-red-500/50">
                    <Icon className="text-red-400" />
                  </div>
                  <div className="min-w-0 pt-0.5">
                    <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
                    <p className="mt-1 text-sm text-slate-400 leading-relaxed">{description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="relative py-20 sm:py-24 bg-black overflow-hidden">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-[0.16]"
          style={{ background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)' }}
          aria-hidden
        />
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
          >
            <span className={sectionLabel}>Join Us</span>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold text-white tracking-tight">
              Stay Connected
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-md mx-auto leading-relaxed">
              Follow BladeX AI & Technology as we build the future.
            </p>
            <a
              href="https://www.facebook.com/profile.php?id=61591631907089"
              target="_blank"
              rel="noopener noreferrer"
              className={`group mt-8 inline-flex items-center justify-center gap-2 bg-neutral-200 text-black font-semibold rounded-2xl transition-[background-color,color,box-shadow,gap] duration-300 ease-out hover:bg-red-600 hover:text-white hover:gap-3 hover:shadow-[0_4px_14px_rgba(220,38,38,0.35)] ${solidButton.md}`}
            >
              <span>Follow Us</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-[transform,margin] duration-500 ease-out group-hover:translate-x-2 group-hover:scale-110" />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
