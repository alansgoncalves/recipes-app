import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {

  const [results, setResults] = useState('');
  const { value } = results;

  const handleChange = ({ target }) => {
    switch (value) {
    case 'name':
      setResults({ name: target.name });
      break;
    default:
      setResults({ name: target.name });
    }
  };

  return (
    <Context.Provider value={ { results, handleChange } }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
