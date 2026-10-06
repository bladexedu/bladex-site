import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Compass, Globe, HeartHandshake, MapPin, Search } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { sectionBadgeClass, solidButton } from '@/utils/glassStyles';
import StarfieldBackground from '@/components/shared/StarfieldBackground';

const programVisual = {
  consulting: { decor: 'rings' },
  mentorship: { decor: 'tracks' },
  guidance: { decor: 'squares' },
};

function RingsDecor() {
  return (
    <svg aria-hidden viewBox="0 0 360 360" className="pointer-events-none absolute -bottom-36 -left-36 h-[360px] w-[360px] opacity-90">
      {[70, 110, 150, 178].map((r, i) => (
        <circle key={r} cx="180" cy="180" r={r} fill="none" stroke="#93c5fd" strokeWidth="1.4" opacity={0.85 - i * 0.12} />
      ))}
    </svg>
  );
}

function TracksDecor() {
  return (
    <svg aria-hidden viewBox="0 0 320 260" className="pointer-events-none absolute -top-9 -right-12 h-[260px] w-[320px] opacity-100">
      <defs>
        <linearGradient id="program-tracks-fade" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="1" />
          <stop offset="45%" stopColor="#60a5fa" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0.15" />
        </linearGradient>
      </defs>
      {[48, 88, 128, 168, 208].map((y, i) => (
        <path
          key={y}
          d={`M 40 ${y} C 120 ${y - 18}, 200 ${y + 22}, 300 ${y - 6}`}
          fill="none"
          stroke="url(#program-tracks-fade)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={1 - i * 0.12}
        />
      ))}
    </svg>
  );
}

function SquaresDecor() {
  return (
    <svg aria-hidden viewBox="0 0 360 360" className="pointer-events-none absolute -top-36 -right-36 h-[360px] w-[360px] opacity-90">
      {[70, 110, 150, 190].map((s, i) => (
        <rect
          key={s}
          x={180 - s}
          y={180 - s}
          width={s * 2}
          height={s * 2}
          fill="none"
          stroke="#93c5fd"
          strokeWidth="1.4"
          opacity={0.85 - i * 0.12}
        />
      ))}
    </svg>
  );
}

function ProgramDecor({ type }) {
  if (type === 'tracks') return <TracksDecor />;
  if (type === 'squares') return <SquaresDecor />;
  return <RingsDecor />;
}

function ProgramAreaBulletIcon() {
  const uid = React.useId().replace(/:/g, '');
  const gr1 = `prog-area-gr1-${uid}`;
  const gr2 = `prog-area-gr2-${uid}`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className="w-4 h-4 shrink-0"
      aria-hidden
    >
      <linearGradient
        id={gr1}
        x1="21.241"
        x2="3.541"
        y1="39.241"
        y2="21.541"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.108" stopColor="#0d7044" />
        <stop offset="0.433" stopColor="#11945a" />
      </linearGradient>
      <path
        fill={`url(#${gr1})`}
        d="M16.599,41.42L1.58,26.401c-0.774-0.774-0.774-2.028,0-2.802l4.019-4.019	c0.774-0.774,2.028-0.774,2.802,0L23.42,34.599c0.774,0.774,0.774,2.028,0,2.802l-4.019,4.019	C18.627,42.193,17.373,42.193,16.599,41.42z"
      />
      <linearGradient
        id={gr2}
        x1="-15.77"
        x2="26.403"
        y1="43.228"
        y2="43.228"
        gradientTransform="rotate(134.999 21.287 38.873)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#2ac782" />
        <stop offset="1" stopColor="#21b876" />
      </linearGradient>
      <path
        fill={`url(#${gr2})`}
        d="M12.58,34.599L39.599,7.58c0.774-0.774,2.028-0.774,2.802,0l4.019,4.019	c0.774,0.774,0.774,2.028,0,2.802L19.401,41.42c-0.774,0.774-2.028,0.774-2.802,0l-4.019-4.019	C11.807,36.627,11.807,35.373,12.58,34.599z"
      />
    </svg>
  );
}

const consulting = {
  id: 'consulting',
  title: 'One-on-One Consulting',
  tagline: 'Clarity, direction, and a plan that fits you.',
  description: "A personalized conversation where you can share your goals, questions, and uncertainties. Whether you already have a clear plan or simply know that you want to study abroad but don't know where to begin, our consultants are here to listen, share their firsthand experience, and help you figure out what comes next.",
  areasHeading: "What's Included",
  areas: [
    { label: 'Explore Your Direction', detail: 'Discuss your interests, strengths, and possible academic pathways.' },
    { label: 'Major & Field Exploration', detail: 'Learn more about different fields from consultants with firsthand experience in their areas of study.' },
    { label: 'Country & University Exploration', detail: 'Understand your options and explore destinations and universities that may fit your goals.' },
    { label: 'Application Guidance', detail: 'Understand requirements, timelines, and the steps involved in preparing your application.' },
    { label: 'Motivation & Support', detail: 'Get encouragement, perspective, and practical guidance when you feel lost, uncertain, or unsure where to start.' },
  ],
  note: 'Sessions are arranged directly with your chosen consultant at a mutually convenient time.',
  free: true,
};

