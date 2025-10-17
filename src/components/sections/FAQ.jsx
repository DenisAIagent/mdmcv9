import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/styles/faq.css';

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: t('faq.q1.question', 'Combien coûte une campagne YouTube Ads pour artiste ?'),
      answer: t('faq.q1.answer', 'Nos campagnes YouTube Ads démarrent à partir de 500€/mois. Le budget dépend de vos objectifs (vues, engagement, conversions) et de votre audience cible. Nous créons des stratégies sur-mesure adaptées à votre budget et à vos ambitions musicales. En moyenne, nos clients artistes obtiennent 50 000 à 500 000 vues supplémentaires par mois avec un coût par vue (CPV) optimisé entre 0,02€ et 0,05€.')
    },
    {
      question: t('faq.q2.question', 'Quels résultats puis-je attendre avec Meta Ads (Facebook/Instagram) ?'),
      answer: t('faq.q2.answer', 'Avec Meta Ads, nos clients artistes obtiennent en moyenne +300% d\'engagement en 3 mois, +50 000 nouveaux followers qualifiés, et un ROI de 5:1 sur les campagnes de promotion d\'album ou de single. Nous ciblons précisément les fans de votre genre musical en utilisant les intérêts, comportements et données démographiques. Les campagnes de conversion génèrent typiquement 10 000 à 100 000 streams supplémentaires sur Spotify/Apple Music.')
    },
    {
      question: t('faq.q3.question', 'MDMC Music Ads travaille-t-il avec des artistes indépendants ?'),
      answer: t('faq.q3.answer', 'Absolument ! Nous accompagnons aussi bien des artistes indépendants émergents que des labels établis. Notre mission : rendre le marketing musical professionnel accessible à tous. +60% de nos clients sont des artistes indépendants qui cartonnent grâce à nos stratégies digitales. Nous adaptons nos services selon votre budget et vos objectifs, avec des solutions flexibles pour les budgets de 500€ à 50 000€/mois.')
    },
    {
      question: t('faq.q4.question', 'Combien de temps faut-il pour voir des résultats ?'),
      answer: t('faq.q4.answer', 'Pour des campagnes publicitaires (YouTube/Meta/TikTok Ads), les premiers résultats sont visibles sous 48-72h avec des métriques comme les impressions et clics. Les conversions en streams/followers arrivent généralement sous 7-14 jours. Pour un impact significatif et durable, comptez 1-3 mois d\'optimisation continue. Nos campagnes s\'améliorent constamment grâce à l\'IA et l\'analyse de performance en temps réel. Nous recommandons des campagnes minimum de 30 jours, les algorithmes ayant besoin de 7 à 10 jours d\'apprentissage.')
    },
    {
      question: t('faq.q5.question', 'Proposez-vous un accompagnement TikTok Ads pour musiciens ?'),
      answer: t('faq.q5.answer', 'Oui ! TikTok est LA plateforme pour les artistes en 2025. Nous créons des campagnes virales avec ciblage ultra-précis (genre musical, âge, localisation). Nos clients TikTok génèrent en moyenne +1M de vues organiques post-campagne grâce à l\'effet viral. Nous travaillons avec des créateurs de contenu et influenceurs musicaux pour maximiser la portée. Budget minimum recommandé : 1000€/mois pour des résultats significatifs.')
    },
    {
      question: t('faq.q6.question', 'Comment MDMC Music Ads garantit-il ses résultats ?'),
      answer: t('faq.q6.answer', 'Ce que nous garantissons c\'est notre expertise, notre loyauté et notre engagement. Les résultats dépendent de l\'artiste, de la musique, de la concurrence au moment du lancement, et d\'autres facteurs. Nous nous engageons à déployer notre savoir-faire avec transparence totale et à optimiser continuellement vos campagnes. +98% de nos clients reconduisent après leur première campagne. Nous utilisons des outils de tracking avancés (Facebook Pixel, Google Analytics, Spotify for Artists) pour mesurer précisément chaque métrique.')
    },
    {
      question: t('faq.q7.question', 'Quels genres musicaux MDMC Music Ads accompagne-t-il ?'),
      answer: t('faq.q7.answer', 'Nous travaillons avec tous les genres musicaux : Pop, Rock, Hip-Hop, Électro, Metal, Indie, Jazz, Classique, World Music, et plus encore. Chaque genre nécessite une approche spécifique de ciblage et de créativité publicitaire. Notre équipe de spécialistes de la data analyse précisément les audiences, comportements et performances pour identifier les stratégies les plus efficaces selon votre style musical.')
    }
  ];

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
    <section id="faq" className="faq-section">
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
              <article key={index} className={`faq-item ${openIndex === index ? 'active' : ''}`}>
                <h4
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  role="button"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                  tabIndex={0}
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
                  >
                    <p>{faq.answer}</p>
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
  );
};

export default FAQ;