import { company } from './company';

export const insightContentTypes = ['news', 'insight', 'regulatory-update', 'market-update'] as const;
export type InsightContentType = (typeof insightContentTypes)[number];

export const insightRegions = ['kerala', 'india', 'global'] as const;
export type InsightRegion = (typeof insightRegions)[number];

export const insightCategories = [
  {
    id: 'kerala-energy',
    label: 'Kerala Energy',
    filterLabel: 'Kerala',
    region: 'kerala' as const,
    topic: true,
    seoTitle: 'Kerala Energy Insights',
    seoDescription:
      'Developments in Kerala’s power sector, including KSEB, KSERC, renewable energy, tariffs, open access, and electricity infrastructure.',
    intro:
      'Kerala’s power system sits at the intersection of a high-renewable distribution network, a state-owned utility, and a regulator that is rewriting how solar, storage, and consumer participation are treated. These notes follow that work with original commentary — not republished news.',
  },
  {
    id: 'india-energy',
    label: 'India Energy',
    filterLabel: 'India',
    region: 'india' as const,
    topic: true,
    seoTitle: 'India Energy Insights',
    seoDescription:
      'Indian power-sector intelligence covering CERC, CEA, MNRE, Ministry of Power, renewable energy, transmission, and electricity markets.',
    intro:
      'Central regulation, grid codes, transmission charging, and market design now move as quickly as project development. This series tracks those India-level changes and what they mean for engineering, compliance, and operations.',
  },
  {
    id: 'global-energy',
    label: 'Global Energy',
    filterLabel: 'Global',
    region: 'global' as const,
    topic: true,
    seoTitle: 'Global Energy Insights',
    seoDescription:
      'International energy-sector developments from IEA, IRENA and other authoritative sources, focused on power systems, markets, and the energy transition.',
    intro:
      'Global electricity demand, renewable deployment, and grid modernisation set the context in which Indian and Kerala projects are planned. Coverage here is selective: only developments that change how power systems are built, regulated, or operated.',
  },
  {
    id: 'renewable-energy',
    label: 'Renewable Energy',
    filterLabel: 'Renewable Energy',
    topic: true,
    seoTitle: 'Renewable Energy Insights',
    seoDescription:
      'Solar, wind, hybrid, and renewable-policy developments relevant to project development, grid integration, and compliance in India and Kerala.',
    intro:
      'Renewable energy is treated here as an engineering, regulatory, and market problem — not as a sustainability headline. The notes follow policy, interconnection, and operating practice that affect real projects.',
  },
  {
    id: 'power-markets',
    label: 'Power Markets',
    filterLabel: 'Power Markets',
    topic: true,
    seoTitle: 'Power Market Insights',
    seoDescription:
      'Power-market, scheduling, dispatch, and electricity-exchange developments, including market coupling, open access, and trading frameworks.',
    intro:
      'Scheduling, dispatch, and exchange-based trading sit between physical infrastructure and regulation. These notes follow market-design changes that affect how energy is cleared, scheduled, and paid for.',
  },
  {
    id: 'regulatory-affairs',
    label: 'Regulatory Affairs',
    filterLabel: 'Regulatory Affairs',
    topic: true,
    seoTitle: 'Energy Regulatory Affairs Insights',
    seoDescription:
      'State and central electricity regulatory developments from KSERC, CERC, CEA, MNRE, and related authorities.',
    intro:
      'Draft regulations, tariff orders, and grid standards are where many project and operating decisions are actually made. Coverage concentrates on instruments that change compliance, charging, or connection requirements.',
  },
  {
    id: 'power-infrastructure',
    label: 'Power Infrastructure',
    filterLabel: 'Infrastructure',
    topic: true,
    seoTitle: 'Power Infrastructure Insights',
    seoDescription:
      'Transmission, distribution, grid connectivity, and power-system infrastructure developments relevant to electrical engineering consultancy.',
    intro:
      'Grid codes, interconnection standards, and transmission charging shape whether generation and storage can operate as designed. These notes follow infrastructure rules, not construction news.',
  },
  {
    id: 'energy-transition',
    label: 'Energy Transition',
    filterLabel: 'Energy Transition',
    topic: true,
    seoTitle: 'Energy Transition Insights',
    seoDescription:
      'Energy-transition developments spanning electrification, storage, hydrogen, and the shift in global and Indian power mixes.',
    intro:
      'Transition coverage is limited to power-system consequences: demand growth, storage, flexibility, and the replacement of thermal generation. Generic sustainability stories are not published.',
  },
  {
    id: 'policy-regulation',
    label: 'Policy & Regulation',
    filterLabel: 'Policy & Regulation',
    topic: false,
    seoTitle: 'Energy Policy and Regulation Insights',
    seoDescription:
      'Policy and regulatory notes on electricity, renewable energy, and power-sector reform in Kerala, India, and internationally.',
    intro:
      'Policy instruments are covered when they change how electricity is priced, connected, or scheduled — not as political commentary.',
  },
  {
    id: 'technical-insights',
    label: 'Technical Insights',
    filterLabel: 'Technical Insights',
    topic: false,
    seoTitle: 'Technical Energy Insights',
    seoDescription:
      'Original technical notes from Transform Energy Consultancy on regulation, markets, documentation, and electrical practice.',
    intro:
      'Longer original notes, written when the practice has something specific to add. They are not news summaries.',
  },
] as const;

