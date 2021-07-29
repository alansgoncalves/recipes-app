import React from 'react';

function SearchBar() {
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
    </div>
  );
}

export default SearchBar;
