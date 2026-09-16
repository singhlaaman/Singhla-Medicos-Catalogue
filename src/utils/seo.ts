/**
 * SEO & Canonical Meta Tag Management Utility
 * Ensures Google Search Console and crawlers have authoritative canonical URLs,
 * preventing 'Duplicate without user-selected canonical' indexing issues.
 */

export const DOMAIN_BASE_URL = 'https://singhlamedicos.co.in';

export interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl: string;
  ogType?: 'website' | 'product' | 'article';
  ogImage?: string;
  noIndex?: boolean;
  jsonLd?: Record<string, unknown> | null;
}

/**
 * Returns the authoritative canonical URL for a medicine slug
 * Matching user requested format: https://singhlamedicos.co.in/#/medicine/:slug
 */
export function getMedicineCanonicalUrl(slug: string): string {
  const cleanSlug = encodeURIComponent(slug.trim().toLowerCase());
  return `${DOMAIN_BASE_URL}/#/medicine/${cleanSlug}`;
}

/**
 * Returns the authoritative canonical URL for an active drug salt slug
 */
export function getSaltCanonicalUrl(slug: string): string {
  const cleanSlug = encodeURIComponent(slug.trim().toLowerCase());
  return `${DOMAIN_BASE_URL}/#/salt/${cleanSlug}`;
}

/**
 * Returns the canonical URL for the salts library index
 */
export function getSaltsIndexCanonicalUrl(): string {
  return `${DOMAIN_BASE_URL}/#/salts`;
}

/**
 * Returns the authoritative canonical URL for the homepage
 */
export function getHomeCanonicalUrl(): string {
  return `${DOMAIN_BASE_URL}/`;
}

/**
 * Dynamically updates or inserts the <link rel="canonical"> tag in document.head
 */
export function setCanonicalUrl(url: string): void {
  if (typeof document === 'undefined') return;

  try {
    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.id = 'canonical-url';
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  } catch (err) {
    console.warn('Could not update canonical link:', err);
  }
}

/**
 * Helper to update or create a meta tag by name or property
 */
function setMetaTag(attrName: 'name' | 'property', attrValue: string, content: string): void {
  if (typeof document === 'undefined') return;
  try {
    let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
    if (!tag) {
      tag = document.createElement('meta');
      tag.setAttribute(attrName, attrValue);
      document.head.appendChild(tag);
    }
    tag.setAttribute('content', content);
  } catch (err) {
    console.warn(`Could not set meta tag ${attrValue}:`, err);
  }
}

/**
 * Updates full page SEO meta tags including canonical, Open Graph, and Structured Data
 */
export function updatePageSEO({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://singhlamedicos.co.in/logo.png',
  noIndex = false,
  jsonLd = null,
}: SEOProps): void {
  if (typeof document === 'undefined') return;

  // 1. Update Title
  if (title) {
    document.title = title;
    setMetaTag('property', 'og:title', title);
    setMetaTag('name', 'twitter:title', title);
  }

  // 2. Update Canonical Link in <head>
  setCanonicalUrl(canonicalUrl);
  setMetaTag('property', 'og:url', canonicalUrl);

  // 3. Update Description
  if (description) {
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:description', description);
    setMetaTag('name', 'twitter:description', description);
  }

  // 4. Open Graph & Twitter Cards
  setMetaTag('property', 'og:type', ogType);
  if (ogImage) {
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('name', 'twitter:image', ogImage);
  }
  setMetaTag('name', 'twitter:card', 'summary_large_image');

  // 5. Robots indexing
  setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

  // 6. JSON-LD Structured Data
  try {
    const existingScript = document.getElementById('seo-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'seo-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  } catch (err) {
    console.warn('Could not inject JSON-LD structured data:', err);
  }
}
