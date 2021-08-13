import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';
import CategoryBtn from '../components/CategoryBtn';
import '../styles/Bebidas.css';

export default function Drinks() {
  const { drink, setDrink } = useContext(Context);
  const magicNumber = 12;
  // const [data, setData] = useState([]);
  // const [categories, setCategories] = useState([]);
  // const [toggle, setToggle] = useState('');

  async function fetchDrinks() {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const response = await fetch(endpoint);
    const json = await response.json();
    setDrink(json.drinks);
  }

  useEffect(() => {
    if (drink.length === 0) {
      fetchDrinks();
    }
  }, []);

  // async function categoriesDrinks() {
  //   const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  //   const response = await fetch(endpoint);
  //   const json = await response.json();
  //   setCategories(json);
  // }

  // useEffect(() => {
  //   categoriesDrinks();
  // }, []);

  // function searchByCategory({ target }) {
  //   if (toggle === target.name) {
  //     setToggle('');
  //   } else if (toggle === '') {
  //     setToggle(target.name);
  //   } else {
  //     setToggle(target.name);
  //   }
  // }

  // useEffect(() => {
  //   if (toggle) {
  //     const changeCategorieDrink = async () => {
  //       const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${toggle}`;
  //       const response = await fetch(endpoint);
  //       const json = await response.json();
  //       setData(json);
  //     };
  //     changeCategorieDrink();
  //   } else {
  //     fetchDrinks();
  //   }
  // }, [toggle]);
  // const maxArrayCategories = 5;

  return (
    <div className="bebidas">
      <Header />
      <h2>Bebidas</h2>
      <CategoryBtn />
      <div className="drink-list">
        { drink.length > 0 && drink.map((item, index) => (
          index < magicNumber
          && (
            <Link to={ `/bebidas/${item.idDrink}` } key={ item.idDrink }>
              <div
                className="card-drinks"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  className="card-img-drinks"
                  src={ item.strDrinkThumb }
                  alt={ item.strDrink }
                />
                <h1
                  className="card-title-drinks"
                  data-testid={ `${index}-card-name` }
                >
                  { item.strDrink }
                </h1>
              </div>
            </Link>
          )))}
      </div>
      <Footer />
    </div>
  );
}
