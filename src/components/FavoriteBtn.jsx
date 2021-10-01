import React from 'react';
import PropTypes from 'prop-types';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function FavoriteBtn(props) {
  const { saveFavorite } = props;

  return (
    <button
      type="button"
      onClick={ saveFavorite }
      style={ { border: 'none', background: 'white' } }
    >
      <img
        src={ whiteHeartIcon }
        data-testid="favorite-btn"
        alt="favorite icon"
        style={ { color: 'red', border: 'none' } }
      />
    </button>
  );
}

FavoriteBtn.propTypes = {
  saveFavorite: PropTypes.func.isRequired,
};
