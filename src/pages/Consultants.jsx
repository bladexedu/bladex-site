import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '@/api/supabaseClient';
import { ExternalLink } from 'lucide-react';
import ConsultantCard from '@/components/consultants/ConsultantCard';
import ConsultantFilters from '@/components/consultants/ConsultantFilters';

const DESTINATION_MAP = {
  'North America': ['canada', 'usa', 'us', 'united states', 'california', 'north america'],
  'UK': ['uk', 'united kingdom'],
  'Europe': ['europe', 'germany', 'france', 'netherlands'],
  'Asia': ['asia', 'singapore', 'japan', 'china'],
};

const AREA_MAP = {
  'Medicine & Sciences': ['medicine', 'biochemistry', 'science', 'biology', 'chemistry', 'health', 'biotech', 'stem'],
  'Engineering': ['engineering', 'mechanical', 'electrical', 'civil', 'chemical engineering'],
  'Business & Management': ['business', 'management', 'commerce', 'mba', 'analytics', 'bcom', 'btm'],
  'Computer Science & IT': ['computer', 'software', 'cs', 'it', 'data science', 'tech', 'information technology'],
  'Arts & Humanities': ['arts', 'humanities', 'social', 'literature', 'history', 'philosophy'],
};

const DEGREE_TAG_MAP = {
  "Undergraduate": 'degree:undergraduate',
  "Master's": 'degree:masters',
  'PhD': 'degree:phd',
  'Pre-University / High School': 'degree:highschool',
};

function matchesFilters(consultant, filters) {
  const { degree, destination, area } = filters;

  if (degree !== 'all') {
    const tag = DEGREE_TAG_MAP[degree];
    const canHelp = (consultant.can_help_with || []);
    if (!canHelp.includes(tag)) return false;
  }

  if (destination !== 'all') {
    const keywords = DESTINATION_MAP[destination] || [];
    const country = (consultant.current_country || '').toLowerCase();
    const canHelp = (consultant.can_help_with || []).join(' ').toLowerCase();
    if (!keywords.some(k => country.includes(k) || canHelp.includes(k))) return false;
  }

  if (area !== 'all') {
    const canHelp = (consultant.can_help_with || []).join(' ').toLowerCase();
    const keywords = AREA_MAP[area] || [];
    if (!keywords.some(k => canHelp.includes(k))) return false;
  }

  return true;
}

export default function Consultants() {
  const [consultants, setConsultants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ degree: 'all', destination: 'all', area: 'all' });

  useEffect(() => {
    const fetchConsultants = async () => {
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

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
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
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {!loading && consultants.length > 0 && (
            <ConsultantFilters filters={filters} onChange={setFilters} />
          )}
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
            return filtered.length === 0 ? (
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
            );
          })()}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-white border-t border-slate-100">
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