import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, CheckCircle2, Globe, BookOpen, FileText, Map } from 'lucide-react';

const consulting = {
  icon: MessageCircle,
  title: 'One-on-One Consulting',
  tagline: 'Clarity, direction, and a plan that fits you.',
  description: "A private, personalized session where we listen to your situation, explore your interests, and help you make confident, informed decisions about studying abroad.",
  areas: [
    { icon: CheckCircle2, label: 'Major Exploration', detail: 'Business, Computer Science, Medicine, Engineering, and more' },
    { icon: CheckCircle2, label: 'Country Selection', detail: 'US, Canada, UK, Thailand, Singapore, and others' },
    { icon: CheckCircle2, label: 'University Direction', detail: 'Finding the right fit for your goals and budget' },
    { icon: CheckCircle2, label: 'Application Planning', detail: 'Timeline and step-by-step preparation' },
    { icon: CheckCircle2, label: 'Document Review', detail: 'SOP, CV, and essential application materials' },
  ],
  note: 'Sessions are booked directly with your chosen consultant — at a time that works for both of you.',
  free: true,
};

const mentorship = {
  icon: Users,
  title: 'Mentorship Program',
  tagline: 'Continuous partnership, through your academic journey.',
  description: "A continuous partnership where we guide you through every step of your academic journey. Rather than a single consultation, we work closely with you over multiple sessions to navigate the entire application process.",
  areas: [
    { icon: CheckCircle2, label: 'Ongoing Check-ins', detail: 'Regular meetings to answer your questions and plan your next steps' },
    { icon: CheckCircle2, label: 'Application Assistance', detail: 'Step-by-step help with preparing and submitting your university applications' },
    { icon: CheckCircle2, label: 'Offer Support', detail: 'Guidance on reviewing, choosing, and accepting your university admission offers' },
    { icon: CheckCircle2, label: 'Goal Setting & Progress Tracking', detail: 'Keeping your application deadlines organized and moving forward' },
    { icon: CheckCircle2, label: 'Community Connection', detail: 'Access to a network of peers and mentors who have successfully navigated the process' },
  ],
  note: 'We work closely with you over multiple sessions to navigate the entire application process, keeping you on track until you successfully secure your university offer.',
  free: true,
};

const guidance = {
  icon: Map,
  title: 'Career Guidance Program',
  tagline: 'Consultation for your future career path.',
  description: "Whether you feel overwhelmed by having too many interests or are completely unsure of which direction to take, our mentors and consultants are here to listen. Using their professional experience and knowledge, they will provide tailored advice to help you find your best fit. 🔍",
  areas: [
    { icon: CheckCircle2, label: 'Career Path Exploration', detail: 'Discover multiple career options aligned with your interests' },
    { icon: CheckCircle2, label: 'Professional Trajectory Planning', detail: 'Map out a strategic plan for your professional future' },
    { icon: CheckCircle2, label: 'Tailored Advice', detail: 'Personalized recommendations based on your unique situation' },
    { icon: CheckCircle2, label: 'Industry Insights', detail: 'Learn from professionals with real-world experience' },
    { icon: CheckCircle2, label: 'Direction Finding', detail: 'Clarity when you are overwhelmed or unsure of which path to take' },
  ],
  note: 'While similar in format to our One-on-One Consulting, this program focuses specifically on your career and professional trajectory rather than just academics.',
  free: true,
};

function ProgramCard({ program, reverse }) {
  const Icon = program.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? 'lg:grid-flow-dense' : ''}`}
    >
      {/* Image / Visual side */}
      <div className={`${reverse ? 'lg:col-start-2' : ''}`}>
        <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-10 text-white overflow-hidden min-h-[360px] flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl" />
          <div>
            <div className="w-14 h-14 bg-blue-600/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-5">
              <Icon className="w-7 h-7 text-blue-400" />
            </div>
            <p className="text-sm text-blue-400 font-semibold uppercase tracking-widest mb-2">BladeX Service</p>
            <h3 className="text-2xl font-bold text-white mb-3">{program.title}</h3>
            <p className="text-slate-400 text-sm italic">"{program.tagline}"</p>
          </div>
          <div className="mt-8 bg-white/5 rounded-xl px-4 py-3 text-xs text-slate-400 border border-white/10">
            📌 {program.note}
          </div>
        </div>
      </div>

      {/* Content side */}
      <div className={`${reverse ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
        <p className="text-slate-600 leading-relaxed mb-7">{program.description}</p>
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">What's Included</h4>
        <ul className="space-y-4">
          {program.areas.map((area, i) => {
            const AreaIcon = area.icon;
            return (
              <li key={i} className="flex gap-4 items-start">
                <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <AreaIcon className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-sm">{area.label}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{area.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </motion.div>
  );
}

export default function Programs() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-blue-400 font-semibold text-xs uppercase tracking-widest">Our Services</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">Programs & Services</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Personalized consulting and mentorship for Myanmar students pursuing education abroad.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-32">
          <ProgramCard program={consulting} reverse={false} />
          <ProgramCard program={mentorship} reverse={true} />
          <ProgramCard program={guidance} reverse={false} />
        </div>
      </section>

      {/* Global Destinations & Fields of Study */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Where We Can Take You</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3">Global Destinations & Fields of Study</h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Destinations */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Global Destinations</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                We guide students toward top-tier educational hubs worldwide. Whether you are looking to study in the US, Canada, or the UK, or exploring diverse academic opportunities across Europe and Asia, we help you find the destination that fits your goals.
              </p>
              <div className="flex flex-wrap gap-2">
                {['United States', 'Canada', 'United Kingdom', 'France', 'Hungary', 'Italy', 'Japan', 'South Korea', 'Australia', 'and more...'].map((d) => (
                  <span key={d} className="text-xs bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full font-medium">{d}</span>
                ))}
              </div>
            </motion.div>

            {/* Academic Majors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm"
            >
              <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                <BookOpen className="w-7 h-7 text-indigo-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Fields of Study</h3>
              <p className="text-slate-600 leading-relaxed mb-6">
                We strategically align your career ambitions with the right university programs. Our expertise covers a wide spectrum of competitive disciplines, including Business, Computer Science, Software Engineering, Data Science, Medicine, Biochemistry, and many more.
              </p>
              <div className="flex flex-wrap gap-2">
                {['Business', 'Computer Science', 'Software Engineering', 'Data Science', 'Medicine', 'Biochemistry'].map((m) => (
                  <span key={m} className="text-xs bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-full font-medium">{m}</span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}