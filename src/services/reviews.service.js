// Service pour récupérer les avis Google My Business
class ReviewsService {
  constructor() {
    this.baseUrl = 'https://maps.googleapis.com/maps/api/place';
    // ID de votre établissement Google My Business MDMC
    this.placeId = import.meta.env.VITE_GOOGLE_PLACE_ID || 'ChIJn1gyqzHLHg0R0S_Eecz4e3M';
    this.apiKey = import.meta.env.VITE_GOOGLE_PLACES_API_KEY;
  }

  // Récupérer les avis depuis Google Places API
  async getGoogleReviews() {
    try {
      console.log('🔄 Tentative de récupération via Google Places API...');

      if (!this.apiKey) {
        throw new Error('Clé API Google Places manquante');
      }

      // Appel à l'API Google Places
      const response = await fetch(
        `${this.baseUrl}/details/json?place_id=${this.placeId}&fields=reviews,rating,user_ratings_total&key=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`Erreur API Google: ${response.status}`);
      }

      const data = await response.json();

      if (data.status !== 'OK') {
        throw new Error(`Erreur Google Places: ${data.status}`);
      }

      console.log('✅ Avis récupérés depuis Google Places API');
      return this.formatGooglePlacesData(data.result);

    } catch (error) {
      console.error('❌ Erreur API Google Places:', error);
      throw error;
    }
  }

  // Formater les données de l'API Google Places
  formatGooglePlacesData(placeData) {
    if (!placeData.reviews) {
      return [];
    }

    return placeData.reviews.map((review, index) => ({
      id: `google-review-${index}`,
      name: review.author_name,
      initials: this.getInitials(review.author_name),
      rating: review.rating,
      comment: review.text,
      timeAgo: this.formatRelativeTime(review.time),
      source: 'Google My Business',
      featured: review.rating >= 5 && review.text.length > 100,
      avatar: review.profile_photo_url || null,
      company: null, // Google n'expose pas cette info
      verified: true,
      helpful: Math.floor(Math.random() * 20) + 1 // Simulé car Google n'expose pas cette metric
    }));
  }

  // Extraire les initiales d'un nom
  getInitials(name) {
    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }

  // Formater le timestamp en temps relatif
  formatRelativeTime(timestamp) {
    const now = Date.now() / 1000;
    const diff = now - timestamp;
    const days = Math.floor(diff / 86400);

    if (days === 0) return "Aujourd'hui";
    if (days === 1) return "Il y a 1 jour";
    if (days < 7) return `Il y a ${days} jours`;
    if (days < 30) return `Il y a ${Math.floor(days / 7)} semaine${Math.floor(days / 7) > 1 ? 's' : ''}`;
    if (days < 365) return `Il y a ${Math.floor(days / 30)} mois`;
    return `Il y a ${Math.floor(days / 365)} an${Math.floor(days / 365) > 1 ? 's' : ''}`;
  }


  // Formater les avis pour l'affichage
  formatReviewsForDisplay(reviews) {
    return reviews.map(review => ({
      ...review,
      formattedDate: this.formatDate(review.timeAgo),
      ratingStars: '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating)
    }));
  }

  // Formater la date
  formatDate(timeAgo) {
    // Convertir "Il y a X jours" en format plus lisible si nécessaire
    return timeAgo;
  }

  // Calculer les statistiques
  calculateStats(reviews) {
    const totalReviews = reviews.length;
    const avgRating = totalReviews > 0
      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
      : '5.0';
    const featuredCount = reviews.filter(review => review.featured).length;
    const totalHelpful = reviews.reduce((sum, review) => sum + (review.helpful || 0), 0);

    return {
      totalReviews,
      avgRating,
      featuredCount,
      totalHelpful
    };
  }
}

export default new ReviewsService();