import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import FavRecipeCard from '../components/FavRecipeCard';

export default function ReceitasFeitas() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  function getDoneRecipes() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(recipes);
  }

  function filterByFood() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneFood = recipes.filter((recipe) => recipe.type === 'comida');
    setDoneRecipes(doneFood);
  }

  function filterByDrink() {
    const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneDrink = recipes.filter((recipe) => recipe.type === 'bebida');
    setDoneRecipes(doneDrink);
  }

  function removeFavorite(id) {
    const recipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newFavRecipes = recipes.filter((recipe) => recipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavRecipes));
    setFavRecipes(newFavRecipes);
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
      { favRecipes.map((recipe, index) => (
        <FavRecipeCard
          key={ index }
          index={ index }
          recipe={ recipe }
          removeFavorite={ removeFavorite }
        />
      )) }
    </div>
  );
}
