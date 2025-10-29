import puppeteer from 'puppeteer';
import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distDir = path.resolve(__dirname, '../dist');
const PORT = 8080;

const routes = [
  '/',
  '/services',
  // Legacy services paths (garder pour compat)
  '/services/youtube-ads',
  '/services/meta-ads',
  '/services/tiktok-ads',
  '/services/smartlinks',
  // Landing pages actuelles
  '/youtube-ads',
  '/meta-ads',
  '/spotify-ads',
  '/faq',
  '/contact'
];

function startServer() {
  return new Promise((resolve) => {
    const app = express();

    // Servir les fichiers statiques
    app.use(express.static(distDir));

    // Toutes les routes retournent index.html (SPA)
    app.get('*', (req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });

    const server = app.listen(PORT, () => {
      console.log(`🌐 Server started on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerender() {
  console.log('🚀 Starting prerendering...');

  let server;
  let browser;

  try {
    server = await startServer();

    browser = await puppeteer.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--disable-web-security',
        '--disable-features=VizDisplayCompositor',
        '--disable-extensions',
        '--disable-plugins',
        '--disable-default-apps',
        '--disable-sync',
        '--no-zygote',
        '--single-process'
      ]
    });
  } catch (error) {
    console.error('❌ Failed to launch browser:', error.message);
    console.log('⚠️  Skipping prerendering - will use client-side rendering');
    if (server) server.close();
    return;
  }

  const page = await browser.newPage();

  for (const route of routes) {
    try {
      console.log(`📄 Prerendering ${route}...`);

      const url = `http://localhost:${PORT}${route}`;
      await page.goto(url, {
        waitUntil: 'networkidle0',
        timeout: 30000
      });

      // Attendre que React soit chargé et que le contenu soit rendu
      await page.waitForFunction(() => {
        const root = document.querySelector('#root');
        return root && root.children.length > 0;
      }, { timeout: 15000 });

      // Attendre un peu plus pour s'assurer que tout est rendu
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Extraire le HTML rendu
      const html = await page.content();

      // Créer le dossier pour cette route si nécessaire
      const routePath = route === '/' ? '/index.html' : `${route}/index.html`;
      const fullPath = path.join(distDir, routePath);
      const dirPath = path.dirname(fullPath);

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      // Sauvegarder le HTML rendu
      fs.writeFileSync(fullPath, html);
      console.log(`✅ ${route} -> ${fullPath}`);

    } catch (error) {
      console.error(`❌ Error prerendering ${route}:`, error.message);
    }
  }

  try {
    await browser.close();
    server.close();
    console.log('🎉 Prerendering completed!');
  } catch (error) {
    console.error('❌ Error during cleanup:', error.message);
    if (server) server.close();
  }
}

prerender().catch((error) => {
  console.error('❌ Prerendering failed:', error.message);
  console.log('⚠️  Build will continue with client-side rendering');
  process.exit(0); // Exit with success to not break the build
});