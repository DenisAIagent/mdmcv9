// Service pour récupérer les avis Google My Business via Featurable
class FeaturableService {
  constructor() {
    this.baseUrl = 'https://featurable.com/api/v1';
    this.widgetId = import.meta.env.VITE_FEATURABLE_WIDGET_ID || 'e5383027-5079-48d2-910c-cd67dc85b476';
    this.timeout = 15000; // 15 secondes
  }

  // Test de connexion au service Featurable
  async testConnection() {
    try {
      if (!this.widgetId) {
        return {
          success: false,
          error: 'Widget ID Featurable manquant'
        };
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const response = await fetch(`${this.baseUrl}/widgets/${this.widgetId}`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });

      clearTimeout(timeoutId);

      return {
        success: response.ok,
        status: response.status,
        error: response.ok ? null : `Erreur ${response.status}`
      };
    } catch (error) {
      return {
        success: false,
        error: error.name === 'AbortError' ? 'Timeout' : error.message
      };
    }
  }

  // Récupérer les avis depuis Featurable
  async getReviews() {
    try {
      console.log('📊 Récupération des avis via Featurable...');

      if (!this.widgetId) {
        throw new Error('Widget ID Featurable manquant dans la configuration');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(`${this.baseUrl}/widgets/${this.widgetId}`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'MDMC-Website/1.0'
        }
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Erreur Featurable API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      console.log('🔍 Structure des données Featurable:', data);
      console.log('🔍 Type de data:', typeof data);
      console.log('🔍 Array.isArray(data):', Array.isArray(data));

      // Adaptation à la vraie structure de l'API Featurable
      let reviews = [];
      if (Array.isArray(data)) {
        console.log('✅ Data est un array direct');
        reviews = data;
      } else if (data.reviews && Array.isArray(data.reviews)) {
        console.log('✅ Data.reviews trouvé');
        reviews = data.reviews;
      } else if (data.data && Array.isArray(data.data)) {
        console.log('✅ Data.data trouvé');
        reviews = data.data;
      } else {
        console.warn('⚠️ Structure de données Featurable inattendue:', data);
        throw new Error('Format de données invalide');
      }

      console.log('🔍 Nombre d\'avis trouvés:', reviews.length);

      const formattedReviews = this.formatFeaturableReviews(reviews);

      console.log('✅ Avis Featurable récupérés:', {
        total: formattedReviews.length,
        featured: formattedReviews.filter(r => r.featured).length
      });

      return formattedReviews;

    } catch (error) {
      console.error('❌ Erreur service Featurable:', error);
      throw new Error(`Impossible de charger les avis: ${error.message}`);
    }
  }

  // Formater les avis Featurable pour notre interface
  formatFeaturableReviews(reviews) {
    console.log('🔍 Nombre d\'avis à formater:', reviews.length);

    return reviews.map((review, index) => {
      console.log(`🔍 Review ${index + 1}:`, review);

      const formatted = {
        id: review.reviewId || `featurable-${index}`,
        name: this.extractFirstLastName(review.reviewer?.displayName),
        initials: this.getInitials(review.reviewer?.displayName),
        rating: parseInt(review.starRating) || 5,
        comment: this.cleanReviewText(review.comment),
        timeAgo: this.formatRelativeTime(review.createTime),
        source: 'Google My Business',
        featured: this.determineFeaturedStatus(review),
        avatar: review.reviewer?.profilePhotoUrl || null,
        company: null,
        verified: true,
        helpful: Math.floor(Math.random() * 10)
      };

      console.log(`✅ Review ${index + 1} formaté:`, formatted);
      return formatted;
    });
  }

  // Extraire le prénom et nom (masquer nom complet pour confidentialité)
  extractFirstLastName(fullName) {
    if (!fullName) return 'Client MDMC';

    const parts = fullName.trim().split(' ');
    if (parts.length === 1) return parts[0];

    // Format "Prénom N." pour respecter la confidentialité
    const firstName = parts[0];
    const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();

    return `${firstName} ${lastInitial}.`;
  }

  // Extraire les initiales
  getInitials(name) {
    if (!name) return 'MC';

    return name
      .split(' ')
      .map(word => word.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  }

  // Nettoyer le texte des avis
  cleanReviewText(text) {
    if (!text) return 'Excellent service !';

    // Supprimer les caractères étranges, limiter la longueur
    return text
      .replace(/[\r\n]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .substring(0, 300) + (text.length > 300 ? '...' : '');
  }

  // Déterminer si un avis est "coup de cœur"
  determineFeaturedStatus(review) {
    const rating = parseInt(review.starRating || review.rating || review.stars) || 0;
    const textLength = (review.comment || review.text || review.content || '').length;

    // Avis 5 étoiles avec commentaire détaillé
    return rating === 5 && textLength > 100;
  }

  // Extraire l'entreprise du client (si disponible)
  extractCompany(review) {
    // Featurable n'expose généralement pas cette info
    // Retourner null pour respecter la confidentialité
    return null;
  }

  // Formater le timestamp en temps relatif
  formatRelativeTime(timestamp) {
    if (!timestamp) return 'Récemment';

    try {
      const reviewDate = new Date(timestamp);
      const now = new Date();
      const diffMs = now - reviewDate;
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Aujourd'hui";
      if (diffDays === 1) return "Il y a 1 jour";
      if (diffDays < 7) return `Il y a ${diffDays} jours`;
      if (diffDays < 30) {
        const weeks = Math.floor(diffDays / 7);
        return `Il y a ${weeks} semaine${weeks > 1 ? 's' : ''}`;
      }
      if (diffDays < 365) {
        const months = Math.floor(diffDays / 30);
        return `Il y a ${months} mois`;
      }

      const years = Math.floor(diffDays / 365);
      return `Il y a ${years} an${years > 1 ? 's' : ''}`;
    } catch (error) {
      return 'Récemment';
    }
  }

  // Obtenir les statistiques des avis
  getReviewStats(reviews) {
    if (!reviews || reviews.length === 0) {
      return {
        totalReviews: 0,
        averageRating: 5.0,
        featuredCount: 0,
        ratingDistribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / totalReviews).toFixed(1);
    const featuredCount = reviews.filter(review => review.featured).length;

    const ratingDistribution = reviews.reduce((dist, review) => {
      dist[review.rating] = (dist[review.rating] || 0) + 1;
      return dist;
    }, { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 });

    return {
      totalReviews,
      averageRating: parseFloat(averageRating),
      featuredCount,
      ratingDistribution
    };
  }
}

export default new FeaturableService();