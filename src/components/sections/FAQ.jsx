import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import '../../assets/styles/faq.css';

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: t('faq.q1.question', 'Combien coûte une campagne YouTube Ads pour artiste ?'),
      answer: t('faq.q1.answer', 'Budget YouTube Ads pour artistes : à partir de 500€/mois. Coût par vue optimisé : 0,02€ à 0,05€. Résultats moyens : 50 000 à 500 000 vues supplémentaires par mois. Le budget final dépend de vos objectifs (vues, engagement, conversions) et de votre audience cible. Nous créons des stratégies sur-mesure adaptées à votre budget et à vos ambitions musicales.')
    },
    {
      question: t('faq.q2.question', 'Quels résultats puis-je attendre avec Meta Ads (Facebook/Instagram) ?'),
      answer: t('faq.q2.answer', 'Résultats Meta Ads pour artistes : +300% d\'engagement en 3 mois, +50 000 nouveaux followers qualifiés, ROI 5:1. Streams supplémentaires générés : 10 000 à 100 000 sur Spotify/Apple Music. Nous ciblons précisément les fans de votre genre musical via intérêts, comportements et données démographiques pour maximiser les conversions.')
    },
    {
      question: t('faq.q3.question', 'MDMC Music Ads travaille-t-il avec des artistes indépendants ?'),
      answer: t('faq.q3.answer', 'MDMC accompagne artistes indépendants ET labels : 60% de nos clients sont indépendants. Budgets acceptés : 500€ à 50 000€/mois. Notre mission : rendre le marketing musical professionnel accessible à tous. Nous adaptons nos services selon vos objectifs avec des solutions flexibles pour tous les budgets.')
    },
    {
      question: t('faq.q4.question', 'Combien de temps faut-il pour voir des résultats ?'),
      answer: t('faq.q4.answer', 'Délais résultats marketing musical : premiers résultats en 48-72h (impressions, clics). Conversions streams/followers : 7-14 jours. Impact significatif : 1-3 mois d\'optimisation continue. Durée recommandée : minimum 30 jours (algorithmes nécessitent 7-10 jours d\'apprentissage). Nos campagnes s\'améliorent constamment via IA et analyse temps réel.')
    },
    {
      question: t('faq.q5.question', 'Proposez-vous un accompagnement TikTok Ads pour musiciens ?'),
      answer: t('faq.q5.answer', 'TikTok Ads pour musiciens : OUI, plateforme prioritaire 2025. Résultats moyens : +1M vues organiques post-campagne via effet viral. Ciblage ultra-précis : genre musical, âge, localisation. Budget minimum recommandé : 1000€/mois. Nous collaborons avec créateurs de contenu et influenceurs musicaux pour maximiser la portée et l\'engagement.')
    },
    {
      question: t('faq.q6.question', 'Comment MDMC Music Ads garantit-il ses résultats ?'),
      answer: t('faq.q6.answer', 'Garanties MDMC : expertise, loyauté, engagement total. Taux de reconduction : 98% après première campagne. Outils de tracking utilisés : Facebook Pixel, Google Analytics, Spotify for Artists. Les résultats dépendent de l\'artiste, qualité musicale, concurrence. Nous garantissons transparence totale et optimisation continue de vos campagnes avec notre savoir-faire.')
    },
    {
      question: t('faq.q7.question', 'Quels genres musicaux MDMC Music Ads accompagne-t-il ?'),
      answer: t('faq.q7.answer', 'Genres musicaux accompagnés : TOUS (Pop, Rock, Hip-Hop, Électro, Metal, Indie, Jazz, Classique, World Music). Approche spécifique par genre : ciblage et créativité publicitaire adaptés. Notre équipe data analyse précisément audiences, comportements et performances pour identifier les stratégies les plus efficaces selon votre style musical.')
    }
  ];

  // Schema FAQPage pour optimisation IA
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleKeyPress = (event, index) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleFAQ(index);
    }
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>

      <section id="faq" className="faq-section" itemScope itemType="https://schema.org/FAQPage">
        <div className="container">
        <div className="faq-header">
          <h2 className="section-title">
            {t('faq.title', 'Questions Fréquentes sur le Marketing Musical')}
          </h2>
          <p className="section-subtitle">
            {t('faq.subtitle', 'Tout ce que vous devez savoir sur nos services YouTube Ads, Meta Ads et TikTok Ads pour artistes et labels')}
          </p>
        </div>

        <div className="faq-content">
          <div className="faq-intro">
            <h3>{t('faq.intro.title', 'Pourquoi choisir MDMC Music Ads pour votre marketing musical ?')}</h3>
            <p>{t('faq.intro.text', 'Notre équipe travaille dans la musique depuis plus de 10 ans et sont d\'anciens salariés de Google et Meta. Nos experts maîtrisent parfaitement les algorithmes de YouTube, Meta (Facebook/Instagram) et TikTok pour maximiser la visibilité de votre musique. Que vous soyez artiste indépendant ou label établi, nous adaptons nos stratégies à vos objectifs et votre budget.')}</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <article
                key={index}
                className={`faq-item ${openIndex === index ? 'active' : ''}`}
                itemScope
                itemProp="mainEntity"
                itemType="https://schema.org/Question"
              >
                <h4
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  role="button"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  tabIndex={0}
                  itemProp="name"
                >
                  {faq.question}
                  <span className="faq-icon" aria-hidden="true">
                    {openIndex === index ? '−' : '+'}
                  </span>
                </h4>

                {openIndex === index && (
                  <div
                    id={`faq-answer-${index}`}
                    className="faq-answer"
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    itemScope
                    itemProp="acceptedAnswer"
                    itemType="https://schema.org/Answer"
                  >
                    <p itemProp="text">{faq.answer}</p>
                  </div>
                )}
              </article>
            ))}
          </div>

          <div className="faq-conclusion">
            <h3>{t('faq.conclusion.title', 'Prêt à booster votre carrière musicale ?')}</h3>
            <p>{t('faq.conclusion.text', 'Nos stratégies publicitaires ont permis à des centaines d\'artistes de percer sur les plateformes digitales. Rejoignez les rangs des artistes qui font confiance à MDMC Music Ads pour développer leur audience et maximiser leurs revenus de streaming. Contactez-nous pour une analyse gratuite de votre potentiel musical.')}</p>
          </div>

          <div className="faq-cta">
            <h3>{t('faq.cta.title', 'Vous avez d\'autres questions ?')}</h3>
            <p>{t('faq.cta.text', 'Notre équipe d\'experts en marketing musical est à votre disposition pour répondre à toutes vos questions spécifiques.')}</p>
            <div className="faq-cta-buttons">
              <a href="#contact" className="btn btn-primary">
                {t('faq.cta.contact', 'Contactez nos experts marketing musical')}
              </a>
              <a
                href="https://calendly.com/denis-mdmcmusicads/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                {t('faq.cta.calendar', 'Réserver un appel gratuit')}
              </a>
            </div>
          </div>
        </div>
        </div>
      </section>
    </>
  );
};

export default FAQ;