import React from 'react';
import PropTypes from 'prop-types';

export default function Ingredients(props) {
  const { ingredients, finishRecipe, measures } = props;
  const eigth = 8;
  return (
    <div>
      <h3>Ingredients</h3>
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
    </div>
  );
}

Ingredients.propTypes = {
  ingredients: PropTypes.arrayOf,
  finishRecipe: PropTypes.func,
  measures: PropTypes.arrayOf,
}.isRequired;
