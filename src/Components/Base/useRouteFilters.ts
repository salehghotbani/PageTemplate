import { useLocation, useSearchParams } from 'react-router';
import { useEffect, useRef, useState } from 'react';

/** URL-owned filters survive refresh, copied links and browser navigation. */
export function useRouteFilters() {
  const [params, setParams] = useSearchParams();
  const { pathname } = useLocation();
  const [optimistic, setOptimistic] = useState(() => params.toString());
  const pending = useRef(params);
  const issued = useRef(new Set<string>());
  const previousPath = useRef(pathname);
  useEffect(() => {
    const incoming = params.toString();
    if (pathname === previousPath.current && issued.current.has(incoming)) {
      // Older own navigations can commit after a newer keystroke. Acknowledge
      // them without rolling back the input or the next compound filter patch.
      issued.current.delete(incoming);
      if (incoming === pending.current.toString()) issued.current.clear();
      return;
    }
    previousPath.current = pathname;
    issued.current.clear();
    pending.current = params;
    setOptimistic(incoming);
  }, [params, pathname]);
  const visible = new URLSearchParams(optimistic);
  const getFilter = (key: string, fallback = '') =>
    visible.get(key) ?? fallback;
  const setFilters = (patch: Record<string, string | number | null>) => {
    // React Router's callback setter does not queue updates like React state.
    // Compose rapid changes before navigation has committed the next render.
    const next = new URLSearchParams(pending.current);
    for (const [key, value] of Object.entries(patch)) {
      if (value === null || value === '') next.delete(key);
      else next.set(key, String(value));
    }
    pending.current = next;
    issued.current.add(next.toString());
    setOptimistic(next.toString());
    setParams(next, { replace: true });
  };
  return { getFilter, setFilters, search: optimistic };
}
