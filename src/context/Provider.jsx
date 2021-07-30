import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';
import Header from '../components/Header';

export default function Provider({ children }) {
  return (
    <Context.Provider>
      { children }
      <Header />
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
