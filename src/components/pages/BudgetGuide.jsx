import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../common/Breadcrumb';
import '../../assets/styles/guide.css';

const BudgetGuide = () => {
  const { t } = useTranslation();

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Guides Marketing Musical', url: '/guides' },
    { name: 'Budget YouTube Ads', url: null }
  ];

  // Schema HowTo pour optimisation IA
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment calculer son budget YouTube Ads pour artiste musical",
    "description": "Guide complet pour déterminer le budget optimal d'une campagne YouTube Ads musicale selon vos objectifs de vues et conversions.",
    "image": "https://www.mdmcmusicads.com/assets/images/youtube-budget-guide.webp",
    "totalTime": "PT10M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "EUR",
      "value": "500-50000"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Compte YouTube Ads"
      },
      {
        "@type": "HowToSupply",
        "name": "Objectifs marketing définis"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Définir vos objectifs de vues",
        "text": "Déterminez votre objectif : 50K vues (budget 1000€), 100K vues (budget 2000€), 500K vues (budget 10000€). Le coût par vue (CPV) moyen pour la musique est de 0,02€ à 0,05€.",
        "image": "https://www.mdmcmusicads.com/assets/images/step1-objectives.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Calculer le CPV selon votre genre musical",
        "text": "Pop/Hip-Hop : CPV 0,02€-0,03€. Rock/Metal : CPV 0,03€-0,04€. Électro/Dance : CPV 0,02€-0,035€. Jazz/Classique : CPV 0,04€-0,05€.",
        "image": "https://www.mdmcmusicads.com/assets/images/step2-cpv.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Définir votre audience cible",
        "text": "Audience large (18-65 ans) : budget +30%. Audience précise (18-35 ans + intérêts) : budget standard. Retargeting : budget -20%. Plus l'audience est précise, plus le CPV diminue.",
        "image": "https://www.mdmcmusicads.com/assets/images/step3-audience.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Appliquer la formule de calcul",
        "text": "Budget = (Objectif vues × CPV genre) × Coefficient audience. Exemple : 100K vues Pop × 0,025€ × 1,0 = 2500€ budget recommandé.",
        "image": "https://www.mdmcmusicads.com/assets/images/step4-formula.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Prévoir le budget d'optimisation",
        "text": "Ajoutez 20% au budget calculé pour l'optimisation et les tests A/B. Budget final = Budget initial × 1,2. Cette marge permet d'améliorer les performances en cours de campagne.",
        "image": "https://www.mdmcmusicads.com/assets/images/step5-optimization.webp"
      }
    ],
    "result": {
      "@type": "HowToSupply",
      "name": "Budget YouTube Ads optimisé pour votre objectif musical"
    }
  };

  // Schema Article pour le contenu
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Guide Budget YouTube Ads Musical 2025 : Calcul et Optimisation",
    "description": "Méthode complète pour calculer votre budget YouTube Ads musical optimal selon votre genre, audience et objectifs de vues.",
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
    "mainEntityOfPage": "https://www.mdmcmusicads.com/guide-budget-youtube-ads",
    "image": "https://www.mdmcmusicads.com/assets/images/youtube-budget-guide.webp",
    "about": [
      {
        "@type": "Thing",
        "name": "YouTube Ads",
        "sameAs": "https://fr.wikipedia.org/wiki/YouTube"
      },
      {
        "@type": "Thing",
        "name": "Marketing Musical",
        "sameAs": "https://fr.wikipedia.org/wiki/Marketing_musical"
      }
    ],
    "keywords": "budget youtube ads, marketing musical, CPV musique, campagne publicitaire artiste"
  };

  return (
    <>
      <Helmet>
        <title>Guide Budget YouTube Ads Musical 2025 | Calcul et Optimisation | MDMC</title>
        <meta name="description" content="Méthode complète pour calculer votre budget YouTube Ads musical optimal. CPV par genre, formules de calcul, exemples concrets. Guide expert MDMC." />
        <meta name="keywords" content="budget youtube ads musical, calcul CPV musique, campagne publicitaire artiste, marketing musical budget" />
        <link rel="canonical" href="https://www.mdmcmusicads.com/guide-budget-youtube-ads" />

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

            <h1 itemProp="name">Guide Budget YouTube Ads Musical 2025 : Calcul et Optimisation</h1>

            <div className="guide-meta">
              <span className="duration">⏱️ Lecture : 10 minutes</span>
              <span className="difficulty">📊 Niveau : Intermédiaire</span>
              <span className="updated">🔄 Mis à jour : Janvier 2025</span>
            </div>

            <div className="key-takeaway">
              <h2>🎯 Points clés à retenir</h2>
              <ul>
                <li><strong>CPV moyen musique :</strong> 0,02€ à 0,05€ selon le genre</li>
                <li><strong>Budget minimum :</strong> 500€/mois pour résultats significatifs</li>
                <li><strong>Formule de base :</strong> Objectif vues × CPV genre × Coefficient audience</li>
                <li><strong>Marge d'optimisation :</strong> +20% du budget calculé</li>
              </ul>
            </div>
          </header>

          <article className="guide-content" itemProp="description">
            <section className="definition-section">
              <h2>Qu'est-ce que le budget YouTube Ads musical ?</h2>
              <div className="definition-box">
                <p><strong>Définition :</strong> Le budget YouTube Ads musical est l'investissement publicitaire nécessaire pour promouvoir efficacement un contenu musical sur YouTube, calculé selon vos objectifs de vues, votre genre musical et votre audience cible.</p>
              </div>
            </section>

            <section className="benchmarks-section">
              <h2>📊 Benchmarks sectoriels 2025</h2>
              <div className="benchmarks-grid">
                <div className="benchmark-card">
                  <h3>CPV par Genre Musical</h3>
                  <ul>
                    <li>Pop/Hip-Hop : <strong>0,02€ - 0,03€</strong></li>
                    <li>Rock/Metal : <strong>0,03€ - 0,04€</strong></li>
                    <li>Électro/Dance : <strong>0,02€ - 0,035€</strong></li>
                    <li>Jazz/Classique : <strong>0,04€ - 0,05€</strong></li>
                  </ul>
                </div>
                <div className="benchmark-card">
                  <h3>Budgets Recommandés</h3>
                  <ul>
                    <li>Artiste émergent : <strong>500€ - 2000€/mois</strong></li>
                    <li>Artiste établi : <strong>2000€ - 10000€/mois</strong></li>
                    <li>Label indépendant : <strong>5000€ - 25000€/mois</strong></li>
                    <li>Major label : <strong>25000€+ /mois</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="steps-section">
              <h2>🔧 Méthode de calcul étape par étape</h2>

              <div className="step" itemScope itemType="https://schema.org/HowToStep" itemProp="step">
                <h3 itemProp="name">1. Définir vos objectifs de vues</h3>
                <div className="step-content" itemProp="text">
                  <p>Déterminez votre objectif selon votre statut :</p>
                  <ul>
                    <li><strong>50K vues</strong> → Budget recommandé : 1000€ - 1500€</li>
                    <li><strong>100K vues</strong> → Budget recommandé : 2000€ - 3000€</li>
                    <li><strong>500K vues</strong> → Budget recommandé : 10000€ - 15000€</li>
                    <li><strong>1M+ vues</strong> → Budget recommandé : 20000€+</li>
                  </ul>
                  <div className="tip-box">
                    <p><strong>💡 Conseil expert :</strong> Commencez par un objectif réaliste. Il vaut mieux atteindre 50K vues de qualité que viser 500K et échouer.</p>
                  </div>
                </div>
              </div>

              <div className="step" itemScope itemType="https://schema.org/HowToStep" itemProp="step">
                <h3 itemProp="name">2. Calculer le CPV selon votre genre</h3>
                <div className="step-content" itemProp="text">
                  <p>Le coût par vue varie selon votre style musical :</p>
                  <div className="cpv-calculator">
                    <div className="genre-cpv">
                      <h4>Pop/Hip-Hop (CPV le plus bas)</h4>
                      <p>CPV moyen : <strong>0,022€</strong></p>
                      <p>Raison : Audience large, forte demande</p>
                    </div>
                    <div className="genre-cpv">
                      <h4>Rock/Metal</h4>
                      <p>CPV moyen : <strong>0,035€</strong></p>
                      <p>Raison : Audience spécialisée, fidèle</p>
                    </div>
                    <div className="genre-cpv">
                      <h4>Jazz/Classique (CPV le plus élevé)</h4>
                      <p>CPV moyen : <strong>0,045€</strong></p>
                      <p>Raison : Audience niche, ciblage précis</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="step" itemScope itemType="https://schema.org/HowToStep" itemProp="step">
                <h3 itemProp="name">3. Appliquer les coefficients d'audience</h3>
                <div className="step-content" itemProp="text">
                  <p>Ajustez selon votre stratégie de ciblage :</p>
                  <table className="coefficient-table">
                    <thead>
                      <tr>
                        <th>Type d'audience</th>
                        <th>Coefficient</th>
                        <th>Impact sur le budget</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Audience large (18-65 ans)</td>
                        <td>+30%</td>
                        <td>CPV plus élevé, portée maximale</td>
                      </tr>
                      <tr>
                        <td>Audience ciblée (18-35 + intérêts)</td>
                        <td>Standard</td>
                        <td>Équilibre optimal coût/performance</td>
                      </tr>
                      <tr>
                        <td>Retargeting (visiteurs site)</td>
                        <td>-20%</td>
                        <td>CPV réduit, conversion élevée</td>
                      </tr>
                      <tr>
                        <td>Lookalike (fans similaires)</td>
                        <td>+10%</td>
                        <td>Découverte de nouveaux fans</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="step" itemScope itemType="https://schema.org/HowToStep" itemProp="step">
                <h3 itemProp="name">4. Calculer votre budget final</h3>
                <div className="step-content" itemProp="text">
                  <div className="formula-box">
                    <h4>🧮 Formule de calcul</h4>
                    <p className="formula">
                      <strong>Budget = (Objectif vues × CPV genre × Coefficient audience) × 1,2</strong>
                    </p>
                    <p><em>Le coefficient 1,2 (20%) permet l'optimisation et les tests A/B</em></p>
                  </div>

                  <div className="example-calculation">
                    <h4>💡 Exemple concret</h4>
                    <p><strong>Artiste Pop visant 100K vues avec audience ciblée :</strong></p>
                    <ol>
                      <li>Objectif : 100 000 vues</li>
                      <li>CPV Pop : 0,025€</li>
                      <li>Coefficient audience ciblée : 1,0</li>
                      <li>Budget base : 100 000 × 0,025€ × 1,0 = <strong>2 500€</strong></li>
                      <li>Budget final : 2 500€ × 1,2 = <strong>3 000€</strong></li>
                    </ol>
                  </div>
                </div>
              </div>
            </section>

            <section className="optimization-section">
              <h2>🚀 Stratégies d'optimisation budgétaire</h2>

              <div className="optimization-tips">
                <div className="tip-card">
                  <h3>💰 Réduire les coûts</h3>
                  <ul>
                    <li>Utilisez le retargeting (CPV -20%)</li>
                    <li>Testez des créatifs multiples</li>
                    <li>Optimisez vos miniatures</li>
                    <li>Ciblez les heures d'écoute optimales</li>
                  </ul>
                </div>

                <div className="tip-card">
                  <h3>📈 Maximiser l'impact</h3>
                  <ul>
                    <li>Utilisez des audiences lookalike</li>
                    <li>Testez différents formats (TrueView, Bumper)</li>
                    <li>Analysez les données démographiques</li>
                    <li>Adaptez selon les performances</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="kpi-section">
              <h2>📊 KPIs à surveiller</h2>
              <div className="kpi-grid">
                <div className="kpi-card">
                  <h3>CPV (Coût par Vue)</h3>
                  <p className="kpi-target">Objectif : &lt; 0,05€</p>
                  <p>Indicateur principal de performance budgétaire</p>
                </div>
                <div className="kpi-card">
                  <h3>Taux de clic (CTR)</h3>
                  <p className="kpi-target">Objectif : &gt; 2%</p>
                  <p>Mesure l'attractivité de votre contenu</p>
                </div>
                <div className="kpi-card">
                  <h3>Durée de visionnage</h3>
                  <p className="kpi-target">Objectif : &gt; 30 sec</p>
                  <p>Indique l'engagement de votre audience</p>
                </div>
                <div className="kpi-card">
                  <h3>ROI Streams</h3>
                  <p className="kpi-target">Objectif : &gt; 3:1</p>
                  <p>Retour sur investissement en streams générés</p>
                </div>
              </div>
            </section>

            <section className="conclusion-section">
              <h2>🎯 Récapitulatif expert</h2>
              <div className="conclusion-box">
                <p>Le calcul du budget YouTube Ads musical nécessite une approche méthodique combinant objectifs réalistes, connaissance des CPV sectoriels et optimisation continue. Commencez par un budget test de 1000€-2000€ pour valider votre stratégie avant d'augmenter progressivement.</p>

                <div className="next-steps">
                  <h3>Prochaines étapes recommandées :</h3>
                  <ol>
                    <li>Calculez votre budget avec notre formule</li>
                    <li>Préparez 3-5 créatifs différents</li>
                    <li>Définissez vos audiences de test</li>
                    <li>Lancez une campagne pilote sur 2 semaines</li>
                    <li>Analysez et optimisez selon les performances</li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="cta-section">
              <div className="cta-box">
                <h2>Besoin d'aide pour votre campagne YouTube Ads ?</h2>
                <p>Nos experts MDMC Music Ads vous accompagnent dans le calcul et l'optimisation de votre budget publicitaire musical.</p>
                <div className="cta-buttons">
                  <a href="#contact" className="btn btn-primary">Consultation gratuite</a>
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

export default BudgetGuide;