import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  AREA_MAP,
  EMPTY_FILTERS,
  consultantCountries,
  getCountryOptions,
  matchesFilters,
  majorMatchesStudyArea,
  subjectMatchesStudyKeyword,
} from './consultantFilters.js';

const withFilters = (overrides) => ({ ...EMPTY_FILTERS, ...overrides });

describe('subjectMatchesStudyKeyword', () => {
  it('keeps software engineering out of bare engineering', () => {
    assert.equal(subjectMatchesStudyKeyword('Software Engineering', 'engineering'), false);
    assert.equal(subjectMatchesStudyKeyword('Mechanical Engineering', 'engineering'), true);
    assert.equal(subjectMatchesStudyKeyword('Genetic engineering', 'engineering'), false);
  });

  it('matches economics in Business area keywords', () => {
    assert.equal(subjectMatchesStudyKeyword('Economics', 'economics'), true);
  });

  it('uses word boundaries for short keywords', () => {
    assert.equal(subjectMatchesStudyKeyword('Business', 'bus'), false);
    assert.equal(subjectMatchesStudyKeyword('Pre-med', 'pre-med'), true);
  });
});

describe('majorMatchesStudyArea', () => {
  it('matches when any major hits a keyword list', () => {
    assert.equal(
      majorMatchesStudyArea(['French'], AREA_MAP['Social Science and Education']),
      true,
    );
    assert.equal(
      majorMatchesStudyArea(['Mechanical Engineering'], AREA_MAP['Engineering & Architecture']),
      true,
    );
  });
});

describe('matchesFilters', () => {
  const sett = {
    name: 'Sett Myat Noe',
    region: '',
    country_of_expertise: 'United States',
    major_subject_expertise: ['Economics', 'Computer Science'],
    area_of_expertise: ['University Admissions (Bachelor)'],
  };

  it('finds US consultants under North America', () => {
    assert.equal(
      matchesFilters(sett, { degree: 'all', destination: 'North America', area: 'all' }),
      true,
    );
  });

  it('does not match unrelated destinations', () => {
    assert.equal(
      matchesFilters(sett, { degree: 'all', destination: 'Oceania', area: 'all' }),
      false,
    );
  });

  it('finds business majors under Business & Finance', () => {
    assert.equal(
      matchesFilters(sett, { degree: 'all', destination: 'all', area: 'Business & Finance' }),
      true,
    );
  });

  it('filters by name search', () => {
    assert.equal(
      matchesFilters(sett, { degree: 'all', destination: 'all', area: 'all' }, 'sett'),
      true,
    );
    assert.equal(
      matchesFilters(sett, { degree: 'all', destination: 'all', area: 'all' }, 'zzzz'),
      false,
    );
  });

  it('respects exact-name area exclusions', () => {
    const jimmy = {
      name: 'Aung Khant Min @ Jimmy',
      country_of_expertise: 'Poland, India',
      major_subject_expertise: ['Business', 'Political Science'],
      area_of_expertise: ['Graduate School'],
    };

    assert.equal(
      matchesFilters(jimmy, { degree: 'all', destination: 'all', area: 'Business & Finance' }),
      false,
    );
  });

  it('matches destination keywords with word boundaries in country strings', () => {
    const consultant = {
      name: 'Test Consultant',
      country_of_expertise: 'Canada, Europe (Germany, etc)',
      major_subject_expertise: ['Business'],
      area_of_expertise: [],
    };

    assert.equal(
      matchesFilters(consultant, { degree: 'all', destination: 'North America', area: 'all' }),
      true,
    );
    assert.equal(
      matchesFilters(consultant, { degree: 'all', destination: 'Europe', area: 'all' }),
      true,
    );
  });

  it('reaches Sweden, Malta, and Indonesia through their regions', () => {
    const soe = { name: 'Soe Nyi Nyi Kyaw', country_of_expertise: 'Sweden, Malta' };
    const htike = { name: 'Htike Chit Su', country_of_expertise: 'Indonesia' };

    assert.equal(matchesFilters(soe, withFilters({ destination: 'Europe' })), true);
    assert.equal(matchesFilters(htike, withFilters({ destination: 'Asia' })), true);
  });

  it('filters by country', () => {
    const poland = { name: 'May Thet Khine', country_of_expertise: 'Poland' };
    const germany = { name: 'Arkar Min Myat', country_of_expertise: 'Germany' };

    assert.equal(matchesFilters(poland, withFilters({ destination: 'Europe', country: 'Poland' })), true);
    assert.equal(matchesFilters(germany, withFilters({ destination: 'Europe', country: 'Poland' })), false);
  });
});

describe('consultantCountries', () => {
  it('resolves aliases to canonical country names', () => {
    assert.deepEqual(consultantCountries({ country_of_expertise: 'Korea, UK' }), [
      'United Kingdom',
      'South Korea',
    ]);
    assert.deepEqual(consultantCountries({ country_of_expertise: 'USA, Hong Kong' }), [
      'United States',
      'Hong Kong',
    ]);
    assert.deepEqual(
      consultantCountries({ country_of_expertise: 'Slovakia and Czech Republic' }),
      ['Czech Republic', 'Slovakia'],
    );
    assert.deepEqual(
      consultantCountries({ country_of_expertise: 'United Kingdom (England and Scotland)' }),
      ['United Kingdom'],
    );
  });

  it('ignores generic region words without a country', () => {
    assert.deepEqual(consultantCountries({ country_of_expertise: 'Europe' }), []);
  });
});

describe('getCountryOptions', () => {
  const roster = [
    { name: 'A', country_of_expertise: 'Poland' },
    { name: 'B', country_of_expertise: 'Poland, India' },
    { name: 'C', country_of_expertise: 'Germany' },
    { name: 'D', country_of_expertise: 'Japan' },
  ];

  it('lists only countries with consultants, with counts, sorted', () => {
    assert.deepEqual(getCountryOptions(roster), [
      { name: 'Germany', count: 1 },
      { name: 'India', count: 1 },
      { name: 'Japan', count: 1 },
      { name: 'Poland', count: 2 },
    ]);
  });

  it('narrows to the selected region', () => {
    assert.deepEqual(getCountryOptions(roster, 'Europe'), [
      { name: 'Germany', count: 1 },
      { name: 'Poland', count: 2 },
    ]);
  });
});
