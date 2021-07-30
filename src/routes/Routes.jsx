import React from 'react';
import { Switch, Route } from 'react-router-dom';
<<<<<<< HEAD
import DetailsDrinks from '../components/DetailsDrinks';
import DetailsMeals from '../components/DetailsMeals';
=======
import Login from '../pages/Login';
>>>>>>> main-group-16
import Bebidas from '../pages/Bebidas';
import Comidas from '../pages/Comidas';
import Explorar from '../pages/Explorar';
import Login from '../pages/Login';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/" componet={ Login } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/perfil" />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/explorar" component={ Explorar } />
    </Switch>
  );
}
