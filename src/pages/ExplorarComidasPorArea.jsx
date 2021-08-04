import React, { Component } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default class ExplorarComidasPorArea extends Component {
  render() {
    const showSearchButton = true;
    return (
      <div>
        <h1 data-testid="page-title">Explorar Origem</h1>
        <Header
          title="Explorar Origem"
          showSearchButton={ showSearchButton }
          isButtonVisible
        />
        <Footer />
      </div>
    );
  }
}
