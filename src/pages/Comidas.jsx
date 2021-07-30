import React from 'react';
import Footer from '../components/Footer';
import '../styles/Comidas.css';
import Header from '../components/Header';

export default function Comidas() {
  return (
    <div className="comidas">
      Comidas
      <Footer />
      <Header title="Comidas" showSearchIcon />
    </div>
  );
}
