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
  category: "agro-industrial" | "industrial" | "light-manufacturing";
  peazaDeclarationDate: string;
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
    label: "Total Managed Land",
    value: "158.47 ha",
    description: "Hectares of strategically developed PEZA-registered zones",
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
    category: "agro-industrial",
    peazaDeclarationDate: "April 29, 2002",
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
    category: "agro-industrial",
    peazaDeclarationDate: "December 12, 2008",
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
    category: "industrial",
    peazaDeclarationDate: "December 8, 2003",
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
    category: "light-manufacturing",
    peazaDeclarationDate: "October 20, 2020",
    coordinates: {
      lat: 6.2272,
      lng: 125.0744,
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
