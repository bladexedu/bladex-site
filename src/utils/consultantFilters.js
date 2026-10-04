export const EMPTY_FILTERS = { degree: 'all', destination: 'all', country: 'all', area: 'all' };

/** Generic words that place a consultant in a region without naming a country. */
const REGION_KEYWORDS = {
  'North America': [],
  Europe: ['europe'],
  'United Kingdom': [],
  Asia: ['asia'],
  Oceania: ['oceania'],
};

export const COUNTRIES = [
  { name: 'United States', region: 'North America', keywords: ['usa', 'us', 'united states'] },
  { name: 'Canada', region: 'North America', keywords: ['canada'] },
  { name: 'United Kingdom', region: 'United Kingdom', keywords: ['uk', 'united kingdom', 'england', 'scotland'] },
  { name: 'Ireland', region: 'United Kingdom', keywords: ['ireland'] },
  { name: 'Austria', region: 'Europe', keywords: ['austria'] },
  { name: 'Czech Republic', region: 'Europe', keywords: ['czech', 'czechia', 'czech republic'] },
  { name: 'Finland', region: 'Europe', keywords: ['finland'] },
  { name: 'France', region: 'Europe', keywords: ['france'] },
  { name: 'Georgia', region: 'Europe', keywords: ['georgia'] },
  { name: 'Germany', region: 'Europe', keywords: ['germany'] },
  { name: 'Hungary', region: 'Europe', keywords: ['hungary'] },
  { name: 'Italy', region: 'Europe', keywords: ['italy'] },
  { name: 'Malta', region: 'Europe', keywords: ['malta'] },
  { name: 'Netherlands', region: 'Europe', keywords: ['netherlands'] },
  { name: 'Poland', region: 'Europe', keywords: ['poland'] },
  { name: 'Romania', region: 'Europe', keywords: ['romania'] },
  { name: 'Slovakia', region: 'Europe', keywords: ['slovakia'] },
  { name: 'Sweden', region: 'Europe', keywords: ['sweden'] },
  { name: 'Switzerland', region: 'Europe', keywords: ['switzerland'] },
  { name: 'China', region: 'Asia', keywords: ['china'] },
  { name: 'Hong Kong', region: 'Asia', keywords: ['hong kong'] },
  { name: 'India', region: 'Asia', keywords: ['india'] },
  { name: 'Indonesia', region: 'Asia', keywords: ['indonesia'] },
  { name: 'Japan', region: 'Asia', keywords: ['japan'] },
  { name: 'Malaysia', region: 'Asia', keywords: ['malaysia'] },
  { name: 'Singapore', region: 'Asia', keywords: ['singapore'] },
  { name: 'South Korea', region: 'Asia', keywords: ['korea', 'south korea'] },
  { name: 'Taiwan', region: 'Asia', keywords: ['taiwan'] },
  { name: 'Thailand', region: 'Asia', keywords: ['thailand'] },
  { name: 'Australia', region: 'Oceania', keywords: ['australia'] },
  { name: 'New Zealand', region: 'Oceania', keywords: ['new zealand', 'nz'] },
];

export const DESTINATION_MAP = Object.fromEntries(
  Object.entries(REGION_KEYWORDS).map(([region, generic]) => [
    region,
    [...generic, ...COUNTRIES.filter((c) => c.region === region).flatMap((c) => c.keywords)],
  ]),
);

export const AREA_MAP = {
  'Medicine & Health Sciences': [
    'medicine', 'medical school', 'medical related', 'medical-related', 'med-related', 'pre-med',
    'dentistry', 'biomedical science', 'health-related', 'health related',
    'biochemistry', 'molecular biology', 'cell and molecular', 'genetics', 'organic chemistry',
    'biosciences', 'biotechnology', 'biotech', 'health sciences', 'kinesiology',
    'immunology', 'developmental biology', 'transplant', 'clinical research', 'basic science research',
    'chemical and environmental', 'healthcare pathways', 'healthcare',
  ],
  'Engineering & Architecture': [
    'engineering', 'mechanical engineering', 'biomedical engineering', 'general engineering',
    'engineering related', 'architecture', 'sustainable energy',
    'materials science', 'computational materials', 'systems engineering',
  ],
  'Business & Finance': [
    'business', 'finance', 'management', 'commerce', 'accounting', 'marketing',
    'business administration', 'business analytics', 'business & management', 'mba', 'bcom', 'btm',
    'economics',
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
    'ib diploma', 'foundation year', 'foundation', 'preparatory', 'pre-u', 'pre-university',
    'a-level', 'high school', 'uwc', 'studienkolleg', 'singapore education system',
  ],
};

