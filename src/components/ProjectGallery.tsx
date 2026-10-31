import React, { useState } from 'react';
import { Eye, MapPin, X, ZoomIn } from 'lucide-react';
import { motion } from 'framer-motion';
import type { GalleryItem } from '../types';

interface ProjectGalleryProps {
  gallery: GalleryItem[];
}

export const ProjectGallery: React.FC<ProjectGalleryProps> = ({ gallery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'Railings',
    'Gates',
    'Metal Beds',
    'Chakki',
    'Chara-Kutti Machines',
    'Other Metal Works',
  ];

  const filteredItems = selectedCategory === 'All'
    ? gallery
    : gallery.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-16 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-colors" id="our-work">
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
              Proven Craftsmanship
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight mt-1 transition-colors">
              Our Manufacturing Work & Portfolio
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm mt-2 max-w-xl transition-colors">
              Photographs of completed projects fabricated at our Jaipur workshop and installed across residential homes, villas, farms, and factories.
            </p>
          </div>
          <div className="text-xs text-stone-500 font-mono">
            {filteredItems.length} Real Work Projects
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all border cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-stone-950 border-amber-500 font-semibold shadow-xs'
                  : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.45,
                delay: (idx % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              onClick={() => setActiveItem(item)}
              className="group rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 transition-colors duration-300 overflow-hidden cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1 flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100 dark:bg-stone-950">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLElement).style.opacity = '0.6';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-white/90 dark:bg-stone-950/80 border border-stone-200 dark:border-stone-800 text-[11px] font-medium text-amber-700 dark:text-amber-400 backdrop-blur-sm shadow-xs">
                  {item.category}
                </div>

                <div className="absolute bottom-3 right-3 p-1.5 rounded-full bg-white/90 dark:bg-stone-950/80 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-stone-800 group-hover:text-amber-500 transition-colors shadow-xs">
                  <ZoomIn className="w-4 h-4" />
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1.5 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {item.location && (
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center gap-1.5 text-[11px] text-stone-500">
                    <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{item.location}</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div 
            className="relative max-w-3xl w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-stone-100 dark:bg-stone-950">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-3 right-3 p-2 rounded-full bg-stone-900/80 text-white hover:bg-stone-800 border border-stone-700 cursor-pointer"
                aria-label="Close image"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-5 bg-white dark:bg-stone-900">
              <div className="flex items-center gap-2 text-xs text-amber-600 dark:text-amber-500 font-semibold mb-1">
                <span>{activeItem.category}</span>
                {activeItem.location && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-stone-500 dark:text-stone-400 font-normal">{activeItem.location}</span>
                  </>
                )}
              </div>
              <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-2">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
