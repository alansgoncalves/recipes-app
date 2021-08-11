import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import Logo from '../images/logo.gif';

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
    <section className="container">
      <div className="brand-logo">
        <img className="logo" src={ Logo } alt="" width="130px" />
      </div>
      <form className="form-login">
        <input
          className="input-login1"
          type="email"
          name="email"
          placeholder="Email"
          data-testid="email-input"
          onChange={ (e) => handleChangeInputs(e) }
          style={ { border: 'none' } }
        />
        <input
          className="input-login2"
          type="password"
          name="password"
          placeholder="Senha"
          data-testid="password-input"
          onChange={ (e) => handleChangeInputs(e) }
          style={ { border: 'none' } }
        />
        <Link to="/comidas">
          <button
            className="btn-login"
            type="button"
            data-testid="login-submit-btn"
            disabled={ !validateLogin() }
            onClick={ () => setLocalStorage() }
          >
            Entrar
          </button>
        </Link>
      </form>
      <p className="link">
        Forgot password?
        <a href="#paracadastro"> or Sign up</a>
      </p>
    </section>
  );
}
