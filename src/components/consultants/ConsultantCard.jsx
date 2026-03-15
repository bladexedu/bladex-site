import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, GraduationCap, Heart, Lightbulb, Globe, MapPin, ChevronDown, User } from 'lucide-react';

export default function ConsultantCard({ consultant: c, index }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Top card — always visible */}
      <div className="p-6 flex gap-5 items-start">
        {/* Avatar */}
        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-800 to-slate-900 flex-shrink-0 flex items-center justify-center">
          {c.photo_url ? (
            <img src={c.photo_url} alt={c.name} className="w-full h-full object-cover" />
          ) : (
            <User className="w-8 h-8 text-blue-300" />
          )}
        </div>

        {/* Name & role */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-slate-900 leading-tight">{c.name}</h3>
          <p className="text-blue-600 text-sm font-medium mt-0.5">{c.role}</p>
          {c.current_country && (
            <p className="text-slate-400 text-xs mt-1 flex items-center gap-1">
              <MapPin className="w-3 h-3" /> {c.current_country}
            </p>
          )}
        </div>
      </div>

      {/* Bio */}
      {c.bio && (
        <div className="px-6 pb-4">
          <p className="text-slate-600 text-sm leading-relaxed">{c.bio}</p>
        </div>
      )}

      {/* Quick tags — can_help_with preview */}
      {c.can_help_with?.length > 0 && (
        <div className="px-6 pb-4 flex flex-wrap gap-2">
          {c.can_help_with.filter(t => !t.startsWith('degree:')).slice(0, 3).map((tag, i) => (
            <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">{tag}</span>
          ))}
          {c.can_help_with.filter(t => !t.startsWith('degree:')).length > 3 && (
            <span className="text-xs bg-slate-100 text-slate-500 px-2.5 py-1 rounded-full">+{c.can_help_with.filter(t => !t.startsWith('degree:')).length - 3} more</span>
          )}
        </div>
      )}

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-center gap-1 text-xs font-semibold text-slate-400 hover:text-blue-600 py-3 border-t border-slate-100 transition-colors"
      >
        {expanded ? 'Show less' : 'See full profile'}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-5 border-t border-slate-100 pt-5">

              {/* Education */}
              {c.education && (() => {
                // Parse "University — Degree" or "University, Degree" format
                const parts = c.education.split(/\s*[—–]\s*|\n|\s*,\s(?=[A-Z])/);
                const university = parts[0]?.trim();
                const degree = parts.slice(1).join(', ').trim();
                return (
                  <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex gap-3 items-start">
                    <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                      <GraduationCap className="w-4 h-4 text-indigo-600" />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1">Education</p>
                      <p className="text-sm text-indigo-900 font-bold leading-snug">{university}</p>
                      {degree && <p className="text-sm text-indigo-700 font-normal leading-snug mt-0.5">{degree}</p>}
                    </div>
                  </div>
                );
              })()}

              {/* Can help with */}
              {c.can_help_with?.length > 0 && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Can Help With</p>
                    <div className="flex flex-wrap gap-2">
                      {c.can_help_with.filter(h => !h.startsWith('degree:')).map((h, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Interests */}
              {c.interests?.length > 0 && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-rose-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Heart className="w-4 h-4 text-rose-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Interests</p>
                    <div className="flex flex-wrap gap-2">
                      {c.interests.map((t, i) => (
                        <span key={i} className="text-xs bg-rose-50 text-rose-600 px-2.5 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Languages */}
              {c.languages?.length > 0 && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Globe className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Languages</p>
                    <p className="text-sm text-slate-700">{c.languages.join(' · ')}</p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Book button */}
      <div className="px-6 pb-6">
        <a
          href={c.booking_url || 'https://calendly.com/bladexedu/advising-session'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
        >
          Book with {c.name.split(' ')[0]}
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}