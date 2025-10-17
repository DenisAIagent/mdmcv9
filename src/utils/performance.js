/**
 * Utilitaires pour optimiser les performances web
 */

/**
 * Observer pour lazy loading d'images avec intersection observer
 */
export const createLazyImageObserver = () => {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;

        // Charger l'image
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }

        // Charger le srcSet si présent
        if (img.dataset.srcset) {
          img.srcSet = img.dataset.srcset;
          img.removeAttribute('data-srcset');
        }

        // Ajouter la classe loaded pour les animations CSS
        img.classList.add('loaded');

        // Arrêter d'observer cette image
        observer.unobserve(img);
      }
    });
  }, {
    root: null,
    rootMargin: '50px', // Charger 50px avant que l'image soit visible
    threshold: 0.1
  });

  return imageObserver;
};

/**
 * Optimise le chargement d'une image critique pour le LCP
 */
export const optimizeLCPImage = (imageElement) => {
  if (!imageElement) return;

  // Ajouter des attributs pour optimiser le chargement
  imageElement.setAttribute('fetchpriority', 'high');
  imageElement.setAttribute('decoding', 'sync');

  // Forcer le chargement immédiat
  if (imageElement.loading) {
    imageElement.loading = 'eager';
  }
};

/**
 * Précharge les images critiques
 */
export const preloadCriticalImages = (imageSources) => {
  imageSources.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

/**
 * Mesure et log les Core Web Vitals
 */
export const measureCoreWebVitals = () => {
  if (typeof window === 'undefined') return;

  // Mesurer le LCP
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  } catch (e) {
    console.log('LCP measurement not supported');
  }

  // Mesurer le FCP
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        console.log('FCP:', entry.startTime);
      });
    });
    observer.observe({ entryTypes: ['paint'] });
  } catch (e) {
    console.log('FCP measurement not supported');
  }

  // Mesurer le CLS
  try {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      console.log('CLS:', clsValue);
    });
    observer.observe({ entryTypes: ['layout-shift'] });
  } catch (e) {
    console.log('CLS measurement not supported');
  }
};

/**
 * Optimise le rendu critique
 */
export const optimizeCriticalRender = () => {
  // Éviter les reflows pendant le chargement initial
  document.body.style.visibility = 'hidden';

  // Rendre visible une fois que tout est chargé
  window.addEventListener('load', () => {
    document.body.style.visibility = 'visible';
  });

  // Fallback au cas où l'événement load ne se déclenche pas
  setTimeout(() => {
    document.body.style.visibility = 'visible';
  }, 3000);
};

/**
 * Defer des scripts non critiques
 */
export const deferNonCriticalScripts = () => {
  // Différer les scripts de tracking
  const scripts = document.querySelectorAll('script[data-defer]');
  scripts.forEach(script => {
    const newScript = document.createElement('script');
    newScript.src = script.src;
    newScript.defer = true;
    script.parentNode.replaceChild(newScript, script);
  });
};