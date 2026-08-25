import { getEnabledSources } from './sources';
import { normalizeArticle, parseRssDate, stripHtml } from './normalizeArticle';
import type { NormalizedCandidate } from './types';

function extractTag(block: string, tag: string) {
  const cdata = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'));
  if (cdata?.[1]) return cdata[1].trim();
  const plain = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return plain?.[1]?.trim() ?? '';
}

function extractLink(block: string) {
  const atom = block.match(/<link[^>]+href=["']([^"']+)["']/i);
  if (atom?.[1]) return atom[1];
  return extractTag(block, 'link');
}

function parseFeedItems(xml: string) {
  const items = [...xml.matchAll(/<item[\s\S]*?<\/item>/gi), ...xml.matchAll(/<entry[\s\S]*?<\/entry>/gi)];
  return items.map((match) => {
    const block = match[0];
    return {
      title: stripHtml(extractTag(block, 'title')),
      url: extractLink(block),
      description: stripHtml(extractTag(block, 'description') || extractTag(block, 'summary')),
      publishedAt: parseRssDate(
        extractTag(block, 'pubDate') || extractTag(block, 'published') || extractTag(block, 'updated'),
      ),
    };
  });
}

/**
 * Fetch enabled RSS/Atom feeds. Intended for the ingest CLI, never for page renders.
 */
export async function fetchFeeds(options?: { limitPerSource?: number }): Promise<NormalizedCandidate[]> {
  const limit = options?.limitPerSource ?? 8;
  const sources = getEnabledSources().filter((source) => source.feedUrl);
  const collected: NormalizedCandidate[] = [];

  for (const source of sources) {
    if (!source.feedUrl) continue;
    try {
      const response = await fetch(source.feedUrl, {
        headers: { Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml' },
      });
      if (!response.ok) continue;
      const xml = await response.text();
      const items = parseFeedItems(xml).slice(0, limit);
      for (const item of items) {
        if (!item.title || !item.url) continue;
        collected.push(
          normalizeArticle({
            title: item.title,
            url: item.url,
            source,
            publishedAt: item.publishedAt,
            description: item.description,
          }),
        );
      }
    } catch {
      // A single feed failure must not stop the remaining sources.
    }
  }

  return collected;
}
