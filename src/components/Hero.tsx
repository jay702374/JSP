import React from 'react';
import { ArrowRight, MessageSquare, Wrench, CheckCircle2, MapPin } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/quotation';
import type { BusinessSettings } from '../types';
import { translations, type Language } from '../utils/translations';

interface HeroProps {
  settings: BusinessSettings;
  onExploreProducts: () => void;
  onGetQuote: () => void;
  language: Language;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onExploreProducts,
  onGetQuote,
  language,
}) => {
  const t = translations[language];

  const whatsappUrl = buildWhatsAppLink({
    phone: settings.whatsappNumber || '7023746632',
    customMessage: language === 'hi'
      ? 'नमस्ते JSP ForgeCore, मुझे आपके मेटल फैब्रिकेशन और विनिर्माण उत्पादों की जानकारी और कोटेशन चाहिए।'
      : 'Hello JSP ForgeCore, I would like to enquire about your metal fabrication products and get a quote.',
  });

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-stone-200 dark:border-stone-800 bg-gradient-to-b from-stone-50 via-white to-stone-100 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Desktop Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Column 1: Copy and CTAs */}
          <div className="lg:col-span-7 space-y-6">
            {/* Quiet Location Trust Marker */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs text-stone-700 dark:text-stone-300 shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>{t.badgeLocation}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-950 dark:text-white leading-[1.12] max-w-2xl transition-colors">
              {t.heroHeadline1}{' '}
              <span className="text-metallic-orange block mt-1">
                {t.heroHeadline2}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-600 dark:text-stone-300 max-w-xl leading-relaxed font-normal transition-colors">
              {t.heroSubheading}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              <button
                onClick={onExploreProducts}
                className="px-6 py-3.5 text-sm font-semibold text-stone-950 bg-metallic-orange hover:brightness-110 rounded-md transition-all shadow-md flex items-center gap-2 whitespace-nowrap glow-orange active:scale-95 cursor-pointer"
              >
                <span>{t.heroExploreBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onGetQuote}
                className="px-6 py-3.5 text-sm font-medium text-stone-800 dark:text-stone-200 bg-white dark:bg-stone-900 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-md transition-all whitespace-nowrap shadow-xs active:scale-95 cursor-pointer"
              >
                {t.heroQuoteBtn}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 text-sm font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-300 dark:border-emerald-500/30 rounded-md transition-all flex items-center gap-2 whitespace-nowrap shadow-xs"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>{t.heroWhatsAppBtn}</span>
              </a>
            </div>

            {/* Bullet Proof Highlights */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-stone-600 dark:text-stone-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.badgeGauge}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.badgeCAD}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0" />
                <span>{t.badgePrice}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Authentic Workshop Media Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-900 shadow-xl group transition-all hover:shadow-2xl">
              <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full overflow-hidden bg-stone-200 dark:bg-stone-950">
                <img
                  src="https://uploads.onecompiler.io/43u3a24n6/1781176504215/IMG_20260531_201627_035.webp"
                  alt="JSP Metal Works Workshop and Manufacturing Yard in Jaipur"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.opacity = '0.7';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />

                {/* Overlaid Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-800 flex items-center justify-between text-white shadow-lg">
                  <div>
                    <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <Wrench className="w-4 h-4 text-amber-500" />
                      <span>{settings.brandName || 'JSP Metal Works'} Unit</span>
                    </h2>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Kumharo Ka Mohalla, Cheethawari, Jaipur
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-wider text-amber-400 font-bold block">
                      {language === 'hi' ? 'प्रमाणित' : 'Certified'}
                    </span>
                    <span className="text-xs font-mono text-stone-200">
                      {language === 'hi' ? 'फैब्रिकेशन' : 'Fabrication'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-width 4-Column KPI Trust Strip */}
        <div className="mt-14 pt-8 border-t border-stone-200 dark:border-stone-800 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 shadow-xs hover:border-amber-500/40 transition-all">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-mono tabular-nums block">
              100%
            </span>
            <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-200 mt-1 block">
              {language === 'hi' ? 'हाई-स्ट्रेंथ स्टील' : 'High-Strength Steel'}
            </span>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {language === 'hi' ? 'माइल्ड स्टील, SS 304/202, और कास्ट आयरन' : 'Mild steel, SS 304/202, and heavy cast iron'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 shadow-xs hover:border-amber-500/40 transition-all">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-mono tabular-nums block">
              500+
            </span>
            <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-200 mt-1 block">
              {language === 'hi' ? 'पूर्ण प्रोजेक्ट्स' : 'Completed Projects'}
            </span>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {language === 'hi' ? 'रेलिंग, गेट, मशीनें और लोहे के बेड' : 'Railings, gates, machines & beds manufactured'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 shadow-xs hover:border-amber-500/40 transition-all">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-mono tabular-nums block">
              {language === 'hi' ? 'सीधे' : 'Direct'}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-200 mt-1 block">
              {language === 'hi' ? 'जयपुर फैक्ट्री दरें' : 'Jaipur Factory Rates'}
            </span>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {language === 'hi' ? 'कोई बिचौलिया नहीं, वाजिब कोटेशन' : 'Zero middleman markup, authentic quote'}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 shadow-xs hover:border-amber-500/40 transition-all">
            <span className="text-2xl sm:text-3xl font-extrabold text-amber-500 font-mono tabular-nums block">
              {language === 'hi' ? 'कस्टम' : 'Custom'}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-stone-900 dark:text-stone-200 mt-1 block">
              {language === 'hi' ? 'माप अनुसार निर्माण' : 'Bespoke Fabrication'}
            </span>
            <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
              {language === 'hi' ? 'साइट के सटीक नाप और ड्राइंग अनुसार' : 'Built to exact customer site dimensions'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
