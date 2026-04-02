import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Youtube, Facebook, Bell, ThumbsUp, Send, Linkedin } from 'lucide-react';

const channels = [
  {
    platform: 'Facebook',
    handle: 'BladeX Education',
    description: 'Updates, tips, student stories, and program announcements.',
    url: 'https://www.facebook.com/profile.php?id=100064021474119',
    icon: Facebook,
    color: { bg: 'bg-blue-600', light: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-100' },
    cta: 'Facebook',
    badge: 'Facebook Page',
  },
  {
    platform: 'YouTube',
    handle: 'BladeX Education',
    description: 'Guidance videos, country breakdowns, Q&As, and student journeys.',
    url: 'http://www.youtube.com/@Bladex-edu',
    icon: Youtube,
    color: { bg: 'bg-red-600', light: 'bg-red-50', text: 'text-red-600', border: 'border-red-100' },
    cta: 'YouTube',
    badge: 'YouTube Channel',
    comingSoon: false,
  },
  {
    platform: 'Telegram',
    handle: '@bladexedu',
    description: 'Instant updates, deadline reminders, and study abroad announcements.',
    url: 'https://t.me/bladexedu',
    icon: Send,
    color: { bg: 'bg-cyan-500', light: 'bg-cyan-50', text: 'text-cyan-600', border: 'border-cyan-100' },
    cta: 'Telegram',
    badge: 'Telegram Channel',
    comingSoon: false,
  },
  {
    platform: 'LinkedIn',
    handle: 'BladeX Education',
    description: 'Industry insights, company milestones, and global career advice.',
    url: 'https://www.linkedin.com/company/bladex-education/',
    icon: Linkedin,
    color: { bg: 'bg-[#0A66C2]', light: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' },
    cta: 'LinkedIn',
    badge: 'Company Page',
    comingSoon: false,
  },
];

export default function Social() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-32 pb-28 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.35) 1.5px, transparent 1.5px)', backgroundSize: '36px 36px', animation: 'grid-pan 8s linear infinite' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-blue-400 font-semibold text-xs uppercase tracking-widest">Stay Connected</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">Follow Us Online</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Stay up to date with BladeX Education — tips, student stories, Q&As, and program announcements across our social channels.
            </p>
          </motion.div>
        </div>

        {/* Wave → white */}
        <div className="absolute bottom-0 left-0 w-full pointer-events-none">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20 block">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Channels + Feed */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* Left — compact social cards */}
            <div className="flex flex-col gap-4 flex-1 w-full">
              <div className="mb-2">
                <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Our Channels</span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">Find Us Online</h2>
              </div>
              {channels.map((ch, i) => {
                const Icon = ch.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, ease: 'easeOut', delay: i * 0.07 }}
                    className="bg-[#f7f6f3] border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 flex items-center gap-4 px-5 py-4"
                  >
                    <div className={`${ch.color.bg} w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-900 text-sm leading-tight">{ch.platform}</p>
                      <p className="text-slate-400 text-xs mt-0.5 mb-1">{ch.handle}</p>
                      <p className="text-slate-600 text-[11px] leading-relaxed">{ch.description}</p>
                    </div>
                    {ch.comingSoon ? (
                      <div className={`${ch.color.light} ${ch.color.text} rounded-lg px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 flex-shrink-0`}>
                        <Bell className="w-3 h-3" />
                        Soon
                      </div>
                    ) : (
                      <a
                        href={ch.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${ch.color.bg} hover:opacity-90 text-white font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-opacity text-xs flex-shrink-0`}
                      >
                        {ch.cta}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Right — Facebook feed */}
            <div className="w-full lg:w-[500px] flex-shrink-0">
              <div className="mb-2">
                <span className="text-blue-600 font-semibold text-xs uppercase tracking-widest">Facebook</span>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">Latest from BladeX</h2>
              </div>
              <div style={{ overflow: 'hidden', height: '640px' }}>
                <iframe
                  src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fprofile.php%3Fid%3D100064021474119&tabs=timeline&width=500&height=800&small_header=true&adapt_container_width=false&hide_cover=true&show_facepile=false&appId=920970834041656"
                  width="500"
                  height="800"
                  style={{ border: 'none', display: 'block', marginTop: '-70px' }}
                  scrolling="no"
                  frameBorder="0"
                  allowFullScreen
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* Why follow section */}
      <section className="py-16 bg-white">
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