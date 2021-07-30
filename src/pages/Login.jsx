import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

export default function Login() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  function validateLogin() {
    const { email, password } = user;
    const re = /\S+@\S+\.\S+/;
    const magicNumber = 6;
    if (re.test(email) && password.length > magicNumber) {
      return true;
    }
    return false;
  }

  function handleChangeInputs({ target: { value, name } }) {
    setUser({ ...user, [name]: value });
  }

  function setLocalStorage() {
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    localStorage.setItem('user', JSON.stringify({ email: user.email }));
  }

  return (
<<<<<<< HEAD
    <div className="meals">
      <form>
=======
    <section>
      <form className="form-login">
>>>>>>> main-group-16
        <input
          type="email"
          name="email"
          placeholder="Email"
          data-testid="email-input"
          onChange={ (e) => handleChangeInputs(e) }
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ (e) => handleChangeInputs(e) }
        />
        <Link to="/comidas">
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ !validateLogin() }
            onClick={ () => setLocalStorage() }
          >
            Entrar
          </button>
        </Link>
      </form>
    </section>
  );
}
