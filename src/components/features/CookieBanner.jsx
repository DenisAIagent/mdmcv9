import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '../../assets/styles/cookieBanner.css';

const CookieBanner = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookieSettings, setCookieSettings] = useState({
    essential: true, // Toujours requis
    analytics: false,
    marketing: false,
    functional: false
  });

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà donné son consentement
    const consent = localStorage.getItem('cookieConsent');

    if (!consent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else {
      // Charger les préférences existantes
      try {
        const savedConsent = JSON.parse(consent);
        setCookieSettings({
          essential: true,
          analytics: savedConsent.analytics || false,
          marketing: savedConsent.marketing || false,
          functional: savedConsent.functional || false
        });
      } catch (error) {
        console.error('Erreur lors du parsing des préférences cookies:', error);
      }
    }
  }, []);

  const saveConsent = (settings) => {
    const consent = {
      ...settings,
      essential: true, // Toujours vrai
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    localStorage.setItem('cookieConsent', JSON.stringify(consent));

    // Initialiser ou supprimer les services en fonction des préférences
    if (settings.analytics) {
      // Initialiser Google Analytics si configuré
      console.log('Analytics activés');
    }

    if (settings.marketing) {
      // Initialiser pixels marketing si configurés
      console.log('Marketing cookies activés');
    }

    if (settings.functional) {
      // Initialiser services fonctionnels
      console.log('Cookies fonctionnels activés');
    }

    setIsVisible(false);
    setShowSettings(false);
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    };
    setCookieSettings(allAccepted);
    saveConsent(allAccepted);
  };

  const acceptOnlyEssential = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    };
    setCookieSettings(onlyEssential);
    saveConsent(onlyEssential);
  };

  const openSettings = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };

  const handleSettingChange = (category, value) => {
    if (category === 'essential') return; // Ne peut pas être désactivé

    setCookieSettings(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const saveCustomSettings = () => {
    saveConsent(cookieSettings);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Bannière principale */}
      <div className="cookie-banner">
        <div className="cookie-content">
          <div className="cookie-text">
            <h3>🍪 Gestion des cookies</h3>
            <p>{t('cookies.message')}</p>
          </div>
          <div className="cookie-buttons">
            <button
              type="button"
              className="btn btn-outline"
              onClick={acceptOnlyEssential}
            >
              {t('cookies.decline')}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={openSettings}
            >
              {t('cookies.settings')}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={acceptAll}
            >
              {t('cookies.accept')}
            </button>
          </div>
        </div>
      </div>

      {/* Modal des paramètres */}
      {showSettings && (
        <div className="cookie-modal-overlay" onClick={closeSettings}>
          <div className="cookie-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cookie-modal-header">
              <h2>Paramètres des cookies</h2>
              <button
                type="button"
                className="cookie-modal-close"
                onClick={closeSettings}
                aria-label="Fermer"
              >
                ×
              </button>
            </div>

            <div className="cookie-modal-content">
              <p>
                Nous utilisons des cookies pour améliorer votre expérience.
                Choisissez les catégories que vous souhaitez autoriser :
              </p>

              <div className="cookie-categories">
                {/* Cookies essentiels */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <label className="cookie-toggle">
                      <input
                        type="checkbox"
                        checked={true}
                        disabled={true}
                      />
                      <span className="toggle-slider disabled"></span>
                      <strong>Cookies essentiels</strong>
                    </label>
                  </div>
                  <p className="cookie-category-description">
                    Nécessaires au fonctionnement du site. Ces cookies ne peuvent pas être désactivés.
                  </p>
                </div>

                {/* Cookies d'analyse */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <label className="cookie-toggle">
                      <input
                        type="checkbox"
                        checked={cookieSettings.analytics}
                        onChange={(e) => handleSettingChange('analytics', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                      <strong>Cookies d'analyse</strong>
                    </label>
                  </div>
                  <p className="cookie-category-description">
                    Nous aident à comprendre comment vous utilisez notre site pour l'améliorer.
                  </p>
                </div>

                {/* Cookies marketing */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <label className="cookie-toggle">
                      <input
                        type="checkbox"
                        checked={cookieSettings.marketing}
                        onChange={(e) => handleSettingChange('marketing', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                      <strong>Cookies marketing</strong>
                    </label>
                  </div>
                  <p className="cookie-category-description">
                    Utilisés pour vous proposer des publicités personnalisées et mesurer leur efficacité.
                  </p>
                </div>

                {/* Cookies fonctionnels */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <label className="cookie-toggle">
                      <input
                        type="checkbox"
                        checked={cookieSettings.functional}
                        onChange={(e) => handleSettingChange('functional', e.target.checked)}
                      />
                      <span className="toggle-slider"></span>
                      <strong>Cookies fonctionnels</strong>
                    </label>
                  </div>
                  <p className="cookie-category-description">
                    Permettent d'améliorer les fonctionnalités et la personnalisation du site.
                  </p>
                </div>
              </div>
            </div>

            <div className="cookie-modal-footer">
              <button
                type="button"
                className="btn btn-outline"
                onClick={acceptOnlyEssential}
              >
                Refuser tout
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={saveCustomSettings}
              >
                Enregistrer mes préférences
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={acceptAll}
              >
                Accepter tout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieBanner;