export type Language = 'en' | 'hi';

export interface Translations {
  // Navigation & Top bar
  factoryDirect: string;
  callUs: string;
  home: string;
  products: string;
  ourWork: string;
  customOrders: string;
  quotation: string;
  aboutUs: string;
  contact: string;
  getQuote: string;
  themeLight: string;
  themeDark: string;

  // Hero Section
  heroHeadline1: string;
  heroHeadline2: string;
  heroSubheading: string;
  heroExploreBtn: string;
  heroQuoteBtn: string;
  heroWhatsAppBtn: string;
  badgeGauge: string;
  badgeCAD: string;
  badgePrice: string;
  badgeLocation: string;
  unitCertified: string;

  // Categories Showcase
  catSectionTag: string;
  catSectionTitle: string;
  catSectionSubtitle: string;
  catDivisionsCount: string;
  catViewProducts: string;
  catCustomQuote: string;
  catManufacturedSubtypes: string;

  // Featured Products
  featuredTag: string;
  featuredTitle: string;
  featuredSubtitle: string;
  featuredViewAll: string;
  startingFrom: string;
  viewDetails: string;
  whatsappInquiry: string;

  // Why Choose Us
  whyChooseTag: string;
  whyChooseTitle: string;
  whyChooseSubtitle: string;
  trust1Title: string;
  trust1Desc: string;
  trust2Title: string;
  trust2Desc: string;
  trust3Title: string;
  trust3Desc: string;
  trust4Title: string;
  trust4Desc: string;
  trust5Title: string;
  trust5Desc: string;
  trust6Title: string;
  trust6Desc: string;

  // Recent Work / Portfolio
  recentWorkTag: string;
  recentWorkTitle: string;
  viewFullPortfolio: string;
  realWorkProjects: string;

  // Quotation Estimator
  estimatorTag: string;
  estimatorTitle: string;
  estimatorSubtitle: string;
  selectDimensions: string;
  productWorkType: string;
  metalAlloy: string;
  dimensionsLengthHeight: string;
  metalGauge: string;
  quantityUnits: string;
  surfaceFinish: string;
  estimatedPriceBracket: string;
  estimatedWeight: string;
  totalArea: string;
  whatsappQuotationBtn: string;
  customDesignRequestBtn: string;

  // Custom Orders Form
  customOrderTag: string;
  customOrderTitle: string;
  customOrderSubtitle: string;
  yourName: string;
  mobileNumber: string;
  whatsappNumber: string;
  sameAsMobile: string;
  emailAddress: string;
  productCategory: string;
  requiredProductOrTitle: string;
  requiredDimensions: string;
  metalPreference: string;
  quantityCount: string;
  detailedRequirements: string;
  referenceImage: string;
  deliveryLocation: string;
  submitManufacturingEnquiry: string;
  enquirySubmittedSuccess: string;
  enquiryIdLabel: string;
  enquiryMessage: string;
  chatOnWhatsAppWithId: string;
  submitAnotherEnquiry: string;

  // Search & Filters
  searchPlaceholder: string;
  noProductsFound: string;
  resetFilters: string;
  needCustomBannerTitle: string;
  needCustomBannerSubtitle: string;
  requestCustomQuoteBannerBtn: string;

  // Footer
  footerAbout: string;
  footerManufacturing: string;
  footerFactoryLocation: string;
  footerFollowConnect: string;
  footerRights: string;
  footerMadeInJaipur: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    factoryDirect: 'Factory Direct:',
    callUs: 'Call:',
    home: 'Home',
    products: 'Products',
    ourWork: 'Our Work',
    customOrders: 'Custom Orders',
    quotation: 'Quotation',
    aboutUs: 'About Us',
    contact: 'Contact',
    getQuote: 'Get a Free Quote',
    themeLight: 'Light Theme',
    themeDark: 'Dark Theme',

    heroHeadline1: 'Precision Metal Works.',
    heroHeadline2: 'Strength That Lasts.',
    heroSubheading: 'Premium metal manufacturing and fabrication solutions in Jaipur. From high-grade architectural railings and heavy designer gates to custom metal beds and agricultural chaff cutter machinery.',
    heroExploreBtn: 'Explore Our Products',
    heroQuoteBtn: 'Get a Free Quote',
    heroWhatsAppBtn: 'WhatsApp Us',
    badgeGauge: 'Heavy Gauge Metals Only',
    badgeCAD: 'Custom CAD / Blueprint Sizing',
    badgePrice: 'Direct Factory Manufacturing',
    badgeLocation: 'Workshop & Fabrication Yard: Cheethawari, Jaipur',
    unitCertified: 'JSP Metal Works Unit · Certified Fabrication',

