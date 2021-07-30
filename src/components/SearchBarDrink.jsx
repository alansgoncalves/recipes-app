import React, { useContext, useState } from 'react';
import Context from '../context/Context';

function SearchBarDrink() {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const { setDrink, showSearchBar } = useContext(Context);

  function conditionEndpoint(value) {
    let endpoint;
    if (input === 'ingredient') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`;
    } else if (input === 'name') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`;
    } else if (input === 'firstletter' && search.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    } else if (input === 'firstletter') {
      endpoint = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`;
    }
    if (!input) return null;
    return fetch(endpoint)
      .then((response) => response.json())
      .then(({ drinks }) => setDrink(drinks));
  }

  return (
    <div hidden={ showSearchBar }>
      <label htmlFor="search">
        <input
          data-testid="search-input"
          type="text"
          name="value"
          onChange={ ({ target: { value } }) => setSearch(value) }
        />
      </label>
      <label htmlFor="radio-search">
        Ingrediente
        <input
          id="radio-search"
          name="radio-search"
          value="ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
          onChange={ ({ target: { value } }) => setInput(value) }
        />
        Nome
        <input
          id="radio-search"
          name="radio-search"
          type="radio"
          data-testid="name-search-radio"
          value="name"
          onChange={ ({ target: { value } }) => setInput(value) }
        />
        Primeira Letra
        <input
          id="radio-search"
          value="firstletter"
          name="radio-search"
          type="radio"
          data-testid="first-letter-search-radio"
          onChange={ ({ target: { value } }) => setInput(value) }
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => conditionEndpoint(search) }
        className="btn btn-warning"
      >
        Buscar
      </button>
      <button type="button" data-testid="search-top-btn">Mock</button>
    </div>
  );
}

export default SearchBarDrink;
