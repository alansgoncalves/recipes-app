import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../context/Context';
import Loading from '../components/Loading';
import ShareBtn from '../components/ShareBtn';
import RecCarousel from '../components/RecCarousel';
import FavoriteBtn from '../components/FavoriteBtn';
import UnfavoriteBtn from '../components/UnfavoriteBtn';
import '../styles/Global.css';

export default function DetalhesBebidas(props) {
  const [drinkDetails, setDrinkDetails] = useState([]);
  const { loading, setLoading } = useContext(Context);
  const [recommendations, setRecommendations] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const { match: { params: { id } } } = props;

  function verifyFavorites() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteRecipes.length > 0) {
      const favRecipe = favoriteRecipes.some((el) => el.id === id);
      setFavorite(favRecipe);
    }
  }

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

  const getRecommended = async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const data = await fetch(endpoint);
    const results = await data.json();
    setRecommendations(results.meals);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
    getDrinkDetails();
    verifyFavorites();
    getRecommended();
  }, []);

  function deleteFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { idDrink } = drinkDetails;
    const newRecipes = favoriteRecipes.filter(({ id: drinkId }) => drinkId !== idDrink);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
    setFavorite(false);
  }

  function saveFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { idDrink, strCategory, strDrink, strAlcoholic, strDrinkThumb } = drinkDetails;
    const newRecipe = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
    };
    const allFavRecipes = [...favoriteRecipes, newRecipe];
    localStorage.setItem('favoriteRecipes', JSON.stringify(allFavRecipes));
    setFavorite(true);
  }

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <h2 className="food-ingredients">Detalhes da Bebida</h2>
      <div className="food-meals-details">
        <h4 data-testid="recipe-title">{drinkDetails.strDrink}</h4>
        <img
          src={ drinkDetails.strDrinkThumb }
          className="card-img-meals"
          data-testid="recipe-photo"
          alt="meal"
        />
        <p data-testid="recipe-category">{drinkDetails.strAlcoholic}</p>
      </div>
      <div className="details-btn">
        <ShareBtn />
        { favorite
          ? <UnfavoriteBtn deleteFavorite={ deleteFavorite } />
          : <FavoriteBtn saveFavorite={ saveFavorite } /> }
      </div>
      <div className="ingredients-details">
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
        <h4>Steps:</h4>
        <p data-testid="instructions">{drinkDetails.strInstructions}</p>
      </div>
      <div className="recipe-btn">
        <Link to={ `/bebidas/${id}/in-progress` }>
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="start-recipe-btn"
          >
            Iniciar receita
          </button>
        </Link>
      </div>
      <RecCarousel recommendations={ recommendations } />
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
