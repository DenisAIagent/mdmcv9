import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import LanguageSelector from '../common/LanguageSelector';
// Assurez-vous que le chemin vers le CSS est correct
import '../../assets/styles/header.css';

const Header = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Vérifier si on est sur la page d'accueil
  const isHomePage = location.pathname === '/';

  // Gestion du scroll pour changer l'apparence du header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Fermer le menu mobile lors du clic sur un lien
  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <div className="logo">
          <Link to="/" aria-label="MDMC - Retour à l'accueil">
            {/* Logo optimisé WebP avec fallback */}
            <picture>
              <source srcSet="/assets/images/logo.webp" type="image/webp" />
              <img src="/assets/images/logo.png" alt="MDMC Logo" width="200" height="60" />
            </picture>
          </Link>
        </div>

        <nav className="nav-desktop">
          <ul>
            <li>
              {isHomePage ? (
                <a href="#hero" onClick={handleNavLinkClick}>{t('nav.home')}</a>
              ) : (
                <Link to="/" onClick={handleNavLinkClick}>{t('nav.home')}</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#services" onClick={handleNavLinkClick}>{t('nav.services')}</a>
              ) : (
                <Link to="/#services" onClick={handleNavLinkClick}>{t('nav.services')}</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#about" onClick={handleNavLinkClick}>{t('nav.about')}</a>
              ) : (
                <Link to="/#about" onClick={handleNavLinkClick}>{t('nav.about')}</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#articles" onClick={handleNavLinkClick}>{t('nav.articles')}</a>
              ) : (
                <Link to="/#articles" onClick={handleNavLinkClick}>{t('nav.articles')}</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#contact" onClick={handleNavLinkClick}>{t('nav.contact')}</a>
              ) : (
                <Link to="/#contact" onClick={handleNavLinkClick}>{t('nav.contact')}</Link>
              )}
            </li>
            <li><LanguageSelector /></li>
          </ul>
        </nav>

        <button
          className={`hamburger-menu ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-mobile ${isMobileMenuOpen ? 'active' : ''}`}>
          <ul>
            <li>
              {isHomePage ? (
                <a href="#hero" onClick={handleNavLinkClick}>{t('nav.home')}</a>
              ) : (
                <Link to="/" onClick={handleNavLinkClick}>{t('nav.home')}</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#services" onClick={handleNavLinkClick}>{t('nav.services')}</a>
              ) : (
                <Link to="/#services" onClick={handleNavLinkClick}>{t('nav.services')}</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#about" onClick={handleNavLinkClick}>{t('nav.about')}</a>
              ) : (
                <Link to="/#about" onClick={handleNavLinkClick}>{t('nav.about')}</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#articles" onClick={handleNavLinkClick}>{t('nav.articles')}</a>
              ) : (
                <Link to="/#articles" onClick={handleNavLinkClick}>{t('nav.articles')}</Link>
              )}
            </li>
            <li>
              {isHomePage ? (
                <a href="#contact" onClick={handleNavLinkClick}>{t('nav.contact')}</a>
              ) : (
                <Link to="/#contact" onClick={handleNavLinkClick}>{t('nav.contact')}</Link>
              )}
            </li>
            <li className="mobile-language-selector-container">
              <LanguageSelector />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
