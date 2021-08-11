import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Loading from '../components/Loading';
import Context from '../context/Context';
import FavoriteBtn from '../components/FavoriteBtn';
import UnfavoriteBtn from '../components/UnfavoriteBtn';
import '../styles/Global.css';
import ShareBtn from '../components/ShareBtn';
import Ingredients from '../components/Ingredients';

export default function ProcessoBebida(props) {
  const [drinkDetails, setDrinkDetails] = useState([]);
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

    verifyFavorites();
    getDrinkDetails();
  }, []);

  function finishRecipe() {
    const checkbox = Array.from(document.getElementsByTagName('input'));
    const allChecked = checkbox.map((el) => el.checked).reduce((a, b) => a && b);
    setFinished(allChecked);
  }

  function deleteFavorite() {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const { idDrink } = drinkDetails;
    const newRecipes = favoriteRecipes.filter(({ id: drinkId }) => drinkId !== idDrink);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
    setFavorite(false);
  }

  function saveFavorite() {
    let favoriteRecipes = [];
    if (localStorage.getItem('favoriteRecipes')) {
      favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    }
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

  function saveDoneRecipe() {
    let doneRecipes = [];
    if (localStorage.getItem('doneRecipes')) {
      doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    }
    const { idDrink, strCategory, strDrink, strAlcoholic, strDrinkThumb } = drinkDetails;
    const newRecipe = {
      id: idDrink,
      type: 'bebida',
      area: '',
      category: strCategory,
      alcoholicOrNot: strAlcoholic,
      name: strDrink,
      image: strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: '',
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
      <h1>Detalhes da Bebida</h1>
      <h2 data-testid="recipe-title">{drinkDetails.strDrink}</h2>
      <img data-testid="recipe-photo" src={ drinkDetails.strDrinkThumb } alt="meal" />
      <ShareBtn />
      { favorite
        ? <UnfavoriteBtn deleteFavorite={ deleteFavorite } />
        : <FavoriteBtn saveFavorite={ saveFavorite } />}
      <p data-testid="recipe-category">{drinkDetails.strAlcoholic}</p>
      <Ingredients
        ingredients={ ingredients }
        finishRecipe={ finishRecipe }
        measures={ measures }
        food={ false }
        id={ id }
      />
      <p data-testid="instructions">{drinkDetails.strInstructions}</p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="finish-recipe-btn"
          disabled={ !finished }
          onClick={ saveDoneRecipe }
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
