import React from 'react';
import { Eye, MessageSquare, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import { buildWhatsAppLink } from '../utils/quotation';
import type { Product } from '../types';
import { translations, type Language } from '../utils/translations';

interface ProductCardProps {
  product: Product;
  onViewDetails: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
  whatsappNumber: string;
  index?: number;
  language?: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onViewDetails,
  onRequestQuote,
  whatsappNumber,
  index = 0,
  language = 'en',
}) => {
  const t = translations[language];
  const primaryImage = product.imageUrls && product.imageUrls.length > 0 
    ? product.imageUrls[0] 
    : 'https://uploads.onecompiler.io/43u3a24n6/1781176504215/IMG_20260531_201627_035.webp';

  const whatsappUrl = buildWhatsAppLink({
    phone: whatsappNumber,
    productName: product.name,
    category: product.category,
    specs: product.materialInfo,
    customMessage: `I want to enquire about ${product.name} (${product.subCategory}). Please share availability and manufacturing quotation.`,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 dark:hover:border-amber-500/40 transition-colors duration-300 flex flex-col overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1"
    >
      {/* Product Image Carrier */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-950 cursor-pointer"
        onClick={() => onViewDetails(product)}
      >
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLElement).style.opacity = '0.6';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

        {/* Subcategory Label */}
        <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-white/90 dark:bg-stone-950/80 backdrop-blur-sm border border-stone-200 dark:border-stone-800 text-[11px] font-medium text-stone-800 dark:text-stone-300 shadow-xs">
          {product.subCategory}
        </div>

        {/* Hover Quick View Trigger */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-stone-950/30">
          <span className="px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-stone-900/90 text-stone-900 dark:text-stone-100 text-xs font-semibold border border-stone-300 dark:border-stone-700 flex items-center gap-1.5 backdrop-blur-sm shadow-md">
            <Eye className="w-3.5 h-3.5 text-amber-500" />
            <span>View Full Details</span>
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Unboxed Metadata Header */}
          <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400 mb-1">
            <span className="text-amber-600 dark:text-amber-500 font-semibold">{product.category}</span>
            <span aria-hidden="true">·</span>
            <span>{product.hindiName || 'कस्टम फैब्रिकेशन'}</span>
          </div>

          <h3 
            onClick={() => onViewDetails(product)}
            className="text-base sm:text-lg font-bold text-stone-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer tracking-tight"
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-600 dark:text-stone-400 mt-2 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Material & Specs Snippet */}
        <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 space-y-1 text-xs">
          <div className="flex items-start gap-1.5 text-stone-600 dark:text-stone-400">
            <Wrench className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span className="line-clamp-1">{product.materialInfo}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="py-2 px-3 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-amber-500" />
            <span>{t.viewDetails}</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2 px-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.whatsappInquiry}</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
};
