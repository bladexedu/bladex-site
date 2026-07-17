import React, { useEffect, useRef, useState } from 'react';

const ALPHA_CACHE = new Map();

function alphaColor(a) {
  const key = Math.round(a * 25) / 25;
  let color = ALPHA_CACHE.get(key);
  if (!color) {
    color = `rgba(255,255,255,${key})`;
    ALPHA_CACHE.set(key, color);
  }
  return color;
}

const STAR_SPEED = 1.15;

function createStars(count, width, height) {
  return Array.from({ length: count }, () => {
    const isLarge = Math.random() < 0.14;
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: isLarge ? Math.random() * 0.6 + 1.4 : Math.random() * 0.6 + 0.5,
      opacity: isLarge ? Math.random() * 0.2 + 0.42 : Math.random() * 0.22 + 0.18,
      twinkle: isLarge,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: (Math.random() * 0.01 + 0.004) * STAR_SPEED,
      vx: (Math.random() - 0.5) * (isLarge ? 0.07 : 0.1) * STAR_SPEED,
      vy: (Math.random() - 0.5) * (isLarge ? 0.07 : 0.1) * STAR_SPEED,
    };
  });
}

/** Area-scaled star count — capped for performance. */
function getStarCount(width, height, density = 1) {
  const area = width * height;
  const count = Math.round((area / 2500) * density);
  const cap = Math.round(250 * density);
  const min = Math.round(65 * density);
  return Math.min(cap, Math.max(min, count));
}

function getDpr() {
  const w = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;
  if (w < 640) return Math.min(dpr, 1.25);
  if (w < 1024) return Math.min(dpr, 1.5);
  return Math.min(dpr, 2);
}

function getFrameInterval() {
  return window.innerWidth < 640 ? 33 : 0;
}

/** Shrink canvas backing store to release GPU memory while paused. */
function releaseCanvas(canvas) {
  if (!canvas) return;
  canvas.width = 1;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  ctx?.clearRect(0, 0, 1, 1);
}

/**
 * Lightweight canvas starfield — pauses when off-screen or tab hidden.
 */
export default function StarfieldBackground({ className = 'absolute inset-0', starDensity = 1 }) {
  const canvasRef = useRef(null);
  const starsRef = useRef([]);
  const rafRef = useRef(null);
  const sizeRef = useRef({ w: 0, h: 0 });
  const lastFrameRef = useRef(0);
  const [inView, setInView] = useState(false);
  const [tabActive, setTabActive] = useState(
    () => typeof document === 'undefined' || !document.hidden,
  );
  const reducedMotionRef = useRef(false);

  const shouldAnimate = inView && tabActive;

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '40px 0px', threshold: 0 },
    );
    observer.observe(canvas);

    const onVisibilityChange = () => setTabActive(!document.hidden);

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    const pause = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastFrameRef.current = 0;
      starsRef.current = [];
      sizeRef.current = { w: 0, h: 0 };
      releaseCanvas(canvas);
    };

    if (!canvas || !shouldAnimate) {
      pause();
      return pause;
    }

    const ctx = canvas.getContext('2d', { alpha: true });
    const parent = canvas.parentElement;

    const resize = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (!w || !h) return;

      const dpr = getDpr();
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      starsRef.current = createStars(getStarCount(w, h, starDensity), w, h);
    };

    resize();
    window.addEventListener('resize', resize);

    const frameInterval = getFrameInterval();

    const animate = (timestamp) => {
      if (frameInterval && timestamp - lastFrameRef.current < frameInterval) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      lastFrameRef.current = timestamp;

      const { w, h } = sizeRef.current;
      if (!w || !h) return;

      const reduced = reducedMotionRef.current;
      ctx.clearRect(0, 0, w, h);

      for (const star of starsRef.current) {
        if (!reduced) {
          star.x += star.vx;
          star.y += star.vy;
          if (star.x < -3) star.x = w + 3;
          else if (star.x > w + 3) star.x = -3;
          if (star.y < -3) star.y = h + 3;
          else if (star.y > h + 3) star.y = -3;
          if (star.twinkle) star.twinklePhase += star.twinkleSpeed;
        }

        let alpha = star.opacity;
        if (star.twinkle && !reduced) {
          alpha *= 0.72 + 0.28 * Math.sin(star.twinklePhase);
        }

        ctx.fillStyle = alphaColor(alpha);

        if (star.r < 1.2) {
          const size = star.r * 2;
          ctx.fillRect(star.x - star.r, star.y - star.r, size, size);
        } else {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      pause();
    };
  }, [shouldAnimate, starDensity]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
};
