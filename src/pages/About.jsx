import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { animate, motion, useInView, useReducedMotion } from 'framer-motion';
import { ArrowRight, Globe, GraduationCap, Users } from 'lucide-react';
import { createPageUrl } from '@/utils';
import { sectionBadgeClass, solidButton } from '@/utils/glassStyles';
import StarfieldBackground from '@/components/shared/StarfieldBackground';

const HERO_ACCENT = 'Every Step of the Way';

const statCardStyle =
  'border border-blue-400/40 bg-blue-600/20';

const stats = [
  { value: 'Complimentary Advisory', label: 'Access personalized educational guidance and support without the traditional consultancy fees.' },
  { value: 'A Global Community', label: 'Connect with consultants and mentors from all around the world, bringing firsthand experiences from universities and academic fields.' },
  { value: 'Empowering Ambitions', label: 'Created from a simple belief: every student deserves access to guidance, support, and the opportunity to dream beyond borders.' },
  { value: 'Founded in 2026', label: 'Built on real student experiences, authentic mentorship, and proven strategies.' },
];

function StatCard({ stat, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.04 }}
      viewport={{ once: true }}
      transition={{ duration: 0.28, delay: index * 0.03, ease: 'easeOut' }}
      className={`rounded-2xl px-5 py-5 cursor-default transition-colors duration-300 ${statCardStyle}`}
    >
      <div className="text-base font-bold leading-snug text-blue-50">{stat.value}</div>
      <div className="text-xs mt-1 text-blue-200/80">{stat.label}</div>
    </motion.div>
  );
}

function RingsDecor() {
  return (
    <svg aria-hidden viewBox="0 0 360 360" className="pointer-events-none absolute -bottom-36 -left-36 h-[360px] w-[360px] opacity-50">
      {[70, 110, 150, 178].map((r) => (
        <circle key={r} cx="180" cy="180" r={r} fill="none" stroke="#64748b" strokeWidth="1.25" opacity="0.4" />
      ))}
    </svg>
  );
}

function TracksDecor() {
  return (
    <svg aria-hidden viewBox="0 0 320 260" className="pointer-events-none absolute -top-9 -right-12 h-[260px] w-[320px] opacity-80">
      <defs>
        <linearGradient id="purpose-tracks-fade" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#60a5fa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[48, 88, 128, 168, 208].map((y, i) => (
        <path
          key={y}
          d={`M 40 ${y} C 120 ${y - 18}, 200 ${y + 22}, 300 ${y - 6}`}
          fill="none"
          stroke="url(#purpose-tracks-fade)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={0.9 - i * 0.15}
        />
      ))}
    </svg>
  );
}

const PURPOSE_METRICS = [
  { to: 50, label: 'Consultants', Icon: Users },
  { to: 30, label: 'Countries', Icon: Globe },
  { to: 20, label: 'Fields of Study', Icon: GraduationCap },
];

