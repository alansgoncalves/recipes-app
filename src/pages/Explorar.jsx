import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

class Explorar extends Component {
  render() {
    return (
      <div>
        <Header title="Explorar" />
        <Footer />
        <section>
          <Link to="/explorar/comidas">
            <button
              id="explorer"
              type="button"
              data-testid="explore-food"
            >
              Explorar Comidas
            </button>
          </Link>
          <Link to="/explorar/bebidas">
            <button
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
