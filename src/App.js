import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes/Routes';
import Provider from './context/Provider';
import SearchBar from './components/SearchBar';

function App() {
  return (
    <div className="meals">
      <Routes />
      <Provider>
        <SearchBar />
      </Provider>
    </div>
  );
}

export default App;
