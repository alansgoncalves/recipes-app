import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Bebidas from '../pages/Bebidas';
import Comidas from '../pages/Comidas';
import Explorar from '../pages/Explorar';
import Profile from '../pages/Profile';

export default function Routes() {
  return (
    <Switch>
      <Route path="/comidas" component={ Comidas } />
      <Route path="/perfil" exact component={ Profile } />
      <Route path="/bebidas" component={ Bebidas } />
      <Route path="/explorar" component={ Explorar } />
    </Switch>
  );
}
