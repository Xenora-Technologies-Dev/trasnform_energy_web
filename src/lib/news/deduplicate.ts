import type { NormalizedCandidate, ScoredCandidate } from './types';
import { normalizeHeadline } from './normalizeArticle';

function similarHeadlines(a: string, b: string) {
  const left = new Set(normalizeHeadline(a).split(' ').filter((word) => word.length > 3));
  const right = new Set(normalizeHeadline(b).split(' ').filter((word) => word.length > 3));
  if (left.size === 0 || right.size === 0) return false;
  let overlap = 0;
  left.forEach((word) => {
    if (right.has(word)) overlap += 1;
  });
  return overlap / Math.min(left.size, right.size) >= 0.72;
}

function sameDay(a?: Date | null, b?: Date | null) {
  if (!a || !b) return false;
  return a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
}

export function isDuplicate(candidate: NormalizedCandidate, existing: NormalizedCandidate) {
  if (candidate.canonicalUrl && candidate.canonicalUrl === existing.canonicalUrl) return true;
  if (normalizeHeadline(candidate.title) === normalizeHeadline(existing.title)) return true;
  if (
    similarHeadlines(candidate.title, existing.title) &&
    (candidate.sourceId === existing.sourceId || sameDay(candidate.publishedAt, existing.publishedAt))
  ) {
    return true;
  }
  return false;
}

export function deduplicate<T extends NormalizedCandidate>(candidates: T[]): T[] {
  const kept: T[] = [];
  for (const candidate of candidates) {
    const match = kept.find((entry) => isDuplicate(candidate, entry));
    if (!match) kept.push(candidate);
  }
  return kept;
}

export function markDuplicates(candidates: ScoredCandidate[], against: NormalizedCandidate[]): ScoredCandidate[] {
  return candidates.map((candidate) => {
    const match = against.find((entry) => isDuplicate(candidate, entry));
    return match ? { ...candidate, duplicateOf: match.canonicalUrl || match.title } : candidate;
  });
}
