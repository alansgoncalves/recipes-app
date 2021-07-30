import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Comidas from '../pages/Comidas';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" componet={ Login } />
      <Route path="/comidas" component={ Comidas } />
    </Switch>
  );
}
