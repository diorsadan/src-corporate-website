import { images } from '@/constants/images';

export type PartnerDisplayMode = 'text-emerald' | 'text-dark' | 'text-muted';

export const homePartners: { name: string; display: PartnerDisplayMode }[] = [
  { name: 'DOLE Philippines', display: 'text-dark' },
  { name: 'PEZA', display: 'text-emerald' },
  { name: 'General Milling Corporation', display: 'text-muted' },
  { name: 'Century Pacific Food Inc.', display: 'text-muted' },
];

/** Optional logo paths — swap UI to images later without renaming files on disk */
export const partnerLogoPaths = {
  dole: images.partners.doleLogo,
  peza: images.partners.pezaLogo,
  generalMilling: images.partners.generalMillingLogo,
  centuryPacific: images.partners.centuryPacificLogo,
} as const;
