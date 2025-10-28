# 🛡️ POLITIQUE DE PROTECTION CSS - SITE PRINCIPAL MDMC

## ⚠️ ATTENTION - ZONES PROTÉGÉES

**INTERDICTION STRICTE** de modifier les fichiers CSS du site principal sans accord explicite :

### 🚫 FICHIERS INTERDITS DE MODIFICATION

1. **`src/assets/styles/global.css`** - Styles globaux du site principal
2. **`src/assets/styles/variables.css`** - Variables CSS principales
3. **Tout fichier CSS qui n'est PAS explicitement nommé avec un préfixe de landing page**

### ✅ FICHIERS AUTORISÉS (Landing Pages uniquement)

- `src/assets/styles/meta-ads-landing.css` ✅
- `src/assets/styles/spotify-ads-landing.css` ✅
- `src/assets/styles/youtube-ads-landing.css` ✅ (si créé)
- Tout nouveau fichier CSS de landing page avec suffixe `-landing.css` ✅

## 📋 RÈGLES D'ISOLATION CSS

### 1. Isolation Obligatoire

**CHAQUE landing page DOIT :**
- Utiliser un wrapper CSS unique (`.meta-ads-page`, `.spotify-ads-page`, etc.)
- Scoper TOUS les sélecteurs avec ce wrapper
- Définir ses variables CSS localement dans le wrapper
- Ne jamais utiliser de sélecteurs globaux (`*`, `:root`, `body`, etc.)

### 2. Structure Obligatoire

```css
/* ✅ CORRECT - Isolation complète */
.landing-page-name {
  /* Variables locales */
  --color-primary: #1234;
  --color-secondary: #5678;
}

.landing-page-name * {
  /* Reset scoped */
}

.landing-page-name .container {
  /* Styles scoped */
}

.landing-page-name h1 {
  /* Tous les sélecteurs scoped */
}
```

```css
/* ❌ INTERDIT - Styles globaux */
:root {
  --color: red; /* Affecte tout le site */
}

* {
  margin: 0; /* Affecte tout le site */
}

h1 {
  color: blue; /* Affecte tout le site */
}
```

### 3. Composants React

**CHAQUE landing page DOIT :**
- Être wrappée dans une div avec la classe d'isolation
- Importer uniquement son CSS spécifique

```jsx
// ✅ CORRECT
const MetaAdsLanding = () => {
  return (
    <div className="meta-ads-page">
      {/* Tout le contenu ici */}
    </div>
  );
};
```

## 🔍 VÉRIFICATIONS OBLIGATOIRES

Avant toute modification CSS :

1. **Identifier la portée** : Landing page ou site principal ?
2. **Vérifier l'isolation** : Tous les sélecteurs sont-ils scoped ?
3. **Tester l'impact** : Le site principal est-il affecté ?
4. **Valider les couleurs** : Les textes blancs restent-ils blancs ?

## 🚨 SIGNALEMENT DES VIOLATIONS

Si des couleurs inattendues apparaissent sur le site principal :

1. **Arrêter immédiatement** toute modification
2. **Identifier la source** du CSS problématique
3. **Corriger l'isolation** en scoping les sélecteurs
4. **Valider la correction** sur tout le site

## 📞 CONTACT D'URGENCE

En cas de problème CSS critique :
- **Signal immédiat** : "il y a des textes en [couleur] !"
- **Action immédiate** : Isolation stricte requise
- **Validation** : Vérification complète du site principal

## 🎯 OBJECTIF

**Maintenir l'intégrité visuelle du site principal** tout en permettant la personnalisation des landing pages.

**SITE PRINCIPAL = BLANC**
**LANDING PAGES = COULEURS SPÉCIFIQUES**

---

**Date de création** : 28 octobre 2025
**Dernière mise à jour** : 28 octobre 2025
**Statut** : ACTIF - APPLICATION OBLIGATOIRE