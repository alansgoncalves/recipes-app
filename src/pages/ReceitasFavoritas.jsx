import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FavRecipeCard from '../components/FavRecipeCard';

export default function ReceitasFavoritas() {
  const [favRecipes, setFavRecipes] = useState([]);

  function getFavRecipes() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavRecipes(recipes);
  }

  function filterByFood() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favFood = recipes.filter((recipe) => recipe.type === 'comida');
    setFavRecipes(favFood);
  }

  function filterByDrink() {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const favDrink = recipes.filter((recipe) => recipe.type === 'bebida');
    setFavRecipes(favDrink);
  }

  useEffect(() => {
    getFavRecipes();
  }, []);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ getFavRecipes }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ filterByFood }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ filterByDrink }
      >
        Drink
      </button>
      { favRecipes.map((recipe,
        index) => <FavRecipeCard key={ index } index={ index } recipe={ recipe } />) }
    </div>
  );
}
