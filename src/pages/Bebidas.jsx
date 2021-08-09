import { Link } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Comidas.css';
import Context from '../context/Context';
import CategoryBtn from '../components/CategoryBtn';

export default function Bebidas() {
  const { drink, setDrink } = useContext(Context);
  const magicNumber = 12;

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

  return (
    <div className="comidas">
      Bebidas
      <Header />
      <CategoryBtn />
      <Footer />
      <div>
        { drink.length > 0 && drink.map((item, index) => (
          index < magicNumber
          && (
            <Link to={ `/bebidas/${item.idDrink}` } key={ item.idDrink }>
              <div
                className="card-drinks"
                data-testid={ `${index}-recipe-card` }
              >
                <h1
                  className="card-title-drinks"
                  data-testid={ `${index}-card-name` }
                >
                  { item.strDrink }
                </h1>
                <img
                  data-testid={ `${index}-card-img` }
                  className="card-img-drinks"
                  src={ item.strDrinkThumb }
                  alt={ item.strDrink }
                />
              </div>
            </Link>
          )
        ))}
      </div>
    </div>
  );
}
