import React from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const myContext = {};
  return (

    <Context.Provider value={ myContext }>
      { children }
    </Context.Provider>
  );
}
