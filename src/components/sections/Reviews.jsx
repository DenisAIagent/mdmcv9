// src/components/sections/Reviews.jsx
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import featurableService from '../../services/featurable.service';
import '../../assets/styles/reviews.css';

// Composant pour une carte d'avis individuelle
const ReviewCard = ({ review, index, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay + (index * 100));

    return () => clearTimeout(timer);
  }, [delay, index]);

  return (
    <div
      className={`review-card-modern ${isVisible ? 'visible' : ''} ${review.featured ? 'featured' : ''}`}
      style={{ '--delay': `${delay + (index * 0.1)}s` }}
      itemScope
      itemType="https://schema.org/Review"
    >
      {/* Badge pour avis vedette */}
      {review.featured && (
        <div className="review-badge">
          Coup de cœur
        </div>
      )}

      {/* Header avec avatar et infos client */}
      <div className="review-header-modern">
        <div className="review-avatar-modern">
          {review.avatar ? (
            <img src={review.avatar} alt={`Avatar de ${review.name}`} />
          ) : (
            <span className="review-initials">{review.initials}</span>
          )}
        </div>

        <div className="review-info-modern">
          <div className="review-name-row">
            <h3 className="review-name-modern" itemProp="author" itemScope itemType="https://schema.org/Person">
              <span itemProp="name">{review.name}</span>
            </h3>
            {review.verified && <span className="verified-icon">✓</span>}
          </div>

          {review.company && (
            <div className="review-company">
              {review.company}
            </div>
          )}

          <div className="review-rating-row">
            <div className="review-rating-modern" itemProp="reviewRating" itemScope itemType="https://schema.org/Rating">
              <meta itemProp="ratingValue" content={review.rating} />
              <meta itemProp="bestRating" content="5" />
              <meta itemProp="worstRating" content="1" />
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`star ${i < review.rating ? 'filled' : 'empty'}`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="review-time" itemProp="datePublished">{review.timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Citation avec guillemets */}
      <div className="review-content-modern">
        <div className="quote-icon">"</div>
        <p className="review-text-modern" itemProp="reviewBody">"{review.comment}"</p>
      </div>

      {/* Footer avec source et utile */}
      <div className="review-footer-modern">
        <span className="review-rating-chip">{review.rating}/5 étoiles</span>
        <div className="review-meta">
          <span className="review-source">via {review.source}</span>
          {review.helpful && (
            <span className="review-helpful">{review.helpful} utiles</span>
          )}
        </div>
      </div>
    </div>
  );
};

