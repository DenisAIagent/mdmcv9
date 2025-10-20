import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
// Assurez-vous que le chemin vers le CSS est correct
import '../../assets/styles/services.css';
import '../../assets/styles/modal.css';

const Services = () => {
  const { t } = useTranslation();

  // Schema Services pour optimisation IA
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MDMC Music Ads",
    "description": "Agence marketing musical spécialisée YouTube Ads, Meta Ads et TikTok Ads pour artistes et labels",
    "url": "https://www.mdmcmusicads.com",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Services Marketing Musical",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "YouTube Ads Musical",
            "description": "Campagnes publicitaires YouTube optimisées pour artistes musicaux. Coût par vue 0,02€-0,05€, 50K-500K vues/mois.",
            "category": "Marketing Musical",
            "provider": {
              "@type": "Organization",
              "name": "MDMC Music Ads"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Meta Ads Musical",
            "description": "Publicités Facebook/Instagram pour artistes. +300% engagement, ROI 5:1, 10K-100K streams supplémentaires.",
            "category": "Marketing Musical",
            "provider": {
              "@type": "Organization",
              "name": "MDMC Music Ads"
            }
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "TikTok Ads Musical",
            "description": "Campagnes virales TikTok pour musiciens. +1M vues organiques post-campagne, budget min 1000€/mois.",
            "category": "Marketing Musical",
            "provider": {
              "@type": "Organization",
              "name": "MDMC Music Ads"
            }
          }
        }
      ]
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(servicesSchema)}
        </script>
      </Helmet>

      <section id="services" className="services" itemScope itemType="https://schema.org/Organization">
        <div className="container">
          <h2 className="section-title">{t('services.title')}</h2>

        <div className="services-grid">
          {/* Service Card 1: YouTube */}
          <div className="service-card" itemScope itemType="https://schema.org/Service">
            <div className="service-icon">
              {/* === Chemin CORRIGÉ === */}
              <img src="/assets/images/youtube-icon.svg" alt="YouTube Ads Icon" />
            </div>
            <h3 itemProp="name">{t('services.youtube.title')}</h3>
            <p itemProp="description">{t('services.youtube.description')}</p>
          </div>

          {/* Service Card 2: Meta */}
          <div className="service-card" itemScope itemType="https://schema.org/Service">
            <div className="service-icon">
              {/* === Chemin CORRIGÉ === */}
              <img src="/assets/images/meta-icon.svg" alt="Meta Ads Icon" />
            </div>
            <h3 itemProp="name">{t('services.meta.title')}</h3>
            <p itemProp="description">{t('services.meta.description')}</p>
          </div>

          {/* Service Card 3: TikTok */}
          <div className="service-card" itemScope itemType="https://schema.org/Service">
            <div className="service-icon">
              {/* === Chemin CORRIGÉ === */}
              <img src="/assets/images/tiktok-icon.svg" alt="TikTok Ads Icon" />
            </div>
            <h3 itemProp="name">{t('services.tiktok.title')}</h3>
            <p itemProp="description">{t('services.tiktok.description')}</p>
          </div>

        </div>
        </div>
      </section>
    </>
  );
};

export default Services;
