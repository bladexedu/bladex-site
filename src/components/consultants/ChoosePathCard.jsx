import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
const EASE = 'cubic-bezier(0.65, 0, 0.35, 1)';
const EXIT_MS = 420;
const T500 = `500ms ${EASE}`;
const T250 = `250ms ${EASE}`;
const FONT = 'var(--font-sans)';

const OPTIONS = {
  a: {
    chooseId: 'where',
    decor: 'rings',
    title: 'WHERE to study',
    hint: 'Got a dream destination in mind?',
    detail: 'Browse consultants by destination',
    regions: ['North America', 'Europe', 'Asia', 'The UK', 'Oceania'],
    stats: [{ label: 'Focus', value: 'Place-First' }],
    colors: {
      rest: '#E2E8F0',
      active: '#CBD5E1',
      title: '#0f172a',
      body: '#475569',
      statLabel: '#64748b',
      statValue: '#0f172a',
      border: 'rgba(100, 116, 139, 0.35)',
    },
  },
  b: {
    chooseId: 'what',
    decor: 'tracks',
    title: 'WHAT to study',
    hint: 'Got a career path in mind?',
    detail: 'Browse consultants by field',
    fields: ['Medicine', 'Engineering', 'Business', 'Languages, and more'],
    stats: [{ label: 'Focus', value: 'Subject-First' }],
    colors: {
      rest: '#0f172a',
      active: '#162136',
      gradient: {
        rest: 'linear-gradient(165deg, #1e293b 0%, #0f172a 48%, #060b18 100%)',
        active: 'linear-gradient(165deg, #263349 0%, #162136 48%, #0a1120 100%)',
      },
      title: '#f1f5f9',
      body: '#cbd5e1',
      statLabel: '#60a5fa',
      statValue: '#f1f5f9',
      border: 'rgba(96, 165, 250, 0.3)',
    },
  },
};

function RingsDecor({ isActive }) {
  return (
    <svg
      aria-hidden
      width="360"
      height="360"
      viewBox="0 0 360 360"
      style={{
        position: 'absolute',
        bottom: -150,
        left: -150,
        pointerEvents: 'none',
        opacity: isActive ? 0.68 : 0.48,
        transition: `opacity ${T250}`,
      }}
    >
      {[70, 110, 150, 178].map((r) => (
        <circle
          key={r}
          cx="180"
          cy="180"
          r={r}
          fill="none"
          stroke="#64748b"
          strokeWidth="1.25"
          opacity={0.4}
        />
      ))}
    </svg>
  );
}

function TracksDecor({ isActive }) {
  return (
    <svg
      aria-hidden
      width="320"
      height="260"
      viewBox="0 0 320 260"
      style={{
        position: 'absolute',
        top: -36,
        right: -48,
        pointerEvents: 'none',
        opacity: isActive ? 0.95 : 0.7,
        transition: `opacity ${T250}`,
      }}
    >
      <defs>
        <linearGradient id="choose-tracks-fade" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.85" />
          <stop offset="45%" stopColor="#60a5fa" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Soft curriculum “lanes” — subject paths instead of a dot grid */}
      {[
        { y: 48, o: 0.9 },
        { y: 88, o: 0.72 },
        { y: 128, o: 0.55 },
        { y: 168, o: 0.4 },
        { y: 208, o: 0.28 },
      ].map(({ y, o }) => (
        <path
          key={y}
          d={`M 40 ${y} C 120 ${y - 18}, 200 ${y + 22}, 300 ${y - 6}`}
          fill="none"
          stroke="url(#choose-tracks-fade)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={o}
        />
      ))}
      <path
        d="M 210 18 L 298 18 L 298 106"
        fill="none"
        stroke="#93c5fd"
        strokeWidth="1.5"
        strokeOpacity="0.55"
      />
      <circle cx="298" cy="18" r="3.5" fill="#93c5fd" fillOpacity="0.7" />
    </svg>
  );
}

