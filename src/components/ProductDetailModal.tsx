import React, { useState, useEffect } from 'react';
import { 
  X, 
  Phone, 
  MessageSquare, 
  Wrench, 
  Layers, 
  FileText, 
  CheckCircle2, 
  ArrowRight,
  ZoomIn
} from 'lucide-react';
import { buildWhatsAppLink } from '../utils/quotation';
import type { Product, BusinessSettings } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onRequestQuote: (product: Product) => void;
  settings: BusinessSettings;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote,
  settings,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxOpen) {
          setLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, lightboxOpen, onClose]);

  if (!product) return null;

  const images = product.imageUrls && product.imageUrls.length > 0
    ? product.imageUrls
    : ['https://uploads.onecompiler.io/43u3a24n6/1781176504215/IMG_20260531_201627_035.webp'];

  const currentImage = images[activeImageIndex] || images[0];

  const whatsappUrl = buildWhatsAppLink({
    phone: settings.whatsappNumber || '7023746632',
    productName: product.name,
    category: product.category,
    specs: `${product.subCategory} | ${product.materialInfo}`,
    customMessage: `Hello JSP ForgeCore, I am viewing "${product.name}" on your website. I want to check availability, lead time, and get a quote for my site dimensions.`,
  });

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-stone-950/70 dark:bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col transition-colors">
          {/* Top Bar */}
          <div className="p-4 sm:px-6 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between bg-stone-50 dark:bg-stone-950/60 transition-colors">
            <div className="flex items-center gap-2 text-xs text-stone-500 dark:text-stone-400">
              <span className="text-amber-600 dark:text-amber-500 font-semibold">{product.category}</span>
              <span aria-hidden="true">/</span>
              <span className="text-stone-800 dark:text-stone-300 font-medium">{product.subCategory}</span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors cursor-pointer"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body - Scrollable */}
          <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Media Gallery (Left) */}
              <div className="md:col-span-6 space-y-3">
                {/* Main Image Showcase */}
                <div 
                  className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 cursor-zoom-in group"
                  onClick={() => setLightboxOpen(true)}
                >
                  <img
                    src={currentImage}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded bg-stone-950/80 text-stone-200 text-xs font-medium flex items-center gap-1.5 border border-stone-800 backdrop-blur-sm">
                    <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                    <span>Click to Zoom</span>
                  </div>
                </div>

                {/* Thumbnails */}
                {images.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                          activeImageIndex === idx 
                            ? 'border-amber-500 shadow-md' 
                            : 'border-stone-200 dark:border-stone-800 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt="" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Quick Quality Note */}
                <div className="p-3 rounded-lg bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800/80 text-xs text-stone-600 dark:text-stone-400 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    Direct factory fabrication at JSP ForgeCore, Cheethawari, Jaipur. Each unit is inspected for weld penetration, dimensional squareness, and corrosion resistance.
                  </span>
                </div>
              </div>

              {/* Product Specifications & Details (Right) */}
              <div className="md:col-span-6 space-y-5">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white tracking-tight">
                    {product.name}
                  </h2>
                  {product.hindiName && (
                    <p className="text-sm text-amber-600 dark:text-amber-500 font-semibold mt-0.5">
                      {product.hindiName}
                    </p>
                  )}
                  <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700/60 text-xs font-medium text-stone-700 dark:text-stone-300">
                    <span>Direct Factory Fabrication · Custom Size Quote on Request</span>
                  </div>
                </div>

                <div className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                  {product.description}
                </div>

                {/* Technical Specifications Grid */}
                <div className="space-y-3 pt-2 border-t border-stone-200 dark:border-stone-800">
                  <div className="flex items-start gap-2.5">
                    <Wrench className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                    <div>
                      <strong className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                        Material Grade & Composition
                      </strong>
                      <span className="text-sm text-stone-800 dark:text-stone-200">
                        {product.materialInfo || 'Mild Steel / SS 304 High Grade'}
                      </span>
                    </div>
                  </div>


                  <div className="flex items-start gap-2.5">
                    <Layers className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                    <div>
                      <strong className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                        Customization Options
                      </strong>
                      <span className="text-sm text-stone-800 dark:text-stone-200">
                        {product.customizationOptions || 'Finishes, gauges, and ornamental designs customized'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <FileText className="w-4 h-4 text-amber-500 shrink-0 mt-1" />
                    <div>
                      <strong className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400 block">
                        Manufacturing Details
                      </strong>
                      <span className="text-sm text-stone-800 dark:text-stone-200">
                        {product.manufacturingDetails || 'Precision argon TIG/MIG welding, rust protection primer & finish.'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Primary Action Buttons */}
                <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Enquire on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => {
                        onClose();
                        onRequestQuote(product);
                      }}
                      className="py-3 px-4 rounded-lg bg-metallic-orange hover:brightness-110 text-stone-950 text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                    >
                      <span>Request a Quote</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  <a
                    href="tel:7023746632"
                    className="w-full py-2.5 px-4 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-medium transition-colors flex items-center justify-center gap-2 border border-stone-200 dark:border-stone-700"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>Call Factory Directly: +91 7023746632</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Full-Screen Lightbox Zoom Preview */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-stone-900 text-white hover:bg-stone-800"
            aria-label="Close zoom"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={currentImage}
            alt={product.name}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </>
  );
};
