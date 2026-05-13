import { images } from '@/constants/images';

export const propertiesPageHero = {
  title: 'Our Properties',
  subtitle: 'Strategic economic zones across SOCCSKSARGEN',
} as const;

export const propertyMapSection = {
  title: 'Zone Locations',
  subtitle: 'Strategically positioned across South Cotabato and General Santos',
} as const;

export const propertyMapPins: { label: string; containerClass: string; animationDelay?: string }[] = [
  { label: 'SRC Calumpang', containerClass: 'absolute top-1/4 left-1/3 group' },
  { label: 'Cannery Site', containerClass: 'absolute top-1/2 left-1/4 group', animationDelay: '0.2s' },
  { label: 'Allah Valley', containerClass: 'absolute top-2/3 left-1/2 group', animationDelay: '0.4s' },
  { label: 'Upper Klinan', containerClass: 'absolute top-1/3 right-1/3 group', animationDelay: '0.6s' },
];

export const featuredEconomicZones = [
  {
    title: 'SRC Calumpang',
    description: 'Prime location in General Santos City with excellent logistics access',
    area: '120 hectares',
    image: images.properties.calumpang.thumbnail,
  },
  {
    title: 'Cannery Site',
    description: 'Established zone in Polomolok with complete infrastructure',
    area: '180 hectares',
    image: images.properties.cannery.thumbnail,
  },
  {
    title: 'Allah Valley',
    description: 'Emerging economic zone with agricultural focus',
    area: '150 hectares',
    image: images.properties.allahValley.thumbnail,
  },
  {
    title: 'Upper Klinan',
    description: 'Strategic industrial park with modern facilities',
    area: '95 hectares',
    image: images.properties.upperKlinan.thumbnail,
  },
] as const;

export type PropertyStatIcon = 'factory' | 'map' | 'truck';

export interface PropertySplitZone {
  id: string;
  badgeText: string;
  title: string;
  description: string;
  stats: { icon: PropertyStatIcon; label: string; value: string }[];
  image: string;
  imageAlt: string;
  /** When true, image column renders first on large screens (Cannery layout) */
  imageFirstOnLarge: boolean;
  sectionClass: string;
}

export const propertySplitZones: PropertySplitZone[] = [
  {
    id: 'calumpang',
    badgeText: 'PEZA-Registered Economic Zone',
    title: 'SRC Calumpang',
    description:
      'Located in General Santos City, SRC Calumpang is our flagship economic zone offering premium industrial and commercial spaces. With direct access to the General Santos International Airport and seaport, this zone provides unparalleled logistics advantages.',
    stats: [
      { icon: 'factory', label: 'Total Land Area:', value: '120 hectares' },
      { icon: 'map', label: 'Location:', value: 'General Santos City' },
      { icon: 'truck', label: 'Focus:', value: 'Manufacturing, Logistics, Export Processing' },
    ],
    image: images.properties.calumpang.thumbnail,
    imageAlt: 'SRC Calumpang aerial view',
    imageFirstOnLarge: false,
    sectionClass: 'bg-gray-50',
  },
  {
    id: 'cannery',
    badgeText: 'PEZA-Registered Economic Zone',
    title: 'Sarangani Economic Development Zone',
    description:
      'Our historic Cannery Site in Polomolok represents decades of industrial excellence. This fully-developed zone features complete infrastructure and is home to major food processing and manufacturing companies.',
    stats: [
      { icon: 'factory', label: 'Total Land Area:', value: '180 hectares' },
      { icon: 'map', label: 'Location:', value: 'Polomolok, South Cotabato' },
      { icon: 'truck', label: 'Focus:', value: 'Food Processing, Agro-Industrial, Manufacturing' },
    ],
    image: images.properties.cannery.thumbnail,
    imageAlt: 'Cannery Site',
    imageFirstOnLarge: true,
    sectionClass: 'bg-white',
  },
];

export interface PropertyCompactZone {
  id: string;
  badgeText: string;
  title: string;
  description: string;
  areaLine: string;
  locationLine: string;
  image: string;
  imageAlt: string;
}

export const propertyCompactZones: PropertyCompactZone[] = [
  {
    id: 'allah',
    badgeText: 'Emerging Zone',
    title: 'Allah Valley Economic Zone',
    description:
      'Focused on agricultural and agro-industrial development with modern facilities for food processing and agricultural exports.',
    areaLine: '150 hectares',
    locationLine: 'Allah Valley, Cotabato',
    image: images.properties.allahValley.thumbnail,
    imageAlt: 'Allah Valley',
  },
  {
    id: 'upper-klinan',
    badgeText: 'Modern Industrial Park',
    title: 'Upper Klinan Industrial Park',
    description:
      'State-of-the-art industrial park with modern infrastructure designed for advanced manufacturing and technology companies.',
    areaLine: '95 hectares',
    locationLine: 'South Cotabato',
    image: images.properties.upperKlinan.thumbnail,
    imageAlt: 'Upper Klinan',
  },
];

export type InfrastructureIcon = 'zap' | 'droplet' | 'wifi' | 'shield' | 'truck' | 'factory';

export const propertyInfrastructureSection = {
  title: 'World-Class Infrastructure',
  subtitle: 'Complete utilities and security for your operations',
} as const;

export const propertyInfrastructureFeatures: { icon: InfrastructureIcon; label: string; color: string }[] = [
  { icon: 'zap', label: 'Reliable Power', color: '#059669' },
  { icon: 'droplet', label: 'Water Supply', color: '#059669' },
  { icon: 'wifi', label: 'Fiber Internet', color: '#059669' },
  { icon: 'shield', label: '24/7 Security', color: '#059669' },
  { icon: 'truck', label: 'Logistics Access', color: '#84cc16' },
  { icon: 'factory', label: 'Industrial Facilities', color: '#84cc16' },
];

export const propertyGallerySection = {
  title: 'Property Gallery',
  subtitle: 'Explore our facilities and infrastructure',
} as const;
