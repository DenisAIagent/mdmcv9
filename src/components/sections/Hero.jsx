import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import '../../assets/styles/hero.css';

const Hero = ({ openSimulator }) => {
  const { t } = useTranslation();
  const [counts, setCounts] = useState({
    campaigns: 0,
    artists: 0,
    views: 0,
    countries: 0
  });

  const targetCounts = {
    campaigns: 500,
    artists: 200,
    views: 50,
    countries: 25
  };

  const countersRef = useRef(null);
  const hasAnimated = useRef(false);
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Animation: Ondes Sonores Fluides (Fluid Sound Waves)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let increment = 0;

    // Configuration des vagues
    // Chaque vague a : y (offset vertical), length (fréquence), amplitude, speed, color
    let waves = [];

    const initWaves = () => {
      const height = canvas.height;
      console.log("Initializing waves animation");
      waves = [
        {
          y: height * 0.5,
          length: 0.006,
          amplitude: height * 0.15,
          speed: 0.01,
          color: 'rgba(220, 38, 38, 0.6)' // Rouge beaucoup plus visible
        },
        {
          y: height * 0.45,
          length: 0.004,
          amplitude: height * 0.1,
          speed: 0.02,
          color: 'rgba(220, 38, 38, 0.4)' // Rouge visible
        },
        {
          y: height * 0.55,
          length: 0.008,
          amplitude: height * 0.08,
          speed: 0.015,
          color: 'rgba(255, 255, 255, 0.3)' // Blanc visible
        },
        {
          y: height * 0.5,
          length: 0.003,
          amplitude: height * 0.2,
          speed: 0.005,
          color: 'rgba(220, 38, 38, 0.2)' // Rouge fond
        }
      ];
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initWaves();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      increment += 0.01;

      waves.forEach((wave, i) => {
        ctx.beginPath();
        ctx.moveTo(0, wave.y);

        for (let x = 0; x < canvas.width; x++) {
          // Formule d'onde complexe : sin(x * frequence + temps * vitesse)
          // On ajoute une interaction souris subtile si on veut, ou on laisse fluide
          const sine = Math.sin(x * wave.length + increment * (i + 1) * 0.5 + wave.speed);

          // Variation d'amplitude basée sur la position x pour un effet "pulsation" au centre
          const centerFactor = 1 + Math.sin(increment * 0.5) * 0.2;

          const y = wave.y + sine * wave.amplitude * centerFactor;
          ctx.lineTo(x, y);
        }

        // Remplissage ou trait ? Trait pour un effet "filaire" élégant
        // Ou remplissage dégradé pour un effet "nappe"

        // Option Trait épais fluide
        ctx.strokeStyle = wave.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Optionnel : Remplissage léger sous la courbe pour donner du corps
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.fillStyle = wave.color.replace('0.2', '0.05').replace('0.15', '0.02'); // Version très transparente
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Animation des compteurs (Code existant)
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const handleIntersect = (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        animateCounters();
      }
    };

    const observer = new IntersectionObserver(handleIntersect, options);

    if (countersRef.current) {
      observer.observe(countersRef.current);
    }

    return () => {
      if (countersRef.current) {
        observer.unobserve(countersRef.current);
      }
    };
  }, []);

  const animateCounters = () => {
    const duration = 2500;
    const frameDuration = 1000 / 60;
    const totalFrames = Math.round(duration / frameDuration);
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;

      setCounts({
        campaigns: Math.floor(targetCounts.campaigns * progress),
        artists: Math.floor(targetCounts.artists * progress),
        views: Math.floor(targetCounts.views * progress),
        countries: Math.floor(targetCounts.countries * progress)
      });

      if (frame === totalFrames) {
        clearInterval(counter);
        setCounts(targetCounts);
      }
    }, frameDuration);
  };

  return (
    <section id="hero" className="hero">
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-container">
        <div className="hero-content">
          <h1 id="main-heading" className="hero-title" dangerouslySetInnerHTML={{ __html: t('hero.title') }}></h1>
          <p className="hero-slogan red-text">{t('hero.slogan')}</p>
          <p className="hero-description">{t('hero.description')}</p>
          <div className="cta-container">
            <button onClick={openSimulator} className="btn btn-primary" id="simulator-trigger">{t('simulator.title')}</button>
            <a href="#contact" className="btn btn-secondary">{t('nav.contact')}</a>
          </div>
        </div>

        <div className="hero-stats" ref={countersRef}>
          <div className="stat-item">
            <span className="stat-number">{counts.campaigns}+</span>
            <span className="stat-label">{t('hero.stats.campaigns')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{counts.artists}+</span>
            <span className="stat-label">{t('hero.stats.artists')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{counts.views}M+</span>
            <span className="stat-label">{t('hero.stats.views')}</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{counts.countries}+</span>
            <span className="stat-label">{t('hero.stats.countries')}</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
