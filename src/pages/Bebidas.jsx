import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

export default function Drinks() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { drink, setDrink } = useContext(Context);
  const [toggle, setToggle] = useState('');

  async function fetchDrinks() {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endpoint);
    const json = await response.json();
    setData(json);
  }

  function fetchAPI() {
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setDrink(result.drinks);
      });
  }

  useEffect(() => {
    if (drink.length === 0) {
      fetchAPI();
    }
  }, []);

  async function categoriesDrinks() {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(endpoint);
    const json = await response.json();
    setCategories(json);
  }

  useEffect(() => {
    categoriesDrinks();
  }, []);

  function searchByCategory({ target }) {
    if (toggle === target.name) {
      setToggle('');
    } else if (toggle === '') {
      setToggle(target.name);
    } else {
      setToggle(target.name);
    }
  }

  useEffect(() => {
    if (toggle) {
      const changeCategorieDrink = async () => {
        const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${toggle}`;
        const response = await fetch(endpoint);
        const json = await response.json();
        setData(json);
      };
      changeCategorieDrink();
    } else {
      fetchDrinks();
    }
  }, [toggle]);

  const maxArrayDrinks = 12;
  const maxArrayCategories = 5;

  return (
    <main>
      <h1 data-testid="page-title">Bebidas</h1>
      <Header title="Bebidas" />
      <button
        type="button"
        onClick={ () => fetchDrinks() }
        data-testid="All-category-filter"
      >
        All
      </button>
      {categories.length === 0 ? <p>Loading</p>
        : categories.drinks.slice(0, maxArrayCategories).map((categorie, index) => (
          <div key={ index }>
            <button
              type="button"
              data-testid={ `${categorie.strCategory}-category-filter` }
              onClick={ (e) => searchByCategory(e) }
              name={ categorie.strCategory }
            >
              {categorie.strCategory}
            </button>
          </div>
        ))}
      {data.length === 0 ? <p>Loading</p>
        : data.drinks.slice(0, maxArrayDrinks).map((drinks, index) => (
          <Link to={ `/bebidas/${drink.idDrink}` } key={ index }>
            <div data-testid={ `${index}-recipe-card` }>
              <img
                src={ drink.strDrinkThumb }
                alt="comida_principal"
                data-testid={ `${index}-card-img` }
                width="100px"
              />
              <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
            </div>
          </Link>
        ))}
      <Footer />
    </main>
  );
}