// Composant principal Reviews
const Reviews = () => {
  const { t } = useTranslation();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [stats, setStats] = useState({});

  const reviewsPerPage = 6;

  // Schema Reviews pour optimisation IA
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MDMC Music Ads",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": stats.avgRating || "5.0",
      "reviewCount": stats.totalReviews || reviews.length,
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.slice(0, 5).map(review => ({
      "@type": "Review",
      "itemReviewed": {
        "@type": "Service",
        "name": "Services de Marketing Musical MDMC"
      },
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": review.comment,
      "datePublished": review.date || new Date().toISOString().split('T')[0],
      "publisher": {
        "@type": "Organization",
        "name": review.source || "Google"
      },
      "name": `Avis de ${review.name} sur les services MDMC`
    }))
  };

  // Test de connexion Featurable au montage
  useEffect(() => {
    const testFeaturableConnection = async () => {
      const result = await featurableService.testConnection();
      console.log('🔧 Test connexion Featurable:', result);
    };

    testFeaturableConnection();
  }, []);


  // Chargement des vrais avis Google via Featurable
  useEffect(() => {
    const loadReviews = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('📊 Chargement des avis Google My Business via Featurable...');
        const reviewsData = await featurableService.getReviews();

        console.log('🔍 Données reçues de Featurable:', reviewsData);
        console.log('🔍 Type:', typeof reviewsData);
        console.log('🔍 Length:', reviewsData?.length);

        if (reviewsData && Array.isArray(reviewsData) && reviewsData.length > 0) {
          console.log('✅ Utilisation des avis Featurable');
          setReviews(reviewsData);
          const reviewStats = featurableService.getReviewStats(reviewsData);
          setStats({
            totalReviews: reviewStats.totalReviews,
            avgRating: reviewStats.averageRating.toString(),
            featuredCount: reviewStats.featuredCount
          });
          console.log('✅ Avis Google chargés:', {
            count: reviewsData.length,
            avgRating: reviewStats.averageRating,
            featured: reviewStats.featuredCount
          });
        } else {
          console.log('ℹ️ Aucun avis Featurable trouvé');
          setReviews([]);
          setStats({ totalReviews: 0, avgRating: '5.0', featuredCount: 0 });
        }
      } catch (err) {
        console.error('❌ Erreur chargement avis Featurable:', err);
        setError(err.message);
        setReviews([]);
        setStats({ totalReviews: 0, avgRating: '5.0', featuredCount: 0 });
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Pagination
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const currentReviews = reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  // Composant de chargement
  const LoadingSkeleton = () => (
    <div className="reviews-grid-modern">
      {[...Array(6)].map((_, index) => (
        <div key={index} className="review-skeleton">
          <div className="skeleton-header">
            <div className="skeleton-avatar"></div>
            <div className="skeleton-info">
              <div className="skeleton-line skeleton-name"></div>
              <div className="skeleton-line skeleton-company"></div>
              <div className="skeleton-line skeleton-rating"></div>
            </div>
          </div>
          <div className="skeleton-content">
            <div className="skeleton-line skeleton-text"></div>
            <div className="skeleton-line skeleton-text"></div>
            <div className="skeleton-line skeleton-text short"></div>
          </div>
          <div className="skeleton-footer">
            <div className="skeleton-line skeleton-chip"></div>
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <section id="reviews" className="reviews-section-modern">
        <div className="container">
          <div className="reviews-header-modern">
            <h2 className="reviews-title-modern gradient-text">
              {t('reviews.title', 'Avis de nos Clients')}
            </h2>
            <p className="reviews-subtitle-modern">
              Chargement des avis Google My Business...
            </p>
          </div>
          <LoadingSkeleton />
        </div>
      </section>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <section id="reviews" className="reviews-section-modern">
        <div className="container">
          <div className="reviews-header-modern">
            <h2 className="reviews-title-modern gradient-text">
              {t('reviews.title', 'Avis de nos Clients')}
            </h2>
          </div>
          <div className="reviews-error">
            <p>⚠️ Impossible de charger les avis Google</p>
            <p style={{fontSize: '14px', color: '#666'}}>Erreur: {error}</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Réessayer
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(reviewsSchema)}
        </script>
      </Helmet>

      <section id="reviews" className="reviews-section-modern" itemScope itemType="https://schema.org/Organization">
        <div className="container">
        {/* Header avec statistiques */}
        <div className="reviews-header-modern fade-in">
          <h2 className="reviews-title-modern gradient-text">
            {t('reviews.title', 'Avis de nos Clients')}
          </h2>

          <p className="reviews-subtitle-modern">
            {error ? 'Chargement des avis Google en cours...' : 'Témoignages authentiques de nos clients sur Google My Business'}
          </p>

          {/* Statistiques des avis Google */}
          <div className="reviews-stats-modern" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
            <meta itemProp="ratingValue" content={stats.avgRating || '5.0'} />
            <meta itemProp="reviewCount" content={stats.totalReviews || 0} />
            <meta itemProp="bestRating" content="5" />
            <meta itemProp="worstRating" content="1" />

            <div className="stat-item">
              <div className="stat-value primary-color">{stats.avgRating || '5.0'}</div>
              <div className="stat-label">Note Google</div>
            </div>

            <div className="stat-item">
              <div className="stat-value secondary-color">{stats.totalReviews || 0}</div>
              <div className="stat-label">Avis clients</div>
            </div>

            <div className="stat-item">
              <div className="stat-value success-color">{stats.featuredCount || 0}</div>
              <div className="stat-label">Coups de cœur</div>
            </div>
          </div>
        </div>

        {/* Grille des avis Google */}
        <div className="reviews-content-modern">
          {reviews.length === 0 ? (
            <div className="reviews-error" style={{textAlign: 'center', padding: '2rem'}}>
              <p>🔄 Chargement des avis Google en cours...</p>
              <p style={{fontSize: '14px', color: '#666'}}>
                Vérifiez la console pour plus de détails
              </p>
            </div>
          ) : (
            <div className="reviews-grid-modern">
              {currentReviews.map((review, index) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  index={index}
                  delay={0.2}
                />
              ))}
            </div>
          )}
        </div>

        {/* Controls de pagination */}
        {totalPages > 1 && (
          <div className="reviews-pagination">
            <button
              className="pagination-btn"
              onClick={handlePrevPage}
              disabled={totalPages <= 1}
            >
              ‹
            </button>

            <span className="pagination-info">
              {currentPage + 1} / {totalPages}
            </span>

            <button
              className="pagination-btn"
              onClick={handleNextPage}
              disabled={totalPages <= 1}
            >
              ›
            </button>
          </div>
        )}

        {/* CTA vers Google */}
        <div className="reviews-cta">
          {error ? (
            <button
              className="btn btn-primary reviews-cta-btn"
              onClick={() => window.location.reload()}
            >
              🔄 Actualiser les avis
            </button>
          ) : (
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJn1gyqzHLHg0R0S_Eecz4e3M"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary reviews-cta-btn"
            >
              Laisser un avis Google ({stats.totalReviews || 0} avis)
            </a>
          )}
        </div>
        </div>
      </section>
    </>
  );
};

export default Reviews;