import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  // const[food, setFood] = useState('');
  // const[drink, setDrink] = useState('');
  const[results, setResults] = useState('');

  useEffect(() => {
    const getAPI = async () => {
      const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const { results } = await fetch(endpoint).then((api) => api.json());
      results.filter((item) => delete item.residents);
      setData(results);
    };
    getAPI();
  }, []);

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
    <Context.Provider value={ { food, drink, results, handleChange } }>
      { children }
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
