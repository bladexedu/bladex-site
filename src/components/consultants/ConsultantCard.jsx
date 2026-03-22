import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, GraduationCap, Lightbulb, MapPin, ChevronDown, User, BookOpen } from 'lucide-react';

const BIO_LIMIT = 300;

export default function ConsultantCard({ consultant: c, index }) {
  const [expanded, setExpanded] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);

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
            <img src={c.photo_url} alt={c.name} className="w-full h-full object-cover object-[center_10%]" />
          ) : (
            <User className="w-8 h-8 text-blue-300" />
          )}
        </div>

        {/* Name & role */}
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold text-slate-900 leading-tight">{c.name}</h3>
          <p className="text-blue-600 text-sm font-medium mt-0.5">{c.role}</p>
        </div>
      </div>

      {/* Bio */}
      {c.bio && (
        <div className="px-6 pb-4">
          <p className="text-slate-600 text-sm leading-relaxed">
            {bioExpanded || c.bio.length <= BIO_LIMIT ? c.bio : `${c.bio.slice(0, BIO_LIMIT).trimEnd()}...`}
          </p>
          {c.bio.length > BIO_LIMIT && (
            <button
              onClick={() => setBioExpanded(!bioExpanded)}
              className="text-xs text-blue-500 hover:text-blue-700 font-medium mt-1"
            >
              {bioExpanded ? 'Show less' : 'See more'}
            </button>
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

              {/* Current Studies */}
              {c.current_studies && (
                <div className="bg-indigo-50 border border-indigo-100 rounded-2xl p-4 flex gap-3 items-start">
                  <div className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <GraduationCap className="w-4 h-4 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-400 mb-1">Current Studies</p>
                    {(() => {
                      const parts = c.current_studies.split(/\s*—\s*/);
                      return parts.length > 1 ? (
                        <>
                          <p className="text-sm text-indigo-900 font-bold leading-snug">{parts[0].trim()}</p>
                          <p className="text-sm text-indigo-700 font-normal leading-snug mt-0.5">{parts.slice(1).join(' — ').trim()}</p>
                        </>
                      ) : (
                        <p className="text-sm text-indigo-900 leading-snug">{c.current_studies}</p>
                      );
                    })()}
                  </div>
                </div>
              )}

              {/* Country of Expertise */}
              {c.country_of_expertise && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex gap-3 items-start">
                  <div className="w-8 h-8 bg-slate-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-slate-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Country of Expertise</p>
                    <p className="text-sm text-slate-700 leading-snug">{c.country_of_expertise}</p>
                  </div>
                </div>
              )}

              {/* Area of Expertise */}
              {c.area_of_expertise?.length > 0 && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Area of Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {c.area_of_expertise.map((h, i) => (
                        <span key={i} className="text-xs bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full font-medium">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Major / Subject Expertise */}
              {c.major_subject_expertise?.length > 0 && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-violet-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-4 h-4 text-violet-600" />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Major/Subject Expertise</p>
                    <div className="flex flex-wrap gap-2">
                      {c.major_subject_expertise.map((s, i) => (
                        <span key={i} className="text-xs bg-violet-50 text-violet-700 px-2.5 py-1 rounded-full">{s}</span>
                      ))}
                    </div>
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
