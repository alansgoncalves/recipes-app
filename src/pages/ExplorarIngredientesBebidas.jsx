import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function ExplorarIngredientesBebidas() {
  const [ingredientDrinkList, setIngredientDrinkList] = useState([]);

  useEffect(() => {
    const getIndredientsDrinks = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
      const data = await fetch(endpoint);
      const { drinks } = await data.json();
      setIngredientDrinkList(drinks);
    };
    getIndredientsDrinks();
  }, []);

  /* const magicNumber = 12; */

  return (
    <>
      <Header title="Explorar Ingredientes" />
      <div>
        {ingredientDrinkList && ingredientDrinkList.map((ingDrink, index) => (
          <div
            key={ index }
            data-testid={ `${index}-recipe-card` }
          >
            <Link to={ `/bebidas/${ingDrink.idDrink}` }>
              <img
                src={ ingDrink.strDrinkThumb }
                alt={ ingDrink.strDrink }
                data-testid={ `${index}-card-img` }
              />
              <span
                data-testid={ `${index}-card-name` }
              >
                {ingDrink.strDrink}
              </span>
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </ >
  );
}
