import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../SEO/Head';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import '../../assets/styles/legal.css';

const LegalNotice = () => {
  return (
    <>
      <SEOHead
        title="Mentions Légales | MDMC Music Ads"
        description="Mentions légales et informations juridiques de MDMC Music Ads - MDMC OÜ."
      />
      <Header />
      <main className="legal-page">
        <div className="container">
          <div className="legal-header">
            <h1>Mentions Légales</h1>
            <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          </div>

          <div className="legal-content">
            <section>
              <h2>1. Éditeur du site</h2>
              <p><strong>Raison sociale :</strong> MDMC OÜ</p>
              <p><strong>Forme juridique :</strong> Société à responsabilité limitée de droit estonien</p>
              <p><strong>Capital social :</strong> 2 500 EUR</p>
              <p><strong>Numéro d'immatriculation :</strong> 16227615</p>
              <p><strong>TVA intracommunautaire :</strong> EE102477612</p>
            </section>

            <section>
              <h2>2. Siège social</h2>
              <p>
                <strong>Adresse :</strong><br />
                Harju maakond, Tallinn<br />
                Lasnamäe linnaosa<br />
                Sepapaja tn 6<br />
                15551 Tallinn<br />
                Estonie
              </p>
            </section>

            <section>
              <h2>3. Directeur de la publication</h2>
              <p><strong>Nom :</strong> Denis ADAM</p>
              <p><strong>Qualité :</strong> Gérant</p>
            </section>

            <section>
              <h2>4. Contact</h2>
              <p><strong>Email :</strong> <a href="mailto:contact@mdmcmusicads.com">contact@mdmcmusicads.com</a></p>
              <p><strong>Site web :</strong> <a href="https://www.mdmcmusicads.com">www.mdmcmusicads.com</a></p>
            </section>

            <section>
              <h2>5. Hébergement</h2>
              <p>
                Ce site est hébergé par :<br />
                <strong>Railway Corporation</strong><br />
                Service de déploiement cloud<br />
                Pour plus d'informations : <a href="https://railway.app" target="_blank" rel="noopener noreferrer">railway.app</a>
              </p>
            </section>

            <section>
              <h2>6. Propriété intellectuelle</h2>
              <p>
                L'ensemble de ce site relève de la législation française et internationale sur le droit d'auteur
                et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour
                les documents téléchargeables et les représentations iconographiques et photographiques.
              </p>
              <p>
                La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit
                est formellement interdite sauf autorisation expresse du directeur de la publication.
              </p>
            </section>

            <section>
              <h2>7. Responsabilité</h2>
              <p>
                Les informations fournies sur ce site le sont à titre indicatif. MDMC OÜ ne saurait garantir
                l'exactitude, la complétude, l'actualité des informations diffusées sur son site.
              </p>
              <p>
                En conséquence, l'utilisateur reconnaît utiliser ces informations sous sa responsabilité exclusive.
              </p>
            </section>

            <section>
              <h2>8. Données personnelles</h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez d'un droit
                d'accès, de rectification, d'effacement et de portabilité de vos données personnelles.
              </p>
              <p>
                Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@mdmcmusicads.com">contact@mdmcmusicads.com</a>
              </p>
              <p>
                Pour plus d'informations, consultez notre <Link to="/privacy">Politique de Confidentialité</Link>.
              </p>
            </section>

            <section>
              <h2>9. Cookies</h2>
              <p>
                Ce site utilise des cookies pour améliorer l'expérience utilisateur.
                Pour en savoir plus, consultez notre <Link to="/cookies">Politique des Cookies</Link>.
              </p>
            </section>

            <section>
              <h2>10. Droit applicable</h2>
              <p>
                Les présentes mentions légales sont régies par le droit français et européen.
                En cas de litige, les tribunaux français seront seuls compétents.
              </p>
            </section>

            <section>
              <h2>11. Crédits</h2>
              <p>
                <strong>Conception et développement :</strong> MDMC OÜ<br />
                <strong>Design graphique :</strong> MDMC OÜ<br />
                <strong>Technologies utilisées :</strong> React, Node.js, Vite
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

export default LegalNotice;