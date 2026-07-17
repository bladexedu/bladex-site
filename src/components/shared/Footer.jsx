import React from 'react';
import SpaceSectionBackground from '@/components/shared/SpaceSectionBackground';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import {
  FacebookIcon,
  YouTubeIcon,
  TelegramIcon,
  LinkedInIcon,
  EmailIcon,
} from '@/components/shared/SocialIcons';

const navLinks = [
  { name: 'Home', page: 'Home' },
  { name: 'About Us', page: 'About' },
  { name: 'Programs', page: 'Programs' },
  { name: 'Consultants', page: 'Consultants' },
  { name: 'Social Media', page: 'Social' },
];

const socials = [
  { Icon: FacebookIcon, href: 'https://www.facebook.com/profile.php?id=100064021474119', label: 'Facebook', color: 'hover:bg-blue-600/20 hover:border-blue-500/40 hover:shadow-[0_0_12px_rgba(59,130,246,0.35)]' },
  { Icon: YouTubeIcon, href: 'http://www.youtube.com/@Bladex-edu', label: 'YouTube', color: 'hover:bg-red-600/20 hover:border-red-500/40 hover:shadow-[0_0_12px_rgba(239,68,68,0.35)]' },
  { Icon: TelegramIcon, href: 'https://t.me/bladexedu', label: 'Telegram', color: 'hover:bg-cyan-600/20 hover:border-cyan-500/40 hover:shadow-[0_0_12px_rgba(34,211,238,0.35)]' },
  { Icon: LinkedInIcon, href: 'https://www.linkedin.com/company/bladex-education/', label: 'LinkedIn', color: 'hover:bg-blue-700/20 hover:border-blue-400/40 hover:shadow-[0_0_12px_rgba(96,165,250,0.35)]' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#060b18] text-white overflow-hidden">
      {/* Top accent line */}
      <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      <div className="absolute inset-0 z-0">
        <SpaceSectionBackground />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid md:grid-cols-3 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <img
              src="/bladeX_logo_original-removebg-preview.png"
              alt="BladeX Education"
              className="h-10 w-auto object-contain mb-4"
            />
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Guiding Myanmar students toward quality international education, clear pathways, and successful long-term careers abroad.
            </p>
            {/* Social icon buttons */}
            <div className="flex gap-2 flex-wrap">
              {socials.map(({ Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`group w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-200 ${color}`}
                >
                  <Icon className="w-7 h-7 rounded-md flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest mb-5">Quick Links</h4>
            <ul className="space-y-3">
              {navLinks.map((l) => (
                <li key={l.page}>
                  <Link
                    to={createPageUrl(l.page)}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white text-sm uppercase tracking-widest mb-5">Get In Touch</h4>
            <a
              href="mailto:bladexedu@gmail.com"
              className="flex items-center gap-3 text-slate-400 hover:text-white transition-colors text-sm mb-6 group"
            >
              <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center group-hover:border-blue-500/40 group-hover:bg-blue-600/20 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.35)] transition-all">
                <EmailIcon className="w-7 h-7 rounded-md flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
              </div>
              bladexedu@gmail.com
            </a>
            <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
              <p className="text-slate-400 text-xs leading-relaxed">
                <span className="text-white font-semibold block mb-1">Advisory only.</span>
                BladeX does not process visa applications or submit university documents on your behalf.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-12 pt-6 space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center items-center justify-between gap-3 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} BladeX Education. All rights reserved.</p>
            <p className="text-center sm:text-right">Educational guidance for Myanmar students.</p>
          </div>
          <div className="text-center sm:text-right text-xs">
            <a
              href="https://icons8.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500/60 hover:text-slate-300 transition-colors"
            >
              Icons by Icons8
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
