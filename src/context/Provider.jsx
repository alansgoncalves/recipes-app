import React from 'react';
import Context from './Context';

export default function Provider({ children }) {
  const [user, seUser] = useState({
    email: '',
    password: '',
  });
  const myContext = {};
  return (

    <Context.Provider value={ myContext }>
      { children }
    </Context.Provider>
  );
}
