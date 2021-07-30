import React from 'react';
import Footer from '../components/Footer';
import SearchBarFood from '../components/SearchBarFood';
import '../styles/Comidas.css';

export default function Comidas() {
  return (
    <div className="comidas">
      Comidas
      <SearchBarFood />
      <Footer />
    </div>
  );
}
