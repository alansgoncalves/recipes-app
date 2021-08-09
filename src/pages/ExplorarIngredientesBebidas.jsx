import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

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
    <>
      <Header title="Explorar Ingredientes" />
      <div>
        {ingredientDrinkList.length > 0 && ingredientDrinkList
          .map(({ strIngredient1 }, index) => (
            index < magicNumber
            && (
              <div
                key={ index }
                data-testid={ `${index}-ingredient-card` }
              >
                <button
                  type="button"
                  onClick={ () => getStrIngredients(strIngredient1) }
                >
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ `https://www.thecocktaildb.com/images/ingredients/${strIngredient1}-Small.png` }
                    alt={ strIngredient1 }
                  />
                  <p
                    data-testid={ `${index}-card-name` }
                  >
                    {strIngredient1}
                  </p>
                </button>
              </div>
            )
          ))}
      </div>
      <Footer />
    </>
  );
}
