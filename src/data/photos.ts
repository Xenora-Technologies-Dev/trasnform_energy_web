import transmission from '@/assets/images/transmission.jpg';
import solar from '@/assets/images/solar.jpg';
import wind from '@/assets/images/wind.jpg';
import offshore from '@/assets/images/substation.jpg';
import documents from '@/assets/images/documents.jpg';
import engineering from '@/assets/images/engineering.jpg';

export const photos = {
  transmission,
  solar,
  wind,
  offshore,
  documents,
  engineering,
} as const;

export type PhotoName = keyof typeof photos;
