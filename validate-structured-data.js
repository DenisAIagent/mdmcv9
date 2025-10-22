// Script de validation des données structurées
// Utiliser avec : node validate-structured-data.js

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Validation des données structurées...\n');

// Fichiers à vérifier
const filesToCheck = [
  'src/components/sections/Reviews.jsx',
  'src/components/sections/FAQ.jsx',
  'src/components/SEO/Head.jsx'
];

let hasErrors = false;

// Vérification du schema Review
console.log('📝 Vérification du schema Review...');
const reviewsContent = fs.readFileSync(path.join(__dirname, 'src/components/sections/Reviews.jsx'), 'utf8');

// Vérifier itemReviewed
if (!reviewsContent.includes('"itemReviewed"')) {
  console.log('❌ Erreur: "itemReviewed" manquant dans Reviews.jsx');
  hasErrors = true;
} else {
  console.log('✅ "itemReviewed" présent');
}

// Vérifier name dans review
if (!reviewsContent.includes('"name": `Avis de')) {
  console.log('❌ Erreur: "name" manquant dans le schema Review');
  hasErrors = true;
} else {
  console.log('✅ "name" présent dans Review');
}

console.log('\n📋 Vérification du schema FAQ...');
const faqContent = fs.readFileSync(path.join(__dirname, 'src/components/sections/FAQ.jsx'), 'utf8');

// Vérifier qu'il n'y a pas de duplication FAQPage (ignorer les commentaires)
const faqPageInSchema = (faqContent.match(/"@type":\s*"FAQPage"/g) || []).length;
const faqPageInHTML = (faqContent.match(/itemType=.*FAQPage/g) || []).length;
const totalFaqPage = faqPageInSchema + faqPageInHTML;

if (totalFaqPage > 1) {
  console.log(`❌ Erreur: FAQPage apparaît ${totalFaqPage} fois (duplication détectée)`);
  console.log(`   - Dans schema JSON-LD: ${faqPageInSchema}`);
  console.log(`   - Dans HTML microdata: ${faqPageInHTML}`);
  hasErrors = true;
} else {
  console.log('✅ Pas de duplication FAQPage');
}

// Vérifier acceptedAnswer
if (!faqContent.includes('"acceptedAnswer"')) {
  console.log('❌ Erreur: "acceptedAnswer" manquant dans FAQ');
  hasErrors = true;
} else {
  console.log('✅ "acceptedAnswer" présent');
}

// Vérifier qu'il n'y a pas de microdata HTML
if (faqContent.includes('itemType="https://schema.org/FAQPage"')) {
  console.log('❌ Erreur: Microdata HTML détecté (duplication avec JSON-LD)');
  hasErrors = true;
} else {
  console.log('✅ Pas de microdata HTML (uniquement JSON-LD)');
}

// Résumé
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ Des erreurs ont été détectées. Veuillez les corriger.');
  process.exit(1);
} else {
  console.log('✅ Toutes les données structurées sont correctes !');
  console.log('\n📌 Prochaines étapes :');
  console.log('1. Déployer les changements');
  console.log('2. Utiliser l\'outil de test des données structurées de Google');
  console.log('   https://search.google.com/test/rich-results');
  console.log('3. Attendre 24-48h pour la revalidation dans Search Console');
}