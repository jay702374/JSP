import { initializeApp, getApps, type FirebaseApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  getDocFromServer,
  type Firestore 
} from 'firebase/firestore';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  type Auth, 
  type User 
} from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';
import type { Product, Enquiry, GalleryItem, BusinessSettings } from '../types';
import { INITIAL_PRODUCTS, INITIAL_GALLERY, DEFAULT_SETTINGS } from '../data/defaultData';

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export const db: Firestore = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth: Auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Standard test connection
async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client offline, local cache will be utilized.');
    }
  }
}
testFirestoreConnection();

// LocalStorage keys for fallback caching
const LS_PRODUCTS_KEY = 'jsp_forgecore_products';
const LS_ENQUIRIES_KEY = 'jsp_forgecore_enquiries';
const LS_GALLERY_KEY = 'jsp_forgecore_gallery';
const LS_SETTINGS_KEY = 'jsp_forgecore_settings';

/* ==================== PRODUCTS ==================== */
export async function getProducts(): Promise<Product[]> {
  const normalizeProducts = (list: Product[]): Product[] => {
    return list.map(item => {
      const defaultItem = INITIAL_PRODUCTS.find(p => p.id === item.id);
      return {
        ...item,
        imageUrls: defaultItem ? defaultItem.imageUrls : item.imageUrls,
        availableSizes: 'Custom fabricated to site specifications',
      };
    });
  };

  try {
    const snap = await getDocs(collection(db, 'products'));
    if (!snap.empty) {
      const list = snap.docs.map(d => ({ ...d.data(), id: d.id } as Product));
      const normalized = normalizeProducts(list);
      localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(normalized));
      return normalized;
    }
  } catch (err) {
    console.warn('Firestore fetch failed, checking local storage:', err);
  }
  const cached = localStorage.getItem(LS_PRODUCTS_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      const normalized = normalizeProducts(parsed);
      localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(normalized));
      return normalized;
    } catch {
      // fallback
    }
  }
  localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
  return INITIAL_PRODUCTS;
}

export async function saveProduct(product: Product): Promise<void> {
  const docRef = doc(db, 'products', product.id);
  const data = { ...product, updatedAt: new Date().toISOString() };
  try {
    await setDoc(docRef, data, { merge: true });
  } catch (err) {
    console.warn('Firestore write warning:', err);
  }
  // Update local storage
  const cached = localStorage.getItem(LS_PRODUCTS_KEY);
  let list: Product[] = cached ? JSON.parse(cached) : [...INITIAL_PRODUCTS];
  const idx = list.findIndex(p => p.id === product.id);
  if (idx >= 0) {
    list[idx] = data;
  } else {
    list.unshift(data);
  }
  localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(list));
}

export async function deleteProduct(productId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (err) {
    console.warn('Firestore delete warning:', err);
  }
  const cached = localStorage.getItem(LS_PRODUCTS_KEY);
  if (cached) {
    const list: Product[] = JSON.parse(cached).filter((p: Product) => p.id !== productId);
    localStorage.setItem(LS_PRODUCTS_KEY, JSON.stringify(list));
  }
}

