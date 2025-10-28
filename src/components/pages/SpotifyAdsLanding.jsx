import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import featurableService from '../../services/featurable.service';
import '../../assets/styles/spotify-ads-landing.css';
import '../../assets/styles/reviews.css';

const SpotifyAdsLanding = ({ openSimulator }) => {
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (openSimulator) {
      openSimulator(formData);
    }
  };

  // Services Spotify Ads spécifiques
  const services = [
    {
      title: "Campagnes Audio Ads",
      description: "Publicités audio entre les morceaux pour toucher les auditeurs Spotify gratuit"
    },
    {
      title: "Video Takeover",
      description: "Publicités vidéo full-screen pour maximum d'impact visuel"
    },
    {
      title: "Sponsored Playlists",
      description: "Intégration de tes morceaux dans des playlists sponsorisées"
    },
    {
      title: "Podcast Ads",
      description: "Placement publicitaire dans les podcasts populaires de ton genre"
    },
    {
      title: "Display Ads",
      description: "Bannières visuelles dans l'interface Spotify desktop et mobile"
    },
    {
      title: "Homepage Takeover",
      description: "Occupation premium de la page d'accueil Spotify"
    }
  ];

  // FAQ spécifique Spotify
  const faqItems = [
    {
      question: "Combien coûte une campagne Spotify Ads ?",
      answer: "Les budgets Spotify Ads commencent à partir de 250€. Nous recommandons un minimum de 500€ sur 30 jours pour optimiser les performances et toucher suffisamment d'auditeurs qualifiés."
    },
    {
      question: "Quelle est la différence entre Audio Ads et Video Ads ?",
      answer: "Les Audio Ads sont diffusées entre les morceaux sur Spotify gratuit (30 secondes max). Les Video Ads apparaissent en plein écran avec un impact visuel fort. Nous recommandons souvent de combiner les deux formats."
    },
    {
      question: "Peut-on cibler par genre musical sur Spotify ?",
      answer: "Oui, Spotify offre un ciblage très précis par genres musicaux, artistes similaires, et même comportements d'écoute. C'est l'une des forces principales de la plateforme pour les artistes."
    },
    {
      question: "Combien de temps pour voir les premiers résultats ?",
      answer: "Les premières données arrivent dès 24-48h. Les optimisations prennent effet après 7-10 jours. Nous recommandons 30 jours minimum pour une campagne complète et des résultats durables."
    },
    {
      question: "Les campagnes Spotify aident-elles le streaming organique ?",
      answer: "Absolument. Spotify Ads peut booster significativement vos streams organiques en introduisant votre musique à de nouveaux auditeurs qui deviennent ensuite des fans réguliers."
    }
  ];

  // Témoignages adaptés Spotify
  const getTestimonials = () => {
    if (reviews.length > 0) {
      return reviews.map(review => ({
        name: review.name || review.author_name,
        quote: review.text || review.comment,
        genre: review.platform || "Artiste indépendant",
        result: review.rating ? `${review.rating}/5 ⭐` : "5/5 ⭐",
        source: "Google",
        verified: true
      }));
    }

    return [
      {
        name: "Lucas M.",
        quote: "Spotify Ads a transformé ma carrière. En 2 mois, je suis passé de 500 à 15K streams mensuels. L'investissement s'est payé dès le premier mois.",
        genre: "Hip-Hop",
        result: "15K streams/mois",
        verified: true
      },
      {
        name: "Sarah K.",
        quote: "Leur ciblage par genre musical est impressionnant. Mes Audio Ads touchent exactement le bon public. ROI exceptionnel.",
        genre: "Pop/Électro",
        result: "340% ROI",
        verified: true
      },
      {
        name: "David R.",
        quote: "Enfin une agence qui comprend Spotify ! Mes campagnes Audio + Video ont boosté mes streams et mes followers Instagram.",
        genre: "Rock",
        result: "+2.8K followers",
        verified: true
      },
      {
        name: "Emma L.",
        quote: "Le suivi quotidien et les optimisations en temps réel font toute la différence. Mes morceaux sont maintenant dans des playlists organiques !",
        genre: "Indie Folk",
        result: "Playlists organiques",
        verified: true
      }
    ];
  };

  return (
    <>
      <Helmet>
        <title>Spotify Ads pour Artistes | Campagnes Audio & Video - MDMC</title>
        <meta name="description" content="Boostez vos streams avec nos campagnes Spotify Ads optimisées. Audio Ads, Video Takeover, Sponsored Playlists. Ciblage précis par genre musical. ROI garanti." />
        <meta name="keywords" content="spotify ads, publicité spotify, audio ads, campagne spotify, streaming, promotion musicale, artiste indépendant" />
      </Helmet>

      <Header />

      <div className="spotify-ads-page">
      {/* Hero Section Creative */}
      <section className="youtube-hero-creative">
        {/* Background Elements */}
        <div className="hero-background"></div>
        <div className="hero-grid-pattern"></div>

        {/* Floating Elements */}
        <div className="hero-floating-elements">
          <div className="floating-element play-button">▶</div>
          <div className="floating-element music-note">♪</div>
          <div className="floating-element soundwave"></div>
          <div className="floating-element spotify-logo">♫</div>
        </div>

        <div className="hero-container">
          <div className="hero-content-split">

            {/* Left: Main Content */}
            <div className="hero-left">
              <div className="hero-badge">
                <span className="badge-text">🎵 Campagnes Spotify Ads Premium</span>
              </div>

              <h1 className="hero-title-creative">
                <span className="title-line-1">Push. Play.</span>
                <span className="title-line-2">Stream Up.</span>
              </h1>

              <div className="hero-promise-creative">
                <p className="promise-main">Propulse tes morceaux</p>
                <p className="promise-sub">devant des millions d'auditeurs Spotify</p>
              </div>

              <div className="hero-cta-buttons">
                <button onClick={openSimulator} className="cta-primary-hero">
                  <span className="cta-icon">🎯</span>
                  Simuler ma campagne Spotify
                  <span className="cta-arrow">→</span>
                </button>
                <button className="cta-secondary-hero">
                  Exemples de résultats
                </button>
              </div>

              <div className="hero-trust-line">
                <div className="trust-item">
                  <span className="trust-icon">✓</span>
                  <span>Audio Ads optimisées</span>
                </div>
                <div className="trust-item">
                  <span className="trust-icon">✓</span>
                  <span>Ciblage par genre</span>
                </div>
                <div className="trust-item">
                  <span className="trust-icon">✓</span>
                  <span>ROI mesurable</span>
                </div>
              </div>
            </div>

            {/* Right: Lead Form */}
            <div className="hero-right">
              <div className="hero-form-creative">
                <div className="form-header">
                  <h3>Estime ton potentiel Spotify</h3>
                  <p>Gratuit • 30 secondes • Projection streams</p>
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
                    <label>Lien Spotify (optionnel)</label>
                    <input
                      type="url"
                      name="videoUrl"
                      placeholder="https://open.spotify.com/artist/..."
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
                    <span>Estimation streams personnalisée</span>
                  </div>
                  <div className="benefit-item">
                    <span>Projection followers Spotify</span>
                  </div>
                  <div className="benefit-item">
                    <span>Stratégie Audio + Video Ads</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom: Slogan */}
          <div className="hero-slogan">
            <span className="slogan-text">Push. Play. Stream Up.</span>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="value-proposition">
        <div className="container">
          <h2>Maximise tes streams sur Spotify</h2>
          <div className="value-grid">
            <div className="value-item">
              <h3>Audio Ads Optimisées</h3>
              <p>Publicités audio entre les morceaux pour toucher les auditeurs Spotify gratuit de ton genre</p>
            </div>
            <div className="value-item">
              <h3>Ciblage Musical Précis</h3>
              <p>Audiences qualifiées par genre, artistes similaires et habitudes d'écoute</p>
            </div>
            <div className="value-item">
              <h3>Streams Authentiques</h3>
              <p>Vrais auditeurs qui découvrent ta musique et deviennent des fans réguliers</p>
            </div>
          </div>

          <div className="strategy-types">
            <h3>Formats publicitaires adaptés</h3>
            <div className="strategy-list">
              <div className="strategy">Audio Ads</div>
              <div className="strategy">Video Takeover</div>
              <div className="strategy">Sponsored Playlists</div>
            </div>
          </div>

          <div className="simulator-cta">
            <button onClick={openSimulator} className="cta-primary">
              Simuler ma campagne Spotify
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
              <div className="stat-label">Streams générés</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.campaigns}+</div>
              <div className="stat-label">Campagnes Spotify</div>
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
          <h2>Comment ça marche sur Spotify</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Analyse musicale + stratégie Spotify</h3>
              <p>Étude approfondie de ton genre et définition du mix Audio Ads / Video Ads optimal</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Setup Spotify Ad Studio + créatives</h3>
              <p>Configuration compte publicitaire et création des créatives audio/video percutantes</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Lancement + optimisations quotidiennes</h3>
              <p>Pilotage en temps réel et ajustements pour maximiser streams et découvrabilité</p>
            </div>
          </div>
        </div>
      </section>

      {/* Results Showcase */}
      <section className="results-showcase">
        <div className="container">
          <h2>Résultats concrets de nos campagnes Spotify</h2>
          <h3 className="showcase-subtitle">Performance réelle d'une campagne Audio + Video Ads</h3>

          {/* Metrics Grid - Real Performance */}
          <div className="metrics-grid-top">
            <div className="metric-card views-card">
              <span className="metric-number">15,847</span>
              <span className="metric-label">Streams</span>
              <span className="metric-detail">En 30 jours</span>
            </div>
            <div className="metric-card reach-card">
              <span className="metric-number">8,234</span>
              <span className="metric-label">Auditeurs uniques</span>
              <span className="metric-detail">Découverte musicale</span>
            </div>
            <div className="metric-card engagement-card">
              <span className="metric-number">3,456</span>
              <span className="metric-label">Saves/Followers</span>
              <span className="metric-detail">Engagement authentique</span>
            </div>
            <div className="metric-card growth-card">
              <span className="metric-number">+287%</span>
              <span className="metric-label">Croissance</span>
              <span className="metric-detail">Streams mensuels</span>
            </div>
          </div>

          {/* Campaign Performance Summary */}
          <div className="campaign-summary-new">
            <div className="summary-content">
              <h4>Analyse de performance Spotify Ads</h4>
              <div className="summary-metrics">
                <div className="summary-item">
                  <span className="summary-label">Taux de completion Audio :</span>
                  <span className="summary-value">89% (vs 65% moyenne)</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">CTR Video Ads :</span>
                  <span className="summary-value">12.4% (vs 3% moyenne)</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Coût par stream :</span>
                  <span className="summary-value">€0.08 (optimisé)</span>
                </div>
                <div className="summary-item">
                  <span className="summary-label">Playlists organiques :</span>
                  <span className="summary-value">5 nouvelles inclusions</span>
                </div>
              </div>
            </div>

            <div className="summary-cta">
              <button onClick={openSimulator} className="cta-primary showcase-cta">
                Obtenir ces résultats pour ma musique
                <span className="cta-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Reviews */}
      <section className="social-proof">
        <div className="container">
          <h2>Ils nous font confiance</h2>
          <p className="section-subtitle">Témoignages authentiques de nos artistes sur Google My Business</p>

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
          <h2>Services Spotify Ads Music</h2>
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
              <h4>Podcast Advertising / Audio Branding</h4>
              <p>Placement publicitaire dans les podcasts populaires de ton genre</p>
            </div>
            <div className="service-item">
              <h4>Playlist Pitching / Découvrabilité organique</h4>
              <p>Optimisation pour maximiser tes chances d'intégrer des playlists organiques</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="trust-section">
        <div className="container">
          <div className="trust-grid">
            <div className="trust-item">
              <h3>Aucun achat de streams</h3>
              <p>100% écoutes authentiques via Spotify Ads</p>
            </div>
            <div className="trust-item">
              <h3>Pas de bots. Pas de faux auditeurs</h3>
              <p>Audiences réelles et engagement durable</p>
            </div>
            <div className="trust-item">
              <h3>Conformité Spotify</h3>
              <p>Respect total des guidelines et policies Spotify</p>
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
          <h2>Push. Play. Stream Up.</h2>
          <p>Propulse ta musique devant des millions d'auditeurs Spotify</p>
          <button onClick={openSimulator} className="cta-primary large">
            Simuler ma campagne Spotify
          </button>
          <div className="cta-secondary">
            <button className="cta-secondary-btn">
              Lancer ma promo Spotify
            </button>
          </div>
        </div>
      </section>
      </div>

      <Footer />
    </>
  );
};

export default SpotifyAdsLanding;