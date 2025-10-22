import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Breadcrumb from '../common/Breadcrumb';
import '../../assets/styles/guide.css';

const BudgetGuideMeta = () => {
  const { t } = useTranslation();

  // Breadcrumb items
  const breadcrumbItems = [
    { name: 'Accueil', url: '/' },
    { name: 'Guides Marketing Musical', url: '/guides' },
    { name: 'Budget Meta Ads', url: null }
  ];

  // Schema HowTo pour optimisation IA
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "Comment calculer son budget Meta Ads (Facebook/Instagram) pour artiste musical",
    "description": "Guide expert pour déterminer le budget optimal de vos campagnes Meta Ads musicales selon vos objectifs d'engagement et de conversions.",
    "image": "https://www.mdmcmusicads.com/assets/images/meta-budget-guide.webp",
    "totalTime": "PT12M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "EUR",
      "value": "800-25000"
    },
    "supply": [
      {
        "@type": "HowToSupply",
        "name": "Compte Meta Business"
      },
      {
        "@type": "HowToSupply",
        "name": "Objectifs marketing définis"
      }
    ],
    "step": [
      {
        "@type": "HowToStep",
        "name": "Définir vos objectifs Meta Ads",
        "text": "Choisissez votre objectif principal : Notoriété (+50K reach, budget 800€), Engagement (+10K interactions, budget 1500€), Conversions (+5K streams, budget 3000€). CPM moyen musique : 4€-8€ selon l'audience.",
        "image": "https://www.mdmcmusicads.com/assets/images/step1-meta-objectives.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Calculer le CPM selon votre genre musical",
        "text": "Pop/Hip-Hop : CPM 3,5€-5€. Rock/Metal : CPM 5€-7€. Électro/Dance : CPM 4€-6€. Jazz/Classique : CPM 6€-8€. Le CPM varie selon la concurrence sur votre niche musicale.",
        "image": "https://www.mdmcmusicads.com/assets/images/step2-meta-cpm.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Segmenter votre audience Meta",
        "text": "Audience large 18-65 ans : budget +40%. Audience ciblée intérêts musicaux : budget standard. Custom audience (fans existants) : budget -25%. Lookalike 1% : budget +15%.",
        "image": "https://www.mdmcmusicads.com/assets/images/step3-meta-audience.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Appliquer la formule Meta Ads",
        "text": "Budget = (Objectif reach × CPM genre × Coefficient audience) ÷ 1000. Exemple : 100K reach × 5€ CPM × 1,0 = 500€ budget base pour campagne standard.",
        "image": "https://www.mdmcmusicads.com/assets/images/step4-meta-formula.webp"
      },
      {
        "@type": "HowToStep",
        "name": "Optimiser et scaler votre budget",
        "text": "Ajoutez 25% pour tests créatifs et optimisation. Budget final = Budget initial × 1,25. Scalez progressivement : +50% si CTR >2%, +100% si CPM stable, pause si CTR <0,8%.",
        "image": "https://www.mdmcmusicads.com/assets/images/step5-meta-optimization.webp"
      }
    ],
    "result": {
      "@type": "HowToSupply",
      "name": "Budget Meta Ads optimisé pour votre stratégie musicale"
    }
  };

  // Schema Article pour le contenu
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Guide Budget Meta Ads Musical 2025 : Facebook & Instagram",
    "description": "Méthode experte pour calculer votre budget Meta Ads musical optimal selon votre genre, audience et objectifs d'engagement.",
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
    "mainEntityOfPage": "https://www.mdmcmusicads.com/guide-budget-meta-ads",
    "image": "https://www.mdmcmusicads.com/assets/images/meta-budget-guide.webp",
    "about": [
      {
        "@type": "Thing",
        "name": "Meta Ads",
        "sameAs": "https://fr.wikipedia.org/wiki/Facebook_Ads"
      },
      {
        "@type": "Thing",
        "name": "Marketing Musical",
        "sameAs": "https://fr.wikipedia.org/wiki/Marketing_musical"
      }
    ],
    "keywords": "budget meta ads musical, facebook ads artistes, instagram ads musiciens, CPM musique, campagne engagement musical"
  };

  return (
    <>
      <Helmet>
        <title>Guide Budget Meta Ads Musical 2025 | Facebook & Instagram | MDMC</title>
        <meta name="description" content="Méthode experte pour calculer votre budget Meta Ads musical optimal. CPM par genre, audiences, formules de calcul. Guide MDMC 2025." />
        <meta name="keywords" content="budget meta ads musical, facebook ads artistes, instagram ads musiciens, CPM musique, engagement musical" />
        <link rel="canonical" href="https://www.mdmcmusicads.com/guide-budget-meta-ads" />

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

            <h1 itemProp="name">Guide Budget Meta Ads Musical 2025 : Facebook & Instagram</h1>

            <div className="guide-meta">
              <span className="duration">⏱️ Lecture : 12 minutes</span>
              <span className="difficulty">📊 Niveau : Intermédiaire</span>
              <span className="updated">🔄 Mis à jour : Janvier 2025</span>
            </div>

            <div className="key-takeaway">
              <h2>🎯 Points clés à retenir</h2>
              <ul>
                <li><strong>CPM moyen musique :</strong> 4€ à 8€ selon le genre et l'audience</li>
                <li><strong>Budget minimum :</strong> 800€/mois pour résultats significatifs</li>
                <li><strong>ROI attendu :</strong> 5:1 sur campagnes de conversion optimisées</li>
                <li><strong>Engagement moyen :</strong> +300% en 3 mois avec budget adapté</li>
              </ul>
            </div>
          </header>

          <article className="guide-content" itemProp="description">
            <section className="definition-section">
              <h2>Qu'est-ce que le budget Meta Ads musical ?</h2>
              <div className="definition-box">
                <p><strong>Définition :</strong> Le budget Meta Ads musical est l'investissement publicitaire nécessaire pour promouvoir efficacement votre musique sur Facebook et Instagram, calculé selon vos objectifs d'engagement, votre genre musical et votre stratégie d'audience.</p>
              </div>
            </section>

            <section className="benchmarks-section">
              <h2>📊 Benchmarks Meta Ads Musical 2025</h2>
              <div className="benchmarks-grid">
                <div className="benchmark-card">
                  <h3>CPM par Genre Musical</h3>
                  <ul>
                    <li>Pop/Hip-Hop : <strong>3,5€ - 5€</strong></li>
                    <li>Rock/Metal : <strong>5€ - 7€</strong></li>
                    <li>Électro/Dance : <strong>4€ - 6€</strong></li>
                    <li>Jazz/Classique : <strong>6€ - 8€</strong></li>
                  </ul>
                </div>
                <div className="benchmark-card">
                  <h3>Budgets Recommandés</h3>
                  <ul>
                    <li>Notoriété/Reach : <strong>800€ - 3000€/mois</strong></li>
                    <li>Engagement/Interactions : <strong>1500€ - 5000€/mois</strong></li>
                    <li>Conversions/Streams : <strong>3000€ - 15000€/mois</strong></li>
                    <li>Retargeting fans : <strong>500€ - 2000€/mois</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="steps-section">
              <h2>🔧 Méthode de calcul étape par étape</h2>

              <div className="step" itemScope itemType="https://schema.org/HowToStep" itemProp="step">
                <h3 itemProp="name">1. Définir vos objectifs Meta Ads</h3>
                <div className="step-content" itemProp="text">
                  <p>Choisissez votre objectif principal selon votre phase artistique :</p>
                  <ul>
                    <li><strong>Notoriété (Reach)</strong> → 50K-200K impressions → Budget 800€-3000€</li>
                    <li><strong>Engagement</strong> → 5K-20K interactions → Budget 1500€-6000€</li>
                    <li><strong>Trafic</strong> → 2K-10K clics → Budget 1000€-4000€</li>
                    <li><strong>Conversions</strong> → 1K-10K streams → Budget 3000€-15000€</li>
                  </ul>
                  <div className="tip-box">
                    <p><strong>💡 Conseil expert :</strong> Pour un nouvel artiste, commencez par Notoriété puis évoluez vers Engagement avant les Conversions.</p>
                  </div>
                </div>
              </div>

              <div className="step" itemScope itemType="https://schema.org/HowToStep" itemProp="step">
                <h3 itemProp="name">2. Calculer le CPM selon votre genre</h3>
                <div className="step-content" itemProp="text">
                  <p>Le coût pour 1000 impressions varie significativement :</p>
                  <div className="cpv-calculator">
                    <div className="genre-cpv">
                      <h4>Pop/Hip-Hop (CPM le plus bas)</h4>
                      <p>CPM moyen : <strong>4,2€</strong></p>
                      <p>Raison : Audience large, forte demande publicitaire</p>
                    </div>
                    <div className="genre-cpv">
                      <h4>Électro/Dance</h4>
                      <p>CPM moyen : <strong>5€</strong></p>
                      <p>Raison : Audience jeune, active sur réseaux sociaux</p>
                    </div>
                    <div className="genre-cpv">
                      <h4>Jazz/Classique (CPM le plus élevé)</h4>
                      <p>CPM moyen : <strong>7€</strong></p>
                      <p>Raison : Audience niche, ciblage très précis</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="step" itemScope itemType="https://schema.org/HowToStep" itemProp="step">
                <h3 itemProp="name">3. Optimiser le ciblage audience</h3>
                <div className="step-content" itemProp="text">
                  <p>Ajustez votre budget selon votre stratégie de ciblage :</p>
                  <table className="coefficient-table">
                    <thead>
                      <tr>
                        <th>Type d'audience</th>
                        <th>Coefficient budget</th>
                        <th>CPM attendu</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Audience large (18-65 ans)</td>
                        <td>+40%</td>
                        <td>CPM élevé, reach maximum</td>
                      </tr>
                      <tr>
                        <td>Intérêts musicaux précis</td>
                        <td>Standard</td>
                        <td>CPM optimal, engagement ciblé</td>
                      </tr>
                      <tr>
                        <td>Custom audience (fans)</td>
                        <td>-25%</td>
                        <td>CPM réduit, conversion élevée</td>
                      </tr>
                      <tr>
                        <td>Lookalike 1% (similaires fans)</td>
                        <td>+15%</td>
                        <td>Découverte de nouveaux fans qualifiés</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="step" itemScope itemType="https://schema.org/HowToStep" itemProp="step">
                <h3 itemProp="name">4. Appliquer la formule Meta Ads</h3>
                <div className="step-content" itemProp="text">
                  <div className="formula-box">
                    <h4>🧮 Formule de calcul</h4>
                    <p className="formula">
                      <strong>Budget = (Objectif reach × CPM genre × Coefficient audience) ÷ 1000</strong>
                    </p>
                    <p><em>Puis ajouter 25% pour optimisation et tests créatifs</em></p>
                  </div>

                  <div className="example-calculation">
                    <h4>💡 Exemple concret</h4>
                    <p><strong>Artiste Électro visant 100K reach avec audience ciblée :</strong></p>
                    <ol>
                      <li>Objectif reach : 100 000 impressions</li>
                      <li>CPM Électro : 5€</li>
                      <li>Coefficient audience ciblée : 1,0</li>
                      <li>Budget base : (100 000 × 5€ × 1,0) ÷ 1000 = <strong>500€</strong></li>
                      <li>Budget final : 500€ × 1,25 = <strong>625€</strong></li>
                    </ol>
                  </div>
                </div>
              </div>

              <div className="step" itemScope itemType="https://schema.org/HowToStep" itemProp="step">
                <h3 itemProp="name">5. Scaler et optimiser vos campagnes</h3>
                <div className="step-content" itemProp="text">
                  <div className="optimization-tips">
                    <div className="tip-card">
                      <h3>📈 Signaux de scaling</h3>
                      <ul>
                        <li>CTR &gt; 2% : Augmentez budget +50%</li>
                        <li>CPM stable : Doublez le budget</li>
                        <li>CPC en baisse : Scalez agressivement</li>
                        <li>Engagement rate &gt; 5% : Budget +100%</li>
                      </ul>
                    </div>

                    <div className="tip-card">
                      <h3>⚠️ Signaux d'alerte</h3>
                      <ul>
                        <li>CTR &lt; 0,8% : Pausez et testez créatifs</li>
                        <li>CPM +50% : Réduisez audience ou budget</li>
                        <li>Frequency &gt; 3 : Changez créatifs</li>
                        <li>CPC en hausse : Optimisez ciblage</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="kpi-section">
              <h2>📊 KPIs Meta Ads à surveiller</h2>
              <div className="kpi-grid">
                <div className="kpi-card">
                  <h3>CPM (Coût pour 1000 impressions)</h3>
                  <p className="kpi-target">Objectif : 4€ - 8€</p>
                  <p>Indicateur de compétitivité de votre audience</p>
                </div>
                <div className="kpi-card">
                  <h3>CTR (Taux de clic)</h3>
                  <p className="kpi-target">Objectif : &gt; 1,5%</p>
                  <p>Mesure l'attractivité de vos créatifs</p>
                </div>
                <div className="kpi-card">
                  <h3>Engagement Rate</h3>
                  <p className="kpi-target">Objectif : &gt; 3%</p>
                  <p>Indique la connexion avec votre audience</p>
                </div>
                <div className="kpi-card">
                  <h3>ROAS (Return on Ad Spend)</h3>
                  <p className="kpi-target">Objectif : &gt; 4:1</p>
                  <p>Retour sur investissement publicitaire</p>
                </div>
              </div>
            </section>

            <section className="platforms-section">
              <h2>📱 Facebook vs Instagram : Budgets spécifiques</h2>
              <div className="benchmarks-grid">
                <div className="benchmark-card">
                  <h3>Facebook (Audience 25-55 ans)</h3>
                  <ul>
                    <li>CPM moyen : <strong>5€ - 8€</strong></li>
                    <li>Engagement rate : <strong>2% - 4%</strong></li>
                    <li>Meilleur pour : Stories longues, vidéos explicatives</li>
                    <li>Budget recommandé : <strong>60% du total</strong></li>
                  </ul>
                </div>
                <div className="benchmark-card">
                  <h3>Instagram (Audience 16-35 ans)</h3>
                  <ul>
                    <li>CPM moyen : <strong>4€ - 7€</strong></li>
                    <li>Engagement rate : <strong>3% - 6%</strong></li>
                    <li>Meilleur pour : Visuels, Stories courtes, Reels</li>
                    <li>Budget recommandé : <strong>40% du total</strong></li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="conclusion-section">
              <h2>🎯 Récapitulatif expert</h2>
              <div className="conclusion-box">
                <p>Meta Ads offre des opportunités uniques pour les artistes grâce à ses capacités de ciblage précis et ses formats engageants. La clé du succès réside dans l'équilibre entre budget, audience et créatifs, avec une optimisation continue basée sur les performances.</p>

                <div className="next-steps">
                  <h3>Plan d'action recommandé :</h3>
                  <ol>
                    <li>Calculez votre budget avec notre formule</li>
                    <li>Créez 5-8 créatifs différents (images + vidéos)</li>
                    <li>Segmentez vos audiences (large, intérêts, lookalike)</li>
                    <li>Lancez avec 70% Facebook / 30% Instagram</li>
                    <li>Optimisez selon CTR et engagement après 3-5 jours</li>
                    <li>Scalez progressivement les meilleures performances</li>
                  </ol>
                </div>
              </div>
            </section>

            <section className="cta-section">
              <div className="cta-box">
                <h2>Prêt à lancer vos campagnes Meta Ads ?</h2>
                <p>Nos experts MDMC Music Ads vous accompagnent dans la création et l'optimisation de vos campagnes Facebook et Instagram pour maximiser votre ROI musical.</p>
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

export default BudgetGuideMeta;