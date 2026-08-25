import {
  ENERGY_NEWS_CONFIG,
  type InsightCategoryId,
  type InsightContentType,
  type InsightRegion,
} from '@/data/energy-news-config';
import type { NormalizedCandidate, ScoredCandidate } from './types';
import { getSource } from './sources';

const categorySignals: { id: InsightCategoryId; terms: string[] }[] = [
  { id: 'kerala-energy', terms: ['kerala', 'kseb', 'kserc', 'thrissur', 'kochi', 'kasargod'] },
  { id: 'india-energy', terms: ['cerc', 'cea', 'mnre', 'ministry of power', 'india', 'indian', 'ists', 'gna'] },
  { id: 'global-energy', terms: ['iea', 'irena', 'global', 'worldwide', 'international'] },
  { id: 'renewable-energy', terms: ['renewable', 'solar', 'wind', 'hybrid', 'green energy', 'rooftop'] },
  { id: 'power-markets', terms: ['market coupling', 'power market', 'scheduling', 'dispatch', 'iex', 'gdam', 'day-ahead', 'rtm', 'trading'] },
  { id: 'regulatory-affairs', terms: ['regulation', 'regulatory', 'commission', 'tariff', 'order', 'draft', 'serc', 'cerc', 'kserc'] },
  { id: 'power-infrastructure', terms: ['transmission', 'distribution', 'grid', 'substation', 'connectivity', 'hvdc', 'interconnection'] },
  { id: 'energy-transition', terms: ['energy transition', 'storage', 'bess', 'hydrogen', 'electrification', 'flexibility'] },
  { id: 'policy-regulation', terms: ['policy', 'gazette', 'ministry', 'guidelines', 'waiver'] },
  { id: 'technical-insights', terms: ['grid code', 'ride-through', 'safety audit', 'standards'] },
];

function haystack(candidate: NormalizedCandidate) {
  return `${candidate.title} ${candidate.description} ${candidate.sourceName}`.toLowerCase();
}

function countHits(text: string, terms: readonly string[]) {
  return terms.reduce((count, term) => (text.includes(term) ? count + 1 : count), 0);
}

export function suggestRegion(candidate: NormalizedCandidate): InsightRegion {
  const text = haystack(candidate);
  if (candidate.region) return candidate.region;
  if (countHits(text, ['kerala', 'kseb', 'kserc']) > 0) return 'kerala';
  if (countHits(text, ['cerc', 'cea', 'mnre', 'india', 'indian', 'ists']) > 0) return 'india';
  return 'global';
}

export function suggestCategories(candidate: NormalizedCandidate): InsightCategoryId[] {
  const text = haystack(candidate);
  const region = suggestRegion(candidate);
  const hits = categorySignals
    .map((signal) => ({ id: signal.id, score: countHits(text, signal.terms) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((item) => item.id);

  const regionCategory: InsightCategoryId =
    region === 'kerala' ? 'kerala-energy' : region === 'india' ? 'india-energy' : 'global-energy';

  return Array.from(new Set([regionCategory, ...hits])).slice(0, 4);
}

export function suggestContentType(candidate: NormalizedCandidate): InsightContentType {
  const text = haystack(candidate);
  if (countHits(text, ['market coupling', 'scheduling', 'dispatch', 'power exchange', 'day-ahead']) > 0) {
    return 'market-update';
  }
  if (countHits(text, ['regulation', 'draft', 'commission', 'tariff', 'order', 'grid code']) > 0) {
    return 'regulatory-update';
  }
  return 'news';
}

export function scoreRelevance(candidate: NormalizedCandidate): number {
  const text = haystack(candidate);
  const { high, medium, low, block } = ENERGY_NEWS_CONFIG.relevanceKeywords;
  if (countHits(text, block) > 0) return 0;

  const source = getSource(candidate.sourceId);
  const sourceBoost = source ? Math.round((source.priority / 100) * ENERGY_NEWS_CONFIG.sourcePriorityWeight) : 0;
  const highHits = countHits(text, high);
  const mediumHits = countHits(text, medium);
  const lowHits = countHits(text, low);

  let score = sourceBoost + highHits * 14 + mediumHits * 6 - lowHits * 10;
  if (candidate.publishedAt) {
    const ageHours = (Date.now() - candidate.publishedAt.valueOf()) / 36e5;
    if (ageHours <= ENERGY_NEWS_CONFIG.freshness.immediateHours) score += 8;
    else if (ageHours <= ENERGY_NEWS_CONFIG.freshness.recentDays * 24) score += 4;
    else if (ageHours > ENERGY_NEWS_CONFIG.freshness.staleDays * 24) score -= 12;
  }

  return Math.max(0, Math.min(100, score));
}

export function classifyArticle(candidate: NormalizedCandidate): ScoredCandidate {
  return {
    ...candidate,
    relevanceScore: scoreRelevance(candidate),
    suggestedRegion: suggestRegion(candidate),
    suggestedCategories: suggestCategories(candidate),
    suggestedType: suggestContentType(candidate),
  };
}