const mentorship = {
  id: 'mentorship',
  title: 'Mentorship Program',
  tagline: 'Someone to guide you, support you, and walk with you along the way.',
  description: "Unlike a one-time consultation, the Mentorship Program gives you the opportunity to build an ongoing relationship with a consultant who can provide guidance as your plans develop, questions arise, and important decisions come up.",
  areasHeading: 'How We Can Help',
  areas: [
    { label: 'Ongoing Guidance', detail: 'Regular conversations to discuss your progress, questions, goals, and next steps.' },
    { label: 'Personalized Academic Support', detail: 'Guidance tailored to your interests, circumstances, and academic pathway.' },
    { label: 'Application Guidance', detail: 'Support with understanding requirements, planning timelines, and preparing for important application steps.' },
    { label: 'Goal Setting & Progress', detail: 'Turn your goals into manageable steps and stay on track throughout your journey.' },
    { label: 'Firsthand Experience & Community', detail: 'Learn from someone who has navigated the study-abroad experience while becoming part of a wider community of students, consultants, and mentors.' },
  ],
  note: 'A longer-term mentorship experience connecting you with a consultant who understands your goals and can support you throughout your academic journey.',
  free: true,
};

const guidance = {
  id: 'guidance',
  title: 'Career & Future Guidance Program',
  tagline: "Connect what you're interested in with where you want to go.",
  description: "Whether you're choosing a career direction, exploring opportunities related to your field of study, or considering a change in career, our consultants are here to help you understand your options and find a path that fits your goals.",
  areasHeading: 'How We Can Help',
  areas: [
    { label: 'Academic-to-Career Alignment', detail: 'Explore how your academic interests, major, and skills can connect to potential career paths.' },
    { label: 'Career Path Exploration', detail: 'Discover different roles, industries, and opportunities that align with your interests and strengths.' },
    { label: 'Career Change Guidance', detail: "If you're considering a new direction, discuss your transferable skills, possible pathways, and the steps involved in making a change." },
    { label: 'Industry Insights', detail: 'Learn from consultants with firsthand experience across different fields, industries, and professional environments.' },
    { label: 'Finding Your Direction', detail: "Gain clarity when you're unsure what comes next, have too many options, or simply want another perspective before making an important career decision." },
  ],
  note: 'A personalized session to help you connect your academic interests, skills, and experiences with potential career paths.',
  free: true,
};

const values = [
  {
    Icon: Compass,
    title: 'Find Your Direction',
    description: "Not sure what to study, where to go, or even where to begin? We help you explore your interests, strengths, and possibilities so you can better understand what path may be right for you.",
  },
  {
    Icon: HeartHandshake,
    title: "Guidance That's Personal",
    description: "Your goals, circumstances, and aspirations are unique. We take the time to understand your story and connect you with guidance that reflects where you are and where you want to go.",
  },
  {
    Icon: Globe,
    title: 'Learn From Experience',
    description: "Connect with consultants and mentors who have firsthand experience in the countries, universities, and fields you're exploring. Get practical perspectives that go beyond what you can find online.",
  },
];

const steps = [
  {
    Icon: Search,
    number: '01',
    title: 'Discovery & Assessment',
    description: 'We start with a comprehensive consultation to understand your unique background, academic strengths, and where you feel uncertain about your future.',
  },
  {
    Icon: MapPin,
    number: '02',
    title: 'Strategic Pathway Mapping',
    description: 'Our consultants analyze your goals to strategically recommend the right fields of study and academic destinations that align with your career ambitions.',
  },
  {
    Icon: Check,
    number: '03',
    title: 'Actionable Roadmap',
    description: 'We equip you with a step-by-step preparation plan, giving you the clarity, confidence, and resources to independently navigate your applications.',
  },
];

