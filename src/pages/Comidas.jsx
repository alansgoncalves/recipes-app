import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import Footer from '../components/Footer';
import Header from '../components/Header';
import CategoryBtn from '../components/CategoryBtn';
import '../styles/Comidas.css';

function Foods() {
  const { food, setFood } = useContext(Context);
  const magicNumber = 12;

  async function fetchFoods() {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endpoint);
    const json = await response.json();
    setFood(json.meals);
  }

  useEffect(() => {
    if (food.length === 0) {
      fetchFoods();
    }
  }, []);

  return (
    <div className="comidas">
      <Header title="" />
      <h2>Comidas</h2>
      <CategoryBtn />
      <div className="food-list">
        {food.length > 0 && food.map((item, index) => (
          index < magicNumber
          && (
            <Link to={ `/comidas/${item.idMeal}` } key={ item.idMeal }>
              <div
                className="card-meals"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  className="card-img-meals"
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                />
                <h1
                  data-testid={ `${index}-card-name` }
                  className="card-title-meals"
                >
                  { item.strMeal }
                </h1>
              </div>
            </Link>
          )))}
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
