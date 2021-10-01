import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import Context from '../context/Context';

function SearchBar() {
  const [input, setInput] = useState('');
  const [search, setSearch] = useState('');
  const { setDrink, setFood } = useContext(Context);
  const history = useHistory();
  const { location: { pathname } } = history;

  async function conditionEndpointDrink(value) {
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
    const response = await fetch(endpoint);
    const { drinks } = await response.json();
    if (!drinks) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (drinks.length === 1) history.push(`/bebidas/${drinks[0].idDrink}`);
    setDrink(drinks);
  }

  async function conditionEndpointFood(value) {
    let endpoint;
    if (input === 'ingredient') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
    } else if (input === 'name') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`;
    } else if (input === 'firstletter' && search.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
      return;
    } else if (input === 'firstletter') {
      endpoint = `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`;
    }
    if (!input) return null;
    const response = await fetch(endpoint);
    const { meals } = await response.json();
    if (!meals) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (meals.length === 1) history.push(`/comidas/${meals[0].idMeal}`);
    setFood(meals);
  }

  function conditionEndpoint() {
    if (pathname === '/bebidas') {
      return conditionEndpointDrink(search);
    }
    return conditionEndpointFood(search);
  }

  return (
    <div className="inputs-btns">
      <label htmlFor="search">
        <input
          className="input-search"
          data-testid="search-input"
          type="text"
          name="value"
          onChange={ ({ target: { value } }) => setSearch(value) }
          style={ { border: 'none' } }
          autoComplete="off"
        />
      </label>
      <div className="radio-btns">
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
        </label>
      </div>
      <div className="radio-btns">
        <label htmlFor="radio-btns">
          Nome
          <input
            id="radio-search"
            name="radio-search"
            type="radio"
            data-testid="name-search-radio"
            value="name"
            onChange={ ({ target: { value } }) => setInput(value) }
          />
        </label>
      </div>
      <div className="radio-btns">
        <label htmlFor="radio-btns">
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
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => conditionEndpoint() }
        className="btn btn-warning"
      >
        Buscar
      </button>
    </div>
  );
}

export default SearchBar;
