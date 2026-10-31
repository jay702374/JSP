import React, { useState } from 'react';
import { 
  Upload, 
  X, 
  CheckCircle2, 
  MessageSquare, 
  AlertCircle, 
  FileText, 
  Send, 
  Sparkles,
  Phone
} from 'lucide-react';
import { motion } from 'framer-motion';
import { generateEnquiryId, buildWhatsAppLink } from '../utils/quotation';
import { isValidIndianPhone, isValidEmail } from '../utils/validation';
import { createEnquiry } from '../services/firebase';
import type { Enquiry, ProductCategory, BusinessSettings } from '../types';

interface CustomOrderFormProps {
  initialCategory?: ProductCategory | string;
  initialProductName?: string;
  settings: BusinessSettings;
  onEnquirySubmitted?: (enquiry: Enquiry) => void;
}

export const CustomOrderForm: React.FC<CustomOrderFormProps> = ({
  initialCategory = 'Railings',
  initialProductName = '',
  settings,
  onEnquirySubmitted,
}) => {
  const [customerName, setCustomerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [sameAsMobile, setSameAsMobile] = useState(true);
  const [email, setEmail] = useState('');
  const [category, setCategory] = useState<string>(initialCategory);
  const [productName, setProductName] = useState(initialProductName);
  const [requiredSize, setRequiredSize] = useState('');
  const [materialPreference, setMaterialPreference] = useState('Mild Steel (MS)');
  const [quantity, setQuantity] = useState('1');
  const [description, setDescription] = useState('');
  const [deliveryLocation, setDeliveryLocation] = useState('Jaipur, Rajasthan');
  const [referenceImageUrl, setReferenceImageUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedEnquiry, setSubmittedEnquiry] = useState<Enquiry | null>(null);

  const categories: ProductCategory[] = [
    'Railings',
    'Metal Beds',
    'Gates',
    'Chakki',
    'Chara-Kutti Machines',
    'Other Metal Works',
  ];

  const materialOptions = [
    'Mild Steel (MS) - Heavy Duty & Cost Effective',
    'Stainless Steel (SS 304) - Rust-Free & High Lustre',
    'Stainless Steel (SS 202) - Standard Architectural Grade',
    'Wrought Iron - Classic Hand-Forged Ornamental',
    'Cast Iron - Heavy Casting & Dampening',
    'Galvanized Iron (GI) - Weather Proof Coating',
  ];

  const handleMobileChange = (val: string) => {
    setMobileNumber(val);
    if (sameAsMobile) {
      setWhatsappNumber(val);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 4 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, image: 'File size must be under 4MB' }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setReferenceImageUrl(reader.result as string);
      setErrors((prev) => {
        const next = { ...prev };
        delete next.image;
        return next;
      });
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!customerName.trim() || customerName.trim().length < 2) {
      newErrors.customerName = 'Please enter your full name (at least 2 characters)';
    }
    if (!isValidIndianPhone(mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit Indian phone number';
    }
    if (!sameAsMobile && whatsappNumber && !isValidIndianPhone(whatsappNumber)) {
      newErrors.whatsappNumber = 'Please enter a valid 10-digit WhatsApp number';
    }
    if (email.trim() && !isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!category) {
      newErrors.category = 'Please choose a product category';
    }
    if (!description.trim() || description.trim().length < 5) {
      newErrors.description = 'Please describe your requirements (at least 5 characters)';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const generatedId = generateEnquiryId();

    const newEnquiry: Enquiry = {
      enquiryId: generatedId,
      customerName: customerName.trim(),
      mobileNumber: mobileNumber.trim(),
      whatsappNumber: sameAsMobile ? mobileNumber.trim() : (whatsappNumber.trim() || mobileNumber.trim()),
      email: email.trim() || undefined,
      category,
      productName: productName.trim() || `${category} Custom Order`,
      requiredSize: requiredSize.trim() || undefined,
      materialPreference,
      quantity: quantity.trim() || '1',
      description: description.trim(),
      referenceImageUrl: referenceImageUrl || undefined,
      deliveryLocation: deliveryLocation.trim() || 'Jaipur, Rajasthan',
      status: 'New Enquiry',
      createdAt: new Date().toISOString(),
    };

    try {
      await createEnquiry(newEnquiry);
      setSubmittedEnquiry(newEnquiry);
      if (onEnquirySubmitted) onEnquirySubmitted(newEnquiry);
    } catch (err) {
      console.error('Enquiry submission error:', err);
      setSubmittedEnquiry(newEnquiry);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCustomerName('');
    setMobileNumber('');
    setWhatsappNumber('');
    setEmail('');
    setProductName('');
    setRequiredSize('');
    setDescription('');
    setReferenceImageUrl('');
    setSubmittedEnquiry(null);
    setErrors({});
  };

  return (
    <section className="py-12 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-colors" id="custom-order">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="text-center mb-10"
        >
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500 block">
            Bespoke Metal Fabrication
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight mt-1 transition-colors">
            Custom Manufacturing Request
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-2 max-w-xl mx-auto transition-colors">
            Share your drawing, photographs, architectural plans or site dimensions. Our Jaipur engineering workshop will review and prepare a custom manufacturing proposal.
          </p>
        </motion.div>

        {/* Success Confirmation Modal State */}
        {submittedEnquiry ? (
          <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-emerald-500/50 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 text-emerald-600 dark:text-emerald-400 mb-4">
              <CheckCircle2 className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white">
                  Enquiry Submitted Successfully!
                </h3>
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  Your manufacturing requirement has been logged in our factory queue.
                </span>
              </div>
            </div>

            {/* Generated Unique Enquiry ID Card */}
            <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 my-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div>
                <span className="text-xs uppercase tracking-wider text-stone-500 block font-semibold">
                  Unique Manufacturing Enquiry ID
                </span>
                <span className="text-xl sm:text-2xl font-bold font-mono text-amber-600 dark:text-amber-400 tracking-wider">
                  {submittedEnquiry.enquiryId}
                </span>
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400 font-medium">
                Status: <span className="text-amber-600 dark:text-amber-400 font-semibold">{submittedEnquiry.status}</span>
              </div>
            </div>

            {/* Summary Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700 dark:text-stone-300 py-3 border-y border-stone-200 dark:border-stone-800/80">
              <div><strong className="text-stone-500">Customer:</strong> {submittedEnquiry.customerName}</div>
              <div><strong className="text-stone-500">Phone:</strong> {submittedEnquiry.mobileNumber}</div>
              <div><strong className="text-stone-500">Category:</strong> {submittedEnquiry.category}</div>
              <div><strong className="text-stone-500">Material:</strong> {submittedEnquiry.materialPreference}</div>
              <div className="sm:col-span-2"><strong className="text-stone-500">Requirements:</strong> {submittedEnquiry.description}</div>
            </div>

            {/* WhatsApp CTA Pre-filled */}
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
              <a
                href={buildWhatsAppLink({
                  phone: settings.whatsappNumber,
                  enquiryId: submittedEnquiry.enquiryId,
                  customerName: submittedEnquiry.customerName,
                  category: submittedEnquiry.category,
                  productName: submittedEnquiry.productName,
                  specs: `${submittedEnquiry.materialPreference || ''} ${submittedEnquiry.requiredSize ? `(${submittedEnquiry.requiredSize})` : ''}`,
                  customMessage: submittedEnquiry.description,
                })}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 py-3 px-6 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open in WhatsApp with Enquiry #{submittedEnquiry.enquiryId}</span>
              </a>

              <button
                onClick={resetForm}
                className="w-full sm:w-auto py-3 px-5 rounded-lg bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-sm font-medium transition-colors"
              >
                Submit Another Requirement
              </button>
            </div>
          </div>
        ) : (
          /* The Form */
          <form 
            onSubmit={handleSubmit}
            className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-xl space-y-6 transition-colors"
          >
            {/* Customer Details Row */}
            <div>
              <h3 className="text-base font-bold text-stone-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 text-xs flex items-center justify-center font-bold">1</span>
                <span>Customer Contact Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  {errors.customerName && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.customerName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={mobileNumber}
                    onChange={(e) => handleMobileChange(e.target.value)}
                    placeholder="10-digit number (e.g. 7023746632)"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  {errors.mobileNumber && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.mobileNumber}
                    </p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                      WhatsApp Number
                    </label>
                    <label className="text-[11px] text-stone-500 dark:text-stone-400 flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={sameAsMobile}
                        onChange={(e) => {
                          setSameAsMobile(e.target.checked);
                          if (e.target.checked) setWhatsappNumber(mobileNumber);
                        }}
                        className="rounded border-stone-300 dark:border-stone-700 text-amber-500 focus:ring-amber-500"
                      />
                      <span>Same as mobile</span>
                    </label>
                  </div>
                  <input
                    type="tel"
                    disabled={sameAsMobile}
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="WhatsApp number"
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-amber-500 transition-colors ${
                      sameAsMobile 
                        ? 'bg-stone-100 dark:bg-stone-950/50 border-stone-200 dark:border-stone-900 text-stone-400' 
                        : 'bg-stone-50 dark:bg-stone-950 border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white'
                    }`}
                  />
                  {errors.whatsappNumber && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.whatsappNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Manufacturing Specifications Row */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
              <h3 className="text-base font-bold text-stone-900 dark:text-white mb-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-amber-500 text-stone-950 text-xs flex items-center justify-center font-bold">2</span>
                <span>Fabrication & Product Specifications</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Product Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                    <option value="Custom Metal Fabrication">Custom Metal Fabrication (Other)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Required Product Name / Title
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Modern Laser Cut Staircase Railing"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Installation Area / Application Site
                  </label>
                  <input
                    type="text"
                    value={requiredSize}
                    onChange={(e) => setRequiredSize(e.target.value)}
                    placeholder="e.g. Balcony, Main Entrance, Terrace, Living Room"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Quantity
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 1 Set, 40 Feet, 2 Units"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Material Preference
                  </label>
                  <select
                    value={materialPreference}
                    onChange={(e) => setMaterialPreference(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-white focus:outline-none focus:border-amber-500 transition-colors"
                  >
                    {materialOptions.map((opt) => (
                      <option key={opt} value={opt.split(' - ')[0]}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Description of Requirements & Details *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Please mention exact pattern, thickness preference, paint/powder-coat finish, site installation requirements, or any special hardware..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                  {errors.description && (
                    <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.description}
                    </p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Delivery Location (Jaipur / Rajasthan / Other)
                  </label>
                  <input
                    type="text"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    placeholder="e.g. Cheethawari, Jaipur / Mansarovar / Sikar"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Reference Image or Design Upload */}
            <div className="pt-4 border-t border-stone-200 dark:border-stone-800">
              <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1.5">
                Upload Reference Design / Site Drawing / Photo (Optional)
              </label>

              {referenceImageUrl ? (
                <div className="relative inline-block rounded-xl overflow-hidden border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-950 p-2">
                  <img
                    src={referenceImageUrl}
                    alt="Reference Design Preview"
                    className="max-h-48 max-w-full rounded object-contain"
                  />
                  <button
                    type="button"
                    onClick={() => setReferenceImageUrl('')}
                    className="absolute top-3 right-3 p-1.5 rounded-full bg-stone-900/90 text-stone-300 hover:text-white hover:bg-rose-900/80 transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center p-6 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-800 hover:border-amber-500/50 bg-stone-50 dark:bg-stone-950/60 cursor-pointer transition-colors group">
                  <Upload className="w-7 h-7 text-stone-400 dark:text-stone-500 group-hover:text-amber-500 mb-2 transition-colors" />
                  <span className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                    Click or drag & drop reference image
                  </span>
                  <span className="text-[11px] text-stone-400 dark:text-stone-500 mt-1">
                    PNG, JPG, WEBP up to 4MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
              {errors.image && (
                <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {errors.image}
                </p>
              )}
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-lg bg-metallic-orange hover:brightness-110 text-stone-950 font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-98"
              >
                {isSubmitting ? (
                  <span>Saving Manufacturing Enquiry...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit Manufacturing Enquiry</span>
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-stone-500 mt-2">
                🔒 Your inquiry will receive a unique enquiry ID and direct factory response via WhatsApp / Call.
              </p>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
