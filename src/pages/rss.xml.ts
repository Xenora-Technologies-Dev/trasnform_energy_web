import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { company } from '@/data/company';
import { ENERGY_NEWS_CONFIG } from '@/data/energy-news-config';
import { getPublishedInsights, insightPath } from '@/lib/insights';

export const GET: APIRoute = async (context) => {
  const insights = (await getPublishedInsights())
    .filter((entry) => !entry.data.archived)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 20);

  return rss({
    title: `${company.publicName} — Energy Intelligence`,
    description: ENERGY_NEWS_CONFIG.listingSupport,
    site: context.site ?? 'http://localhost:4321',
    items: insights.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.pubDate,
      link: insightPath(entry),
      categories: entry.data.categories,
    })),
    customData: `<language>en</language>`,
    trailingSlash: false,
  });
};