export type InsightCategoryId = (typeof insightCategories)[number]['id'];

export const listingFilters: InsightCategoryId[] = [
  'kerala-energy',
  'india-energy',
  'global-energy',
  'renewable-energy',
  'power-markets',
  'regulatory-affairs',
  'power-infrastructure',
  'energy-transition',
];

export const relatedServiceMap: Record<string, readonly string[]> = {
  'kerala-energy': ['regulatory-affairs', 'renewable-energy'],
  'india-energy': ['regulatory-affairs', 'electrical-engineering'],
  'global-energy': ['renewable-energy', 'power-market'],
  'renewable-energy': ['renewable-energy', 'project-management'],
  'power-markets': ['power-market', 'regulatory-affairs'],
  'regulatory-affairs': ['regulatory-affairs'],
  'power-infrastructure': ['electrical-engineering', 'project-management'],
  'energy-transition': ['renewable-energy', 'electrical-engineering'],
  'policy-regulation': ['regulatory-affairs', 'technical-documentation'],
  'technical-insights': ['technical-documentation', 'electrical-engineering'],
  news: ['regulatory-affairs'],
  insight: ['technical-documentation'],
  'regulatory-update': ['regulatory-affairs'],
  'market-update': ['power-market'],
  safety: ['safety-audit'],
  storage: ['electrical-engineering', 'safety-audit'],
  documentation: ['technical-documentation'],
};

export const relevanceKeywords = {
  high: [
    'kerala',
    'kseb',
    'kserc',
    'india electricity',
    'indian power',
    'cerc',
    'cea',
    'mnre',
    'ministry of power',
    'renewable energy',
    'solar',
    'wind',
    'hybrid',
    'power market',
    'scheduling',
    'dispatch',
    'open access',
    'tariff',
    'transmission',
    'distribution',
    'grid',
    'ists',
    'gna',
    'bess',
    'energy storage',
    'battery storage',
    'green hydrogen',
    'electricity regulation',
    'power-sector reform',
    'market coupling',
    'electricity exchange',
    'iex',
    'serc',
    'net metering',
    'energization',
    'grid code',
    'connectivity',
  ],
  medium: [
    'iea',
    'irena',
    'hydrogen',
    'ev charging',
    'energy transition',
    'electricity demand',
    'hydropower',
    'pumped storage',
    'power project',
    'electricity trading',
    'green day ahead',
    'gdam',
    'rtm',
    'day-ahead',
  ],
  low: [
    'stock',
    'share price',
    'equity',
    'ipo',
    'consumer electronics',
    'smartphone',
    'unrelated politics',
    'celebrity',
    'generic csr',
    'sustainability week',
  ],
  block: [
    'football',
    'cricket score',
    'movie review',
    'fashion',
    'recipe',
  ],
} as const;

export const evergreenTopics = [
  {
    slug: 'understanding-power-market-scheduling',
    title: 'Understanding Power Market Scheduling',
    status: 'planned' as const,
  },
  {
    slug: 'renewable-energy-development-in-india',
    title: 'Renewable Energy Development in India',
    status: 'planned' as const,
  },
  {
    slug: 'electricity-regulatory-framework-in-india',
    title: 'Electricity Regulatory Framework in India',
    status: 'planned' as const,
  },
  {
    slug: 'what-is-open-access-in-electricity',
    title: 'What Is Open Access in Electricity?',
    status: 'planned' as const,
  },
  {
    slug: 'power-sector-project-consultancy',
    title: 'Power Sector Project Consultancy',
    status: 'planned' as const,
  },
  {
    slug: 'electrical-safety-audit-why-it-matters',
    title: 'Electrical Safety Audit: Why It Matters',
    status: 'planned' as const,
  },
  {
    slug: 'understanding-dprs-for-energy-projects',
    title: 'Understanding DPRs for Energy Projects',
    status: 'planned' as const,
  },
] as const;

export const ENERGY_NEWS_CONFIG = {
  publisherName: company.publicName,
  listingTitle: 'Energy Intelligence',
  listingEyebrow: 'Insights',
  listingLede: 'Keeping you informed on developments shaping power, energy and regulation.',
  listingSupport:
    'Insights, developments and perspectives across Kerala, India and the global energy sector.',
  enabledRegions: ['kerala', 'india', 'global'] as InsightRegion[],
  enabledCategories: insightCategories.map((category) => category.id),
  sourcePriorityWeight: 12,
  minRelevanceScore: 42,
  maxLatestArticles: 6,
  homepageLatestCount: 3,
  relatedArticleCount: 3,
  relatedServiceCount: 3,
  listingPageSize: 9,
  minArticlesForTopicPage: 2,
  freshness: {
    immediateHours: 72,
    recentDays: 7,
    staleDays: 120,
  },
  defaultFallbackImage: '/og/insights-default.svg',
  relatedServiceMap,
  relevanceKeywords,
  copyright: {
    maxExcerptChars: 0,
    useSourceImages: false,
    requireOriginalSummary: true,
    minSummaryChars: 280,
    minWhyItMattersChars: 180,
  },
} as const;

export function getCategory(id: string) {
  return insightCategories.find((category) => category.id === id);
}

export function getTopicCategories() {
  return insightCategories.filter((category) => category.topic);
}
