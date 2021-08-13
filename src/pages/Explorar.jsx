import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderWithoutSearch from '../components/HeaderWithoutSearch';
import '../styles/Comidas.css';

class Explorar extends Component {
  render() {
    return (
      <div>
        <HeaderWithoutSearch title="" />
        <h2 className="header-explorer">Explorar</h2>
        <Footer />
        <section className="explorer-section">
          <Link to="/explorar/comidas">
            <button
              className="explore-comidas"
              id="explorer"
              type="button"
              data-testid="explore-food"
            >
              Explorar Comidas
            </button>
          </Link>
          <Link to="/explorar/bebidas">
            <button
              className="explore-bebidas"
              id="explorer"
              type="button"
              data-testid="explore-drinks"
            >
              Explorar Bebidas
            </button>
          </Link>
        </section>
      </div>
    );
  }
}

export default Explorar;
