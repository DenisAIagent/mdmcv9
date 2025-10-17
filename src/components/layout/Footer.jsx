import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import '../../assets/styles/footer.css';

const Footer = ({ openSimulator }) => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  
  const handleSimulatorClick = () => {
    if (openSimulator) {
      openSimulator();
    }
  };
  
  const handleCookieClick = () => {
    // Cette fonction sera implémentée plus tard pour ouvrir la bannière de cookies
    const cookieBanner = document.getElementById('cookie-banner');
    if (cookieBanner) {
      cookieBanner.style.display = 'block';
    }
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-brand">
          <Link to="/" aria-label="MDMC - Retour à l'accueil">
            <img src="/assets/images/logo.png" alt="MDMC Logo" />
          </Link>
          <p>{t('footer.logo_p')}</p>
          <div className="google-partner">
            <a 
              href="https://www.google.com/partners/agency?id=3215385696" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label={t('contact.partner_google_aria_label')}
            >
              <img 
                src="https://www.gstatic.com/partners/badge/images/2024/PartnerBadgeClickable.svg" 
                alt={t('contact.partners.google_badge_alt')} 
                loading="lazy" 
              />
            </a>
          </div>
        </div>
        
        <div className="footer-links">
          <div className="footer-column">
            <h4>{t('footer.nav_title')}</h4>
            <ul>
              <li><Link to="/">{t('footer.nav_home')}</Link></li>
              <li><Link to="/#services">{t('nav.services')}</Link></li>
              <li><Link to="/#about">{t('nav.about')}</Link></li>
              <li><Link to="/#articles">{t('nav.articles')}</Link></li>
              <li><Link to="/#contact">{t('nav.contact')}</Link></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>{t('footer.resources_title')}</h4>
            <ul>
              <li>
                <a
                  href="https://blog.mdmcmusicads.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('footer.resources_blog')}
                </a>
              </li>
              <li>
                <button 
                  type="button" 
                  className="btn-link-style" 
                  onClick={handleSimulatorClick}
                >
                  {t('footer.resources_simulator')}
                </button>
              </li>
              <li><Link to="/faq">{t('footer.resources_faq')}</Link></li>
              <li><a href="#">{t('footer.resources_glossary')}</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h4>{t('footer.legal_title')}</h4>
            <ul>
              <li><Link to="/privacy">{t('footer.legal_privacy')}</Link></li>
              <li><Link to="/terms">{t('footer.legal_terms')}</Link></li>
              <li><Link to="/cookies">{t('footer.legal_cookies')}</Link></li>
              <li><Link to="/legal">{t('footer.legal_mentions')}</Link></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {currentYear} {t('footer.copyright')}</p>
      </div>
    </footer>
  );
};

export default Footer;
