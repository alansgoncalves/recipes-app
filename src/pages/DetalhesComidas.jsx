import React, { useEffect, useState } from 'react';

export default function DetalhesComidas(props) {
  const [foodDetails, setFoodDetails] = useState([]);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    const getFoodDetails = async () => {
      const endpoint = `www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { results } = await fetch(endpoint).then((data) => data.json());
      setFoodDetails(results);
    };

    getFoodDetails();
  }, []);

  return (
    <div>
      Detalhes de Comida
    </div>
  );
}
