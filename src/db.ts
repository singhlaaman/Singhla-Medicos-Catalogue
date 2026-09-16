import { db } from './firebase';
import { 
  collection, 
  doc, 
  getDocs, 
  getDoc,
  setDoc, 
  deleteDoc, 
  writeBatch,
  query,
  limit
} from 'firebase/firestore';
import { Medicine, Category, FAQItem, Testimonial } from './types';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    operationType,
    path
  };
  console.warn('Firestore Error Handled:', JSON.stringify(errInfo));
}

// Helper for SHA-256 hashing using Web Crypto API
export async function hashPassword(password: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Default hash of "aman1234"
const DEFAULT_HASH = '51625bb0fda4461f15d3f7365b6a2598899c9cb6f6077050d009a94fc3236b7c';

function removeUndefined<T>(obj: T): T {
  if (obj === null || obj === undefined) return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => removeUndefined(item)) as any;
  }
  if (typeof obj === 'object') {
    const cleaned: any = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const val = (obj as any)[key];
        if (val !== undefined) {
          cleaned[key] = removeUndefined(val);
        }
      }
    }
    return cleaned as T;
  }
  return obj;
}

/**
 * Gets the secure admin password hash from Firestore.
 * Seeds with default "aman1234" hash if none exists.
 */
export async function getAdminPasswordHash(): Promise<string> {
  try {
    const configDocRef = doc(db, 'admin_config', 'config');
    const configSnap = await getDoc(configDocRef);
    if (configSnap.exists()) {
      const storedHash = configSnap.data().passwordHash;
      const OLD_DEFAULT_HASH = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9';
      // If still using old default "admin123" hash, automatically migrate to the new "aman1234" hash
      if (storedHash === OLD_DEFAULT_HASH) {
        await setDoc(configDocRef, { passwordHash: DEFAULT_HASH, updatedAt: new Date() });
        return DEFAULT_HASH;
      }
      return storedHash || DEFAULT_HASH;
    } else {
      // Seed default password hash
      await setDoc(configDocRef, { passwordHash: DEFAULT_HASH, updatedAt: new Date() });
      return DEFAULT_HASH;
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, 'admin_config/config');
    return DEFAULT_HASH;
  }
}

/**
 * Updates the admin password in Firestore.
 */
export async function updateAdminPassword(newPasswordPlain: string): Promise<void> {
  try {
    const newHash = await hashPassword(newPasswordPlain);
    const configDocRef = doc(db, 'admin_config', 'config');
    await setDoc(configDocRef, { passwordHash: newHash, updatedAt: new Date() });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'admin_config/config');
    throw error;
  }
}

// --- MEDICINES CLIENT ---
const medicinesCol = collection(db, 'medicines');

export async function getMedicines(): Promise<Medicine[]> {
  try {
    const querySnapshot = await getDocs(medicinesCol);
    const list: Medicine[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.push({ id: doc.id, ...data } as Medicine);
    });
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'medicines');
    return [];
  }
}

export async function getSomeMedicines(limitCount: number = 30): Promise<Medicine[]> {
  try {
    const q = query(medicinesCol, limit(limitCount));
    const querySnapshot = await getDocs(q);
    const list: Medicine[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.push({ id: doc.id, ...data } as Medicine);
    });
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'medicines');
    return [];
  }
}

export async function saveMedicine(medicine: Medicine): Promise<void> {
  try {
    const docRef = doc(db, 'medicines', medicine.id);
    const payload = {
      ...medicine,
      updatedAt: new Date().toISOString(),
      createdAt: medicine.id.startsWith('med-import') ? new Date().toISOString() : (medicine.id ? (medicine as any).createdAt || new Date().toISOString() : new Date().toISOString()),
      status: (medicine as any).status || 'Published',
      lastEditedBy: 'Administrator'
    };
    await setDoc(docRef, removeUndefined(payload));
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `medicines/${medicine.id}`);
    throw error;
  }
}

/**
 * Updates multiple medicines in Firestore in safe batches (max 450 items per batch).
 * Includes progress feedback callback for smooth UI reporting.
 */
export async function batchUpdateMedicines(
  medicinesList: Medicine[],
  onProgress?: (progress: { current: number; total: number; percentage: number; message: string }) => void
): Promise<{ success: boolean; updatedCount: number; error?: string }> {
  try {
    const total = medicinesList.length;
    if (total === 0) return { success: true, updatedCount: 0 };

    const CHUNK_SIZE = 400; // Safe threshold under Firestore's 500 ops limit
    let processed = 0;

    for (let i = 0; i < total; i += CHUNK_SIZE) {
      const chunk = medicinesList.slice(i, i + CHUNK_SIZE);
      const batch = writeBatch(db);

      chunk.forEach((med) => {
        const docRef = doc(db, 'medicines', med.id);
        const payload = {
          ...med,
          updatedAt: new Date().toISOString(),
          lastEditedBy: med.lastEditedBy || 'Batch Category Sync'
        };
        batch.set(docRef, removeUndefined(payload), { merge: true });
      });

      await batch.commit();
      processed += chunk.length;

      const percentage = Math.round((processed / total) * 100);
      if (onProgress) {
        onProgress({
          current: processed,
          total,
          percentage,
          message: `Saved ${processed.toLocaleString()} of ${total.toLocaleString()} products (${percentage}%) to database...`
        });
      }
    }

    return { success: true, updatedCount: total };
  } catch (error: any) {
    console.error('Error in batchUpdateMedicines:', error);
    return {
      success: false,
      updatedCount: 0,
      error: error?.message || String(error)
    };
  }
}

