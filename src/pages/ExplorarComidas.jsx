import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Context from '../context/Context';

export default function ExplorarComidas() {
/* const [meal, setMeal] = useState([]); */
  const { setFood } = useContext(Context);

  useEffect(() => {
    const getExploreMeal = async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
      const data = await fetch(endpoint);
      const results = await data.json();
      setFood(results.meals);
    };
    getExploreMeal();
  }, []);

  return (
    <div>
      <Header title="Explorar Comidas" />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to="/comidas/:id">
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
