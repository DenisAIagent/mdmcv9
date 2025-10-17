import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

const SEOHead = ({
  title,
  description,
  keywords,
  image = '/og-image.webp',
  type = 'website'
}) => {
  const location = useLocation();

  // Détection de l'environnement pour canonical URL
  const getCanonicalUrl = () => {
    if (typeof window !== 'undefined') {
      // En production, utiliser le domaine principal
      if (window.location.hostname.includes('mdmcmusicads.com')) {
        return `https://www.mdmcmusicads.com${location.pathname}`;
      }
      // En développement ou Railway, utiliser l'URL actuelle
      return `${window.location.protocol}//${window.location.host}${location.pathname}`;
    }
    // Fallback SSR
    return `https://www.mdmcmusicads.com${location.pathname}`;
  };

  const canonicalUrl = getCanonicalUrl();

  const metaTitle = title || "Marketing Musical | YouTube & Meta Ads Artistes | MDMC";
  const metaDescription = description ||
    "Agence N°1 marketing musical : +500 artistes, +50M vues. YouTube Ads, Meta Ads, TikTok. Résultats garantis. Devis gratuit";
  const metaKeywords = keywords ||
    "marketing musical, youtube ads artistes, meta ads musiciens, tiktok ads, promotion musicale, agence marketing musical, mdmc";

  return (
    <Helmet>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content="https://www.mdmcmusicads.com" />
      <meta property="og:image" content={`https://www.mdmcmusicads.com${image}`} />
      <meta property="og:site_name" content="MDMC Music Ads" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={`https://www.mdmcmusicads.com${image}`} />

      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="google-site-verification" content="google9d08705fb9201b82" />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "MDMC Music Ads",
          "description": metaDescription,
          "url": "https://www.mdmcmusicads.com",
          "logo": "https://www.mdmcmusicads.com/assets/images/logo.webp",
          "image": `https://www.mdmcmusicads.com${image}`,
          "priceRange": "$",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "FR"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "50"
          },
          "sameAs": [
            "https://www.facebook.com/mdmcmusicads",
            "https://www.instagram.com/mdmcmusicads",
            "https://www.youtube.com/@mdmcmusicads"
          ]
        })}
      </script>
    </Helmet>
  );
};

export default SEOHead;