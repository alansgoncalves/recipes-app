import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/Global.css';

export default function ProcessoBebida(props) {
  const [drinkDetails, setDrinkDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [finished, setFinished] = useState(false);
  const { loading, setLoading } = useContext(Context);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    setLoading(true);
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
      setLoading(false);
    };

    getDrinkDetails();
  }, []);

  function finishRecipe() {
    const checkbox = Array.from(document.getElementsByTagName('input'));
    const allChecked = checkbox.map((el) => el.checked).reduce((a, b) => a && b);
    setFinished(allChecked);
  }

  if (loading) {
    return <Loading />;
  }

  const three = 3;

  return (
    <div>
      <h1>Detalhes da Bebida</h1>
      <h2 data-testid="recipe-title">{drinkDetails.strDrink}</h2>
      <img data-testid="recipe-photo" src={ drinkDetails.strDrinkThumb } alt="meal" />
      <button data-testid="share-btn" type="button">
        <img src={ shareIcon } alt="share icon" />
      </button>
      <button data-testid="favorite-btn" type="button">
        <img src={ whiteHeartIcon } alt="favorite icon" />
      </button>
      <p data-testid="recipe-category">{drinkDetails.strAlcoholic}</p>
      <h3>Ingredients</h3>
      <div>
        { ingredients.length > 0 && ingredients.map((ing, index) => (
          index < three && (
            <label
              htmlFor="checkbox"
              key={ index }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                id="checkedInput"
                type="checkbox"
                onChange={ finishRecipe }
              />
              { `${ing[1]} - ${measures[index][1]}` }
            </label>
          ))) }
      </div>
      <p data-testid="instructions">{drinkDetails.strInstructions}</p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ !finished }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

ProcessoBebida.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
