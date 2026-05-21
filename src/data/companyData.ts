/**
 * Official Sarangani Resources Corporation (SRC) Company Data
 * Single source of truth for all corporate statistics, timeline, properties, and facilities
 * Last Updated: May 2026
 */

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

export interface CompanyStat {
  label: string;
  value: string;
  description?: string;
}

export interface TimelineEvent {
  date: string;
  year: number;
  milestone: string;
  description: string;
}

export interface Property {
  id: string;
  name: string;
  area: number; // in hectares
  areaFormatted: string; // formatted display string
  description: string;
  location: string;
  province: string;
  category: "industrial-zone" | "subdivision";
  peazaDeclarationDate: string;
  images: string[];
  features?: string[];
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Facility {
  category: string;
  provider: string;
  details: string;
}

export interface FacilitiesData {
  power: Facility;
  water: Facility;
  telecom: Facility;
  security: Facility;
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Calculate years since founding date
 */
function calculateYearsInBusiness(foundingDate: Date): number {
  const currentDate = new Date();
  return currentDate.getFullYear() - foundingDate.getFullYear();
}

// ============================================================================
// OFFICIAL SRC STATISTICS
// ============================================================================

const foundingDate = new Date("1977-08-12");
const yearsInBusiness = calculateYearsInBusiness(foundingDate);

export const companyStats: CompanyStat[] = [
  {
    label: "Total Managed Land (Hectares)",
    value: "158.47",
    description: "Strategically developed PEZA-registered zones",
  },
  {
    label: "Active Locators",
    value: "3+",
    description:
      "Major tenants including Dole Philippines Inc., Calumpang Packaging Corp., QBits Resources Corp.",
  },
  {
    label: "Years of Excellence",
    value: `${yearsInBusiness}+ Years`,
    description: `Established August 12, 1977 - Industry leadership and innovation`,
  },
  {
    label: "PEZA Zones",
    value: "4",
    description: "Official PEZA-registered economic development zones",
  },
];

// ============================================================================
// HISTORICAL TIMELINE
// ============================================================================

export const timelineData: TimelineEvent[] = [
  {
    date: "August 12, 1977",
    year: 1977,
    milestone: "Official Founding",
    description:
      "Sarangani Resources Corporation is officially established, marking the beginning of transformative economic development in the SOCCSKSARGEN region.",
  },
  {
    date: "April 29, 2002",
    year: 2002,
    milestone: "PEZA Declaration - Cannery Zone",
    description:
      "Official PEZA Declaration for Sarangani Economic Development Zone (Cannery, Polomolok). This designation unlocks premium tax incentives and international trade facilitation.",
  },
  {
    date: "December 8, 2003",
    year: 2003,
    milestone: "PEZA Declaration - Calumpang Zone",
    description:
      "Official PEZA Declaration for SRC Calumpang. Strategic expansion into packaging and light manufacturing sectors near major logistics arteries.",
  },
  {
    date: "December 12, 2008",
    year: 2008,
    milestone: "PEZA Declaration - Allah Valley Zone",
    description:
      "Official PEZA Declaration for SRC Allah Valley. Integration of the region's agricultural heartland into the PEZA framework for high-volume agro-processing.",
  },
  {
    date: "October 20, 2020",
    year: 2020,
    milestone: "PEZA Declaration - Upper Klinan Zone",
    description:
      "Official PEZA Declaration for SRC Upper Klinan. Latest zone designation for light to medium manufacturing and logistics expansion with reinforced infrastructure.",
  },
];

// ============================================================================
// PROPERTY & ZONE PORTFOLIO
// ============================================================================

/** Builds a 5-image asset path array for industrial or subdivision listings */
function buildPropertyImages(
  folder: "industrial" | "subdivision",
  slug: string,
  extension: string = "jpg",
): string[] {
  return [1, 2, 3, 4, 5].map(
    (n) => `/assets/${folder}/${slug}-${n}.${extension}`,
  );
}

/** Filename slugs under /public/assets/industrial/ — each uses {slug}-1.jpg … {slug}-5.jpg */
const INDUSTRIAL_IMAGE_SLUGS: Record<string, string> = {
  "cannery-polomolok": "src-cannery",
  "allah-valley": "src-allah-valley",
  calumpang: "src-calumpang",
  "upper-klinan": "src-upper-klinan",
};

/** Filename slugs under /public/assets/subdivision/ — each uses {slug}-1.jpg … {slug}-5.jpg */
const SUBDIVISION_IMAGE_SLUGS: Record<string, string> = {
  "sub-polotana-1": "polotana-phase-i",
  "sub-polotana-2": "polotana-phase-ii",
  "sub-polotana-3": "polotana-phase-iii",
  "sub-kaunlaran": "kaunlaran-subdivision",
  "sub-lantana": "lantana-subdivision",
  "sub-springville": "springville-subdivision",
  "sub-cannery-housing": "cannery-housing-subdivision",
  "sub-sandagatana": "sandagatana-subdivision",
  "sub-dole-gawad-pagibig": "dole-gawad-pag-ibig-subdivision",
};

export const propertiesData: Property[] = [
  {
    id: "cannery-polomolok",
    name: "Sarangani Economic Development Zone (Cannery)",
    area: 72.8673,
    areaFormatted: "72.87 ha",
    description:
      "Our flagship agro-industrial hub. Directly integrated with Dole Philippines' global supply chain, offering world-class agro-industrial processing facilities, advanced cold storage capabilities, and heavy logistics staging areas.",
    location: "Polomolok",
    province: "South Cotabato",
    category: "industrial-zone",
    peazaDeclarationDate: "April 29, 2002",
    images: buildPropertyImages(
      "industrial",
      INDUSTRIAL_IMAGE_SLUGS["cannery-polomolok"],
    ),
    coordinates: {
      lat: 6.2238,
      lng: 125.0682,
    },
  },
  {
    id: "allah-valley",
    name: "SRC Allah Valley",
    area: 56.0958,
    areaFormatted: "56.10 ha",
    description:
      "Strategically located in the region's agricultural heartland. Designed for high-volume agro-processing, bulk storage, and milling operations, supporting the rich agricultural output of the valley.",
    location: "Surallah",
    province: "South Cotabato",
    category: "industrial-zone",
    peazaDeclarationDate: "December 12, 2008",
    images: buildPropertyImages(
      "industrial",
      INDUSTRIAL_IMAGE_SLUGS["allah-valley"],
    ),
    coordinates: {
      lat: 6.3725,
      lng: 124.7397,
    },
  },
  {
    id: "calumpang",
    name: "SRC Calumpang",
    area: 17.7335,
    areaFormatted: "17.73 ha",
    description:
      "A premier industrial and packaging zone strategically positioned near major logistics arteries, optimizing supply chain efficiency for packaging and manufacturing locators.",
    location: "General Santos City",
    province: "South Cotabato",
    category: "industrial-zone",
    peazaDeclarationDate: "December 8, 2003",
    images: buildPropertyImages(
      "industrial",
      INDUSTRIAL_IMAGE_SLUGS.calumpang,
    ),
    coordinates: {
      lat: 6.0961,
      lng: 125.1328,
    },
  },
  {
    id: "upper-klinan",
    name: "SRC Upper Klinan",
    area: 11.7762,
    areaFormatted: "11.78 ha",
    description:
      "Designated for light to medium manufacturing, warehousing, and logistics expansion, featuring reinforced road networks and rapid highway access for seamless distribution.",
    location: "Polomolok",
    province: "South Cotabato",
    category: "industrial-zone",
    peazaDeclarationDate: "October 20, 2020",
    images: buildPropertyImages(
      "industrial",
      INDUSTRIAL_IMAGE_SLUGS["upper-klinan"],
    ),
    coordinates: {
      lat: 6.2272,
      lng: 125.0744,
    },
  },
  {
    id: "sub-polotana-1",
    name: "Polotana Phase I Subdivision",
    area: 0,
    areaFormatted: "Residential Lots",
    description:
      "Master-planned residential community in Polomolok offering titled lots, paved roads, and a secure neighborhood environment ready for house construction.",
    location: "Polomolok",
    province: "South Cotabato",
    category: "subdivision",
    peazaDeclarationDate: "SRC Residential Portfolio",
    images: buildPropertyImages(
      "subdivision",
      SUBDIVISION_IMAGE_SLUGS["sub-polotana-1"],
    ),
    features: [
      "Residential Lots Available",
      "Master-planned Community",
      "Ready for House Construction",
    ],
    coordinates: {
      lat: 6.2215,
      lng: 125.0642,
    },
  },
  {
    id: "sub-polotana-2",
    name: "Polotana Phase II Subdivision",
    area: 0,
    areaFormatted: "Residential Lots",
    description:
      "Second-phase expansion of the Polotana residential corridor with improved lot layouts, community access roads, and proximity to Cannery Site employment centers.",
    location: "Polomolok",
    province: "South Cotabato",
    category: "subdivision",
    peazaDeclarationDate: "SRC Residential Portfolio",
    images: buildPropertyImages(
      "subdivision",
      SUBDIVISION_IMAGE_SLUGS["sub-polotana-2"],
    ),
    features: [
      "Residential Lots Available",
      "Master-planned Community",
      "Ready for House Construction",
    ],
    coordinates: {
      lat: 6.2228,
      lng: 125.0658,
    },
  },
  {
    id: "sub-polotana-3",
    name: "Polotana Phase III Subdivision",
    area: 0,
    areaFormatted: "Residential Lots",
    description:
      "Latest Polotana phase delivering additional residential inventory with structured blocks, drainage, and long-term community planning for growing families.",
    location: "Polomolok",
    province: "South Cotabato",
    category: "subdivision",
    peazaDeclarationDate: "SRC Residential Portfolio",
    images: buildPropertyImages(
      "subdivision",
      SUBDIVISION_IMAGE_SLUGS["sub-polotana-3"],
    ),
    features: [
      "Residential Lots Available",
      "Master-planned Community",
      "Ready for House Construction",
    ],
    coordinates: {
      lat: 6.2241,
      lng: 125.0671,
    },
  },
  {
    id: "sub-kaunlaran",
    name: "Kaunlaran Subdivision",
    area: 0,
    areaFormatted: "Residential Lots",
    description:
      "Kaunlaran Subdivision provides affordable residential lots in a well-organized Polomolok community designed for progressive homeownership near key industrial anchors.",
    location: "Polomolok",
    province: "South Cotabato",
    category: "subdivision",
    peazaDeclarationDate: "SRC Residential Portfolio",
    images: buildPropertyImages(
      "subdivision",
      SUBDIVISION_IMAGE_SLUGS["sub-kaunlaran"],
    ),
    features: [
      "Residential Lots Available",
      "Master-planned Community",
      "Ready for House Construction",
    ],
    coordinates: {
      lat: 6.2198,
      lng: 125.0705,
    },
  },
  {
    id: "sub-lantana",
    name: "Lantana Subdivision",
    area: 0,
    areaFormatted: "Residential Lots",
    description:
      "Lantana Subdivision features a calm residential setting with structured lotting, community streets, and convenient access to Polomolok commercial and employment hubs.",
    location: "Polomolok",
    province: "South Cotabato",
    category: "subdivision",
    peazaDeclarationDate: "SRC Residential Portfolio",
    images: buildPropertyImages(
      "subdivision",
      SUBDIVISION_IMAGE_SLUGS["sub-lantana"],
    ),
    features: [
      "Residential Lots Available",
      "Master-planned Community",
      "Ready for House Construction",
    ],
    coordinates: {
      lat: 6.2186,
      lng: 125.0628,
    },
  },
  {
    id: "sub-springville",
    name: "Springville Subdivision",
    area: 0,
    areaFormatted: "Residential Lots",
    description:
      "Springville Subdivision in General Santos City offers master-planned residential lots with strong connectivity to urban services, schools, and regional logistics corridors.",
    location: "General Santos City",
    province: "South Cotabato",
    category: "subdivision",
    peazaDeclarationDate: "SRC Residential Portfolio",
    images: buildPropertyImages(
      "subdivision",
      SUBDIVISION_IMAGE_SLUGS["sub-springville"],
    ),
    features: [
      "Residential Lots Available",
      "Master-planned Community",
      "Ready for House Construction",
    ],
    coordinates: {
      lat: 6.1128,
      lng: 125.1717,
    },
  },
  {
    id: "sub-cannery-housing",
    name: "Cannery Housing Subdivision",
    area: 0,
    areaFormatted: "Residential Lots",
    description:
      "Cannery Housing Subdivision sits within the Cannery Site footprint, providing workforce-adjacent residential lots with direct access to Sarangani Economic Development Zone operations.",
    location: "Polomolok",
    province: "South Cotabato",
    category: "subdivision",
    peazaDeclarationDate: "SRC Residential Portfolio",
    images: buildPropertyImages(
      "subdivision",
      SUBDIVISION_IMAGE_SLUGS["sub-cannery-housing"],
    ),
    features: [
      "Residential Lots Available",
      "Master-planned Community",
      "Ready for House Construction",
    ],
    coordinates: {
      lat: 6.2238,
      lng: 125.0682,
    },
  },
  {
    id: "sub-sandagatana",
    name: "Sandagatana Subdivision",
    area: 0,
    areaFormatted: "Residential Lots",
    description:
      "Sandagatana Subdivision delivers organized residential blocks in Polomolok with community infrastructure suited for families building long-term homes in South Cotabato.",
    location: "Polomolok",
    province: "South Cotabato",
    category: "subdivision",
    peazaDeclarationDate: "SRC Residential Portfolio",
    images: buildPropertyImages(
      "subdivision",
      SUBDIVISION_IMAGE_SLUGS["sub-sandagatana"],
    ),
    features: [
      "Residential Lots Available",
      "Master-planned Community",
      "Ready for House Construction",
    ],
    coordinates: {
      lat: 6.2174,
      lng: 125.0664,
    },
  },
  {
    id: "sub-dole-gawad-pagibig",
    name: "Dole Gawad Pag-ibig Subdivision",
    area: 0,
    areaFormatted: "Residential Lots",
    description:
      "Dole Gawad Pag-ibig Subdivision supports employee and community housing initiatives with ready residential lots aligned to SRC's legacy partnership with Dole Philippines.",
    location: "Polomolok",
    province: "South Cotabato",
    category: "subdivision",
    peazaDeclarationDate: "SRC Residential Portfolio",
    images: buildPropertyImages(
      "subdivision",
      SUBDIVISION_IMAGE_SLUGS["sub-dole-gawad-pagibig"],
    ),
    features: [
      "Residential Lots Available",
      "Master-planned Community",
      "Ready for House Construction",
    ],
    coordinates: {
      lat: 6.2209,
      lng: 125.0721,
    },
  },
];

// ============================================================================
// SHARED INFRASTRUCTURE & SECURITY PROTOCOLS
// ============================================================================

export const facilitiesData: FacilitiesData = {
  power: {
    category: "Power Supply",
    provider: "SOCOTECO (South Cotabato Electric Cooperative)",
    details:
      "Industrial-grade power supply engineered for peak load stability and 24/7 operational continuity across all PEZA zones.",
  },
  water: {
    category: "Water Systems",
    provider: "Deep Wells & Local Water Districts",
    details:
      "High-capacity industrial water systems featuring advanced treatment and distribution infrastructure supporting manufacturing and processing operations.",
  },
  telecom: {
    category: "Telecommunications",
    provider: "PLDT Enterprise & Globe Business",
    details:
      "Enterprise-grade Fiber Optic connectivity delivering redundant, low-latency communications infrastructure for mission-critical operations.",
  },
  security: {
    category: "Security Protocols",
    provider: "PEZA-Manned Gates & Rapid Response",
    details:
      "24/7 PEZA-manned security gates, strict perimeter fencing, comprehensive CCTV monitoring system, and rapid-response roaming patrols ensuring comprehensive asset protection.",
  },
};

// ============================================================================
// MAJOR LOCATORS
// ============================================================================

export interface MajorLocator {
  name: string;
  sector: string;
  description: string;
}

export const majorLocators: MajorLocator[] = [
  {
    name: "Dole Philippines Incorporated",
    sector: "Agro-Industrial",
    description:
      "Global leader in fruit production and processing, flagship tenant integrated with world-class supply chain operations.",
  },
  {
    name: "Calumpang Packaging Corporation",
    sector: "Packaging & Manufacturing",
    description:
      "Premier packaging solutions provider leveraging SRC's strategic logistics positioning for regional distribution.",
  },
  {
    name: "QBits Resources Corporation",
    sector: "Industrial Services",
    description:
      "Specialized industrial services and logistics provider supporting zone operations and supply chain efficiency.",
  },
];

// ============================================================================
// EXPORT SUMMARY
// ============================================================================

export const companyDataSummary = {
  foundingDate: foundingDate.toISOString(),
  yearsInBusiness,
  totalManagedLand: 158.47, // hectares
  activePezaZones: 4,
  majorLocatorsCount: 3,
} as const;
