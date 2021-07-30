import React from 'react';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import '../styles/Comidas.css';

export default function Comidas() {
  return (
    <div className="comidas">
      Comidas
      <Footer />
      <SearchBar />
    </div>
  );
}
