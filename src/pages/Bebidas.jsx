import React from 'react';
import Footer from '../components/Footer';
import SearchBarDrink from '../components/SearchBarDrink';
import '../styles/Comidas.css';

export default function Bebidas() {
  return (
    <div className="comidas">
      Bebidas
      <SearchBarDrink />
      <Footer />
    </div>
  );
}
