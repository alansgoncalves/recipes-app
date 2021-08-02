import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Loading from '../components/Loading';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function DetalhesBebidas(props) {
  const [drinkDetails, setDrinkDetails] = useState([]);
  const { loading, setLoading } = useContext(Context);
  const [recommendations, setRecommendations] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    const getDrinkDetails = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await fetch(endpoint);
      const results = await data.json();
      setDrinkDetails(results.drinks[0]);
      const ingAndMe = Object.entries(results.drinks[0]);
      const ing = ingAndMe.filter((el) => el[0].includes('Ingredient') && el[1] !== null);
      setIngredients(ing);
      const me = ingAndMe.filter((el) => el[0].includes('Measure'));
      setMeasures(me);
    };

    getDrinkDetails();

    const getRecommended = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const data = await fetch(endpoint);
      const results = await data.json();
      setRecommendations(results.meals);
      setLoading(false);
    };

    getRecommended();
  }, []);

  const recommendedMeals = 6;

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h1>Detalhes da Bebida</h1>
      <h2 data-testid="recipe-title">{drinkDetails.strDrink}</h2>
      <img src={ drinkDetails.strDrinkThumb } data-testid="recipe-photo" alt="meal" />
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favorite icon" />
      </button>
      <p data-testid="recipe-category">{drinkDetails.strCategory}</p>
      <h3>Ingredients</h3>
      <ul>
        { ingredients.map((ing, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${ing[1]} - ${measures[index][1]}`}
          </li>
        )) }
      </ul>
      <p data-testid="instructions">{drinkDetails.strInstructions}</p>
      { recommendations.map((rec, index) => (
        index < recommendedMeals
        && (
          <div key={ index } data-testid={ `${index}-recomendation-card` }>
            <h4>{rec.strMeal}</h4>
            <img src={ rec.strMealThumb } alt="meal" />
          </div>
        ))) }
      <button type="button" data-testid="start-recipe-btn">Iniciar receita</button>
    </div>
  );
}

DetalhesBebidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
