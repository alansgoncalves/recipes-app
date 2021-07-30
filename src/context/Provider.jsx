import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <Context.Provider
      value={ {
        drink,
        food,
        setFood,
        setDrink,
        showSearchBar,
        setShowSearchBar } }
    >
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
