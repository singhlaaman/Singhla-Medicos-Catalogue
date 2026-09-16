import { Medicine, SaltInfo } from '../types';

/**
 * Common chemical salt/form suffixes and generic words that should not be used as sole identifier word
 */
const COMMON_SALT_SUFFIXES = new Set([
  'acid',
  'sodium',
  'potassium',
  'calcium',
  'fumarate',
  'citrate',
  'hydrate',
  'dihydrochloride',
  'hydrochloride',
  'sulfate',
  'phosphate',
  'acetate',
  'mesylate',
  'tartrate',
  'monohydrate',
  'trihydrate',
  'disodium',
  'dipotassium',
  'succinate',
  'maleate',
  'besylate',
  'gluconate',
  'ip',
  'bp',
  'usp',
  'injection',
  'tablets',
  'capsules',
  'vial',
  'syrup',
  'suspension'
]);

/**
 * Checks whether a single token/word is a meaningful active drug base word
 */
function isSignificantDrugWord(word: string): boolean {
  if (!word || word.length < 4) return false;
  return !COMMON_SALT_SUFFIXES.has(word);
}

/**
 * Determines whether a medicine product accurately belongs to a given active salt monograph.
 */
export function matchesMedicineToSalt(medicine: Medicine, salt: SaltInfo): boolean {
  if (!medicine || !salt) return false;

  const saltName = (salt.name || '').trim().toLowerCase();
  if (saltName.length < 3) return false;

  const medSalt = (medicine.saltName || '').trim().toLowerCase();
  const medGen = (medicine.genericName || '').trim().toLowerCase();
  const medBrand = (medicine.brandName || '').trim().toLowerCase();
  const medName = (medicine.name || '').trim().toLowerCase();

  // 1. Direct Full Salt Name exact match inside medicine formulation, generic name, or title
  if (medSalt && medSalt.includes(saltName)) return true;
  if (medGen && medGen.includes(saltName)) return true;
  if (medName && medName.includes(saltName)) return true;

  // 2. Significant root active ingredient name matching
  // (e.g. for "Abiraterone acetate", significant root is "abiraterone")
  // (e.g. for "Tenofovir alafenamide", significant roots are "tenofovir", "alafenamide")
  const saltSignificantWords = saltName
    .split(/[\s+/,-]+/)
    .map((w) => w.replace(/[^a-z0-9]/g, ''))
    .filter(isSignificantDrugWord);

  if (saltSignificantWords.length > 0) {
    // If all significant drug words of the salt are found in medicine's salt/generic/name
    const allSignificantWordsMatch = saltSignificantWords.every((word) => {
      return (
        (medSalt && medSalt.includes(word)) ||
        (medGen && medGen.includes(word)) ||
        (medName && medName.includes(word))
      );
    });

    if (allSignificantWordsMatch) {
      return true;
    }
  }

  // 3. Match against known commercial brand aliases for the salt
  // (e.g., Avastin for Bevacizumab, Zytiga/Abirapro for Abiraterone)
  if (salt.aliases && Array.isArray(salt.aliases) && salt.aliases.length > 0) {
    for (const rawAlias of salt.aliases) {
      const alias = (rawAlias || '').trim().toLowerCase();
      // Skip trivial / generic words
      if (alias.length < 3 || COMMON_SALT_SUFFIXES.has(alias)) continue;

      // Tokenize medicine text to ensure whole word/prefix matching
      const tokenMatch = (text: string) => {
        if (!text) return false;
        const tokens = text.split(/[\s+/,-]+/).map((t) => t.replace(/[^a-z0-9]/g, ''));
        return tokens.some((t) => {
          if (!t) return false;
          if (t === alias) return true;
          // Match brand with dosage e.g. "abirapro250" or "avastin400"
          if (t.startsWith(alias) && alias.length >= 4) return true;
          return false;
        });
      };

      if (tokenMatch(medBrand) || tokenMatch(medName) || tokenMatch(medSalt)) {
        return true;
      }
    }
  }

  return false;
}

/**
 * Returns all medicines matching the given salt from the inventory
 */
export function getMedicinesForSalt(salt: SaltInfo, allMedicines: Medicine[]): Medicine[] {
  if (!salt || !allMedicines || !Array.isArray(allMedicines)) return [];
  return allMedicines.filter((med) => matchesMedicineToSalt(med, salt));
}

/**
 * Finds the matching salt monograph for a medicine (if one exists)
 */
export function getSaltForMedicine(medicine: Medicine, allSalts: SaltInfo[]): SaltInfo | undefined {
  if (!medicine || !allSalts || !Array.isArray(allSalts)) return undefined;
  return allSalts.find((salt) => matchesMedicineToSalt(medicine, salt));
}
