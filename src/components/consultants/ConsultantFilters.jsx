import React from 'react';
import { Search, X } from 'lucide-react';

const filterGroups = [
  {
    key: 'degree',
    label: 'Degree Level',
    options: ['Undergraduate', "Master's", 'PhD', 'Pre-University / High School'],
  },
  {
    key: 'destination',
    label: 'Destination',
    options: ['North America', 'Europe', 'United Kingdom', 'Asia', 'Oceania'],
  },
  {
    key: 'area',
    label: 'Area of Study',
    options: [
      'Medicine & Health Sciences',
      'Engineering & Architecture',
      'Business & Finance',
      'Computer Science & IT',
      'Social Science and Education',
      'Pre-University',
    ],
  },
];

export default function ConsultantFilters({
  filters,
  onChange,
  search = '',
  onSearchChange,
  count,
  hideDestination = false,
  hideArea = false,
}) {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const hasActiveDropdowns = Object.values(filters).some((v) => v !== 'all');
  const hasSearch = Boolean(search.trim());
  const hasActiveFilters = hasActiveDropdowns || hasSearch;

  const clearAll = () => {
    onChange({ degree: 'all', destination: 'all', area: 'all' });
    onSearchChange?.('');
  };

  return (
    <div className="mb-8 space-y-5">
      {/* Primary: name search */}
      <div className="relative">
        <label htmlFor="consultant-name-search" className="sr-only">
          Search consultants by name
        </label>
        <Search
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
          aria-hidden
        />
        <input
          id="consultant-name-search"
          type="text"
          value={search}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search by consultant name…"
          autoComplete="off"
          aria-label="Search consultants by name"
          className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-12 pr-12 text-base text-slate-800 shadow-sm placeholder:text-slate-400 transition-[border-color,box-shadow] focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        {hasSearch && (
          <button
            type="button"
            onClick={() => onSearchChange?.('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Secondary: dropdown filters */}
      <div className="flex flex-wrap items-end gap-6 border-b border-slate-200 pb-4">
        {filterGroups
          .filter((g) => !(hideDestination && g.key === 'destination') && !(hideArea && g.key === 'area'))
          .map((group) => (
            <div key={group.key} className="flex min-w-[120px] flex-col gap-1">
              <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                {group.label}
              </label>
              <div className="relative">
                <select
                  value={filters[group.key] || 'all'}
                  onChange={(e) => handleChange(group.key, e.target.value)}
                  className="w-full cursor-pointer appearance-none border-b border-slate-300 bg-transparent pb-1 pr-5 text-sm text-slate-700 transition-colors focus:border-blue-500 focus:outline-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 2px center',
                  }}
                >
                  <option value="all">All</option>
                  {group.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

        <div className="flex-1" />

        <div className="mb-1 flex items-end gap-4">
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="text-xs font-medium text-blue-500 transition-colors hover:text-blue-700"
            >
              Clear
            </button>
          )}
          {count != null && (
            <span className="text-xs text-slate-400">
              {count} consultant{count !== 1 ? 's' : ''}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
