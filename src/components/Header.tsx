import React, { useState } from 'react';
import { 
  Phone, 
  Menu, 
  X, 
  ArrowRight, 
  Sun, 
  Moon,
  Globe 
} from 'lucide-react';
import type { BusinessSettings } from '../types';
import { translations, type Language } from '../utils/translations';

interface HeaderProps {
  settings: BusinessSettings;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuote: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  language: Language;
  onToggleLanguage: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  settings,
  activeTab,
  setActiveTab,
  onOpenQuote,
  theme,
  onToggleTheme,
  language,
  onToggleLanguage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'products', label: t.products },
    { id: 'our-work', label: t.ourWork },
    { id: 'custom-orders', label: t.customOrders },
    { id: 'estimator', label: t.quotation },
    { id: 'about', label: t.aboutUs },
    { id: 'contact', label: t.contact },
  ];

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-stone-950/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors shadow-xs">
      {/* Top Banner Notice */}
      {settings.announcement && (
        <div className="bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 px-4 py-1.5 text-xs text-stone-700 dark:text-stone-300 text-center font-medium transition-colors">
          <span className="text-amber-600 dark:text-amber-500 font-semibold mr-1.5">🏭 {t.factoryDirect}</span>
          {settings.announcement}
          <a 
            href="tel:7023746632"
            className="ml-2 text-amber-600 dark:text-amber-400 hover:underline font-mono font-medium"
          >
            {t.callUs} 7023746632
          </a>
        </div>
      )}

      {/* Main Top Bar Contract: 3 Zones */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6 sm:gap-8">
        {/* Zone 1: Brand Wordmark (Single text element, 1 line) */}
        <button
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left focus:outline-none group shrink-0 cursor-pointer"
          aria-label="JSP ForgeCore Home"
        >
          <div className="w-11 h-11 rounded-lg bg-stone-100 dark:bg-stone-900 border border-amber-500/40 flex items-center justify-center p-1 group-hover:border-amber-500 transition-colors shadow-xs">
            <img 
              src="https://uploads.onecompiler.io/43u3a24n6/1781176462038/IMG_20260531_195922_268.webp" 
              alt="JSP ForgeCore Logo" 
              className="w-full h-full object-contain rounded"
              referrerPolicy="no-referrer"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-stone-900 dark:text-white whitespace-nowrap transition-colors">
              JSP ForgeCore
            </span>
            <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-500 tracking-wider uppercase whitespace-nowrap">
              JSP Metal Works
            </span>
          </div>
        </button>

        {/* Zone 2: Concise Single-line Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600 dark:text-stone-300">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-all whitespace-nowrap py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-amber-600 dark:text-amber-400 font-semibold scale-105'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions + Language Switcher + Theme Switcher (No Admin Button) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Language Switcher Button (English <-> Hindi) */}
          <button
            onClick={onToggleLanguage}
            aria-label={language === 'en' ? 'Switch to Hindi (हिंदी में देखें)' : 'Switch to English'}
            title={language === 'en' ? 'हिंदी में देखें' : 'Switch to English'}
            className="px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/40 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs text-xs font-semibold"
          >
            <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Theme Toggle Button (Light / Dark) */}
          <button
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
            title={theme === 'dark' ? t.themeLight : t.themeDark}
            className="p-2 rounded-lg border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-500/40 transition-all flex items-center justify-center cursor-pointer shadow-xs"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-stone-700 transition-transform -rotate-12 hover:rotate-0" />
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenQuote}
            className="hidden sm:flex px-4 py-2 text-xs font-semibold text-stone-950 bg-metallic-orange hover:brightness-110 rounded-md transition-all shadow-sm items-center gap-1.5 whitespace-nowrap active:scale-95 cursor-pointer"
          >
            <span>{t.getQuote}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-stone-100 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 hover:text-stone-950 dark:hover:text-white lg:hidden focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950 px-4 pt-3 pb-6 space-y-2 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-200 dark:border-stone-800">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-3 py-2.5 rounded text-sm font-medium transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold border-l-2 border-amber-500'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-2.5 px-4 text-center text-sm font-semibold text-stone-950 bg-metallic-orange rounded-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t.getQuote}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-3 gap-2 pt-1">
              <a
                href="tel:7023746632"
                className="py-2 px-2 text-center text-xs font-medium text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded flex items-center justify-center gap-1"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.callUs.replace(':', '')}</span>
              </a>

              <button
                onClick={onToggleLanguage}
                className="py-2 px-2 text-center text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded flex items-center justify-center gap-1 cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-amber-500" />
                <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
              </button>

              <button
                onClick={onToggleTheme}
                className="py-2 px-2 text-center text-xs font-medium text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded flex items-center justify-center gap-1 cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-stone-600" />}
                <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
