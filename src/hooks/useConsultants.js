import { useCallback, useEffect, useState } from 'react';
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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [fetchKey, setFetchKey] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      setIsError(false);
      try {
        const rows = await fetchActiveConsultants();
        if (!cancelled) setData(rows);
      } catch {
        if (!cancelled) {
          setIsError(true);
          setData([]);
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [fetchKey]);

  const refetch = useCallback(() => setFetchKey((n) => n + 1), []);

  return { data, isLoading, isError, refetch };
}
