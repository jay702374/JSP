import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Layers, 
  MessageSquare, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { calculateQuotationEstimate, buildWhatsAppLink, type MetalSpec } from '../utils/quotation';
import type { BusinessSettings } from '../types';

interface QuotationEstimatorProps {
  settings: BusinessSettings;
  onOpenCustomOrder: (prefill: { category: string; description: string }) => void;
}

export const QuotationEstimator: React.FC<QuotationEstimatorProps> = ({
  settings,
  onOpenCustomOrder,
}) => {
  const [category, setCategory] = useState<string>('Railings');
  const [material, setMaterial] = useState<MetalSpec['material']>('Mild Steel (MS)');
  const [gauge, setGauge] = useState<MetalSpec['gauge']>('14 Gauge (Standard 2.0mm)');
  const [quantity, setQuantity] = useState<number>(1);
  const [finish, setFinish] = useState<MetalSpec['finish']>('Primer + Enamel Paint');
  const [applicationType, setApplicationType] = useState<string>('Residential Villa');

  const estimate = useMemo(() => {
    return calculateQuotationEstimate({
      category,
      material,
      gauge,
      quantity,
      finish,
    });
  }, [category, material, gauge, quantity, finish]);

  const phone = settings.phone1 || '7023746632';

  const whatsappUrl = buildWhatsAppLink({
    phone,
    category,
    specs: `${material} | ${gauge} | Finish: ${finish} | Site: ${applicationType} | Qty: ${quantity} units`,
    customMessage: `I selected custom manufacturing specifications on your website for ${category}.\n\nCategory: ${category}\nMaterial Grade: ${material}\nThickness/Gauge: ${gauge}\nSurface Coating: ${finish}\nSite Type: ${applicationType}\nQuantity: ${quantity} units\n\nPlease share availability, direct factory quotation, and site visit schedule.`,
  });

  return (
    <section className="py-16 bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors" id="quotation-system">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500 block">
            Custom Manufacturing Consultation
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight mt-1 transition-colors">
            Online Manufacturing Specification Enquiry
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-2 max-w-2xl mx-auto transition-colors">
            Configure your required metal type, thickness gauge, surface coating, and site application to connect directly with our workshop fabricators in Jaipur.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form (Left 7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl transition-colors">
            <h3 className="text-lg font-bold text-stone-900 dark:text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-500" />
              <span>Select Fabrication Parameters</span>
            </h3>

            {/* Category Selection */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                1. Product Category / Work Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {['Railings', 'Gates', 'Metal Beds', 'Chakki', 'Chara-Kutti', 'Custom Work'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setCategory(cat)}
                    className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all border cursor-pointer ${
                      category === cat
                        ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border-amber-500 shadow-xs'
                        : 'bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Material & Metallurgy */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                2. Metal Material Grade
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {[
                  'Mild Steel (MS)',
                  'Stainless Steel (SS 304)',
                  'Stainless Steel (SS 202)',
                  'Wrought Iron',
                  'Cast Iron',
                  'Galvanized Iron (GI)',
                ].map((mat) => (
                  <button
                    key={mat}
                    type="button"
                    onClick={() => setMaterial(mat as MetalSpec['material'])}
                    className={`p-2.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      material === mat
                        ? 'bg-amber-500/15 border-amber-500 text-stone-950 dark:text-white font-semibold'
                        : 'bg-stone-50 dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400 hover:border-stone-300 dark:hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="text-[11px] leading-tight truncate">{mat}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Gauge and Finish Selection */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  3. Thickness & Gauge
                </label>
                <select
                  value={gauge}
                  onChange={(e) => setGauge(e.target.value as MetalSpec['gauge'])}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="12 Gauge (Heavy 2.5mm)">12 Gauge (Heavy 2.5mm) - Heavy Gates & Structural</option>
                  <option value="14 Gauge (Standard 2.0mm)">14 Gauge (Standard 2.0mm) - Balconies & Beds</option>
                  <option value="16 Gauge (Medium 1.5mm)">16 Gauge (Medium 1.5mm) - Interior Railings & Grills</option>
                  <option value="18 Gauge (Light 1.2mm)">18 Gauge (Light 1.2mm) - Protective Covers</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                  4. Surface Coating & Finishing
                </label>
                <select
                  value={finish}
                  onChange={(e) => setFinish(e.target.value as MetalSpec['finish'])}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-900 border border-stone-300 dark:border-stone-800 text-xs text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                >
                  <option value="Primer + Enamel Paint">Primer + Industrial Enamel Paint</option>
                  <option value="Powder Coated">Electrostatic Oven Powder Coated</option>
                  <option value="Buffed Glossy (SS)">Mirror Buffed Polish (Stainless Steel)</option>
                  <option value="Matte Industrial">Matte Industrial Black Finish</option>
                  <option value="Raw Unfinished">Raw Weld Finish</option>
                </select>
              </div>
            </div>

            {/* Application / Site Type */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-2">
                5. Project Application / Installation Site
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['Residential Villa', 'Commercial Complex', 'Agricultural Farm', 'Industrial Warehouse'].map((app) => (
                  <button
                    key={app}
                    type="button"
                    onClick={() => setApplicationType(app)}
                    className={`py-2 px-2.5 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                      applicationType === app
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-500'
                        : 'bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    {app}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                Quantity Units:
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 4, 10].map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQuantity(q)}
                    className={`w-9 h-8 rounded text-xs font-bold transition-all cursor-pointer ${
                      quantity === q
                        ? 'bg-amber-500 text-stone-950 font-mono shadow-xs'
                        : 'bg-stone-50 dark:bg-stone-900 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800'
                    }`}
                  >
                    {q}
                  </button>
                ))}
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 px-2 py-1 rounded bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-xs text-stone-900 dark:text-white font-mono text-center"
                />
              </div>
            </div>
          </div>

          {/* Technical Specifications Output Card (Right 5 Cols) */}
          <div className="lg:col-span-5 bg-white dark:bg-stone-950 border-2 border-amber-500/50 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden transition-colors">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-4 border-b border-stone-200 dark:border-stone-800">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-600 dark:text-amber-500 font-bold block">
                  Configuration Summary
                </span>
                <h4 className="text-xl font-bold text-stone-900 dark:text-white mt-0.5">
                  {category} Specifications
                </h4>
              </div>
              <ShieldCheck className="w-6 h-6 text-amber-500" />
            </div>

            {/* Highlights Box */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-950 border border-stone-200 dark:border-stone-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 dark:text-stone-400">Selected Category</span>
                <span className="font-bold text-stone-900 dark:text-white">{category}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 dark:text-stone-400">Material Grade</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">{material}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 dark:text-stone-400">Gauge Rating</span>
                <span className="font-mono text-stone-900 dark:text-stone-200">{gauge.split(' ')[0]} {gauge.split(' ')[1]}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 dark:text-stone-400">Surface Finish</span>
                <span className="text-stone-900 dark:text-stone-200">{finish}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-stone-500 dark:text-stone-400">Site Application</span>
                <span className="text-stone-900 dark:text-stone-200">{applicationType}</span>
              </div>
              <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-200 dark:border-stone-800">
                <span className="text-stone-500 dark:text-stone-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Workshop Lead Time</span>
                </span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">{estimate.leadTimeDays}</span>
              </div>
            </div>

            {/* Direct Factory Quotation Notice */}
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-500/30 text-xs text-stone-700 dark:text-stone-300 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-800 dark:text-amber-400">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Custom Workshop Fabrication</span>
              </div>
              <p className="text-[11px] leading-relaxed text-stone-600 dark:text-stone-400">
                Fabrication is carried out directly at our workshop in Cheethawari, Jaipur. Connect directly with our master fabricator at <strong className="font-mono text-stone-800 dark:text-stone-200">+91 {phone}</strong> for site inspection, design consultations, and customized factory quotations.
              </p>
            </div>

            {/* Direct Conversion Actions */}
            <div className="space-y-2.5 pt-1">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Enquire on WhatsApp ({phone})</span>
              </a>

              <button
                onClick={() => onOpenCustomOrder({
                  category,
                  description: `Custom manufacturing consultation for ${category} in ${material} (${gauge}), ${finish}. Application: ${applicationType}. Quantity: ${quantity} units.`,
                })}
                className="w-full py-3 px-4 rounded-lg bg-metallic-orange hover:brightness-110 text-stone-950 text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer active:scale-98"
              >
                <span>Submit Manufacturing Requirement Form</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
