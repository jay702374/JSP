import React, { useState, useEffect } from 'react';
import { 
  Header 
} from './components/Header';
import { 
  Hero 
} from './components/Hero';
import { 
  CategoryShowcase 
} from './components/CategoryShowcase';
import { 
  ProductCard 
} from './components/ProductCard';
import { 
  ProductDetailModal 
} from './components/ProductDetailModal';
import { 
  CustomOrderForm 
} from './components/CustomOrderForm';
import { 
  QuotationEstimator 
} from './components/QuotationEstimator';
import { 
  ProjectGallery 
} from './components/ProjectGallery';
import { 
  AboutUs 
} from './components/AboutUs';
import { 
  ContactSection 
} from './components/ContactSection';
import { 
  AdminDashboard 
} from './components/AdminDashboard';
import { 
  AdminLoginModal 
} from './components/AdminLoginModal';
import { 
  FloatingWhatsApp 
} from './components/FloatingWhatsApp';
import { 
  Footer 
} from './components/Footer';

import { 
  getProducts, 
  saveProduct, 
  deleteProduct, 
  getEnquiries, 
  updateEnquiryStatus, 
  getGallery, 
  saveGalleryItem, 
  deleteGalleryItem, 
  getSettings, 
  saveSettings,
  subscribeToAuth,
  logoutUser
} from './services/firebase';

import { 
  DEFAULT_SETTINGS, 
  INITIAL_PRODUCTS, 
  INITIAL_GALLERY 
} from './data/defaultData';

import type { 
  Product, 
  Enquiry, 
  GalleryItem, 
  BusinessSettings, 
  ProductCategory, 
  QuotationStatus 
} from './types';

import { 
  Search, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Clock, 
  Award, 
  Hammer, 
  Layers 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { translations, type Language } from './utils/translations';

const isAdminPath = () => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase();
  const hash = window.location.hash.toLowerCase();
  return path === '/admin' || path === '/admin/' || hash === '#admin' || hash === '#/admin';
};

