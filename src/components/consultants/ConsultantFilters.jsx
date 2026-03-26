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
    options: ['North America', 'Europe', 'Asia'],
  },
  {
    key: 'area',
    label: 'Area of Study',
    options: ['Medicine & Sciences', 'Engineering', 'Business & Management', 'Computer Science & IT', 'Arts & Humanities', 'High School Diploma'],
  },
];

export default function ConsultantFilters({ filters, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...filters, [key]: value });
  };

  const hasActiveFilters = Object.values(filters).some((v) => v !== 'all');

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl px-6 py-5 mb-10 shadow-lg">
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex items-center gap-2 text-white/70 text-sm font-semibold shrink-0 pb-1">
          <SlidersHorizontal className="w-4 h-4 text-blue-300" />
          Filter by:
        </div>
        <div className="flex flex-wrap gap-4 flex-1">
          {filterGroups.map((group) => (
            <div key={group.key} className="flex flex-col gap-1">
              <label className="text-xs text-white/50 font-medium uppercase tracking-wider px-1">{group.label}</label>
              <select
                value={filters[group.key] || 'all'}
                onChange={(e) => handleChange(group.key, e.target.value)}
                className="bg-white/10 border border-white/20 text-white text-sm rounded-xl px-3 py-2 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-400/50 cursor-pointer backdrop-blur-sm"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23cbd5e1' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 10px center',
                }}
              >
                <option value="all" className="bg-slate-800 text-white">All</option>
                {group.options.map((opt) => (
                  <option key={opt} value={opt} className="bg-slate-800 text-white">{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        {hasActiveFilters && (
          <button
            onClick={() => onChange({ degree: 'all', destination: 'all', area: 'all' })}
            className="text-xs text-blue-300 hover:text-white font-medium transition-colors shrink-0 pb-1"
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}