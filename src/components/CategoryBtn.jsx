import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../context/Context';
import '../styles/Comidas.css';

export default function CategoryBtn() {
  const { setFood, setDrink } = useContext(Context);
  const [category, setCategory] = useState([]);
  const history = useHistory();
  const { location: { pathname } } = history;

  const listOfCategoriesFood = async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(endpoint);
    const { meals } = await response.json();
    if (meals.length) history.push(/comidas/);
    setCategory(meals);
  };

  const listOfCategoriesDrink = async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(endpoint);
    const { drinks } = await response.json();
    if (drinks.length) history.push(/bebidas/);
    setCategory(drinks);
  };

  function conditionEndpoint() {
    if (pathname === '/bebidas') {
      return listOfCategoriesDrink();
    }
    return listOfCategoriesFood();
  }

  const categoryFilterered = async ({ strCategory }) => {
    if (pathname === '/bebidas') {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${strCategory}`;
      console.log(url);
      const response = await fetch(url);
      const categories = await response.json();
      setDrink(categories.drinks);
      console.log(categories);
    } else {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${strCategory}`;
      const response = await fetch(url);
      const categories = await response.json();
      setFood(categories.meals);
    }
  };

  const categoryAll = async () => {
    if (pathname === '/bebidas') {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const categories = await response.json();
      setDrink(categories.drinks);
    } else {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const categories = await response.json();
      setFood(categories.meals);
    }
  };

  useEffect(() => {
    listOfCategoriesFood();
    listOfCategoriesDrink();
    conditionEndpoint();
  }, []);

  const magicNumber = 5;
  return (
    <div className="comidas-categories">
      <button
        className="btn-comidas"
        id="btn-all"
        type="button"
        data-testid="All-category-filter"
        onClick={ () => categoryAll() }
      >
        All
      </button>
      {category.length > 0 && category.map(({ strCategory }, index) => (
        index < magicNumber && (
          <label htmlFor={ `${strCategory}${index}` } key={ index }>
            <div className="btn-categories">
              <button
                className="btn-comidas"
                type="button"
                data-testid={ `${strCategory}-category-filter` }
                onClick={ () => categoryFilterered({ strCategory }) }
              >
                { strCategory }
              </button>
            </div>
          </label>
        )))}
    </div>
  );
}
