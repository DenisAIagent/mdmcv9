import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../SEO/Head';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../../assets/styles/legal.css';

const CookiesPolicy = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead
        title="Politique des Cookies | MDMC Music Ads"
        description="Informations sur l'utilisation des cookies sur le site MDMC Music Ads."
      />
      <Header />
      <main className="legal-page">
        <div className="container">
          <div className="legal-header">
            <h1>Politique des Cookies</h1>
            <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          </div>

          <div className="legal-content">
            <section>
              <h2>1. Qu'est-ce qu'un cookie ?</h2>
              <p>
                Un cookie est un petit fichier texte déposé sur votre ordinateur lors de la visite d'un site web.
                Il permet au site de mémoriser des informations sur votre visite pour améliorer votre expérience.
              </p>
            </section>

            <section>
              <h2>2. Comment utilisons-nous les cookies ?</h2>
              <p>MDMC Music Ads utilise des cookies pour :</p>
              <ul>
                <li>Mémoriser vos préférences de langue</li>
                <li>Analyser le trafic de notre site (Google Analytics)</li>
                <li>Améliorer les performances du site</li>
                <li>Personnaliser votre expérience utilisateur</li>
              </ul>
            </section>

            <section>
              <h2>3. Types de cookies utilisés</h2>

              <h3>Cookies strictement nécessaires</h3>
              <p>Ces cookies sont essentiels au fonctionnement du site :</p>
              <ul>
                <li>Session cookies : pour maintenir votre session active</li>
                <li>Préférences cookies : pour mémoriser vos choix</li>
              </ul>

              <h3>Cookies analytiques</h3>
              <p>Nous utilisons Google Analytics pour comprendre comment les visiteurs utilisent notre site :</p>
              <ul>
                <li>_ga : distingue les utilisateurs uniques</li>
                <li>_gid : distingue les utilisateurs uniques</li>
                <li>_gat : limite le taux de requêtes</li>
              </ul>

              <h3>Cookies marketing</h3>
              <p>Ces cookies nous aident à mesurer l'efficacité de nos campagnes :</p>
              <ul>
                <li>Google Ads : pour le remarketing</li>
                <li>Facebook Pixel : pour le suivi des conversions</li>
              </ul>
            </section>

            <section>
              <h2>4. Durée de conservation</h2>
              <p>
                Les cookies de session sont supprimés à la fermeture du navigateur.
                Les cookies persistants sont conservés pour une durée maximale de 13 mois.
              </p>
            </section>

            <section>
              <h2>5. Comment gérer les cookies ?</h2>
              <p>
                Vous pouvez gérer vos préférences de cookies via la bannière qui s'affiche lors de votre première visite.
                Vous pouvez également configurer votre navigateur pour refuser tous les cookies.
              </p>
              <p>
                Notez que le refus de certains cookies peut affecter votre expérience sur notre site.
              </p>
            </section>

            <section>
              <h2>6. Cookies tiers</h2>
              <p>
                Certains cookies sont déposés par des services tiers (Google, Facebook).
                Nous n'avons pas le contrôle sur ces cookies. Consultez leurs politiques respectives :
              </p>
              <ul>
                <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Politique de confidentialité Google</a></li>
                <li><a href="https://www.facebook.com/policy/cookies" target="_blank" rel="noopener noreferrer">Politique cookies Facebook</a></li>
              </ul>
            </section>

            <section>
              <h2>7. Modifications</h2>
              <p>
                Nous pouvons mettre à jour cette politique de temps à autre.
                Les modifications seront publiées sur cette page.
              </p>
            </section>

            <section>
              <h2>8. Contact</h2>
              <p>
                Pour toute question concernant les cookies, contactez-nous :
                <a href="mailto:contact@mdmcmusicads.com"> contact@mdmcmusicads.com</a>
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

export default CookiesPolicy;