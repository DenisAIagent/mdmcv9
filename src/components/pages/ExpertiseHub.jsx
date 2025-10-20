import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Breadcrumb from '../common/Breadcrumb';
import '../../assets/styles/expertise-hub.css';

const ExpertiseHub = () => {
  const { t } = useTranslation();

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Expertise Marketing Musical', url: null }
  ];

  // Schema pour le Content Hub
  const expertiseSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Expertise Marketing Musical 2025 | Guides et Ressources | MDMC",
    "description": "Centre de ressources marketing musical : guides budgets, stratégies publicitaires, KPI, ROI. Expertise MDMC pour artistes et labels.",
    "url": "https://www.mdmcmusicads.com/expertise-marketing-musical",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Guides Marketing Musical",
      "description": "Collection de guides spécialisés en marketing musical digital",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Article",
            "name": "Guide Budget YouTube Ads Musical 2025",
            "description": "Méthode complète pour calculer votre budget YouTube Ads optimal selon votre genre et objectifs",
            "url": "https://www.mdmcmusicads.com/guide-budget-youtube-ads"
          }
        },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Article",
            "name": "ROI Marketing Musical : Méthodes de Calcul",
            "description": "Formules et KPI pour mesurer le retour sur investissement de vos campagnes musicales",
            "url": "https://www.mdmcmusicads.com/roi-marketing-musical"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Article",
            "name": "Comparatif Plateformes Streaming 2025",
            "description": "Analyse complète des performances publicitaires sur Spotify, Apple Music, Deezer",
            "url": "https://www.mdmcmusicads.com/comparatif-plateformes-streaming"
          }
        }
      ]
    },
    "about": [
      {
        "@type": "Thing",
        "name": "Marketing Musical",
        "sameAs": "https://fr.wikipedia.org/wiki/Marketing_musical"
      },
      {
        "@type": "Thing",
        "name": "Publicité Musicale",
        "description": "Promotion payante d'artistes et labels via plateformes digitales"
      }
    ],
    "author": {
      "@type": "Organization",
      "name": "MDMC Music Ads",
      "url": "https://www.mdmcmusicads.com"
    }
  };

  // Données des guides
  const guides = [
    {
      id: 'budget-youtube-ads',
      title: 'Guide Budget YouTube Ads Musical 2025',
      description: 'Méthode complète pour calculer votre budget YouTube Ads optimal selon votre genre musical et vos objectifs de vues.',
      url: '/guide-budget-youtube-ads',
      category: 'Budget & Stratégie',
      difficulty: 'Intermédiaire',
      readTime: '10 min',
      metrics: ['CPV 0,02€-0,05€', 'Budget min 500€', 'ROI 3:1'],
      featured: true,
      image: '/assets/images/guide-youtube-budget.webp'
    },
    {
      id: 'roi-marketing-musical',
      title: 'ROI Marketing Musical : Méthodes de Calcul',
      description: 'Formules et KPI essentiels pour mesurer précisément le retour sur investissement de vos campagnes publicitaires musicales.',
      url: '/roi-marketing-musical',
      category: 'Analytics & ROI',
      difficulty: 'Avancé',
      readTime: '15 min',
      metrics: ['Formules ROI', 'KPI clés', 'Tracking avancé'],
      featured: true,
      image: '/assets/images/guide-roi-musical.webp'
    },
    {
      id: 'comparatif-plateformes',
      title: 'Comparatif Plateformes Streaming 2025',
      description: 'Analyse détaillée des performances publicitaires sur Spotify, Apple Music, Deezer, YouTube Music et TikTok.',
      url: '/comparatif-plateformes-streaming',
      category: 'Plateformes',
      difficulty: 'Intermédiaire',
      readTime: '12 min',
      metrics: ['5 plateformes', 'CPM comparés', 'Audience data'],
      featured: false,
      image: '/assets/images/guide-plateformes.webp'
    },
    {
      id: 'kpi-marketing-musical',
      title: 'KPI Marketing Musical : Guide Complet',
      description: 'Les 20 indicateurs essentiels pour piloter efficacement vos campagnes publicitaires musicales et maximiser vos résultats.',
      url: '/kpi-marketing-musical',
      category: 'Analytics & ROI',
      difficulty: 'Débutant',
      readTime: '8 min',
      metrics: ['20 KPI', 'Tableaux de bord', 'Benchmarks'],
      featured: false,
      image: '/assets/images/guide-kpi.webp'
    },
    {
      id: 'targeting-audience-musicale',
      title: 'Ciblage Audience Musicale Avancé',
      description: 'Techniques expertes de ciblage publicitaire par genre musical, démographie et comportements d\'écoute.',
      url: '/targeting-audience-musicale',
      category: 'Ciblage',
      difficulty: 'Avancé',
      readTime: '18 min',
      metrics: ['15 techniques', 'Lookalike', 'Custom audiences'],
      featured: false,
      image: '/assets/images/guide-targeting.webp'
    },
    {
      id: 'creativites-ads-musicales',
      title: 'Créativités Ads Musicales qui Convertissent',
      description: 'Templates, formats et meilleures pratiques pour créer des publicités musicales engageantes qui génèrent des streams.',
      url: '/creativites-ads-musicales',
      category: 'Créatif',
      difficulty: 'Intermédiaire',
      readTime: '14 min',
      metrics: ['50+ templates', 'A/B testing', 'CTR +300%'],
      featured: false,
      image: '/assets/images/guide-creativites.webp'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Expertise Marketing Musical 2025 | Guides et Ressources | MDMC</title>
        <meta name="description" content="Centre de ressources marketing musical : guides budgets, stratégies publicitaires, KPI, ROI. Expertise MDMC pour artistes et labels." />
        <meta name="keywords" content="expertise marketing musical, guides youtube ads, stratégie publicitaire musicale, ROI musical, KPI artistes" />
        <link rel="canonical" href="https://www.mdmcmusicads.com/expertise-marketing-musical" />

        <script type="application/ld+json">
          {JSON.stringify(expertiseSchema)}
        </script>
      </Helmet>

      <div className="expertise-hub-page">
        <div className="container">
          <header className="hub-header">
            <Breadcrumb items={breadcrumbItems} />

            <div className="hero-section">
              <h1 className="hub-title">
                Expertise Marketing Musical
                <span className="year-badge">2025</span>
              </h1>

              <p className="hub-subtitle">
                Centre de ressources complet pour maîtriser le marketing musical digital.
                Guides experts, méthodes de calcul, stratégies éprouvées par MDMC Music Ads.
              </p>

              <div className="hub-stats">
                <div className="stat-item">
                  <div className="stat-number">6</div>
                  <div className="stat-label">Guides experts</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Artistes formés</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">50M€</div>
                  <div className="stat-label">Budget optimisé</div>
                </div>
              </div>
            </div>
          </header>

          <section className="expertise-areas">
            <h2>Domaines d'expertise</h2>
            <div className="areas-grid">
              <div className="area-card">
                <div className="area-icon">💰</div>
                <h3>Budget & Stratégie</h3>
                <p>Calcul optimal des budgets publicitaires selon vos objectifs et votre marché.</p>
                <div className="area-topics">
                  <span>CPV par genre</span>
                  <span>Allocation budget</span>
                  <span>Stratégie multi-plateformes</span>
                </div>
              </div>

              <div className="area-card">
                <div className="area-icon">📊</div>
                <h3>Analytics & ROI</h3>
                <p>Mesure de performance et optimisation du retour sur investissement musical.</p>
                <div className="area-topics">
                  <span>KPI essentiels</span>
                  <span>Calcul ROI</span>
                  <span>Tableaux de bord</span>
                </div>
              </div>

              <div className="area-card">
                <div className="area-icon">🎯</div>
                <h3>Ciblage Avancé</h3>
                <p>Techniques expertes de ciblage audience par comportements d'écoute.</p>
                <div className="area-topics">
                  <span>Custom audiences</span>
                  <span>Lookalike</span>
                  <span>Retargeting</span>
                </div>
              </div>

              <div className="area-card">
                <div className="area-icon">🎨</div>
                <h3>Créatif & Formats</h3>
                <p>Templates et bonnes pratiques pour créer des publicités qui convertissent.</p>
                <div className="area-topics">
                  <span>Formats optimaux</span>
                  <span>A/B testing</span>
                  <span>Hooks engageants</span>
                </div>
              </div>
            </div>
          </section>

          <section className="guides-featured">
            <h2>Guides vedettes</h2>
            <div className="featured-guides">
              {guides.filter(guide => guide.featured).map((guide) => (
                <article key={guide.id} className="guide-card featured">
                  <div className="guide-image">
                    <img src={guide.image} alt={guide.title} />
                    <div className="guide-badge">{guide.category}</div>
                  </div>
                  <div className="guide-content">
                    <div className="guide-meta">
                      <span className="difficulty">{guide.difficulty}</span>
                      <span className="read-time">{guide.readTime}</span>
                    </div>
                    <h3 className="guide-title">
                      <Link to={guide.url}>{guide.title}</Link>
                    </h3>
                    <p className="guide-description">{guide.description}</p>
                    <div className="guide-metrics">
                      {guide.metrics.map((metric, index) => (
                        <span key={index} className="metric-tag">{metric}</span>
                      ))}
                    </div>
                    <Link to={guide.url} className="guide-cta">
                      Lire le guide →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="all-guides">
            <h2>Tous nos guides</h2>
            <div className="guides-grid">
              {guides.map((guide) => (
                <article key={guide.id} className={`guide-card ${guide.featured ? 'featured-small' : ''}`}>
                  <div className="guide-header">
                    <div className="guide-category">{guide.category}</div>
                    <div className="guide-meta">
                      <span className="difficulty">{guide.difficulty}</span>
                      <span className="read-time">{guide.readTime}</span>
                    </div>
                  </div>
                  <h3 className="guide-title">
                    <Link to={guide.url}>{guide.title}</Link>
                  </h3>
                  <p className="guide-description">{guide.description}</p>
                  <div className="guide-metrics">
                    {guide.metrics.slice(0, 2).map((metric, index) => (
                      <span key={index} className="metric-tag">{metric}</span>
                    ))}
                  </div>
                  <Link to={guide.url} className="guide-link">
                    Lire →
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <section className="cta-section">
            <div className="cta-box">
              <h2>Besoin d'un accompagnement personnalisé ?</h2>
              <p>
                Nos experts MDMC Music Ads vous accompagnent dans l'application concrète
                de ces stratégies pour votre projet musical.
              </p>
              <div className="cta-buttons">
                <Link to="/contact" className="btn btn-primary">
                  Consultation gratuite
                </Link>
                <a
                  href="https://calendly.com/denis-mdmcmusicads/30min"
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Réserver un appel
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ExpertiseHub;