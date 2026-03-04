import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Youtube, Facebook, Bell, ThumbsUp, Send, Linkedin } from 'lucide-react';

const channels = [
  {
    platform: 'Facebook',
    handle: 'BladeX Education',
    description: 'Follow us on Facebook for updates, tips, student stories, and announcements about our programs and launch.',
    url: 'https://www.facebook.com/share/p/1GrFGYZw4a/',
    icon: Facebook,
    color: { bg: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    cta: 'Follow on Facebook',
    badge: 'Facebook Page',
  },
  {
    platform: 'YouTube',
    handle: 'BladeX Education',
    description: 'Subscribe to our YouTube channel for in-depth guidance videos, country breakdowns, Q&As, and student journeys.',
    url: 'http://www.youtube.com/@Bladex-edu',
    icon: Youtube,
    color: { bg: 'bg-red-600', light: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
    cta: 'Subscribe on YouTube',
    badge: 'YouTube Channel',
    comingSoon: false,
  },
  {
    platform: 'Telegram',
    handle: '@bladexedu',
    description: 'Join our Telegram channel for instant updates, important application deadline reminders, and direct announcements regarding our study abroad programs.',
    url: 'https://t.me/bladexedu',
    icon: Send,
    color: { bg: 'bg-cyan-500', light: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-100' },
    cta: 'Join on Telegram',
    badge: 'Telegram Channel',
    comingSoon: false,
  },
  {
    platform: 'LinkedIn',
    handle: 'BladeX Education',
    description: 'Connect with us on our professional network for industry insights, company milestones, and strategic advice on building your global career pathway.',
    url: 'https://www.linkedin.com/company/bladex-education/',
    icon: Linkedin,
    color: { bg: 'bg-[#0A66C2]', light: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
    cta: 'Follow on LinkedIn',
    badge: 'Company Page',
    comingSoon: false,
  },
];

export default function Social() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-blue-400 font-semibold text-xs uppercase tracking-widest">Stay Connected</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">Follow Us Online</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Stay up to date with BladeX Education — tips, student stories, Q&As, and program announcements across our social channels.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Channels */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {channels.map((ch, i) => {
              const Icon = ch.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`bg-white border ${ch.color.border} rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300`}
                >
                  {/* Header bar */}
                  <div className={`${ch.color.bg} px-8 py-10 text-white`}>
                    <div className="flex items-center justify-between mb-4">
                      <Icon className="w-12 h-12 opacity-90" />
                      <span className="text-xs font-bold uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
                        {ch.badge}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold">{ch.platform}</h2>
                    <p className="text-white/70 text-sm mt-1">{ch.handle}</p>
                  </div>

                  {/* Body */}
                  <div className="px-8 py-8">
                    <p className="text-slate-600 leading-relaxed mb-6 text-sm">{ch.description}</p>

                    {ch.comingSoon ? (
                      <div className={`${ch.color.light} ${ch.color.text} rounded-xl px-5 py-3 text-sm font-semibold flex items-center gap-2`}>
                        <Bell className="w-4 h-4" />
                        Channel launching soon — check back!
                      </div>
                    ) : (
                      <a
                        href={ch.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${ch.color.bg} hover:opacity-90 text-white font-semibold w-full flex items-center justify-center gap-2 py-3 rounded-xl transition-opacity text-sm`}
                      >
                        <ThumbsUp className="w-4 h-4" />
                        {ch.cta}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why follow section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Why Follow Us?</h2>
            <div className="grid sm:grid-cols-3 gap-6 mt-8">
              {[
                { emoji: '🎓', title: 'Study Abroad Tips', desc: 'Country guides, scholarship info, and application advice.' },
                { emoji: '🗣️', title: 'Student Stories', desc: 'Real journeys from Myanmar students studying abroad.' },
                { emoji: '📢', title: 'Program Updates', desc: 'Be first to know about events, workshops, and launches.' },
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <h3 className="font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}