/** Shared glassmorphism tokens — dark hero / transparent header */
export const glassDark = {
  tray:
    'border bg-white/[0.06] bg-gradient-to-b from-white/[0.12] to-white/[0.02] backdrop-blur-xl backdrop-saturate-150 border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.12),0_0_24px_rgba(147,197,253,0.06),inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-1px_0_rgba(255,255,255,0.04)]',
  hover:
    'border bg-gradient-to-b from-white/[0.20] to-white/[0.08] backdrop-blur-lg backdrop-saturate-150 border-white/30 shadow-[0_0_14px_rgba(191,219,254,0.12),inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(255,255,255,0.06)]',
};

/** Blue glass section label — hero & page headers */
export const sectionBadgeBlue =
  'border bg-gradient-to-b from-blue-400/25 to-blue-600/10 backdrop-blur-xl backdrop-saturate-150 border-blue-400/40 text-blue-100 shadow-[0_4px_18px_rgba(96,165,250,0.18),inset_0_1px_0_rgba(255,255,255,0.25)]';

export const sectionBadgeClass =
  `inline-block text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-2xl ${sectionBadgeBlue}`;

/** Soft blue glass — scrolled / light header nav */
export const glassLight = {
  tray:
    'border bg-gradient-to-b from-blue-50/92 to-blue-100/58 backdrop-blur-2xl backdrop-saturate-150 border-blue-200/55 shadow-[0_8px_28px_rgba(59,130,246,0.1),0_0_22px_rgba(191,219,254,0.5),inset_0_1px_0_rgba(255,255,255,0.88),inset_0_-1px_0_rgba(147,197,253,0.22)]',
  hover:
    'border bg-gradient-to-b from-blue-100/95 to-sky-100/75 backdrop-blur-xl border-blue-300/65 shadow-[0_0_14px_rgba(96,165,250,0.2),inset_0_1px_0_rgba(255,255,255,0.92),inset_0_-1px_0_rgba(147,197,253,0.18)]',
};

/** Solid CTA — flat, high-contrast (no glass) */
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
