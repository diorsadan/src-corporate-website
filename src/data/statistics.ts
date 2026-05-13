export type StatIconId = 'trending' | 'users' | 'calendar';

export const homeHero = {
  titleLine1: 'Empowering Economic Growth',
  titleLine2: 'in SOCCSKSARGEN',
  subtitle: 'Premier economic zones and industrial real estate solutions',
  ctaLabel: 'Explore Leasing Opportunities',
  ctaPath: '/leasing',
} as const;

export const homeStats: { value: string; label: string; icon: StatIconId; iconBgClass: string }[] = [
  { value: '500+', label: 'Total Hectares', icon: 'trending', iconBgClass: 'bg-[#059669]' },
  { value: '150+', label: 'Active Locators', icon: 'users', iconBgClass: 'bg-[#84cc16]' },
  { value: '25+', label: 'Years Experience', icon: 'calendar', iconBgClass: 'bg-[#059669]' },
];

export const homeFeaturedSection = {
  title: 'Featured Economic Zones',
  subtitle: 'Strategic locations for your business growth',
  detailsLink: '/properties',
  detailsLabel: 'View Details',
} as const;

export const homePartnersSection = {
  title: 'Trusted Partners & Locators',
  subtitle: 'Industry leaders who trust our economic zones',
} as const;
