import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function RecCarousel(props) {
  const { recommendations } = props;
  const history = useHistory();
  const { location: { pathname } } = history;
  const recommendedRecipes = 6;

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

  if (pathname.includes('/bebidas')) {
    return (
      <div className="carousel-container">
        { recommendations.map((rec, index) => (
          index < recommendedRecipes
          && (
            <div
              key={ index }
              data-testid={ `${index}-recomendation-card` }
              className="recomendation-card"
            >
              <Link to={ `/comidas/${rec.idMeal}` }>
                <h4 data-testid={ `${index}-recomendation-title` }>{rec.strMeal}</h4>
                <img src={ rec.strMealThumb } alt="meal" />
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
    );
  }

  return (
    <div className="carousel-container">
      { recommendations.map((rec, index) => (
        index < recommendedRecipes
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
  );
}

RecCarousel.propTypes = {
  recommendations: PropTypes.arrayOf.isRequired,
};
