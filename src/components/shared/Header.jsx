import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleBookMeeting = () => {
    if (location.pathname === createPageUrl('Consultants')) {
      document.getElementById('consultants-grid')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate(createPageUrl('Consultants'));
    }
  };

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsMobileOpen(false), [location]);

  const navLinks = [
    { name: 'Home', page: 'Home' },
    { name: 'About', page: 'About' },
    { name: 'Programs', page: 'Programs' },
    { name: 'Consultants', page: 'Consultants' },
    { name: 'Social', page: 'Social' },
  ];

  const isActive = (page) => location.pathname === createPageUrl(page);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm' : 'bg-transparent'}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-4">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-2">
              <img
                src="/bladeX_logo_original-removebg-preview.png"
                alt="BladeX Education"
                className={`h-10 w-auto object-contain transition-all duration-300 ${isScrolled ? 'brightness-75' : 'brightness-100'}`}
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className={`text-sm font-medium transition-all duration-200 relative group ${
                    isActive(link.page)
                      ? isScrolled ? 'text-blue-600' : 'text-blue-300'
                      : isScrolled ? 'text-slate-600 hover:text-slate-900' : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-0.5 left-0 h-[2px] rounded-full transition-all duration-200 bg-current ${isActive(link.page) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:block">
              <Button
                onClick={handleBookMeeting}
                className="relative text-white rounded-full px-5 py-2 text-sm font-bold flex items-center gap-1.5 hover:scale-105 transition-transform duration-200 shadow-lg shadow-blue-800/40"
                style={{
                  background: 'linear-gradient(270deg, #1e3a8a, #1d4ed8, #2563eb, #1e40af, #1e3a8a)',
                  backgroundSize: '300% 300%',
                  animation: 'btn-gradient 4s ease infinite',
                }}
              >
                Book a Meeting
              </Button>
            </div>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`md:hidden p-2 ${isScrolled ? 'text-slate-900' : 'text-white'}`}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-2xl"
            >
              <div className="p-6 pt-20 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    className="block text-lg font-medium text-slate-700 border-b border-slate-100 pb-4"
                  >
                    {link.name}
                  </Link>
                ))}
                <Button onClick={handleBookMeeting} className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full mt-4">
                  Book a Meeting
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}