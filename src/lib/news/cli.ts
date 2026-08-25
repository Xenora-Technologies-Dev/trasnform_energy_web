/**
 * Offline ingest CLI. Never imported by pages.
 *
 *   npx tsx src/lib/news/cli.ts
 *
 * Writes draft markdown into src/content/insights/inbox/ for editorial review.
 * Nothing is published until draft: false is set by a reviewer.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { ENERGY_NEWS_CONFIG } from '../../data/energy-news-config';
import { fetchFeeds } from './fetchFeeds';
import { deduplicate } from './deduplicate';
import { filterByRelevance } from './relevance';
import { candidateToDraftMarkdown } from './toMarkdown';

const inboxDir = path.resolve(process.cwd(), 'src/content/insights-inbox');

async function main() {
  const fetched = await fetchFeeds({ limitPerSource: 10 });
  const unique = deduplicate(fetched);
  const scored = filterByRelevance(unique).slice(0, ENERGY_NEWS_CONFIG.maxLatestArticles * 3);

  await mkdir(inboxDir, { recursive: true });

  let written = 0;
  for (const candidate of scored) {
    const { slug, markdown } = candidateToDraftMarkdown(candidate);
    const file = path.join(inboxDir, `${slug}.md`);
    await writeFile(file, markdown, 'utf8');
    written += 1;
    console.log(`${candidate.relevanceScore.toString().padStart(3)}  ${slug}`);
  }

  console.log(`\nWrote ${written} draft files to ${inboxDir}`);
  console.log('Review, rewrite original summaries, then move approved files to src/content/insights/.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
