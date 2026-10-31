import type { Product, GalleryItem, BusinessSettings } from '../types';

export const DEFAULT_SETTINGS: BusinessSettings = {
  companyName: 'JSP ForgeCore',
  brandName: 'JSP Metal Works',
  phone1: '7023746632',
  phone2: '7023746632',
  whatsappNumber: '7023746632',
  address: 'Kumharo Ka Mohalla, Cheethawari, Jaipur, Rajasthan 303704, India',
  locationLink: 'https://maps.google.com/?q=Cheethawari,+Jaipur,+Rajasthan',
  instagramHandle: '@jsp.metalswork',
  instagramUrl: 'https://www.instagram.com/jsp.metalworks?igsh=d3kzNG1sOGpqcm95',
  announcement: 'Direct Factory Manufacturing in Jaipur. Custom Orders & Bulk Architectural Works Welcome.',
  heroHeadline: 'Precision Metal Works. Strength That Lasts.',
  heroSubheading: 'Premium Metal Manufacturing & Fabrication Solutions in Jaipur.',
};

export const CATEGORY_DETAILS: Record<string, {
  name: string;
  hindi: string;
  description: string;
  subcategories: string[];
  imageUrl: string;
}> = {
  'Railings': {
    name: 'Railings',
    hindi: 'रेलिंग्स',
    description: 'Balcony, staircase, and terrace railings engineered with high-strength stainless steel and forged wrought iron.',
    subcategories: ['Balcony Railings', 'Staircase Railings', 'Terrace Railings', 'Window Grills', 'Designer Laser-Cut Railings'],
    imageUrl: 'https://uploads.onecompiler.io/43u3a24n6/1781176726457/RAILING2.jpeg',
  },
  'Metal Beds': {
    name: 'Metal Beds',
    hindi: 'मेटल बेड्स',
    description: 'Heavy-gauge steel beds engineered for ultimate durability, termite immunity, and modern residential aesthetics.',
    subcategories: ['Single Beds', 'Double Beds', 'Designer Beds', 'Custom Designed Heavy Beds'],
    imageUrl: 'https://uploads.onecompiler.io/43u3a24n6/1781176734282/BED.webp',
  },
  'Gates': {
    name: 'Gates',
    hindi: 'गेट्स',
    description: 'Robust architectural main gates, sliding security gates, and ornamental entrance doors tailored to property dimensions.',
    subcategories: ['Main Gates', 'Designer Gates', 'Sliding Gates', 'Customized Gates'],
    imageUrl: 'https://uploads.onecompiler.io/43u3a24n6/1781176749805/GATE2.webp',
  },
  'Chakki': {
    name: 'Chakki',
    hindi: 'चक्की',
    description: 'Traditional heavy-cast flour grinding mills engineered for domestic kitchens and commercial grain grinding businesses.',
    subcategories: ['Domestic Chakki', 'Commercial Chakki', 'Heavy Duty Atta Chakki Models', 'Motor-Operated Pulley Chakki'],
    imageUrl: 'https://uploads.onecompiler.io/43u3a24n6/1781176739319/CHAKKI.webp',
  },
  'Chara-Kutti Machines': {
    name: 'Chara-Kutti Machines',
    hindi: 'चारा / कुट्टी मशीन',
    description: 'Heavy duty agricultural chaff cutter machines manufactured with high carbon alloy blades for fodder cutting.',
    subcategories: ['Electric Chara Kutti Machine', 'Diesel Engine Compatible Models', 'Heavy Commercial Chaff Cutters', 'Customized Agricultural Requirements'],
    imageUrl: 'https://uploads.onecompiler.io/43u3a24n6/1781176730877/chaff-cutter-1-500x500.webp',
  },
  'Other Metal Works': {
    name: 'Other Metal Works',
    hindi: 'कस्टम मेटल वर्क्स',
    description: 'Bespoke industrial fabrication, structural shed work, iron trolleys, warehouse racks, and architectural ironcraft.',
    subcategories: ['Custom Metal Fabrication', 'Structural Iron Works', 'Customized Metal Products', 'Other Manufacturing Solutions'],
    imageUrl: 'https://uploads.onecompiler.io/43u3a24n6/44um23kzw/image_1783850044176.png',
  },
};

