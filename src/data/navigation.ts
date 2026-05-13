export const primaryNav = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About Us' },
  { path: '/properties', label: 'Our Properties' },
  { path: '/leasing', label: 'Commercial Leasing' },
  { path: '/resources', label: 'Investor Resources' },
  { path: '/contact', label: 'Contact Us' },
] as const;

export type FooterNavLink =
  | { label: string; href: string; external?: false }
  | { label: string; href: string; external: true };

export const footerSections: { title: string; links: FooterNavLink[] }[] = [
  {
    title: 'Quick Links',
    links: [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Our Properties', href: '/properties' },
      { label: 'Commercial Leasing', href: '/leasing' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Investor Resources', href: '/resources' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Download Brochure', href: '#', external: true },
    ],
  },
];

export const footerContactLines: { icon: 'phone' | 'mail' | 'map'; text: string }[] = [
  { icon: 'phone', text: '+63 83 228 8766' },
  { icon: 'mail', text: 'info@saranganiresources.com' },
  { icon: 'map', text: 'Polomolok, South Cotabato' },
];

export const footerHeadquarters = {
  lines: ['National Highway, Cannery Site', 'Polomolok, South Cotabato 9504', 'Philippines'],
};

export const footerCopyright = {
  organization: 'Sarangani Resources Corporation',
  suffix: 'All rights reserved.',
};

export const footerLegalLinks: { label: string; href: string }[] = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Legal', href: '#' },
];
