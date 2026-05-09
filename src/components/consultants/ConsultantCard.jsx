import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, User } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const BIO_LIMIT = 120;

const LOCATION_MAP = {
  'nyan lin kyaw':            'Canada',
  'nang sayoon noi':          'United States',
  'wutt hmone thin kyi':      'United States · Singapore',
  'cherry soe':               'United States',
  'thuta ye moe':             'South Korea',
  'win soe moe @ dennis':     'Japan',
  'yati ko ko':               'Hungary',
  'shin lin let':             'United Kingdom · Malaysia',
  'ei myat phyu sin':         'Italy',
  'shin thant phyu':          'Canada',
  'may htet aung':            'France',
  'wai phyo hein':            'United States',
  'hnaine yyar':              'United Kingdom',
  'aung khant min @ jimmy':   'Poland · India',
  'min kaung khant @ thomas': 'Canada',
  'arkar min myat':           'Germany',
  'kyi pyar shoon lae':       'United Kingdom · Thailand',
  'ye linn phyoe':            'China',
  'thae myat aung':           'Germany',
  'nay chi ye moe':           'Italy',
  'yoon su lin':     'Singapore',
  'thiri lwin':               'Hong Kong',
  'su yamin tun':             'Canada',
  'min hein khant':           'Italy',
  'zin zin aye chan':         'Australia',
  'hein htet zaw':           'Italy',
};