    catSectionTag: 'Manufacturing Capabilities',
    catSectionTitle: 'Our Manufacturing Categories',
    catSectionSubtitle: 'Engineered with industrial precision at our Jaipur workshop. Explore our core metal manufacturing specializations.',
    catDivisionsCount: '6 Specialized Divisions',
    catViewProducts: 'View Products',
    catCustomQuote: 'Custom Quote',
    catManufacturedSubtypes: 'Manufactured Sub-Types:',

    featuredTag: 'Manufactured Highlights',
    featuredTitle: 'Featured Fabricated Products',
    featuredSubtitle: 'Top-requested architectural steel works and heavy agro-machinery fabricated in Jaipur.',
    featuredViewAll: 'View All Products',
    startingFrom: 'Custom Quote Available',
    viewDetails: 'Details',
    whatsappInquiry: 'WhatsApp',

    whyChooseTag: 'Why Choose JSP ForgeCore',
    whyChooseTitle: 'Industrial Standards & Dedicated Craft',
    whyChooseSubtitle: 'Built by experienced metal craftsmen in Kumharo Ka Mohalla, Cheethawari. We treat every gate, railing, and machine as a test of our reputation.',
    trust1Title: 'Precision Engineering & True Gauge',
    trust1Desc: 'We never compromise on metal thickness. Pipes and hollow sections match promised gauge ratings (12G, 14G, 16G) to guarantee long-term rigidity.',
    trust2Title: 'Full Custom Fabrication to Blueprints',
    trust2Desc: 'Every site has unique heights, angles, and spans. Send your architect’s CAD drawings or rough sketches; we adapt joints to fit smoothly on site.',
    trust3Title: 'Multi-Layer Anti-Corrosion Finishing',
    trust3Desc: 'Raw welds are ground smooth and coated with red oxide primer followed by industrial enamel paint or electrostatic powder coating for weather immunity.',
    trust4Title: 'Reliable Delivery & Turnaround',
    trust4Desc: 'We operate full-time metal fabrication beds in Jaipur to ensure promised dispatch schedules without holding up client masonry work.',
    trust5Title: 'Agricultural Machinery Manufacturing',
    trust5Desc: 'Our chaff cutters (Chara-Kutti) and flour grinding mills (Chakki) are engineered with high carbon alloy blades and dynamic balancing for farm reliability.',
    trust6Title: 'Direct Factory Quotation',
    trust6Desc: 'Deal directly with the craftsmen who cut and weld your metal. Authentic rates, honest material specs, and zero showroom broker markups.',

    recentWorkTag: 'Factory Showcase',
    recentWorkTitle: 'Recent Manufacturing Work',
    viewFullPortfolio: 'View Full Portfolio Gallery',
    realWorkProjects: 'Real Work Projects',

    estimatorTag: 'Instant Engineering Guide',
    estimatorTitle: 'Online Manufacturing Quotation Estimator',
    estimatorSubtitle: 'Calculate estimated metal weight, raw material requirements, and fabrication cost range based on real Jaipur industrial workshop standards.',
    selectDimensions: 'Select Dimensions & Metallurgy',
    productWorkType: '1. Product Work Type',
    metalAlloy: '2. Metal Alloy & Grade',
    dimensionsLengthHeight: '3. Dimensions (Length x Height in Feet)',
    metalGauge: '4. Metal Thickness / Gauge',
    quantityUnits: '5. Quantity (Units)',
    surfaceFinish: '6. Surface Coating / Finish',
    estimatedPriceBracket: 'Estimated Price Bracket',
    estimatedWeight: 'Estimated Total Metal Weight',
    totalArea: 'Dimensions Area',
    whatsappQuotationBtn: 'Send Quotation to WhatsApp',
    customDesignRequestBtn: 'Send Custom Order Request With This Spec',

