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
    <div className="backdrop-blur-md bg-slate-900/80 border border-white/10 rounded-2xl px-6 py-4 mb-10 shadow-lg">
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 text-white/60 text-sm font-semibold shrink-0">
          <SlidersHorizontal className="w-4 h-4 text-blue-400" />
          Filter:
        </div>
        <div className="flex flex-wrap gap-3 flex-1">
          {filterGroups.map((group) => (
            <div key={group.key} className="relative">
              <select
                value={filters[group.key] || 'all'}
                onChange={(e) => handleChange(group.key, e.target.value)}
                className="bg-white/5 border border-white/10 text-white text-sm font-medium px-5 py-2.5 pr-9 rounded-xl appearance-none hover:bg-white/10 focus:outline-none focus:ring-1 focus:ring-blue-400/50 cursor-pointer transition-all"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                }}
              >
                <option value="all" className="bg-slate-800">{group.label}</option>
                {group.options.map((opt) => (
                  <option key={opt} value={opt} className="bg-slate-800">{opt}</option>
                ))}
              </select>
            </div>
          ))}
        </div>
        {hasActiveFilters && (
          <button
            onClick={() => onChange({ degree: 'all', destination: 'all', area: 'all' })}
            className="text-xs text-blue-400 hover:text-white font-medium transition-colors shrink-0"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}