export default function App() {
  const [activeTab, setActiveTab] = useState(() => (isAdminPath() ? 'admin' : 'home'));
  const [settings, setSettings] = useState<BusinessSettings>(DEFAULT_SETTINGS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>(INITIAL_GALLERY);

  // Filter and search on products tab
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('All');
  const [productSearchQuery, setProductSearchQuery] = useState('');

  // Modals & Authentication
  const [activeProductDetail, setActiveProductDetail] = useState<Product | null>(null);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  // Language management (default to English 'en' with toggle to 'hi')
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jsp_lang');
      if (stored === 'en' || stored === 'hi') return stored;
    }
    return 'en';
  });

  useEffect(() => {
    try {
      localStorage.setItem('jsp_lang', language);
    } catch {
      // ignore
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = translations[language];

  // Custom order prefill
  const [customOrderPrefill, setCustomOrderPrefill] = useState<{
    category?: string;
    productName?: string;
    description?: string;
  }>({});

  // Theme management: default to dark, support light theme
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jsp_theme');
      if (stored === 'light' || stored === 'dark') return stored;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('jsp_theme', theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // URL /admin route listener
  useEffect(() => {
    const handleUrlChange = () => {
      if (isAdminPath()) {
        setActiveTab('admin');
        if (!isAdminLoggedIn) {
          setIsAdminLoginOpen(true);
        }
      } else if (activeTab === 'admin') {
        setActiveTab('home');
      }
    };

    if (isAdminPath() && !isAdminLoggedIn) {
      setIsAdminLoginOpen(true);
    }

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, [isAdminLoggedIn, activeTab]);

  // Initial Data Fetch
  useEffect(() => {
    async function initData() {
      try {
        const [loadedSettings, loadedProducts, loadedEnquiries, loadedGallery] = await Promise.all([
          getSettings(),
          getProducts(),
          getEnquiries(),
          getGallery(),
        ]);
        setSettings(loadedSettings);
        setProducts(loadedProducts);
        setEnquiries(loadedEnquiries);
        setGallery(loadedGallery);
      } catch (err) {
        console.warn('Initial load warning, utilizing fallback:', err);
      }
    }
    initData();

    // Firebase Auth subscription
    const unsubscribe = subscribeToAuth((user) => {
      if (user) {
        setIsAdminLoggedIn(true);
        setCurrentUserEmail(user.email || null);
      }
    });
    return () => unsubscribe();
  }, []);

  // Handlers
  const handleNavigateTab = (tab: string) => {
    setActiveTab(tab);
    if (tab === 'admin') {
      if (window.location.pathname !== '/admin') {
        window.history.pushState(null, '', '/admin');
      }
      if (!isAdminLoggedIn) {
        setIsAdminLoginOpen(true);
      }
    } else {
      if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
        window.history.pushState(null, '', '/');
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategoryFromHome = (cat: ProductCategory) => {
    setProductCategoryFilter(cat);
    handleNavigateTab('products');
  };

  const handleCustomOrderForCategory = (cat: ProductCategory) => {
    setCustomOrderPrefill({ category: cat });
    handleNavigateTab('custom-orders');
  };

  const handleOpenQuotationPrefill = (prefill: { category: string; description: string }) => {
    setCustomOrderPrefill(prefill);
    handleNavigateTab('custom-orders');
  };

  const handleProductQuoteRequest = (product: Product) => {
    setCustomOrderPrefill({
      category: product.category,
      productName: product.name,
      description: `Requirement for ${product.name} (${product.subCategory}). Specifications: ${product.materialInfo}.`,
    });
    handleNavigateTab('custom-orders');
  };

  // Admin Data Actions
  const handleSaveProduct = async (product: Product) => {
    await saveProduct(product);
    const updated = await getProducts();
    setProducts(updated);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id);
    const updated = await getProducts();
    setProducts(updated);
  };

  const handleUpdateEnquiry = async (
    id: string, 
    status: QuotationStatus, 
    quoteAmount?: string, 
    notes?: string
  ) => {
    await updateEnquiryStatus(id, status, quoteAmount, notes);
    const updated = await getEnquiries();
    setEnquiries(updated);
  };

  const handleSaveGalleryItem = async (item: GalleryItem) => {
    await saveGalleryItem(item);
    const updated = await getGallery();
    setGallery(updated);
  };

  const handleDeleteGalleryItem = async (id: string) => {
    await deleteGalleryItem(id);
    const updated = await getGallery();
    setGallery(updated);
  };

  const handleSaveSettings = async (newSettings: BusinessSettings) => {
    await saveSettings(newSettings);
    setSettings(newSettings);
  };

  const handleAdminLogout = async () => {
    await logoutUser();
    setIsAdminLoggedIn(false);
    setCurrentUserEmail(null);
    if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
      window.history.pushState(null, '', '/');
    }
    setActiveTab('home');
  };

  // Products Filter logic
  const filteredProducts = products.filter((p) => {
    const matchesCategory = productCategoryFilter === 'All' || p.category === productCategoryFilter;
    const matchesSearch = 
      p.name.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      (p.hindiName && p.hindiName.includes(productSearchQuery)) ||
      p.subCategory.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(productSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 6);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 selection:bg-amber-500 selection:text-stone-950 font-sans transition-colors duration-200">
      {/* Header - No visible Admin button, with Language and Theme Toggles */}
      <Header
        settings={settings}
        activeTab={activeTab}
        setActiveTab={handleNavigateTab}
        onOpenQuote={() => handleNavigateTab('custom-orders')}
        theme={theme}
        onToggleTheme={toggleTheme}
        language={language}
        onToggleLanguage={toggleLanguage}
      />

      {/* Main Views Container */}
      <main className="flex-1">
        {/* VIEW 1: HOME */}
        {activeTab === 'home' && (
          <div>
            {/* Hero Section */}
            <Hero
              settings={settings}
              onExploreProducts={() => handleNavigateTab('products')}
              onGetQuote={() => handleNavigateTab('custom-orders')}
              language={language}
            />

            {/* Category Showcase (6 Categories) */}
            <CategoryShowcase
              onSelectCategory={handleSelectCategoryFromHome}
              onCustomOrderForCategory={handleCustomOrderForCategory}
              language={language}
            />

            {/* Featured Products Section */}
            <section className="py-16 bg-stone-100/70 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4"
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500 block">
                      {t.featuredTag}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight mt-1">
                      {t.featuredTitle}
                    </h2>
                    <p className="text-stone-600 dark:text-stone-400 text-sm mt-1">
                      {t.featuredSubtitle}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setProductCategoryFilter('All');
                      handleNavigateTab('products');
                    }}
                    className="self-start sm:self-auto text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{t.featuredViewAll} ({products.length})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {featuredProducts.map((product, idx) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={idx}
                      onViewDetails={(p) => setActiveProductDetail(p)}
                      onRequestQuote={handleProductQuoteRequest}
                      whatsappNumber={settings.whatsappNumber}
                      language={language}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Why Choose JSP ForgeCore (Trust & Engineering Craftsmanship) */}
            <section className="py-16 bg-white dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="text-center mb-12"
                >
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500 block">
                    {t.whyChooseTag}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight mt-1">
                    {t.whyChooseTitle}
                  </h2>
                  <p className="text-stone-600 dark:text-stone-400 text-sm mt-2 max-w-xl mx-auto">
                    {t.whyChooseSubtitle}
                  </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: ShieldCheck, title: t.trust1Title, desc: t.trust1Desc },
                    { icon: Hammer, title: t.trust2Title, desc: t.trust2Desc },
                    { icon: Award, title: t.trust3Title, desc: t.trust3Desc },
                    { icon: Clock, title: t.trust4Title, desc: t.trust4Desc },
                    { icon: Layers, title: t.trust5Title, desc: t.trust5Desc },
                    { icon: CheckCircle2, title: t.trust6Title, desc: t.trust6Desc },
                  ].map((card, idx) => {
                    const IconComp = card.icon;
                    return (
                      <motion.div
                        key={card.title}
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{
                          duration: 0.45,
                          delay: (idx % 3) * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="p-6 rounded-xl bg-stone-50 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/40 transition-colors duration-300 flex flex-col justify-between shadow-xs hover:shadow-lg"
                      >
                        <div>
                          <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-500 mb-4">
                            <IconComp className="w-5 h-5" />
                          </div>
                          <h3 className="text-base font-bold text-stone-900 dark:text-white mb-2">
                            {card.title}
                          </h3>
                          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                            {card.desc}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* Embedded Quotation Estimator Teaser */}
            <QuotationEstimator
              settings={settings}
              onOpenCustomOrder={handleOpenQuotationPrefill}
            />

            {/* Our Recent Work Portfolio Preview */}
            <section className="py-16 bg-stone-100/70 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-colors">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4"
                >
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500 block">
                      {t.recentWorkTag}
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight mt-1">
                      {t.recentWorkTitle}
                    </h2>
                  </div>
                  <button
                    onClick={() => handleNavigateTab('our-work')}
                    className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>{t.viewFullPortfolio}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {gallery.slice(0, 4).map((item, idx) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{
                        duration: 0.45,
                        delay: idx * 0.08,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      onClick={() => handleNavigateTab('our-work')}
                      className="group rounded-xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 cursor-pointer transition-all aspect-[4/3] relative shadow-xs hover:shadow-lg"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-80" />
                      <div className="absolute bottom-2.5 left-2.5 right-2.5">
                        <span className="text-[10px] text-amber-400 font-semibold block">
                          {item.category}
                        </span>
                        <h4 className="text-xs font-bold text-white line-clamp-1">
                          {item.title}
                        </h4>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Direct Custom Enquiry Form on Homepage */}
            <CustomOrderForm
              settings={settings}
              initialCategory="Railings"
              onEnquirySubmitted={async () => {
                const updated = await getEnquiries();
                setEnquiries(updated);
              }}
            />
          </div>
        )}

        {/* VIEW 2: PRODUCTS CATALOG */}
        {activeTab === 'products' && (
          <div className="py-12 bg-stone-50 dark:bg-stone-950 transition-colors">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4"
              >
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500 block">
                    {t.products}
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight mt-1">
                    {language === 'hi' ? 'मेटल विनिर्माण उत्पाद कैटलॉग' : 'Metal Manufacturing Products'}
                  </h1>
                  <p className="text-stone-600 dark:text-stone-400 text-sm mt-1 max-w-xl">
                    {language === 'hi'
                      ? 'उच्च मजबूती वाली रेलिंग्स, कस्टम गेट्स, स्टील बेड्स, पारंपरिक आटा चक्की और कृषि चारा-कुट्टी मशीनें।'
                      : 'High-strength railings, custom gates, steel beds, traditional flour mills, and agricultural chaff cutter machinery.'}
                  </p>
                </div>

                {/* Search Input */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 text-stone-400 dark:text-stone-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    placeholder={t.searchPlaceholder}
                    className="w-full pl-9 pr-3.5 py-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-500 shadow-xs"
                  />
                </div>
              </motion.div>

              {/* Category Segmented Filter Tabs */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-stone-200 dark:border-stone-800 scrollbar-none">
                {[
                  'All',
                  'Railings',
                  'Gates',
                  'Metal Beds',
                  'Chakki',
                  'Chara-Kutti Machines',
                  'Other Metal Works',
                ].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setProductCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all border cursor-pointer ${
                      productCategoryFilter === cat
                        ? 'bg-amber-500 text-stone-950 border-amber-500 shadow-xs font-bold'
                        : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 shadow-xs'
                    }`}
                  >
                    {cat === 'All' && language === 'hi' ? 'सभी' : cat}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="p-16 text-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl space-y-3 shadow-xs">
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    {t.noProductsFound}
                  </p>
                  <button
                    onClick={() => {
                      setProductSearchQuery('');
                      setProductCategoryFilter('All');
                    }}
                    className="py-2 px-4 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold hover:bg-stone-200 dark:hover:bg-stone-700 cursor-pointer"
                  >
                    {t.resetFilters}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {filteredProducts.map((product, idx) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={idx}
                      onViewDetails={(p) => setActiveProductDetail(p)}
                      onRequestQuote={handleProductQuoteRequest}
                      whatsappNumber={settings.whatsappNumber}
                      language={language}
                    />
                  ))}
                </div>
              )}

              {/* Custom Order Callout Banner */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-stone-900 via-stone-900 to-stone-950 text-white border border-amber-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl"
              >
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {t.needCustomBannerTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-xl">
                    {t.needCustomBannerSubtitle}
                  </p>
                </div>

                <button
                  onClick={() => handleNavigateTab('custom-orders')}
                  className="py-3 px-6 rounded-lg bg-metallic-orange hover:brightness-110 text-stone-950 font-bold text-xs transition-all whitespace-nowrap shadow-md cursor-pointer"
                >
                  {t.requestCustomQuoteBannerBtn}
                </button>
              </motion.div>
            </div>
          </div>
        )}

        {/* VIEW 3: OUR WORK / PORTFOLIO */}
        {activeTab === 'our-work' && (
          <ProjectGallery gallery={gallery} />
        )}

        {/* VIEW 4: CUSTOM MANUFACTURING REQUEST FORM */}
        {activeTab === 'custom-orders' && (
          <div className="py-6">
            <CustomOrderForm
              settings={settings}
              initialCategory={customOrderPrefill.category || 'Railings'}
              initialProductName={customOrderPrefill.productName || ''}
              onEnquirySubmitted={async () => {
                const updated = await getEnquiries();
                setEnquiries(updated);
              }}
            />
          </div>
        )}

        {/* VIEW 5: ONLINE QUOTATION ESTIMATOR */}
        {activeTab === 'estimator' && (
          <QuotationEstimator
            settings={settings}
            onOpenCustomOrder={handleOpenQuotationPrefill}
          />
        )}

        {/* VIEW 6: ABOUT US */}
        {activeTab === 'about' && (
          <AboutUs
            settings={settings}
            onContactClick={() => handleNavigateTab('contact')}
          />
        )}

        {/* VIEW 7: CONTACT US */}
        {activeTab === 'contact' && (
          <ContactSection settings={settings} />
        )}

        {/* VIEW 8: ADMIN DASHBOARD (Accessible directly via /admin URL) */}
        {activeTab === 'admin' && (
          <AdminDashboard
            products={products}
            enquiries={enquiries}
            gallery={gallery}
            settings={settings}
            onSaveProduct={handleSaveProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateEnquiry={handleUpdateEnquiry}
            onSaveGalleryItem={handleSaveGalleryItem}
            onDeleteGalleryItem={handleDeleteGalleryItem}
            onSaveSettings={handleSaveSettings}
            onLogout={handleAdminLogout}
            currentUserEmail={currentUserEmail}
          />
        )}
      </main>

      {/* Floating WhatsApp and Quick Contact Widget */}
      <FloatingWhatsApp
        settings={settings}
        onOpenCustomOrder={() => handleNavigateTab('custom-orders')}
      />

      {/* Footer - No visible admin button */}
      <Footer
        settings={settings}
        onNavigate={handleNavigateTab}
        language={language}
      />

      {/* Product Detail Lightbox Modal */}
      <ProductDetailModal
        product={activeProductDetail}
        onClose={() => setActiveProductDetail(null)}
        onRequestQuote={handleProductQuoteRequest}
        settings={settings}
      />

      {/* Admin Authentication Modal (Opens on /admin when unauthenticated) */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => {
          setIsAdminLoginOpen(false);
          if (activeTab === 'admin' && !isAdminLoggedIn) {
            if (window.location.pathname === '/admin' || window.location.pathname === '/admin/') {
              window.history.pushState(null, '', '/');
            }
            setActiveTab('home');
          }
        }}
        onSuccess={(email) => {
          setIsAdminLoggedIn(true);
          setCurrentUserEmail(email || 'Admin');
          setIsAdminLoginOpen(false);
          setActiveTab('admin');
          if (window.location.pathname !== '/admin') {
            window.history.pushState(null, '', '/admin');
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
