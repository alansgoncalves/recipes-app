import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Context from '../context/Context';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import '../styles/Bebidas.css';

export default function ExplorarIngredientesBebidas() {
  const [ingredientDrinkList, setIngredientDrinkList] = useState([]);
  const { setDrink } = useContext(Context);
  const magicNumber = 12;
  const history = useHistory();
  const { push } = history;

  const getIndredientsDrinks = async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const data = await fetch(endpoint);
    const { drinks } = await data.json();
    setIngredientDrinkList(drinks);
  };

  const getStrIngredients = async (strIngredient1) => {
    const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${strIngredient1}`;
    const data = await fetch(endpoint);
    const { drinks } = await data.json();
    setDrink(drinks);
    push('/bebidas');
  };

  useEffect(() => {
    getIndredientsDrinks();
  }, []);

  return (
    <div>
      <HeaderWithoutSearch title="" />
      <h2 className="food-ingredients">Explorar Ingredientes</h2>
      <div className="drink-list-ingredients">
        {ingredientDrinkList.length > 0 && ingredientDrinkList
          .map(({ strIngredient1 }, index) => (
            index < magicNumber
            && (
              <div
                className="card-drink-ingredients"
                key={ index }
                data-testid={ `${index}-ingredient-card` }
                onClick={ () => getStrIngredients(strIngredient1) }
                onKeyDown={ () => getStrIngredients(strIngredient1) }
                aria-hidden="true"
              >
                <img
                  data-testid={ `${index}-card-img` }
                  className="card-ingredients-img"
                  src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                  alt={ strIngredient1 }
                />
                <h1
                  data-testid={ `${index}-card-name` }
                  className="card-title-ingredients"
                >
                  {strIngredient1}
                </h1>
              </div>
            )
          ))}
      </div>
      <Footer />
    </div>
  );
}
