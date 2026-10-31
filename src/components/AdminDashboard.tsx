import React, { useState, useMemo } from 'react';
import { 
  Shield, 
  Package, 
  MessageSquare, 
  Image, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Trash2, 
  CheckCircle, 
  Clock, 
  X, 
  ExternalLink, 
  Check, 
  AlertCircle,
  Eye,
  FileText
} from 'lucide-react';
import { buildWhatsAppLink } from '../utils/quotation';
import { formatIndianCurrency } from '../utils/validation';
import type { 
  Product, 
  Enquiry, 
  GalleryItem, 
  BusinessSettings, 
  ProductCategory, 
  QuotationStatus 
} from '../types';

interface AdminDashboardProps {
  products: Product[];
  enquiries: Enquiry[];
  gallery: GalleryItem[];
  settings: BusinessSettings;
  onSaveProduct: (product: Product) => Promise<void>;
  onDeleteProduct: (id: string) => Promise<void>;
  onUpdateEnquiry: (id: string, status: QuotationStatus, quoteAmount?: string, notes?: string) => Promise<void>;
  onSaveGalleryItem: (item: GalleryItem) => Promise<void>;
  onDeleteGalleryItem: (id: string) => Promise<void>;
  onSaveSettings: (settings: BusinessSettings) => Promise<void>;
  onLogout: () => void;
  currentUserEmail?: string | null;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  enquiries,
  gallery,
  settings,
  onSaveProduct,
  onDeleteProduct,
  onUpdateEnquiry,
  onSaveGalleryItem,
  onDeleteGalleryItem,
  onSaveSettings,
  onLogout,
  currentUserEmail,
}) => {
  const [activeTab, setActiveTab] = useState<'enquiries' | 'products' | 'gallery' | 'settings'>('enquiries');

  // Enquiries Filter & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);

  // Status update modal state
  const [editingEnquiryId, setEditingEnquiryId] = useState<string | null>(null);
  const [statusDraft, setStatusDraft] = useState<QuotationStatus>('New Enquiry');
  const [quoteDraft, setQuoteDraft] = useState('');
  const [notesDraft, setNotesDraft] = useState('');
  const [savingStatus, setSavingStatus] = useState(false);

  // Product Editor Modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  // Gallery Item Modal
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [galleryTitle, setGalleryTitle] = useState('');
  const [galleryCategory, setGalleryCategory] = useState('Railings');
  const [galleryDescription, setGalleryDescription] = useState('');
  const [galleryImageUrl, setGalleryImageUrl] = useState('');
  const [galleryLocation, setGalleryLocation] = useState('Jaipur, Rajasthan');

  // Settings form state
  const [settingsForm, setSettingsForm] = useState<BusinessSettings>({ ...settings });
  const [savingSettings, setSavingSettings] = useState(false);
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  // Stats Calculations
  const stats = useMemo(() => {
    const total = enquiries.length;
    const newEnq = enquiries.filter(e => e.status === 'New Enquiry').length;
    const underReview = enquiries.filter(e => e.status === 'Under Review').length;
    const quotationSent = enquiries.filter(e => e.status === 'Quotation Sent').length;
    const approved = enquiries.filter(e => e.status === 'Approved').length;
    const completed = enquiries.filter(e => e.status === 'Completed').length;
    const totalProds = products.length;

    return { total, newEnq, underReview, quotationSent, approved, completed, totalProds };
  }, [enquiries, products]);

  // Filtered Enquiries
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((e) => {
      const matchesSearch = 
        e.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.enquiryId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.mobileNumber.includes(searchQuery) ||
        (e.productName && e.productName.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus = statusFilter === 'All' || e.status === statusFilter;
      const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [enquiries, searchQuery, statusFilter, categoryFilter]);

  // Open Enquiry update
  const handleOpenUpdateEnquiry = (enquiry: Enquiry) => {
    setEditingEnquiryId(enquiry.enquiryId);
    setStatusDraft(enquiry.status);
    setQuoteDraft(enquiry.quoteAmount || '');
    setNotesDraft(enquiry.adminNotes || '');
  };

  const handleSaveEnquiryStatus = async () => {
    if (!editingEnquiryId) return;
    setSavingStatus(true);
    try {
      await onUpdateEnquiry(editingEnquiryId, statusDraft, quoteDraft, notesDraft);
      setEditingEnquiryId(null);
    } finally {
      setSavingStatus(false);
    }
  };

  // Product Add / Edit
  const handleOpenProductModal = (product?: Product) => {
    if (product) {
      setEditingProduct({ ...product });
    } else {
      setEditingProduct({
        id: `prod-${Date.now()}`,
        name: '',
        hindiName: '',
        category: 'Railings',
        subCategory: 'Balcony Railings',
        description: '',
        materialInfo: 'Mild Steel / SS 304',
        availableSizes: 'Custom made to site dimensions',
        customizationOptions: 'Powder coated or spray enamel',
        manufacturingDetails: 'Precision argon MIG welding',
        imageUrls: ['https://uploads.onecompiler.io/43u3a24n6/1781176726457/RAILING2.jpeg'],
        isFeatured: false,
      });
    }
    setIsProductModalOpen(true);
  };

  const handleSaveProductForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    await onSaveProduct(editingProduct);
    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  // Gallery Add
  const handleSaveGalleryItemForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!galleryTitle || !galleryImageUrl) return;

    const newItem: GalleryItem = {
      id: `gal-${Date.now()}`,
      title: galleryTitle,
      category: galleryCategory,
      description: galleryDescription || 'Fabricated at JSP ForgeCore Jaipur workshop.',
      imageUrl: galleryImageUrl,
      location: galleryLocation,
      createdAt: new Date().toISOString(),
    };

    await onSaveGalleryItem(newItem);
    setIsGalleryModalOpen(false);
    setGalleryTitle('');
    setGalleryImageUrl('');
    setGalleryDescription('');
  };

  // Settings Save
  const handleSaveSettingsForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await onSaveSettings(settingsForm);
      setSettingsSuccess(true);
      setTimeout(() => setSettingsSuccess(false), 3000);
    } finally {
      setSavingSettings(false);
    }
  };

  const getStatusBadgeClass = (status: QuotationStatus) => {
    switch (status) {
      case 'New Enquiry': return 'bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30';
      case 'Under Review': return 'bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30';
      case 'Quotation Sent': return 'bg-purple-500/15 text-purple-700 dark:text-purple-400 border border-purple-500/30';
      case 'Approved': return 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30';
      case 'Rejected': return 'bg-rose-500/15 text-rose-700 dark:text-rose-400 border border-rose-500/30';
      case 'Completed': return 'bg-stone-500/15 text-stone-700 dark:text-stone-300 border border-stone-500/30';
      default: return 'bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-400';
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 text-stone-900 dark:text-stone-100 py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 dark:border-stone-800 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500 flex items-center justify-center text-amber-600 dark:text-amber-500 shadow-xs">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-stone-900 dark:text-white flex items-center gap-2">
                <span>JSP ForgeCore Admin Portal</span>
              </h1>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Logged in as: <span className="text-amber-600 dark:text-amber-400 font-mono font-medium">{currentUserEmail || 'Admin (Full Privileges)'}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onLogout}
            className="py-2 px-4 rounded-lg bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white border border-stone-200 dark:border-stone-800 text-xs font-semibold flex items-center gap-2 transition-colors self-start sm:self-auto shadow-xs cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-rose-500" />
            <span>Exit Admin Mode</span>
          </button>
        </div>

        {/* Dashboard Statistics KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium block">Total Enquiries</span>
            <span className="text-2xl font-extrabold text-stone-900 dark:text-white font-mono mt-1 block">
              {stats.total}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-amber-500/40 shadow-xs">
            <span className="text-xs text-amber-600 dark:text-amber-400 font-medium block">New Enquiries</span>
            <span className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono mt-1 block">
              {stats.newEnq}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-blue-500/40 shadow-xs">
            <span className="text-xs text-blue-600 dark:text-blue-400 font-medium block">Under Review</span>
            <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 font-mono mt-1 block">
              {stats.underReview}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-purple-500/40 shadow-xs">
            <span className="text-xs text-purple-600 dark:text-purple-400 font-medium block">Quotes Sent</span>
            <span className="text-2xl font-extrabold text-purple-600 dark:text-purple-400 font-mono mt-1 block">
              {stats.quotationSent}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-emerald-500/40 shadow-xs">
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium block">Approved</span>
            <span className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono mt-1 block">
              {stats.approved}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-xs">
            <span className="text-xs text-stone-500 dark:text-stone-400 font-medium block">Total Products</span>
            <span className="text-2xl font-extrabold text-stone-700 dark:text-stone-200 font-mono mt-1 block">
              {stats.totalProds}
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`py-2.5 px-4 rounded-t-lg text-xs font-semibold transition-colors flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'enquiries'
                ? 'bg-white dark:bg-stone-900 text-amber-600 dark:text-amber-400 border-amber-500 shadow-xs'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white border-transparent'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Enquiries & Quotations ({enquiries.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`py-2.5 px-4 rounded-t-lg text-xs font-semibold transition-colors flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'products'
                ? 'bg-white dark:bg-stone-900 text-amber-600 dark:text-amber-400 border-amber-500 shadow-xs'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white border-transparent'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Products Management ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`py-2.5 px-4 rounded-t-lg text-xs font-semibold transition-colors flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-white dark:bg-stone-900 text-amber-600 dark:text-amber-400 border-amber-500 shadow-xs'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white border-transparent'
            }`}
          >
            <Image className="w-4 h-4" />
            <span>Project Gallery ({gallery.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2.5 px-4 rounded-t-lg text-xs font-semibold transition-colors flex items-center gap-2 border-b-2 cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-white dark:bg-stone-900 text-amber-600 dark:text-amber-400 border-amber-500 shadow-xs'
                : 'text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white border-transparent'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Company Settings</span>
          </button>
        </div>

        {/* TAB 1: ENQUIRIES & QUOTATIONS */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            {/* Filters and Search Bar */}
            <div className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col md:flex-row items-center justify-between gap-3 shadow-xs">
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name, ID, phone..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs text-stone-900 dark:text-white placeholder-stone-400 dark:placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <Filter className="w-3.5 h-3.5 text-stone-400" />
                  <span>Status:</span>
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="All">All Statuses</option>
                  <option value="New Enquiry">New Enquiry</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Quotation Sent">Quotation Sent</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Completed">Completed</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs text-stone-800 dark:text-stone-200 focus:outline-none focus:border-amber-500"
                >
                  <option value="All">All Categories</option>
                  <option value="Railings">Railings</option>
                  <option value="Gates">Gates</option>
                  <option value="Metal Beds">Metal Beds</option>
                  <option value="Chakki">Chakki</option>
                  <option value="Chara-Kutti Machines">Chara-Kutti</option>
                  <option value="Other Metal Works">Other Metal Works</option>
                  <option value="General Contact">General Contact</option>
                </select>
              </div>
            </div>

            {/* Enquiries Table */}
            {filteredEnquiries.length === 0 ? (
              <div className="p-12 text-center bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl text-stone-500 dark:text-stone-400 text-xs">
                No manufacturing enquiries found matching filters.
              </div>
            ) : (
              <div className="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden bg-white dark:bg-stone-900 shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-50 dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="p-3.5">Enquiry ID / Date</th>
                        <th className="p-3.5">Customer</th>
                        <th className="p-3.5">Product & Category</th>
                        <th className="p-3.5">Specs / Dimensions</th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Quoted Amount</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800/80">
                      {filteredEnquiries.map((enquiry) => {
                        const whatsappMsg = buildWhatsAppLink({
                          phone: enquiry.whatsappNumber || enquiry.mobileNumber,
                          enquiryId: enquiry.enquiryId,
                          customerName: enquiry.customerName,
                          category: enquiry.category,
                          productName: enquiry.productName,
                          specs: enquiry.requiredSize,
                          customMessage: enquiry.quoteAmount 
                            ? `Hello ${enquiry.customerName}, regarding your manufacturing inquiry #${enquiry.enquiryId}, our factory estimate is ${enquiry.quoteAmount}. Notes: ${enquiry.adminNotes || 'Please confirm if you want us to schedule site measurement.'}`
                            : `Hello ${enquiry.customerName}, we received your manufacturing enquiry #${enquiry.enquiryId} for ${enquiry.productName}. We are ready to discuss details.`,
                        });

                        return (
                          <tr key={enquiry.enquiryId} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                            <td className="p-3.5 font-mono">
                              <span className="font-bold text-amber-600 dark:text-amber-400 block">
                                {enquiry.enquiryId}
                              </span>
                              <span className="text-[10px] text-stone-500">
                                {enquiry.createdAt ? new Date(enquiry.createdAt).toLocaleDateString('en-IN') : 'Recent'}
                              </span>
                            </td>

                            <td className="p-3.5">
                              <span className="font-semibold text-stone-900 dark:text-white block">
                                {enquiry.customerName}
                              </span>
                              <a
                                href={`tel:${enquiry.mobileNumber}`}
                                className="text-stone-500 dark:text-stone-400 hover:text-amber-600 font-mono text-[11px]"
                              >
                                {enquiry.mobileNumber}
                              </a>
                            </td>

                            <td className="p-3.5">
                              <span className="text-stone-800 dark:text-stone-200 font-medium block">
                                {enquiry.productName}
                              </span>
                              <span className="text-amber-600 dark:text-amber-500 text-[11px]">
                                {enquiry.category}
                              </span>
                            </td>

                            <td className="p-3.5 text-stone-700 dark:text-stone-300 max-w-xs truncate">
                              <span>{enquiry.requiredSize || 'Custom'}</span>
                              {enquiry.materialPreference && (
                                <span className="text-stone-500 block text-[10px]">
                                  {enquiry.materialPreference}
                                </span>
                              )}
                            </td>

                            <td className="p-3.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${getStatusBadgeClass(enquiry.status)}`}>
                                {enquiry.status}
                              </span>
                            </td>

                            <td className="p-3.5 font-mono">
                              {enquiry.quoteAmount ? (
                                <span className="font-bold text-amber-600 dark:text-amber-400">
                                  {enquiry.quoteAmount}
                                </span>
                              ) : (
                                <span className="text-stone-400 italic text-[11px]">
                                  Not quoted
                                </span>
                              )}
                            </td>

                            <td className="p-3.5 text-right space-x-1.5 whitespace-nowrap">
                              <button
                                onClick={() => setSelectedEnquiry(enquiry)}
                                title="View Design & Full Requirement"
                                className="p-1.5 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>

                              <button
                                onClick={() => handleOpenUpdateEnquiry(enquiry)}
                                title="Update Status & Add Quote Price"
                                className="p-1.5 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 cursor-pointer"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                              </button>

                              <a
                                href={whatsappMsg}
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Message customer on WhatsApp"
                                className="p-1.5 rounded bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/30 inline-block cursor-pointer"
                              >
                                <MessageSquare className="w-3.5 h-3.5" />
                              </a>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900 dark:text-white">
                Manufacturing Products Catalog
              </h2>
              <button
                onClick={() => handleOpenProductModal()}
                className="py-2 px-3.5 rounded-lg bg-metallic-orange hover:brightness-110 text-stone-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Product</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="p-4 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 flex flex-col justify-between space-y-3 shadow-xs"
                >
                  <div className="flex gap-3">
                    <img
                      src={prod.imageUrls?.[0] || 'https://uploads.onecompiler.io/43u3a24n6/1781176504215/IMG_20260531_201627_035.webp'}
                      alt=""
                      className="w-16 h-16 rounded-lg object-cover bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] text-amber-600 dark:text-amber-500 font-semibold block">
                        {prod.category} · {prod.subCategory}
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 dark:text-white truncate">
                        {prod.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 dark:text-stone-400 line-clamp-2 mt-0.5">
                        {prod.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between text-xs">
                    <span className="text-stone-600 dark:text-stone-400 font-mono">
                      {prod.estimatedPrice || 'Price upon request'}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleOpenProductModal(prod)}
                        className="p-1.5 rounded bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300 cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete ${prod.name}?`)) {
                            onDeleteProduct(prod.id);
                          }
                        }}
                        className="p-1.5 rounded bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-500/30 cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: GALLERY MANAGEMENT */}
        {activeTab === 'gallery' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-stone-900 dark:text-white">
                Project Photos & Portfolio
              </h2>
              <button
                onClick={() => setIsGalleryModalOpen(true)}
                className="py-2 px-3.5 rounded-lg bg-metallic-orange hover:brightness-110 text-stone-950 text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Upload Project Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden group flex flex-col shadow-xs"
                >
                  <div className="relative aspect-[4/3] w-full bg-stone-100 dark:bg-stone-950">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <button
                      onClick={() => {
                        if (confirm(`Remove photo "${item.title}"?`)) {
                          onDeleteGalleryItem(item.id);
                        }
                      }}
                      className="absolute top-2 right-2 p-1 rounded-full bg-white/90 dark:bg-stone-950/80 text-rose-500 hover:bg-rose-100 dark:hover:bg-rose-900 border border-stone-200 dark:border-stone-800 cursor-pointer"
                      title="Delete Image"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="p-3 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] text-amber-600 dark:text-amber-500 font-semibold block">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-bold text-stone-900 dark:text-white line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                    {item.location && (
                      <span className="text-[10px] text-stone-500 mt-1 block">
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COMPANY SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="text-lg font-bold text-stone-900 dark:text-white">
              Business Contact & Announcement Settings
            </h2>

            {settingsSuccess && (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-500/40 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Settings saved successfully and synced across website!</span>
              </div>
            )}

            <form onSubmit={handleSaveSettingsForm} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.companyName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, companyName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                    Brand Division Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.brandName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, brandName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                    Primary Phone Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone1}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone1: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                    Secondary Phone Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone2}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone2: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                    WhatsApp Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    value={settingsForm.instagramHandle}
                    onChange={(e) => setSettingsForm({ ...settingsForm, instagramHandle: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                    Workshop Address
                  </label>
                  <textarea
                    rows={2}
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                    Announcement Banner
                  </label>
                  <input
                    type="text"
                    value={settingsForm.announcement || ''}
                    onChange={(e) => setSettingsForm({ ...settingsForm, announcement: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={savingSettings}
                className="py-2.5 px-5 rounded-lg bg-metallic-orange hover:brightness-110 text-stone-950 font-bold transition-all disabled:opacity-50 cursor-pointer active:scale-98"
              >
                {savingSettings ? 'Saving Settings...' : 'Update Settings'}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* MODAL 1: ENQUIRY DETAILS & STATUS UPDATE */}
      {editingEnquiryId && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="text-base font-bold text-stone-900 dark:text-white">
                Update Quotation #{editingEnquiryId}
              </h3>
              <button
                onClick={() => setEditingEnquiryId(null)}
                className="p-1 rounded text-stone-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                  Enquiry Status
                </label>
                <select
                  value={statusDraft}
                  onChange={(e) => setStatusDraft(e.target.value as QuotationStatus)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                >
                  <option value="New Enquiry">New Enquiry</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Quotation Sent">Quotation Sent</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                  Quoted Amount (₹ INR)
                </label>
                <input
                  type="text"
                  value={quoteDraft}
                  onChange={(e) => setQuoteDraft(e.target.value)}
                  placeholder="e.g. ₹35,000 + GST"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">
                  Workshop Notes
                </label>
                <textarea
                  rows={3}
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  placeholder="Internal notes on metal thickness, fitting schedule, transport charges..."
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                onClick={() => setEditingEnquiryId(null)}
                className="py-2 px-3 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEnquiryStatus}
                disabled={savingStatus}
                className="py-2 px-4 rounded-lg bg-metallic-orange text-stone-950 text-xs font-bold cursor-pointer"
              >
                {savingStatus ? 'Saving...' : 'Save & Update'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CUSTOMER ENQUIRY VIEW LIGHTBOX */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <div>
                <span className="text-[10px] text-amber-600 dark:text-amber-500 font-mono font-bold block">
                  #{selectedEnquiry.enquiryId}
                </span>
                <h3 className="text-base font-bold text-stone-900 dark:text-white">
                  {selectedEnquiry.productName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded text-stone-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-700 dark:text-stone-300">
              <div className="grid grid-cols-2 gap-2 bg-stone-50 dark:bg-stone-950 p-3 rounded-lg border border-stone-200 dark:border-stone-800">
                <div><span className="text-stone-500 block">Customer:</span> <strong className="text-stone-900 dark:text-white">{selectedEnquiry.customerName}</strong></div>
                <div><span className="text-stone-500 block">Mobile:</span> <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">{selectedEnquiry.mobileNumber}</span></div>
                <div><span className="text-stone-500 block">Category:</span> {selectedEnquiry.category}</div>
                <div><span className="text-stone-500 block">Status:</span> <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold ${getStatusBadgeClass(selectedEnquiry.status)}`}>{selectedEnquiry.status}</span></div>
              </div>

              <div>
                <strong className="text-stone-500 dark:text-stone-400 block mb-1">Requirement Description:</strong>
                <p className="p-3 bg-stone-50 dark:bg-stone-950 rounded-lg text-stone-800 dark:text-stone-200 leading-relaxed border border-stone-200 dark:border-stone-800">
                  {selectedEnquiry.description}
                </p>
              </div>

              {selectedEnquiry.referenceImageUrl && (
                <div>
                  <strong className="text-stone-500 dark:text-stone-400 block mb-1">Uploaded Reference Design / Photo:</strong>
                  <div className="p-2 bg-stone-50 dark:bg-stone-950 rounded-lg border border-stone-200 dark:border-stone-800">
                    <img
                      src={selectedEnquiry.referenceImageUrl}
                      alt="Customer Reference"
                      className="max-h-60 rounded object-contain mx-auto"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="py-2 px-4 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: PRODUCT ADD/EDIT */}
      {isProductModalOpen && editingProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <form 
            onSubmit={handleSaveProductForm}
            className="max-w-xl w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="text-base font-bold text-stone-900 dark:text-white">
                {editingProduct.id.startsWith('prod-') && editingProduct.name ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded text-stone-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Hindi Title</label>
                  <input
                    type="text"
                    value={editingProduct.hindiName || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, hindiName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Category</label>
                  <select
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value as ProductCategory })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white"
                  >
                    <option value="Railings">Railings</option>
                    <option value="Metal Beds">Metal Beds</option>
                    <option value="Gates">Gates</option>
                    <option value="Chakki">Chakki</option>
                    <option value="Chara-Kutti Machines">Chara-Kutti Machines</option>
                    <option value="Other Metal Works">Other Metal Works</option>
                  </select>
                </div>
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Subcategory</label>
                  <input
                    type="text"
                    value={editingProduct.subCategory}
                    onChange={(e) => setEditingProduct({ ...editingProduct, subCategory: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Primary Image URL</label>
                <input
                  type="text"
                  value={editingProduct.imageUrls?.[0] || ''}
                  onChange={(e) => setEditingProduct({ ...editingProduct, imageUrls: [e.target.value] })}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white font-mono text-[11px]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Material Info</label>
                  <input
                    type="text"
                    value={editingProduct.materialInfo}
                    onChange={(e) => setEditingProduct({ ...editingProduct, materialInfo: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Price Guide (Optional)</label>
                  <input
                    type="text"
                    value={editingProduct.estimatedPrice || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, estimatedPrice: e.target.value })}
                    placeholder="e.g. ₹4,500 onwards"
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsProductModalOpen(false)}
                className="py-2 px-3 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 rounded-lg bg-metallic-orange text-stone-950 text-xs font-bold cursor-pointer"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL 4: GALLERY ITEM ADD */}
      {isGalleryModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveGalleryItemForm}
            className="max-w-md w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 space-y-4 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-800">
              <h3 className="text-base font-bold text-stone-900 dark:text-white">Add Project Photo</h3>
              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(false)}
                className="p-1 rounded text-stone-400 hover:text-stone-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={galleryTitle}
                  onChange={(e) => setGalleryTitle(e.target.value)}
                  placeholder="e.g. Modern SS Balcony Railing Installation"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Category</label>
                <select
                  value={galleryCategory}
                  onChange={(e) => setGalleryCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white"
                >
                  <option value="Railings">Railings</option>
                  <option value="Gates">Gates</option>
                  <option value="Metal Beds">Metal Beds</option>
                  <option value="Chakki">Chakki</option>
                  <option value="Chara-Kutti Machines">Chara-Kutti Machines</option>
                  <option value="Other Metal Works">Other Metal Works</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Image URL *</label>
                <input
                  type="text"
                  required
                  value={galleryImageUrl}
                  onChange={(e) => setGalleryImageUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-stone-700 dark:text-stone-300 font-semibold mb-1">Location</label>
                <input
                  type="text"
                  value={galleryLocation}
                  onChange={(e) => setGalleryLocation(e.target.value)}
                  placeholder="e.g. Jaipur, Rajasthan"
                  className="w-full px-3 py-2 rounded-lg bg-stone-50 dark:bg-stone-950 border border-stone-300 dark:border-stone-800 text-stone-900 dark:text-white"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsGalleryModalOpen(false)}
                className="py-2 px-3 rounded-lg bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2 px-4 rounded-lg bg-metallic-orange text-stone-950 text-xs font-bold cursor-pointer"
              >
                Add Photo
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
