import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Context from '../context/Context';
import FavoriteBtn from '../components/FavoriteBtn';
import UnfavoriteBtn from '../components/UnfavoriteBtn';
import ShareBtn from '../components/ShareBtn';
import RecCarousel from '../components/RecCarousel';
import '../styles/Global.css';

export default function DetalhesComidas(props) {
  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [inProgress, setInProgress] = useState(false);
  const [measures, setMeasures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const { loading, setLoading } = useContext(Context);
  const { match: { params: { id } } } = props;

  function verifyFavorites() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes.length > 0) {
      const favRecipe = favoriteRecipes.some((el) => el.id === id);
      setFavorite(favRecipe);
    }
  }

  function verifyInProgress() {
    if (localStorage.getItem('inProgressRecipes')) {
      const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const idMeals = Object.keys(inProgressRecipes.meals);
      const isInProgress = idMeals.some((el) => el === id);
      console.log(isInProgress);
      setInProgress(isInProgress);
    }
  }

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
  };

  const getRecommended = async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const data = await fetch(endpoint);
    const results = await data.json();
    setRecommendations(results.drinks);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    getFoodDetails();
    getRecommended();
    verifyFavorites();
    verifyInProgress();
  }, []);

  if (loading) {
    return <Loading />;
  }

  function deleteFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { idMeal } = foodDetails;
    const newFavRecipes = favoriteRecipes.filter(({ id: mealId }) => mealId !== idMeal);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
    setFavorite(false);
  }

  function saveFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
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

  return (
    <div>
      <h1>Detalhes de Comida</h1>
      <h2 data-testid="recipe-title">{foodDetails.strMeal}</h2>
      <img src={ foodDetails.strMealThumb } data-testid="recipe-photo" alt="meal" />
      <ShareBtn />
      { favorite
        ? <UnfavoriteBtn deleteFavorite={ deleteFavorite } />
        : <FavoriteBtn saveFavorite={ saveFavorite } />}
      <p data-testid="recipe-category">{foodDetails.strCategory}</p>
      <h3>Ingredients</h3>
      <ul>
        { ingredients.length > 0 && ingredients.map((ing, index) => (
          <li
            data-testid={ `${index}-ingredient-name-and-measure` }
            key={ index }
          >
            {`${ing[1]} - ${measures[index][1]}`}
          </li>
        )) }
      </ul>
      <p data-testid="instructions">{foodDetails.strInstructions}</p>
      <a data-testid="video" href={ foodDetails.strYoutube }>Video</a>
      <RecCarousel recommendations={ recommendations } />
      <Link to={ `/comidas/${id}/in-progress` }>
        { inProgress ? (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
          >
            Continuar Receita
          </button>
        ) : (
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
          >
            Iniciar Receita
          </button>
        ) }
      </Link>
    </div>
  );
}

DetalhesComidas.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};
