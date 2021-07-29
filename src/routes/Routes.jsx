import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Comidas from '../pages/Comidas';

export default function Routes() {
  return (
    <Switch>
      <Route path="/comidas" component={ Comidas } />
    </Switch>
  );
}
