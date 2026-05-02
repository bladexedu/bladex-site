import React from 'react';
import { SlidersHorizontal } from 'lucide-react';

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
    options: ['Medicine & Sciences', 'Engineering', 'Business & Management', 'Computer Science & IT', 'Arts & Humanities', 'High School Diploma'],
  },
];

export default function ConsultantFilters({ filters, onChange, count, hideDestination = false }) {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== 'all');

  return (
    <div className="mb-6">
      <div className="flex flex-wrap items-end gap-6 pb-4 border-b border-slate-200">
        {/* Filter icon */}
        <SlidersHorizontal className="w-4 h-4 text-slate-400 mb-1 shrink-0" />

        {/* Dropdowns */}
        {filterGroups.filter(g => !(hideDestination && g.key === 'destination')).map((group) => (
          <div key={group.key} className="flex flex-col gap-1 min-w-[120px]">
            <label className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
              {group.label}
            </label>
            <div className="relative">
              <select
                value={filters[group.key] || 'all'}
                onChange={(e) => handleChange(group.key, e.target.value)}
                className="w-full appearance-none bg-transparent border-b border-slate-300 text-slate-700 text-sm pb-1 pr-5 focus:outline-none focus:border-blue-500 cursor-pointer transition-colors"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 2px center',
                }}
              >
                <option value="all">All</option>
                {group.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        ))}

        {/* Spacer */}
        <div className="flex-1" />

        {/* Right side */}
        <div className="flex items-end gap-4 mb-1">
          {hasActiveFilters && (
            <button
              onClick={() => onChange({ degree: 'all', destination: 'all', area: 'all' })}
              className="text-xs text-blue-500 hover:text-blue-700 font-medium transition-colors"
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
