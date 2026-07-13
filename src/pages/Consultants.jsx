import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/api/supabaseClient';
import { X, ArrowLeft } from 'lucide-react';
import ConsultantCard from '@/components/consultants/ConsultantCard';
import ConsultantFilters from '@/components/consultants/ConsultantFilters';
import imgAsia from '@/assests/region-asia.jpg';
import imgNorthAmerica from '@/assests/region-north-america.jpg';
import imgUnitedKingdom from '@/assests/region-united-kingdom.jpg';
import imgEurope from '@/assests/region-europe.jpg';
import imgOceania from '@/assests/region-oceania.png';

const DESTINATION_MAP = {
  'North America': ['canada', 'usa', 'us', 'united states'],
  // covers Nyan, Nang, Wutt, Cherry, Wai Phyo, Hnaine

  'Europe': ['europe', 'germany', 'france', 'netherlands', 'italy',
             'hungary', 'poland', 'czech', 'czechia', 'slovakia', 'finland', 'switzerland'],
  // added: hungary (Yati), czech/slovakia (Thet Htar, Cho Mya), finland (Yupar), switzerland (Chaw)

  'United Kingdom': ['uk', 'united kingdom'],

  'Asia': ['asia', 'singapore', 'japan', 'korea', 'thailand',
           'malaysia', 'hong kong', 'india', 'china'],
  // added: korea (Thuta), thailand (Nyan), malaysia (Shin Lin Let), hong kong (Wai Phyo), china (Ye Linn)

  'Oceania': ['oceania', 'australia', 'new zealand', 'nz'],
};

const AREA_MAP = {
  'Medicine & Sciences': [
    'medicine', 'biochemistry', 'biology', 'chemistry',
    'health', 'biotech', 'stem', 'medical', 'molecular',
    'genetics', 'immunology', 'cell', 'pre-med',
    'environmental science'
  ],
  'Engineering': [
    'engineering', 'mechanical', 'electrical', 'civil',
    'chemical engineering', 'biomedical', 'sustainable energy',
    'materials science', 'energy', 'systems engineering'
  ],
  'Business & Management': [
    'business', 'management', 'commerce', 'mba', 'analytics',
    'bcom', 'btm'
  ],
  'Computer Science & IT': [
    'computer science', 'software', 'data science',
    'information technology', 'data-related'
  ],
  'Arts & Humanities': [
    'arts', 'humanities', 'social', 'literature', 'history',
    'philosophy', 'linguistics', 'language', 'french', 'fle'
  ],
  'High School Diploma': [
    'diploma'
  ],
};

const DEGREE_TAG_MAP = {
  "Undergraduate": ['bachelor', 'college', 'college admission', 'university admission', 'pre-med'],
  "Master's": ['master', 'graduate school'],
  'PhD': ['phd', 'graduate school', 'research proposal', 'dphil'],
  'Pre-University / High School': ['highschool', 'high school', 'uwc', 'foundation', 'a-level', 'pre-u'],
};

/** Row 1: NA, Europe, Asia — Row 2: UK, Oceania */
const REGION_LAYOUT = [
  ['North America', 'Europe', 'Asia'],
  ['United Kingdom', 'Oceania'],
];

const REGION_META = {
  'North America': { label: 'North America', subtitle: 'Canada · USA', img: imgNorthAmerica },
  Europe: { label: 'Europe', subtitle: 'Germany · France · Italy · more', img: imgEurope },
  'United Kingdom': { label: 'United Kingdom', subtitle: 'England · Ireland · more', img: imgUnitedKingdom },
  Asia: { label: 'Asia', subtitle: 'Singapore · Japan · Korea · more', img: imgAsia },
  Oceania: { label: 'Oceania', subtitle: 'Australia · New Zealand', img: imgOceania },
};