export async function deleteMedicine(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'medicines', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `medicines/${id}`);
    throw error;
  }
}

// --- CATEGORIES CLIENT ---
const categoriesCol = collection(db, 'categories');

export async function getCategories(): Promise<Category[]> {
  try {
    const querySnapshot = await getDocs(categoriesCol);
    const list: Category[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.push({ id: doc.id, ...data } as Category);
    });
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'categories');
    return [];
  }
}

export async function saveCategory(category: Category): Promise<void> {
  try {
    const docRef = doc(db, 'categories', category.id);
    await setDoc(docRef, removeUndefined(category));
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `categories/${category.id}`);
    throw error;
  }
}

export async function deleteCategory(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'categories', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `categories/${id}`);
    throw error;
  }
}

// --- FAQS CLIENT ---
const faqsCol = collection(db, 'faqs');

export async function getFAQs(): Promise<FAQItem[]> {
  try {
    const querySnapshot = await getDocs(faqsCol);
    const list: FAQItem[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.push({ id: doc.id, ...data } as FAQItem);
    });
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'faqs');
    return [];
  }
}

export async function saveFAQ(faq: FAQItem): Promise<void> {
  try {
    const docRef = doc(db, 'faqs', faq.id);
    await setDoc(docRef, removeUndefined(faq));
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `faqs/${faq.id}`);
    throw error;
  }
}

export async function deleteFAQ(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'faqs', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `faqs/${id}`);
    throw error;
  }
}

// --- TESTIMONIALS CLIENT ---
const testimonialsCol = collection(db, 'testimonials');

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const querySnapshot = await getDocs(testimonialsCol);
    const list: Testimonial[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      list.push({ id: doc.id, ...data } as Testimonial);
    });
    return list;
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, 'testimonials');
    return [];
  }
}

export async function saveTestimonial(test: Testimonial): Promise<void> {
  try {
    const docRef = doc(db, 'testimonials', test.id);
    await setDoc(docRef, removeUndefined(test));
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `testimonials/${test.id}`);
    throw error;
  }
}

export async function deleteTestimonial(id: string): Promise<void> {
  try {
    const docRef = doc(db, 'testimonials', id);
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `testimonials/${id}`);
    throw error;
  }
}

/**
 * Seeds Firestore database with initial mock data if the collection is empty.
 * Uses a persistent metadata flag in Firestore to ensure deleted items are never re-seeded.
 */
export async function seedDatabaseIfEmpty(
  initialMeds: Medicine[],
  initialCats: Category[],
  initialFaqs: FAQItem[],
  initialTests: Testimonial[]
): Promise<{ medicines: Medicine[]; categories: Category[]; faqs: FAQItem[]; testimonials: Testimonial[] }> {
  try {
    const configDocRef = doc(db, 'admin_config', 'config');
    const configSnap = await getDoc(configDocRef);
    
    // Determine if seeding has already happened via metadata flag
    const hasSeededMetadata = configSnap.exists() && !!configSnap.data().hasSeeded;

    if (hasSeededMetadata) {
      return { medicines: [], categories: [], faqs: [], testimonials: [] };
    }

    // Otherwise check if collections actually have existing data using lightweight checks
    const meds = await getSomeMedicines(1);
    const cats = await getCategories();
    const faqs = await getFAQs();
    const tests = await getTestimonials();

    const hasSeeded = cats.length > 0 || meds.length > 0 || faqs.length > 0 || tests.length > 0;

    if (hasSeeded) {
      if (!configSnap.exists() || !configSnap.data().hasSeeded) {
        await setDoc(configDocRef, { hasSeeded: true }, { merge: true });
      }
      return { medicines: meds, categories: cats, faqs, testimonials: tests };
    }

    const batch = writeBatch(db);
    
    // Seed initial categories
    initialCats.forEach((cat) => {
      const docRef = doc(db, 'categories', cat.id);
      batch.set(docRef, cat);
    });

    // Seed initial medicines
    initialMeds.forEach((med) => {
      const docRef = doc(db, 'medicines', med.id);
      const payload = {
        ...med,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'Published',
        lastEditedBy: 'System Seed'
      };
      batch.set(docRef, payload);
    });

    // Seed initial FAQs
    initialFaqs.forEach((faq) => {
      const docRef = doc(db, 'faqs', faq.id);
      batch.set(docRef, faq);
    });

    // Seed initial testimonials
    initialTests.forEach((t) => {
      const docRef = doc(db, 'testimonials', t.id);
      batch.set(docRef, t);
    });

    // Mark as seeded in the config document and preserve/set admin password
    const configUpdate: any = { hasSeeded: true };
    if (!configSnap.exists() || !configSnap.data().passwordHash) {
      configUpdate.passwordHash = DEFAULT_HASH;
      configUpdate.updatedAt = new Date().toISOString();
    }
    batch.set(configDocRef, configUpdate, { merge: true });

    await batch.commit();
    console.log('Successfully seeded database with initial sample items.');

    return { medicines: initialMeds, categories: initialCats, faqs: initialFaqs, testimonials: initialTests };
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    console.warn('Firestore seed check notice (using local dataset):', errorMsg);
    return { medicines: initialMeds, categories: initialCats, faqs: initialFaqs, testimonials: initialTests };
  }
}

