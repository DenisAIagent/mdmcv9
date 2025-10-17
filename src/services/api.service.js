import axios from 'axios';
import API_CONFIG from '../config/api.config';

// Service pour interagir avec le backend
class ApiService {
  constructor() {
    this.baseURL = API_CONFIG.API_URL;
    this.axios = axios.create({
      baseURL: this.baseURL,
      timeout: API_CONFIG.TIMEOUT,
      headers: API_CONFIG.HEADERS
    });
  }

  /**
   * Soumet le formulaire de contact
   * @param {Object} contactData - Données du formulaire de contact
   * @returns {Promise} - Promesse résolue avec la réponse de l'API
   */
  async submitContactForm(contactData) {
    try {
      const response = await this.axios.post('/contact/submit', contactData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire de contact:', error);
      throw error;
    }
  }

  /**
   * Soumet les résultats du simulateur
   * @param {Object} simulatorData - Données du simulateur
   * @returns {Promise} - Promesse résolue avec la réponse de l'API
   */
  async submitSimulatorResults(simulatorData) {
    try {
      const response = await this.axios.post('/simulator/submit', simulatorData);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la soumission des résultats du simulateur:', error);
      throw error;
    }
  }

  /**
   * Récupère les derniers articles du blog depuis WordPress
   * @param {Number} count - Nombre d'articles à récupérer (par défaut 3)
   * @returns {Promise} - Promesse résolue avec les articles
   */
  async getLatestBlogPosts(count = 3) {
    try {
      // Appel direct à l'API WordPress
      const response = await axios.get(`https://blog.mdmcmusicads.com/wp-json/wp/v2/posts`, {
        params: {
          per_page: count,
          _embed: true // Pour récupérer les images
        }
      });

      // Transformer les données WordPress au format attendu
      const posts = response.data.map(post => ({
        id: post.id,
        title: post.title.rendered,
        excerpt: post.excerpt.rendered,
        link: post.link,
        date: new Date(post.date).toLocaleDateString('fr-FR'),
        categories: post.categories.map(catId => ({ slug: this.getCategorySlug(catId) })),
        featuredImage: post._embedded?.['wp:featuredmedia']?.[0] ? {
          medium: post._embedded['wp:featuredmedia'][0].media_details?.sizes?.medium?.source_url || post._embedded['wp:featuredmedia'][0].source_url,
          full: post._embedded['wp:featuredmedia'][0].source_url
        } : null
      }));

      return posts;
    } catch (error) {
      console.error('Erreur lors de la récupération des articles du blog:', error);
      throw error;
    }
  }

  /**
   * Map des IDs de catégories WordPress vers les slugs
   */
  getCategorySlug(categoryId) {
    const categoryMap = {
      1: 'strategy',     // Others -> Strategy
      26: 'strategy',    // Interviews & Case Studies -> Strategy
      28: 'strategy',    // Tips & Strategies -> Strategy
      29: 'strategy',    // Trends & Insights -> Strategy
    };
    return categoryMap[categoryId] || 'strategy';
  }
}

export default new ApiService();
