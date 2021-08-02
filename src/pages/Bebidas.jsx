import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Comidas.css';
import Context from '../context/Context';

export default function Bebidas() {
  const { drink } = useContext(Context);
  const magicNumber = 12;

  return (
    <div className="comidas">
      Bebidas
      <Header />
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
