import React from 'react';
import { solidButton } from '@/utils/glassStyles';
import { ArrowRight, CalendarCheck, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const steps = [
  'Start with a conversation',
  'Find your direction',
  'Take the next step toward your future',
];

export default function BookingCTA() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <style>{`
        .cta-timeline .cta-line-fill {
          transform: scaleX(0);
          transform-origin: left center;
          animation: cta-line 5.2s ease-in-out infinite;
        }
        .cta-timeline .cta-dot {
          animation-duration: 5.2s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .cta-timeline .cta-dot-1 { animation-name: cta-dot-1; }
        .cta-timeline .cta-dot-2 { animation-name: cta-dot-2; }
        .cta-timeline .cta-dot-3 { animation-name: cta-dot-3; }
        .cta-timeline .cta-label {
          animation-duration: 5.2s;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .cta-timeline .cta-label-1 { animation-name: cta-label-1; }
        .cta-timeline .cta-label-2 { animation-name: cta-label-2; }
        .cta-timeline .cta-label-3 { animation-name: cta-label-3; }
        .cta-timeline:hover .cta-line-fill,
        .cta-timeline:hover .cta-dot,
        .cta-timeline:hover .cta-label {
          animation-play-state: paused;
        }
        @keyframes cta-line {
          0%, 8% { transform: scaleX(0); }
          30% { transform: scaleX(0.5); }
          54%, 76% { transform: scaleX(1); }
          88%, 100% { transform: scaleX(0); }
        }
        @keyframes cta-dot-1 {
          0%, 76% { background-color: #3b82f6; border-color: #3b82f6; color: #fff; transform: scale(1.06); }
          88%, 100% { background-color: #fff; border-color: #3b82f6; color: #3b82f6; transform: scale(1); }
        }
        @keyframes cta-dot-2 {
          0%, 24% { background-color: #fff; border-color: #3b82f6; color: #3b82f6; transform: scale(1); }
          30%, 76% { background-color: #3b82f6; border-color: #3b82f6; color: #fff; transform: scale(1.06); }
          88%, 100% { background-color: #fff; border-color: #3b82f6; color: #3b82f6; transform: scale(1); }
        }
        @keyframes cta-dot-3 {
          0%, 48% { background-color: #fff; border-color: #3b82f6; color: #3b82f6; transform: scale(1); }
          54%, 76% { background-color: #3b82f6; border-color: #3b82f6; color: #fff; transform: scale(1.06); }
          88%, 100% { background-color: #fff; border-color: #3b82f6; color: #3b82f6; transform: scale(1); }
        }
        @keyframes cta-label-1 {
          0%, 76% { color: #0f172a; }
          88%, 100% { color: #94a3b8; }
        }
        @keyframes cta-label-2 {
          0%, 24% { color: #94a3b8; }
          30%, 76% { color: #0f172a; }
          88%, 100% { color: #94a3b8; }
        }
        @keyframes cta-label-3 {
          0%, 48% { color: #94a3b8; }
          54%, 76% { color: #0f172a; }
          88%, 100% { color: #94a3b8; }
        }
        @media (prefers-reduced-motion: reduce) {
          .cta-timeline .cta-line-fill,
          .cta-timeline .cta-dot,
          .cta-timeline .cta-label { animation: none; }
          .cta-timeline .cta-line-fill { transform: scaleX(1); }
          .cta-timeline .cta-dot {
            background-color: #fff;
            border-color: #3b82f6;
            color: #3b82f6;
            transform: none;
          }
          .cta-timeline .cta-label { color: #0f172a; }
        }
      `}</style>
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="mx-auto mb-8 flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-2xl bg-blue-50">
            <CalendarCheck className="h-8 w-8 text-blue-800" strokeWidth={1.75} aria-hidden />
          </div>
          <h2 className="mb-5 text-3xl font-bold text-slate-900 md:text-4xl">
            Ready to Take the First Step?
          </h2>
          <p className="mb-12 text-lg leading-relaxed text-slate-500">
            You don't need to have it all figured out. Whether you're just starting to think about studying abroad, feeling lost about what to study, or already have a plan and need someone to guide you, our consultants are here to listen, share their experience, and help you figure out what comes next.
          </p>

          <ol className="cta-timeline relative mx-auto mb-12 grid max-w-xl grid-cols-3 sm:max-w-2xl">
            <div
              aria-hidden
              className="absolute left-[16.5%] right-[16.5%] top-[1.125rem] h-0.5 overflow-hidden bg-blue-200"
            >
              <div className="cta-line-fill h-full w-full bg-blue-500" />
            </div>
            {steps.map((label, index) => (
              <li key={label} className="relative flex flex-col items-center px-1.5 sm:px-3">
                <span className={`cta-dot cta-dot-${index + 1} relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-[2.5px] border-blue-500 bg-white text-blue-500`}>
                  <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
                </span>
                <p className={`cta-label cta-label-${index + 1} mt-4 text-[13px] font-semibold leading-snug text-slate-900 sm:text-sm`}>
                  {label}
                </p>
              </li>
            ))}
          </ol>

          <Link to={createPageUrl('Consultants')} className="inline-block transition-transform duration-200 hover:scale-105">
            <button
              className={`group inline-flex items-center justify-center gap-2 rounded-full font-bold text-white bg-shine-gradient ${solidButton.lg}`}
            >
              <span>Meet Our Consultants</span>
              <ArrowRight className="w-4 h-4 shrink-0 transition-[transform,margin] duration-500 ease-out group-hover:translate-x-2 group-hover:scale-110" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
