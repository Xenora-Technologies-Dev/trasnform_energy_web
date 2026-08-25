import type { PhotoName } from './photos';

export type ServiceDiagram = 'grid' | 'regulatory' | 'project' | 'renewable' | 'market' | 'docs' | 'audit';

export type Service = {
  slug: string;
  href: string;
  title: string;
  shortTitle: string;
  menuLabel: string;
  summary: string;
  description: string;
  whyItMatters: string;
  focus: string[];
  related: string[];
  photo: PhotoName;
  heroPhoto: PhotoName | null;
  diagram: ServiceDiagram;
  seoTitle: string;
  seoDescription: string;
  ogTitle: string;
};

export const servicesIntro = {
  eyebrow: 'Services',
  heading: 'Consultancy across the energy assignment.',
  lede: 'Seven capabilities sit in one practice: electrical engineering, regulatory affairs, project supervision and PMC, renewable energy, power-market advisory, technical documentation, and safety audit.',
  body: 'The work is professional consultancy — not construction, contracting, or installation. Each service can be engaged on its own; they are also designed to sit together when an assignment crosses engineering, regulation, delivery, and documentation.',
} as const;

export const services: Service[] = [
  {
    slug: 'electrical-engineering',
    href: '/services/electrical-engineering',
    title: 'Electrical Engineering Consultancy',
    shortTitle: 'Electrical Engineering',
    menuLabel: 'Electrical Engineering',
    summary: 'Professional electrical engineering advisory for power infrastructure, including inspection and energization approval.',
    description:
      'We provide professional electrical engineering advisory for power infrastructure. The work includes technical review against applicable standards and support related to installation inspection and energization approval, so design, execution, and commissioning remain aligned.',
    whyItMatters:
      'Power infrastructure decisions have to stand up to applicable standards. Independent engineering review — including inspection and energization-related advice — keeps design intent, site work, and commissioning on the same technical footing.',
    focus: [
      'Electrical engineering for power infrastructure',
      'Installation inspection and energization approval',
      'Technical review against applicable standards',
      'Support from design through commissioning',
    ],
    related: ['project-management', 'safety-audit', 'technical-documentation'],
    photo: 'transmission',
    heroPhoto: 'transmission',
    diagram: 'grid',
    seoTitle: 'Electrical Engineering Consultancy',
    seoDescription:
      'Electrical engineering consultancy for power infrastructure, including technical review, inspection, and energization approval.',
    ogTitle: 'Electrical Engineering Consultancy',
  },
  {
    slug: 'regulatory-affairs',
    href: '/services/regulatory-affairs',
    title: 'Regulatory Affairs Consultancy',
    shortTitle: 'Regulatory Affairs',
    menuLabel: 'Regulatory Affairs',
    summary: 'State-level and central-level regulatory consultancy for power and energy work.',
    description:
      'We provide regulatory consultancy at state and central levels for organisations working in power and energy. The work covers policy, compliance, and consultation, informed by the same engineering and market context as the rest of the practice.',
    whyItMatters:
      'Power and energy assignments sit inside state and central regulatory frameworks. Consultancy that understands those processes — alongside the underlying engineering — helps organisations work through compliance and consultation with a coherent brief.',
    focus: [
      'State and central regulatory consultancy',
      'Compliance-led project and operating decisions',
      'Support through consultation processes',
      'Context from infrastructure and market work',
    ],
    related: ['power-market', 'technical-documentation', 'renewable-energy'],
    photo: 'documents',
    heroPhoto: 'documents',
    diagram: 'regulatory',
    seoTitle: 'Energy Regulatory Affairs',
    seoDescription:
      'Energy regulatory affairs consultancy at state and central levels for power-sector compliance and consultation.',
    ogTitle: 'Energy Regulatory Affairs',
  },
  {
    slug: 'project-management',
    href: '/services/project-management',
    title: 'Project Supervision and Engineering Support',
    shortTitle: 'Project Supervision & PMC',
    menuLabel: 'Project Supervision & PMC',
    summary: 'Project supervision, engineering support, and project management consultancy (PMC).',
    description:
      'We provide project supervision and engineering support, including project management consultancy (PMC). The work draws on experience in the management of major projects with CFA, and is concerned with keeping site work aligned with the engineering intent.',
    whyItMatters:
      'Energy and electrical projects need supervision and engineering support so delivery stays aligned with design. PMC, including experience with major projects involving CFA, sits with that same requirement — a consultancy view of progress, not a contracting role.',
    focus: [
      'Project supervision and engineering support',
      'Project management consultancy (PMC)',
      'Management of major projects with CFA',
      'Coordination between design and site execution',
    ],
    related: ['electrical-engineering', 'technical-documentation', 'safety-audit'],
    photo: 'engineering',
    heroPhoto: 'engineering',
    diagram: 'project',
    seoTitle: 'Project Management Consultancy',
    seoDescription:
      'Project management consultancy covering project supervision, engineering support, and PMC, including major projects with CFA.',
    ogTitle: 'Project Management Consultancy',
  },
  {
    slug: 'renewable-energy',
    href: '/services/renewable-energy',
    title: 'Renewable Energy Consultancy',
    shortTitle: 'Renewable Energy',
    menuLabel: 'Renewable Energy',
    summary: 'Consultancy on renewable-energy-related matters, including development and adoption.',
    description:
      'We advise on renewable-energy-related matters, including development and adoption. Attention is given to technical quality, compliance, and how a project sits within the wider power system and market. The work is consultancy, not engineering, procurement, and construction.',
    whyItMatters:
      'Renewable energy projects have to be technically sound and compliant, and they have to sit inside a wider power system and market. Consultancy that already covers engineering, regulation, and project support can treat those questions as one brief.',
    focus: [
      'Renewable energy development',
      'Support for renewable energy adoption',
      'Technical and compliance-led project advice',
      'Alignment with infrastructure and market context',
    ],
    related: ['electrical-engineering', 'regulatory-affairs', 'project-management'],
    photo: 'solar',
    heroPhoto: 'solar',
    diagram: 'renewable',
    seoTitle: 'Renewable Energy Consultancy',
    seoDescription:
      'Renewable energy consultancy for development and adoption, combining technical, regulatory, and project-support expertise.',
    ogTitle: 'Renewable Energy Consultancy',
  },
  {
    slug: 'power-market',
    href: '/services/power-market',
    title: 'Technical Advisory — Power Market & Scheduling',
    shortTitle: 'Power Market Advisory',
    menuLabel: 'Power Market & Scheduling',
    summary: 'Technical advisory relating to power market operation, scheduling, and dispatch.',
    description:
      'We provide technical advisory relating to power market operation, scheduling, and dispatch — the operational layer between infrastructure, regulation, and day-to-day system requirements.',
    whyItMatters:
      'Market operation, scheduling, and dispatch sit between physical infrastructure, regulation, and daily system requirements. Technical advisory in this layer is useful when engineering and regulatory work has to meet operational reality.',
    focus: [
      'Power market operation',
      'Scheduling and dispatch',
      'Advisory for market-facing operations',
      'Links between engineering, regulation, and operations',
    ],
    related: ['regulatory-affairs', 'renewable-energy', 'electrical-engineering'],
    photo: 'wind',
    heroPhoto: 'wind',
    diagram: 'market',
    seoTitle: 'Power Market Scheduling Consultancy',
    seoDescription:
      'Power market scheduling consultancy: technical advisory on power market operation, scheduling, and dispatch.',
    ogTitle: 'Power Market Scheduling Consultancy',
  },
  {
    slug: 'technical-documentation',
    href: '/services/technical-documentation',
    title: 'Technical Documentation',
    shortTitle: 'Technical Documentation',
    menuLabel: 'Technical Documentation',
    summary: 'Detailed project reports, project proposals, and supporting technical documentation.',
    description:
      'We prepare technical documentation including detailed project reports (DPR) and project proposals, written for investment, regulatory, and implementation review.',
    whyItMatters:
      'Investment, regulatory, and implementation review depend on clear technical records. DPRs, project proposals, and supporting documentation have to be accurate enough for those audiences without overstating what the engineering can support.',
    focus: [
      'Detailed project reports (DPR)',
      'Project proposals',
      'Documentation for review and decision-making',
      'Records that support compliance and delivery',
    ],
    related: ['project-management', 'regulatory-affairs', 'electrical-engineering'],
    photo: 'documents',
    heroPhoto: null,
    diagram: 'docs',
    seoTitle: 'Technical Documentation and DPR',
    seoDescription:
      'Technical documentation including detailed project reports (DPR) and project proposals for energy-sector projects.',
    ogTitle: 'Technical Documentation and DPR',
  },
  {
    slug: 'safety-audit',
    href: '/services/safety-audit',
    title: 'Safety Audit',
    shortTitle: 'Safety Audit',
    menuLabel: 'Safety Audit',
    summary: 'Professional electrical and energy safety audit support for installations and operations.',
    description:
      'We provide professional electrical and energy safety audit support, informed by inspection and energization-approval experience, giving an independent view of electrical and operational safety.',
    whyItMatters:
      'Electrical and energy-sector installations need an independent safety view. Audit support informed by inspection and energization-approval experience is intended for technical and management action, not as a substitute for the operator’s own duties.',
    focus: [
      'Electrical and energy-sector safety audits',
      'Review of installations and operations',
      'Findings for technical and management action',
      'Alignment with applicable standards and energization approval',
    ],
    related: ['electrical-engineering', 'project-management', 'technical-documentation'],
    photo: 'offshore',
    heroPhoto: 'offshore',
    diagram: 'audit',
    seoTitle: 'Electrical Safety Audit',
    seoDescription:
      'Electrical safety audit support for energy-sector installations and operations, informed by inspection and energization-approval experience.',
    ogTitle: 'Electrical Safety Audit',
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(slug: string) {
  const service = getService(slug);
  if (!service) return [];
  return service.related
    .map((relatedSlug) => getService(relatedSlug))
    .filter((entry): entry is Service => Boolean(entry));
}
