import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [toggleOn, setToggleOn] = useState(false);

  return (
    <Context.Provider
      value={ {
        drink,
        food,
        setFood,
        setDrink,
        showSearchBar,
        loading,
        setLoading,
        setShowSearchBar,
        toggleOn,
        setToggleOn } }
    >
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
