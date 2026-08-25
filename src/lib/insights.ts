import { getCollection, type CollectionEntry } from 'astro:content';
import { getService, type Service } from '@/data/services';
import {
  ENERGY_NEWS_CONFIG,
  getCategory,
  getTopicCategories,
  relatedServiceMap,
  type InsightCategoryId,
} from '@/data/energy-news-config';

export type InsightEntry = CollectionEntry<'insights'>;

export async function getRenderableInsights() {
  try {
    return (await getCollection('insights')).filter((entry) => !entry.data.draft);
  } catch {
    return [];
  }
}

export async function getPublishedInsights() {
  const entries = await getRenderableInsights();
  return entries.filter((entry) => entry.data.indexable !== false && !isThinInsight(entry));
}

export async function getIndexableInsights() {
  return getPublishedInsights();
}

export function insightPath(entry: InsightEntry) {
  return `/insights/${entry.id}`;
}

export function formatInsightDate(value: Date) {
  return value.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function primaryCategory(entry: InsightEntry) {
  const id = entry.data.categories[0];
  return getCategory(id) ?? getCategory('india-energy');
}

export function categoryLabels(entry: InsightEntry) {
  return entry.data.categories.map((id) => getCategory(id)?.label).filter(Boolean) as string[];
}

function recencyRank(entry: InsightEntry) {
  const ageHours = (Date.now() - entry.data.pubDate.valueOf()) / 36e5;
  if (ageHours <= ENERGY_NEWS_CONFIG.freshness.immediateHours) return 0;
  if (ageHours <= ENERGY_NEWS_CONFIG.freshness.recentDays * 24) return 1;
  if (ageHours <= ENERGY_NEWS_CONFIG.freshness.staleDays * 24) return 2;
  return 3;
}

export function sortInsights(entries: InsightEntry[]) {
  return [...entries].sort((a, b) => {
    if (a.data.archived !== b.data.archived) return a.data.archived ? 1 : -1;
    const recency = recencyRank(a) - recencyRank(b);
    if (recency !== 0) return recency;
    return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
  });
}

export function featuredInsight(entries: InsightEntry[]) {
  const sorted = sortInsights(entries);
  return sorted.find((entry) => entry.data.featured && !entry.data.archived) ?? sorted[0];
}

export function latestInsights(entries: InsightEntry[], count = ENERGY_NEWS_CONFIG.maxLatestArticles as number) {
  return sortInsights(entries.filter((entry) => !entry.data.archived)).slice(0, count);
}

export function filterInsights(
  entries: InsightEntry[],
  options: { category?: string; query?: string },
) {
  const query = options.query?.trim().toLowerCase();
  return entries.filter((entry) => {
    if (options.category && options.category !== 'all') {
      const matchesCategory = entry.data.categories.includes(options.category as InsightCategoryId);
      const matchesRegion =
        (options.category === 'kerala-energy' && entry.data.region === 'kerala') ||
        (options.category === 'india-energy' && entry.data.region === 'india') ||
        (options.category === 'global-energy' && entry.data.region === 'global');
      if (!matchesCategory && !matchesRegion) return false;
    }
    if (!query) return true;
    const haystack = [
      entry.data.title,
      entry.data.description,
      entry.data.summary,
      ...entry.data.categories,
      ...entry.data.tags,
      entry.data.sourceName,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(query);
  });
}

export function topicSlugAvailable(slug: string, entries: InsightEntry[]) {
  return !entries.some((entry) => entry.id === slug);
}

export function insightsForTopic(entries: InsightEntry[], topicId: string) {
  const category = getCategory(topicId);
  if (!category) return [];
  return sortInsights(
    entries.filter((entry) => {
      if (entry.data.categories.includes(topicId as InsightCategoryId)) return true;
      if ('region' in category && category.region) return entry.data.region === category.region;
      return false;
    }),
  );
}

export function getIndexableTopics(entries: InsightEntry[]) {
  return getTopicCategories()
    .map((topic) => {
      const articles = insightsForTopic(entries, topic.id);
      return { ...topic, articles };
    })
    .filter(
      (topic) =>
        topic.articles.length >= ENERGY_NEWS_CONFIG.minArticlesForTopicPage &&
        topicSlugAvailable(topic.id, entries),
    );
}

function overlapScore(a: InsightEntry, b: InsightEntry) {
  const cats = new Set(a.data.categories);
  const tags = new Set(a.data.tags.map((tag) => tag.toLowerCase()));
  let score = 0;
  b.data.categories.forEach((id) => {
    if (cats.has(id)) score += 3;
  });
  b.data.tags.forEach((tag) => {
    if (tags.has(tag.toLowerCase())) score += 2;
  });
  if (a.data.region === b.data.region) score += 1;
  if (a.data.contentType === b.data.contentType) score += 1;
  return score;
}

export function relatedInsights(entry: InsightEntry, pool: InsightEntry[], count = ENERGY_NEWS_CONFIG.relatedArticleCount) {
  return pool
    .filter((item) => item.id !== entry.id && !item.data.archived)
    .map((item) => ({ item, score: overlapScore(entry, item) }))
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score || b.item.data.pubDate.valueOf() - a.item.data.pubDate.valueOf())
    .slice(0, count)
    .map((row) => row.item);
}

export function relatedServicesForInsight(entry: InsightEntry): Service[] {
  if (entry.data.relatedServiceSlugs?.length) {
    return entry.data.relatedServiceSlugs
      .map((slug) => getService(slug))
      .filter((service): service is Service => Boolean(service))
      .slice(0, ENERGY_NEWS_CONFIG.relatedServiceCount);
  }

  const slugs = new Set<string>();
  entry.data.categories.forEach((id) => {
    relatedServiceMap[id]?.forEach((slug) => slugs.add(slug));
  });
  relatedServiceMap[entry.data.contentType]?.forEach((slug) => slugs.add(slug));
  if (entry.data.tags.some((tag) => /safety|audit/i.test(tag))) {
    relatedServiceMap.safety?.forEach((slug) => slugs.add(slug));
  }
  if (entry.data.tags.some((tag) => /storage|bess/i.test(tag))) {
    relatedServiceMap.storage?.forEach((slug) => slugs.add(slug));
  }

  return [...slugs]
    .map((slug) => getService(slug))
    .filter((service): service is Service => Boolean(service))
    .slice(0, ENERGY_NEWS_CONFIG.relatedServiceCount);
}

export function jsonLdType(entry: InsightEntry) {
  return entry.data.contentType === 'news' ? 'NewsArticle' : 'Article';
}

export function isThinInsight(entry: InsightEntry) {
  const { minSummaryChars, minWhyItMattersChars } = ENERGY_NEWS_CONFIG.copyright;
  return (
    entry.data.summary.trim().length < minSummaryChars ||
    entry.data.whyItMatters.trim().length < minWhyItMattersChars
  );
}
