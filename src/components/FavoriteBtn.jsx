import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteBtn(props) {
  const { saveFavorite } = props;

  return (
    <button
      type="button"
      onClick={ saveFavorite }
    >
      <img src={ whiteHeartIcon } data-testid="favorite-btn" alt="favorite icon" />
    </button>
  );
}

FavoriteBtn.propTypes = {
  saveFavorite: PropTypes.func.isRequired,
};
