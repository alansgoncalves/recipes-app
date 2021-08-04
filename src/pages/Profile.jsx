import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

export default function Profile() {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const handleEmailLocalStorage = () => {
      if (JSON.parse(localStorage.getItem('user'))) {
        const getEmail = JSON.parse(localStorage.getItem('user'));
        setEmail(getEmail.email);
      } else {
        setEmail('');
      }
    };
    handleEmailLocalStorage();
  }, []);

  return (
    <div>
      <HeaderWithoutSearch title="Perfil" />
      <h1 data-testid="page-title">Perfil</h1>
      <h3 data-testid="profile-email">{email}</h3>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}
