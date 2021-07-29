import React, { useContext } from 'react';
import Context from '../context/Context';

function SearchBar() {
  const { results } = useContext(Context);
  const { value } = results;

  return (
    <div>
      <label htmlFor="search">
        <input
          data-testid="search-input"
          type="text"
          value={ value }
          onChange={ ({ target }) => (target.value) }
        />
      </label>
      <label htmlFor="radio-search">
        Ingrediente
        <input id="radio-search" type="radio" data-testid="ingredient-search-radio" />
        Nome
        <input id="radio-search" type="radio" data-testid="name-search-radio" />
        Primeira Letra
        <input id="radio-search" type="radio" data-testid="first-letter-search-radio" />
      </label>
      <button type="button" data-testid="exec-search-btn">Buscar</button>
      <button type="button" data-testid="search-top-btn">Mock</button>
    </div>
  );
}

export default SearchBar;
