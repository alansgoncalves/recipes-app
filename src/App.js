import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes/Routes';
import Provider from './context/Provider';

function App() {
  return (
    <div className="meals">
      <Routes />
      <Provider>
        <div>Oi</div>
      </Provider>
    </div>
  );
}

export default App;
