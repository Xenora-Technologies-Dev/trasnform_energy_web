import { services } from './services';

export const capabilityChain = [
  {
    slug: 'electrical-engineering',
    label: 'Electrical Engineering',
    note: 'Power infrastructure, inspection, and energization.',
  },
  {
    slug: 'regulatory-affairs',
    label: 'Regulatory Affairs',
    note: 'State and central-level consultancy.',
  },
  {
    slug: 'project-management',
    label: 'Project Support',
    note: 'Supervision, engineering support, and PMC.',
  },
  {
    slug: 'renewable-energy',
    label: 'Renewable Energy',
    note: 'Development and adoption advice.',
  },
  {
    slug: 'power-market',
    label: 'Power Market Operations',
    note: 'Operation, scheduling, and dispatch.',
  },
  {
    slug: 'technical-documentation',
    label: 'Technical Documentation',
    note: 'DPR, proposals, and review records.',
  },
  {
    slug: 'safety-audit',
    label: 'Safety & Compliance',
    note: 'Independent safety audit of installations.',
  },
] as const;

export const experienceDomains = [
  {
    title: 'Power Infrastructure',
    body: 'Electrical engineering for power infrastructure, including inspection and energization approval.',
  },
  {
    title: 'Regulatory Affairs',
    body: 'Regulatory consultancy at state and central levels for power and energy work.',
  },
  {
    title: 'Renewable Energy',
    body: 'Consultancy for renewable energy development and adoption.',
  },
  {
    title: 'Power Markets',
    body: 'Advisory on power market operation, scheduling, and dispatch.',
  },
] as const;

export const whyPillars = [
  {
    title: 'Seasoned Expertise',
    body: 'Leadership experience spanning more than three decades across the power and energy sector.',
  },
  {
    title: 'Technical Depth',
    body: 'Engineering knowledge across power infrastructure, renewables, and related energy domains.',
  },
  {
    title: 'Regulatory Understanding',
    body: 'State and central-level regulatory consultancy for power and energy assignments.',
  },
  {
    title: 'End-to-End Perspective',
    body: 'Technical, project, documentation, and compliance support within a single consultancy practice.',
  },
] as const;

export { projectFramework } from './projects';

export const capabilityChainWithHrefs = capabilityChain.map((item) => {
  const service = services.find((entry) => entry.slug === item.slug);
  return {
    ...item,
    href: service?.href ?? '/services',
  };
});
