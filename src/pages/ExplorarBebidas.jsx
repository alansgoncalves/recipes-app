import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../context/Context';

export default function ExplorarBebidas() {
/* const [cocktail, setCocktail] = useState([]); */
  const { setDrink } = useContext(Context);

  useEffect(() => {
    const getExploreCocktails = async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
      const data = await fetch(endpoint);
      const results = await data.json();
      setDrink(results.drinks);
    };
    getExploreCocktails();
  }, []);

  return (
    <div>
      <Header title="Explorar Bebidas" />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/bebidas/:id">
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}
