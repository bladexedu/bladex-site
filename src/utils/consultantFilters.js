export const DESTINATION_MAP = {
  'North America': ['canada', 'usa', 'us', 'united states'],
  Europe: [
    'europe', 'germany', 'france', 'netherlands', 'italy',
    'hungary', 'poland', 'czech', 'czechia', 'slovakia', 'finland', 'switzerland',
    'austria', 'georgia',
  ],
  'United Kingdom': ['uk', 'united kingdom', 'ireland'],
  Asia: [
    'asia', 'singapore', 'japan', 'korea', 'thailand',
    'malaysia', 'hong kong', 'india', 'china', 'taiwan',
  ],
  Oceania: ['oceania', 'australia', 'new zealand', 'nz'],
};

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

export function matchesFilters(consultant, filters, search = '') {
  const { degree, destination, area } = filters;
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
    const keywords = DESTINATION_MAP[destination] || [];
    const region = (consultant.region || '').toLowerCase();
    const country = (consultant.country_of_expertise || '').toLowerCase();
    if (!keywords.some((k) => {
      const re = new RegExp(`\\b${escapeRegex(k)}\\b`);
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
