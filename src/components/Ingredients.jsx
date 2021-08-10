import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function Ingredients(props) {
  const { ingredients, finishRecipe, measures } = props;
  const history = useHistory();
  const { location: { pathname } } = history;

  function checkboxChecked() {
    const inputCheckbox = document.getElementsByTagName('input');
    for (let index = 0; index < inputCheckbox.length; index += 1) {
      const item = inputCheckbox[index];
      if (item.type === 'checkbox' && item.checked) {
        if (pathname === '/bebidas') {
          localStorage.setItem('inProgressRecipes', JSON.stringify(

            {
              cocktails: {
                idDrink: [ingredients[index]],
              },
            },
          ));
        }
        localStorage.setItem('inProgressRecipes', JSON.stringify({
          meals: {
            idMeal: [ingredients[index]],
          },
        }));
      }
    }
  }

  const fusionFunctions = () => {
    checkboxChecked();
    finishRecipe();
  };

  const eigth = 8;
  return (
    <div>
      <h3>Ingredients</h3>
      { ingredients.length > 0 && ingredients.map((ing, index) => (
        index < eigth && (
          <div key={ index } data-testid={ `${index}-ingredient-step` }>
            <input
              type="checkbox"
              onChange={ fusionFunctions }
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
