import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Comidas.css';

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

    return (
      <div className="food-list-explore">
        {recipesCountryArea.length > 0 && recipesCountryArea.map((item, index) => (
          index < maxLength && (
            <Link to={ `/comidas/${item.idMeal}` } key={ item.idMeal }>
              <div
                className="card-meals-explore"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  className="card-explore-img"
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                  style={ { width: '60%' } }
                />
                <h1
                  data-testid={ `${index}-card-name` }
                  className="card-title-meals"
                >
                  { item.strMeal }
                </h1>
              </div>
            </Link>
          )))}
      </div>
    );
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
        className="select-country"
      >
        { options }
        { allOptions }
      </select>
    );
  }
  const showSearchButton = true;
  return (
    <div>
      <Header title="" showSearchButton={ showSearchButton } />
      <h4 className="title-h2" data-testid="page-title">Explorar comida por Origem</h4>

      <span>{ isLoading ? <div /> : renderDropDownAreas() }</span>

      <span>{ isLoading ? <p>Carregando Receitas...</p> : originFoodAPI() }</span>

      <Footer />
    </div>
  );
}

export default ExplorarComidasPorArea;
