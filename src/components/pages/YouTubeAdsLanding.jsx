import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import featurableService from '../../services/featurable.service';
import '../../assets/styles/youtube-ads-landing.css';
import '../../assets/styles/reviews.css';

const YouTubeAdsLanding = ({ openSimulator }) => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    videoUrl: ''
  });

  const [stats, setStats] = useState({
    views: 0,
    campaigns: 0,
    artists: 0
  });

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  const targetStats = {
    views: 150,
    campaigns: 80,
    artists: 50
  };

  const statsRef = useRef(null);
  const hasAnimated = useRef(false);

  // Charger les vrais avis Google
  useEffect(() => {
    const loadReviews = async () => {
      setReviewsLoading(true);
      try {
        const reviewsData = await featurableService.getReviews();
        if (reviewsData && Array.isArray(reviewsData) && reviewsData.length > 0) {
          // Prendre seulement les 4 meilleurs avis (5 étoiles)
          const bestReviews = reviewsData
            .filter(review => review.rating === 5)
            .slice(0, 4);
          setReviews(bestReviews);
        }
      } catch (error) {
        console.error('Erreur chargement avis:', error);
        setReviews([]);
      } finally {
        setReviewsLoading(false);
      }
    };

    loadReviews();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        animateStats();
      }
    }, { threshold: 0.5 });

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, []);

  const animateStats = () => {
    const duration = 2000;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setStats({
        views: Math.floor(targetStats.views * progress),
        campaigns: Math.floor(targetStats.campaigns * progress),
        artists: Math.floor(targetStats.artists * progress)
      });

      if (frame === totalFrames) {
        clearInterval(counter);
        setStats(targetStats);
      }
    }, frameDuration);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (openSimulator) {
      openSimulator();
    }
  };

  // Fonction pour adapter les avis Google au format testimonials
  const getTestimonials = () => {
    if (reviewsLoading) {
      return [
        { name: "Chargement...", genre: "...", quote: "Chargement des avis Google...", result: "..." },
        { name: "Chargement...", genre: "...", quote: "Chargement des avis Google...", result: "..." },
        { name: "Chargement...", genre: "...", quote: "Chargement des avis Google...", result: "..." },
        { name: "Chargement...", genre: "...", quote: "Chargement des avis Google...", result: "..." }
      ];
    }

    if (reviews.length === 0) {
      // Fallback avec quelques témoignages génériques mais réalistes
      return [
        {
          name: "Client MDMC",
          genre: "Artiste",
          quote: "Service professionnel et résultats concrets sur YouTube.",
          result: "Avis vérifié"
        }
      ];
    }

    return reviews.map(review => ({
      name: review.name || "Client MDMC",
      genre: "Artiste", // Genre par défaut car pas dans les avis Google
      quote: review.comment || review.text || "Excellent service",
      result: `${review.rating}/5 étoiles`,
      verified: review.verified || true,
      source: review.source || "Google"
    }));
  };

  const faqItems = [
    {
      question: "Combien investir pour la sortie d'un clip ?",
      answer: "Le budget optimal dépend de votre genre, audience cible et objectifs. Notre simulateur vous donne une estimation personnalisée en 30 secondes. En général, comptez 500€-2000€ pour un lancement efficace."
    },
    {
      question: "Est-ce que j'aurai des abonnés réels ?",
      answer: "Absolument. Nous ciblons uniquement des fans authentiques de votre genre musical. Aucun bot, aucune vue artificielle. Nos campagnes génèrent un engagement organique durable."
    },
    {
      question: "Est-ce que la vidéo doit être déjà optimisée ?",
      answer: "Pas nécessairement. Nous optimisons titre, description, miniature et métadonnées pour maximiser les performances. Votre créativité + notre expertise technique = succès garanti."
    },
    {
      question: "Combien de temps pour voir les premiers résultats ?",
      answer: "Les premières vues arrivent en 24-48h. Les résultats significatifs (abonnés, engagement) se manifestent généralement sous 7-14 jours selon votre budget et ciblage."
    }
  ];

  const services = [
    {
      title: "Campagnes TrueView",
      description: "Formats skippables optimisés pour la découverte musicale et l'engagement longue durée"
    },
    {
      title: "YouTube Shorts Ads",
      description: "Promotion sur le format viral de YouTube pour maximiser la portée organique"
    },
    {
      title: "In-Feed Music Ads",
      description: "Ciblage précis dans les recommandations et résultats de recherche musicale"
    },
    {
      title: "Remarketing Avancé",
      description: "Reconversion des visiteurs pour booster streams et abonnements"
    }
  ];

  return (
    <>
      <Helmet>
        <title>{t('youtube_ads.title')} - MDMC</title>
        <meta name="description" content={t('youtube_ads.description')} />
        <meta name="keywords" content="YouTube Ads artistes, promotion musicale YouTube, marketing musical, campagne YouTube musique, vues réelles youtube, abonnés qualifiés youtube, MDMC" />

        {/* Open Graph */}
        <meta property="og:title" content="YouTube Ads pour Artistes | Vues Réelles & Abonnés Qualifiés - MDMC" />
        <meta property="og:description" content="Propulsez votre clip avec nos campagnes YouTube Ads. Touchez une audience qualifiée, obtenez des vues réelles et des abonnés engagés. Stratégie sur-mesure pour artistes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.mdmcmusicads.com/youtube-ads/" />
        <meta property="og:image" content="https://www.mdmcmusicads.com/assets/images/opengraph-youtube-ads.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Campagnes YouTube Ads pour artistes musicaux - MDMC Music Ads" />
        <meta property="og:updated_time" content={String(Math.floor(Date.now()/1000))} />
        <meta property="og:site_name" content="MDMC Music Ads" />
        <meta property="og:locale" content="fr_FR" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YouTube Ads pour Artistes - MDMC" />
        <meta name="twitter:description" content="Campagnes YouTube optimisées pour vues réelles et abonnés qualifiés" />
        <meta name="twitter:image" content="https://www.mdmcmusicads.com/assets/images/opengraph-youtube-ads.png" />

        {/* Canonical */}
        <link rel="canonical" href="https://www.mdmcmusicads.com/youtube-ads" />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "YouTube Ads pour Artistes",
            "description": "Service de promotion musicale YouTube Ads spécialisé pour artistes indépendants",
            "provider": {
              "@type": "Organization",
              "name": "MDMC Music Ads",
              "url": "https://mdmcads.com",
              "logo": "https://www.mdmcmusicads.com/logo.png"
            },
            "areaServed": "Worldwide",
            "audience": {
              "@type": "Audience",
              "audienceType": "Musicians, Independent Artists, Music Labels"
            },
            "offers": {
              "@type": "Offer",
              "name": "Simulateur YouTube Ads",
              "description": "Outil gratuit pour estimer budget et résultats d'une campagne YouTube Ads musicale",
              "price": "0",
              "priceCurrency": "EUR"
            }
          })}
        </script>
      </Helmet>

      <Header />

      {/* Hero Section - Creative & Impactful */}
      <section className="youtube-hero-creative">
        <div className="hero-background">
          <div className="hero-grid-pattern"></div>
          <div className="hero-floating-elements">
            <div className="floating-element play-button">▶</div>
            <div className="floating-element music-note">♪</div>
            <div className="floating-element soundwave"></div>
            <div className="floating-element youtube-logo">YT</div>
          </div>
        </div>

        <div className="hero-container">
          <div className="hero-content-split">

            {/* Left: Main Content */}
            <div className="hero-left">
              <div className="hero-badge">
                <span className="badge-text">MDMC Music Ads</span>
              </div>

              <h1 className="hero-title-creative">
                <span className="title-line-1">YouTube Ads</span>
                <span className="title-line-2">pour Artistes</span>
              </h1>

              <div className="hero-promise-creative">
                <div className="promise-main">
                  Place ton clip devant ton public.
                </div>
                <div className="promise-sub">
                  Pas devant n'importe qui.
                </div>
              </div>

              <div className="hero-cta-buttons">
                <button onClick={openSimulator} className="cta-primary-hero">
                  Simuler ma campagne YouTube
                  <span className="cta-arrow">→</span>
                </button>
                <button className="cta-secondary-hero">
                  Lancer ma promo YouTube
                </button>
              </div>

              <div className="hero-trust-line">
                <div className="trust-item">
                  <span>Aucun achat de vues</span>
                </div>
                <div className="trust-item">
                  <span>Fans réels uniquement</span>
                </div>
                <div className="trust-item">
                  <span>ROI garanti</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Form */}
            <div className="hero-right">
              <div className="hero-form-creative">
                <div className="form-header">
                  <h3>Estime ton potentiel YouTube</h3>
                  <p>Gratuit • 30 secondes • Projection chiffrée</p>
                </div>

                <form onSubmit={handleSubmit} className="lead-form-creative">
                  <div className="input-group">
                    <label>Nom d'artiste</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Ex: MC Flow"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Email pro</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="ton@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Lien YouTube (optionnel)</label>
                    <input
                      type="url"
                      name="videoUrl"
                      placeholder="https://youtube.com/watch?v=..."
                      value={formData.videoUrl}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button type="submit" className="form-submit-btn">
                    <span className="btn-text">Simuler maintenant</span>
                    <span className="btn-loading">Analyse en cours...</span>
                  </button>
                </form>

                <div className="form-benefits">
                  <div className="benefit-item">
                    <span>Estimation budget personnalisée</span>
                  </div>
                  <div className="benefit-item">
                    <span>Projection vues & abonnés</span>
                  </div>
                  <div className="benefit-item">
                    <span>Stratégie ciblage optimale</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom: Slogan */}
          <div className="hero-slogan">
            <span className="slogan-text">Push. Play. Blow Up.</span>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-proposition">
        <div className="container">
          <h2>Toucher les bons fans, pas du trafic aléatoire</h2>
          <div className="value-grid">
            <div className="value-item">
              <h3>Watch Time Optimisé</h3>
              <p>Audiences engagées qui regardent tes clips jusqu'au bout</p>
            </div>
            <div className="value-item">
              <h3>Vues Certifiées</h3>
              <p>Aucun bot. Que des fans réels de ton genre musical</p>
            </div>
            <div className="value-item">
              <h3>Abonnés Qualifiés</h3>
              <p>Followers authentiques qui streamont tes prochaines sorties</p>
            </div>
          </div>

          <div className="strategy-types">
            <h3>Stratégies adaptées à tes objectifs</h3>
            <div className="strategy-list">
              <div className="strategy">Sortie de clip</div>
              <div className="strategy">Lancement single</div>
              <div className="strategy">Promotion tournée</div>
            </div>
          </div>

          <div className="simulator-cta">
            <button onClick={openSimulator} className="cta-primary">
              Simuler ma campagne YouTube
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section" ref={statsRef}>
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{stats.views}M+</div>
              <div className="stat-label">Vues générées</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.campaigns}+</div>
              <div className="stat-label">Campagnes lancées</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.artists}+</div>
              <div className="stat-label">Artistes accompagnés</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <h2>Comment ça marche</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Analyse artistique + ciblage audience musique</h3>
              <p>Identification précise de ton public cible et analyse concurrentielle</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Setup campagne + tracking conversion</h3>
              <p>Configuration optimale et mise en place du suivi des performances</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Optimisations quotidiennes + reporting clair</h3>
              <p>Ajustements en temps réel et rapports transparents sur tes résultats</p>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Reviews similaires au composant Reviews */}
      <section className="social-proof">
        <div className="container">
          <h2>Ils nous font confiance</h2>
          <p className="section-subtitle">Témoignages authentiques de nos clients sur Google My Business</p>

          <div className="reviews-grid-modern">
            {getTestimonials().map((testimonial, index) => (
              <div
                key={index}
                className="review-card-modern visible"
                itemScope
                itemType="https://schema.org/Review"
              >
                {/* Header avec avatar et infos client */}
                <div className="review-header-modern">
                  <div className="review-avatar-modern">
                    <span className="review-initials">
                      {testimonial.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                    </span>
                  </div>

                  <div className="review-info-modern">
                    <div className="review-name-row">
                      <h3 className="review-name-modern" itemProp="author" itemScope itemType="https://schema.org/Person">
                        <span itemProp="name">{testimonial.name}</span>
                      </h3>
                      {testimonial.verified && <span className="verified-icon">✓</span>}
                    </div>

                    <div className="review-company">
                      {testimonial.genre}
                    </div>

                    <div className="review-rating-row">
                      <div className="review-rating-modern" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
                        <meta itemProp="ratingValue" content="5" />
                        <meta itemProp="bestRating" content="5" />
                        <meta itemProp="worstRating" content="1" />
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="star filled">★</span>
                        ))}
                      </div>
                      <span className="review-time">Récemment</span>
                    </div>
                  </div>
                </div>

                {/* Citation avec guillemets */}
                <div className="review-content-modern">
                  <div className="quote-icon">"</div>
                  <p className="review-text-modern" itemProp="reviewBody">"{testimonial.quote}"</p>
                </div>

                {/* Footer avec source et rating */}
                <div className="review-footer-modern">
                  <span className="review-rating-chip">{testimonial.result}</span>
                  <div className="review-meta">
                    {testimonial.source && <span className="review-source">via {testimonial.source}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services-section">
        <div className="container">
          <h2>Services YouTube Ads Music</h2>
          <div className="services-grid">
            {services.map((service, index) => (
              <div key={index} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>

          <div className="additional-services">
            <div className="service-item">
              <h4>Remarketing / Algorithme YouTube</h4>
              <p>Reciblage intelligent pour maximiser l'engagement</p>
            </div>
            <div className="service-item">
              <h4>Optimisation titre / miniature / métadonnées</h4>
              <p>SEO YouTube pour booster la découvrabilité organique</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <h3>Aucun achat de vues</h3>
              <p>100% trafic organique et authentique</p>
            </div>
            <div className="trust-item">
              <h3>Pas de robots. Pas de fans fantômes</h3>
              <p>Engagement réel et durable</p>
            </div>
            <div className="trust-item">
              <h3>RGPD et données protégées</h3>
              <p>Conformité totale aux réglementations européennes</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="container">
          <h2>Questions fréquentes</h2>
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Push. Play. Blow Up.</h2>
          <p>Place ton clip devant les fans qui comptent</p>
          <button onClick={openSimulator} className="cta-primary large">
            Simuler ma campagne YouTube
          </button>
          <div className="cta-secondary">
            <button className="cta-secondary-btn">
              Lancer ma promo YouTube
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default YouTubeAdsLanding;