/**
 * Forcefully writes all initial sample data to Firestore, overwriting any existing records.
 * Provides granular step-by-step logs for UI feedback.
 */
export async function forceSyncAllDataToFirestore(
  initialMeds: Medicine[],
  initialCats: Category[],
  initialFaqs: FAQItem[],
  initialTests: Testimonial[],
  onProgress?: (message: string) => void
): Promise<{ success: boolean; log: string[] }> {
  const log: string[] = [];
  const addLog = (msg: string) => {
    log.push(msg);
    if (onProgress) onProgress(msg);
    console.log(`[Database Sync] ${msg}`);
  };

  try {
    addLog("Starting complete force synchronization to Firestore...");
    addLog(`Target Database ID: ai-studio-singhlamedicosca-1d965afa-73ba-46e1-bbe6-c1ceafb5d22f`);

    // 1. Write Categories
    addLog(`Seeding ${initialCats.length} Categories...`);
    const catBatch = writeBatch(db);
    initialCats.forEach((cat) => {
      const docRef = doc(db, 'categories', cat.id);
      catBatch.set(docRef, cat);
      addLog(`- Category queued: ${cat.name} (${cat.id})`);
    });
    await catBatch.commit();
    addLog("✓ Categories successfully written to Firestore.");

    // 2. Write Medicines
    addLog(`Seeding ${initialMeds.length} Medicines...`);
    // Firestore batch write limit is 500, we have ~20 medicines, so 1 batch is fine
    const medBatch = writeBatch(db);
    initialMeds.forEach((med) => {
      const docRef = doc(db, 'medicines', med.id);
      const payload = {
        ...med,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'Published',
        lastEditedBy: 'System Force Sync'
      };
      medBatch.set(docRef, payload);
      addLog(`- Medicine queued: ${med.name} (${med.id})`);
    });
    await medBatch.commit();
    addLog("✓ Medicines successfully written to Firestore.");

    // 3. Write FAQs
    addLog(`Seeding ${initialFaqs.length} FAQs...`);
    const faqBatch = writeBatch(db);
    initialFaqs.forEach((faq) => {
      const docRef = doc(db, 'faqs', faq.id);
      faqBatch.set(docRef, faq);
      addLog(`- FAQ queued: "${faq.question.substring(0, 30)}..." (${faq.id})`);
    });
    await faqBatch.commit();
    addLog("✓ FAQs successfully written to Firestore.");

    // 4. Write Testimonials
    addLog(`Seeding ${initialTests.length} Testimonials...`);
    const testBatch = writeBatch(db);
    initialTests.forEach((t) => {
      const docRef = doc(db, 'testimonials', t.id);
      testBatch.set(docRef, t);
      addLog(`- Testimonial queued: from ${t.name} (${t.id})`);
    });
    await testBatch.commit();
    addLog("✓ Testimonials successfully written to Firestore.");

    // 5. Verify / Seed Master Admin Password
    addLog("Verifying master administrator password configuration...");
    const configDocRef = doc(db, 'admin_config', 'config');
    const configSnap = await getDoc(configDocRef);
    if (!configSnap.exists() || !configSnap.data().passwordHash) {
      addLog("Master password hash not found. Seeding default password hash (aman1234)...");
      await setDoc(configDocRef, {
        passwordHash: '51625bb0fda4461f15d3f7365b6a2598899c9cb6f6077050d009a94fc3236b7c',
        updatedAt: new Date().toISOString()
      });
      addLog("✓ Master password seeded successfully.");
    } else {
      addLog("✓ Master password configuration already exists.");
    }

    addLog("🎉 Complete Firestore Force Synchronization finished successfully!");
    return { success: true, log };
  } catch (error: any) {
    const errorMsg = error?.message || String(error);
    addLog(`❌ Synchronization failed: ${errorMsg}`);
    addLog("Please ensure your Google Cloud Firestore permissions and rules allow writing, and that the custom database has been provisioned.");
    return { success: false, log };
  }
}

