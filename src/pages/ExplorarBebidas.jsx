import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

export default function ExplorarBebidas() {
  const history = useHistory();

  const getExploreCocktails = async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const data = await fetch(endpoint);
    const { drinks } = await data.json();

    if (drinks.length === 1) {
      const btnSurprise = drinks[0].idDrink;
      history.push(`/bebidas/${btnSurprise}`);
    }
  };

  return (
    <div>
      <HeaderWithoutSearch title="" />
      <h2 className="header-explorer-drink">Explorar Bebidas</h2>
      <div className="explorer-buttons">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            className="btns-explorer-drink"
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <button
          className="btns-explorer-drink"
          type="button"
          data-testid="explore-surprise"
          onClick={ getExploreCocktails }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}
