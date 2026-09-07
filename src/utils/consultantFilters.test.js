import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import {
  AREA_MAP,
  matchesFilters,
  majorMatchesStudyArea,
  subjectMatchesStudyKeyword,
} from './consultantFilters.js';

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
});
