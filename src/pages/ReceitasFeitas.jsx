import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DoneRecipeCard from '../components/DoneRecipeCard';
import Footer from '../components/Footer';

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

  useEffect(() => {
    getDoneRecipes();
  }, []);

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <Footer />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ getDoneRecipes }
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
      { doneRecipes.length > 0 && doneRecipes.map((recipe, index) => (
        <DoneRecipeCard
          key={ index }
          index={ index }
          recipe={ recipe }
        />
      )) }
    </div>
  );
}
