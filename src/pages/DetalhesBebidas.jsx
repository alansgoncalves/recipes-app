import React, { useEffect, useState } from 'react';

export default function DetalhesBebidas(props) {
  const [drinkDetails, setDrinkDetails] = useState([]);
  const { match: { params: { id } } } = props;

  useEffect(() => {
    const getDrinkDetails = async () => {
      const endpoint = `www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { results } = await fetch(endpoint).then((data) => data.json());
      setDrinkDetails(results);
    };

    getDrinkDetails();
  }, []);
  return (
    <div>
      Detalhes de bebidas
    </div>
  );
}
