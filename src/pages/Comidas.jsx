import React, { useContext } from 'react';
import Footer from '../components/Footer';
import SearchBarFood from '../components/SearchBarFood';
import '../styles/Comidas.css';
import Header from '../components/Header';
import Context from '../context/Context';

export default function Comidas() {
  const { food } = useContext(Context);

  console.log(food);

  return (
    <div className="comidas">
      Comidas
      <Header />
      <SearchBarFood />
      <Footer />
      <div>
        { food.map((item, index) => (
          <div
            key={ item.idMeal }
            className="card-meals"
            data-testid={ `${index}-recipe-card` }
          >
            <h1
              data-testid={ `${index}-card-name` }
              className="card-title-meals"
            >
              { item.strMeal }
            </h1>
            <img
              data-testid={ `${index}-card-img` }
              className="card-img-meals"
              src={ item.strMealThumb }
              alt={ item.strMeal }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
