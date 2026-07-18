import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useConsultants } from '@/hooks/useConsultants';

const PICKER_EASE = [0.65, 0, 0.35, 1];
const pickerStepMotion = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.28, ease: PICKER_EASE },
};

const pickerCardsContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.06 },
  },
};

const pickerCardItem = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.22, ease: PICKER_EASE } },
};
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import ConsultantCard from '@/components/consultants/ConsultantCard';
import ConsultantFilters from '@/components/consultants/ConsultantFilters';
import ChoosePathCard from '@/components/consultants/ChoosePathCard';
import SpaceSectionBackground from '@/components/shared/SpaceSectionBackground';
import imgAsia from '@/assests/region-asia.jpg';
import imgNorthAmerica from '@/assests/region-north-america.jpg';
import imgUnitedKingdom from '@/assests/region-united-kingdom.jpg';
import imgEurope from '@/assests/region-europe.jpg';
import imgOceania from '@/assests/region-oceania.png';
import imgMedicine from '@/assests/area-medicine.jpg';
import imgEngineering from '@/assests/area-engineering.jpg';
import imgBusiness from '@/assests/area-business.jpg';
import imgCompSci from '@/assests/area-compsci.jpg';
import imgArts from '@/assests/area-arts.jpg';
import imgHighSchool from '@/assests/area-highschool.jpg';
import { sectionBadgeClass, solidButton } from '@/utils/glassStyles';

const DESTINATION_MAP = {
  'North America': ['canada', 'usa', 'us', 'united states'],
  // covers Nyan, Nang, Wutt, Cherry, Wai Phyo, Hnaine

  'Europe': ['europe', 'germany', 'france', 'netherlands', 'italy',
             'hungary', 'poland', 'czech', 'czechia', 'slovakia', 'finland', 'switzerland'],
  // added: hungary (Yati), czech/slovakia (Thet Htar, Cho Myo), finland (Yupar), switzerland (Chaw)

  'United Kingdom': ['uk', 'united kingdom'],

  'Asia': ['asia', 'singapore', 'japan', 'korea', 'thailand',
           'malaysia', 'hong kong', 'india', 'china', 'taiwan'],
  // added: korea (Thuta), thailand (Nyan), malaysia (Shin Lin Let), hong kong (Wai Phyo), china (Ye Linn), taiwan (Chan Thar)

  'Oceania': ['oceania', 'australia', 'new zealand', 'nz'],
};

/** Keywords derived from active consultants' major_subject_expertise values. */
const AREA_MAP = {
  'Medicine & Health Sciences': [
    'medicine', 'medical school', 'medical related', 'med-related', 'pre-med',
    'biochemistry', 'molecular biology', 'cell and molecular', 'genetics', 'organic chemistry',
    'biosciences', 'biotechnology', 'biotech', 'health sciences', 'kinesiology',
    'immunology', 'developmental biology', 'transplant', 'clinical research', 'basic science research',
    // ponytail: not "environmental science" — that pulled energy/materials people into Medicine
    'chemical and environmental', 'healthcare pathways', 'healthcare',
  ],
  'Engineering & Architecture': [
    'engineering', 'mechanical engineering', 'biomedical engineering', 'general engineering',
    // software engineering lives under CS & IT only
    'engineering related', 'architecture', 'sustainable energy',
    'materials science', 'computational materials', 'systems engineering',
  ],
  'Business & Finance': [
    'business', 'finance', 'management', 'commerce', 'accounting', 'marketing',
    'business administration', 'business analytics', 'business & management', 'mba', 'bcom', 'btm',
  ],
  'Computer Science & IT': [
    'computer science', 'software engineering', 'data science', 'information systems',
    'information technology', 'technology and data', 'computing', 'healthcare analytics',
  ],
  'Social Science and Education': [
    'french', 'linguistics', 'fle', 'language teaching', 'delf', 'dalf',
    'political science', 'public administration', 'humanities', 'literature', 'history', 'philosophy',
    'applied linguistics', 'international organizations',
  ],
  'Pre-University': [
    'ib diploma', 'foundation year', 'pre-u', 'pre-university', 'a-level', 'high school', 'uwc',
    'studienkolleg', 'singapore education system',
  ],
};

/** Exact-name overrides: still show on card majors, but not under this Subject-first filter. */
const AREA_FILTER_EXCLUDES = {
  'Engineering & Architecture': ['Phoo Pwint Thaung Sein'],
  'Business & Finance': [
    'Yoon Su Lin',
    'Pyae Phyo Thu @ Rachel',
    'Aung Khant Min @ Jimmy',
  ],
  'Computer Science & IT': ['Aung Khant Min @ Jimmy'],
};

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function subjectMatchesStudyKeyword(subject, keyword) {
  const k = keyword.toLowerCase();
  const s = subject.toLowerCase();

  if (k === 'healthcare') return s === 'healthcare';
  if (k === 'engineering') {
    // "Software Engineering" is CS-only; bare "engineering" must not swallow it
    return (s === 'engineering' || /\bengineering\b/.test(s))
      && !/partial in medical/.test(s)
      && !/software engineering/.test(s);
  }
  if (k.length <= 4) return new RegExp(`\\b${escapeRegex(k)}\\b`).test(s);
  return s.includes(k);
}

