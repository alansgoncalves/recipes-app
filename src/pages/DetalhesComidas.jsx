import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Loading from '../components/Loading';
import Context from '../context/Context';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import '../styles/Global.css';

export default function DetalhesComidas(props) {
  const [foodDetails, setFoodDetails] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
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
    };

    getFoodDetails();

    const getRecommended = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const data = await fetch(endpoint);
      const results = await data.json();
      setRecommendations(results.drinks);
      setLoading(false);
    };

    getRecommended();
  }, []);

  let slideIndex = 1;
  const prevSlide = -2;

  function showSlide(n) {
    const slides = document.getElementsByClassName('recomendation-card');
    if (n > slides.length) slideIndex = 1;
    if (n < 1) slideIndex = slides.length - 1;
    for (let i = 0; i < slides.length; i += 1) {
      slides[i].style.display = 'none';
    }
    slides[slideIndex - 1].style.display = 'block';
    slides[slideIndex].style.display = 'block';
  }

  function slide(n) {
    showSlide(slideIndex += n);
  }

  if (loading) {
    return <Loading />;
  }

  const recommendedDrinks = 6;

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
      <div className="carousel-container">
        { recommendations.map((rec, index) => (
          index < recommendedDrinks
          && (
            <div
              key={ index }
              data-testid={ `${index}-recomendation-card` }
              className="recomendation-card"
            >
              <Link to={ `/bebidas/${rec.idDrink}` }>
                <h4 data-testid={ `${index}-recomendation-title` }>{rec.strDrink}</h4>
                <img src={ rec.strDrinkThumb } alt="drink" />
              </Link>
            </div>
          ))) }
        <button
          type="button"
          className="prev"
          onClick={ () => slide(2) }
        >
          &#10094;
        </button>
        <button
          type="button"
          className="next"
          onClick={ () => slide(prevSlide) }
        >
          &#10095;
        </button>
      </div>
      <Link to={ `/comidas/${id}/in-progress` }>
        <button
          type="button"
          data-testid="start-recipe-btn"
          className="start-recipe-btn"
        >
          Iniciar receita
        </button>
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
