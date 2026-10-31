import React from 'react';
import { 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  MapPin, 
  Compass, 
  Sparkles,
  PhoneCall 
} from 'lucide-react';
import { motion } from 'framer-motion';
import type { BusinessSettings } from '../types';

interface AboutUsProps {
  settings: BusinessSettings;
  onContactClick: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ settings, onContactClick }) => {
  return (
    <section className="py-16 bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors" id="about-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Workshop Real Photography */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-200 dark:bg-stone-950 shadow-2xl">
              <img
                src="https://uploads.onecompiler.io/43u3a24n6/1781176504215/IMG_20260531_201627_035.webp"
                alt="JSP Metal Works workshop in Cheethawari, Jaipur"
                className="w-full aspect-[4/3] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-950/85 backdrop-blur-md border border-stone-800 text-xs text-white">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>Cheethawari Fabrication Workshop</span>
                </div>
                <p className="text-stone-300">
                  Kumharo Ka Mohalla, Cheethawari, Jaipur, Rajasthan.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 shadow-xs">
                <span className="text-xl sm:text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 block">
                  30+ Yrs
                </span>
                <span className="text-xs text-stone-600 dark:text-stone-400 mt-1 block">
                  Fabrication Experience
                </span>
              </div>
              <div className="p-4 rounded-xl bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 shadow-xs">
                <span className="text-xl sm:text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 block">
                  100%
                </span>
                <span className="text-xs text-stone-600 dark:text-stone-400 mt-1 block">
                  Quality Welded Steel
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500 block">
                Company Profile
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight mt-1 transition-colors">
                About JSP ForgeCore (JSP Metal Works)
              </h2>
              <p className="text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed mt-3 transition-colors">
                Located in Kumharo Ka Mohalla, Cheethawari, Jaipur, JSP ForgeCore is an established metal manufacturing and custom fabrication workshop. We specialize in producing strong, durable, and architecturally refined metal products engineered to withstand decades of harsh climate and heavy daily usage.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 flex items-start gap-3 shadow-xs">
                <Wrench className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                    Metal Manufacturing & Heavy Fabrication
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    Our workshop operates heavy-duty cutting, hydraulic bending, lathe turning, and electric arc/MIG/TIG welding machinery. We work extensively with Mild Steel (MS), Stainless Steel (SS 304 and 202 grades), Cast Iron, and Wrought Iron.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 flex items-start gap-3 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                    Product Quality & Structural Reliability
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    We strictly use prime certified metal pipes, angles, and sheets with genuine wall gauges (12, 14, and 16 Gauge). Joints are reinforced and treated with multi-coat anti-corrosive primer before final paint or powder coating.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800 flex items-start gap-3 shadow-xs">
                <Compass className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-stone-900 dark:text-white">
                    Custom Manufacturing & Agricultural Machinery
                  </h3>
                  <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 leading-relaxed">
                    Alongside architectural railings, gates, and metal beds, we manufacture traditional stone flour grinding mills (Chakki) and high-efficiency chaff cutter machines (Chara Kutti) for rural and dairy applications across Rajasthan.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={onContactClick}
                className="py-3 px-6 rounded-lg bg-metallic-orange hover:brightness-110 text-stone-950 text-xs font-bold transition-all shadow-md cursor-pointer active:scale-95"
              >
                Get in Touch with Our Workshop
              </button>

              <a
                href="tel:7023746632"
                className="py-3 px-5 rounded-lg bg-white dark:bg-stone-800 hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-medium transition-colors flex items-center gap-2 border border-stone-300 dark:border-stone-700 shadow-xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-500" />
                <span>Call +91 7023746632</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