function majorMatchesStudyArea(majors, keywords) {
  const subjects = majors || [];
  return keywords.some((keyword) =>
    subjects.some((subject) => subjectMatchesStudyKeyword(subject, keyword)),
  );
}

function isExcludedFromArea(consultant, area) {
  const excludes = AREA_FILTER_EXCLUDES[area];
  if (!excludes?.length) return false;
  const name = consultant.name || '';
  return excludes.some((n) => name === n);
}

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

const AREA_KEYS = [
  'Medicine & Health Sciences',
  'Engineering & Architecture',
  'Business & Finance',
  'Computer Science & IT',
  'Social Science and Education',
  'Pre-University',
];

const AREA_META = {
  'Medicine & Health Sciences': { subtitle: 'Medicine · Biosciences · Health · and more', img: imgMedicine },
  'Engineering & Architecture': { subtitle: 'Mechanical · Biomedical · Architecture · and more', img: imgEngineering },
  'Business & Finance': { subtitle: 'Commerce · Finance · Marketing · and more', img: imgBusiness },
  'Computer Science & IT': { subtitle: 'Software · Data Science · IT · and more', img: imgCompSci },
  'Social Science and Education': { subtitle: 'French · Linguistics · Social Sciences · and more', img: imgArts },
  'Pre-University': { subtitle: 'IB · Foundation · A-Level · and more', img: imgHighSchool },
};

function StudyPickerCard({ label, subtitle, image, gradient, onClick, tall = false, cta = 'View Consultants' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex flex-col items-start justify-between rounded-2xl p-6 ${tall ? 'h-[220px]' : 'h-[180px]'} w-full text-left overflow-hidden transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
    >
      {image ? (
        <span
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
          style={{ backgroundImage: `url(${image})` }}
          aria-hidden
        />
      ) : (
        <span className={`absolute inset-0 bg-gradient-to-br ${gradient} transition-transform duration-500 group-hover:scale-105`} aria-hidden />
      )}
      <span className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors" aria-hidden />

      <span className="relative flex flex-col gap-1">
        <span className="text-white text-lg font-semibold leading-snug drop-shadow">{label}</span>
        <span
          className="text-xs font-medium bg-clip-text text-transparent"
          style={{
            backgroundImage: 'linear-gradient(270deg, #ffffff, #9ca3af, #d1d5db, #6b7280, #ffffff)',
            backgroundSize: '300% 300%',
            animation: 'btn-gradient 4s ease infinite',
          }}
        >
          {subtitle}
        </span>
      </span>

      <span className={`relative inline-flex items-center ${solidButton.navyHoverHero} ${solidButton.sm}`}>
        {cta}
        <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-[transform,margin] duration-500 ease-out group-hover:translate-x-2 group-hover:scale-110" />
      </span>
    </button>
  );
}

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
    if (isExcludedFromArea(consultant, area)) return false;
    const keywords = AREA_MAP[area] || [];
    if (!majorMatchesStudyArea(consultant.major_subject_expertise, keywords)) return false;
  }

  return true;
}

