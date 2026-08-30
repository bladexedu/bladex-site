import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/api/supabaseClient';

async function fetchActiveConsultants() {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('consultants')
    .select('*')
    .eq('is_active', true)
    .order('order')
    .limit(200);
  if (error) throw error;
  return data ?? [];
}

export function useConsultants() {
  return useQuery({
    queryKey: ['consultants', 'active'],
    queryFn: fetchActiveConsultants,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
  });
}
