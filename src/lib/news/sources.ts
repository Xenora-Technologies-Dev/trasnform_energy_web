import type { NewsSource } from './types';

/**
 * Configurable news-source registry.
 * Enable, disable, recategorise, or reprioritise sources here.
 * Do not hardcode source lists inside pages or components.
 */
export const newsSources: NewsSource[] = [
  {
    id: 'kserc',
    name: 'Kerala State Electricity Regulatory Commission',
    homepage: 'https://erckerala.org/',
    region: 'kerala',
    category: 'kerala-official',
    enabled: true,
    priority: 100,
    notes: 'Orders, regulations, and tariff instruments for Kerala.',
  },
  {
    id: 'kseb',
    name: 'Kerala State Electricity Board',
    homepage: 'https://kseb.in/',
    region: 'kerala',
    category: 'kerala-official',
    enabled: true,
    priority: 90,
  },
  {
    id: 'kerala-power',
    name: 'Power Department, Government of Kerala',
    homepage: 'https://power.kerala.gov.in/',
    region: 'kerala',
    category: 'kerala-official',
    enabled: true,
    priority: 85,
  },
  {
    id: 'cerc',
    name: 'Central Electricity Regulatory Commission',
    homepage: 'https://www.cercind.gov.in/',
    region: 'india',
    category: 'india-official',
    enabled: true,
    priority: 100,
    notes: 'Draft and notified central electricity regulations.',
  },
  {
    id: 'cea',
    name: 'Central Electricity Authority',
    homepage: 'https://cea.nic.in/',
    region: 'india',
    category: 'india-official',
    enabled: true,
    priority: 95,
  },
  {
    id: 'mnre',
    name: 'Ministry of New and Renewable Energy',
    homepage: 'https://mnre.gov.in/',
    region: 'india',
    category: 'india-official',
    enabled: true,
    priority: 92,
  },
  {
    id: 'mop',
    name: 'Ministry of Power',
    homepage: 'https://powermin.gov.in/',
    region: 'india',
    category: 'india-official',
    enabled: true,
    priority: 92,
  },
  {
    id: 'goi',
    name: 'Government of India',
    homepage: 'https://www.india.gov.in/',
    region: 'india',
    category: 'india-official',
    enabled: true,
    priority: 70,
  },
  {
    id: 'iex',
    name: 'Indian Energy Exchange',
    homepage: 'https://www.iexindia.com/',
    region: 'india',
    category: 'market',
    enabled: true,
    priority: 80,
    notes: 'Use for market-structure notices, not price-tick republishing.',
  },
  {
    id: 'iea',
    name: 'International Energy Agency',
    homepage: 'https://www.iea.org/',
    feedUrl: 'https://www.iea.org/feeds/news.rss',
    region: 'global',
    category: 'international',
    enabled: true,
    priority: 98,
  },
  {
    id: 'irena',
    name: 'International Renewable Energy Agency',
    homepage: 'https://www.irena.org/',
    feedUrl: 'https://www.irena.org/rss',
    region: 'global',
    category: 'international',
    enabled: true,
    priority: 96,
  },
  {
    id: 'unfccc',
    name: 'UN Climate Change',
    homepage: 'https://unfccc.int/',
    region: 'global',
    category: 'international',
    enabled: true,
    priority: 60,
    notes: 'Only when the item is power-system or energy-transition relevant.',
  },
  {
    id: 'powerline',
    name: 'Power Line',
    homepage: 'https://powerline.net.in/',
    region: 'india',
    category: 'trade-press',
    enabled: true,
    priority: 65,
  },
  {
    id: 'mercom',
    name: 'Mercom India',
    homepage: 'https://www.mercomindia.com/',
    feedUrl: 'https://www.mercomindia.com/feed',
    region: 'india',
    category: 'trade-press',
    enabled: true,
    priority: 62,
  },
  {
    id: 'eqmag',
    name: 'EQ Mag Pro',
    homepage: 'https://www.eqmagpro.com/',
    region: 'india',
    category: 'trade-press',
    enabled: true,
    priority: 50,
  },
  {
    id: 'hindu',
    name: 'The Hindu',
    homepage: 'https://www.thehindu.com/',
    region: 'multi',
    category: 'trade-press',
    enabled: true,
    priority: 55,
    notes: 'Use only for Kerala/India energy reporting, never general news.',
  },
];

export function getEnabledSources() {
  return newsSources.filter((source) => source.enabled).sort((a, b) => b.priority - a.priority);
}

export function getSource(id: string) {
  return newsSources.find((source) => source.id === id);
}

export function getSourceByName(name: string) {
  const needle = name.trim().toLowerCase();
  return newsSources.find(
    (source) => source.name.toLowerCase() === needle || source.id === needle,
  );
}
