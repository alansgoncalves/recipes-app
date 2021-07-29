import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Bebidas from '../pages/Bebidas';
import Comidas from '../pages/Comidas';

export default function Routes() {
  return (
    <Switch>
      <Route path="/comidas" component={ Comidas } />
      <Route path="/bebidas" component={ Bebidas } />
    </Switch>
  );
}
