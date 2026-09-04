import React from 'react';
import { motion } from 'framer-motion';
import { sectionBadgeClass } from '@/utils/glassStyles';
import SpaceSectionBackground from '@/components/shared/SpaceSectionBackground';

const programVisual = {
  // ponytail: same accent themes, one step brighter than shared slate matte
  consulting: {
    iconSrc: 'https://img.icons8.com/fluency/96/chat--v1.png',
    iconAlt: 'Chat',
    box: 'bg-blue-500/25 border-blue-400/40',
    glow: ['#60a5fa', '#38bdf8'],
    glowStrong: true,
  },
  mentorship: {
    iconSrc: 'https://img.icons8.com/office/80/training.png',
    iconAlt: 'Training',
    box: 'bg-indigo-500/25 border-indigo-400/40',
    glow: ['#818cf8', '#a5b4fc'],
    glowStrong: true,
  },
  guidance: {
    iconSrc: 'https://img.icons8.com/office/80/user-manual.png',
    iconAlt: 'User manual',
    box: 'bg-emerald-500/25 border-emerald-400/40',
    glow: ['#34d399', '#6ee7b7'],
    glowStrong: true,
  },
};

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
  description: "A private, personalized session where we listen to your situation, explore your interests, and help you make confident, informed decisions about studying abroad.",
  areas: [
    { label: 'Major Exploration', detail: 'Business, Computer Science, Medicine, Engineering, and more' },
    { label: 'Country Selection', detail: 'US, Canada, UK, Thailand, Singapore, and others' },
    { label: 'University Direction', detail: 'Finding the right fit for your goals and budget' },
    { label: 'Application Planning', detail: 'Timeline and step-by-step preparation' },
    { label: 'Document Review', detail: 'SOP, CV, and essential application materials' },
  ],
  note: 'Sessions are booked directly with your chosen consultant — at a time that works for both of you.',
  free: true,
};

const mentorship = {
  id: 'mentorship',
  title: 'Mentorship Program',
  tagline: 'Continuous partnership, through your academic journey.',
  description: "A continuous partnership where we guide you through every step of your academic journey. Rather than a single consultation, we work closely with you over multiple sessions to navigate the entire application process.",
  areas: [
    { label: 'Ongoing Check-ins', detail: 'Regular meetings to answer your questions and plan your next steps' },
    { label: 'Application Assistance', detail: 'Step-by-step help with preparing and submitting your university applications' },
    { label: 'Offer Support', detail: 'Guidance on reviewing, choosing, and accepting your university admission offers' },
    { label: 'Goal Setting & Progress Tracking', detail: 'Keeping your application deadlines organized and moving forward' },
    { label: 'Community Connection', detail: 'Access to a network of peers and mentors who have successfully navigated the process' },
  ],
  note: 'We work closely with you over multiple sessions to navigate the entire application process, keeping you on track until you successfully secure your university offer.',
  free: true,
};

const guidance = {
  id: 'guidance',
  title: 'Career Guidance Program',
  tagline: 'Consultation for your future career path.',
  description: "Whether you feel overwhelmed by having too many interests or are completely unsure of which direction to take, our mentors and consultants are here to listen. Using their professional experience and knowledge, they will provide tailored advice to help you find your best fit. 🔍",
  areas: [
    { label: 'Career Path Exploration', detail: 'Discover multiple career options aligned with your interests' },
    { label: 'Professional Trajectory Planning', detail: 'Map out a strategic plan for your professional future' },
    { label: 'Tailored Advice', detail: 'Personalized recommendations based on your unique situation' },
    { label: 'Industry Insights', detail: 'Learn from professionals with real-world experience' },
    { label: 'Direction Finding', detail: 'Clarity when you are overwhelmed or unsure of which path to take' },
  ],
  note: 'While similar in format to our One-on-One Consulting, this program focuses specifically on your career and professional trajectory rather than just academics.',
  free: true,
};

const values = [
  {
    iconSrc: 'https://img.icons8.com/external-kmg-design-flat-kmg-design/64/external-direction-maps-navigation-kmg-design-flat-kmg-design-1.png',
    iconAlt: 'Strategic direction icon',
    title: 'Strategic Academic Direction',
    description: "We offer targeted support to students who feel uncertain about their future trajectory, delivering clarity and a strategic plan to move forward with confidence.",
    color: 'blue',
  },
  {
    iconSrc: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-personalization-marketing-technology-flaticons-lineal-color-flat-icons.png',
    iconAlt: 'Personalized counselling icon',
    title: 'Personalized Counselling',
    description: "We explore your interests, goals, and situation to help you choose the right country and university — confidently.",
    color: 'rose',
  },
  {
    iconSrc: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-career-online-marketing-flaticons-lineal-color-flat-icons.png',
    iconAlt: 'Study to career pathway icon',
    title: 'Study-to-Career Pathway',
    description: "We help you strategically select a field of study that aligns with tangible career opportunities, delivering a robust, long-term foundation for your professional future.",
    color: 'indigo',
  },
];

