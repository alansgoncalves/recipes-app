import React from 'react';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function UnfavoriteBtn(props) {
  const { deleteFavorite } = props;

  return (
    <button
      type="button"
      onClick={ deleteFavorite }
      style={ { border: 'none', background: 'white' } }
    >
      <img
        src={ blackHeartIcon }
        data-testid="favorite-btn"
        alt="favorite icon"
        style={ { background: 'none', color: 'none' } }
      />
    </button>
  );
}

UnfavoriteBtn.propTypes = {
  deleteFavorite: PropTypes.func.isRequired,
};
