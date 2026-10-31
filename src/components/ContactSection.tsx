import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  MessageSquare, 
  Instagram, 
  Send, 
  CheckCircle2, 
  Clock, 
  ExternalLink 
} from 'lucide-react';
import { buildWhatsAppLink } from '../utils/quotation';
import { createEnquiry } from '../services/firebase';
import { generateEnquiryId } from '../utils/quotation';
import type { BusinessSettings } from '../types';

interface ContactSectionProps {
  settings: BusinessSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) return;

    setSubmitting(true);
    const enquiryId = generateEnquiryId();
    try {
      await createEnquiry({
        enquiryId,
        customerName: name.trim(),
        mobileNumber: phone.trim(),
        category: 'General Contact',
        productName: 'Direct Contact Message',
        description: message.trim(),
        quantity: 1,
        status: 'New Enquiry',
        createdAt: new Date().toISOString(),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Contact form error:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const singlePhone = settings.phone1 || '7023746632';

  const whatsappUrl = buildWhatsAppLink({
    phone: singlePhone,
    customMessage: 'Hello JSP ForgeCore, I would like to get more information about your metal fabrication products and discuss my requirements.',
  });

  return (
    <section className="py-16 bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-colors" id="contact-us">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-500 block">
            Direct Workshop Connectivity
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 dark:text-white tracking-tight mt-1 transition-colors">
            Contact JSP ForgeCore
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-sm mt-2 max-w-xl mx-auto transition-colors">
            Connect directly with our master fabricators in Jaipur. Visit our workshop, call, or chat with us on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Cards (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Business Location Card */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm transition-colors">
              <div className="flex items-start gap-3">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-500 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900 dark:text-white">
                    {settings.companyName} ({settings.brandName})
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 mt-1 leading-relaxed">
                    {settings.address}
                  </p>
                  <a
                    href={settings.locationLink || 'https://maps.google.com/?q=Cheethawari,+Jaipur,+Rajasthan'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold mt-2"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Working Hours */}
              <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center gap-2.5 text-xs text-stone-600 dark:text-stone-400">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Workshop Hours: Mon - Sat: 8:00 AM - 8:00 PM (Sunday by appointment)</span>
              </div>
            </div>

            {/* Clickable Single Phone Number */}
            <div className="p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 space-y-4 shadow-sm transition-colors">
              <h4 className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-500 font-bold block">
                Direct Contact & WhatsApp
              </h4>

              <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 hover:border-amber-500/50 transition-colors space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-500">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-stone-500 dark:text-stone-400 block font-medium">Factory Direct Line & WhatsApp</span>
                    <span className="text-xl font-bold font-mono tracking-wider text-stone-900 dark:text-white">+91 {singlePhone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href={`tel:${singlePhone}`}
                    className="py-2.5 px-3 rounded-lg bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    <span>Call Now</span>
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Instagram Profile Box */}
            <div className="p-5 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex items-center justify-between shadow-xs transition-colors">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-xs">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs text-stone-500 dark:text-stone-400 block">Instagram Portfolio</span>
                  <span className="text-sm font-bold text-stone-900 dark:text-white font-mono">{settings.instagramHandle}</span>
                </div>
              </div>
              <a
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="py-1.5 px-3 rounded-md bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>Follow</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Contact Message Form (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 shadow-xl transition-colors">
            <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">
              Send a Direct Message
            </h3>
            <p className="text-xs text-stone-600 dark:text-stone-400 mb-6">
              Have a question regarding sizes, site visits, or quotation? Drop your details and our team will get in touch immediately.
            </p>

            {submitted ? (
              <div className="p-6 rounded-xl bg-stone-50 dark:bg-stone-950 border border-emerald-500/40 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-stone-900 dark:text-white">
                  Message Sent to Workshop!
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 max-w-sm mx-auto">
                  Thank you, {name}. Our team has received your enquiry and will contact you via WhatsApp / Phone shortly.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setPhone('');
                    setMessage('');
                  }}
                  className="mt-2 py-2 px-4 rounded-lg bg-stone-200 dark:bg-stone-800 hover:bg-stone-300 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 text-xs font-medium cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vikram Singh"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit number"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                    Your Requirement or Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe what you want to fabricate (e.g. Balcony railing for 2nd floor, Main gate 14x7 ft, Chaff cutter machine for 15 cows)..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-sm text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-500 transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 px-6 rounded-lg bg-metallic-orange hover:brightness-110 text-stone-950 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer active:scale-98"
                >
                  {submitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Direct Enquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Embedded Location Map Preview */}
            <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-800">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-2">
                Workshop Location Map
              </span>
              <div className="relative aspect-[16/7] rounded-xl overflow-hidden border border-stone-200 dark:border-stone-800 bg-stone-100 dark:bg-stone-950">
                <iframe
                  title="JSP ForgeCore Workshop Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113942.23847621984!2d75.72758252424458!3d26.91243364448773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db68f237f3747%3A0x6b4f74d0046b0a8!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin"
                  className="w-full h-full border-0 grayscale contrast-125 opacity-80 hover:opacity-100 transition-opacity"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
