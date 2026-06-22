import React, { useEffect, useRef, useState } from 'react';
import { User } from 'lucide-react';
import { getOptimizedConsultantPhotoUrl } from '@/utils/consultantPhoto';

/**
 * Loads consultant photos when near the viewport (original Supabase URL by default).
 */
export default function ConsultantPhoto({
  photoUrl,
  alt,
  transformOptions,
  className = 'w-full h-full object-cover object-[center_10%]',
  placeholderClassName = 'w-10 h-10 text-blue-500',
  rootClassName = 'absolute inset-0',
  eager = false,
}) {
  const rootRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(eager);

  const displaySrc = photoUrl
    ? getOptimizedConsultantPhotoUrl(photoUrl, transformOptions)
    : null;

  const [src, setSrc] = useState(displaySrc);

  useEffect(() => {
    setSrc(displaySrc);
  }, [displaySrc]);

  useEffect(() => {
    if (eager) {
      setShouldLoad(true);
      return undefined;
    }

    const el = rootRef.current;
    if (!el || !displaySrc) return undefined;

    const markVisible = () => setShouldLoad(true);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          markVisible();
          observer.disconnect();
        }
      },
      { rootMargin: '200px 0px', threshold: 0 },
    );

    observer.observe(el);

    const rect = el.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const vw = window.innerWidth || document.documentElement.clientWidth;
      if (rect.bottom >= -200 && rect.top <= vh + 200 && rect.right >= 0 && rect.left <= vw) {
        markVisible();
        observer.disconnect();
      }
    }

    return () => observer.disconnect();
  }, [displaySrc, eager]);

  if (!displaySrc) {
    return (
      <span
        className={`flex items-center justify-center ${rootClassName}`}
        aria-hidden
      >
        <User className={placeholderClassName} />
      </span>
    );
  }

  return (
    <span ref={rootRef} className={`block ${rootClassName}`}>
      {shouldLoad ? (
        <img
          src={src}
          alt={alt}
          className={className}
          loading="lazy"
          decoding="async"
          onError={() => {
            if (photoUrl && src !== photoUrl) setSrc(photoUrl);
          }}
        />
      ) : (
        <span
          className="flex items-center justify-center w-full h-full min-h-[80px] bg-white/40"
          aria-hidden
        >
          <User className={placeholderClassName} />
        </span>
      )}
    </span>
  );
}