/* ==================== ENQUIRIES ==================== */
export async function getEnquiries(): Promise<Enquiry[]> {
  try {
    const q = query(collection(db, 'enquiries'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const list = snap.docs.map(d => ({ ...d.data(), id: d.id } as Enquiry));
      localStorage.setItem(LS_ENQUIRIES_KEY, JSON.stringify(list));
      return list;
    }
  } catch (err) {
    console.warn('Firestore enquiries fetch warning:', err);
  }
  const cached = localStorage.getItem(LS_ENQUIRIES_KEY);
  return cached ? JSON.parse(cached) : [];
}

export async function createEnquiry(enquiry: Enquiry): Promise<string> {
  const docRef = doc(db, 'enquiries', enquiry.enquiryId);
  const payload = {
    ...enquiry,
    createdAt: enquiry.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  try {
    await setDoc(docRef, payload);
  } catch (err) {
    console.warn('Firestore enquiry write warning:', err);
  }

  // Always persist locally
  const cached = localStorage.getItem(LS_ENQUIRIES_KEY);
  const list: Enquiry[] = cached ? JSON.parse(cached) : [];
  list.unshift(payload);
  localStorage.setItem(LS_ENQUIRIES_KEY, JSON.stringify(list));

  return enquiry.enquiryId;
}

export async function updateEnquiryStatus(
  enquiryId: string, 
  status: Enquiry['status'], 
  quoteAmount?: string, 
  adminNotes?: string
): Promise<void> {
  const docRef = doc(db, 'enquiries', enquiryId);
  const updates: Partial<Enquiry> = {
    status,
    updatedAt: new Date().toISOString(),
    ...(quoteAmount !== undefined && { quoteAmount }),
    ...(adminNotes !== undefined && { adminNotes })
  };

  try {
    await updateDoc(docRef, updates);
  } catch (err) {
    console.warn('Firestore update warning:', err);
  }

  const cached = localStorage.getItem(LS_ENQUIRIES_KEY);
  if (cached) {
    const list: Enquiry[] = JSON.parse(cached);
    const item = list.find(e => e.enquiryId === enquiryId);
    if (item) {
      Object.assign(item, updates);
      localStorage.setItem(LS_ENQUIRIES_KEY, JSON.stringify(list));
    }
  }
}

/* ==================== GALLERY ==================== */
export async function getGallery(): Promise<GalleryItem[]> {
  const normalizeGallery = (list: GalleryItem[]): GalleryItem[] => {
    return list.map(item => {
      const defaultItem = INITIAL_GALLERY.find(g => g.id === item.id);
      return {
        ...item,
        imageUrl: defaultItem ? defaultItem.imageUrl : item.imageUrl,
      };
    });
  };

  try {
    const snap = await getDocs(collection(db, 'gallery'));
    if (!snap.empty) {
      const list = snap.docs.map(d => ({ ...d.data(), id: d.id } as GalleryItem));
      const normalized = normalizeGallery(list);
      localStorage.setItem(LS_GALLERY_KEY, JSON.stringify(normalized));
      return normalized;
    }
  } catch (err) {
    console.warn('Firestore gallery fetch warning:', err);
  }
  const cached = localStorage.getItem(LS_GALLERY_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      const normalized = normalizeGallery(parsed);
      localStorage.setItem(LS_GALLERY_KEY, JSON.stringify(normalized));
      return normalized;
    } catch {
      // fallback
    }
  }
  localStorage.setItem(LS_GALLERY_KEY, JSON.stringify(INITIAL_GALLERY));
  return INITIAL_GALLERY;
}

export async function saveGalleryItem(item: GalleryItem): Promise<void> {
  const docRef = doc(db, 'gallery', item.id);
  try {
    await setDoc(docRef, item, { merge: true });
  } catch (err) {
    console.warn('Firestore gallery write warning:', err);
  }
  const cached = localStorage.getItem(LS_GALLERY_KEY);
  let list: GalleryItem[] = cached ? JSON.parse(cached) : [...INITIAL_GALLERY];
  const idx = list.findIndex(g => g.id === item.id);
  if (idx >= 0) {
    list[idx] = item;
  } else {
    list.unshift(item);
  }
  localStorage.setItem(LS_GALLERY_KEY, JSON.stringify(list));
}

export async function deleteGalleryItem(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'gallery', id));
  } catch (err) {
    console.warn('Firestore gallery delete warning:', err);
  }
  const cached = localStorage.getItem(LS_GALLERY_KEY);
  if (cached) {
    const list: GalleryItem[] = JSON.parse(cached).filter((g: GalleryItem) => g.id !== id);
    localStorage.setItem(LS_GALLERY_KEY, JSON.stringify(list));
  }
}

/* ==================== SETTINGS ==================== */
export async function getSettings(): Promise<BusinessSettings> {
  const ensureAuthorizedPhone = (s: BusinessSettings): BusinessSettings => {
    return {
      ...s,
      phone1: '7023746632',
      phone2: '7023746632',
      whatsappNumber: '7023746632',
    };
  };

  try {
    const snap = await getDoc(doc(db, 'settings', 'general'));
    if (snap.exists()) {
      const data = ensureAuthorizedPhone(snap.data() as BusinessSettings);
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(data));
      return data;
    }
  } catch (err) {
    console.warn('Firestore settings fetch warning:', err);
  }
  const cached = localStorage.getItem(LS_SETTINGS_KEY);
  if (cached) {
    const parsed = ensureAuthorizedPhone(JSON.parse(cached));
    localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(parsed));
    return parsed;
  }
  localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(DEFAULT_SETTINGS));
  return DEFAULT_SETTINGS;
}

export async function saveSettings(settings: BusinessSettings): Promise<void> {
  try {
    await setDoc(doc(db, 'settings', 'general'), settings, { merge: true });
  } catch (err) {
    console.warn('Firestore settings write warning:', err);
  }
  localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(settings));
}

/* ==================== AUTH ==================== */
export async function loginWithGoogle(): Promise<User | null> {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    return res.user;
  } catch (err) {
    console.error('Google Sign-in failed:', err);
    throw err;
  }
}

export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

export function subscribeToAuth(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}
