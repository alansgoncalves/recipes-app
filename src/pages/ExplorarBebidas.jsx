import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

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
      <Header title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ getExploreCocktails }
      >
        Me Surpreenda!
      </button>
      <Footer />
    </div>
  );
}
