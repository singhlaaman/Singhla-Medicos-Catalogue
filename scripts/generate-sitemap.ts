import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { INITIAL_MEDICINES } from '../src/data.js';

// Get current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://singhlamedicos.co.in';
const CURRENT_DATE = new Date().toISOString().split('T')[0];

const firebaseConfig = {
  apiKey: "AIzaSyC3WJklzmANyXP7VtRFf-XVMT1O80mSTAU",
  authDomain: "singhla-medicos-497712.firebaseapp.com",
  projectId: "singhla-medicos-497712",
  storageBucket: "singhla-medicos-497712.firebasestorage.app",
  messagingSenderId: "24082575206",
  appId: "1:24082575206:web:6732558db5eb1c6e2a22a7"
};

async function fetchAllMedicinesFromFirestore(): Promise<string[]> {
  const slugs: string[] = [];
  console.log('Fetching medicine slugs using Firebase JS SDK...');

  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app, "ai-studio-singhlamedicosca-1d965afa-73ba-46e1-bbe6-c1ceafb5d22f");
    const medicinesCol = collection(db, 'medicines');
    
    const querySnapshot = await getDocs(medicinesCol);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const slug = data.slug;
      const status = data.status;
      if (slug && (status === undefined || status === 'Published')) {
        slugs.push(slug);
      }
    });

    console.log(`Successfully fetched ${slugs.length} slugs using Firebase JS SDK.`);
  } catch (error) {
    console.error('Failed to query Firestore using Firebase JS SDK. Using fallback initial medicines...', error);
  }

  return slugs;
}

async function generateSitemap() {
  console.log('Generating sitemap.xml...');

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [];

  // 1. Add Homepage
  urls.push({
    loc: `${BASE_URL}/`,
    lastmod: CURRENT_DATE,
    changefreq: 'daily',
    priority: '1.0',
  });

  // 2. Fetch all dynamic medicine slugs from Firestore
  const dynamicSlugs = await fetchAllMedicinesFromFirestore();

  if (dynamicSlugs.length > 0) {
    dynamicSlugs.forEach((slug) => {
      urls.push({
        loc: `${BASE_URL}/medicine/${slug}`,
        lastmod: CURRENT_DATE,
        changefreq: 'weekly',
        priority: '0.8',
      });
    });
  } else {
    // Fallback to initial medicines if database query yielded nothing or failed
    console.log('Using fallback static seed list of medicines for sitemap.');
    INITIAL_MEDICINES.forEach((medicine) => {
      if (medicine.slug) {
        urls.push({
          loc: `${BASE_URL}/medicine/${medicine.slug}`,
          lastmod: CURRENT_DATE,
          changefreq: 'weekly',
          priority: '0.8',
        });
      }
    });
  }

  // Build XML content
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  urls.forEach((url) => {
    xml += '  <url>\n';
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>\n';

  // Ensure public directory exists
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // Write sitemap.xml
  const sitemapPath = path.join(publicDir, 'sitemap.xml');
  fs.writeFileSync(sitemapPath, xml, 'utf8');

  console.log(`Sitemap generated successfully at ${sitemapPath} with ${urls.length} links.`);
  process.exit(0);
}

generateSitemap();
