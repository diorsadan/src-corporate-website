import { images } from '@/constants/images';

export const contactPageHero = {
  title: 'Contact Us',
  subtitle: "We're here to help you find the perfect space for your business",
} as const;

export const contactFormSection = {
  title: 'Send Us an Inquiry',
} as const;

export const inquiryTypeOptions: { value: string; label: string }[] = [
  { value: '', label: 'Select inquiry type...' },
  { value: 'leasing', label: 'Commercial Leasing Inquiry' },
  { value: 'investment', label: 'Investment Opportunity' },
  { value: 'peza', label: 'PEZA Registration Assistance' },
  { value: 'site-visit', label: 'Site Visit Request' },
  { value: 'partnership', label: 'Partnership Proposal' },
  { value: 'general', label: 'General Information' },
];

export type ContactSidebarBlock =
  | { type: 'phone'; headline: string; value: string }
  | { type: 'email'; headline: string; value: string }
  | { type: 'hours'; headline: string; lines: string[] };

export type ContactSidebarCard =
  | { variant: 'gradient'; title: string; blocks: ContactSidebarBlock[] }
  | { variant: 'bordered'; title: string; blocks: ContactSidebarBlock[] };

export const contactSidebarCards: ContactSidebarCard[] = [
  {
    variant: 'gradient',
    title: 'Leasing Department',
    blocks: [
      { type: 'phone', headline: 'Direct Line', value: '+63 83 228 8766' },
      { type: 'email', headline: 'Email', value: 'leasing@saranganiresources.com' },
      {
        type: 'hours',
        headline: 'Business Hours',
        lines: ['Mon-Fri: 8:00 AM - 5:00 PM', 'Sat: 9:00 AM - 12:00 PM'],
      },
    ],
  },
  {
    variant: 'bordered',
    title: 'PEZA Customs Office',
    blocks: [
      { type: 'phone', headline: 'Direct Line', value: '+63 83 552 7890' },
      { type: 'email', headline: 'Email', value: 'customs@src-peza.gov.ph' },
      { type: 'hours', headline: 'Office Hours', lines: ['Mon-Fri: 8:00 AM - 5:00 PM'] },
    ],
  },
];

export const contactLocationsSection = {
  title: 'Our Locations',
  subtitle: 'Visit our offices across SOCCSKSARGEN',
  mapOverlayTitle: 'Google Maps Embed',
  mapOverlayHint: 'Interactive map would appear here',
} as const;

export const contactOffices = [
  {
    id: 'polomolok',
    mapImage: images.contact.mapPolomolok,
    mapAlt: 'Map showing Polomolok headquarters location',
    title: 'Polomolok Headquarters',
    orgLine: 'Sarangani Resources Corporation',
    addressLines: ['National Highway, Cannery Site', 'Polomolok, South Cotabato 9504', 'Philippines'],
    phone: '+63 83 228 8766',
    email: 'info@saranganiresources.com',
  },
  {
    id: 'gensan',
    mapImage: images.contact.mapGeneralSantos,
    mapAlt: 'Map showing General Santos office location',
    title: 'General Santos Office',
    orgLine: 'SRC Calumpang Economic Zone',
    addressLines: ['Calumpang, General Santos City', 'South Cotabato 9500', 'Philippines'],
    phone: '+63 83 552 1234',
    email: 'calumpang@saranganiresources.com',
  },
] as const;
