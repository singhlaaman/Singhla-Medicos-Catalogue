export interface Medicine {
  id: string;
  name: string;
  brandName: string;
  genericName: string;
  saltName: string;
  strength: string;
  category: string;
  manufacturer: string;
  descriptionShort?: string;
  descriptionLong?: string;
  uses: string[];
  sideEffects: string[];
  dosage: string;
  storageInstructions: string;
  coldStorage: 'Yes' | 'No';
  storageTemperature: string;
  prescriptionRequired: 'Yes' | 'No';
  packaging: string;
  images: string[];
  faqs: { question: string; answer: string }[];
  relatedMedicines: string[]; // slugs
  seoTitle: string;
  seoDescription: string;
  slug: string;
  mrp: number;
  discountPercentage?: number;
  discountPrice?: number;
  availability: 'In Stock' | 'Out of Stock' | 'Limited Stock';
  countryOfOrigin: string;
  dosageForm: 'Tablet' | 'Capsule' | 'Injection' | 'Syrup' | 'Cream';
  createdAt?: string;
  updatedAt?: string;
  status?: 'Published' | 'Draft';
  lastEditedBy?: string;
}

export interface Category {
  id: string;
  name: string;
  iconName: string; // lucide icon name
  icon?: string;
  count?: number;
  featured?: boolean;
  order?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface AppSettings {
  contactPhone: string;
  contactWhatsApp: string;
  address: string;
  email: string;
  googleMapsUrl: string;
}

export interface SaltInfo {
  id: string;
  sNo: number;
  name: string;
  slug: string;
  category: 'Direct oncology / antineoplastic' | 'Oncology supportive / complication management' | 'Oncology-related adjunct / prevention' | string;
  drugClass: string;
  descriptionShort: string;
  descriptionLong: string;
  mechanismOfAction: string;
  indications: string[];
  commonStrengths: string[];
  dosageForms: string[];
  commonSideEffects: string[];
  storageAdvice: string;
  coldStorage?: 'Yes' | 'No';
  faqs: { question: string; answer: string }[];
  aliases?: string[];
}