export default function ConsultantCard({ consultant: c, index }) {
  const firstName = c.name.split(' ')[0];
  const initials = c.name.split(' ').map(n => n[0]).slice(0, 2).join('');
  const location = LOCATION_MAP[c.name.toLowerCase()];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      whileHover={{ y: -8, boxShadow: 'none' }}
      whileTap={{ scale: 0.98 }}
      style={{ willChange: 'transform' }}
      className="bg-slate-900 border border-slate-700/50 rounded-3xl overflow-hidden shadow-md flex flex-col cursor-pointer"
    >
      {/* Avatar banner — Glassmorphism */}
      <div className="relative px-6 pt-8 pb-6 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute -top-6 -left-6 w-32 h-32 rounded-full blur-2xl opacity-50" style={{ background: '#3b82f6' }} />
        <div className="absolute -bottom-4 -right-4 w-28 h-28 rounded-full blur-2xl opacity-40" style={{ background: '#6366f1' }} />
        <div className="absolute top-4 right-8 w-20 h-20 rounded-full blur-xl opacity-30" style={{ background: '#0ea5e9' }} />
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-md" />
        {[
          { top: '10%', left: '8%',  size: 3, delay: 0 },
          { top: '20%', left: '80%', size: 2, delay: 0.5 },
          { top: '55%', left: '15%', size: 2, delay: 1.0 },
          { top: '70%', left: '70%', size: 3, delay: 1.5 },
          { top: '30%', left: '55%', size: 2, delay: 0.8 },
          { top: '80%', left: '35%', size: 2, delay: 0.3 },
          { top: '15%', left: '42%', size: 2, delay: 1.2 },
          { top: '65%', left: '88%', size: 3, delay: 0.6 },
          { top: '85%', left: '12%', size: 2, delay: 1.8 },
          { top: '40%', left: '92%', size: 2, delay: 0.9 },
        ].map((dot, i) => (
          <motion.div key={i}
            className="absolute rounded-full bg-blue-500/50 pointer-events-none"
            style={{ top: dot.top, left: dot.left, width: dot.size, height: dot.size }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.4, 0.8] }}
            transition={{ duration: 3, repeat: Infinity, delay: dot.delay, ease: 'easeInOut' }}
          />
        ))}

        <div className="relative w-20 h-20 rounded-2xl overflow-hidden bg-white/60 backdrop-blur-sm flex items-center justify-center mb-4 ring-2 ring-slate-800/40 shadow-lg">
          {c.photo_url ? (
            <img src={c.photo_url} alt={c.name} className="w-full h-full object-cover object-[center_10%]" />
          ) : (
            <User className="w-10 h-10 text-blue-500" />
          )}
        </div>
        <h3 className="relative text-base font-bold text-white leading-tight">{c.name}</h3>
        <p className="relative text-blue-400 text-sm font-semibold mt-1">{c.role}</p>
        {location && (
          <p className="relative text-[#f7f6f3]/80 text-xs mt-1.5">📍 {location}</p>
        )}
      </div>

      {/* Bio preview */}
      <div className="px-6 py-4 flex-1 bg-[#f7f6f3]">
        {c.bio && (
          <p className="text-slate-500 text-sm leading-relaxed">
            {c.bio.length <= BIO_LIMIT ? c.bio : `${c.bio.slice(0, BIO_LIMIT).trimEnd()}...`}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 pb-6 pt-4 flex gap-3 bg-[#f7f6f3]">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex-1 text-sm font-semibold text-slate-700 border-2 border-slate-400/70 hover:bg-slate-200/60 hover:border-slate-500/60 py-2.5 rounded-xl transition-all duration-200">
              View Profile
            </button>
          </DialogTrigger>

          <DialogContent
            className="max-w-[620px] w-full p-0 gap-0 rounded-[24px] border border-white/[0.06] bg-[#12141c] overflow-hidden flex flex-col max-h-[90vh]"
            style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.03), 0 24px 80px rgba(0,0,0,0.5), 0 0 120px rgba(99,115,255,0.04)' }}
          >
            {/* Header */}
            <div
              className="relative px-9 pt-9 pb-7 border-b border-white/[0.06] flex-shrink-0"
              style={{ background: 'linear-gradient(165deg, rgba(99,115,255,0.13) 0%, rgba(99,115,255,0.03) 50%, transparent 100%)' }}
            >
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: 'radial-gradient(ellipse 50% 80% at 15% 0%, rgba(99,115,255,0.14), transparent), radial-gradient(ellipse 40% 50% at 85% 20%, rgba(139,151,255,0.06), transparent)' }} />
              <div className="relative flex items-center gap-6">
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-[88px] h-[88px] rounded-full overflow-hidden flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, #252840, #1a1d2a)', border: '2.5px solid rgba(255,255,255,0.08)' }}
                  >
                    {c.photo_url ? (
                      <img src={c.photo_url} alt={c.name} className="w-full h-full object-cover object-[center_10%]" />
                    ) : (
                      <span className="text-[26px] font-bold text-[#8B97FF]">{initials}</span>
                    )}
                  </div>
                  <div
                    className="absolute bottom-0.5 right-0.5 w-[22px] h-[22px] rounded-full bg-[#34d399] flex items-center justify-center"
                    style={{ border: '3px solid #12141c' }}
                  >
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="#0a0c12" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="2.5 6 5 8.5 9.5 3.5" />
                    </svg>
                  </div>
                </div>
                {/* Name + Role */}
                <div>
                  <h2 className="text-[26px] font-bold leading-tight text-[#eef0f6]">{c.name}</h2>
                  <p className="text-[13.5px] font-medium text-[#8B97FF] mt-1">{c.role}</p>
                </div>
              </div>
            </div>

            {/* Scrollable Body */}
            <div
              className="flex-1 overflow-y-auto px-9 py-7 space-y-6 min-h-0 bg-[#f7f6f3]"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(0,0,0,0.1) transparent' }}
            >
              {/* About */}
              {c.bio && (
                <div>
                  <div className="flex items-center gap-3 mb-3.5">
                    <span className="text-[10px] font-bold tracking-[2px] uppercase text-slate-400">About</span>
                    <div className="flex-1 h-px bg-black/[0.08]" />
                  </div>
                  <p className="text-[14.5px] leading-[1.8] text-slate-600">{c.bio}</p>
                </div>
              )}

              {/* Studies + Country — 2 col */}
              {(c.current_studies || c.country_of_expertise) && (
                <div className="grid grid-cols-2 gap-3">
                  {c.current_studies && (
                    <div className="rounded-[14px] p-[18px] border border-black/[0.07] bg-white">
                      <div className="w-8 h-8 rounded-[9px] flex items-center justify-center text-sm mb-3 bg-indigo-50 border border-indigo-100">🎓</div>
                      <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-slate-400 mb-1.5">Studies</p>
                      {(() => {
                        const parts = c.current_studies.split(/\s*—\s*/);
                        return parts.length > 1 ? (
                          <>
                            <p className="text-[13.5px] font-semibold text-slate-800 leading-snug">{parts[0].trim()}</p>
                            <p className="text-[12px] text-slate-500 mt-1 leading-snug">{parts.slice(1).join(' — ').trim()}</p>
                          </>
                        ) : (
                          <p className="text-[13.5px] font-semibold text-slate-800 leading-snug">{c.current_studies}</p>
                        );
                      })()}
                    </div>
                  )}
                  {c.country_of_expertise && (
                    <div className="rounded-[14px] p-[18px] border border-black/[0.07] bg-white">
                      <div className="w-8 h-8 rounded-[9px] flex items-center justify-center text-sm mb-3 bg-indigo-50 border border-indigo-100">📍</div>
                      <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-slate-400 mb-1.5">Country</p>
                      <p className="text-[13.5px] font-semibold text-slate-800 leading-snug">{c.country_of_expertise}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Area of Expertise */}
              {c.area_of_expertise?.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-3.5">
                    <span className="text-[10px] font-bold tracking-[2px] uppercase text-slate-400">Area of Expertise</span>
                    <div className="flex-1 h-px bg-black/[0.08]" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.area_of_expertise.map((h, i) => (
                      <span key={i} className="px-[13px] py-[6px] rounded-full text-[12.5px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 cursor-default">{h}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Major / Subject */}
              {c.major_subject_expertise?.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-3.5">
                    <span className="text-[10px] font-bold tracking-[2px] uppercase text-slate-400">Major / Subject</span>
                    <div className="flex-1 h-px bg-black/[0.08]" />
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {c.major_subject_expertise.map((s, i) => (
                      <span key={i} className="px-[13px] py-[6px] rounded-full text-[12.5px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 cursor-default">{s}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* CTA Footer */}
            <div className="px-9 py-5 border-t border-black/[0.07] flex-shrink-0 bg-[#f0efe9]">
              <a
                href={c.booking_url || 'https://calendly.com/bladexedu/advising-session'}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2.5 w-full text-white font-semibold py-[15px] rounded-[14px] text-[15px] transition-all"
                style={{ background: '#6373FF', boxShadow: '0 4px 20px rgba(99,115,255,0.25)' }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,115,255,0.4)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 20px rgba(99,115,255,0.25)'}
              >
                Book a Session with {firstName}
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </a>
            </div>
          </DialogContent>
        </Dialog>

        <a
          href={c.booking_url || 'https://calendly.com/bladexedu/advising-session'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 text-sm font-bold text-white py-2.5 rounded-xl shadow-lg shadow-blue-800/40 hover:scale-105 transition-transform duration-200"
          style={{
            background: 'linear-gradient(270deg, #1e3a8a, #1d4ed8, #2563eb, #1e40af, #1e3a8a)',
            backgroundSize: '300% 300%',
            animation: 'btn-gradient 4s ease infinite',
          }}
        >
          Book
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
