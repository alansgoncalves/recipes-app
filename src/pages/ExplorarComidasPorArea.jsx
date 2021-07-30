import React, { Component } from 'react';
import Header from '../components/Header';

export default class ExplorarComidasPorArea extends Component {
  render() {
    const showSearchButton = true;
    return (
      <div>
        <Header title="Explorar Origem" showSearchButton={ showSearchButton } />
      </div>
    );
  }
}
