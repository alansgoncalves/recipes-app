import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Ingredients(props) {
  const { ingredients, finishRecipe, measures, id } = props;

  function verifyInProgress() {
    let progress = {
      cocktails: {},
      meals: {},
    };
    if (localStorage.getItem('inProgressRecipes')) {
      progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    }
    let ingredientsArr = progress.meals[id];
    if (!ingredientsArr) {
      ingredientsArr = [];
    }
    const inputArr = Array.from(document.getElementsByTagName('input'));
    inputArr.forEach((input) => {
      if (ingredientsArr.includes(input.name)) {
        input.checked = true;
      }
    });
  }

  const eigth = 8;
  useEffect(() => {
    verifyInProgress();
  }, []);

  function setInProgress() {
    let progress = {
      cocktails: {},
      meals: {},
    };
    if (localStorage.getItem('inProgressRecipes')) {
      progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    }
    const inputArr = Array.from(document.getElementsByTagName('input'));
    const checkedIngredients = [];
    inputArr.forEach((input) => {
      if (input.checked) {
        checkedIngredients.push(input.name);
      }
    });
    progress.meals[id] = checkedIngredients;
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  }

  // const newIngredients = [{ name: 'ovo', checked: false}]

  // function setMarked(id) {
  //   const checkedIngredients = newIngredients.map((ingredient, index) => {
  //     if (index === id) {
  //       ingredient.checked = !ingredient.checked;
  //       return ingredient;
  //     }
  //     return ingredient;
  //   });
  // }

  return (
    <div>
      <h3>Ingredients</h3>
      { ingredients.length > 0 && ingredients.map((ing, index) => (
        index < eigth && (
          <div key={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              type="checkbox"
              name={ ing[1] }
              onChange={ () => { finishRecipe(); setInProgress(); } }
            />
            <span>{ `${ing[1]} - ${measures[index][1]}` }</span>
          </div>
        ))) }
    </div>
  );
}

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf,
  finishRecipe: PropTypes.func,
  measures: PropTypes.arrayOf,
}.isRequired;
