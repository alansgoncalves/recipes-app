import React, { useContext } from 'react';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import Header from '../components/Header';
import '../styles/Comidas.css';
import Context from '../context/Context';

export default function Bebidas() {
  const { drink } = useContext(Context);
  return (
    <div className="comidas">
      Bebidas
      <Header />
      <SearchBar />
      <Footer />
      <div>
        { drink.map((item) => (
          <div key={ item.idDrink } className="card-drinks">
            <h1 className="card-title-drinks">{ item.strDrink }</h1>
            <img
              className="card-img-drinks"
              src={ item.strDrinkThumb }
              alt={ item.strDrink }
            />
          </div>
        ))}
      </div>
    </div>
  );
}
