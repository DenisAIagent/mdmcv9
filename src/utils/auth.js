// Utilitaires d'authentification sécurisée

/**
 * Génère un JWT simple pour le développement local
 * En production, cette fonction ne doit pas être utilisée
 * Les JWTs doivent être générés côté serveur
 */
export const generateDevJWT = (userEmail) => {
  const header = {
    alg: "HS256",
    typ: "JWT"
  };

  const payload = {
    sub: userEmail,
    iss: "mdmc-admin",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (4 * 60 * 60), // 4 heures
    role: "admin"
  };

  // Encodage Base64URL
  const encodeBase64URL = (obj) => {
    return btoa(JSON.stringify(obj))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const headerEncoded = encodeBase64URL(header);
  const payloadEncoded = encodeBase64URL(payload);

  // Signature factice pour le développement (ne pas utiliser en production)
  const signature = btoa("dev-signature").replace(/=/g, '');

  return `${headerEncoded}.${payloadEncoded}.${signature}`;
};

/**
 * Valide les informations d'identification pour le développement
 * En production, cette validation doit être faite côté serveur
 */
export const validateDevCredentials = (username, password) => {
  // Identifiants de développement seulement
  const validCredentials = [
    { username: 'admin@mdmc.com', password: 'mdmc2024!' },
    { username: 'dev@mdmc.com', password: 'dev123!' }
  ];

  return validCredentials.some(cred =>
    cred.username === username && cred.password === password
  );
};

/**
 * Décode et valide un JWT
 */
export const validateJWT = (token) => {
  try {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));

    // Vérifier l'expiration
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null;
    }

    // Vérifier l'issuer
    if (payload.iss !== 'mdmc-admin') {
      return null;
    }

    return payload;
  } catch (error) {
    return null;
  }
};

/**
 * Nettoie l'authentification locale
 */
export const clearAuth = () => {
  localStorage.removeItem('mdmc_admin_auth');
};