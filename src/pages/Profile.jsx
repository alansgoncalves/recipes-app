import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import '../styles/Comidas.css';

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
      <HeaderWithoutSearch title="" />
      <h2 className="title-profile" data-testid="page-title">Perfil</h2>
      <h4 className="email" data-testid="profile-email">{email}</h4>
      <div className="comidas-categories">
        <Link to="/receitas-feitas">
          <button
            className="btn-comidas"
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            className="btn-comidas"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <button
          className="btn-comidas"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClickRouteLogin }
        >
          Sair
        </button>
      </div>
      <Footer />
    </main>
  );
}
