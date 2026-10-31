import React, { useState } from 'react';
import { MessageSquare, Phone, X, ChevronUp, FileText } from 'lucide-react';
import { buildWhatsAppLink } from '../utils/quotation';
import type { BusinessSettings } from '../types';

interface FloatingWhatsAppProps {
  settings: BusinessSettings;
  onOpenCustomOrder: () => void;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  settings,
  onOpenCustomOrder,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const phone = settings.phone1 || '7023746632';

  const chatUrl = buildWhatsAppLink({
    phone,
    customMessage: 'Hello JSP ForgeCore, I am contacting you from your website to enquire about metal manufacturing and custom fabrication.',
  });

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Popover Menu */}
      {isOpen && (
        <div className="mb-3 w-72 rounded-2xl bg-stone-900 border border-stone-800 p-4 shadow-2xl space-y-3 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800">
            <div>
              <span className="text-xs font-bold text-white block">
                Direct Workshop Contact
              </span>
              <span className="text-[10px] text-amber-500 font-medium">
                JSP ForgeCore · Jaipur
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-stone-800"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            {/* WhatsApp Direct */}
            <a
              href={chatUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/70 border border-emerald-500/30 text-emerald-300 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-semibold block text-white text-xs">Chat on WhatsApp</span>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold">+91 {phone}</span>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-medium">Online</span>
            </a>

            {/* Direct Phone Call */}
            <a
              href={`tel:${phone}`}
              className="p-2.5 rounded-xl bg-stone-950 hover:bg-stone-800 border border-stone-800 text-stone-300 flex items-center justify-between transition-colors"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-medium">Call Directly</span>
              </div>
              <span className="font-mono text-[11px] font-bold text-stone-200">{phone}</span>
            </a>

            {/* Custom Quote Trigger */}
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenCustomOrder();
              }}
              className="w-full p-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-400 font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <FileText className="w-4 h-4 text-amber-500" />
              <span>Submit Custom Requirement</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp and Factory Contact Menu"
        className="h-12 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl flex items-center gap-2.5 transition-all hover:scale-105 glow-orange focus:outline-none cursor-pointer"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="text-xs font-bold hidden sm:inline whitespace-nowrap">
          WhatsApp: 7023746632
        </span>
        <ChevronUp className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
    </div>
  );
};
