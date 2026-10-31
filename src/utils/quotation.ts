/**
 * Manufacturing specification & consultation utilities for JSP ForgeCore Metal Manufacturing
 * Custom orders receive direct workshop consultations based on site blueprints and live market metal rates.
 */

export interface MetalSpec {
  category: string;
  material: 'Mild Steel (MS)' | 'Stainless Steel (SS 304)' | 'Stainless Steel (SS 202)' | 'Wrought Iron' | 'Cast Iron' | 'Galvanized Iron (GI)';
  gauge: '12 Gauge (Heavy 2.5mm)' | '14 Gauge (Standard 2.0mm)' | '16 Gauge (Medium 1.5mm)' | '18 Gauge (Light 1.2mm)';
  quantity: number;
  finish: 'Powder Coated' | 'Primer + Enamel Paint' | 'Buffed Glossy (SS)' | 'Matte Industrial' | 'Raw Unfinished';
  installationType?: string;
}

export interface QuoteEstimate {
  leadTimeDays: string;
  gaugeRecommendation: string;
  notes: string[];
}

export function calculateQuotationEstimate(spec: MetalSpec): QuoteEstimate {
  const qty = Math.max(1, Number(spec.quantity) || 1);

  // Estimated fabrication timeline
  let leadTimeDays = '3 - 5 Days';
  if (qty > 5) {
    leadTimeDays = '5 - 10 Days';
  } else if (spec.finish === 'Powder Coated') {
    leadTimeDays = '4 - 7 Days';
  }

  const gaugeRecommendation = spec.gauge.includes('12') 
    ? 'High Strength Structural Heavy Gauge (Gate / Industrial frames)'
    : spec.gauge.includes('14')
    ? 'Standard Commercial Grade (Heavy Balcony & Gates)'
    : 'Architectural Light/Medium Section (Railings & Interior)';

  const notes = [
    `Selected Metallurgy: ${spec.material} (${spec.gauge}).`,
    `Surface treatment: ${spec.finish}. Estimated workshop lead time: ${leadTimeDays}.`,
    `Direct workshop verification: Detailed consultations and custom fabrication provided after site blueprint inspection.`,
  ];

  return {
    leadTimeDays,
    gaugeRecommendation,
    notes,
  };
}

/**
 * Generate a sequential-style unique enquiry ID (e.g. JSP-ENQ-74892)
 */
export function generateEnquiryId(): string {
  const timestamp = Date.now().toString(36).toUpperCase().slice(-4);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `JSP-ENQ-${timestamp}${random}`;
}

/**
 * Format WhatsApp click-to-chat URL with structured inquiry text
 * Contact number is strictly 7023746632
 */
export function buildWhatsAppLink(options: {
  phone?: string;
  enquiryId?: string;
  customerName?: string;
  category?: string;
  productName?: string;
  specs?: string;
  customMessage?: string;
}): string {
  const phone = (options.phone || '7023746632').replace(/\D/g, '');
  const cleanPhone = phone.startsWith('91') ? phone : `91${phone}`;

  let lines: string[] = ['*Enquiry for JSP ForgeCore (JSP Metal Works)*'];

  if (options.enquiryId) {
    lines.push(`📋 *Enquiry ID:* ${options.enquiryId}`);
  }
  if (options.customerName) {
    lines.push(`👤 *Name:* ${options.customerName}`);
  }
  if (options.category) {
    lines.push(`🔧 *Category:* ${options.category}`);
  }
  if (options.productName) {
    lines.push(`📦 *Product:* ${options.productName}`);
  }
  if (options.specs) {
    lines.push(`📐 *Specifications:* ${options.specs}`);
  }
  if (options.customMessage) {
    lines.push(`\n💬 *Details:*\n${options.customMessage}`);
  }

  lines.push('\n📍 *Workshop:* Cheethawari, Jaipur, Rajasthan');
  lines.push('📞 *Contact:* +91 7023746632');

  const fullText = lines.join('\n');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(fullText)}`;
}
