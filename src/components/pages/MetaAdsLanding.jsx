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
      <section className="meta-hero-centered">
        <div className="meta-hero-background">
          <div className="meta-gradient-overlay"></div>
          <div className="meta-floating-icons">
            <div className="meta-icon facebook">f</div>
            <div className="meta-icon instagram">📷</div>
            <div className="meta-icon heart">❤️</div>
            <div className="meta-icon music">🎵</div>
          </div>
        </div>

        <div className="meta-hero-container">
          <div className="meta-hero-content">

            <div className="meta-badge">
              MDMC Music Ads
            </div>

            <h1 className="meta-hero-title">
              <span className="meta-title-main">Fais exploser</span>
              <span className="meta-title-sub">ta communauté</span>
              <span className="meta-platforms">sur Facebook & Instagram</span>
            </h1>

            <div className="meta-hero-description">
              <p>Transforme tes fans en communauté engagée. Nous plaçons ta musique devant les bonnes personnes sur les plateformes où elles passent le plus de temps.</p>
            </div>

            <div className="meta-cta-group">
              <button onClick={openSimulator} className="meta-cta-primary">
                <span className="cta-icon">📊</span>
                Simuler ma campagne Meta
              </button>
              <button className="meta-cta-secondary">
                Voir nos résultats
              </button>
            </div>

            <div className="meta-social-proof">
              <div className="proof-item">
                <span className="proof-number">2.8B+</span>
                <span className="proof-label">Utilisateurs Facebook</span>
              </div>
              <div className="proof-item">
                <span className="proof-number">2B+</span>
                <span className="proof-label">Utilisateurs Instagram</span>
              </div>
              <div className="proof-item">
                <span className="proof-number">98%</span>
                <span className="proof-label">Précision ciblage</span>
              </div>
            </div>

          </div>

          {/* Form en dessous sur Meta */}
          <div className="meta-form-section">
            <div className="meta-form-card">
              <div className="form-header-meta">
                <h3>🎯 Test gratuit - Potentiel Meta</h3>
                <p>Découvre combien ta musique peut toucher de fans</p>
              </div>

              <form onSubmit={handleSubmit} className="meta-form">
                <div className="meta-input-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nom d'artiste"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email professionnel"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <input
                  type="url"
                  name="videoUrl"
                  placeholder="Lien Instagram/Facebook (optionnel)"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  className="meta-input-full"
                />

                <button type="submit" className="meta-submit-btn">
                  🚀 Obtenir mon estimation Meta
                </button>
              </form>

              <div className="meta-form-trust">
                <span>✓ Gratuit</span>
                <span>✓ Sans engagement</span>
                <span>✓ Résultats en 30s</span>
              </div>
            </div>
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