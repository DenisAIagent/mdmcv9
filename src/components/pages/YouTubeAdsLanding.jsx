import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../../assets/styles/youtube-ads-landing.css';

const YouTubeAdsLanding = () => {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    views: 0,
    campaigns: 0,
    roi: 0,
    artists: 0
  });

  const targetStats = {
    views: 250,
    campaigns: 150,
    roi: 400,
    artists: 80
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
        roi: Math.floor(targetStats.roi * progress),
        artists: Math.floor(targetStats.artists * progress)
      });

      if (frame === totalFrames) {
        clearInterval(counter);
        setStats(targetStats);
      }
    }, frameDuration);
  };

  const features = [
    {
      icon: "🎯",
      title: "Ciblage Précis",
      description: "Atteignez votre audience musicale idéale grâce aux données démographiques et comportementales avancées de YouTube"
    },
    {
      icon: "📊",
      title: "Analytics Avancés",
      description: "Suivez en temps réel les performances de vos campagnes avec des métriques détaillées et actionnables"
    },
    {
      icon: "🚀",
      title: "Optimisation Continue",
      description: "Nos algorithmes d'IA optimisent automatiquement vos campagnes pour maximiser votre ROI"
    },
    {
      icon: "🎵",
      title: "Expertise Musicale",
      description: "Une équipe spécialisée dans le marketing musical qui comprend les enjeux de votre industrie"
    }
  ];

  const benefits = [
    {
      number: "01",
      title: "Visibilité Maximale",
      description: "Positionnez votre musique devant millions d'auditeurs potentiels sur la plateforme de streaming la plus populaire au monde"
    },
    {
      number: "02",
      title: "ROI Optimisé",
      description: "Nos stratégies éprouvées garantissent un retour sur investissement supérieur à la moyenne du marché"
    },
    {
      number: "03",
      title: "Croissance Durable",
      description: "Construisez une fanbase fidèle et engagée qui soutiendra votre carrière musicale sur le long terme"
    }
  ];

  return (
    <>
      <Helmet>
        <title>YouTube Ads pour Artistes | MDMC - Boostez Votre Musique</title>
        <meta name="description" content="Propulsez votre carrière musicale avec nos campagnes YouTube Ads sur-mesure. ROI prouvé, ciblage précis, expertise musicale. Démarrez dès aujourd'hui !" />
        <meta property="og:title" content="YouTube Ads pour Artistes | MDMC - Boostez Votre Musique" />
        <meta property="og:description" content="Propulsez votre carrière musicale avec nos campagnes YouTube Ads sur-mesure. ROI prouvé, ciblage précis, expertise musicale." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://mdmcads.com/youtube-ads" />
      </Helmet>

      <Header />

      {/* Hero Section */}
      <section className="youtube-hero">
        <div className="youtube-hero-container">
          <div className="youtube-hero-content">
            <span className="youtube-hero-badge">
              #1 Agence YouTube Ads Musique
            </span>
            <h1 className="youtube-hero-title">
              Transformez vos <span className="gradient-text">vues YouTube</span> en succès musical
            </h1>
            <p className="youtube-hero-description">
              Découvrez comment nos campagnes YouTube Ads sur-mesure propulsent les carrières d'artistes indépendants vers de nouveaux sommets. Résultats garantis ou remboursé.
            </p>
            <div className="youtube-cta-container">
              <button className="youtube-btn-primary">
                Démarrer ma campagne
                <span className="btn-arrow">→</span>
              </button>
              <button className="youtube-btn-secondary">
                Voir nos résultats
              </button>
            </div>
            <div className="youtube-trust-indicators">
              <span>✓ 30 jours satisfait ou remboursé</span>
              <span>✓ Support 7j/7</span>
              <span>✓ ROI garanti</span>
            </div>
          </div>
          <div className="youtube-hero-visual">
            <div className="youtube-mockup">
              <div className="youtube-player">
                <div className="youtube-play-btn">▶</div>
                <div className="youtube-stats-overlay">
                  <div className="stat">
                    <span className="stat-number">2.5M</span>
                    <span className="stat-label">Vues</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">45K</span>
                    <span className="stat-label">J'aime</span>
                  </div>
                  <div className="stat">
                    <span className="stat-number">1.2K</span>
                    <span className="stat-label">Commentaires</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="youtube-stats" ref={statsRef}>
        <div className="youtube-stats-container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-number">{stats.views}M+</div>
              <div className="stat-label">Vues générées</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-number">{stats.campaigns}+</div>
              <div className="stat-label">Campagnes réussies</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">💰</div>
              <div className="stat-number">{stats.roi}%</div>
              <div className="stat-label">ROI moyen</div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🎤</div>
              <div className="stat-number">{stats.artists}+</div>
              <div className="stat-label">Artistes accompagnés</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="youtube-features">
        <div className="youtube-features-container">
          <div className="section-header">
            <h2>Pourquoi choisir nos services YouTube Ads ?</h2>
            <p>Une approche data-driven et une expertise musicale unique pour maximiser votre impact</p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="youtube-benefits">
        <div className="youtube-benefits-container">
          <div className="benefits-content">
            <div className="benefits-text">
              <h2>Propulsez votre carrière musicale</h2>
              <p>Nos stratégies YouTube Ads transforment votre passion en succès mesurable</p>
            </div>
            <div className="benefits-list">
              {benefits.map((benefit, index) => (
                <div key={index} className="benefit-item">
                  <div className="benefit-number">{benefit.number}</div>
                  <div className="benefit-content">
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="benefits-visual">
            <div className="growth-chart">
              <div className="chart-bars">
                <div className="bar" style={{height: '30%'}}></div>
                <div className="bar" style={{height: '50%'}}></div>
                <div className="bar" style={{height: '75%'}}></div>
                <div className="bar" style={{height: '100%'}}></div>
              </div>
              <div className="chart-labels">
                <span>Mois 1</span>
                <span>Mois 2</span>
                <span>Mois 3</span>
                <span>Mois 6</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="youtube-process">
        <div className="youtube-process-container">
          <div className="section-header">
            <h2>Notre processus en 4 étapes</h2>
            <p>Une méthodologie éprouvée pour garantir le succès de vos campagnes</p>
          </div>
          <div className="process-steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Analyse</h3>
                <p>Audit complet de votre présence YouTube et identification des opportunités</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Stratégie</h3>
                <p>Définition du ciblage optimal et création de campagnes personnalisées</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Lancement</h3>
                <p>Déploiement des campagnes avec monitoring en temps réel</p>
              </div>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Optimisation</h3>
                <p>Ajustements continus basés sur les performances pour maximiser le ROI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="youtube-cta">
        <div className="youtube-cta-container">
          <div className="cta-content">
            <h2>Prêt à faire exploser vos vues YouTube ?</h2>
            <p>Rejoignez les centaines d'artistes qui nous font confiance pour développer leur carrière musicale</p>
            <div className="cta-buttons">
              <button className="youtube-btn-primary large">
                Démarrer ma campagne YouTube Ads
                <span className="btn-arrow">→</span>
              </button>
              <div className="cta-note">
                <span>🎁 Consultation gratuite de 30 minutes incluse</span>
              </div>
            </div>
          </div>
          <div className="cta-guarantee">
            <div className="guarantee-badge">
              <span className="guarantee-icon">🛡️</span>
              <div className="guarantee-text">
                <strong>Garantie résultats</strong>
                <span>30 jours satisfait ou remboursé</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default YouTubeAdsLanding;