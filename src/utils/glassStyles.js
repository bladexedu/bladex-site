/** Flat section label — hero & page headers */
export const sectionBadgeBlue =
  'border border-blue-400/40 bg-blue-600/20 text-blue-100';

export const sectionBadgeClass =
  `inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-2xl ${sectionBadgeBlue}`;

/** Solid CTA — flat, high-contrast */
export const solidButton = {
  navyHoverHero:
    'inline-flex items-center justify-center gap-2 bg-neutral-200 text-black font-semibold rounded-2xl transition-[background-color,color,box-shadow,gap] duration-300 ease-out hover:bg-blue-900 hover:text-white hover:gap-3 hover:shadow-[0_4px_14px_rgba(30,58,138,0.35)]',
  navySolid:
    'inline-flex items-center justify-center gap-2 rounded-full font-bold text-white bg-shine-gradient',
  headerCtaTop:
    'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-colors duration-300 ease-out bg-white text-slate-900 hover:bg-blue-900 hover:text-white',
  headerCtaScrolled:
    'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold border border-blue-900 transition-colors duration-300 ease-out bg-blue-900 text-white hover:bg-white hover:text-slate-900 hover:border-blue-900',
  sm: 'px-3 py-1 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-8 py-2.5 text-base',
};
