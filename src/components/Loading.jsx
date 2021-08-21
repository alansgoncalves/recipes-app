import React from 'react';
import HeaderWithoutSearch from './HeaderWithoutSearch';
import Footer from './Footer';
import Logo3 from '../images/logo3.gif';

export default function Loading() {
  return (
    <div>
      <HeaderWithoutSearch />
      <div className="load-logo">
        <img className="logo3" src={ Logo3 } alt="" width="50%" />
      </div>
      <Footer />
    </div>
  );
}
