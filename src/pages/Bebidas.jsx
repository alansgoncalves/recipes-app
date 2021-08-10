import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../styles/Comidas.css';
import Context from '../context/Context';
import CategoryBtn from '../components/CategoryBtn';

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
    <main>
      <Header />
      <CategoryBtn />
      <Footer />
      {/* {categories.length === 0 ? <p>Loading</p>
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
        ))} */}
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
          )))}
      </div>
      <Footer />
    </main>
  );
}
