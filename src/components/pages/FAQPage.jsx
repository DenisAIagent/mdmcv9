import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../SEO/Head';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import FAQ from '../sections/FAQ';
import '../../assets/styles/pages.css';

const FAQPage = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SEOHead
        title={t('faq.page_title', 'Questions Fréquentes - Marketing Musical MDMC')}
        description={t('faq.page_description', 'Toutes les réponses à vos questions sur nos services YouTube Ads, Meta Ads et TikTok Ads pour artistes et labels. Expertise marketing musical depuis plus de 10 ans.')}
        keywords="FAQ, questions fréquentes, marketing musical, YouTube Ads, Meta Ads, TikTok Ads, MDMC"
      />

      <Header />

      <main className="page-main">
        {/* Breadcrumb */}
        <div className="breadcrumb-section">
          <div className="container">
            <nav className="breadcrumb">
              <Link to="/" className="breadcrumb-link">
                {t('breadcrumb.home', 'Accueil')}
              </Link>
              <span className="breadcrumb-separator">›</span>
              <span className="breadcrumb-current">
                {t('breadcrumb.faq', 'FAQ')}
              </span>
            </nav>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQ />

        {/* Additional Help Section */}
        <section className="help-section">
          <div className="container">
            <div className="help-content">
              <h2>{t('faq.help_title', 'Besoin d\'aide supplémentaire ?')}</h2>
              <p>{t('faq.help_text', 'Si vous ne trouvez pas la réponse à votre question, notre équipe d\'experts est là pour vous aider.')}</p>
              <div className="help-buttons">
                <Link to="/#contact" className="btn btn-primary">
                  {t('faq.help_contact', 'Nous contacter')}
                </Link>
                <a
                  href="https://calendly.com/denis-mdmcmusicads/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                >
                  {t('faq.help_calendar', 'Réserver un appel')}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default FAQPage;