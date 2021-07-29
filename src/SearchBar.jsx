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
    </div>
  );
}

export default SearchBar;
