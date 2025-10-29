import { useState, useEffect } from 'react';
import '../../assets/styles/spotify-release-planner.css';

const SpotifyReleasePlanner = ({ onClose, utmSource = 'spotify_ads', utmMedium = 'website', utmCampaign = 'release_planner', utmContent = '' }) => {
  const addUtmToUrl = (url) => {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('utm_source', utmSource);
      urlObj.searchParams.set('utm_medium', utmMedium);
      urlObj.searchParams.set('utm_campaign', utmCampaign);
      if (utmContent) urlObj.searchParams.set('utm_content', utmContent);
      return urlObj.toString();
    } catch {
      const separator = url.includes('?') ? '&' : '?';
      return `${url}${separator}utm_source=${encodeURIComponent(utmSource)}&utm_medium=${encodeURIComponent(utmMedium)}&utm_campaign=${encodeURIComponent(utmCampaign)}${utmContent ? `&utm_content=${encodeURIComponent(utmContent)}` : ''}`;
    }
  };
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [showFaq, setShowFaq] = useState(false);
  const [formData, setFormData] = useState({
    releaseType: 'single',
    genre: '',
    budget: '0',
    territories: ['FR'],
    releaseMonth: '',
    email: '',
    artistName: '',
    newsletter: true
  });

  const CONFIG = {
    webhookUrl: 'https://primary-production-7acf.up.railway.app/webhook/music-release-planner',
    calendlyUrl: 'https://calendly.com/mdmc-yt/meeting'
  };

  useEffect(() => {
    populateMonthOptions();
  }, []);

  const populateMonthOptions = () => {
    const now = new Date();
    const monthNames = [
      "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
      "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
    ];

    const months = [];
    for (let i = 0; i < 18; i++) {
      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      months.push({
        value: `${year}-${month}-15`,
        label: `${monthNames[date.getMonth()]} ${year}`
      });
    }

    if (months.length > 0) {
      setFormData(prev => ({ ...prev, releaseMonth: months[0].value }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleMultiSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prev => ({
      ...prev,
      territories: selectedOptions
    }));
  };

  const changeStep = (targetStep) => {
    setCurrentStep(targetStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const submitAnalysis = async () => {
    if (!formData.email || !formData.email.includes('@')) {
      alert('Veuillez entrer un email valide.');
      return;
    }

    if (!formData.genre) {
      alert('Veuillez sélectionner un genre musical.');
      return;
    }

    setIsLoading(true);
    setCurrentStep(4);

    const payload = {
      artistName: formData.artistName || 'Artiste Inconnu',
      email: formData.email,
      genre: formData.genre,
      releaseDate: formData.releaseMonth,
      releaseType: formData.releaseType,
      budget: parseInt(formData.budget),
      territories: formData.territories,
      newsletter: formData.newsletter
    };

    try {
      const response = await fetch(CONFIG.webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      setResults(data);
      setIsLoading(false);
    } catch (error) {
      console.error('❌ Erreur:', error);
      setResults({ error: true });
      setIsLoading(false);
    }
  };

  const openCalendly = () => {
    const calendlyUrlWithUtm = addUtmToUrl(CONFIG.calendlyUrl);
    if (typeof Calendly !== 'undefined') {
      Calendly.initPopupWidget({ url: calendlyUrlWithUtm });
    } else {
      window.open(calendlyUrlWithUtm, '_blank');
    }
  };

  const progressPercent = ((currentStep - 1) / 3) * 100;

  if (results && !isLoading) {
    return <ResultsView results={results} onNewAnalysis={() => {
      setResults(null);
      setCurrentStep(1);
    }} onClose={onClose} openCalendly={openCalendly} />;
  }

  return (
    <div className="spotify-planner-overlay" onClick={onClose}>
      <div className="spotify-planner-container" onClick={(e) => e.stopPropagation()}>
        <button className="spotify-planner-close" onClick={onClose}>×</button>

        <div className="spotify-planner-header">
          <h2>Spotify Release Planner</h2>
          <p>Optimisez votre sortie avec l'IA prédictive</p>
          <div style={{ marginTop: '0.5rem' }}>
            <button className="btn-secondary" onClick={() => setShowFaq(true)} aria-haspopup="dialog">
              FAQ
            </button>
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-line" style={{ width: `${progressPercent}%` }}></div>
          <div className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}>
            <div>1</div>
            <div>Projet</div>
          </div>
          <div className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}>
            <div>2</div>
            <div>Période</div>
          </div>
          <div className={`progress-step ${currentStep >= 3 ? 'active' : ''}`}>
            <div>3</div>
            <div>Contact</div>
          </div>
          <div className={`progress-step ${currentStep >= 4 ? 'active' : ''}`}>
            <div>4</div>
            <div>Analyse</div>
          </div>
        </div>

        {isLoading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p className="loading-text">Analyse IA en cours...</p>
            <p className="loading-subtext">Analyse de millions de sorties musicales pour optimiser votre stratégie</p>
          </div>
        ) : (
          <>
            {/* Étape 1: Projet */}
            {currentStep === 1 && (
              <div className="form-section">
                <h3>Votre Projet Musical</h3>
                <p className="subtitle">Décrivez les caractéristiques de votre sortie.</p>

                <div className="form-group">
                  <label>Type de sortie</label>
                  <div className="radio-grid">
                    {['single', 'ep', 'album'].map(type => (
                      <label key={type} className={`radio-container ${formData.releaseType === type ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="releaseType"
                          value={type}
                          checked={formData.releaseType === type}
                          onChange={handleInputChange}
                        />
                        <span>{type === 'single' ? 'Single' : type === 'ep' ? 'EP' : 'Album'}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="genre">Genre musical principal</label>
                  <select id="genre" name="genre" value={formData.genre} onChange={handleInputChange}>
                    <option value="">Sélectionnez votre genre</option>
                    <optgroup label="Urbain">
                      <option value="rap">Rap/Hip-Hop</option>
                      <option value="trap">Trap</option>
                      <option value="drill">Drill</option>
                      <option value="rnb">R&B</option>
                    </optgroup>
                    <optgroup label="Électronique">
                      <option value="electro">Électro</option>
                      <option value="house">House</option>
                      <option value="techno">Techno</option>
                      <option value="synthwave">Synthwave</option>
                    </optgroup>
                    <optgroup label="Pop / Mainstream">
                      <option value="pop">Pop</option>
                      <option value="kpop">K-Pop</option>
                      <option value="variete">Variété Française</option>
                    </optgroup>
                    <optgroup label="Rock / Metal">
                      <option value="rock">Rock</option>
                      <option value="indie">Indie Rock</option>
                      <option value="metal">Metal</option>
                    </optgroup>
                    <optgroup label="World Music">
                      <option value="afrobeat">Afrobeat</option>
                      <option value="reggae">Reggae</option>
                      <option value="latin">Latin</option>
                    </optgroup>
                  </select>
                </div>

                <div className="form-group">
                  <label>Budget promotionnel</label>
                  <div className="radio-grid">
                    {[
                      { value: '0', label: '0€' },
                      { value: '500', label: '< 500€' },
                      { value: '1500', label: '500-1500€' },
                      { value: '5000', label: '1500€+' }
                    ].map(budget => (
                      <label key={budget.value} className={`radio-container ${formData.budget === budget.value ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="budget"
                          value={budget.value}
                          checked={formData.budget === budget.value}
                          onChange={handleInputChange}
                        />
                        <span>{budget.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="territories">Territoires visés</label>
                  <select
                    id="territories"
                    name="territories"
                    multiple
                    size="6"
                    value={formData.territories}
                    onChange={handleMultiSelectChange}
                  >
                    <option value="FR">France</option>
                    <option value="BE">Belgique</option>
                    <option value="CH">Suisse</option>
                    <option value="CA">Canada</option>
                    <option value="US">États-Unis</option>
                    <option value="UK">Royaume-Uni</option>
                    <option value="DE">Allemagne</option>
                    <option value="ES">Espagne</option>
                    <option value="IT">Italie</option>
                    <option value="GLOBAL">Monde entier</option>
                  </select>
                  <p className="helper-text">Maintenez Ctrl (Cmd sur Mac) pour sélectionner plusieurs territoires.</p>
                </div>

                <button onClick={() => changeStep(2)} className="btn-primary full-width">
                  Suivant
                </button>
              </div>
            )}

            {/* Étape 2: Période */}
            {currentStep === 2 && (
              <div className="form-section">
                <h3>Période de Sortie</h3>
                <p className="subtitle">Quand souhaitez-vous sortir votre musique ?</p>

                <div className="form-group">
                  <label htmlFor="releaseMonth">Mois de sortie souhaité</label>
                  <select
                    id="releaseMonth"
                    name="releaseMonth"
                    value={formData.releaseMonth}
                    onChange={handleInputChange}
                  >
                    {Array.from({ length: 18 }, (_, i) => {
                      const now = new Date();
                      const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
                      const month = String(date.getMonth() + 1).padStart(2, '0');
                      const year = date.getFullYear();
                      const monthNames = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
                      return (
                        <option key={i} value={`${year}-${month}-15`}>
                          {monthNames[date.getMonth()]} {year}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="btn-group">
                  <button onClick={() => changeStep(1)} className="btn-secondary">
                    Retour
                  </button>
                  <button onClick={() => changeStep(3)} className="btn-primary">
                    Suivant
                  </button>
                </div>
              </div>
            )}

            {/* Étape 3: Contact */}
            {currentStep === 3 && (
              <div className="form-section">
                <h3>Votre Analyse Personnalisée</h3>
                <p className="subtitle">Recevez votre rapport complet par email.</p>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="nom@email.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="artistName">Nom d'artiste (optionnel)</label>
                  <input
                    type="text"
                    id="artistName"
                    name="artistName"
                    placeholder="Votre nom de scène"
                    value={formData.artistName}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="consent-box">
                  <input
                    type="checkbox"
                    id="newsletter"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="newsletter">
                    J'accepte de recevoir des conseils marketing et des offres de MDMC Music.
                  </label>
                </div>

                <div className="btn-group">
                  <button onClick={() => changeStep(2)} className="btn-secondary">
                    Retour
                  </button>
                  <button onClick={submitAnalysis} className="btn-primary">
                    Lancer l'analyse
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
      {showFaq && (
        <div className="spotify-modal-overlay" onClick={() => setShowFaq(false)}>
          <div
            className="spotify-modal-content"
            role="dialog"
            aria-modal="true"
            aria-labelledby="plannerFaqTitle"
            onClick={(e) => e.stopPropagation()}
            tabIndex="-1"
          >
            <button className="spotify-modal-close" onClick={() => setShowFaq(false)} aria-label="Fermer la FAQ">×</button>
            <div className="spotify-modal-header">
              <h3 id="plannerFaqTitle">FAQ - Release Planner</h3>
              <div>
                <details open>
                  <summary>Quel est l'objectif du planner ?</summary>
                  <p>Déterminer une date optimale de sortie et votre contexte concurrentiel pour planifier la promo.</p>
                </details>
                <details>
                  <summary>Dois-je renseigner mon email ?</summary>
                  <p>Oui pour recevoir votre analyse complète et pouvoir la retrouver plus tard.</p>
                </details>
                <details>
                  <summary>Quel budget minimum recommandez-vous ?</summary>
                  <p>Un minimum de 300€ pour tester, 500€+ pour des résultats solides selon le genre.</p>
                </details>
                <details>
                  <summary>Comment sont calculés les concurrents ?</summary>
                  <p>À partir de MusicBrainz/Deezer/YouTube et d'un historique interne agrégé (quand dispo).</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ResultsView = ({ results, onNewAnalysis, onClose, openCalendly }) => {
  if (results.error) {
    return (
      <div className="spotify-planner-overlay" onClick={onClose}>
        <div className="spotify-planner-container" onClick={(e) => e.stopPropagation()}>
          <button className="spotify-planner-close" onClick={onClose}>×</button>
          <div className="error-container">
            <h3>❌ Erreur d'Analyse</h3>
            <p>Impossible de se connecter au serveur. Veuillez réessayer dans quelques instants.</p>
            <button onClick={onNewAnalysis} className="btn-primary">
              Nouvelle Analyse
            </button>
          </div>
        </div>
      </div>
    );
  }

  const competitors = results.competitiveAnalysis?.top5Competitors ||
                     results.analysis?.competitors?.detailedTop10?.slice(0, 5) ||
                     [];

  const competitionLevel = results.competition || 'Modérée';

  // Correction : utiliser la bonne structure JSON
  const sources = results.competitiveAnalysis?.sourcesDisplay || {};
  const breakdown = results.competitors || {};
  const totalCompetitors = breakdown.total || 0;

  return (
    <div className="spotify-planner-overlay" onClick={onClose}>
      <div className="spotify-planner-container large" onClick={(e) => e.stopPropagation()}>
        <button className="spotify-planner-close" onClick={onClose}>×</button>

        <div className="results-header">
          <h2>Analyse Stratégique Spotify</h2>
          <div className="optimal-date">{results.optimalDate?.date || 'Date Optimale'}</div>
        </div>


        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-label">Concurrence</div>
            <div className="stat-value">{competitionLevel}</div>
          </div>
          <div className="stat-card">
            <div className="stat-label">Score de Visibilité</div>
            <div className="stat-value">{results.score ? `${Math.round(results.score / 10)}/10` : 'N/A'}</div>
            {results.score && (
              <div className="visibility-gauge">
                <div className="gauge-track"></div>
                <div
                  className="gauge-fill"
                  style={{ width: `${Math.round(results.score)}%` }}
                ></div>
                <div className="gauge-labels">
                  <span>0</span>
                  <span>10</span>
                </div>
              </div>
            )}
          </div>
          <div className="stat-card">
            <div className="stat-label">Concurrents Détectés</div>
            <div className="stat-value">{totalCompetitors}</div>
            <div className="stat-sublabel">
              {breakdown.mega || 0} mega • {breakdown.major || 0} majors<br />
              {breakdown.indie || 0} indés • {breakdown.emerging || 0} émergents
            </div>
          </div>
        </div>

        <div className="strategic-advice-section">
          <h4>Conseils Stratégiques Personnalisés</h4>
          <div className="advice-grid">
            <div className="advice-card">
              <div className="advice-header">
                <span className="advice-title">Timing Optimal</span>
              </div>
              <p>
                {competitionLevel === 'Faible'
                  ? 'Excellente fenêtre de tir ! Profitez de cette période pour maximiser votre visibilité.'
                  : competitionLevel === 'Élevée'
                  ? 'Concurrence importante. Considérez décaler de 2-3 semaines ou intensifiez votre stratégie promo.'
                  : 'Concurrence modérée. Anticipez votre promotion 4 semaines avant la sortie.'
                }
              </p>
            </div>

            <div className="advice-card">
              <div className="advice-header">
                <span className="advice-title">Stratégie Promo</span>
              </div>
              <p>
                {totalCompetitors > 15
                  ? 'Marché saturé : Misez sur un angle unique et des collaborations pour vous démarquer.'
                  : totalCompetitors > 8
                  ? 'Marché actif : Planifiez 3-4 contenus promo par semaine pendant 6 semaines.'
                  : 'Marché calme : Une stratégie organique bien exécutée sera suffisante.'
                }
              </p>
            </div>

            <div className="advice-card">
              <div className="advice-header">
                <span className="advice-title">Positionnement</span>
              </div>
              <p>
                {breakdown.mega > 2
                  ? 'Présence de mega-stars : Créez un storytelling émotionnel fort pour percer.'
                  : breakdown.major > 5
                  ? 'Domination majors : Concentrez-vous sur votre niche et l\'authenticité.'
                  : 'Terrain favorable pour les indépendants : Maximisez vos playlists personnalisées.'
                }
              </p>
            </div>

            <div className="advice-card">
              <div className="advice-header">
                <span className="advice-title">Budget & ROI</span>
              </div>
              <p>
                Avec un score de {results.score || 'N/A'}/100,
                {(results.score || 0) > 75
                  ? ' investissez massivement : ROI excellent prévu.'
                  : (results.score || 0) > 50
                  ? ' budget modéré recommandé : potentiel correct.'
                  : ' restez prudent : testez avec un budget limité.'
                }
              </p>
            </div>
          </div>
        </div>


        {results.recommendations && results.recommendations.length > 0 && (
          <div className="info-box recommendation-box">
            <h4>✅ Recommandations Stratégiques</h4>
            <ul>
              {results.recommendations.slice(0, 5).map((rec, index) => (
                <li key={index}>{rec}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="cta-section">
          <h4>Prêt à optimiser votre sortie Spotify ?</h4>
          <p>Discutons de votre stratégie avec nos experts.</p>
          <div className="cta-buttons">
            <button onClick={openCalendly} className="btn-primary">
              Réserver un appel gratuit
            </button>
            <button onClick={onNewAnalysis} className="btn-secondary">
              Nouvelle analyse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpotifyReleasePlanner;