import { SaltInfo } from '../types';
import { SALTS_PART_1 } from './saltsPart1';
import { SALTS_PART_2 } from './saltsPart2';
import { SALTS_PART_3 } from './saltsPart3';

export const ALL_SALTS: SaltInfo[] = [
  ...SALTS_PART_1,
  ...SALTS_PART_2,
  ...SALTS_PART_3,
];

export function getAllSalts(): SaltInfo[] {
  return ALL_SALTS;
}

export function getSaltBySlug(slug: string): SaltInfo | undefined {
  if (!slug) return undefined;
  const normalized = slug.trim().toLowerCase();
  return ALL_SALTS.find(
    (s) =>
      s.slug.toLowerCase() === normalized ||
      s.name.toLowerCase() === normalized ||
      s.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === normalized
  );
}

export function searchSalts(query: string): SaltInfo[] {
  if (!query || !query.trim()) return ALL_SALTS;
  const q = query.trim().toLowerCase();
  return ALL_SALTS.filter((s) => {
    return (
      s.name.toLowerCase().includes(q) ||
      s.drugClass.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q) ||
      s.descriptionShort.toLowerCase().includes(q) ||
      s.aliases?.some((a) => a.toLowerCase().includes(q)) ||
      s.indications?.some((ind) => ind.toLowerCase().includes(q))
    );
  });
}

export function getSaltsByCategory(category: string): SaltInfo[] {
  if (!category || category === 'All') return ALL_SALTS;
  return ALL_SALTS.filter((s) => s.category.toLowerCase() === category.toLowerCase());
}

export const SALT_CATEGORIES = [
  'All',
  'Direct oncology / antineoplastic',
  'Oncology supportive / complication management',
  'Oncology-related adjunct / prevention',
];