function MetricStat({ to, label, Icon, delay = 0 }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(reduceMotion ? to : 0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      setValue(to);
      return undefined;
    }

    const controls = animate(0, to, {
      duration: 2.2,
      delay,
      ease: 'easeOut',
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [delay, inView, reduceMotion, to]);

  return (
    <div ref={ref} className="flex min-w-[7.5rem] flex-col items-center" aria-label={`${to}+ ${label}`}>
      <span className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50">
        <Icon className="h-5 w-5 text-blue-600" strokeWidth={1.75} aria-hidden />
      </span>
      <p className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl" aria-hidden>
        {value}+
      </p>
      <p className="mt-1 text-sm text-slate-500">{label}</p>
    </div>
  );
}

function VisionMissionCard({ variant, title, quote }) {
  const isVision = variant === 'vision';
  const [leadA, leadB, ...quoteRest] = quote.split(' ');
  const lead = `${leadA} ${leadB}`;
  const body = quoteRest.join(' ');

  return (
    <div
      className={`relative flex min-h-[300px] overflow-hidden rounded-3xl p-10 ${
        isVision
          ? 'bg-slate-200'
          : 'bg-[linear-gradient(165deg,#1e293b_0%,#0f172a_48%,#060b18_100%)]'
      }`}
    >
      {isVision ? <RingsDecor /> : <TracksDecor />}
      <div className="relative z-10 m-auto flex max-w-md flex-col items-center text-center">
        <h3 className={`text-3xl font-normal leading-tight tracking-tight md:text-4xl ${isVision ? 'text-slate-900' : 'text-slate-100'}`}>
          {title}
        </h3>
        <p className={`mt-5 text-sm leading-relaxed md:text-[15px] ${isVision ? 'text-slate-600' : 'text-slate-300'}`}>
          <span className={`text-xl font-semibold md:text-2xl ${isVision ? 'text-slate-900' : 'text-slate-100'}`}>
            {lead}{' '}
          </span>
          {body}
        </p>
      </div>
    </div>
  );
}

const PROFILE_STAR_DOTS = [
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

/** Founding leadership — photos from Supabase Storage */
const FOUNDERS = [
  {
    initials: 'NLK',
    name: 'Nyan Lin Kyaw',
    role: 'Founder & Head of Consulting',
    degree: 'Honours Bachelor of Commerce, Business Technology Management',
    university: 'University of Ottawa',
    note: "Driving the organization's strategy, marketing initiatives, and long-term vision.",
    gradient: 'from-blue-500 to-indigo-600',
    photo: 'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/public/consultant-photos/1.jpg',
    location: 'Canada',
  },
  {
    initials: 'NSN',
    name: 'Nang Sayoon Noi',
    role: 'Co-Founder & Chief Operating Officer',
    degree: 'PhD in Molecular Biosciences',
    university: 'Rutgers University',
    note: 'Overseeing the organizational structure, internal communications, and seamless day-to-day operations.',
    gradient: 'from-emerald-500 to-teal-600',
    photo: 'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/public/consultant-photos/2.jpg',
    location: 'United States',
  },
  {
    initials: 'KT',
    name: 'Khun Thu Rein',
    role: 'Chief Technology Officer',
    degree: 'Bachelor of Computer Science',
    university: 'Carleton University',
    note: 'Managing technical infrastructure, platform development, and digital systems for BladeX.',
    gradient: 'from-slate-600 to-slate-800',
    photo:
      'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/sign/Team/ktr.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84ZWY5ZjAzNS00OWY3LTQ4MDUtYmRmZi02N2IxYzU3NWY5ZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUZWFtL2t0ci5qcGciLCJpYXQiOjE3NzUxNjg5MzIsImV4cCI6MjA5MDUyODkzMn0.d3OZOvYByl1VJDYs5aayrs6_3gD6Eu370-egVFqTo3A',
    location: 'Canada',
  },
];

/** Advisory board — photos + studies from Supabase consultants table */
const ADVISORY_BOARD_MEMBERS = [
  {
    initials: 'CS',
    name: 'Cherry Soe',
    role: 'Advisory Board Member',
    degree: 'Doctor of Medicine',
    university: 'UCSF',
    note: 'Bringing firsthand experience and a student-centered perspective to help BladeX better understand the experiences, challenges, and aspirations of students pursuing education abroad.',
    gradient: 'from-rose-500 to-pink-600',
    photo: 'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/public/consultant-photos/4.jpg',
    location: 'United States',
  },
  {
    initials: 'TYM',
    name: 'Thuta Ye Moe',
    role: 'Advisory Board Member',
    degree: 'Doctor of Philosophy - Engineering & IT',
    university: 'University of Melbourne',
    note: 'Bringing experience in organizational development and team collaboration to help strengthen BladeX’s internal structure, culture, and foundation for growth.',
    gradient: 'from-violet-500 to-indigo-600',
    photo: 'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/public/consultant-photos/5.jpg',
    location: 'Australia',
  },
  {
    initials: 'WSM',
    name: 'Win Soe Moe @ Dennis',
    role: 'Advisory Board Member',
    degree: 'Doctor of Medicine',
    university: 'IUHW School of Medicine',
    note: (
      <>
        Founder of{' '}
        <a
          href="https://www.facebook.com/p/Youth-Know-versity-100078966399846/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-[#465161]"
        >
          Youth Know-versity
        </a>
        . Expanding BladeX’s perspective beyond the organization through external relationships, strategic opportunities, and connections that can help broaden our reach and impact.
      </>
    ),
    gradient: 'from-cyan-500 to-blue-600',
    photo: 'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/public/consultant-photos/6.jpg',
    location: 'Japan',
  },
];

const TEAM_MEMBERS = [
  {
    name: 'Myat Min Htet',
    department: 'Operations',
    role: 'Operations Lead & Data Analyst',
    university: 'High School Graduate',
    degree: 'GED & SAT',
    photo:
      'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/sign/Team/myat-min-htet.jpg?token=eyJraWQiOiI4ZWY5ZjAzNS00OWY3LTQ4MDUtYmRmZi02N2IxYzU3NWY5ZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUZWFtL215YXQtbWluLWh0ZXQuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc5MjI1NjI2MSwiZXhwIjoyMTA3NjE2MjYxfQ.xEw2cFi3hkstyh9XSO-HMiSMiyAON2MmTewyS94LnEI',
    photoPosition: 'object-[center_30%]',
  },
  {
    name: 'Thin Thiri San',
    department: 'Operations',
    role: 'Operations Lead & Market Research Analyst',
    university: 'Yangon University of Economics',
    degree: 'B.A. Business Administration',
    photo:
      'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/sign/Team/thin-thiri-san.jpg?token=eyJraWQiOiI4ZWY5ZjAzNS00OWY3LTQ4MDUtYmRmZi02N2IxYzU3NWY5ZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUZWFtL3RoaW4tdGhpcmktc2FuLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODg4MTI0NTQsImV4cCI6MjEwNDE3MjQ1NH0.zaNSYcksCY9a_d51cLJbFoMphAh_lkWuT9TKydQqK2w',
  },
  {
    name: 'Myint Zu Linn',
    department: 'Research',
    role: 'Research & Operation Associate',
    university: 'Yangon University of Economics',
    degree: 'B.A. Economics',
    photo:
      'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/sign/Team/myint-zu-linn.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84ZWY5ZjAzNS00OWY3LTQ4MDUtYmRmZi02N2IxYzU3NWY5ZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUZWFtL215aW50LXp1LWxpbm4ucG5nIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NjIzOTIxOCwiZXhwIjoyMTAxNTk5MjE4fQ.lXrNoPWH9fOnR0NO7mImrhYjd3r3P-ZKZLf6nJnJedU',
  },
  {
    name: 'Poe Pearl Thwe',
    department: 'Strategy',
    role: 'Strategy & Operations Associate',
    university: 'UC Berkeley',
    degree: 'Undergraduate, Economics',
    photo:
      'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/sign/Team/poe-pearl-thwe.jpg?token=eyJraWQiOiI4ZWY5ZjAzNS00OWY3LTQ4MDUtYmRmZi02N2IxYzU3NWY5ZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUZWFtL3BvZS1wZWFybC10aHdlLmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3OTIyNTYyNjIsImV4cCI6MjEwNzYxNjI2Mn0.Wad3i2CeAU8dmvbew2jaU0eAilM3Q3yQg6QipSUyYms',
    photoPosition: 'object-[center_20%]',
  },
  {
    name: 'Thuriya Kyaw',
    department: 'Research',
    role: 'Operations & Research Associate',
    university: 'University of Bristol',
    degree: 'BEng(Hons) Mechanical Engineering',
    photo:
      'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/sign/Team/thuriya-kyaw.jpg?token=eyJraWQiOiI4ZWY5ZjAzNS00OWY3LTQ4MDUtYmRmZi02N2IxYzU3NWY5ZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUZWFtL3RodXJpeWEta3lhdy5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzkyMjU2MjY0LCJleHAiOjIxMDc2MTYyNjR9.ZjynJ83OVn0xl5Tt-EwuJPQva452mhEwMv7u9qAw7sg',
    photoPosition: 'object-[center_42%]',
  },
  {
    name: 'Nang Wah Wah Soe',
    department: 'Operations',
    role: 'Operations & Data Associate',
    university: 'YAIS',
    degree: 'Senior, graduating June 2027',
    photo:
      'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/sign/Team/nang-nang.jpg?token=eyJraWQiOiI4ZWY5ZjAzNS00OWY3LTQ4MDUtYmRmZi02N2IxYzU3NWY5ZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUZWFtL25hbmctbmFuZy5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzkyMjU2MjY2LCJleHAiOjIxMDc2MTYyNjZ9.HmCj4LCt6jhwIIdGm_H-swcA-MkVWI88e1i8_JSmj8U',
    photoPosition: 'object-[center_18%]',
  },
  {
    name: 'Myat Thadda Thaw',
    department: 'Operations',
    role: 'Operations & Analytics Associate',
    university: 'Sunway College',
    degree: 'Completed A-Levels',
    photo:
      'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/sign/Team/felix.jpg?token=eyJraWQiOiI4ZWY5ZjAzNS00OWY3LTQ4MDUtYmRmZi02N2IxYzU3NWY5ZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUZWFtL2ZlbGl4LmpwZyIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3OTIyNTYyNjcsImV4cCI6MjEwNzYxNjI2N30.9BMAUQWohqSr-CceuFpBFyCVfQ6zBGpfoh_W_0GUjpk',
    photoPosition: 'object-[center_22%]',
  },
  {
    name: 'Chan Myae Nay Chi',
    department: 'Operations',
    role: 'Operations & Research Associate',
    university: 'YUFL',
    degree: 'Diploma in English Communication Skills',
    photo:
      'https://ogtzrtrxcbapbfpamoxr.supabase.co/storage/v1/object/sign/Team/nay-chi.jpg?token=eyJraWQiOiI4ZWY5ZjAzNS00OWY3LTQ4MDUtYmRmZi02N2IxYzU3NWY5ZmEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJUZWFtL25heS1jaGkuanBnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc5MjI1NjM4NiwiZXhwIjoyMTA3NjE2Mzg2fQ.jkdKG-PSEErODE9M8roSttpzbP7x4RiXKwbUM4Ulyfc',
    photoPosition: 'object-[center_30%]',
  },
];

function studyEntries(member) {
  if (member.studies?.length) return member.studies;
  if (!member.university && !member.degree) return [];
  return [{ school: member.university, detail: member.degree }];
}

function TeamMemberCard({ member, delay = 0 }) {
  const studies = studyEntries(member);
  const department = member.department || 'Department';
  const role = member.role || 'Role';

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.28, ease: 'easeOut', delay }}
      className="relative flex w-full flex-col items-center rounded-3xl border border-black/[0.06] bg-[#fdfcfa] px-5 pb-6 pt-9 text-center shadow-[0_10px_28px_-20px_rgba(15,23,42,0.45)] sm:w-[calc(50%-0.625rem)] sm:max-w-[16rem] md:w-[calc(33.333%-0.85rem)]"
    >
      <span
        className={`absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] ${
          member.department ? 'bg-[#1e3a8a] text-white' : 'bg-slate-200 text-slate-500'
        }`}
      >
        {department}
      </span>
      {member.photo ? (
        <img
          src={member.photo}
          alt=""
          className={`h-16 w-16 rounded-full object-cover ring-1 ring-slate-200 ${member.photoPosition || 'object-center'}`}
        />
      ) : (
        <div
          aria-hidden
          className="flex h-16 w-16 items-center justify-center rounded-full bg-[#1d4ed8] text-xl font-bold text-white"
        >
          {member.name.charAt(0)}
        </div>
      )}
      <h3 className="mt-4 text-[15px] font-bold leading-tight text-slate-900">{member.name}</h3>
      <p
        className={`mt-1 max-w-[16rem] text-sm font-medium leading-snug ${
          member.role ? 'text-blue-600' : 'text-slate-400'
        }`}
      >
        {role}
      </p>
      {studies.length ? (
        <>
          <div className="my-4 h-px w-full bg-slate-200" aria-hidden />
          <GraduationCap className="h-4 w-4 text-slate-400" aria-hidden />
          <div className="mt-2 space-y-2.5">
            {studies.map((entry) => (
              <div key={`${entry.school || ''}-${entry.detail || ''}`}>
                {entry.school ? (
                  <p className="text-sm font-semibold leading-snug text-slate-800">{entry.school}</p>
                ) : null}
                {entry.detail ? <p className="mt-0.5 text-sm leading-snug text-slate-500">{entry.detail}</p> : null}
              </div>
            ))}
          </div>
        </>
      ) : null}
    </motion.article>
  );
}

