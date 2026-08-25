import type { InsightCategoryId, InsightContentType, InsightRegion } from '@/data/energy-news-config';

export type NewsSourceCategory = 'kerala-official' | 'india-official' | 'market' | 'international' | 'trade-press';

export type NewsSource = {
  id: string;
  name: string;
  homepage: string;
  feedUrl?: string;
  region: InsightRegion | 'multi';
  category: NewsSourceCategory;
  enabled: boolean;
  priority: number;
  notes?: string;
};

export type NormalizedCandidate = {
  title: string;
  url: string;
  canonicalUrl: string;
  sourceId: string;
  sourceName: string;
  publishedAt: Date | null;
  description: string;
  imageUrl?: string;
  region?: InsightRegion;
  tags: string[];
};

export type ScoredCandidate = NormalizedCandidate & {
  relevanceScore: number;
  suggestedRegion: InsightRegion;
  suggestedCategories: InsightCategoryId[];
  suggestedType: InsightContentType;
  duplicateOf?: string;
};

export type EditorialFrontmatter = {
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  sourceDate: string;
  draft: boolean;
  indexable: boolean;
  featured: boolean;
  archived: boolean;
  contentType: InsightContentType;
  region: InsightRegion;
  categories: InsightCategoryId[];
  tags: string[];
  sourceId: string;
  sourceName: string;
  sourceUrl: string;
  originalUrl: string;
  summary: string;
  whyItMatters: string;
  perspective?: string;
  relatedServiceSlugs?: string[];
};