    customOrderTag: 'Bespoke Metal Fabrication',
    customOrderTitle: 'Custom Manufacturing Request',
    customOrderSubtitle: 'Share your drawing, photographs, architectural plans or site dimensions. Our Jaipur engineering workshop will review and prepare a custom manufacturing proposal.',
    yourName: 'Customer Name *',
    mobileNumber: 'Mobile Number *',
    whatsappNumber: 'WhatsApp Number *',
    sameAsMobile: 'WhatsApp number is same as mobile',
    emailAddress: 'Email Address (Optional)',
    productCategory: 'Product Category *',
    requiredProductOrTitle: 'Required Product / Item Name',
    requiredDimensions: 'Installation Area / Application Site',
    metalPreference: 'Material Preference *',
    quantityCount: 'Quantity / Units *',
    detailedRequirements: 'Description of Requirements & Specs *',
    referenceImage: 'Upload Reference Image / Design Photo',
    deliveryLocation: 'Delivery / Installation Location',
    submitManufacturingEnquiry: 'Submit Manufacturing Enquiry',
    enquirySubmittedSuccess: 'Manufacturing Enquiry Received Successfully!',
    enquiryIdLabel: 'Your Enquiry Reference ID:',
    enquiryMessage: 'Our Jaipur workshop engineering team has logged your requirements. You can also discuss urgent site schedules directly on WhatsApp.',
    chatOnWhatsAppWithId: 'Chat on WhatsApp with Enquiry ID',
    submitAnotherEnquiry: 'Submit Another Custom Enquiry',

    searchPlaceholder: 'Search products, materials...',
    noProductsFound: 'No products found matching your search.',
    resetFilters: 'Reset Filters',
    needCustomBannerTitle: 'Need Custom Dimensions or Architectural Design?',
    needCustomBannerSubtitle: 'We fabricate every product strictly according to your site measurements, CAD drawings, or reference photos.',
    requestCustomQuoteBannerBtn: 'Request Custom Sizing & Quote',

