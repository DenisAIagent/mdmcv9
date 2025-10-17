import { useTranslation } from 'react-i18next';
import '../../assets/styles/about.css';

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="about">
      <div className="container">
        <h2 className="section-title">{t('about.title')}</h2>

        <div className="about-content">
          <div className="about-text">
            <h3>{t('about.subtitle')}</h3>
            <p>{t('about.description')}</p>

            <ul>
              <li><strong>{t('about.advantages.expertise')}</strong></li>
              <li><strong>{t('about.advantages.campaigns')}</strong></li>
              <li><strong>{t('about.advantages.targeting')}</strong></li>
              <li><strong>{t('about.advantages.analytics')}</strong></li>
            </ul>
          </div>

          <div className="about-image">
            <picture>
              <source srcSet="/assets/images/Falling In Reverse-6 - Grande.webp" type="image/webp" />
              <img
                src="/assets/images/Falling In Reverse-6 - Grande.jpeg"
                alt="MDMC Marketing Musical"
                width="800"
                height="600"
                loading="lazy"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;