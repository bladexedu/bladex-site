import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { glassDark, glassLight, solidButton } from '@/utils/glassStyles';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
  { name: 'Home', page: 'Home' },
  { name: 'About', page: 'About' },
  { name: 'Programs', page: 'Programs' },
  { name: 'Consultants', page: 'Consultants' },
  { name: 'Social', page: 'Social' },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoverPill, setHoverPill] = useState({ left: 0, width: 0, visible: false });
  const navRef = useRef(null);
  const linkRefs = useRef([]);
  const location = useLocation();
  const navigate = useNavigate();

  const handleBookMeeting = () => {
    navigate(createPageUrl('Consultants'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const positionPillAt = useCallback((index) => {
    const el = linkRefs.current[index];
    const nav = navRef.current;
    if (!el || !nav) return false;

    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    setHoverPill({
      left: elRect.left - navRect.left + 3,
      width: elRect.width - 6,
      visible: true,
    });
    return true;
  }, []);

  const showPillAtActive = useCallback(() => {
    const activeIndex = navLinks.findIndex((link) => location.pathname === createPageUrl(link.page));
    if (activeIndex >= 0) {
      positionPillAt(activeIndex);
    } else {
      setHoverPill((prev) => ({ ...prev, visible: false }));
    }
  }, [location.pathname, positionPillAt]);

  useEffect(() => {
    let scrolled = window.scrollY > 24;
    setIsScrolled(scrolled);

    const onScroll = () => {
      const y = window.scrollY;
      // Hysteresis avoids a flash when crossing the top threshold
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

  useEffect(() => {
    const frame = requestAnimationFrame(showPillAtActive);
    return () => cancelAnimationFrame(frame);
  }, [showPillAtActive, isScrolled]);

  const glassTrayClass = isScrolled ? glassLight.tray : glassDark.tray;

  const hoverGlassClass = isScrolled ? glassLight.hover : glassDark.hover;

  const linkClass = () =>
    isScrolled ? 'text-blue-900/75 hover:text-blue-900' : 'text-white';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter] duration-300 ease-out ${
          isScrolled ? 'bg-blue-50/65 backdrop-blur-xl' : 'bg-transparent backdrop-blur-none'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center h-11 shrink-0">
              <img
                src="/bladeX_logo_original-removebg-preview.png"
                alt="BladeX Education"
                className={`h-11 w-auto object-contain transition-[filter,opacity] duration-300 ease-out ${isScrolled ? 'brightness-0 opacity-85' : 'brightness-100 opacity-100'}`}
              />
            </Link>

            {/* Desktop Nav — floating glass capsule */}
            <nav
              ref={navRef}
              className={`hidden md:flex items-center h-11 relative rounded-2xl p-0.5 transition-[background-color,border-color,box-shadow] duration-300 ease-out ${glassTrayClass}`}
              onMouseLeave={showPillAtActive}
            >
              <motion.div
                aria-hidden
                className={`absolute top-1 bottom-1 rounded-xl pointer-events-none border backdrop-blur-md ${hoverGlassClass}`}
                initial={false}
                animate={{
                  left: hoverPill.left,
                  width: hoverPill.width,
                  opacity: hoverPill.visible ? 1 : 0,
                }}
                transition={{
                  left: { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 },
                  width: { type: 'spring', stiffness: 420, damping: 34, mass: 0.8 },
                  opacity: { duration: 0.15 },
                }}
              />

              {navLinks.map((link, index) => (
                <Link
                  key={link.page}
                  ref={(el) => { linkRefs.current[index] = el; }}
                  to={createPageUrl(link.page)}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  onMouseEnter={() => positionPillAt(index)}
                  className={`relative z-10 px-3 py-1.5 text-sm font-medium transition-colors duration-200 rounded-xl whitespace-nowrap ${linkClass()}`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="hidden md:flex items-center h-11 shrink-0">
              <button
                type="button"
                onClick={handleBookMeeting}
                className={`${isScrolled ? solidButton.headerCtaScrolled : solidButton.headerCtaTop} gap-2 px-4 py-1.5 text-sm font-semibold`}
              >
                Book a Meeting
                <span className="relative inline-flex h-2 w-2 shrink-0" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
              </button>
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
              <div className="flex justify-end px-4 pt-5">
                <button onClick={() => setIsMobileOpen(false)} className="p-2 text-slate-500 hover:text-slate-900 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 pt-4 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    className="block text-lg font-medium text-slate-700 border-b border-slate-100 pb-4"
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  type="button"
                  onClick={handleBookMeeting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full mt-4 px-4 py-2.5 text-sm font-semibold"
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
