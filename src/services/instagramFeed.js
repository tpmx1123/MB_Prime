const API_BASE = import.meta.env.VITE_API_URL;
const CACHE_KEY = 'mbprime_instagram_feed_v2';
const CACHE_TTL_MS = 15 * 60 * 1000;

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.data || !parsed?.cachedAt) return null;
    if (Date.now() - parsed.cachedAt > CACHE_TTL_MS) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache(data) {
  try {
    sessionStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ data, cachedAt: Date.now() })
    );
  } catch {
    // Ignore quota errors
  }
}

export const INSTAGRAM_PROFILE = {
  displayName: 'MB Prime Villas Plots',
  username: 'mbprimevillasplots',
  profileUrl: 'https://www.instagram.com/mbprimevillasplots/',
};

export async function getInstagramFeed({ forceRefresh = false } = {}) {
  if (!forceRefresh) {
    const cached = readCache();
    if (cached) return { ...cached, fromCache: true };
  }

  if (!API_BASE) {
    throw new Error('Instagram feed API is not configured');
  }

  const res = await fetch(`${API_BASE}/api/instagram/feed`);
  if (!res.ok) {
    const stale = readCache();
    if (stale) return { ...stale, fromCache: true, stale: true };
    throw new Error('Failed to load Instagram feed');
  }

  const data = await res.json();
  writeCache(data);
  return { ...data, fromCache: false };
}

export function formatFollowers(count) {
  if (count == null || Number.isNaN(Number(count))) return null;
  const n = Number(count);
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, '')}M followers`;
  if (n >= 10_000) return `${Math.round(n / 1_000)}K followers`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, '')}K followers`;
  return `${n.toLocaleString()} followers`;
}

export function truncateCaption(caption, maxLength = 120) {
  const text = (caption || '').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength).trim()}…`;
}
