import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    <section>
      <form>
        <div>
          <input
            type="email"
            name="email"
            data-testid="email-input"
            onChange={ (e) => handleChangeInputs(e) }
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ (e) => handleChangeInputs(e) }
          />
        </div>
        <div>
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

        </div>
      </form>
    </section>
  );
}
