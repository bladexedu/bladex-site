import React from 'react';
import { motion } from 'framer-motion';
import { sectionBadgeClass } from '@/utils/glassStyles';
import StarfieldBackground from '@/components/shared/StarfieldBackground';

const sections = [
  {
    title: 'Who we are',
    body: 'BladeX Education provides complimentary educational guidance for Myanmar students exploring study abroad. This page explains how we handle information when you use our website, book a consultation, or email us.',
  },
  {
    title: 'What we collect',
    body: 'We may receive your name, email address, and anything you choose to share when you book a meeting or write to us. Consultant photos and public profile details are stored so we can show the roster on this site. We do not ask for passport scans, bank statements, or visa documents through the website.',
  },
  {
    title: 'Why we use it',
    body: 'We use this information to arrange consultations, answer questions, and run the public consultant directory. We do not sell student information.',
  },
  {
    title: 'Who else may see it',
    body: 'Bookings go through Calendly. Email is handled through Gmail. Consultant photos and roster data are stored with Supabase. The Social page embeds Facebook’s page plugin, which may collect data under Facebook’s own policies. Those services process information under their terms.',
  },
  {
    title: 'What we do not do',
    body: 'BladeX is advisory only. We do not process visa applications or submit university documents on your behalf.',
  },
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <section className="relative overflow-hidden bg-[#060b18] pb-28 pt-32">
        <div className="absolute inset-0 z-0">
          <StarfieldBackground starDensity={1.2} />
        </div>
        <div className="relative z-10 mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className={sectionBadgeClass}>Legal</span>
            <h1 className="mt-3 mb-5 text-4xl font-bold text-white md:text-5xl">Privacy Policy</h1>
            <p className="mx-auto max-w-2xl text-xl text-slate-300">
              A short note on how BladeX Education handles information you share with us.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6 lg:px-8">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
              <p className="mt-3 text-base leading-7 text-slate-600">{section.body}</p>
            </div>
          ))}

          <div>
            <h2 className="text-xl font-bold text-slate-900">How to reach us</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Questions about this page or your information:{' '}
              <a href="mailto:bladexedu@gmail.com" className="font-medium text-blue-700 underline underline-offset-4 hover:text-blue-800">
                bladexedu@gmail.com
              </a>
              .
            </p>
          </div>

          <p className="text-sm text-slate-400">Last updated October 2026.</p>
        </div>
      </section>
    </div>
  );
}
