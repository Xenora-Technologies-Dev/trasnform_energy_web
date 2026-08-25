import type { APIRoute } from 'astro';
import { company } from '@/data/company';
import { getRenderableInsights, primaryCategory, type InsightEntry } from '@/lib/insights';

export async function getStaticPaths() {
  const entries = await getRenderableInsights();
  return entries.map((entry) => ({
    params: { slug: entry.id },
    props: { entry },
  }));
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function wrapTitle(title: string) {
  const words = title.split(' ');
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (next.length > 42 && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  }
  if (current) lines.push(current);
  return lines.slice(0, 4);
}

export const GET: APIRoute = ({ props }) => {
  const entry = (props as { entry: InsightEntry }).entry;
  const category = escapeXml(primaryCategory(entry)?.label ?? 'Insights');
  const lines = wrapTitle(entry.data.title);
  const titleNodes = lines
    .map(
      (line, index) =>
        `<text x="72" y="${268 + index * 48}" fill="#FFFFFF" font-family="Georgia, 'Times New Roman', serif" font-size="40" font-weight="600">${escapeXml(line)}</text>`,
    )
    .join('');

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#0B2A52"/>
  <g opacity="0.18" stroke="#FFFFFF" stroke-width="1">
    ${Array.from({ length: 16 }, (_, i) => `<line x1="${i * 80}" y1="0" x2="${i * 80}" y2="630"/>`).join('')}
    ${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${i * 80}" x2="1200" y2="${i * 80}"/>`).join('')}
  </g>
  <path d="M0 210 C 220 120, 420 280, 640 190 S 980 110, 1200 230" fill="none" stroke="#3F9B2F" stroke-width="1.5" opacity="0.7"/>
  <path d="M0 430 C 260 340, 520 500, 820 410 S 1080 330, 1200 390" fill="none" stroke="#F5B51B" stroke-width="1.2" opacity="0.55"/>
  <text x="72" y="92" fill="#F5B51B" font-family="Manrope, ui-sans-serif, sans-serif" font-size="16" font-weight="700" letter-spacing="4">${category.toUpperCase()}</text>
  ${titleNodes}
  <text x="72" y="560" fill="#FFFFFF" font-family="Manrope, ui-sans-serif, sans-serif" font-size="18" font-weight="600" opacity="0.8">${escapeXml(company.publicName)}</text>
  <text x="72" y="588" fill="#FFFFFF" font-family="Manrope, ui-sans-serif, sans-serif" font-size="14" opacity="0.55">Energy Intelligence</text>
</svg>`;

  return new Response(svg, {
    headers: {
      'Content-Type': 'image/svg+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};
