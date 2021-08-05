import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function ExplorarComidasPorArea() {
  const [isLoading, setIsLoading] = useState(true);
  const [areas, setAreas] = useState([]);
  const [chosenArea, setChosenArea] = useState('');
  const [recipesCountryArea, setRecipesChosenArea] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const data = await response.json();
      const { meals } = data;
      setChosenArea(meals[0].strArea);
      setAreas(data.meals);
      setIsLoading(false);
    };
    fetchAPI();
  }, []);

  function originFoodAPI() {
    const fetchAPI = async () => {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${chosenArea}`);
      const data = await response.json();
      return setRecipesChosenArea(data.meals);
    };
    fetchAPI();

    const maxLength = 12;

    const recipes = recipesCountryArea.map((recipe, index) => {
      if (index < maxLength) {
        return (
          <Link to={ `/comidas/${recipe.idMeal}` } key={ recipe.strMealThumb }>
            <div className="card-ingredients" data-testid={ `${index}-recipe-card` }>
              <img
                width="200"
                alt="recipe"
                src={ recipe.strMealThumb }
                data-testid={ `${index}-card-img` }
              />
              <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
            </div>
          </Link>
        );
      } return null;
    });

    return recipes;
  }

  function renderDropDownAreas() {
    const options = areas.map((area) => (
      <option
        key={ area.strArea }
        value={ area.strArea }
        data-testid={ `${area.strArea}-option` }
      >
        {area.strArea}
      </option>
    ));

    const allOptions = (
      <option data-testid="All-option" value={ areas[0].strArea }>
        All
      </option>
    );

    return (
      <select
        onChange={ (event) => setChosenArea(event.target.value) }
        data-testid="explore-by-area-dropdown"
      >
        { options }
        { allOptions }
      </select>
    );
  }
  const showSearchButton = true;
  return (
    <div>
      <h1 data-testid="page-title">Explorar Origem</h1>
      <Header title="Explorar Origem" showSearchButton={ showSearchButton } />

      <span>{ isLoading ? <div /> : renderDropDownAreas() }</span>

      <span>{ isLoading ? <p>Carregando Receitas...</p> : originFoodAPI() }</span>

      <Footer />
    </div>
  );
}

export default ExplorarComidasPorArea;