function matchesFilters(consultant, filters) {
  const { degree, destination, area } = filters;

  if (degree !== 'all') {
    const keywords = DEGREE_TAG_MAP[degree] || [];
    const areaHelp = (consultant.area_of_expertise || []).join(' ').toLowerCase();
    const majorHelp = (consultant.major_subject_expertise || []).join(' ').toLowerCase();
    if (!keywords.some(k => areaHelp.includes(k) || majorHelp.includes(k))) return false;
  }

  if (destination !== 'all') {
    const keywords = DESTINATION_MAP[destination] || [];
    const region = (consultant.region || '').toLowerCase();
    const country = (consultant.country_of_expertise || '').toLowerCase();
    if (!keywords.some(k => {
      const re = new RegExp(`\\b${k}\\b`);
      return re.test(region) || re.test(country);
    })) return false;
  }

  if (area !== 'all') {
    const areaHelp = (consultant.area_of_expertise || []).join(' ').toLowerCase();
    const majorHelp = (consultant.major_subject_expertise || []).join(' ').toLowerCase();
    const keywords = AREA_MAP[area] || [];
    if (!keywords.some(k => areaHelp.includes(k) || majorHelp.includes(k))) return false;
  }

  return true;
}

export default function Consultants() {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ degree: 'all', destination: 'all', area: 'all' });
  const [showRegionPicker, setShowRegionPicker] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(null);

  useEffect(() => {
    const fetchConsultants = async () => {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase
        .from('consultants')
        .select('*')
        .eq('is_active', true)
        .order('order')
        .limit(50);
      if (data) setConsultants(data);
      setLoading(false);
    };
    fetchConsultants();
  }, []);

  const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const handleRegionClick = (regionKey) => {
    setConsultants(prev => shuffle(prev));
    setSelectedRegion(regionKey);
    setFilters({ degree: 'all', destination: regionKey, area: 'all' });
    setShowRegionPicker(false);
  };

  const handleBrowseAll = () => {
    setConsultants(prev => shuffle(prev));
    setSelectedRegion(null);
    setFilters({ degree: 'all', destination: 'all', area: 'all' });
    setShowRegionPicker(false);
  };

  const handleClearRegion = () => {
    setSelectedRegion(null);
    setFilters(prev => ({ ...prev, destination: 'all' }));
  };

  const handleBackToRegions = () => {
    setShowRegionPicker(true);
    setSelectedRegion(null);
    setFilters({ degree: 'all', destination: 'all', area: 'all' });
  };

  if (showRegionPicker) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Hero — kept intact */}
        <section className="relative pt-32 pb-28 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0"
            style={{ backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.35) 1.5px, transparent 1.5px)', backgroundSize: '36px 36px', animation: 'grid-pan 8s linear infinite' }} />
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className="text-blue-400 font-semibold text-xs uppercase tracking-widest">Meet the Team</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">Our Consultants</h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Every consultant at BladeX Education has been through the study-abroad journey themselves. Browse their profiles and book directly with who feels right for you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Region picker */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center"
          >
            {/* Label */}
            <p className="text-slate-500 text-xs font-semibold uppercase tracking-[0.2em] mb-10">
              Where are you looking to study?
            </p>

            {/* Row 1: NA · Europe · Asia — Row 2: UK · Oceania */}
            <div className="w-full max-w-4xl flex flex-col gap-4">
              {REGION_LAYOUT.map((rowKeys, rowIdx) => (
                <div
                  key={rowIdx}
                  className={`grid gap-4 w-full ${rowKeys.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}
                >
                  {rowKeys.map((regionKey, i) => {
                    const region = REGION_META[regionKey];
                    const animIndex = rowIdx === 0 ? i : 3 + i;
                    return (
                      <motion.button
                        key={regionKey}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * animIndex, duration: 0.35 }}
                        onClick={() => handleRegionClick(regionKey)}
                        className="group relative flex flex-col items-start justify-between rounded-xl p-5 h-[160px] text-left overflow-hidden transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
                      >
                        <span
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                          style={{ backgroundImage: `url(${region.img})` }}
                          aria-hidden
                        />
                        <span className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors" aria-hidden />

                        <span className="relative flex flex-col gap-0.5">
                          <span className="text-white text-lg font-semibold leading-snug drop-shadow">{region.label}</span>
                          <span
                            className="text-xs font-medium bg-clip-text text-transparent"
                            style={{
                              backgroundImage: 'linear-gradient(270deg, #ffffff, #9ca3af, #d1d5db, #6b7280, #ffffff)',
                              backgroundSize: '300% 300%',
                              animation: 'btn-gradient 4s ease infinite',
                            }}
                          >{region.subtitle}</span>
                        </span>
                        <span
                          className="relative inline-flex items-center gap-1.5 text-white text-xs font-bold px-3 py-1.5 rounded-md shadow-lg shadow-blue-800/40"
                          style={{
                            background: 'linear-gradient(270deg, #1e3a8a, #1d4ed8, #2563eb, #1e40af, #1e3a8a)',
                            backgroundSize: '300% 300%',
                            animation: 'btn-gradient 4s ease infinite',
                          }}
                        >
                          Book Now
                          <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 8h10M9 4l4 4-4 4"/>
                          </svg>
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Browse all link */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={handleBrowseAll}
              className="mt-10 text-slate-400 hover:text-slate-700 text-sm transition-colors underline underline-offset-4"
            >
              Browse all consultants →
            </motion.button>
          </motion.div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative pt-32 pb-28 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0"
          style={{ backgroundImage: 'radial-gradient(circle, rgba(59,130,246,0.35) 1.5px, transparent 1.5px)', backgroundSize: '36px 36px', animation: 'grid-pan 8s linear infinite' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-blue-400 font-semibold text-xs uppercase tracking-widest">Meet the Team</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">Our Consultants</h1>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto">
              Every consultant at BladeX Education has been through the study-abroad journey themselves. Browse their profiles and book directly with who feels right for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <section id="consultants-grid" className="relative py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-3xl h-64 animate-pulse" />
              ))}
            </div>
          ) : consultants.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <h2 className="text-2xl font-bold text-slate-800 mb-3">Consultant Profiles Coming Soon</h2>
              <p className="text-slate-500 max-w-md mx-auto mb-8">
                We're setting up our team profiles. In the meantime, browse our programs.
              </p>
            </motion.div>
          ) : (() => {
            const filtered = consultants.filter(c => matchesFilters(c, filters));
            return (
              <>
                {/* Back + region chip */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <button
                    onClick={handleBackToRegions}
                    className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>
                  {selectedRegion && (
                    <span className="inline-flex items-center gap-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                      <span>📍 {selectedRegion}</span>
                      <button
                        onClick={handleClearRegion}
                        className="ml-0.5 hover:text-blue-900 transition-colors"
                        aria-label="Clear region filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>

                <ConsultantFilters filters={filters} onChange={setFilters} count={filtered.length} hideDestination={!!selectedRegion} />
                {filtered.length === 0 ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                    <p className="text-slate-500 text-lg">No consultants match the selected filters.</p>
                    <button onClick={() => setFilters({ degree: 'all', destination: 'all', area: 'all' })} className="mt-4 text-blue-600 hover:underline text-sm font-medium">Clear filters</button>
                  </motion.div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((c, i) => (
                      <ConsultantCard key={c.id} consultant={c} index={i} />
                    ))}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">Ready to get started?</h2>
          <p className="text-slate-500 mb-4">Browse the profiles above and book directly with the consultant that feels right for you.</p>
          <p className="text-slate-500 mb-6 text-sm">Not sure how to make an appointment? <a href="https://www.facebook.com/share/p/1D5v18oj6M/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Watch this guide on Facebook</a>.</p>
          <p className="text-slate-400 text-sm mt-4">Questions? Email us at <a href="mailto:bladexedu@gmail.com" className="text-blue-600 hover:underline">bladexedu@gmail.com</a></p>
        </div>
      </section>
    </div>
  );
}
