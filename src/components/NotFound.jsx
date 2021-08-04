import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div>
    <h1>Erro404 - Not Found!</h1>
    <Link to="/comidas">
      Voltar página inicial
    </Link>
  </div>
);

export default NotFound;