const valuesIconColor = {
  blue: 'bg-blue-100 text-blue-600',
  rose: 'bg-rose-100 text-rose-600',
  indigo: 'bg-indigo-100 text-indigo-600',
};

const steps = [
  {
    iconSrc: 'https://img.icons8.com/stickers/50/search.png',
    iconAlt: 'Search',
    number: '01',
    title: 'Discovery & Assessment',
    description: 'We start with a comprehensive consultation to understand your unique background, academic strengths, and where you feel uncertain about your future.',
  },
  {
    iconSrc: 'https://img.icons8.com/stickers/100/map-marker.png',
    iconAlt: 'Map marker',
    number: '02',
    title: 'Strategic Pathway Mapping',
    description: 'Our consultants analyze your goals to strategically recommend the right fields of study and academic destinations that align with your career ambitions.',
  },
  {
    iconSrc: 'https://img.icons8.com/stickers/100/checked-checkbox.png',
    iconAlt: 'Checked checkbox',
    number: '03',
    title: 'Actionable Roadmap',
    description: 'We equip you with a step-by-step preparation plan, giving you the clarity, confidence, and resources to independently navigate your applications.',
  },
];

function ProgramCard({ program, reverse }) {
  const visual = programVisual[program.id];
  const { box, iconSrc, iconAlt, Icon, icon, glow, glowStrong } = visual;

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
        <div className="relative overflow-hidden bg-[#060b18] rounded-3xl p-10 text-white min-h-[360px] flex flex-col justify-between">
          <div className="absolute inset-0 z-0">
            <SpaceSectionBackground softVignette starDensity={1.1} />
          </div>
          <div className={`absolute -top-10 -right-10 z-[1] w-52 h-52 rounded-full blur-3xl pointer-events-none ${glowStrong ? 'opacity-45' : 'opacity-35'}`} style={{ background: glow[0] }} aria-hidden />
          <div className={`absolute -bottom-12 -left-8 z-[1] w-48 h-48 rounded-full blur-3xl pointer-events-none ${glowStrong ? 'opacity-35' : 'opacity-30'}`} style={{ background: glow[1] }} aria-hidden />
          <div className="relative z-10 flex flex-col justify-between flex-1">
            <div>
              <div className={`w-14 h-14 border rounded-2xl flex items-center justify-center mb-5 ${box}`}>
                {iconSrc ? (
                  <img
                    src={iconSrc}
                    alt={iconAlt ?? program.title}
                    className="w-8 h-8 object-contain"
                    loading="lazy"
                  />
                ) : (
                  <Icon className={`w-7 h-7 ${icon}`} strokeWidth={2} aria-hidden />
                )}
              </div>
              <p className="text-sm text-white font-extrabold uppercase tracking-widest mb-2">BladeX Service</p>
              <h3 className="text-2xl font-bold text-white mb-3">{program.title}</h3>
              <p className="text-slate-300 text-sm italic">"{program.tagline}"</p>
            </div>
            <div className="mt-8 bg-white/5 rounded-xl px-4 py-3 text-xs text-white/90 border border-white/10">
              📌 {program.note}
            </div>
          </div>
        </div>
      </div>

      {/* Content side */}
      <div className={`${reverse ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
        <p className="text-slate-600 leading-relaxed mb-7">{program.description}</p>
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">What's Included</h4>
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
          <SpaceSectionBackground starDensity={1.2} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
            <span className={sectionBadgeClass}>Our Services</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">Programs & Services</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Personalized consulting and mentorship for Myanmar students pursuing education abroad.
            </p>
          </motion.div>
        </div>

      </section>

      {/* Programs */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          <ProgramCard program={consulting} reverse={false} />
          <ProgramCard program={mentorship} reverse={true} />
          <ProgramCard program={guidance} reverse={false} />
        </div>

      </section>

      {/* What We Focus On */}
      <section className="relative py-24 bg-slate-50">
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
                  className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-slate-100"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-14 h-14 shrink-0 ${valuesIconColor[v.color]} rounded-2xl flex items-center justify-center`}
                    >
                      <img
                        src={v.iconSrc}
                        alt={v.iconAlt}
                        className="w-8 h-8 object-contain"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 leading-snug min-w-0 m-0">
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
      <section className="relative py-24 bg-white">
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
            <p className="text-slate-500 mt-4 max-w-xl mx-auto">From your first conversation to your final plan — here's how we walk with you.</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connector line (desktop only) */}
            <div className="hidden md:block absolute top-10 left-1/6 right-1/6 h-px bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" style={{ left: '17%', right: '17%' }} />

            {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div className="relative z-10 w-20 h-20 overflow-hidden bg-[#060b18] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-slate-300/40">
                    <div className="absolute inset-0">
                      <SpaceSectionBackground softVignette starDensity={0.2} />
                    </div>
                    <img
                      src={step.iconSrc}
                      alt={step.iconAlt ?? ''}
                      className="relative z-10 w-10 h-10 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-2">Step {step.number}</div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.description}</p>
                </motion.div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}