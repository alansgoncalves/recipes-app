import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Ingredients(props) {
  const { ingredients, finishRecipe, measures, id, food } = props;
  const [ingredientsList, setIngredientsList] = useState([]);
  const [numberOfIngredients, setNumberOfIngredients] = useState(0);

  function verifyInProgress() {
    const allIngredients = ingredients.map((ing) => ({ name: ing[1], checked: false }));
    let progress = {
      cocktails: {},
      meals: {},
    };
    if (localStorage.getItem('inProgressRecipes')) {
      progress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    }
    let ingredientsArr = [];
    if (food) {
      ingredientsArr = progress.meals[id];
    } else {
      ingredientsArr = progress.cocktails[id];
    }
    if (!ingredientsArr) {
      ingredientsArr = [];
    }
    const ingArr = allIngredients.map((ing) => {
      if (ingredientsArr.includes(ing.name)) {
        ing.checked = true;
        return ing;
      }
      return ing;
    });
    setIngredientsList(ingArr);
  }

  useEffect(() => {
    const eigth = 8;
    const three = 3;
    if (food) {
      setNumberOfIngredients(eigth);
    } else {
      setNumberOfIngredients(three);
    }
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
    const ingArr = ingredientsList;
    const checkedIngredients = [];
    ingArr.forEach((ing) => {
      if (ing.checked) {
        checkedIngredients.push(ing.name);
      }
    });
    if (!food) {
      progress.cocktails[id] = checkedIngredients;
    } else {
      progress.meals[id] = checkedIngredients;
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(progress));
  }

  function setChecked({ target: { name } }) {
    const checkedIngredients = ingredientsList.map((ingredient) => {
      if (ingredient.name === name) {
        ingredient.checked = !ingredient.checked;
        return ingredient;
      }
      return ingredient;
    });
    setIngredientsList(checkedIngredients);
  }

  return (
    <div>
      <h3>Ingredients</h3>
      { ingredientsList.length > 0 && ingredientsList.map((ing, index) => (
        index < numberOfIngredients && (
          <div key={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              type="checkbox"
              name={ ing.name }
              checked={ ing.checked }
              onChange={ (e) => { setChecked(e); finishRecipe(); setInProgress(); } }
            />
            <span>{ `${ing.name} - ${measures[index][1]}` }</span>
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
