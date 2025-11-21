import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import apiService from '../../services/api.service';
import '../../assets/styles/simulator.css';

// Liens Calendly pour chaque plateforme
const CALENDLY_LINKS = {
  meta: "https://calendly.com/mhl-agency/decouverte?month=2025-04",
  tiktok: "https://calendly.com/mhl-agency/decouverte?month=2025-04",
  youtube: "https://calendly.com/denis-mdmcmusicads/30min",
  spotify: "https://calendly.com/denis-mdmcmusicads/30min" // Ajout lien Spotify
};

// Données de coût pour les différentes combinaisons
const COST_DATA = {
  youtube: {
    usa: {
      awareness: { min: 0.02, max: 0.06, unit: "CPV" },
      engagement: { min: 0.05, max: 0.10, unit: "CPV" },
      conversion: { min: 0.10, max: 0.20, unit: "CPV" }
    },
    canada: {
      awareness: { min: 0.01, max: 0.05, unit: "CPV" },
      engagement: { min: 0.04, max: 0.08, unit: "CPV" },
      conversion: { min: 0.08, max: 0.15, unit: "CPV" }
    },
    europe: {
      awareness: { min: 0.01, max: 0.04, unit: "CPV" },
      engagement: { min: 0.03, max: 0.07, unit: "CPV" },
      conversion: { min: 0.05, max: 0.12, unit: "CPV" }
    },
    south_america: {
      awareness: { min: 0.005, max: 0.02, unit: "CPV" },
      engagement: { min: 0.01, max: 0.05, unit: "CPV" },
      conversion: { min: 0.02, max: 0.08, unit: "CPV" }
    },
    asia: {
      awareness: { min: 0.005, max: 0.03, unit: "CPV" },
      engagement: { min: 0.01, max: 0.06, unit: "CPV" },
      conversion: { min: 0.02, max: 0.10, unit: "CPV" }
    }
  },
  meta: {
    usa: {
      awareness: { min: 3, max: 8, unit: "CPM" },
      engagement: { min: 8, max: 15, unit: "CPM" },
      conversion: { min: 15, max: 30, unit: "CPM" }
    },
    canada: {
      awareness: { min: 2, max: 6, unit: "CPM" },
      engagement: { min: 6, max: 12, unit: "CPM" },
      conversion: { min: 10, max: 20, unit: "CPM" }
    },
    europe: {
      awareness: { min: 1.5, max: 5, unit: "CPM" },
      engagement: { min: 5, max: 10, unit: "CPM" },
      conversion: { min: 8, max: 15, unit: "CPM" }
    },
    south_america: {
      awareness: { min: 0.5, max: 3, unit: "CPM" },
      engagement: { min: 2, max: 6, unit: "CPM" },
      conversion: { min: 3, max: 8, unit: "CPM" }
    },
    asia: {
      awareness: { min: 1, max: 4, unit: "CPM" },
      engagement: { min: 3, max: 7, unit: "CPM" },
      conversion: { min: 5, max: 10, unit: "CPM" }
    }
  },
  tiktok: {
    usa: {
      awareness: { min: 10, max: 50, unit: "CPM" },
      engagement: { min: 15, max: 60, unit: "CPM" },
      conversion: { min: 20, max: 80, unit: "CPM" }
    },
    canada: {
      awareness: { min: 8, max: 40, unit: "CPM" },
      engagement: { min: 12, max: 50, unit: "CPM" },
      conversion: { min: 15, max: 70, unit: "CPM" }
    },
    europe: {
      awareness: { min: 10, max: 50, unit: "CPM" },
      engagement: { min: 15, max: 55, unit: "CPM" },
      conversion: { min: 20, max: 70, unit: "CPM" }
    },
    south_america: {
      awareness: { min: 3, max: 15, unit: "CPM" },
      engagement: { min: 5, max: 20, unit: "CPM" },
      conversion: { min: 8, max: 30, unit: "CPM" }
    },
    asia: {
      awareness: { min: 2, max: 10, unit: "CPM" },
      engagement: { min: 4, max: 15, unit: "CPM" },
      conversion: { min: 5, max: 25, unit: "CPM" }
    }
  },
  // Ajout des données Spotify (Coût par Stream - CPS)
  spotify: {
    europe: {
      rap: { min: 0.12, max: 0.18, unit: "CPS" },
      pop: { min: 0.15, max: 0.22, unit: "CPS" },
      electro: { min: 0.09, max: 0.15, unit: "CPS" },
      rock: { min: 0.08, max: 0.14, unit: "CPS" }
    },
    usa: {
      rap: { min: 0.25, max: 0.40, unit: "CPS" },
      pop: { min: 0.30, max: 0.50, unit: "CPS" },
      electro: { min: 0.20, max: 0.30, unit: "CPS" },
      rock: { min: 0.18, max: 0.25, unit: "CPS" }
    },
    canada: {
      rap: { min: 0.20, max: 0.30, unit: "CPS" },
      pop: { min: 0.25, max: 0.35, unit: "CPS" },
      electro: { min: 0.15, max: 0.22, unit: "CPS" },
      rock: { min: 0.15, max: 0.20, unit: "CPS" }
    },
    south_america: {
      rap: { min: 0.02, max: 0.05, unit: "CPS" },
      pop: { min: 0.03, max: 0.06, unit: "CPS" },
      electro: { min: 0.01, max: 0.03, unit: "CPS" },
      rock: { min: 0.02, max: 0.04, unit: "CPS" }
    },
    asia: {
      rap: { min: 0.03, max: 0.06, unit: "CPS" },
      pop: { min: 0.04, max: 0.08, unit: "CPS" },
      electro: { min: 0.02, max: 0.04, unit: "CPS" },
      rock: { min: 0.02, max: 0.05, unit: "CPS" }
    }
  }
};

