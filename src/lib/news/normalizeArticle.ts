import type { NewsSource, NormalizedCandidate } from './types';

export function slugifyHeadline(value: string) {
  return value
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export function normalizeHeadline(value: string) {
  return value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function canonicalizeUrl(raw: string) {
  try {
    const url = new URL(raw);
    url.hash = '';
    [
      'utm_source',
      'utm_medium',
      'utm_campaign',
      'utm_term',
      'utm_content',
      'fbclid',
      'gclid',
    ].forEach((param) => url.searchParams.delete(param));
    url.hostname = url.hostname.replace(/^www\./, '');
    if (url.pathname.endsWith('/') && url.pathname !== '/') {
      url.pathname = url.pathname.slice(0, -1);
    }
    return url.toString();
  } catch {
    return raw.trim();
  }
}

export function stripHtml(value: string) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

export function parseRssDate(value?: string) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.valueOf()) ? null : parsed;
}

export function normalizeArticle(input: {
  title: string;
  url: string;
  source: NewsSource;
  publishedAt?: string | Date | null;
  description?: string;
  imageUrl?: string;
}): NormalizedCandidate {
  const title = stripHtml(input.title).replace(/\s+/g, ' ').trim();
  const url = input.url.trim();
  return {
    title,
    url,
    canonicalUrl: canonicalizeUrl(url),
    sourceId: input.source.id,
    sourceName: input.source.name,
    publishedAt:
      input.publishedAt instanceof Date
        ? input.publishedAt
        : parseRssDate(typeof input.publishedAt === 'string' ? input.publishedAt : undefined),
    description: stripHtml(input.description ?? '').slice(0, 280),
    imageUrl: input.imageUrl,
    region: input.source.region === 'multi' ? undefined : input.source.region,
    tags: [],
  };
}
