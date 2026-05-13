/**
 * Central asset URLs (served from /public).
 * Drop final files into these paths using the names below — no code changes required.
 *
 * TODO comments call out creative intent and suggested pixel dimensions.
 */

/** Neutral SVG used when raster/video assets are missing or fail to load */
export const ASSET_PLACEHOLDER = '/assets/placeholders/placeholder.svg';

export const images = {
  home: {
    // TODO: Replace with SRC Calumpang / SOCCSKSARGEN aerial hero still
    // Recommended size: 1920×1080 (16:9), JPG or WebP
    hero: '/assets/home/home-hero.jpg',
    // TODO: Optional muted loop for hero background
    // Recommended: 1920×1080 H.264 or WebM, keep file size web-friendly
    droneVideo: '/assets/home/home-drone-video.mp4',
  },

  about: {
    // TODO: Replace with corporate HQ or campus exterior
    // Recommended size: 1200×800, JPG or WebP
    company: '/assets/about/about-company.jpg',
  },

  properties: {
    calumpang: {
      // TODO: Replace with SRC Calumpang thumbnail / card shot
      // Recommended size: 800×600, JPG or WebP
      thumbnail: '/assets/properties/calumpang/calumpang-thumbnail.jpg',
      // TODO: Replace with on-site gallery frames
      // Recommended size: 1200×800 each, JPG or WebP
      gallery: [
        '/assets/properties/calumpang/calumpang-gallery-1.jpg',
        '/assets/properties/calumpang/calumpang-gallery-2.jpg',
      ],
    },
    cannery: {
      // TODO: Replace with Cannery / SEDZ aerial or street view
      thumbnail: '/assets/properties/cannery/cannery-thumbnail.jpg',
    },
    allahValley: {
      // TODO: Replace with Allah Valley zone landscape
      thumbnail: '/assets/properties/allah-valley/allah-valley-thumbnail.jpg',
    },
    upperKlinan: {
      // TODO: Replace with Upper Klinan industrial park shot
      thumbnail: '/assets/properties/upper-klinan/upper-klinan-thumbnail.jpg',
    },
  },

  maps: {
    // TODO: Replace with branded static map or illustration of all zones
    // Recommended size: 1200×800, JPG or WebP
    soccskargenOverview: '/assets/maps/map-soccskargen-overview.jpg',
  },

  gallery: {
    // TODO: Replace with mixed property / infrastructure photography
    // Recommended size: 800×600 each, JPG or WebP
    propertyShowcase: [
      '/assets/gallery/gallery-property-1.jpg',
      '/assets/gallery/gallery-property-2.jpg',
      '/assets/gallery/gallery-property-3.jpg',
      '/assets/gallery/gallery-property-4.jpg',
      '/assets/gallery/gallery-property-5.jpg',
      '/assets/gallery/gallery-property-6.jpg',
    ],
  },

  leasing: {
    // TODO: Replace with Calumpang retail shell photo
    listingCalumpangRetail: '/assets/leasing/leasing-listing-calumpang-retail.jpg',
    // TODO: Replace with Cannery corporate office facade
    listingCanneryCorporate: '/assets/leasing/leasing-listing-cannery-corporate.jpg',
    // TODO: Replace with Calumpang warehouse exterior
    listingCalumpangWarehouse: '/assets/leasing/leasing-listing-calumpang-warehouse.jpg',
    // TODO: Replace with F&B shell or storefront
    listingCalumpangDining: '/assets/leasing/leasing-listing-calumpang-dining.jpg',
    // TODO: Replace with cold storage / logistics shot
    listingCanneryColdStorage: '/assets/leasing/leasing-listing-cannery-cold-storage.jpg',
    // TODO: Replace with Upper Klinan office complex
    listingUpperKlinanOffice: '/assets/leasing/leasing-listing-upper-klinan-office.jpg',
  },

  resources: {
    // TODO: Replace with investor / growth themed still (non-stock when available)
    // Recommended size: 800×800, JPG or WebP
    investorFeature: '/assets/resources/resources-investor-feature.jpg',
  },

  contact: {
    // TODO: Replace with static map capture or branded map graphic (Polomolok HQ)
    // Recommended size: 1200×675, JPG or WebP
    mapPolomolok: '/assets/contact/contact-map-polomolok.jpg',
    // TODO: Replace with static map capture (General Santos / Calumpang office)
    mapGeneralSantos: '/assets/contact/contact-map-general-santos.jpg',
  },

  logos: {
    // TODO: Replace with official SRC wordmark (transparent PNG or SVG export)
    srcLogo: '/assets/logos/src-logo.png',
    // TODO: Replace with official PEZA seal (transparent PNG)
    pezaSeal: '/assets/logos/peza-seal.png',
  },

  partners: {
    // TODO: Replace with Dole partnership logo (transparent PNG preferred)
    doleLogo: '/assets/partners/dole-logo.png',
    // TODO: Replace with PEZA locator / partner mark if distinct from seal
    pezaLogo: '/assets/partners/peza-logo.png',
    // TODO: Replace with General Milling Corporation logo
    generalMillingLogo: '/assets/partners/general-milling-logo.png',
    // TODO: Replace with Century Pacific Food Inc. logo
    centuryPacificLogo: '/assets/partners/century-pacific-logo.png',
  },

  team: {
    // TODO: Replace with official portrait — President & CEO
    // Recommended size: 800×1000 (4:5 crop), JPG or WebP
    president: '/assets/team/team-president.jpg',
    // TODO: Replace — VP Operations & Development
    board1: '/assets/team/team-board-1.jpg',
    // TODO: Replace — VP Commercial Leasing
    board2: '/assets/team/team-board-2.jpg',
    // TODO: Replace — Corporate Secretary
    board3: '/assets/team/team-board-3.jpg',
    // TODO: Replace — CFO
    board4: '/assets/team/team-board-4.jpg',
    // TODO: Replace — Head Business Development
    board5: '/assets/team/team-board-5.jpg',
  },

  videos: {
    // TODO: Future embed or self-hosted corporate reel
    corporateReel: '/assets/videos/video-corporate-reel.mp4',
  },
} as const;
