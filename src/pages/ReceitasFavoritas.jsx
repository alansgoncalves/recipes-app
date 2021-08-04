import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FavRecipeCard from '../components/FavRecipeCard';

export default function ReceitasFavoritas() {
  const [favRecipes, setFavRecipes] = useState([]);

  function getFavRecipes() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavRecipes(recipes);
  }

  useEffect(() => {
    getFavRecipes();
  }, []);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drink</button>
      { favRecipes.map((recipe,
        index) => <FavRecipeCard key={ index } index={ index } recipe={ recipe } />) }
    </div>
  );
}