function ProcessStep({ step, index }) {
  const Icon = step.Icon;
  const n = index + 1;

  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className={`proc-icon proc-icon-${n} relative z-10 mb-6 flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-[#060b18] shadow-lg shadow-slate-300/40`}>
        <div className="pointer-events-none absolute inset-0 bg-[#060b18]" aria-hidden />
        <div className="absolute inset-0">
          <StarfieldBackground starDensity={0.2} />
        </div>
        <Icon className="relative z-10 h-9 w-9" strokeWidth={1.75} aria-hidden />
      </div>
      <div className={`proc-copy proc-copy-${n} mb-2 text-xs font-bold uppercase tracking-widest text-blue-500`}>
        Step {step.number}
      </div>
      <h3 className={`proc-copy proc-copy-${n} mb-3 text-lg font-bold text-slate-900`}>{step.title}</h3>
      <p className={`proc-copy proc-copy-${n} text-sm leading-relaxed text-slate-500`}>{step.description}</p>
    </div>
  );
}

function ProgramCard({ program, reverse }) {
  const visual = programVisual[program.id];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:grid-flow-dense' : ''}`}
    >
      {/* Image / Visual side */}
      <div className={`${reverse ? 'lg:col-start-2' : ''}`}>
        <div className="relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-3xl bg-[linear-gradient(165deg,#1e293b_0%,#0f172a_48%,#060b18_100%)] p-10 text-white">
          <ProgramDecor type={visual.decor} />
          <div className="relative z-10 flex flex-1 flex-col justify-between">
            <div>
              <p className="mb-2 text-sm font-extrabold uppercase tracking-widest text-white">
                BladeX Service
              </p>
              <h3 className="mb-3 text-2xl font-normal text-slate-100">
                {program.title}
              </h3>
              <p className="text-sm italic text-slate-300">"{program.tagline}"</p>
            </div>
            <div className="mt-8 flex items-start gap-2.5 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs text-white/90">
              <span aria-hidden className="mt-1 h-2 w-2 shrink-0 rotate-45 bg-red-500" />
              <span>{program.note}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content side */}
      <div className={`${reverse ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
        {program.description ? (
          <p className="text-slate-600 leading-relaxed mb-7">{program.description}</p>
        ) : null}
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{program.areasHeading}</h4>
        <ul className="space-y-4">
          {program.areas.map((area, i) => (
            <li key={i} className="flex gap-4 items-start">
              <div className="w-9 h-9 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                <ProgramAreaBulletIcon />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-sm">{area.label}</p>
                <p className="text-slate-500 text-xs mt-0.5">{area.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Programs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-28 bg-[#060b18] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <StarfieldBackground starDensity={1.2} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
            <span className={sectionBadgeClass}>Our Services</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">Programs & Services</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Guidance, mentorship, and support for students exploring education beyond borders.
            </p>
          </motion.div>
        </div>

      </section>

      {/* Programs */}
      <section className="relative bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          <ProgramCard program={consulting} reverse={false} />
          <ProgramCard program={mentorship} reverse={true} />
          <ProgramCard program={guidance} reverse={false} />
        </div>

      </section>

      {/* What We Focus On */}
      <section className="relative bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Our Approach</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Three Key Areas</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">Everything we do centers around making your study abroad journey feel manageable, clear, and purposeful.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-100 text-center"
                >
                  <div className="mb-5 flex flex-col items-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                      <v.Icon className="h-7 w-7" strokeWidth={1.75} aria-hidden />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug m-0">
                      {v.title}
                    </h3>
                  </div>
                  <p className="text-slate-500 leading-relaxed">{v.description}</p>
                </motion.div>
            ))}
          </div>
        </div>

      </section>

      {/* Our Process */}
      <section className="relative bg-white py-24">
        <style>{`
          .proc-timeline .proc-line-fill {
            transform: scaleX(0);
            transform-origin: left center;
            animation: proc-line 5.2s ease-in-out infinite;
          }
          .proc-timeline .proc-icon,
          .proc-timeline .proc-copy {
            animation-duration: 5.2s;
            animation-timing-function: ease-in-out;
            animation-iteration-count: infinite;
          }
          .proc-timeline .proc-icon {
            color: #fff;
          }
          .proc-timeline .proc-icon-1 { animation-name: proc-icon-1; }
          .proc-timeline .proc-icon-2 { animation-name: proc-icon-2; }
          .proc-timeline .proc-icon-3 { animation-name: proc-icon-3; }
          .proc-timeline .proc-copy-1 { animation-name: proc-copy-1; }
          .proc-timeline .proc-copy-2 { animation-name: proc-copy-2; }
          .proc-timeline .proc-copy-3 { animation-name: proc-copy-3; }
          .proc-timeline:hover .proc-line-fill,
          .proc-timeline:hover .proc-icon,
          .proc-timeline:hover .proc-copy {
            animation-play-state: paused;
          }
          @keyframes proc-line {
            0%, 8% { transform: scaleX(0); }
            30% { transform: scaleX(0.5); }
            54%, 76% { transform: scaleX(1); }
            88%, 100% { transform: scaleX(0); }
          }
          @keyframes proc-icon-1 {
            0%, 76% {
              transform: scale(1.06);
              color: #22c55e;
              box-shadow: 0 0 0 2px #22c55e, 0 8px 22px -6px rgba(34, 197, 94, 0.55);
            }
            88%, 100% {
              transform: scale(1);
              color: #fff;
              box-shadow: 0 10px 15px -3px rgb(203 213 225 / 0.4);
            }
          }
          @keyframes proc-icon-2 {
            0%, 24% {
              transform: scale(1);
              color: #fff;
              box-shadow: 0 10px 15px -3px rgb(203 213 225 / 0.4);
            }
            30%, 76% {
              transform: scale(1.06);
              color: #22c55e;
              box-shadow: 0 0 0 2px #22c55e, 0 8px 22px -6px rgba(34, 197, 94, 0.55);
            }
            88%, 100% {
              transform: scale(1);
              color: #fff;
              box-shadow: 0 10px 15px -3px rgb(203 213 225 / 0.4);
            }
          }
          @keyframes proc-icon-3 {
            0%, 48% {
              transform: scale(1);
              color: #fff;
              box-shadow: 0 10px 15px -3px rgb(203 213 225 / 0.4);
            }
            54%, 76% {
              transform: scale(1.06);
              color: #22c55e;
              box-shadow: 0 0 0 2px #22c55e, 0 8px 22px -6px rgba(34, 197, 94, 0.55);
            }
            88%, 100% {
              transform: scale(1);
              color: #fff;
              box-shadow: 0 10px 15px -3px rgb(203 213 225 / 0.4);
            }
          }
          @keyframes proc-copy-1 {
            0%, 76% { opacity: 1; }
            88%, 100% { opacity: 0.4; }
          }
          @keyframes proc-copy-2 {
            0%, 24% { opacity: 0.4; }
            30%, 76% { opacity: 1; }
            88%, 100% { opacity: 0.4; }
          }
          @keyframes proc-copy-3 {
            0%, 48% { opacity: 0.4; }
            54%, 76% { opacity: 1; }
            88%, 100% { opacity: 0.4; }
          }
          @media (prefers-reduced-motion: reduce) {
            .proc-timeline .proc-line-fill,
            .proc-timeline .proc-icon,
            .proc-timeline .proc-copy { animation: none; }
            .proc-timeline .proc-line-fill { transform: scaleX(1); }
            .proc-timeline .proc-icon { transform: none; color: #22c55e; box-shadow: 0 0 0 2px #22c55e, 0 8px 22px -6px rgba(34, 197, 94, 0.55); }
            .proc-timeline .proc-copy { opacity: 1; }
          }
        `}</style>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">How It Works</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Our Process</h2>
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">From your first conversation to your final step: here's how we walk with you.</p>
          </motion.div>

          <div className="proc-timeline relative grid gap-8 md:grid-cols-3">
            <div
              aria-hidden
              className="pointer-events-none absolute left-[17%] right-[17%] top-10 z-0 hidden h-0.5 overflow-hidden bg-blue-200 md:block"
              style={{
                maskImage:
                  'linear-gradient(to right, transparent 0, transparent 2.6rem, #000 2.6rem, #000 calc(50% - 2.6rem), transparent calc(50% - 2.6rem), transparent calc(50% + 2.6rem), #000 calc(50% + 2.6rem), #000 calc(100% - 2.6rem), transparent calc(100% - 2.6rem), transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to right, transparent 0, transparent 2.6rem, #000 2.6rem, #000 calc(50% - 2.6rem), transparent calc(50% - 2.6rem), transparent calc(50% + 2.6rem), #000 calc(50% + 2.6rem), #000 calc(100% - 2.6rem), transparent calc(100% - 2.6rem), transparent 100%)',
              }}
            >
              <div className="proc-line-fill h-full w-full bg-blue-500" />
            </div>

            {steps.map((step, i) => (
              <ProcessStep key={step.number} step={step} index={i} />
            ))}
          </div>

          <div className="mt-14 text-center">
            <Link to={createPageUrl('Consultants')} className="inline-block transition-transform duration-200 hover:scale-105">
              <button
                className={`group inline-flex items-center justify-center gap-2 rounded-full font-bold text-white bg-shine-gradient ${solidButton.lg}`}
              >
                <span>See Consultants Now</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-[transform,margin] duration-500 ease-out group-hover:translate-x-2 group-hover:scale-110" />
              </button>
            </Link>
          </div>
        </div>

      </section>
    </div>
  );
}