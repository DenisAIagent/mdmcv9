import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../../assets/styles/youtube-ads-landing.css';

const YouTubeAdsLanding = ({ openSimulator }) => {
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

  const targetStats = {
    views: 150,
    campaigns: 80,
    artists: 50
  };

  const statsRef = useRef(null);
  const hasAnimated = useRef(false);

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

  const testimonials = [
    {
      name: "Alex M.",
      genre: "Hip-Hop",
      quote: "15K vues organiques en 2 semaines. MDMC a ciblé exactement mon audience.",
      result: "+350% d'abonnés"
    },
    {
      name: "Luna S.",
      genre: "Pop",
      quote: "Mon clip a enfin trouvé son public. ROI à 400% dès le premier mois.",
      result: "2.3M vues"
    },
    {
      name: "The Neon",
      genre: "Électro",
      quote: "Fini les vues fantômes. Que des fans réels qui stream nos tracks.",
      result: "+180% streams"
    },
    {
      name: "Marcus J.",
      genre: "R&B",
      quote: "MDMC maîtrise YouTube Ads pour la musique. Résultats immédiats.",
      result: "25K abonnés"
    }
  ];

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
        <title>YouTube Ads pour Artistes | MDMC Music Ads</title>
        <meta name="description" content="Simule ta promotion YouTube et touche les fans qui comptent vraiment. MDMC optimise tes campagnes YouTube Ads pour artistes avec des résultats prouvés." />
        <meta name="keywords" content="YouTube Ads artistes, promotion musicale YouTube, marketing musical, campagne YouTube musique, simulateur YouTube Ads, MDMC" />

        {/* Open Graph */}
        <meta property="og:title" content="YouTube Ads pour Artistes | MDMC Music Ads" />
        <meta property="og:description" content="Simule ta promotion YouTube et touche les fans qui comptent vraiment. MDMC optimise tes campagnes YouTube Ads pour artistes avec des résultats prouvés." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mdmcads.com/youtube-ads" />
        <meta property="og:image" content="https://mdmcads.com/og-youtube-ads.jpg" />
        <meta property="og:site_name" content="MDMC Music Ads" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="YouTube Ads pour Artistes | MDMC Music Ads" />
        <meta name="twitter:description" content="Simule ta promotion YouTube et touche les fans qui comptent vraiment. MDMC optimise tes campagnes YouTube Ads pour artistes avec des résultats prouvés." />
        <meta name="twitter:image" content="https://mdmcads.com/og-youtube-ads.jpg" />

        {/* Canonical */}
        <link rel="canonical" href="https://mdmcads.com/youtube-ads" />

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
              "logo": "https://mdmcads.com/logo.png"
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

      {/* Hero Section */}
      <section className="youtube-hero">
        <div className="youtube-hero-container">
          <div className="youtube-hero-content">
            <h1>YouTube Ads pour Artistes</h1>
            <div className="hero-promise">
              Place ton clip devant ton public. Pas devant n'importe qui.
            </div>

            <div className="hero-form-container">
              <form onSubmit={handleSubmit} className="lead-form">
                <div className="form-row">
                  <input
                    type="text"
                    name="name"
                    placeholder="Ton nom d'artiste"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <input
                  type="url"
                  name="videoUrl"
                  placeholder="Lien de ton clip YouTube"
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  className="full-width"
                />
                <button type="submit" className="cta-primary">
                  Simuler ma campagne YouTube
                </button>
              </form>

              <div className="simulator-highlight">
                <div className="simulator-icon">⚡</div>
                <div className="simulator-text">
                  <strong>Estime ton budget, résultats et timeline en 30 secondes</strong>
                  <p>Gratuit • Rapide • Projection chiffrée • Recommandation stratégique</p>
                </div>
              </div>
            </div>

            <div className="reassurance">
              Optimisation experte YouTube Ads pour artistes
            </div>
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

      {/* Social Proof */}
      <section className="social-proof">
        <div className="container">
          <h2>Ils nous font confiance</h2>
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial">
                <div className="testimonial-content">
                  <p>"{testimonial.quote}"</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.name}</strong>
                    <span>{testimonial.genre}</span>
                  </div>
                  <div className="testimonial-result">
                    {testimonial.result}
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