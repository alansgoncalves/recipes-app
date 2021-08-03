import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/Global.css';
import { Link } from 'react-router-dom';

export default function ProcessoComida(props) {
  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const { loading, setLoading } = useContext(Context);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    setLoading(true);
    const getFoodDetails = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await fetch(endpoint);
      const results = await data.json();
      setFoodDetails(results.meals[0]);
      const ingAndMe = Object.entries(results.meals[0]);
      const ing = ingAndMe.filter((el) => el[0].includes('Ingredient') && el[1] !== '');
      console.log(ing);
      setIngredients(ing);
      const me = ingAndMe.filter((el) => el[0].includes('Measure') && el[1] !== ' ');
      setMeasures(me);
      setLoading(false);
    };

    getFoodDetails();
  }, []);

  if (loading) {
    return <Loading />;
  }

  const eigth = 8;

  return (
    <div>
      <h1>Detalhes de Comida</h1>
      <h2 data-testid="recipe-title">{foodDetails.strMeal}</h2>
      <img src={ foodDetails.strMealThumb } data-testid="recipe-photo" alt="meal" />
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favorite icon" />
      </button>
      <p data-testid="recipe-category">{foodDetails.strCategory}</p>
      <h3>Ingredients</h3>
      <label htmlFor="checkbox">
        { ingredients.length < eigth && ingredients.map((ing, index) => (
          <div key={ index }>
            <input
              type="checkbox"
              data-testid={ `${index}-ingredient-step` }
            />
            <span>{ `${ing[1]} - ${measures[index][1]}` }</span>
          </div>
        )) }
      </label>
      <p data-testid="instructions">{foodDetails.strInstructions}</p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

ProcessoComida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
