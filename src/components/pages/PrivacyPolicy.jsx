import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../SEO/Head';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../../assets/styles/legal.css';

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead
        title="Politique de Confidentialité | MDMC Music Ads"
        description="Découvrez comment MDMC Music Ads protège vos données personnelles et respecte votre vie privée."
      />
      <Header />
      <main className="legal-page">
        <div className="container">
          <div className="legal-header">
            <h1>Politique de Confidentialité</h1>
            <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          </div>

          <div className="legal-content">
            <section>
              <h2>1. Introduction</h2>
              <p>
                MDMC Music Ads s'engage à protéger la confidentialité des visiteurs de son site web.
                Cette politique de confidentialité décrit comment nous collectons, utilisons et protégeons vos informations.
              </p>
            </section>

            <section>
              <h2>2. Collecte d'informations</h2>
              <p>Nous collectons les informations suivantes :</p>
              <ul>
                <li>Informations de contact (nom, email) via nos formulaires</li>
                <li>Données de navigation (cookies, adresse IP)</li>
                <li>Informations sur votre projet musical (via le simulateur)</li>
              </ul>
            </section>

            <section>
              <h2>3. Utilisation des informations</h2>
              <p>Les informations collectées sont utilisées pour :</p>
              <ul>
                <li>Répondre à vos demandes de contact</li>
                <li>Fournir nos services de marketing musical</li>
                <li>Améliorer notre site web et nos services</li>
                <li>Envoyer des informations marketing (avec votre consentement)</li>
              </ul>
            </section>

            <section>
              <h2>4. Protection des données</h2>
              <p>
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles
                pour protéger vos données personnelles contre tout accès non autorisé,
                modification, divulgation ou destruction.
              </p>
            </section>

            <section>
              <h2>5. Cookies</h2>
              <p>
                Notre site utilise des cookies pour améliorer votre expérience.
                Consultez notre <Link to="/cookies">Politique des Cookies</Link> pour plus d'informations.
              </p>
            </section>

            <section>
              <h2>6. Partage des informations</h2>
              <p>
                Nous ne vendons, n'échangeons ni ne louons vos informations personnelles à des tiers.
                Nous pouvons partager vos informations uniquement avec :
              </p>
              <ul>
                <li>Google Ads et Meta Ads pour la gestion de vos campagnes</li>
                <li>Nos partenaires techniques nécessaires à la fourniture du service</li>
              </ul>
            </section>

            <section>
              <h2>7. Vos droits</h2>
              <p>Conformément au RGPD, vous disposez des droits suivants :</p>
              <ul>
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition</li>
              </ul>
            </section>

            <section>
              <h2>8. Contact</h2>
              <p>
                Pour toute question concernant cette politique de confidentialité,
                contactez-nous à : <a href="mailto:contact@mdmcmusicads.com">contact@mdmcmusicads.com</a>
              </p>
            </section>
          </div>

          <div className="legal-footer">
            <Link to="/" className="btn btn-secondary">Retour à l'accueil</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;