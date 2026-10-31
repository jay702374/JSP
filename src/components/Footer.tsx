import React from 'react';
import { MapPin, Phone, Instagram, ArrowUp } from 'lucide-react';
import type { BusinessSettings } from '../types';
import { translations, type Language } from '../utils/translations';

interface FooterProps {
  settings: BusinessSettings;
  onNavigate: (tab: string) => void;
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  onNavigate,
  language,
}) => {
  const t = translations[language];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800 text-stone-400 text-xs transition-colors">
      {/* Upper Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Factory summary */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded bg-stone-900 border border-amber-500/40 p-1 flex items-center justify-center">
                <img
                  src="https://uploads.onecompiler.io/43u3a24n6/1781176462038/IMG_20260531_195922_268.webp"
                  alt="JSP ForgeCore"
                  className="w-full h-full object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                JSP ForgeCore
              </span>
            </div>
            <p className="text-stone-400 leading-relaxed">
              {t.footerAbout}
            </p>
            <div className="text-[11px] text-amber-500 font-medium">
              Brand: {settings.brandName}
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-stone-200 font-bold uppercase tracking-wider text-[11px]">
              {t.footerManufacturing}
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('products')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  {t.products}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('our-work')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  {t.ourWork}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('custom-orders')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  {t.customOrders}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('estimator')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  {t.quotation}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  {t.aboutUs}
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-amber-400 transition-colors cursor-pointer text-left"
                >
                  {t.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Contacts */}
          <div className="space-y-3">
            <h4 className="text-stone-200 font-bold uppercase tracking-wider text-[11px]">
              {t.footerFactoryLocation}
            </h4>
            <div className="flex items-start gap-2 text-stone-300">
              <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>{settings.address}</span>
            </div>
            <div className="space-y-1.5 pt-1">
              <a
                href={`tel:${settings.phone1 || '7023746632'}`}
                className="flex items-center gap-2 text-stone-300 hover:text-amber-400 font-mono"
              >
                <Phone className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>+91 {settings.phone1 || '7023746632'}</span>
              </a>
            </div>
          </div>

          {/* Social & Connect (No Admin Button) */}
          <div className="space-y-3">
            <h4 className="text-stone-200 font-bold uppercase tracking-wider text-[11px]">
              {t.footerFollowConnect}
            </h4>
            <p className="text-stone-400 text-[11px]">
              {language === 'hi' 
                ? 'हमारे वर्कशॉप के दैनिक फैब्रिकेशन वीडियो, गेट और रेलिंग इंस्टॉलेशन देखें:' 
                : 'Check daily fabrication reels, gate designs, and railing installations:'}
            </p>
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 py-2 px-3 rounded-lg bg-stone-900 border border-stone-800 text-stone-200 hover:text-white hover:border-amber-500/50 transition-colors font-medium shadow-xs"
            >
              <Instagram className="w-4 h-4 text-rose-400" />
              <span>{settings.instagramHandle}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-stone-800/80 bg-stone-950 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-stone-500">
          <div>
            © {new Date().getFullYear()} {settings.companyName} ({settings.brandName}). {t.footerRights}
          </div>

          <div className="flex items-center gap-4">
            <span>{t.footerMadeInJaipur}</span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white border border-stone-800 transition-colors cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
