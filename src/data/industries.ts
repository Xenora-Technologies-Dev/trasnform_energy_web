import type { PhotoName } from './photos';

export const industriesIntro = {
  eyebrow: 'Industries',
  heading: 'Where this expertise can apply.',
  lede: 'The categories below are potential application areas derived from the consultancy portfolio. They are not a list of claimed client sectors or established industry accounts.',
  body: 'Transform Energy Consultancy has not published a sector-by-sector client list. The application areas follow from the actual services: electrical engineering, regulatory affairs, project supervision and PMC, renewable energy, power-market advisory, technical documentation, and safety audit.',
} as const;

export const industrySectors = [
  {
    title: 'Power Infrastructure',
    body: 'Electrical engineering advisory, inspection, and energization-related support for power infrastructure assignments.',
    photo: 'transmission' as PhotoName,
  },
  {
    title: 'Renewable Energy Projects',
    body: 'Consultancy on renewable-energy-related matters, including development and adoption, with attention to technical quality and compliance.',
    photo: 'solar' as PhotoName,
  },
  {
    title: 'Energy & Electrical Projects',
    body: 'Engineering review and related advisory where energy and electrical project work has to meet applicable standards.',
    photo: 'engineering' as PhotoName,
  },
  {
    title: 'Power-Sector Regulatory Matters',
    body: 'State-level and central-level regulatory consultancy for power and energy work, including consultation and compliance-led decisions.',
    photo: 'documents' as PhotoName,
  },
  {
    title: 'Energy Project Development',
    body: 'Support where project development needs engineering, regulatory, documentation, and market context in one consultancy brief.',
    photo: 'wind' as PhotoName,
  },
  {
    title: 'Technical Project Support',
    body: 'Project supervision, engineering support, PMC, technical documentation, and safety audit support for energy-sector project requirements.',
    photo: 'offshore' as PhotoName,
  },
] as const;