const Simulator = forwardRef((props, ref) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    platform: '',
    genre: '', // Nouveau champ pour Spotify
    budget: '',
    country: '',
    campaignType: '',
    artistName: '',
    email: ''
  });
  const [errors, setErrors] = useState({});
  const [results, setResults] = useState({
    views: null,
    cpv: null,
    reach: null
  });
  const [submitting, setSubmitting] = useState(false);

  useImperativeHandle(ref, () => ({
    openSimulator: () => {
      setIsOpen(true);
    }
  }));

  const closeSimulator = () => {
    setIsOpen(false);
    setCurrentStep(1);
    setFormData({ platform: '', genre: '', budget: '', country: '', campaignType: '', artistName: '', email: '' });
    setErrors({});
    setResults({ views: null, cpv: null, reach: null });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Reset du genre si on change de plateforme (et que ce n'est pas Spotify)
    if (name === 'platform' && value !== 'spotify') {
      setFormData(prev => ({ ...prev, [name]: value, genre: '' }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    let isValid = true;
    const newErrors = {};

    // Validation spécifique selon l'étape active
    // Note: Les numéros d'étapes "logiques" changent si Spotify est actif
    // Mais ici 'step' correspond à la valeur de currentStep state

    // Étape 1 : Plateforme (Toujours étape 1)
    if (step === 1) {
      if (!formData.platform) {
        newErrors.platform = t('simulator.platform_error');
        isValid = false;
      }
    }

    // Étape 2 : Genre (Uniquement si Spotify) OU Type de Campagne (Si pas Spotify)
    if (step === 2) {
      if (formData.platform === 'spotify') {
        if (!formData.genre) {
          newErrors.genre = t('simulator.genre_error');
          isValid = false;
        }
      } else {
        if (!formData.campaignType) {
          newErrors.campaignType = t('simulator.campaignType_error');
          isValid = false;
        }
      }
    }

    // Étape 3 : Type de Campagne (Si Spotify) OU Budget (Si pas Spotify)
    if (step === 3) {
      if (formData.platform === 'spotify') {
        if (!formData.campaignType) {
          newErrors.campaignType = t('simulator.campaignType_error');
          isValid = false;
        }
      } else {
        if (!formData.budget || formData.budget < 500) {
          newErrors.budget = t('simulator.budget_error');
          isValid = false;
        }
      }
    }

    // Étape 4 : Budget (Si Spotify) OU Pays (Si pas Spotify)
    if (step === 4) {
      if (formData.platform === 'spotify') {
        if (!formData.budget || formData.budget < 500) {
          newErrors.budget = t('simulator.budget_error');
          isValid = false;
        }
      } else {
        if (!formData.country) {
          newErrors.country = t('simulator.region_error');
          isValid = false;
        }
      }
    }

    // Étape 5 : Pays (Si Spotify) OU Infos (Si pas Spotify)
    if (step === 5) {
      if (formData.platform === 'spotify') {
        if (!formData.country) {
          newErrors.country = t('simulator.region_error');
          isValid = false;
        }
      } else {
        // Infos contact (Cas standard)
        if (!formData.artistName) {
          newErrors.artistName = t('simulator.artist_error');
          isValid = false;
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = t('simulator.email_error');
          isValid = false;
        }
      }
    }

    // Étape 6 : Infos (Si Spotify) OU Résultats (Si pas Spotify - mais validation pas nécessaire pour résultats)
    if (step === 6) {
      if (formData.platform === 'spotify') {
        if (!formData.artistName) {
          newErrors.artistName = t('simulator.artist_error');
          isValid = false;
        }
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = t('simulator.email_error');
          isValid = false;
        }
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const calculateResults = () => {
    // L'étape finale de validation dépend de la plateforme
    const finalStep = formData.platform === 'spotify' ? 6 : 5;

    if (validateStep(finalStep)) {
      setSubmitting(true);
      const budget = parseInt(formData.budget);
      let costData;

      // Logique de récupération des données de coût
      if (formData.platform === 'spotify') {
        // Pour Spotify, on utilise le GENRE au lieu du campaignType
        costData = COST_DATA.spotify?.[formData.country]?.[formData.genre];
      } else {
        // Pour les autres, on utilise le campaignType
        costData = COST_DATA[formData.platform]?.[formData.country]?.[formData.campaignType];
      }

      if (!costData) {
        console.error('Données de coût non disponibles pour cette combinaison');
        setSubmitting(false);
        return;
      }

      const avgCost = (costData.min + costData.max) / 2;
      let views, reach;

      // Calcul selon l'unité (CPV, CPM, CPS)
      if (costData.unit === "CPV") {
        views = Math.round(budget / avgCost);
        reach = Math.round(views * 2.5);
      } else if (costData.unit === "CPM") {
        const impressions = (budget / avgCost) * 1000;
        views = Math.round(impressions * 0.3);
        reach = Math.round(impressions);
      } else if (costData.unit === "CPS") { // Logique Spotify
        views = Math.round(budget / avgCost); // Ici "views" représente les streams
        reach = Math.round(views * 3); // Estimation auditeurs uniques
      } else {
        views = 0; reach = 0;
      }

      const viewsFormatted = views.toLocaleString();
      // Formatage du coût avec l'unité correcte
      const unitLabel = costData.unit === "CPS" ? "€ (CPS)" : `$ (${costData.unit})`;
      const costRangeFormatted = `${costData.min.toFixed(costData.unit === "CPS" ? 2 : 3)} - ${costData.max.toFixed(costData.unit === "CPS" ? 2 : 3)} ${unitLabel}`;
      const reachFormatted = reach.toLocaleString();

      setResults({
        views: viewsFormatted,
        cpv: costRangeFormatted,
        reach: reachFormatted
      });

      submitResults(viewsFormatted, costRangeFormatted, reachFormatted);
      // Passage à l'étape de résultats (6 ou 7)
      setCurrentStep(prev => prev + 1);
    }
  };

  const submitResults = async (views, cpv, reach) => {
    // Pas besoin de setSubmitting(true) ici, déjà fait dans calculateResults
    console.log('submitResults appelée avec:', { views, cpv, reach });
    try {
      const simulatorData = {
        artistName: formData.artistName,
        email: formData.email,
        platform: formData.platform,
        genre: formData.genre, // Ajout du genre
        campaignType: formData.campaignType,
        budget: formData.budget,
        country: formData.country,
        views, cpv, reach
      };
      // ❌ LIGNE COMMENTÉE - Cette ligne plantait et empêchait le webhook n8n de fonctionner
      // await apiService.submitSimulatorResults(simulatorData);

      // Appel webhook
      try {
        console.log('Tentative d\'appel webhook avec les données:', simulatorData);
        const webhookResponse = await fetch('https://mdmcmusicads.app.n8n.cloud/webhook/music-lead-simple', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(simulatorData)
        });
        console.log('Réponse webhook:', webhookResponse.status, webhookResponse.statusText);
        if (!webhookResponse.ok) {
          const errorText = await webhookResponse.text();
          console.error('Erreur webhook:', errorText);
        } else {
          console.log('Webhook appelé avec succès');
        }
      } catch (webhookError) {
        console.error('Erreur lors de l\'appel webhook:', webhookError);
      }

      // Envoyer l'événement de conversion à Google Ads
      if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
          value: parseInt(formData.budget),
          currency: 'EUR',
          platform: formData.platform,
          genre: formData.genre, // Ajout du genre au tracking
          campaign_type: formData.campaignType,
          country: formData.country,
          email: formData.email,
          artist_name: formData.artistName
        });
      }
    } catch (error) {
      console.error('Erreur lors de la soumission des résultats du simulateur:', error);
      // Afficher une notification d'erreur à l'utilisateur si nécessaire
    } finally {
      setSubmitting(false); // Assurez-vous que submitting est remis à false même en cas d'erreur
    }
  };

  // Fonction helper pour envoyer l'événement gtag avec callback
  const gtagSendEvent = (url) => {
    if (typeof gtag !== 'undefined') {
      const callback = function () {
        if (typeof url === 'string') {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      };
      gtag('event', 'form_submit', {
        'event_callback': callback,
        'event_timeout': 2000,
        value: parseInt(formData.budget),
        currency: 'EUR',
        platform: formData.platform,
        campaign_type: formData.campaignType,
        country: formData.country,
        email: formData.email,
        artist_name: formData.artistName
      });
    } else {
      // Si gtag n'est pas disponible, ouvrir directement le lien
      window.open(url, '_blank', 'noopener,noreferrer');
    }
    return false;
  };

  const handleCalendlyClick = (e) => {
    e.preventDefault();
    const calendlyUrl = `${CALENDLY_LINKS[formData.platform]}?name=${encodeURIComponent(formData.artistName)}&email=${encodeURIComponent(formData.email)}`;
    gtagSendEvent(calendlyUrl);
  };

  const handleClickOutside = (e) => {
    // L'étape finale est 7 pour Spotify, 6 pour les autres
    const finalStep = formData.platform === 'spotify' ? 7 : 6;
    if (e.target.classList.contains('simulator-popup') && currentStep !== finalStep) {
      closeSimulator();
    }
  };

  // Détermine le nombre total d'étapes
  const totalSteps = formData.platform === 'spotify' ? 7 : 6;

  return (
    <div
      className={`simulator-popup ${isOpen ? 'active' : ''}`}
      role="dialog" aria-modal="true" aria-labelledby="simulator-title"
      onClick={handleClickOutside}
    >
      <div className="simulator-content" tabIndex="-1">
        <button className="close-popup" type="button" aria-label={t('simulator.close_button_aria_label', 'Fermer')} onClick={closeSimulator}>
          &times;
        </button>

        <h2 id="simulator-title">{t('simulator.title')}</h2>

        <div className="progress-bar" aria-hidden="true">
          {[...Array(totalSteps)].map((_, i) => {
            const step = i + 1;
            return (
              <div key={step} className={`progress-step ${currentStep >= step ? 'active' : ''}`}></div>
            );
          })}
        </div>

        <form id="simulator-form" onSubmit={(e) => e.preventDefault()} noValidate>

          {/* Étape 1 : Plateforme (Toujours affichée si currentStep === 1) */}
          {currentStep === 1 && (
            <div className="form-step active" id="step-1" role="tabpanel">
              <h3>{t('simulator.step1_title')}</h3>
              <div className="form-group">
                <label htmlFor="platform">{t('simulator.step1_platform_label')}</label>
                <select id="platform" name="platform" value={formData.platform} onChange={handleChange} required aria-describedby={errors.platform ? "platform-error" : undefined}>
                  <option value="" disabled>{t('simulator.option_select')}</option>
                  <option value="youtube">{t('simulator.platform_youtube')}</option>
                  <option value="meta">{t('simulator.platform_meta')}</option>
                  <option value="tiktok">{t('simulator.platform_tiktok')}</option>
                  <option value="spotify">{t('simulator.platform_spotify', 'Spotify Ads')}</option>
                </select>
                {errors.platform && <span className="form-error" id="platform-error">{errors.platform}</span>}
              </div>
              <div className="form-buttons" style={{ justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-primary" onClick={nextStep} aria-label={t('simulator.button_next')}>
                  {t('simulator.button_next')}
                </button>
              </div>
            </div>
          )}

          {/* Étape 2 : Genre (Uniquement Spotify) */}
          {currentStep === 2 && formData.platform === 'spotify' && (
            <div className="form-step active" id="step-genre" role="tabpanel">
              <h3>{t('simulator.stepGenre_title', 'Quel est votre genre musical ?')}</h3>
              <div className="form-group">
                <label htmlFor="genre">{t('simulator.stepGenre_label', 'Sélectionnez le genre principal')}</label>
                <select id="genre" name="genre" value={formData.genre} onChange={handleChange} required aria-describedby={errors.genre ? "genre-error" : undefined}>
                  <option value="" disabled>{t('simulator.option_select')}</option>
                  <option value="rap">{t('simulator.genre_rap', 'Rap / Urbain')}</option>
                  <option value="pop">{t('simulator.genre_pop', 'Pop / Variété')}</option>
                  <option value="electro">{t('simulator.genre_electro', 'Électro / House')}</option>
                  <option value="rock">{t('simulator.genre_rock', 'Rock / Metal')}</option>
                </select>
                {errors.genre && <span className="form-error" id="genre-error">{errors.genre}</span>}
              </div>
              <div className="form-buttons">
                <button type="button" className="btn btn-secondary" onClick={prevStep} aria-label={t('simulator.button_prev')}>
                  {t('simulator.button_prev')}
                </button>
                <button type="button" className="btn btn-primary" onClick={nextStep} aria-label={t('simulator.button_next')}>
                  {t('simulator.button_next')}
                </button>
              </div>
            </div>
          )}

          {/* Étape Type de Campagne (Étape 2 si !Spotify, Étape 3 si Spotify) */}
          {((currentStep === 2 && formData.platform !== 'spotify') || (currentStep === 3 && formData.platform === 'spotify')) && (
            <div className="form-step active" id="step-campaign" role="tabpanel">
              <h3>{t('simulator.step2_title')}</h3>
              <div className="form-group">
                <label htmlFor="campaignType">{t('simulator.step2_campaignType_label')}</label>
                <select id="campaignType" name="campaignType" value={formData.campaignType} onChange={handleChange} required aria-describedby={errors.campaignType ? "campaignType-error" : undefined}>
                  <option value="" disabled>{t('simulator.option_select')}</option>
                  <option value="awareness">{t('simulator.campaignType_awareness')}</option>
                  <option value="engagement">{t('simulator.campaignType_engagement')}</option>
                  <option value="conversion">{t('simulator.campaignType_conversion')}</option>
                </select>
                {errors.campaignType && <span className="form-error" id="campaignType-error">{errors.campaignType}</span>}
              </div>
              <div className="form-buttons">
                <button type="button" className="btn btn-secondary" onClick={prevStep} aria-label={t('simulator.button_prev')}>
                  {t('simulator.button_prev')}
                </button>
                <button type="button" className="btn btn-primary" onClick={nextStep} aria-label={t('simulator.button_next')}>
                  {t('simulator.button_next')}
                </button>
              </div>
            </div>
          )}

          {/* Étape Budget (Étape 3 si !Spotify, Étape 4 si Spotify) */}
          {((currentStep === 3 && formData.platform !== 'spotify') || (currentStep === 4 && formData.platform === 'spotify')) && (
            <div className="form-step active" id="step-budget" role="tabpanel">
              <h3>{t('simulator.step3_title')}</h3>
              <div className="form-group">
                <label htmlFor="budget">{t('simulator.step3_budget_label')}</label>
                <input type="number" id="budget" name="budget" min="500" step="10" value={formData.budget} onChange={handleChange} required placeholder={t('simulator.step3_budget_placeholder')} aria-describedby={errors.budget ? "budget-error" : undefined} />
                {errors.budget && <span className="form-error" id="budget-error">{errors.budget}</span>}
              </div>
              <div className="form-buttons">
                <button type="button" className="btn btn-secondary" onClick={prevStep} aria-label={t('simulator.button_prev')}>
                  {t('simulator.button_prev')}
                </button>
                <button type="button" className="btn btn-primary" onClick={nextStep} aria-label={t('simulator.button_next')}>
                  {t('simulator.button_next')}
                </button>
              </div>
            </div>
          )}

          {/* Étape Pays (Étape 4 si !Spotify, Étape 5 si Spotify) */}
          {((currentStep === 4 && formData.platform !== 'spotify') || (currentStep === 5 && formData.platform === 'spotify')) && (
            <div className="form-step active" id="step-country" role="tabpanel">
              <h3>{t('simulator.step4_title')}</h3>
              <div className="form-group">
                <label htmlFor="country">{t('simulator.step4_region_label')}</label>
                <select id="country" name="country" value={formData.country} onChange={handleChange} required aria-describedby={errors.country ? "country-error" : undefined}>
                  <option value="" disabled>{t('simulator.option_select')}</option>
                  <option value="europe">{t('simulator.region_europe')}</option>
                  <option value="usa">{t('simulator.region_usa')}</option>
                  <option value="canada">{t('simulator.region_canada')}</option>
                  <option value="south_america">{t('simulator.region_south_america')}</option>
                  <option value="asia">{t('simulator.region_asia')}</option>
                </select>
                {errors.country && <span className="form-error" id="country-error">{errors.country}</span>}
              </div>
              <div className="form-buttons">
                <button type="button" className="btn btn-secondary" onClick={prevStep} aria-label={t('simulator.button_prev')}>
                  {t('simulator.button_prev')}
                </button>
                <button type="button" className="btn btn-primary" onClick={nextStep} aria-label={t('simulator.button_next')}>
                  {t('simulator.button_next')}
                </button>
              </div>
            </div>
          )}

          {/* Étape Infos (Étape 5 si !Spotify, Étape 6 si Spotify) */}
          {((currentStep === 5 && formData.platform !== 'spotify') || (currentStep === 6 && formData.platform === 'spotify')) && (
            <div className="form-step active" id="step-infos" role="tabpanel">
              <h3>{t('simulator.step5_title')}</h3>
              <div className="form-group">
                <label htmlFor="artistName">{t('simulator.step5_artist_label')}</label>
                <input type="text" id="artistName" name="artistName" value={formData.artistName} onChange={handleChange} required placeholder={t('simulator.step5_artist_placeholder')} aria-describedby={errors.artistName ? "artistName-error" : undefined} />
                {errors.artistName && <span className="form-error" id="artistName-error">{errors.artistName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="simulator-email">{t('simulator.step5_email_label')}</label>
                <input type="email" id="simulator-email" name="email" value={formData.email} onChange={handleChange} required placeholder={t('simulator.step5_email_placeholder')} aria-describedby={errors.email ? "simulator-email-error" : undefined} />
                {errors.email && <span className="form-error" id="simulator-email-error">{errors.email}</span>}
              </div>
              <div className="form-buttons">
                <button type="button" className="btn btn-secondary" onClick={prevStep} aria-label={t('simulator.button_prev')}>
                  {t('simulator.button_prev')}
                </button>
                <button type="button" className="btn btn-primary" onClick={calculateResults} disabled={submitting} aria-label={t('simulator.button_show_results')}>
                  {submitting ? t('simulator.submitting_text') : t('simulator.button_show_results')}
                </button>
              </div>
            </div>
          )}

          {/* Étape Résultats (Étape 6 si !Spotify, Étape 7 si Spotify) */}
          {((currentStep === 6 && formData.platform !== 'spotify') || (currentStep === 7 && formData.platform === 'spotify')) && (
            <div className="form-step active" id="step-results" role="tabpanel">
              <h3>{t('simulator.results_title')}</h3>
              <div className="result-preview" aria-live="polite">
                <div className="result-item">
                  {/* Label conditionnel : Streams pour Spotify, Vues pour les autres */}
                  <span>{formData.platform === 'spotify' ? t('simulator.results_streams_label', 'Streams estimés') : t('simulator.results_views_label')}</span>
                  <span className="result-value" id="result-views">{results.views || '--'}</span>
                </div>
                <div className="result-item">
                  {/* Label conditionnel : Coût par Stream pour Spotify */}
                  <span>{formData.platform === 'spotify' ? t('simulator.results_cps_label', 'Coût par stream') : t('simulator.results_cpv_label')}</span>
                  <span className="result-value" id="result-cpv">{results.cpv || '--'}</span>
                </div>
                <div className="result-item">
                  <span>{t('simulator.results_reach_label')}</span>
                  <span className="result-value" id="result-reach">{results.reach || '--'}</span>
                </div>
                <p className="results-disclaimer">{t('simulator.results_disclaimer')}</p>
              </div>
              <div className="form-buttons">
                <button type="button" className="btn btn-secondary" onClick={() => setCurrentStep(prev => prev - 1)} aria-label={t('simulator.button_modify')}>
                  {t('simulator.button_modify')}
                </button>
                <button id="calendly-link" onClick={handleCalendlyClick} className="btn btn-primary" aria-label={t('simulator.results_cta_expert')}>
                  {t('simulator.cta_expert_button')}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
});

Simulator.displayName = 'Simulator';

export default Simulator;