export const AREA_FILTER_EXCLUDES = {
  'Engineering & Architecture': ['Phoo Pwint Thaung Sein'],
  'Business & Finance': [
    'Yoon Su Lin',
    'Pyae Phyo Thu @ Rachel',
    'Aung Khant Min @ Jimmy',
  ],
  'Computer Science & IT': ['Aung Khant Min @ Jimmy'],
};

const DEGREE_TAG_MAP = {
  Undergraduate: ['bachelor', 'college', 'college admission', 'university admission', 'pre-med'],
  "Master's": ['master', 'graduate school'],
  PhD: ['phd', 'graduate school', 'research proposal', 'research application', 'dphil'],
  'Pre-University / High School': ['highschool', 'high school', 'uwc', 'foundation', 'a-level', 'pre-u'],
};

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function subjectMatchesStudyKeyword(subject, keyword) {
  const k = keyword.toLowerCase();
  const s = subject.toLowerCase();

  if (k === 'healthcare') return s === 'healthcare';
  if (k === 'engineering') {
    return (s === 'engineering' || /\bengineering\b/.test(s))
      && !/partial in medical/.test(s)
      && !/software engineering/.test(s)
      && !/genetic engineering/.test(s);
  }
  if (k.length <= 4) return new RegExp(`\\b${escapeRegex(k)}\\b`).test(s);
  return s.includes(k);
}

export function majorMatchesStudyArea(majors, keywords) {
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

function locationText(consultant) {
  return `${consultant.region || ''} ${consultant.country_of_expertise || ''}`.toLowerCase();
}

function hasKeyword(text, keywords) {
  return keywords.some((k) => new RegExp(`\\b${escapeRegex(k)}\\b`).test(text));
}

export function consultantCountries(consultant) {
  const text = locationText(consultant);
  return COUNTRIES.filter((c) => hasKeyword(text, c.keywords)).map((c) => c.name);
}

/** Countries with at least one consultant, scoped to a region unless destination is 'all'. */
export function getCountryOptions(consultants, destination = 'all') {
  const counts = new Map();
  for (const consultant of consultants) {
    for (const name of consultantCountries(consultant)) {
      counts.set(name, (counts.get(name) || 0) + 1);
    }
  }
  return COUNTRIES
    .filter((c) => counts.has(c.name) && (destination === 'all' || c.region === destination))
    .map((c) => ({ name: c.name, count: counts.get(c.name) }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function matchesFilters(consultant, filters, search = '') {
  const { degree, destination, area, country = 'all' } = filters;
  const query = search.trim().toLowerCase();

  if (query) {
    const name = (consultant.name || '').toLowerCase();
    if (!name.includes(query)) return false;
  }

  if (degree !== 'all') {
    const keywords = DEGREE_TAG_MAP[degree] || [];
    const areaHelp = (consultant.area_of_expertise || []).join(' ').toLowerCase();
    const majorHelp = (consultant.major_subject_expertise || []).join(' ').toLowerCase();
    if (!keywords.some((k) => areaHelp.includes(k) || majorHelp.includes(k))) return false;
  }

  if (destination !== 'all') {
    if (!hasKeyword(locationText(consultant), DESTINATION_MAP[destination] || [])) return false;
  }

  if (country !== 'all') {
    if (!consultantCountries(consultant).includes(country)) return false;
  }

  if (area !== 'all') {
    if (isExcludedFromArea(consultant, area)) return false;
    const keywords = AREA_MAP[area] || [];
    if (!majorMatchesStudyArea(consultant.major_subject_expertise, keywords)) return false;
  }

  return true;
}
