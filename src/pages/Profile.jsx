import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

export default function Profile() {
  const [email, setEmail] = useState('');
  const history = useHistory();

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

  const handleClickRouteLogin = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <main>
      <HeaderWithoutSearch title="Perfil" />
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
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickRouteLogin }
      >
        Sair
      </button>
      <Footer />
    </main>
  );
}
