import transmission from '@/assets/images/transmission.jpg';
import solar from '@/assets/images/solar.jpg';
import wind from '@/assets/images/wind.jpg';
import offshore from '@/assets/images/substation.jpg';
import documents from '@/assets/images/documents.jpg';
import engineering from '@/assets/images/engineering.jpg';
import kumaranP from '@/assets/people/kumaran-p.jpeg';
import anandSr from '@/assets/people/anand-sr.jpeg';
import anilkumarVc from '@/assets/people/anilkumar-vc.jpeg';
import augustineThomas from '@/assets/people/augustine-thomas.jpeg';
import type { ImageMetadata } from 'astro';

export const photos = {
  transmission,
  solar,
  wind,
  offshore,
  documents,
  engineering,
} as const;

export const peoplePhotos = {
  'kumaran-p': kumaranP,
  'anand-sr': anandSr,
  'anilkumar-vc': anilkumarVc,
  'augustine-thomas': augustineThomas,
} as const satisfies Record<'kumaran-p' | 'anand-sr' | 'anilkumar-vc' | 'augustine-thomas', ImageMetadata>;

export type PhotoName = keyof typeof photos;
