import { images } from '@/constants/images';

export const leasingPageHero = {
  title: 'Commercial Leasing',
  subtitle: 'Discover your ideal business space in our economic zones',
} as const;

export const leasingListingsSection = {
  title: 'Available Spaces',
} as const;

export const leasingFilterCategories = ['All', 'Retail', 'Dining', 'Corporate', 'Warehouse'] as const;

export const leasingListings = [
  {
    id: 1,
    type: 'Retail',
    title: 'Prime Retail Space - Calumpang',
    area: '250 sqm',
    location: 'SRC Calumpang, General Santos City',
    condition: 'Bare Shell',
    image: images.leasing.listingCalumpangRetail,
    price: 'Contact for Pricing',
  },
  {
    id: 2,
    type: 'Corporate',
    title: 'Corporate Office Building',
    area: '1,200 sqm',
    location: 'Cannery Site, Polomolok',
    condition: 'Semi-Fitted',
    image: images.leasing.listingCanneryCorporate,
    price: 'Contact for Pricing',
  },
  {
    id: 3,
    type: 'Warehouse',
    title: 'Industrial Warehouse',
    area: '3,500 sqm',
    location: 'SRC Calumpang, General Santos City',
    condition: 'Bare Shell',
    image: images.leasing.listingCalumpangWarehouse,
    price: 'Contact for Pricing',
  },
  {
    id: 4,
    type: 'Dining',
    title: 'Restaurant Space',
    area: '180 sqm',
    location: 'SRC Calumpang, General Santos City',
    condition: 'Semi-Fitted',
    image: images.leasing.listingCalumpangDining,
    price: 'Contact for Pricing',
  },
  {
    id: 5,
    type: 'Warehouse',
    title: 'Cold Storage Facility',
    area: '2,800 sqm',
    location: 'Cannery Site, Polomolok',
    condition: 'Fully Fitted',
    image: images.leasing.listingCanneryColdStorage,
    price: 'Contact for Pricing',
  },
  {
    id: 6,
    type: 'Corporate',
    title: 'Modern Office Complex',
    area: '850 sqm',
    location: 'Upper Klinan Industrial Park',
    condition: 'Fully Fitted',
    image: images.leasing.listingUpperKlinanOffice,
    price: 'Contact for Pricing',
  },
] as const;

export const leasingProcessSection = {
  title: 'Our Leasing Process',
  subtitle: 'Simple and transparent steps to secure your space',
} as const;

export type LeasingProcessIcon = 'file' | 'map' | 'clipboard' | 'key';

export const leasingProcessSteps: {
  step: string;
  icon: LeasingProcessIcon;
  title: string;
  description: string;
}[] = [
  {
    step: '01',
    icon: 'file',
    title: 'Letter of Intent',
    description: 'Submit your LOI with company details and space requirements',
  },
  {
    step: '02',
    icon: 'map',
    title: 'Site Tripping',
    description: 'Schedule a site visit to view available properties and facilities',
  },
  {
    step: '03',
    icon: 'clipboard',
    title: 'Contract Signing',
    description: 'Review and sign the lease agreement with agreed terms',
  },
  {
    step: '04',
    icon: 'key',
    title: 'Move-In',
    description: 'Receive keys and begin operations in your new space',
  },
];

export const leasingDownloadSection = {
  title: 'Download Our Leasing Kit',
  body: 'Get detailed information about our properties, rates, and terms in our comprehensive corporate brochure',
  brochureLabel: 'Download Corporate Brochure',
  rateSheetLabel: 'Download Rate Sheet',
} as const;

export const leasingCtaSection = {
  title: 'Ready to Lease Your Space?',
  body: 'Our leasing team is ready to assist you in finding the perfect location for your business',
  buttonLabel: 'Contact Leasing Department',
  buttonPath: '/contact',
} as const;
