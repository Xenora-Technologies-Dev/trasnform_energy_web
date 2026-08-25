import { ENERGY_NEWS_CONFIG } from './energy-news-config';

export const insightsIntro = {
  eyebrow: ENERGY_NEWS_CONFIG.listingEyebrow,
  heading: ENERGY_NEWS_CONFIG.listingTitle,
  lede: ENERGY_NEWS_CONFIG.listingLede,
  support: ENERGY_NEWS_CONFIG.listingSupport,
  emptyTitle: 'Nothing published yet',
  emptyBody:
    'Approved energy-intelligence notes will appear here. The section is reserved for original commentary on power, energy and regulation — not republished news.',
} as const;

export const insightTopics = [
  'State and central regulatory consultation',
  'Power market operation, scheduling and dispatch',
  'Renewable energy development and project documentation',
  'Electrical engineering and safety audit practice',
] as const;
