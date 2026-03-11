import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Mail, Facebook, Youtube, ExternalLink } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/bladeX_logo_original-removebg-preview.png"
                alt="BladeX Education"
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Guiding Myanmar students toward quality international education, clear pathways, and successful long-term careers abroad.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Home', page: 'Home' },
                { name: 'About Us', page: 'About' },
                { name: 'Programs', page: 'Programs' },
                { name: 'Consultants', page: 'Consultants' },
                { name: 'Social Media', page: 'Social' },
              ].map((l) => (
                <li key={l.page}>
                  <Link to={createPageUrl(l.page)} className="text-slate-400 hover:text-blue-400 transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
              <li>
                <a href="https://calendly.com/bladexedu/advising-session" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1">
                  Book a Meeting <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Contact & Social</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-slate-400">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:bladexedu@gmail.com" className="hover:text-blue-400 transition-colors">bladexedu@gmail.com</a>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Facebook className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <a href="https://www.facebook.com/share/p/1GrFGYZw4a/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">Facebook</a>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <Youtube className="w-4 h-4 text-red-400 flex-shrink-0" />
                <a href="http://www.youtube.com/@Bladex-edu" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">YouTube</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center space-y-2">
          <p className="text-slate-500 text-xs max-w-2xl mx-auto">
            Please note: BladeX Education provides strategic advisory services only. We do not process visa applications or submit university documents on your behalf.
          </p>
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} BladeX Education. All rights reserved. · Educational guidance for Myanmar students.</p>
        </div>
      </div>
    </footer>
  );
}