export default function Consultants() {
  const { data: consultants = [], isLoading: loading } = useConsultants();
  const location = useLocation();
  const [filters, setFilters] = useState({ degree: 'all', destination: 'all', area: 'all' });
  const [showRegionPicker, setShowRegionPicker] = useState(true);
  const [pickerStep, setPickerStep] = useState('main');
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [shuffleSeed, setShuffleSeed] = useState(0);

  // Re-clicking "Consultants" in the nav doesn't remount this page,
  // so reset to the choose-path picker on every navigation event.
  useEffect(() => {
    setShowRegionPicker(true);
    setPickerStep('main');
    setSelectedRegion(null);
    setSelectedArea(null);
    setFilters({ degree: 'all', destination: 'all', area: 'all' });
  }, [location.key]);

  const displayedConsultants = useMemo(() => {
    if (shuffleSeed === 0) return consultants;
    return [...consultants].sort(() => Math.random() - 0.5);
  }, [consultants, shuffleSeed]);

  const bumpShuffle = () => setShuffleSeed((n) => n + 1);

  const handleRegionClick = (regionKey) => {
    bumpShuffle();
    setSelectedRegion(regionKey);
    setFilters({ degree: 'all', destination: regionKey, area: 'all' });
    setShowRegionPicker(false);
  };

  const handleAreaClick = (areaKey) => {
    bumpShuffle();
    setSelectedArea(areaKey);
    setFilters({ degree: 'all', destination: 'all', area: areaKey });
    setShowRegionPicker(false);
  };

  const handleBrowseAll = () => {
    bumpShuffle();
    setSelectedRegion(null);
    setSelectedArea(null);
    setFilters({ degree: 'all', destination: 'all', area: 'all' });
    setShowRegionPicker(false);
  };

  const handleClearRegion = () => {
    setSelectedRegion(null);
    setFilters(prev => ({ ...prev, destination: 'all' }));
  };

  const handleClearArea = () => {
    setSelectedArea(null);
    setFilters(prev => ({ ...prev, area: 'all' }));
  };

  const handleBackToPicker = () => {
    setShowRegionPicker(true);

    if (selectedArea) {
      setPickerStep('what');
      setSelectedArea(null);
      setFilters({ degree: 'all', destination: 'all', area: 'all' });
      return;
    }

    if (selectedRegion) {
      setPickerStep('where');
      setSelectedRegion(null);
      setFilters({ degree: 'all', destination: 'all', area: 'all' });
      return;
    }

    setPickerStep('main');
    setFilters({ degree: 'all', destination: 'all', area: 'all' });
  };

  if (showRegionPicker) {
    return (
      <div className="min-h-screen bg-slate-50">
        {/* Hero — kept intact */}
        <section className="relative pt-32 pb-28 bg-[#060b18] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <SpaceSectionBackground starDensity={1.2} />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <span className={sectionBadgeClass}>Meet the Team</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">Our Consultants</h1>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                Every consultant at BladeX Education has been through the study-abroad journey themselves. Browse their profiles and book directly with who feels right for you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Study picker */}
        <section className="py-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center"
          >
            {pickerStep !== 'main' && (
              <button
                type="button"
                onClick={() => setPickerStep('main')}
                className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-8 self-start max-w-4xl w-full"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            )}

            <AnimatePresence mode="wait">
              {pickerStep === 'main' && (
                <motion.div
                  key="picker-main"
                  className="w-full flex flex-col items-center"
                  {...pickerStepMotion}
                >
                  <ChoosePathCard onChoose={(side) => setPickerStep(side)} />
                </motion.div>
              )}

              {pickerStep === 'where' && (
                <motion.div
                  key="picker-where"
                  className="w-full flex flex-col items-center"
                  {...pickerStepMotion}
                >
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-[0.2em] mb-10">
                    Where are you looking to study?
                  </p>
                  <motion.div
                    className="w-full max-w-4xl flex flex-col gap-4"
                    variants={pickerCardsContainer}
                    initial="hidden"
                    animate="show"
                  >
                    {REGION_LAYOUT.map((rowKeys, rowIdx) => (
                      <div
                        key={rowIdx}
                        className={`grid gap-4 w-full ${rowKeys.length === 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}`}
                      >
                        {rowKeys.map((regionKey) => {
                          const region = REGION_META[regionKey];
                          return (
                            <motion.div key={regionKey} variants={pickerCardItem}>
                              <StudyPickerCard
                                label={region.label}
                                subtitle={region.subtitle}
                                image={region.img}
                                onClick={() => handleRegionClick(regionKey)}
                                tall={rowKeys.length === 2}
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {pickerStep === 'what' && (
                <motion.div
                  key="picker-what"
                  className="w-full flex flex-col items-center"
                  {...pickerStepMotion}
                >
                  <p className="text-slate-500 text-xs font-semibold uppercase tracking-[0.2em] mb-10">
                    What would you like to study?
                  </p>
                  <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl"
                    variants={pickerCardsContainer}
                    initial="hidden"
                    animate="show"
                  >
                    {AREA_KEYS.map((areaKey) => {
                      const area = AREA_META[areaKey];
                      return (
                        <motion.div key={areaKey} variants={pickerCardItem}>
                          <StudyPickerCard
                            label={areaKey}
                            subtitle={area.subtitle}
                            image={area.img}
                            onClick={() => handleAreaClick(areaKey)}
                          />
                        </motion.div>
                      );
                    })}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.2 }}
              className="mt-10 flex flex-col items-center gap-1.5"
            >
              <p className="text-slate-400 text-sm">Not sure what to choose?</p>
              <button
                type="button"
                onClick={handleBrowseAll}
                className="text-slate-400 hover:text-slate-700 text-sm transition-colors underline underline-offset-4"
              >
                Browse all consultants →
              </button>
            </motion.div>
          </motion.div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative pt-32 pb-28 bg-[#060b18] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <SpaceSectionBackground starDensity={1.2} />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className={sectionBadgeClass}>Meet the Team</span>
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
            const filtered = displayedConsultants.filter(c => matchesFilters(c, filters));
            return (
              <>
                {/* Back + region chip */}
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <button
                    onClick={handleBackToPicker}
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
                  {selectedArea && (
                    <span className="inline-flex items-center gap-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-medium px-3 py-1 rounded-full">
                      <span>📚 {selectedArea}</span>
                      <button
                        onClick={handleClearArea}
                        className="ml-0.5 hover:text-indigo-900 transition-colors"
                        aria-label="Clear area filter"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </div>

                <ConsultantFilters filters={filters} onChange={setFilters} count={filtered.length} hideDestination={!!selectedRegion} hideArea={!!selectedArea} />
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
