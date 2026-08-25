import { services } from './services';

export type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string; summary: string }[];
};

export const primaryNav: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  {
    href: '/services',
    label: 'Services',
    children: services.map((service) => ({
      href: service.href,
      label: service.menuLabel,
      summary: service.summary,
    })),
  },
  { href: '/industries', label: 'Industries' },
  { href: '/projects', label: 'Projects' },
  { href: '/insights', label: 'Insights' },
];

export const footerNav = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/industries', label: 'Industries' },
  { href: '/projects', label: 'Projects' },
  { href: '/insights', label: 'Insights' },
  { href: '/contact', label: 'Contact' },
] as const;
