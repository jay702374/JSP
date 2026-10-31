export type ProductCategory = 
  | 'Railings'
  | 'Metal Beds'
  | 'Gates'
  | 'Chakki'
  | 'Chara-Kutti Machines'
  | 'Other Metal Works';

export interface Product {
  id: string;
  name: string;
  hindiName?: string;
  category: ProductCategory;
  subCategory: string;
  description: string;
  materialInfo: string;
  availableSizes: string;
  customizationOptions: string;
  manufacturingDetails: string;
  imageUrls: string[];
  isFeatured?: boolean;
  estimatedPrice?: string; // Optional fixed or starting price added by admin
  createdAt?: string;
  updatedAt?: string;
}

export type QuotationStatus = 
  | 'New Enquiry'
  | 'Under Review'
  | 'Quotation Sent'
  | 'Approved'
  | 'Rejected'
  | 'Completed';

export interface Enquiry {
  id?: string;
  enquiryId: string; // Unique human-readable ID: e.g. JSP-ENQ-XXXX
  customerName: string;
  mobileNumber: string;
  whatsappNumber?: string;
  email?: string;
  category: ProductCategory | string;
  productName: string;
  requiredSize?: string;
  materialPreference?: string;
  quantity: string | number;
  description: string;
  referenceImageUrl?: string; // Data URL or storage URL
  deliveryLocation?: string;
  status: QuotationStatus;
  quoteAmount?: string; // Admin quoted amount in INR (e.g. ₹45,000)
  adminNotes?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  location?: string;
  createdAt?: string;
}

export interface BusinessSettings {
  companyName: string;
  brandName: string;
  phone1: string;
  phone2: string;
  whatsappNumber: string;
  address: string;
  locationLink?: string;
  instagramHandle: string;
  instagramUrl: string;
  announcement?: string;
  heroHeadline?: string;
  heroSubheading?: string;
}
