import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Mail, Facebook, Youtube, Send, Linkedin } from 'lucide-react';

const navLinks = [
  { name: 'Home', page: 'Home' },
  { name: 'About Us', page: 'About' },
  { name: 'Programs', page: 'Programs' },
  { name: 'Consultants', page: 'Consultants' },
  { name: 'Social Media', page: 'Social' },
];

const socials = [
  { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100064021474119', label: 'Facebook', color: 'hover:bg-blue-600/20 hover:text-blue-400 hover:border-blue-500/40' },
  { icon: Youtube,  href: 'http://www.youtube.com/@Bladex-edu', label: 'YouTube', color: 'hover:bg-red-600/20 hover:text-red-400 hover:border-red-500/40' },
  { icon: Send,     href: 'https://t.me/bladexedu', label: 'Telegram', color: 'hover:bg-cyan-600/20 hover:text-cyan-400 hover:border-cyan-500/40' },
  { icon: Linkedin, href: 'https://www.linkedin.com/company/bladex-education/', label: 'LinkedIn', color: 'hover:bg-blue-700/20 hover:text-blue-300 hover:border-blue-400/40' },
];

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white overflow-hidden">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

      {/* Animated dot grid */}
      <div className="absolute inset-0"
        style={{ backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.35) 1.5px, transparent 1.5px)', backgroundSize: '36px 36px', animation: 'grid-pan 8s linear infinite' }} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
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
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center text-slate-400 transition-all duration-200 ${color}`}
                >
                  <Icon className="w-4 h-4" />
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
              <div className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center group-hover:border-blue-500/40 group-hover:bg-blue-600/20 transition-all">
                <Mail className="w-4 h-4 text-blue-400" />
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
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} BladeX Education. All rights reserved.</p>
          <p>Educational guidance for Myanmar students.</p>
        </div>
      </div>
    </footer>
  );
}
