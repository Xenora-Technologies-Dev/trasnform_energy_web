import { ENERGY_NEWS_CONFIG } from '@/data/energy-news-config';
import { classifyArticle } from './classifyArticle';
import type { NormalizedCandidate, ScoredCandidate } from './types';

export function filterByRelevance(candidates: NormalizedCandidate[]): ScoredCandidate[] {
  return candidates
    .map(classifyArticle)
    .filter((candidate) => candidate.relevanceScore >= ENERGY_NEWS_CONFIG.minRelevanceScore)
    .sort((a, b) => b.relevanceScore - a.relevanceScore);
}
