export const company = {
  legalName: 'TRANSFORM ENERGY CONSULTANCY SERVICES LLP',
  name: 'Transform Energy Consultancy',
  publicName: 'Transform Energy Consultancy',
  shortName: 'TECS',
  positioning:
    'Electrical engineering consultancy for power infrastructure, renewable energy, and regulated markets.',
  experienceLead:
    'Over three decades of leadership experience across power infrastructure, renewable energy development, regulatory affairs, power market operation, scheduling and dispatch, management of major projects with CFA, installation inspection and energization approval, safety audits, and technical documentation.',
  vision:
    'To be the most trusted consultancy partner for sustainable, compliant, and technically robust energy solutions.',
  mission:
    'To leverage the unparalleled expertise of our leadership team to empower clients with solutions that meet standards, achieve operational excellence, accelerate renewable energy adoption and regulatory consultation.',
} as const;

export const leadershipDomains = [
  'Power infrastructure',
  'Renewable energy development',
  'Regulatory affairs',
  'Power market operation',
  'Scheduling and dispatch',
  'Management of major projects with CFA',
  'Installation inspection and energization approval',
  'Safety audits',
  'Technical documentation',
] as const;

export const professionalApproach = [
  {
    title: 'Consultancy, not contracting',
    body: 'The organisation provides professional consultancy. It is not a construction, contracting, or installation company.',
  },
  {
    title: 'Standards and operating discipline',
    body: 'Advice is concerned with meeting applicable standards and supporting operational excellence on the client’s assignment.',
  },
  {
    title: 'Renewables inside the same practice',
    body: 'Renewable energy development and adoption are treated as part of the same engineering, regulatory, and project-support capability.',
  },
  {
    title: 'Regulation beside the engineering',
    body: 'State and central regulatory consultancy sits alongside technical work, so consultation and compliance are not handled in isolation.',
  },
] as const;

export type LeadershipProfile = {
  name: string;
  role: string;
  summary: string;
};

export const leadershipProfiles: LeadershipProfile[] = [];

export const office = {
  name: 'Dotspace Business Centre',
  lines: [
    'Dotspace Business Centre, DD 18',
    '37/2200/8, 2nd Floor, MC Tower',
    'Punkunnam, Thrissur',
    'Kerala 6820002',
  ],
  locality: 'Punkunnam, Thrissur',
  region: 'Kerala',
  postalCode: '6820002',
  country: 'IN',
  mapsQuery:
    'Dotspace Business Centre, DD 18, 37/2200/8, 2nd Floor, MC Tower, Punkunnam, Thrissur, Kerala 6820002',
} as const;

export const contact = {
  email: 'tecskaaa@gmail.com',
  get mapsUrl() {
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(office.mapsQuery)}`;
  },
  get mapsEmbed() {
    return `https://maps.google.com/maps?q=${encodeURIComponent(office.mapsQuery)}&z=16&output=embed`;
  },
};

export const brand = {
  colors: {
    navy: '#0B2A52',
    navyDark: '#071B35',
    energy: '#3F9B2F',
    spark: '#F5B51B',
    white: '#FFFFFF',
    canvas: '#F6F8F7',
    ink: '#14202B',
    mute: '#64717D',
    line: '#E5E9E7',
  },
} as const;
