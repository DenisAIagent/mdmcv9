import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../common/Breadcrumb';
import '../../assets/styles/guide.css';

const ROIGuide = () => {
  const { t } = useTranslation();

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Guides Marketing Musical', url: '/guides' },
    { name: 'ROI Marketing Musical', url: null }
  ];

  // Schema HowTo pour optimisation IA
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment calculer le ROI de ses campagnes marketing musical",
    "description": "Guide expert pour mesurer précisément le retour sur investissement de vos campagnes publicitaires musicales et optimiser vos performances.",
    "image": "https://www.mdmcmusicads.com/assets/images/roi-marketing-guide.webp",
    "totalTime": "PT20M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "EUR",
      "value": "0"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Données de campagnes publicitaires"
      },
      {
        "@type": "HowToSupply",
        "name": "Analytics streaming (Spotify, Apple Music)"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Définir les métriques de revenus musicaux",
        "text": "Identifiez vos sources de revenus : Streaming (0,003€/stream Spotify), Ventes digitales (0,70€/track), Concerts (tickets), Merchandising, Sync/licensing. Revenue musical moyen : 0,005€ par stream toutes plateformes confondues.",
        "image": "https://www.mdmcmusicads.com/assets/images/step1-roi-revenue.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Tracker les conversions publicitaires",
        "text": "Utilisez UTM tracking, Pixel Facebook, Google Analytics. Mesures clés : Clics vers streaming (+15% conversion), Ajouts playlist (+8% réécoute), Follows artiste (+12% fidélisation). Attribution window : 7 jours post-clic, 1 jour post-vue.",
        "image": "https://www.mdmcmusicads.com/assets/images/step2-roi-tracking.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Calculer la LTV (Lifetime Value) d'un fan",
        "text": "LTV Fan = Revenue annuel par fan × Durée de vie fan. Benchmarks : Fan occasionnel (2€/an), Fan engagé (12€/an), Super fan (45€/an). Durée de vie moyenne : 3-7 ans selon le genre musical.",
        "image": "https://www.mdmcmusicads.com/assets/images/step3-roi-ltv.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Appliquer les formules ROI musical",
        "text": "ROI Simple = (Revenus générés - Coût campagne) ÷ Coût campagne × 100. ROI LTV = (LTV × Nouveaux fans - Coût) ÷ Coût × 100. ROI Blend = ROI immédiat (30%) + ROI long terme (70%).",
        "image": "https://www.mdmcmusicads.com/assets/images/step4-roi-formulas.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Optimiser selon les données ROI",
        "text": "ROI >300% : Scalez le budget (+100%). ROI 150-300% : Optimisez créatifs. ROI 50-150% : Testez nouvelles audiences. ROI <50% : Pausez et analysez. Réallouez budget vers campagnes ROI >200%.",
        "image": "https://www.mdmcmusicads.com/assets/images/step5-roi-optimization.webp"
      }
    ],
    "result": {
      "@type": "HowToSupply",
      "name": "Système de mesure ROI musical précis et actionnable"
    }
  };

  // Schema Article pour le contenu
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "ROI Marketing Musical 2025 : Formules et Méthodes de Calcul",
    "description": "Guide complet pour mesurer et optimiser le retour sur investissement de vos campagnes publicitaires musicales avec formules précises et benchmarks sectoriels.",
    "author": {
      "@type": "Organization",
      "name": "MDMC Music Ads",
      "url": "https://www.mdmcmusicads.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "MDMC Music Ads",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.mdmcmusicads.com/assets/images/logo.webp"
      }
    },
    "datePublished": "2025-01-15",
    "dateModified": "2025-01-15",
    "mainEntityOfPage": "https://www.mdmcmusicads.com/roi-marketing-musical",
    "image": "https://www.mdmcmusicads.com/assets/images/roi-marketing-guide.webp",
    "about": [
      {
        "@type": "Thing",
        "name": "ROI Marketing",
        "sameAs": "https://fr.wikipedia.org/wiki/Retour_sur_investissement"
      },
      {
        "@type": "Thing",
        "name": "Analytics Musical",
        "description": "Mesure de performance des campagnes marketing musical"
      }
    ],
    "keywords": "ROI marketing musical, retour investissement musique, analytics artiste, LTV fan, revenue streaming, conversion musical"
  };

  return (
    <>
      <Helmet>
        <title>ROI Marketing Musical 2025 : Formules et Méthodes | MDMC</title>
        <meta name="description" content="Guide complet pour mesurer le ROI de vos campagnes musicales. Formules précises, LTV fan, conversion tracking. Expertise MDMC 2025." />
        <meta name="keywords" content="ROI marketing musical, retour investissement musique, analytics artiste, LTV fan, revenue streaming" />
        <link rel="canonical" href="https://www.mdmcmusicads.com/roi-marketing-musical" />

        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <div className="guide-page" itemScope itemType="https://schema.org/HowTo">
        <div className="container">
          <header className="guide-header">
            <Breadcrumb items={breadcrumbItems} />

            <h1 itemProp="name">ROI Marketing Musical 2025 : Formules et Méthodes de Calcul</h1>

            <div className="guide-meta">
              <span className="duration">⏱️ Lecture : 20 minutes</span>
              <span className="difficulty">📊 Niveau : Avancé</span>
              <span className="updated">🔄 Mis à jour : Janvier 2025</span>
            </div>

            <div className="key-takeaway">
              <h2>🎯 Points clés à retenir</h2>
              <ul>
                <li><strong>ROI cible :</strong> 300% minimum pour campagnes streaming optimisées</li>
                <li><strong>LTV Fan moyen :</strong> 12€/an pour fan engagé sur 5 ans = 60€ LTV</li>
                <li><strong>Revenue par stream :</strong> 0,005€ moyenne toutes plateformes</li>
                <li><strong>Conversion benchmark :</strong> 15% clic vers stream, 8% ajout playlist</li>
              </ul>
            </div>
          </header>

          <article className="guide-content" itemProp="description">
            <section className="definition-section">
              <h2>Qu'est-ce que le ROI marketing musical ?</h2>
              <div className="definition-box">
                <p><strong>Définition :</strong> Le ROI (Return On Investment) marketing musical mesure la rentabilité de vos investissements publicitaires en comparant les revenus générés (streams, ventes, concerts) aux coûts de campagne, avec une approche long terme intégrant la valeur vie d'un fan (LTV).</p>
              </div>
            </section>

            <section className="benchmarks-section">
              <h2>📊 Benchmarks ROI Musical 2025</h2>
              <div className="benchmarks-grid">
                <div className="benchmark-card">
                  <h3>ROI par Type de Campagne</h3>
                  <ul>
                    <li>Streaming/Discovery : <strong>200% - 500%</strong></li>
                    <li>Engagement/Fanbase : <strong>300% - 800%</strong></li>
                    <li>Concert/Tickets : <strong>400% - 1200%</strong></li>
                    <li>Merchandising : <strong>150% - 400%</strong></li>
                  </ul>
                </div>
                <div className="benchmark-card">
                  <h3>Revenue par Source</h3>
                  <ul>
                    <li>Spotify : <strong>0,003€ - 0,005€/stream</strong></li>
                    <li>Apple Music : <strong>0,007€ - 0,009€/stream</strong></li>
                    <li>YouTube Music : <strong>0,001€ - 0,002€/stream</strong></li>
                    <li>Vente digitale : <strong>0,70€/track</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="revenue-sources">
              <h2>💰 Sources de Revenus Musicaux à Tracker</h2>
              <div className="revenue-grid">
                <div className="revenue-card">
                  <h3>🎵 Streaming Digital</h3>
                  <div className="revenue-details">
                    <p><strong>Revenue moyen :</strong> 0,005€/stream</p>
                    <ul>
                      <li>Spotify Premium : 0,004€/stream</li>
                      <li>Apple Music : 0,008€/stream</li>
                      <li>Deezer : 0,006€/stream</li>
                      <li>YouTube Music : 0,0015€/stream</li>
                    </ul>
                  </div>
                </div>

                <div className="revenue-card">
                  <h3>🎤 Concerts & Live</h3>
                  <div className="revenue-details">
                    <p><strong>Marge nette :</strong> 30-60% du prix ticket</p>
                    <ul>
                      <li>Petit venue (100 places) : 15€-30€/ticket</li>
                      <li>Club (500 places) : 25€-50€/ticket</li>
                      <li>Salle (2000 places) : 40€-80€/ticket</li>
                      <li>Festival : 5€-15€ par fan acquis</li>
                    </ul>
                  </div>
                </div>

                <div className="revenue-card">
                  <h3>🛍️ Merchandising</h3>
                  <div className="revenue-details">
                    <p><strong>Marge moyenne :</strong> 40-70%</p>
                    <ul>
                      <li>T-shirt : 8€-15€ marge/vente</li>
                      <li>Vinyle : 10€-20€ marge/vente</li>
                      <li>CD : 5€-12€ marge/vente</li>
                      <li>Accessoires : 3€-25€ marge/vente</li>
                    </ul>
                  </div>
                </div>

                <div className="revenue-card">
                  <h3>📺 Sync & Licensing</h3>
                  <div className="revenue-details">
                    <p><strong>Revenue variable :</strong> 500€-50000€</p>
                    <ul>
                      <li>Pub TV nationale : 5000€-25000€</li>
                      <li>Film/Série : 1000€-15000€</li>
                      <li>Jeu vidéo : 2000€-10000€</li>
                      <li>Streaming video : 500€-5000€</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section className="steps-section">
              <h2>🔧 Méthode de calcul ROI étape par étape</h2>

              <div className="step" itemScope itemType="https://schema.org/HowToStep" itemProp="step">
                <h3 itemProp="name">1. Configurer le tracking des conversions</h3>
                <div className="step-content" itemProp="text">
                  <p>Mise en place des outils de mesure essentiels :</p>
                  <div className="tracking-setup">
                    <h4>🔗 UTM Tracking</h4>
                    <p>Structure UTM pour campagnes musicales :</p>
                    <code>
                      ?utm_source=facebook&utm_medium=cpc&utm_campaign=nouveaualbum2025&utm_content=video1&utm_term=spotify
                    </code>

                    <h4>📊 Pixels de Conversion</h4>
                    <ul>
                      <li><strong>Facebook Pixel :</strong> Tracking clics vers streaming</li>
                      <li><strong>Google Analytics :</strong> Parcours utilisateur complet</li>
                      <li><strong>Spotify for Artists :</strong> Source traffic et conversions</li>
                      <li><strong>Custom Events :</strong> Play, Add to Playlist, Follow</li>
                    </ul>
                  </div>
                  <div className="tip-box">
                    <p><strong>💡 Attribution Window :</strong> 7 jours post-clic, 1 jour post-vue pour capture optimale des conversions.</p>
                  </div>
                </div>
              </div>

              <div className="step" itemScope itemType="https://schema.org/HowToStep" itemProp="step">
                <h3 itemProp="name">2. Calculer la LTV (Lifetime Value) d'un fan</h3>
                <div className="step-content" itemProp="text">
                  <p>La LTV est cruciale pour mesurer la valeur long terme :</p>

                  <div className="ltv-calculator">
                    <h4>📈 Formule LTV Fan</h4>
                    <div className="formula-box">
                      <p className="formula">
                        <strong>LTV = Revenue Annuel par Fan × Durée de Vie Fan × Taux de Rétention</strong>
                      </p>
                    </div>

                    <div className="fan-segments">
                      <div className="fan-segment">
                        <h5>🎧 Fan Occasionnel</h5>
                        <ul>
                          <li>Revenue annuel : 2€ (20 streams/mois)</li>
                          <li>Durée de vie : 2 ans</li>
                          <li>Rétention : 60%</li>
                          <li><strong>LTV = 2,4€</strong></li>
                        </ul>
                      </div>

                      <div className="fan-segment">
                        <h5>❤️ Fan Engagé</h5>
                        <ul>
                          <li>Revenue annuel : 12€ (100 streams/mois + merch)</li>
                          <li>Durée de vie : 5 ans</li>
                          <li>Rétention : 80%</li>
                          <li><strong>LTV = 48€</strong></li>
                        </ul>
                      </div>

                      <div className="fan-segment">
                        <h5>🔥 Super Fan</h5>
                        <ul>
                          <li>Revenue annuel : 45€ (streaming + concerts + merch)</li>
                          <li>Durée de vie : 7 ans</li>
                          <li>Rétention : 90%</li>
                          <li><strong>LTV = 283€</strong></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="step" itemScope itemType="https://schema.org/HowToStep" itemProp="step">
                <h3 itemProp="name">3. Appliquer les formules ROI musical</h3>
                <div className="step-content" itemProp="text">
                  <p>Trois méthodes de calcul selon vos objectifs :</p>

                  <div className="roi-formulas">
                    <div className="formula-card">
                      <h4>🔢 ROI Simple (Court terme)</h4>
                      <div className="formula-box">
                        <p className="formula">
                          <strong>ROI = (Revenus Générés - Coût Campagne) ÷ Coût Campagne × 100</strong>
                        </p>
                      </div>
                      <p><em>Idéal pour : Campagnes streaming, lancement single</em></p>
                      <div className="example-calculation">
                        <p><strong>Exemple :</strong> Campagne 2000€ → 150000 streams → Revenue 750€</p>
                        <p>ROI = (750€ - 2000€) ÷ 2000€ × 100 = <strong>-62%</strong> (perte court terme)</p>
                      </div>
                    </div>

                    <div className="formula-card">
                      <h4>📈 ROI LTV (Long terme)</h4>
                      <div className="formula-box">
                        <p className="formula">
                          <strong>ROI LTV = (LTV × Nouveaux Fans - Coût) ÷ Coût × 100</strong>
                        </p>
                      </div>
                      <p><em>Idéal pour : Construction fanbase, stratégie long terme</em></p>
                      <div className="example-calculation">
                        <p><strong>Exemple :</strong> Campagne 2000€ → 100 nouveaux fans → LTV 48€</p>
                        <p>ROI LTV = (48€ × 100 - 2000€) ÷ 2000€ × 100 = <strong>+140%</strong></p>
                      </div>
                    </div>

                    <div className="formula-card">
                      <h4>🎯 ROI Blended (Recommandé)</h4>
                      <div className="formula-box">
                        <p className="formula">
                          <strong>ROI Blended = (ROI Immédiat × 30%) + (ROI LTV × 70%)</strong>
                        </p>
                      </div>
                      <p><em>Idéal pour : Vision réaliste et équilibrée</em></p>
                      <div className="example-calculation">
                        <p><strong>Exemple :</strong> ROI Immédiat -62% + ROI LTV +140%</p>
                        <p>ROI Blended = (-62% × 0,3) + (140% × 0,7) = <strong>+79%</strong></p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="step" itemScope itemType="https://schema.org/HowToStep" itemProp="step">
                <h3 itemProp="name">4. Mesurer les conversions spécifiques</h3>
                <div className="step-content" itemProp="text">
                  <p>Taux de conversion benchmarks par plateforme :</p>
                  <table className="coefficient-table">
                    <thead>
                      <tr>
                        <th>Action</th>
                        <th>Taux de Conversion</th>
                        <th>Valeur LTV</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Clic → Premier stream</td>
                        <td>15% - 25%</td>
                        <td>Fan potentiel (+2,4€ LTV)</td>
                      </tr>
                      <tr>
                        <td>Stream → Ajout playlist</td>
                        <td>8% - 12%</td>
                        <td>Fan engagé (+48€ LTV)</td>
                      </tr>
                      <tr>
                        <td>Stream → Follow artiste</td>
                        <td>5% - 8%</td>
                        <td>Fan fidèle (+48€ LTV)</td>
                      </tr>
                      <tr>
                        <td>Follow → Achat concert</td>
                        <td>12% - 20%</td>
                        <td>Super fan (+283€ LTV)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="step" itemScope itemType="https://schema.org/HowToStep" itemProp="step">
                <h3 itemProp="name">5. Optimiser selon les données ROI</h3>
                <div className="step-content" itemProp="text">
                  <div className="optimization-matrix">
                    <h4>🎯 Matrice d'Optimisation ROI</h4>
                    <div className="matrix-grid">
                      <div className="matrix-card success">
                        <h5>🚀 ROI > 300%</h5>
                        <p><strong>Action :</strong> Scale agressif</p>
                        <ul>
                          <li>Doublez le budget immédiatement</li>
                          <li>Dupliquez les audiences performantes</li>
                          <li>Testez variations du créatif gagnant</li>
                          <li>Étendez à d'autres plateformes</li>
                        </ul>
                      </div>

                      <div className="matrix-card good">
                        <h5>📈 ROI 150-300%</h5>
                        <p><strong>Action :</strong> Optimisation</p>
                        <ul>
                          <li>Testez nouveaux créatifs</li>
                          <li>Affinez le ciblage audience</li>
                          <li>Optimisez les enchères</li>
                          <li>Augmentez budget progressivement (+50%)</li>
                        </ul>
                      </div>

                      <div className="matrix-card warning">
                        <h5>⚠️ ROI 50-150%</h5>
                        <p><strong>Action :</strong> Test & Pivot</p>
                        <ul>
                          <li>Testez nouvelles audiences</li>
                          <li>Changez complètement les créatifs</li>
                          <li>Réduisez le budget de 30%</li>
                          <li>Analysez la compétition</li>
                        </ul>
                      </div>

                      <div className="matrix-card danger">
                        <h5>🛑 ROI < 50%</h5>
                        <p><strong>Action :</strong> Pause & Analyse</p>
                        <ul>
                          <li>Pausez la campagne immédiatement</li>
                          <li>Analysez les données en profondeur</li>
                          <li>Repensez la stratégie globale</li>
                          <li>Testez sur autre plateforme</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="dashboard-section">
              <h2>📊 Dashboard ROI Musical</h2>
              <div className="dashboard-preview">
                <h3>KPIs Essentiels à Tracker</h3>
                <div className="kpi-grid">
                  <div className="kpi-card">
                    <h4>ROI Global</h4>
                    <p className="kpi-target">Objectif : &gt; 200%</p>
                    <p>Retour sur investissement global campagnes</p>
                  </div>
                  <div className="kpi-card">
                    <h4>CAC (Coût d'Acquisition Client)</h4>
                    <p className="kpi-target">Objectif : &lt; 15€/fan</p>
                    <p>Coût pour acquérir un nouveau fan</p>
                  </div>
                  <div className="kpi-card">
                    <h4>LTV/CAC Ratio</h4>
                    <p className="kpi-target">Objectif : &gt; 3:1</p>
                    <p>Ratio valeur vie / coût acquisition</p>
                  </div>
                  <div className="kpi-card">
                    <h4>Payback Period</h4>
                    <p className="kpi-target">Objectif : &lt; 12 mois</p>
                    <p>Temps pour rentabiliser l'acquisition</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="conclusion-section">
              <h2>🎯 Récapitulatif expert ROI</h2>
              <div className="conclusion-box">
                <p>La mesure du ROI musical nécessite une approche sophistiquée combinant revenus immédiats et valeur long terme des fans. L'objectif n'est pas toujours la rentabilité immédiate, mais la construction d'une fanbase rentable sur plusieurs années. Un ROI de 200%+ sur 12-24 mois est excellent dans l'industrie musicale.</p>

                <div className="next-steps">
                  <h3>Plan d'action ROI recommandé :</h3>
                  <ol>
                    <li>Configurez le tracking UTM et pixels sur tous vos liens</li>
                    <li>Calculez la LTV de vos fans actuels comme baseline</li>
                    <li>Implémentez un dashboard ROI avec KPIs essentiels</li>
                    <li>Testez avec petit budget et mesurez précisément</li>
                    <li>Scalez uniquement les campagnes ROI >200%</li>
                    <li>Optimisez mensuellement selon matrice ROI</li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="cta-section">
              <div className="cta-box">
                <h2>Besoin d'aide pour optimiser votre ROI musical ?</h2>
                <p>Nos experts MDMC Music Ads vous aident à mettre en place un système de mesure ROI précis et à optimiser vos campagnes pour maximiser la rentabilité.</p>
                <div className="cta-buttons">
                  <a href="#contact" className="btn btn-primary">Audit ROI gratuit</a>
                  <a href="https://calendly.com/denis-mdmcmusicads/30min" className="btn btn-secondary" target="_blank" rel="noopener noreferrer">Réserver un appel</a>
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
    </>
  );
};

export default ROIGuide;