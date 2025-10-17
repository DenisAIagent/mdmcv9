import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import SEOHead from '../SEO/Head';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../../assets/styles/legal.css';

const Terms = () => {
  const { t } = useTranslation();

  return (
    <>
      <SEOHead
        title="Conditions d'Utilisation | MDMC Music Ads"
        description="Conditions générales d'utilisation des services MDMC Music Ads pour le marketing musical."
      />
      <Header />
      <main className="legal-page">
        <div className="container">
          <div className="legal-header">
            <h1>Conditions Générales d'Utilisation</h1>
            <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          </div>

          <div className="legal-content">
            <section>
              <h2>1. Acceptation des conditions</h2>
              <p>
                En accédant et en utilisant le site web MDMC Music Ads, vous acceptez d'être lié par
                ces conditions d'utilisation. Si vous n'acceptez pas ces conditions, veuillez ne pas utiliser notre site.
              </p>
            </section>

            <section>
              <h2>2. Description des services</h2>
              <p>MDMC Music Ads propose des services de marketing digital pour l'industrie musicale, incluant :</p>
              <ul>
                <li>Création et gestion de campagnes YouTube Ads</li>
                <li>Création et gestion de campagnes Meta Ads (Facebook/Instagram)</li>
                <li>Création et gestion de campagnes TikTok Ads</li>
                <li>Consultation stratégique en marketing musical</li>
              </ul>
            </section>

            <section>
              <h2>3. Propriété intellectuelle</h2>
              <p>
                Tout le contenu présent sur ce site (textes, images, logos, vidéos) est la propriété
                exclusive de MDMC Music Ads et est protégé par les lois sur la propriété intellectuelle.
                Toute reproduction non autorisée est interdite.
              </p>
            </section>

            <section>
              <h2>4. Utilisation du simulateur</h2>
              <p>
                Le simulateur de campagne publicitaire fournit des estimations basées sur des moyennes du marché.
                Les résultats réels peuvent varier. MDMC Music Ads ne garantit pas l'exactitude des estimations.
              </p>
            </section>

            <section>
              <h2>5. Responsabilité</h2>
              <p>
                MDMC Music Ads s'efforce de fournir des informations exactes et à jour, mais ne garantit pas
                l'exactitude, la complétude ou la pertinence des informations fournies sur ce site.
                L'utilisation du site se fait à vos propres risques.
              </p>
            </section>

            <section>
              <h2>6. Services tiers</h2>
              <p>
                Nos services impliquent l'utilisation de plateformes tierces (Google Ads, Meta Ads, TikTok Ads).
                Nous ne sommes pas responsables des politiques ou pratiques de ces plateformes.
              </p>
            </section>

            <section>
              <h2>7. Tarification et paiement</h2>
              <p>
                Les tarifs de nos services sont communiqués sur devis personnalisé.
                Les conditions de paiement sont définies dans le contrat de service spécifique à chaque client.
              </p>
            </section>

            <section>
              <h2>8. Résiliation</h2>
              <p>
                MDMC Music Ads se réserve le droit de suspendre ou de résilier votre accès au site
                en cas de violation de ces conditions d'utilisation.
              </p>
            </section>

            <section>
              <h2>9. Modifications</h2>
              <p>
                MDMC Music Ads se réserve le droit de modifier ces conditions à tout moment.
                Les modifications entrent en vigueur dès leur publication sur le site.
              </p>
            </section>

            <section>
              <h2>10. Droit applicable</h2>
              <p>
                Ces conditions sont régies par le droit français. Tout litige sera soumis
                à la juridiction exclusive des tribunaux français.
              </p>
            </section>

            <section>
              <h2>11. Contact</h2>
              <p>
                Pour toute question concernant ces conditions, contactez-nous à :
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

export default Terms;