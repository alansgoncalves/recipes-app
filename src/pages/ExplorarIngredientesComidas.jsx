import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

export default function ExplorarIngredientesComidas() {
  const [ingredientMealList, setIngredientMealList] = useState([]);
  const { setFood } = useContext(Context);
  const magicNumber = 12;

  const getIndredientsMeals = async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
    const data = await fetch(endpoint);
    const { meals } = await data.json();
    setIngredientMealList(meals);
  };

  const getStrIngredients = async (strIngredient) => {
    const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${strIngredient}`;
    const data = await fetch(endpoint);
    const { meals } = await data.json();
    setFood(meals);
  };

  useEffect(() => {
    getIndredientsMeals();
  }, []);

  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <div>
        {ingredientMealList.length > 0 && ingredientMealList
          .map(({ strIngredient }, index) => (
            index < magicNumber
            && (
              <Link
                to="/comidas"
                onClick={ () => getStrIngredients(strIngredient) }
              >
                <div
                  key={ index }
                  data-testid={ `${index}-ingredient-card` }
                >

                  <img
                    data-testid={ `${index}-card-img` }
                    src={ `https://www.themealdb.com/images/ingredients/${strIngredient}-Small.png` }
                    alt={ strIngredient }
                  />
                  <p
                    data-testid={ `${index}-card-name` }
                  >
                    {strIngredient}
                  </p>
                </div>
              </Link>
            )
          ))}
      </div>
      <Footer />
    </div>
  );
}
