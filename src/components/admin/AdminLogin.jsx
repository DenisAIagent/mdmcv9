import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { generateDevJWT, validateDevCredentials } from '../../utils/auth';
import '../../assets/styles/admin-login.css';

const AdminLogin = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Pour le développement, utiliser la validation locale
    const isDevelopment = import.meta.env.DEV;

    if (isDevelopment) {
      // Authentification locale pour le développement
      setTimeout(() => {
        if (validateDevCredentials(username, password)) {
          const token = generateDevJWT(username);
          localStorage.setItem('mdmc_admin_auth', token);
          navigate('/admin/dashboard');
        } else {
          setError('Identifiants invalides. Utilisez admin@mdmc.com / mdmc2024! ou dev@mdmc.com / dev123!');
          setLoading(false);
        }
      }, 500); // Simuler un délai réseau
      return;
    }

    // Code d'authentification API pour la production
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!apiUrl) {
      console.error("VITE_API_URL non définie dans l'environnement.");
      setError("Erreur de configuration de l'API.");
      setLoading(false);
      return;
    }

    const loginUrl = `${apiUrl}/api/auth/login`;
    const body = JSON.stringify({ email: username, password: password });
    const headers = { 'Content-Type': 'application/json' };

    try {
      const response = await fetch(loginUrl, {
        method: 'POST',
        headers: headers,
        body: body
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || data.message || `Erreur de connexion (${response.status})`);
        setLoading(false);
        return;
      }

      if (data && data.token) {
        localStorage.setItem('mdmc_admin_auth', data.token);
        navigate('/admin/dashboard');
      } else {
        console.error("Connexion réussie mais token manquant dans la réponse:", data);
        setError('Erreur lors de la connexion : token manquant');
        setLoading(false);
      }

    } catch (err) {
      console.error("Erreur réseau ou technique lors de la connexion:", err);
      setError('Erreur réseau. Veuillez réessayer.');
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <h1>Connexion Admin</h1>
          <p>Accès au panneau d'administration MDMC</p>
        </div>

        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input
              type="email"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin@mdmc.com"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`admin-login-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className="admin-login-footer">
          <a href="/">Retour à l'accueil</a>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;