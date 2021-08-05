import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Bebidas from '../pages/Bebidas';
import Comidas from '../pages/Comidas';
import Explorar from '../pages/Explorar';
import DetalhesComidas from '../pages/DetalhesComidas';
import DetalhesBebidas from '../pages/DetalhesBebidas';
import ExplorarBebidas from '../pages/ExplorarBebidas';
import ExplorarComidas from '../pages/ExplorarComidas';
import ExplorarIngredientesComidas from '../pages/ExplorarIngredientesComidas';
import ExplorarIngredientesBebidas from '../pages/ExplorarIngredientesBebidas';
import ExplorarComidasPorArea from '../pages/ExplorarComidasPorArea';
import ProcessoComida from '../pages/ProcessoComida';
import ProcessoBebida from '../pages/ProcessoBebida';
import ReceitasFeitas from '../pages/ReceitasFeitas';
import ReceitasFavoritas from '../pages/ReceitasFavoritas';
import Profile from '../pages/Profile';
import NotFound from '../components/NotFound';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/explorar" component={ Explorar } />
      <Route exact path="/explorar/comidas" component={ ExplorarComidas } />
      <Route exact path="/explorar/bebidas" component={ ExplorarBebidas } />
      <Route exact path="/comidas/:id" component={ DetalhesComidas } />
      <Route exact path="/bebidas/:id" component={ DetalhesBebidas } />
      <Route exact path="/explorar/comidas/area" component={ ExplorarComidasPorArea } />
      <Route path="/receitas-feitas" component={ ReceitasFeitas } />
      <Route path="/receitas-favoritas" component={ ReceitasFavoritas } />
      <Route
        exact
        path="/explorar/comidas/ingredientes"
        component={ ExplorarIngredientesComidas }
      />
      <Route
        exact
        path="/explorar/bebidas/ingredientes"
        component={ ExplorarIngredientesBebidas }
      />
      <Route exact path="/" component={ Login } />
      <Route exact path="/comidas" component={ Comidas } />
      <Route exact path="/bebidas" component={ Bebidas } />
      <Route exact path="/perfil" component={ Profile } />
      <Route exact path="/comidas/:id/in-progress" component={ ProcessoComida } />
      <Route exact path="/bebidas/:id/in-progress" component={ ProcessoBebida } />
      <Route
        exact
        path="/explorar/bebidas/area"
        component={ NotFound }
      />
    </Switch>
  );
}
