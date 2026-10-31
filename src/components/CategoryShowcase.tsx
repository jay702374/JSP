import React from 'react';
import { ArrowRight, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';
import { CATEGORY_DETAILS } from '../data/defaultData';
import type { ProductCategory } from '../types';
import { translations, type Language } from '../utils/translations';

interface CategoryShowcaseProps {
  onSelectCategory: (category: ProductCategory) => void;
  onCustomOrderForCategory: (category: ProductCategory) => void;
  language: Language;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({
  onSelectCategory,
  onCustomOrderForCategory,
  language,
}) => {
  const categoryKeys = Object.keys(CATEGORY_DETAILS) as ProductCategory[];
  const t = translations[language];

  return (
    <section className="py-16 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-colors" id="categories">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500 block">
              {t.catSectionTag}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight mt-1 transition-colors">
              {t.catSectionTitle}
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm mt-2 max-w-xl transition-colors">
              {t.catSectionSubtitle}
            </p>
          </div>
          <div className="text-xs text-stone-500 font-mono">
            {t.catDivisionsCount}
          </div>
        </motion.div>

        {/* 6 Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {categoryKeys.map((catKey, index) => {
            const cat = CATEGORY_DETAILS[catKey];
            return (
              <motion.div
                key={catKey}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.45,
                  delay: (index % 3) * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/60 dark:hover:border-amber-500/50 transition-colors duration-300 flex flex-col overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1"
              >
                {/* Visual Image Carrier */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100 dark:bg-stone-950">
                  <img
                    src={cat.imageUrl}
                    alt={`${cat.name} (${cat.hindi}) by JSP ForgeCore`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.opacity = '0.5';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                  
                  {/* Category Index */}
                  <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-white/90 dark:bg-stone-950/80 text-amber-700 dark:text-amber-400 border border-stone-200 dark:border-stone-800 shadow-xs">
                    0{index + 1}
                  </span>

                  <div className="absolute bottom-3 left-4 right-4">
                    <span className="text-xs text-amber-400 font-semibold block">
                      {cat.hindi}
                    </span>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      {language === 'hi' ? `${cat.name} (${cat.hindi})` : cat.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 line-clamp-2 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Subcategories Clean Unboxed Metadata */}
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80">
                    <span className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold block mb-1.5">
                      {t.catManufacturedSubtypes}
                    </span>
                    <p className="text-xs text-stone-700 dark:text-stone-300 leading-snug">
                      {cat.subcategories.join(' · ')}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectCategory(catKey)}
                      className="py-2.5 px-3 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-100 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>{t.catViewProducts}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    </button>

                    <button
                      onClick={() => onCustomOrderForCategory(catKey)}
                      className="py-2.5 px-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Hammer className="w-3.5 h-3.5" />
                      <span>{t.catCustomQuote}</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
