import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Loading from '../components/Loading';
import Context from '../context/Context';
import ShareBtn from '../components/ShareBtn';
import FavoriteBtn from '../components/FavoriteBtn';
import UnfavoriteBtn from '../components/UnfavoriteBtn';
import '../styles/Global.css';
import Ingredients from '../components/Ingredients';

export default function ProcessoComida(props) {
  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [finished, setFinished] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const { loading, setLoading } = useContext(Context);
  const history = useHistory();
  const { push } = history;
  const { match: { params: { id } } } = props;

  function verifyFavorites() {
    if (localStorage.getItem('favoriteRecipes')) {
      const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (favoriteRecipes.length > 0) {
        const favRecipe = favoriteRecipes.some((el) => el.id === id);
        setFavorite(favRecipe);
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    const getFoodDetails = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await fetch(endpoint);
      const results = await data.json();
      setFoodDetails(results.meals[0]);
      const ingAndMe = Object.entries(results.meals[0]);
      const ing = ingAndMe.filter((el) => el[0].includes('Ingredient') && el[1] !== '');
      setIngredients(ing);
      const me = ingAndMe.filter((el) => el[0].includes('Measure') && el[1] !== ' ');
      setMeasures(me);
      setLoading(false);
    };

    verifyFavorites();
    getFoodDetails();
  }, []);

  function finishRecipe() {
    const checkbox = Array.from(document.getElementsByTagName('input'));
    const allChecked = checkbox.map((el) => el.checked).reduce((a, b) => a && b);
    setFinished(allChecked);
  }

  function deleteFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { idMeal } = foodDetails;
    const newFavRecipes = favoriteRecipes.filter(({ id: mealId }) => mealId !== idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
    setFavorite(false);
  }

  function saveFavorite() {
    let favoriteRecipes = [];
    if (localStorage.getItem('favoriteRecipes')) {
      favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    }
    const { idMeal, strArea, strCategory, strMeal, strMealThumb } = foodDetails;
    const newRecipe = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
    };
    const allFavRecipes = [...favoriteRecipes, newRecipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(allFavRecipes));
    setFavorite(true);
  }

  function saveDoneRecipe() {
    let doneRecipes = [];
    if (localStorage.getItem('doneRecipes')) {
      doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    }
    const { idMeal, strArea, strCategory, strMeal, strMealThumb, strTags } = foodDetails;
    const newRecipe = {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory,
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: strTags !== null && strTags.split(','),
    };
    const allDoneRecipes = [...doneRecipes, newRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(allDoneRecipes));
    push('/receitas-feitas');
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h2 className="food-ingredients">Detalhes da Comida</h2>
      <div className="food-meals-details">
        <h4 data-testid="recipe-title">{foodDetails.strMeal}</h4>
        <img
          className="card-img-meals"
          src={ foodDetails.strMealThumb }
          data-testid="recipe-photo"
          alt="meal"
        />
        <p data-testid="recipe-category">{foodDetails.strCategory}</p>
      </div>
      <div className="details-btn">
        <ShareBtn />
        { favorite
          ? <UnfavoriteBtn deleteFavorite={ deleteFavorite } />
          : <FavoriteBtn saveFavorite={ saveFavorite } />}
      </div>
      {/* <h3>Ingredients</h3>
      <label htmlFor="checkbox">
        { ingredients.length > 0 && ingredients.map((ing, index) => (
          index < eigth && (
            <div key={ index } data-testid={ `${index}-ingredient-step` }>
              <input
                type="checkbox"
                onChange={ finishRecipe }
              />
              <span>{ `${ing[1]} - ${measures[index][1]}` }</span>
            </div>
          ))) }
      </label> */}
      <div className="ingredients-details">
        <Ingredients
          ingredients={ ingredients }
          finishRecipe={ finishRecipe }
          measures={ measures }
        />
        <h4>Steps:</h4>
        <p data-testid="instructions">{foodDetails.strInstructions}</p>
      </div>
      <div className="recipe-btn">
        <Link to="/receitas-feitas">
          <button
            className="finish-recipe-btn"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !finished }
            onClick={ saveDoneRecipe }
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
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
