import { useEffect, useRef, createRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './App.css';
import './assets/styles/global.css';
import './assets/styles/animations.css';

// Import des composants
import SEOHead from './components/SEO/Head';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import About from './components/sections/About';
import Articles from './components/sections/Articles';
import Reviews from './components/sections/Reviews';
import FAQ from './components/sections/FAQ';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import Simulator from './components/features/Simulator';
import CookieBanner from './components/features/CookieBanner';
import AllReviews from './components/pages/AllReviews';
import FAQPage from './components/pages/FAQPage';
import PrivacyPolicy from './components/pages/PrivacyPolicy';
import Terms from './components/pages/Terms';
import CookiesPolicy from './components/pages/CookiesPolicy';
import LegalNotice from './components/pages/LegalNotice';
import BudgetGuide from './components/pages/BudgetGuide';
import BudgetGuideMeta from './components/pages/BudgetGuideMeta';
import BudgetGuideTikTok from './components/pages/BudgetGuideTikTok';
import ROIGuide from './components/pages/ROIGuide';
import KPIGuide from './components/pages/KPIGuide';
import ExpertiseHub from './components/pages/ExpertiseHub';
import YouTubeAdsLanding from './components/pages/YouTubeAdsLanding';
import MetaAdsLanding from './components/pages/MetaAdsLanding';
import AdminLogin from './components/admin/AdminLogin';
import AdminPanel from './components/admin/AdminPanel';

// Import de la configuration i18n
import { updateMetaTags } from './i18n';

// Composant pour la page d'accueil
const HomePage = ({ openSimulator }) => {
  // Animation des sections au défilement
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
      section.classList.add('section-fade-in');
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <>
      <SEOHead />
      <Header />
      <main>
        <Hero openSimulator={openSimulator} />
        <Services />
        <About />
        <Articles />
        <Reviews />
        <Contact />
        <FAQ />
      </main>
      <Footer openSimulator={openSimulator} />
      <CookieBanner />
    </>
  );
};

// Vérification de l'authentification pour les routes protégées
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = (() => {
    const token = localStorage.getItem('mdmc_admin_auth');

    // Invalider l'ancien système (string 'true')
    if (!token || token === 'true') {
      localStorage.removeItem('mdmc_admin_auth');
      return false;
    }

    try {
      // Vérifier si c'est un JWT valide
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      const payload = JSON.parse(atob(parts[1]));

      // Vérifier l'expiration
      if (payload.exp && payload.exp < Date.now() / 1000) {
        localStorage.removeItem('mdmc_admin_auth');
        return false;
      }

      // Vérifier l'issuer
      if (payload.iss !== 'mdmc-admin') {
        localStorage.removeItem('mdmc_admin_auth');
        return false;
      }

      return true;
    } catch (error) {
      localStorage.removeItem('mdmc_admin_auth');
      return false;
    }
  })();

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

function App() {
  const { t, i18n } = useTranslation();
  const simulatorRef = createRef();
  
  // Mise à jour des balises meta lors du changement de langue
  useEffect(() => {
    updateMetaTags(t);

    // Mise à jour de l'attribut lang de la balise html
    const lang = i18n.language.split('-')[0];
    document.documentElement.setAttribute('lang', lang);

    // Mise à jour de la balise meta og:locale
    const ogLocaleValue = i18n.language.replace('-', '_');
    const ogLocaleElement = document.querySelector('meta[property="og:locale"]');
    if (ogLocaleElement) {
      ogLocaleElement.setAttribute('content', ogLocaleValue);
    }

    // Signal pour le pre-rendering : DOM complètement chargé
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        document.dispatchEvent(new Event('render-complete'));
      }
    }, 1000); // Délai pour s'assurer que tout est chargé
  }, [t, i18n.language]);

  // Fonction pour ouvrir le simulateur
  const openSimulator = () => {
    if (simulatorRef.current) {
      simulatorRef.current.openSimulator();
    }
  };

  return (
    <HelmetProvider>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage openSimulator={openSimulator} />} />
        <Route path="/all-reviews" element={<AllReviews />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<CookiesPolicy />} />
        <Route path="/legal" element={<LegalNotice />} />
        <Route path="/guide-budget-youtube-ads" element={<BudgetGuide />} />
        <Route path="/guide-budget-meta-ads" element={<BudgetGuideMeta />} />
        <Route path="/guide-budget-tiktok-ads" element={<BudgetGuideTikTok />} />
        <Route path="/roi-marketing-musical" element={<ROIGuide />} />
        <Route path="/kpi-marketing-musical" element={<KPIGuide />} />
        <Route path="/expertise-marketing-musical" element={<ExpertiseHub />} />
        <Route path="/youtube-ads" element={<YouTubeAdsLanding openSimulator={openSimulator} />} />
        <Route path="/meta-ads" element={<MetaAdsLanding openSimulator={openSimulator} />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Simulator ref={simulatorRef} />
    </Router>
    </HelmetProvider>
  );
}

export default App;
