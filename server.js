import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import compression from 'compression';
import helmet from 'helmet';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware with strict CSP
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: [
        "'self'",
        "'unsafe-inline'", // Nécessaire pour les styles inline de React
        "https://fonts.googleapis.com"
      ],
      scriptSrc: [
        "'self'",
        "'unsafe-inline'", // Pour le script gtag inline
        "https://www.googletagmanager.com", // Google Tag Manager
        "https://www.google-analytics.com", // Google Analytics
        "https://elfsightcdn.com", // Elfsight Google Reviews
        "https://generativelanguage.googleapis.com" // Google Gemini API
      ],
      scriptSrcElem: [
        "'self'",
        "'unsafe-inline'", // Pour le script gtag inline
        "https://www.googletagmanager.com", // Google Tag Manager
        "https://www.google-analytics.com" // Google Analytics
      ],
      imgSrc: [
        "'self'",
        "data:",
        "https://www.gstatic.com", // Google services
        "https://www.google-analytics.com", // Google Analytics
        "https://www.googletagmanager.com", // Google Tag Manager
        "https://www.google.com", // Google CCM
        "https://featurable.com", // Partenaire
        "https://github.com", // Images GitHub
        "https://blog.mdmcmusicads.com", // Images du blog WordPress
        "https://lh3.googleusercontent.com", // Photos Google (avis)
        "https://elfsightcdn.com", // Images Elfsight
        "https://storage.elfsight.com" // Stockage Elfsight
      ],
      connectSrc: [
        "'self'",
        "https://www.google-analytics.com", // Google Analytics
        "https://analytics.google.com", // Google Analytics
        "https://region1.google-analytics.com", // Google Analytics Regional
        "https://www.googletagmanager.com", // Google Tag Manager
        "https://www.google.com", // Google CCM
        "https://blog.mdmcmusicads.com", // WordPress blog
        "https://maps.googleapis.com", // Google Maps
        "https://featurable.com", // API partenaire
        "https://generativelanguage.googleapis.com" // Google Gemini API
      ],
      fontSrc: [
        "'self'",
        "https://fonts.gstatic.com"
      ],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: [
        "'self'",
        "https://calendly.com" // Intégration Calendly
      ],
      baseUri: ["'self'"],
      formAction: ["'self'"],
      upgradeInsecureRequests: [],
    },
  },
  crossOriginEmbedderPolicy: false, // Désactiver COEP pour éviter les conflits
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  },
  noSniff: true,
  xssFilter: true,
  referrerPolicy: { policy: "strict-origin-when-cross-origin" }
}));

// Compression middleware
app.use(compression());

// Serve static files from dist directory
app.use(express.static(join(__dirname, 'dist')));

// Handle all routes - return index.html for SPA routing
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 MDMC Music Ads server running on port ${PORT}`);
});