function PathSide({ option, widthPct, isActive, isLeaning, isRight, stacked, onSelect }) {
  const { colors, kicker, title, hint, detail, regions, fields, stats, Icon, watermark, decor } = option;
  const bullets = regions || fields;
  const bg = isActive ? colors.active : colors.rest;
  const bgImage = colors.gradient
    ? (isActive ? colors.gradient.active : colors.gradient.rest)
    : undefined;
  const compressed = isLeaning && !isActive;

  const [titleWord, ...titleRest] = title.split(' ');

  const type = {
    kicker: compressed ? 9 : 10,
    title: compressed ? 20 : 28,
    detail: compressed ? 11 : 13,
    statLabel: compressed ? 8 : 10,
    statValue: compressed ? 14 : 18,
    statGap: compressed ? 10 : 20,
    pad: compressed ? '24px 18px' : '28px 32px',
    icon: compressed ? 14 : 18,
  };

  const positionStyle = isRight
    ? { left: `${widthPct}%`, right: 0, transition: `left ${T500}, background-color ${T250}` }
    : { left: 0, right: `${100 - widthPct}%`, transition: `right ${T500}, background-color ${T250}` };

  const containerStyle = stacked
    ? {
        position: 'relative',
        width: '100%',
        borderRadius: 'var(--radius)',
        border: '0.5px solid rgba(15, 23, 42, 0.12)',
        cursor: 'pointer',
      }
    : {
        position: 'absolute',
        top: 0,
        bottom: 0,
        ...positionStyle,
        zIndex: isActive ? 2 : 1,
      };

  const interactionProps = stacked
    ? {
        role: 'button',
        tabIndex: 0,
        'aria-label': title,
        onClick: onSelect,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect?.();
          }
        },
      }
    : { 'aria-hidden': true };

  return (
    <div
      {...interactionProps}
      style={{
        ...containerStyle,
        backgroundColor: bg,
        backgroundImage: bgImage,
        overflow: 'hidden',
      }}
    >
      {bgImage ? (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(420px 280px at 88% 8%, rgba(59, 130, 246, 0.18), transparent 65%)',
            opacity: isActive ? 1 : 0.55,
            transition: `opacity ${T250}`,
            pointerEvents: 'none',
          }}
        />
      ) : null}
      {decor === 'rings' ? <RingsDecor isActive={isActive} /> : null}
      {decor === 'tracks' ? <TracksDecor isActive={isActive} /> : null}
      {watermark ? (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            fontFamily: FONT,
            fontSize: compressed ? 160 : 220,
            fontWeight: 700,
            lineHeight: 0.85,
            color: colors.watermark,
            opacity: 0.2,
            pointerEvents: 'none',
            userSelect: 'none',
            transition: `font-size ${T500}`,
            ...(isRight
              ? { bottom: -28, right: -12 }
              : { top: -28, left: -12 }),
          }}
        >
          {watermark}
        </span>
      ) : null}

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: stacked ? 'auto' : '100%',
          padding: type.pad,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: stacked ? 18 : undefined,
          alignItems: isRight ? 'flex-end' : 'flex-start',
          textAlign: isRight ? 'right' : 'left',
          fontFamily: FONT,
          fontWeight: 400,
          color: colors.body,
          transition: `padding ${T500}`,
        }}
      >
        {kicker ? (
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              gap: compressed ? 6 : 10,
              flexDirection: isRight ? 'row-reverse' : 'row',
              justifyContent: isRight ? 'flex-end' : 'flex-start',
              transition: `gap ${T500}`,
            }}
          >
            <span
              style={{
                fontSize: type.kicker,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                fontWeight: 500,
                color: colors.kicker,
                whiteSpace: 'nowrap',
                transition: `font-size ${T500}`,
              }}
            >
              {kicker}
            </span>
            {Icon ? (
              <Icon size={type.icon} strokeWidth={1.5} color={colors.kicker} aria-hidden />
            ) : null}
          </div>
        ) : null}

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            flex: isRight || !kicker ? 1 : undefined,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: isRight ? 'flex-end' : 'flex-start',
            width: isRight ? '100%' : undefined,
            maxWidth: compressed ? 200 : 280,
            marginLeft: isRight ? 'auto' : 0,
          }}
        >
          <h3
            style={{
              margin: '0 0 8px',
              fontFamily: FONT,
              fontSize: type.title,
              fontWeight: 700,
              lineHeight: 1.15,
              color: colors.title,
              whiteSpace: compressed ? 'nowrap' : 'normal',
              letterSpacing: '-0.01em',
              transition: `font-size ${T500}`,
            }}
          >
            {titleWord}
            <span style={{ fontWeight: 300, opacity: 0.85 }}> {titleRest.join(' ')}</span>
          </h3>
          {hint ? (
            <p
              style={{
                margin: '8px 0 0',
                fontSize: type.detail,
                lineHeight: 1.55,
                maxWidth: '100%',
                color: colors.body,
                opacity: isActive ? 0 : 1,
                maxHeight: isActive ? 0 : 48,
                overflow: 'hidden',
                transition: `opacity ${T250}, max-height ${T250}, font-size ${T500}`,
                transitionDelay: isActive ? '0ms' : '150ms',
              }}
            >
              {hint}
            </p>
          ) : null}
          <div
            style={{
              margin: 0,
              fontSize: type.detail,
              lineHeight: 1.55,
              maxWidth: '100%',
              width: isRight && bullets ? '100%' : undefined,
              display: bullets ? 'flex' : undefined,
              flexDirection: bullets ? 'column' : undefined,
              alignItems: isRight && bullets ? 'flex-end' : undefined,
              opacity: isActive ? 1 : 0,
              maxHeight: isActive ? (bullets ? 220 : 80) : 0,
              overflow: 'hidden',
              transition: `opacity ${T250}, max-height ${T250}, font-size ${T500}`,
              transitionDelay: isActive ? '200ms' : '0ms',
            }}
          >
            {bullets ? (
              <>
                <p
                  style={{
                    margin: 0,
                    alignSelf: isRight ? 'flex-end' : 'flex-start',
                    fontSize: type.statLabel,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    color: colors.statLabel || colors.body,
                  }}
                >
                  {detail}
                </p>
                <ul
                  style={{
                    alignSelf: isRight ? 'flex-end' : 'flex-start',
                    width: '100%',
                    maxWidth: 240,
                    margin: '10px 0 0',
                    padding: 0,
                    listStyle: 'none',
                  }}
                >
                  {bullets.map((item, i) => (
                    <li
                      key={item}
                      style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'space-between',
                        flexDirection: isRight ? 'row-reverse' : 'row',
                        gap: 12,
                        padding: '5px 0',
                        borderTop: i === 0 ? 'none' : `0.5px solid ${colors.border}`,
                        color: colors.title,
                        fontWeight: 500,
                      }}
                    >
                      <span>{item}</span>
                      <span
                        style={{
                          fontSize: type.statLabel,
                          fontWeight: 400,
                          color: colors.statLabel || colors.body,
                          letterSpacing: '0.08em',
                        }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p style={{ margin: 0 }}>{detail}</p>
            )}
          </div>
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 2,
            borderTop: `0.5px solid ${colors.border}`,
            paddingTop: compressed ? 10 : 14,
            display: 'flex',
            gap: type.statGap,
            flexWrap: 'nowrap',
            justifyContent: isRight ? 'flex-end' : 'flex-start',
            transition: `gap ${T500}, padding-top ${T500}`,
          }}
        >
          {stats.map(({ label, value }) => (
            <div key={label} style={{ flexShrink: 0 }}>
              <div
                style={{
                  fontSize: type.statLabel,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  color: colors.statLabel,
                  marginBottom: compressed ? 2 : 4,
                  whiteSpace: 'nowrap',
                  transition: `font-size ${T500}`,
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: FONT,
                  fontSize: type.statValue,
                  fontWeight: 600,
                  color: colors.statValue,
                  lineHeight: 1.2,
                  whiteSpace: 'nowrap',
                  transition: `font-size ${T500}`,
                }}
              >
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChoosePathCard({ onChoose }) {
  const cardRef = useRef(null);
  const [hoverSide, setHoverSide] = useState(null);
  const [isExiting, setIsExiting] = useState(false);
  const [commitSide, setCommitSide] = useState(null);
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches,
  );

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const onChange = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const activeSide = commitSide ?? hoverSide;

  const sideAWidth = commitSide === 'a'
    ? 88
    : commitSide === 'b'
      ? 12
      : activeSide === 'a'
        ? 70
        : activeSide === 'b'
          ? 30
          : 50;
  const dividerPct = sideAWidth;

  const pickSide = useCallback((clientX) => {
    const el = cardRef.current;
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return clientX - rect.left < rect.width / 2 ? 'a' : 'b';
  }, []);

  const handleMouseMove = useCallback(
    (e) => {
      if (isExiting) return;
      setHoverSide(pickSide(e.clientX));
    },
    [isExiting, pickSide],
  );

  const handleMouseLeave = useCallback(() => {
    if (!isExiting) setHoverSide(null);
  }, [isExiting]);

  const commitChoice = useCallback(
    (side) => {
      if (isExiting) return;
      setCommitSide(side);
      setIsExiting(true);
      window.setTimeout(() => {
        onChoose?.(OPTIONS[side].chooseId);
      }, EXIT_MS);
    },
    [isExiting, onChoose],
  );

  const handleClick = useCallback(() => {
    commitChoice(hoverSide ?? 'a');
  }, [commitChoice, hoverSide]);

  return (
    <motion.div
      initial={false}
      animate={
        isExiting
          ? { opacity: 0, y: 16, scale: 0.98 }
          : { opacity: 1, y: 0, scale: 1 }
      }
      transition={{ duration: EXIT_MS / 1000, ease: [0.65, 0, 0.35, 1] }}
      style={{ width: '100%', maxWidth: 860, fontFamily: FONT, pointerEvents: isExiting ? 'none' : 'auto' }}
    >
      <h2 className="sr-only">
        Choose how to browse consultants: by destination or by field of study
      </h2>

      {/* Header row */}
      <header style={{ marginBottom: 20 }}>
        <div>
          <p
            style={{
              margin: '0 0 8px',
              fontSize: 11,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              fontWeight: 500,
              color: '#64748b',
            }}
          >
            Your choice
          </p>
          <h2
            style={{
              margin: 0,
              fontFamily: FONT,
              fontSize: 32,
              fontWeight: 700,
              color: '#0f172a',
              lineHeight: 1.15,
            }}
          >
            Which one is for you?
          </h2>
        </div>
      </header>

      {isMobile ? (
        /* Stacked cards — always expanded, tap to choose */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <PathSide
            option={OPTIONS.a}
            stacked
            isActive
            isLeaning={false}
            isRight={false}
            onSelect={() => commitChoice('a')}
          />
          <PathSide
            option={OPTIONS.b}
            stacked
            isActive
            isLeaning={false}
            isRight
            onSelect={() => commitChoice('b')}
          />
        </div>
      ) : (
      /* Split card */
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label="Choose browse path by destination or field of study"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{
          position: 'relative',
          width: '100%',
          height: 380,
          borderRadius: 'var(--radius)',
          border: '0.5px solid rgba(15, 23, 42, 0.12)',
          overflow: 'hidden',
          cursor: 'pointer',
        }}
      >
        <PathSide
          option={OPTIONS.a}
          widthPct={sideAWidth}
          isActive={activeSide === 'a'}
          isLeaning={activeSide !== null}
          isRight={false}
        />
        <PathSide
          option={OPTIONS.b}
          widthPct={sideAWidth}
          isActive={activeSide === 'b'}
          isLeaning={activeSide !== null}
          isRight
        />

        {/* Divider arrows */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '50%',
            left: `${dividerPct}%`,
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            zIndex: 6,
            pointerEvents: 'none',
            transition: `left ${T500}, transform ${T500}`,
            transform: `translate(-50%, -50%) scale(${activeSide ? 0.92 : 1})`,
          }}
        >
          <ChevronLeft
            size={20}
            strokeWidth={2}
            color="#1e3a8a"
            style={{ filter: 'drop-shadow(0 1px 2px rgba(255,255,255,0.4))' }}
          />
          <ChevronRight
            size={20}
            strokeWidth={2}
            color="#fff"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.45))' }}
          />
        </div>
      </div>
      )}
    </motion.div>
  );
}
