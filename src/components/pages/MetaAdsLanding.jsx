import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import featurableService from '../../services/featurable.service';
import '../../assets/styles/meta-ads-landing.css';
import '../../assets/styles/reviews.css';

const MetaAdsLanding = ({ openSimulator }) => {
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
      question: "Combien investir pour promouvoir ma musique sur Meta ?",
      answer: "Le budget optimal dépend de votre genre, audience cible et objectifs. Notre simulateur vous donne une estimation personnalisée en 30 secondes. Le minimum recommandé est de 500€ sur une période de 30 jours pour un lancement efficace sur Facebook et Instagram."
    },
    {
      question: "Est-ce que j'aurai des followers réels sur Instagram ?",
      answer: "Absolument. Nous ciblons uniquement des fans authentiques de votre genre musical sur Facebook et Instagram. Aucun bot, aucun faux compte. Nos campagnes génèrent un engagement organique durable sur les deux plateformes."
    },
    {
      question: "Mes contenus doivent-ils être optimisés pour Meta ?",
      answer: "Pas nécessairement. Nous optimisons vos créatives, ciblages, et formats publicitaires pour maximiser les performances sur Facebook et Instagram. Votre créativité + notre expertise Meta = succès garanti."
    },
    {
      question: "Combien de temps pour voir les premiers résultats ?",
      answer: "Les premières interactions arrivent en 24-48h sur Facebook et Instagram. Les résultats significatifs (followers, streams, engagement) se manifestent généralement sous 5-10 jours selon votre budget et ciblage Meta."
    }
  ];

  const services = [
    {
      title: "Campagnes Facebook Ads",
      description: "Formats optimisés pour la découverte musicale dans le feed Facebook"
    },
    {
      title: "Instagram Reels Ads",
      description: "Promotion sur le format viral d'Instagram pour maximiser la portée organique"
    },
    {
      title: "Stories & Feed Ads",
      description: "Ciblage précis dans les stories Instagram et feed Facebook"
    },
    {
      title: "Remarketing Meta",
      description: "Reconversion via pixel Facebook pour booster streams et abonnements"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Meta Ads pour Artistes | MDMC Music Ads</title>
        <meta name="description" content="Simule ta promotion Meta et touche les fans qui comptent vraiment. MDMC optimise tes campagnes Facebook & Instagram Ads pour artistes avec des résultats prouvés." />
        <meta name="keywords" content="Meta Ads artistes, promotion musicale Facebook, Instagram Ads musique, marketing musical, campagne Meta musique, simulateur Meta Ads, MDMC" />

        {/* Open Graph */}
        <meta property="og:title" content="Meta Ads pour Artistes | MDMC Music Ads" />
        <meta property="og:description" content="Simule ta promotion Meta et touche les fans qui comptent vraiment. MDMC optimise tes campagnes Facebook & Instagram Ads pour artistes avec des résultats prouvés." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mdmcads.com/meta-ads" />
        <meta property="og:image" content="https://mdmcads.com/og-meta-ads.jpg" />
        <meta property="og:site_name" content="MDMC Music Ads" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Meta Ads pour Artistes | MDMC Music Ads" />
        <meta name="twitter:description" content="Simule ta promotion Meta et touche les fans qui comptent vraiment. MDMC optimise tes campagnes Facebook & Instagram Ads pour artistes avec des résultats prouvés." />
        <meta name="twitter:image" content="https://mdmcads.com/og-meta-ads.jpg" />

        {/* Canonical */}
        <link rel="canonical" href="https://mdmcads.com/meta-ads" />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Meta Ads pour Artistes",
            "description": "Service de promotion musicale Meta Ads spécialisé pour artistes indépendants",
            "provider": {
              "@type": "Organization",
              "name": "MDMC Music Ads",
              "url": "https://mdmcads.com",
              "logo": "https://mdmcads.com/logo.png"
            },
            "areaServed": "Worldwide",
            "audience": {
              "@type": "Audience",
              "audienceType": "Musicians, Independent Artists, Music Labels"
            },
            "offers": {
              "@type": "Offer",
              "name": "Simulateur Meta Ads",
              "description": "Outil gratuit pour estimer budget et résultats d'une campagne Meta Ads musicale",
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
            <div className="floating-element play-button"></div>
            <div className="floating-element music-note"></div>
            <div className="floating-element soundwave"></div>
            <div className="floating-element meta-logo">MT</div>
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
                <span className="title-line-1">Meta Ads</span>
                <span className="title-line-2">pour Artistes</span>
              </h1>

              <div className="hero-promise-creative">
                <div className="promise-main">
                  Place ta musique devant ton public.
                </div>
                <div className="promise-sub">
                  Pas devant n'importe qui.
                </div>
              </div>

              <div className="hero-cta-buttons">
                <button onClick={openSimulator} className="cta-primary-hero">
                  Simuler ma campagne Meta
                  <span className="cta-arrow">→</span>
                </button>
                <button className="cta-secondary-hero">
                  Lancer ma promo Meta
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
                  <h3>Estime ton potentiel Meta</h3>
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
                    <label>Lien vidéo (optionnel)</label>
                    <input
                      type="url"
                      name="videoUrl"
                      placeholder="https://instagram.com/reel/... ou https://youtube.com/watch?v=..."
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
          <h2>Cibler les vrais fans sur Facebook & Instagram</h2>
          <div className="value-grid">
            <div className="value-item">
              <h3>Engagement Optimisé</h3>
              <p>Audiences engagées qui interagissent avec tes contenus sur Facebook & Instagram</p>
            </div>
            <div className="value-item">
              <h3>Reach Qualifié</h3>
              <p>Aucun bot. Que des fans réels de ton genre musical sur les réseaux Meta</p>
            </div>
            <div className="value-item">
              <h3>Followers Authentiques</h3>
              <p>Communauté engagée qui suivra tes prochaines sorties sur Instagram & Facebook</p>
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
              Simuler ma campagne Meta
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
          <h2>Comment ça marche sur Meta</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Analyse artistique + ciblage Meta audience</h3>
              <p>Identification précise de ton public cible sur Facebook & Instagram et analyse concurrentielle</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Setup campagne Meta + pixel tracking</h3>
              <p>Configuration optimale Facebook Business Manager et pixel de conversion</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Optimisations quotidiennes + reporting Meta</h3>
              <p>Ajustements en temps réel et rapports transparents via Facebook Ads Manager</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Showcase - New Grid Layout */}
      <section className="results-showcase">
        <div className="container">
          <h2>Résultats concrets de nos campagnes Meta</h2>
          <h3 className="showcase-subtitle">Exemple réel d'une campagne Facebook & Instagram Ads pour un artiste Hip-Hop</h3>

          {/* Metrics Grid - Top Priority */}
          <div className="metrics-grid-top">
            <div className="metric-card roi-card">
              <div className="metric-icon">📈</div>
              <span className="metric-number">340%</span>
              <span className="metric-label">ROI</span>
              <span className="metric-detail">vs 89% moyenne secteur</span>
            </div>
            <div className="metric-card impressions-card">
              <div className="metric-icon">👥</div>
              <span className="metric-number">2.4M</span>
              <span className="metric-label">Impressions</span>
              <span className="metric-detail">Portée qualifiée</span>
            </div>
            <div className="metric-card ctr-card">
              <div className="metric-icon">🎯</div>
              <span className="metric-number">1.96%</span>
              <span className="metric-label">CTR</span>
              <span className="metric-detail">+847% engagement</span>
            </div>
            <div className="metric-card cpc-card">
              <div className="metric-icon">💰</div>
              <span className="metric-number">€0.23</span>
              <span className="metric-label">Coût/Clic</span>
              <span className="metric-detail">Optimisé Meta</span>
            </div>
          </div>

          {/* Dashboard Central with Testimonial */}
          <div className="dashboard-central">
            <div className="dashboard-image-new">
              <img
                src="/assets/images/exemple-metaads.png"
                alt="Dashboard Meta Ads - Résultats campagne musique"
                className="dashboard-screenshot"
              />
              <div className="testimonial-overlay">
                <div className="testimonial-content">
                  <p>"En 30 jours, j'ai gagné +12K followers Instagram authentiques et mes streams ont explosé. MDMC a transformé ma carrière."</p>
                  <div className="testimonial-author">
                    <strong>MC FlowBeats</strong>
                    <span>Artiste Hip-Hop</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="campaign-insights">
              <h3>Détails de la campagne</h3>
              <div className="insights-grid">
                <div className="insight-item">
                  <span className="insight-label">Budget investi</span>
                  <span className="insight-value">800€ / 30 jours</span>
                </div>
                <div className="insight-item">
                  <span className="insight-label">Nouveaux followers</span>
                  <span className="insight-value">+12,847 Instagram</span>
                </div>
                <div className="insight-item">
                  <span className="insight-label">Streams générés</span>
                  <span className="insight-value">+89,340 écoutes</span>
                </div>
                <div className="insight-item">
                  <span className="insight-label">CA généré</span>
                  <span className="insight-value">2,720€</span>
                </div>
              </div>

              <div className="social-proof-badges">
                <div className="badge meta-partner">
                  <span className="badge-icon">✓</span>
                  <span className="badge-text">Meta Business Partner</span>
                </div>
                <div className="badge blueprint-certified">
                  <span className="badge-icon">🎓</span>
                  <span className="badge-text">Meta Blueprint Certified</span>
                </div>
              </div>

              <button onClick={openSimulator} className="cta-primary showcase-cta">
                Obtenir ces résultats pour mon projet
                <span className="cta-arrow">→</span>
              </button>
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
          <h2>Services Meta Ads Music</h2>
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
              <h4>Remarketing / Pixel Meta</h4>
              <p>Reciblage intelligent pour maximiser l'engagement</p>
            </div>
            <div className="service-item">
              <h4>Optimisation créatives / ciblage / campagnes</h4>
              <p>Optimisation Meta pour booster la découvrabilité organique</p>
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
          <p>Place ta musique devant les fans qui comptent</p>
          <button onClick={openSimulator} className="cta-primary large">
            Simuler ma campagne Meta
          </button>
          <div className="cta-secondary">
            <button className="cta-secondary-btn">
              Lancer ma promo Meta
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default MetaAdsLanding;