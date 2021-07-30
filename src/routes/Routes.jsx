import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Comidas from '../pages/Comidas';
import Login from '../pages/Login';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" component={ Login } />
      <Route path="/comidas" component={ Comidas } />
    </Switch>
  );
}
