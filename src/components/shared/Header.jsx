import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { solidButton } from '@/utils/glassStyles';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', page: 'Home' },
  { name: 'About', page: 'About' },
  { name: 'Programs', page: 'Programs' },
  { name: 'Consultants', page: 'Consultants' },
  { name: 'Social', page: 'Social' },
  { name: 'BladeX AI', page: 'BladeXAI', badge: 'New' },
];

const aiBookCta =
  'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-colors duration-300 ease-out bg-red-600 text-white hover:bg-red-500';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isAiPage = location.pathname === createPageUrl('BladeXAI');

  const handleBookMeeting = () => {
    navigate(createPageUrl('Consultants'));
  };

  useEffect(() => {
    let scrolled = window.scrollY > 24;
    setIsScrolled(scrolled);

    const onScroll = () => {
      const y = window.scrollY;
      if (!scrolled && y > 24) {
        scrolled = true;
        setIsScrolled(true);
      } else if (scrolled && y < 8) {
        scrolled = false;
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setIsMobileOpen(false), [location]);

  const linkClass = (page, { withUnderline = true } = {}) => {
    const isActive = location.pathname === createPageUrl(page);
    const base = isAiPage
      ? 'text-red-500 hover:text-red-400'
      : isScrolled
        ? 'text-blue-900/75 hover:text-blue-900'
        : 'text-white/90 hover:text-white';
    if (!withUnderline) return base;
    const underline = isActive
      ? `underline underline-offset-4 decoration-2 ${isAiPage ? 'decoration-red-500' : ''}`
      : `hover:underline underline-offset-4 decoration-2 ${isAiPage ? 'decoration-red-500' : ''}`;
    return `${base} ${underline}`;
  };

  const underlineClass = (page) => {
    const isActive = location.pathname === createPageUrl(page);
    return isActive
      ? `underline underline-offset-4 decoration-2 ${isAiPage ? 'decoration-red-500' : ''}`
      : `group-hover:underline underline-offset-4 decoration-2 ${isAiPage ? 'decoration-red-500' : ''}`;
  };

  const bookCtaClass = isAiPage
    ? `${aiBookCta} gap-2 px-4 py-1.5 text-sm`
    : `${isScrolled ? solidButton.headerCtaScrolled : solidButton.headerCtaTop} gap-2 px-4 py-1.5 text-sm font-semibold`;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ease-out ${
          isAiPage
            ? isScrolled
              ? 'bg-black border-b border-white/5'
              : 'bg-transparent border-b border-transparent'
            : isScrolled
              ? 'bg-blue-50'
              : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link to={createPageUrl('Home')} className="flex items-center h-11 shrink-0">
              <img
                src="/bladeX_logo_original-removebg-preview.png"
                alt="BladeX Education"
                className={`h-11 w-auto object-contain transition-[filter,opacity] duration-300 ease-out ${
                  isAiPage
                    ? 'brightness-100 opacity-100'
                    : isScrolled
                      ? 'brightness-0 opacity-85'
                      : 'brightness-100 opacity-100'
                }`}
              />
            </Link>

            <nav className="hidden md:flex items-center gap-1 h-11">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`group relative px-3 py-1.5 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    isAiPage || link.badge ? 'nav-bladex-ai' : ''
                  } ${linkClass(link.page, { withUnderline: !link.badge })}`}
                >
                  {link.badge ? (
                    <>
                      <span className={underlineClass(link.page)}>BladeX</span>
                      {' '}AI
                    </>
                  ) : (
                    link.name
                  )}
                  {link.badge && (
                    <span className="pointer-events-none absolute -bottom-0.5 right-1 font-ai text-[8px] font-normal leading-none text-red-500 whitespace-nowrap tracking-normal">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
            </nav>

            <div className="hidden md:flex items-center h-11 shrink-0">
              <button type="button" onClick={handleBookMeeting} className={bookCtaClass}>
                Book a Meeting
                <span className="relative inline-flex h-2 w-2 shrink-0" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
              </button>
            </div>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className={`md:hidden p-2 ${
                isAiPage ? 'text-red-500' : isScrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

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
              className={`absolute right-0 top-0 bottom-0 w-72 shadow-2xl ${
                isAiPage ? 'bg-[#0a0a0a]' : 'bg-white'
              }`}
            >
              <div className="flex justify-end px-4 pt-5">
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className={`p-2 transition-colors ${
                    isAiPage ? 'text-red-400 hover:text-red-300' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 pt-4 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    className={`relative block text-lg font-medium border-b pb-4 ${
                      isAiPage
                        ? 'nav-bladex-ai text-red-500 border-red-500/20'
                        : `text-slate-700 border-slate-100 ${link.badge ? 'nav-bladex-ai' : ''}`
                    }`}
                  >
                    {link.name}
                    {link.badge && (
                      <span className="pointer-events-none absolute bottom-1 right-0 font-ai text-[9px] font-normal leading-none text-red-500 whitespace-nowrap tracking-normal">
                        {link.badge}
                      </span>
                    )}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={handleBookMeeting}
                  className={`w-full rounded-full mt-4 px-4 py-2.5 text-sm font-semibold text-white ${
                    isAiPage ? 'bg-red-600 hover:bg-red-500' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Book a Meeting
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
