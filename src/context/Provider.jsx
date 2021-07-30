import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import Header from '../components/Header';

export default function Provider({ children }) {
  const [food, setFood] = useState([]);
  const [drink, setDrink] = useState([]);

  return (
    <Context.Provider value={ { drink, food, setFood, setDrink } }>
      { children }
      <Header />
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