function ProfileTiltCard({ p, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2, ease: 'easeOut' } }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      className="bg-slate-900 border border-slate-700/50 rounded-3xl overflow-hidden shadow-md flex flex-col cursor-default"
    >
      <div className="relative px-6 pt-8 pb-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full blur-2xl opacity-50" style={{ background: '#3b82f6' }} />
        <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full blur-2xl opacity-40" style={{ background: '#6366f1' }} />
        <div className="absolute top-4 right-8 w-20 h-20 rounded-full blur-xl opacity-30" style={{ background: '#0ea5e9' }} />
        <div className="absolute inset-0 bg-slate-900/70" />
        {PROFILE_STAR_DOTS.map((dot, di) => (
          <motion.div
            key={di}
            className="absolute rounded-full bg-blue-500/50 pointer-events-none"
            style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay: dot.delay, ease: 'easeInOut' }}
          />
        ))}
        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-slate-800 flex items-center justify-center mb-4 ring-2 ring-slate-700/60 shadow-lg">
          {p.photo ? (
            <img src={p.photo} alt={p.name} className="w-full h-full object-cover object-[center_10%]" />
          ) : (
            <span className={`text-lg font-bold bg-gradient-to-br ${p.gradient} bg-clip-text text-transparent`}>
              {p.initials}
            </span>
          )}
        </div>
        <h3 className="relative text-base font-bold text-white leading-tight">{p.name}</h3>
        <p className="relative text-blue-400 text-xs font-semibold mt-1">{p.role}</p>
        <p className="relative text-[#f7f6f3]/80 text-xs mt-1.5">📍 {p.location}</p>
      </div>

      <div className="px-6 py-5 bg-[#fdfcfa] flex-1 flex flex-col gap-3 text-left">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-blue-500">{p.university}</p>
        <p className="text-slate-700 text-sm font-medium leading-snug">{p.degree}</p>
        <div className="h-px w-full bg-slate-200/90" aria-hidden />
        <p className="text-slate-500 text-xs leading-relaxed">{p.note}</p>
      </div>
    </motion.div>
  );
}

