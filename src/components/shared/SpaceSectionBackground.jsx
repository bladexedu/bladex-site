import React from 'react';
import StarfieldBackground from '@/components/shared/StarfieldBackground';

/**
 * Shared dark space hero/footer backdrop — starfield + edge vignette.
 * Parent must be `relative` with `absolute inset-0` (or equivalent) sizing.
 * @param {{ softVignette?: boolean, starDensity?: number, vignetteBlack?: boolean }} props
 */
export default function SpaceSectionBackground({
  softVignette = false,
  starDensity = 1,
  vignetteBlack = false,
}) {
  const edge = vignetteBlack ? 'rgba(0, 0, 0, 0.85)' : 'rgba(15, 23, 42, 0.78)';
  const edgeSolid = vignetteBlack ? '#000000' : '#0f172a';

  return (
    <>
      <StarfieldBackground className="absolute inset-0" starDensity={starDensity} />
      <div
        className="absolute inset-0"
        style={{
          background: softVignette
            ? `radial-gradient(ellipse 78% 82% at 54% 45%, transparent 48%, ${edge} 100%)`
            : `radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, ${edgeSolid} 100%)`,
        }}
        aria-hidden
      />
    </>
  );
}
