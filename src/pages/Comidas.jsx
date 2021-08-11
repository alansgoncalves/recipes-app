import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Comidas.css';
import Logo2 from '../images/logo2.png';

function Foods() {
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [toggle, setToggle] = useState('');

  async function fetchFoods() {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endpoint);
    const json = await response.json();
    setData(json);
  }

  useEffect(() => {
    fetchFoods();
  }, []);

  async function categoriesFood() {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    const response = await fetch(endpoint);
    const json = await response.json();
    setCategories(json);
  }

  useEffect(() => {
    categoriesFood();
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
      const changeCategorieFood = async () => {
        const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${toggle}`;
        const response = await fetch(endpoint);
        const json = await response.json();
        setData(json);
      };
      changeCategorieFood();
    } else {
      fetchFoods();
    }
  }, [toggle]);

  const maxArrayFoods = 12;
  const maxArrayCategories = 5;

  return (
    <main>
      <div className="header">
        <img className="logo2" src={ Logo2 } alt="" width="130px" />
        <h1 data-testid="page-title">Comidas</h1>
      </div>
      <Header title="Comidas" />
      <div className="comidas-categories">
        <button
          className="btn-comidas"
          type="button"
          onClick={ () => fetchFoods() }
          data-testid="All-category-filter"
        >
          All
        </button>
        {categories.length === 0 ? <p>Loading</p>
          : categories.meals.slice(0, maxArrayCategories).map((categorie, index) => (
            <div className="btn-categories" key={ index }>
              <button
                className="btn-comidas"
                type="button"
                data-testid={ `${categorie.strCategory}-category-filter` }
                onClick={ (e) => searchByCategory(e) }
                name={ categorie.strCategory }
              >
                {categorie.strCategory}
              </button>
            </div>
          ))}
      </div>
      <div className="food-list">
        {data.length === 0 ? <p>Loading</p>
          : data.meals.slice(0, maxArrayFoods).map((food, index) => (
            <Link to={ `/comidas/${food.idMeal}` } key={ index }>
              <div
                className="container-food"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className="img-foods"
                  src={ food.strMealThumb }
                  alt="comida_principal"
                  data-testid={ `${index}-card-img` }
                />
                <p
                  className="name-food"
                  data-testid={ `${index}-card-name` }
                >
                  {
                    food.strMeal
                  }
                </p>
              </div>
            </Link>
          ))}
      </div>
      <Footer />
    </main>
  );
}

export default Foods;
