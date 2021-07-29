import React from 'react';
import Context from './Context';

export default function Provider() {
  const myContext = {};
  return (
    <Context.Provider value={ myContext }>
      { children }
    </Context.Provider>
  );
}
