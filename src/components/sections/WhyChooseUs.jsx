import React from 'react';

const WhyChooseUs = () => {
  const reasons = [
    {
      title: 'Expertise 100% Industrie Musicale',
      description: 'Notre équipe est composée d\'anciens managers d\'artistes, producteurs et spécialistes marketing musical. Nous parlons votre langage et comprenons les enjeux spécifiques de l\'industrie.'
    },
    {
      title: 'Résultats Prouvés & Transparents',
      description: '+500 campagnes réussies, +50M de vues générées, +200 artistes propulsés en tête des charts. Chaque euro investi est tracké avec dashboards temps réel et rapports hebdomadaires détaillés.'
    },
    {
      title: 'Stratégies Multi-Plateformes Optimisées',
      description: 'YouTube Ads pour les clips, Meta Ads pour l\'engagement communautaire, TikTok Ads pour la viralité. Nous synchronisons vos campagnes pour maximiser l\'impact cross-plateforme et créer un effet boule de neige.'
    },
    {
      title: 'Formation & Accompagnement Inclus',
      description: 'Nous ne sommes pas qu\'une agence : nous vous formons aux bases du marketing digital musical. Sessions de coaching incluses pour que vous compreniez chaque décision stratégique et deveniez autonome.'
    },
    {
      title: 'ROI Garanti ou Prolongation Gratuite',
      description: 'Nos contrats incluent des KPI mesurables (vues, engagement, conversions). Si les objectifs ne sont pas atteints, nous prolongeons votre campagne sans surcoût jusqu\'à satisfaction complète.'
    },
    {
      title: 'Partenaire Google & Meta Certifié',
      description: 'Nous sommes Google Partner officiel et Meta Business Partner certifié. Accès privilégié aux nouvelles fonctionnalités publicitaires et support technique prioritaire pour vos campagnes.'
    }
  ];

  return (
    <section id="why-choose-us" style={{ padding: '80px 20px', background: '#0a0a0a' }}>
      <div className="container">
        <h2 className="section-title">Pourquoi Choisir MDMC Music Ads ?</h2>
        <p className="section-subtitle">L'agence de référence en marketing musical digital depuis 2018</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', margin: '3rem auto', maxWidth: '1200px' }}>
          {reasons.map((reason, index) => (
            <article key={index} style={{
              background: 'linear-gradient(135deg, rgba(220, 20, 60, 0.05) 0%, rgba(139, 0, 0, 0.05) 100%)',
              border: '1px solid rgba(220, 20, 60, 0.2)',
              borderRadius: '16px',
              padding: '2rem',
              textAlign: 'center',
              transition: 'all 0.4s ease'
            }}>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '1rem', color: '#ffffff' }}>
                {reason.title}
              </h3>
              <p style={{ fontSize: '0.95rem', lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.8)' }}>
                {reason.description}
              </p>
            </article>
          ))}
        </div>

        <div style={{
          textAlign: 'center',
          marginTop: '5rem',
          padding: '3rem 2rem',
          background: 'linear-gradient(135deg, #DC143C 0%, #8B0000 100%)',
          borderRadius: '20px'
        }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#ffffff' }}>Ils nous font confiance</h3>
          <p style={{ fontSize: '1.1rem', margin: '2rem 0', color: 'rgba(255, 255, 255, 0.95)', lineHeight: '1.8' }}>
            <strong style={{ color: '#FFD700' }}>+500 artistes</strong> accompagnés |
            <strong style={{ color: '#FFD700' }}> +50M de vues</strong> générées |
            <strong style={{ color: '#FFD700' }}> +25 pays</strong> couverts |
            <strong style={{ color: '#FFD700' }}> 98% de satisfaction</strong> client
          </p>
          <a href="#contact" className="btn btn-secondary" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)', borderColor: '#ffffff', color: '#ffffff' }}>
            Découvrir les témoignages clients
          </a>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;