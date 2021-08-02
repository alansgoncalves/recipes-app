import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function CategoryBtn() {
  const [category, setCategory] = useState([]);
  const history = useHistory();
  const { location: { pathname } } = history;

  const listOfCategoriesFood = async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(endpoint);
    const { meals } = await response.json();
    if (meals.length) history.push(/comidas/);
    console.log(meals);
    setCategory(meals);
  };

  const listOfCategoriesDrink = async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(endpoint);
    const { drinks } = await response.json();
    if (drinks.length) history.push(/bebidas/);
    console.log(drinks);
    setCategory(drinks);
  };

  function conditionEndpoint() {
    if (pathname === '/bebidas') {
      return listOfCategoriesDrink();
    }
    return listOfCategoriesFood();
  }

  useEffect(() => {
    listOfCategoriesFood();
    listOfCategoriesDrink();
    conditionEndpoint();
  }, []);

  const magicNumber = 5;
  return (
    <div>
      <button id="btn-all" type="button" data-testid="All">All</button>
      {category.length > 0 && category.map(({ strCategory }, index) => (
        index < magicNumber && (
          <label htmlFor={ `${strCategory}${index}` } key={ index }>
            <button
              type="button"
              data-testid={ `${strCategory}-category-filter` }
            >
              { strCategory }
            </button>
          </label>
        )))}
    </div>
  );
}
