import React, { Component } from 'react';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';

export default class ExplorarIngredientesComidas extends Component {
  render() {
    return (
      <div>
        <HeaderWithoutSearch title="Explorar Ingredientes" />
        <Footer />
      </div>
    );
  }
}
