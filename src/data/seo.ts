import { company } from './company';

export const defaultSeo = {
  title: `${company.publicName} | Electrical, Regulatory and Energy Consultancy`,
  titleTemplate: `%s | ${company.publicName}`,
  description:
    'Transform Energy Consultancy is an electrical engineering consultancy with over three decades of leadership experience across power infrastructure, renewable energy, regulatory affairs, project support, and power market operation.',
  ogType: 'website' as const,
  twitterCard: 'summary_large_image' as const,
  locale: 'en',
  image: {
    src: '/brand/tecs-logo.jpg',
    alt: 'Transform Energy Consultancy Services (TECS) official logo',
    width: 1200,
    height: 1200,
  },
};

export type SeoInput = {
  title?: string;
  description?: string;
  path: string;
  type?: 'website' | 'article';
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  noindex?: boolean;
  ogTitle?: string;
  ogDescription?: string;
  publishedTime?: Date | string;
  modifiedTime?: Date | string;
};

export function absoluteUrl(path: string, site?: URL | string) {
  const origin = typeof site === 'string' ? site : (site?.origin ?? '');
  const normalised = path === '/' ? '/' : path.replace(/\/$/, '');
  if (!origin) return normalised;
  return new URL(normalised, origin.endsWith('/') ? origin : `${origin}/`).toString();
}

export function pageTitle(title?: string) {
  if (!title) return defaultSeo.title;
  if (title.includes(company.publicName)) return title;
  return defaultSeo.titleTemplate.replace('%s', title);
}