export default function About() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative flex min-h-[100dvh] items-center bg-[#060b18] overflow-hidden pt-28 pb-16 sm:pt-32">
        <div className="absolute inset-0 z-0">
          <StarfieldBackground starDensity={1.2} />
          <div className="absolute top-10 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-indigo-600/20 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
            <span className={`${sectionBadgeClass} mb-5`}>About BladeX Education</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6 leading-tight">
              We Walk With You,<br />
              <span className="text-blue-400" aria-label={HERO_ACCENT}>
                {HERO_ACCENT.split('').map((character, index) => (
                  <motion.span
                    key={`${character}-${index}`}
                    aria-hidden="true"
                    className="inline-block"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: reduceMotion ? 0 : 0.01,
                      delay: reduceMotion ? 0 : 0.25 + index * 0.08,
                    }}
                  >
                    {character === ' ' ? '\u00A0' : character}
                  </motion.span>
                ))}
              </span>
            </h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              BladeX Education is a dedicated advisory platform empowering Myanmar students who aspire to study abroad. We go beyond standard consulting to act as your strategic partners in international education.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14"
          >
            {stats.map((s, i) => (
              <StatCard key={i} stat={s} index={i} />
            ))}
          </motion.div>
        </div>

      </section>

      {/* Mission & Vision */}
      <section className="relative bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Our Purpose</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Vision & Mission</h2>
          </motion.div>

          <div className="grid items-stretch gap-6 lg:grid-cols-2">
            <VisionMissionCard
              variant="vision"
              title="Our Vision"
              quote="To create a world where every Myanmar student with the ambition to study abroad can access the guidance, knowledge, and opportunities they need to pursue their aspirations. A world where background and circumstance do not decide who gets to look beyond borders."
            />
            <VisionMissionCard
              variant="mission"
              title="Our Mission"
              quote="To support students at every stage of their journey, especially those who feel lost or unsure where to begin, by connecting them with accessible guidance, firsthand experiences, and a global community that helps them make informed decisions about their future."
            />
          </div>

          <div className="mt-16 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">Our Reach</p>
            <div className="mt-6 flex flex-wrap items-start justify-center gap-12 sm:gap-20">
              {PURPOSE_METRICS.map((metric, index) => (
                <MetricStat key={metric.label} {...metric} delay={index * 0.12} />
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* Our Leadership Team */}
      <section className="relative bg-white py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-center mb-14"
          >
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">The People Behind BladeX</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Our Leadership Team</h2>          </motion.div>

          {/* Leadership cards */}
          <motion.div className="grid md:grid-cols-3 gap-6 mb-14">
            {FOUNDERS.map((p, i) => (
              <ProfileTiltCard key={p.name} p={p} delay={i * 0.03} />
            ))}
          </motion.div>

          {/* Associate consultants — same card design as founders */}
          <div className="text-center mb-8">
            <span className="text-sm font-extrabold uppercase tracking-widest text-slate-500">
              Advisory Board Members
            </span>
          </div>
          <motion.div className="grid md:grid-cols-3 gap-6">
            {ADVISORY_BOARD_MEMBERS.map((p, i) => (
              <ProfileTiltCard key={p.name} p={p} delay={i * 0.03} />
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-white pb-24 pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
            Meet Our Team Members
          </h2>
          <div className="mx-auto flex flex-wrap justify-center gap-x-5 gap-y-7 pt-3">
            {TEAM_MEMBERS.map((member, i) => (
              <TeamMemberCard key={member.name} member={member} delay={i * 0.03} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-white py-24">
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.35, ease: 'easeOut' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Let's Take the First Step Together</h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">Schedule a one-on-one session with our consultants and get the guidance you need for your study abroad journey.</p>
            <Link to={createPageUrl('Consultants')} className="inline-block transition-transform duration-200 hover:scale-105">
              <button
                className={`group inline-flex items-center justify-center gap-2 rounded-full font-bold text-white bg-shine-gradient ${solidButton.lg}`}
              >
                <span>See Consultants</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-[transform,margin] duration-500 ease-out group-hover:translate-x-2 group-hover:scale-110" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}