    footerAbout: 'Industrial metal fabrication, high-grade architectural railings, heavy gates, metal beds, and agricultural machines manufactured in Jaipur, Rajasthan.',
    footerManufacturing: 'Manufacturing',
    footerFactoryLocation: 'Factory Location',
    footerFollowConnect: 'Follow & Connect',
    footerRights: 'All rights reserved.',
    footerMadeInJaipur: 'Precision Metal Fabrication in Jaipur, India',
  },
  hi: {
    factoryDirect: 'सीधे फैक्ट्री से:',
    callUs: 'कॉल करें:',
    home: 'होम',
    products: 'उत्पाद',
    ourWork: 'हमारा काम',
    customOrders: 'कस्टम ऑर्डर',
    quotation: 'कोटेशन कैलकुलेटर',
    aboutUs: 'हमारे बारे में',
    contact: 'संपर्क करें',
    getQuote: 'मुफ्त कोटेशन लें',
    themeLight: 'लाइट थीम',
    themeDark: 'डार्क थीम',

    heroHeadline1: 'सटीक मेटल वर्क्स।',
    heroHeadline2: 'मजबूती जो चले सालों-साल।',
    heroSubheading: 'जयपुर में प्रीमियम मेटल मैन्युफैक्चरिंग एवं फैब्रिकेशन समाधान। मजबूत बालकनी व सीढ़ी रेलिंग्स, भारी डिजाइनर गेट, मजबूत लोहे के बेड और भरोसेमंद आटा चक्की व कुट्टी मशीनें।',
    heroExploreBtn: 'हमारे उत्पाद देखें',
    heroQuoteBtn: 'मुफ्त कोटेशन लें',
    heroWhatsAppBtn: 'व्हाट्सएप पर बात करें',
    badgeGauge: 'केवल असली भारी गेज लोहा',
    badgeCAD: 'नक्शा व साइज अनुसार निर्माण',
    badgePrice: 'सीधे फैक्ट्री निर्माण',
    badgeLocation: 'वर्कशॉप व फैब्रिकेशन यार्ड: चीथावाड़ी, जयपुर',
    unitCertified: 'JSP मेटल वर्क्स यूनिट · प्रमाणित फैब्रिकेशन',

    catSectionTag: 'हमारी निर्माण क्षमताएं',
    catSectionTitle: 'हमारी विनिर्माण श्रेणियां',
    catSectionSubtitle: 'हमारे जयपुर वर्कशॉप में पूर्ण मजबूती व फिनिशिंग के साथ तैयार। हमारे प्रमुख मेटल वर्क्स उत्पाद देखें।',
    catDivisionsCount: '6 मुख्य विनिर्माण प्रभाग',
    catViewProducts: 'उत्पाद देखें',
    catCustomQuote: 'कस्टम कोटेशन',
    catManufacturedSubtypes: 'निर्मित प्रकार:',

    featuredTag: 'प्रमुख विनिर्माण हाइलाइट्स',
    featuredTitle: 'विशेष फैब्रिकेटेड उत्पाद',
    featuredSubtitle: 'जयपुर में तैयार उच्च गुणवत्ता वाली रेलिंग्स, भारी गेट्स, लोहे के बेड और कृषि चारा-कुट्टी मशीनें।',
    featuredViewAll: 'सभी उत्पाद देखें',
    startingFrom: 'कस्टम साइज कोटेशन उपलब्ध',
    viewDetails: 'विवरण देखें',
    whatsappInquiry: 'व्हाट्सएप',

    whyChooseTag: 'JSP ForgeCore ही क्यों चुनें',
    whyChooseTitle: 'औद्योगिक स्तर की मजबूती और समर्पित कारीगरी',
    whyChooseSubtitle: 'कुम्हारों का मोहल्ला, चीथावाड़ी में अनुभवी कारीगरों द्वारा निर्मित। हम हर गेट, रेलिंग और मशीन को अपनी प्रतिष्ठा की कसौटी मानते हैं।',
    trust1Title: 'सटीक इंजीनियरिंग और सही गेज',
    trust1Desc: 'हम लोहे और स्टील की मोटाई में कोई समझौता नहीं करते। पाइप और सेक्शन वादे के अनुसार सही गेज (12G, 14G, 16G) में होते हैं।',
    trust2Title: 'नक्शे और साइज के अनुसार कस्टम फैब्रिकेशन',
    trust2Desc: 'हर साइट की ऊंचाई और माप अलग होती है। अपना नक्शा या ड्राइंग भेजें; हम साइट के अनुसार सटीक फिटिंग तैयार करते हैं।',
    trust3Title: 'एंटी-जंग मल्टी-लेयर कोटिंग',
    trust3Desc: 'वेल्डिंग को स्मूथ ग्राइंड करके रेड ऑक्साइड प्राइमर और उच्च गुणवत्ता वाले इनेमल पेंट या पाउडर कोटिंग की जाती है।',
    trust4Title: 'समय पर डिलीवरी का पक्का वादा',
    trust4Desc: 'जयपुर में हमारा पूर्णकालिक वर्कशॉप है, जिससे ग्राहकों के कंस्ट्रक्शन काम में देरी न हो और समय पर माल मिले।',
    trust5Title: 'कृषि एवं डेयरी मशीनों का निर्माण',
    trust5Desc: 'हमारी चारा कुट्टी मशीनें और आटा चक्की हाई-कार्बन अलॉय ब्लेड्स और परफेक्ट बैलेंसिंग के साथ फार्म में सालों-साल चलती हैं।',
    trust6Title: 'सीधे फैक्ट्री से वाजिब दाम',
    trust6Desc: 'सीधे कारीगरों से संपर्क करें जो आपका माल तैयार करते हैं। कोई बिचौलिया या शोरूम का अतिरिक्त चार्ज नहीं।',

    recentWorkTag: 'फैक्ट्री शोकेस',
    recentWorkTitle: 'हाल ही में निर्मित कार्य',
    viewFullPortfolio: 'पूरा पोर्टफोलियो गैलरी देखें',
    realWorkProjects: 'वास्तविक प्रोजेक्ट्स',

    estimatorTag: 'त्वरित इंजीनियरिंग कैलकुलेटर',
    estimatorTitle: 'ऑनलाइन मैन्युफैक्चरिंग कोटेशन कैलकुलेटर',
    estimatorSubtitle: 'अपने साइज और मटेरियल के अनुसार अनुमानित लोहे का वजन और खर्च का अनुमान लगाएं।',
    selectDimensions: 'माप और धातु (मटेरियल) चुनें',
    productWorkType: '1. उत्पाद का प्रकार',
    metalAlloy: '2. धातु का प्रकार (मटेरियल)',
    dimensionsLengthHeight: '3. साइज (लंबाई x ऊंचाई फीट में)',
    metalGauge: '4. धातु की मोटाई / गेज',
    quantityUnits: '5. मात्रा (यूनिट्स)',
    surfaceFinish: '6. पेंट / कोटिंग प्रकार',
    estimatedPriceBracket: 'अनुमानित लागत दायरा',
    estimatedWeight: 'अनुमानित कुल धातु वजन',
    totalArea: 'कुल क्षेत्रफल',
    whatsappQuotationBtn: 'यह कोटेशन व्हाट्सएप पर भेजें',
    customDesignRequestBtn: 'इस माप के साथ कस्टम ऑर्डर भेजें',

    customOrderTag: 'कस्टम मेटल फैब्रिकेशन',
    customOrderTitle: 'कस्टम विनिर्माण अनुरोध (Custom Order)',
    customOrderSubtitle: 'अपनी ड्राइंग, फोटो, साइट का नाप या विशेष आवश्यकताएं भेजें। हमारा जयपुर वर्कशॉप आपको कस्टम कोटेशन तैयार करके देगा।',
    yourName: 'आपका नाम *',
    mobileNumber: 'मोबाइल नंबर *',
    whatsappNumber: 'व्हाट्सएप नंबर *',
    sameAsMobile: 'व्हाट्सएप नंबर मोबाइल नंबर जैसा ही है',
    emailAddress: 'ईमेल पता (वैकल्पिक)',
    productCategory: 'उत्पाद श्रेणी *',
    requiredProductOrTitle: 'आवश्यक उत्पाद का नाम',
    requiredDimensions: 'इंस्टॉलेशन एरिया या साइट विवरण',
    metalPreference: 'मटेरियल प्राथमिकता *',
    quantityCount: 'मात्रा / संख्या *',
    detailedRequirements: 'आवश्यकता का पूरा विवरण *',
    referenceImage: 'रेफरेंस फोटो या ड्राइंग अपलोड करें',
    deliveryLocation: 'डिलीवरी या साइट का स्थान',
    submitManufacturingEnquiry: 'विनिर्माण पूछताछ भेजें (Submit Enquiry)',
    enquirySubmittedSuccess: 'आपकी विनिर्माण पूछताछ सफलतापूर्वक प्राप्त हुई!',
    enquiryIdLabel: 'आपकी पूछताछ रेफरेंस आईडी:',
    enquiryMessage: 'हमारे जयपुर वर्कशॉप ने आपकी आवश्यकताएं दर्ज कर ली हैं। आप तुरंत साइट विजिट या डिस्कशन के लिए व्हाट्सएप पर भी जुड़ सकते हैं।',
    chatOnWhatsAppWithId: 'पूछताछ आईडी के साथ व्हाट्सएप करें',
    submitAnotherEnquiry: 'एक और कस्टम पूछताछ भेजें',

    searchPlaceholder: 'उत्पाद, मटेरियल खोजें...',
    noProductsFound: 'कोई उत्पाद नहीं मिला।',
    resetFilters: 'फ़िल्टर रीसेट करें',
    needCustomBannerTitle: 'क्या आपको कस्टम साइज या विशेष डिजाइन चाहिए?',
    needCustomBannerSubtitle: 'हम आपकी साइट के सही माप, आर्किटेक्ट की ड्राइंग या रेफरेंस फोटो के अनुसार काम करते हैं।',
    requestCustomQuoteBannerBtn: 'कस्टम साइज और कोटेशन मांगें',

    footerAbout: 'जयपुर, राजस्थान में उच्च गुणवत्ता वाली मेटल रेलिंग्स, भारी गेट्स, लोहे के बेड, आटा चक्की और कृषि मशीनों का निर्माण।',
    footerManufacturing: 'विनिर्माण',
    footerFactoryLocation: 'फैक्ट्री का पता',
    footerFollowConnect: 'जुड़ें और फॉलो करें',
    footerRights: 'सर्वाधिकार सुरक्षित।',
    footerMadeInJaipur: 'सटीक मेटल फैब्रिकेशन - जयपुर, राजस्थान, भारत',
  },
};