export const INITIAL_PRODUCTS: Product[] = [
  // 1. RAILINGS
  {
    id: 'prod-railing-balcony-ss',
    name: 'Architectural Balcony Railing (SS 304)',
    hindiName: 'बालकनी एसएस रेलिंग',
    category: 'Railings',
    subCategory: 'Balcony Railings',
    description: 'Premium corrosion-resistant Grade 304 stainless steel balcony railing with glass holder clamps or vertical safety spindle bars. Engineered for weather exposure across Rajasthan and North India.',
    materialInfo: 'Grade 304 Stainless Steel / Heavy Tube Frame',
    availableSizes: 'Custom fabricated to site specifications',
    customizationOptions: 'Toughened glass fittings, wood-finish top handrail, horizontal or vertical balusters, mirror buff or hairline satin finish.',
    manufacturingDetails: 'Precision argon TIG welded, seamless joint grinding, acid passivation treated for zero rust.',
    imageUrls: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
      'https://uploads.onecompiler.io/43u3a24n6/1781176726457/RAILING2.jpeg'
    ],
    isFeatured: true,
  },
  {
    id: 'prod-railing-staircase-iron',
    name: 'Ornamental Wrought Iron Staircase Railing',
    hindiName: 'सीढ़ी की सजावटी लोहे की रेलिंग',
    category: 'Railings',
    subCategory: 'Staircase Railings',
    description: 'Handcrafted wrought iron staircase railing featuring elegant forged scrolls, twisted square bars, and antique bronze powder-coated finish for luxury villas and residential duplexes.',
    materialInfo: 'Forged Mild Steel & Wrought Iron Solid Square Bars',
    availableSizes: 'Custom fabricated to site specifications',
    customizationOptions: 'Custom floral rosettes, spiral staircase adaptation, brass finials, matte black or antique golden copper paint.',
    manufacturingDetails: 'Hot forge twisted, MIG welded joint reinforcement, dual-layer anti-rust primer plus high-heat polyurethane coating.',
    imageUrls: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
  },
  {
    id: 'prod-railing-window-grill',
    name: 'Heavy Security Window Grill & Guard',
    hindiName: 'मजबूत सुरक्षा खिड़की जाली',
    category: 'Railings',
    subCategory: 'Window Grills',
    description: 'Robust security window grills fabricated with heavy mild steel square bars and flat ties to guarantee safety against break-ins without blocking daylight and ventilation.',
    materialInfo: 'Mild Steel Solid Bars + Outer Flat Border',
    availableSizes: 'Custom fabricated to site specifications',
    customizationOptions: 'AC bracket integration, box design for flower pots, mosquito mesh channel backing, quick-escape latch option.',
    manufacturingDetails: 'Interlocked drill-punched bar fabrication with continuous electric arc welding.',
    imageUrls: [
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
  },

  // 2. METAL BEDS
  {
    id: 'prod-bed-heavy-double',
    name: 'Heavy-Duty Steel Double Bed (King/Queen)',
    hindiName: 'मजबूत डबल मेटल बेड',
    category: 'Metal Beds',
    subCategory: 'Double Beds',
    description: 'Rock-solid fabricated metal double bed featuring heavy-duty steel tubular pillars, central support truss beam, and noise-free slatted mattress support.',
    materialInfo: 'Heavy Hollow Square Section + Cross Ribs',
    availableSizes: 'Custom fabricated to site specifications',
    customizationOptions: 'Headboard laser-cut floral motifs, built-in hydraulic or pull-out storage box, electro-static matte black or walnut brown finish.',
    manufacturingDetails: 'Modular knock-down bolt assembly for easy room entry with zero creaking guaranteed.',
    imageUrls: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
      'https://uploads.onecompiler.io/43u3a24n6/1781176734282/BED.webp'
    ],
    isFeatured: true,
  },
  {
    id: 'prod-bed-single-hostel',
    name: 'Single Metal Bed Frame (Hostel / Domestic)',
    hindiName: 'सिंगल मेटल बेड फ्रेम',
    category: 'Metal Beds',
    subCategory: 'Single Beds',
    description: 'Compact, ultra-durable single metal bed frame designed for hostels, guest rooms, and compact spaces. Heavy load engineered without deflection.',
    materialInfo: 'Heavy Mild Steel Round / Square Tubes with reinforcement angles',
    availableSizes: 'Custom fabricated to site specifications',
    customizationOptions: 'Under-bed clearance height, optional side safety rails for bunk conversion.',
    manufacturingDetails: 'Precision notched joints, automated MIG bead welding, scratch-resistant powder coating.',
    imageUrls: [
      'https://uploads.onecompiler.io/43u3a24n6/1781176734282/BED.webp'
    ],
    isFeatured: false,
  },

  // 3. GATES
  {
    id: 'prod-gate-designer-main',
    name: 'Architectural Designer Main Gate',
    hindiName: 'मुख्य डिजाइनर प्रवेश द्वार',
    category: 'Gates',
    subCategory: 'Main Gates',
    description: 'Grand compound main entrance gate engineered with a blend of heavy mild steel hollow box sections, laser cut CNC accent panels, and optional architectural louvers.',
    materialInfo: 'Heavy Post Columns + Framework & CNC Steel Sheets',
    availableSizes: 'Custom fabricated to site specifications',
    customizationOptions: 'Swing opening (single or bi-fold), wicket gate (small pedestrian door within gate), automated motor gear rack compatibility.',
    manufacturingDetails: 'Heavy-duty greasable brass barrel hinges for smooth long-term swing performance.',
    imageUrls: [
      'https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80',
      'https://uploads.onecompiler.io/43u3a24n6/1781176749805/GATE2.webp'
    ],
    isFeatured: true,
  },
  {
    id: 'prod-gate-sliding-industrial',
    name: 'Heavy Sliding Compound Gate',
    hindiName: 'स्लाइडिंग गेट (कंपाउंड)',
    category: 'Gates',
    subCategory: 'Sliding Gates',
    description: 'Effortless sliding gate for residential bungalows and commercial workshops with limited swing radius. Equipped with hardened steel ball-bearing track rollers.',
    materialInfo: 'Heavy MS Hollow Framework + Ground Track Rail + Top Guide Rollers',
    availableSizes: 'Custom fabricated to site specifications',
    customizationOptions: 'Cantilever (trackless) design, decorative spike tops, remote automation motor integration.',
    manufacturingDetails: 'Precision true-line alignment on leveling bed to prevent track jamming.',
    imageUrls: [
      'https://uploads.onecompiler.io/43u3a24n6/1781176749805/GATE2.webp'
    ],
    isFeatured: false,
  },

  // 4. CHAKKI
  {
    id: 'prod-chakki-domestic-heavy',
    name: 'Domestic Flour Grinding Mill (घरेलू चक्की)',
    hindiName: 'घरेलू आटा चक्की',
    category: 'Chakki',
    subCategory: 'Domestic Chakki',
    description: 'High-efficiency domestic grain grinding machine with balanced cast iron body, natural emery grinding stones, and uniform grain feed regulation mechanism.',
    materialInfo: 'Solid Cast Iron Housing & Base Plate with Food-Safe Stainless Steel Hopper',
    availableSizes: 'Custom fabricated to site specifications',
    customizationOptions: 'Electric single-phase motor mount, belt guard safety cover, wheat / maize / gram grinding stones.',
    manufacturingDetails: 'Vibration-damped dynamically balanced shaft and precision stone adjustment dial.',
    imageUrls: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
      'https://uploads.onecompiler.io/43u3a24n6/1781176739319/CHAKKI.webp'
    ],
    isFeatured: true,
  },
  {
    id: 'prod-chakki-commercial-atta',
    name: 'Heavy Commercial Atta Chakki (व्यावसायिक चक्की)',
    hindiName: 'व्यावसायिक आटा चक्की',
    category: 'Chakki',
    subCategory: 'Commercial Chakki',
    description: 'Industrial flour mill built for continuous operation in village flour mills and commercial spice processing units. High grinding yield with cool grind output.',
    materialInfo: 'Heavy-Grade Cast Iron Bed, High Chrome Alloy Shaft, Heavy Stones',
    availableSizes: 'Custom fabricated to site specifications',
    customizationOptions: 'Dual pulley arrangement, cyclone dust collector unit, hopper elevator adapter.',
    manufacturingDetails: 'Heavy-duty pillow block bearings with oil lubrication reservoirs for continuous grinding.',
    imageUrls: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: false,
  },

  // 5. CHARA-KUTTI MACHINES
  {
    id: 'prod-chara-kutti-electric',
    name: 'Electric Chaff Cutter Machine (चारा / कुट्टी मशीन)',
    hindiName: 'इलेक्ट्रिक चारा कुट्टी मशीन',
    category: 'Chara-Kutti Machines',
    subCategory: 'Electric Chara Kutti Machine',
    description: 'High-speed motor-driven fodder cutting machine suitable for dairy farms and livestock care in Rajasthan. Cuts green and dry fodder cleanly with minimal leaf loss.',
    materialInfo: 'Heavy Cast Iron Gearbox, Forged Carbon Steel Blades, Sturdy Angle Iron Stand',
    availableSizes: 'Custom fabricated to site specifications',
    customizationOptions: 'Blade speed gear adjustment (short / medium cut for cows vs buffaloes), dual flywheel for effortless inertia.',
    manufacturingDetails: 'Hardened and ground shear blades, enclosed gear safety casing, anti-backlash feed rollers.',
    imageUrls: [
      'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
      'https://uploads.onecompiler.io/43u3a24n6/1781176730877/chaff-cutter-1-500x500.webp'
    ],
    isFeatured: true,
  },

  // 6. OTHER METAL WORKS
  {
    id: 'prod-custom-fabrication-bespoke',
    name: 'Custom Industrial Metal Fabrication & Structural Works',
    hindiName: 'कस्टम इंडस्ट्रियल मेटल फैब्रिकेशन',
    category: 'Other Metal Works',
    subCategory: 'Custom Metal Fabrication',
    description: 'Tailor-made structural steel solutions including industrial sheds, mezzanine storage platforms, heavy material handling trolleys, and custom architectural metal features.',
    materialInfo: 'ISMC Channels, ISMB Beams, Heavy Angle Iron, Mild Steel Plates',
    availableSizes: 'Custom fabricated to site specifications',
    customizationOptions: 'Complete turnkey manufacturing: drafting, material procurement, fabrication, and on-site erection.',
    manufacturingDetails: 'Certified welding, CNC plate drilling, and rigid structural inspection.',
    imageUrls: [
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
      'https://uploads.onecompiler.io/43u3a24n6/44um23kzw/image_1783850044176.png'
    ],
    isFeatured: true,
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Completed Stainless Steel Balcony Railing Project',
    category: 'Railings',
    description: 'Installed at luxury residential bungalow in Jaipur. Grade 304 SS with seamless argon welds.',
    imageUrl: 'https://uploads.onecompiler.io/43u3a24n6/1781176726457/RAILING2.jpeg',
    location: 'Cheethawari, Jaipur',
    createdAt: '2026-03-15',
  },
  {
    id: 'gal-2',
    title: 'Architectural Main Gate Fabrication',
    category: 'Gates',
    description: 'Compound main gate with geometric steel patterns and bronze highlights.',
    imageUrl: 'https://uploads.onecompiler.io/43u3a24n6/1781176462038/IMG_20260531_195922_268.webp',
    location: 'Jaipur Outer, Rajasthan',
    createdAt: '2026-04-02',
  },
  {
    id: 'gal-3',
    title: 'Precision Metal Bed Frame Batch',
    category: 'Metal Beds',
    description: 'Custom fabricated heavy duty metal bed frames with anti-rust powder coating.',
    imageUrl: 'https://uploads.onecompiler.io/43u3a24n6/1781176504215/IMG_20260531_201627_035.webp',
    location: 'JSP ForgeCore Workshop',
    createdAt: '2026-04-18',
  },
  {
    id: 'gal-4',
    title: 'Heavy Domestic Chakki Units Ready for Delivery',
    category: 'Chakki',
    description: 'Cast iron body stone flour grinding mills assembled and calibrated for smooth operation.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    location: 'Kumharo Ka Mohalla, Cheethawari',
    createdAt: '2026-05-01',
  },
  {
    id: 'gal-5',
    title: 'Electric Chaff Cutter Machine Testing',
    category: 'Chara-Kutti Machines',
    description: 'Tested and certified motor operated fodder cutter with high carbon hardened blades.',
    imageUrl: 'https://uploads.onecompiler.io/43u3a24n6/1781176730877/chaff-cutter-1-500x500.webp',
    location: 'Agricultural Client Site, Rajasthan',
    createdAt: '2026-05-12',
  },
  {
    id: 'gal-6',
    title: 'Bespoke Structural Metal Framework',
    category: 'Other Metal Works',
    description: 'Custom heavy industrial iron framework and support stands manufactured to client specifications.',
    imageUrl: 'https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=800&q=80',
    location: 'Jaipur Industrial Area',
    createdAt: '2026-05-24',
  },
];
