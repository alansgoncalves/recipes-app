import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
import profileIcon from '../images/profileIcon.svg';
// import searchIcon from '../images/searchIcon.svg';
=======
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import Context from '../context/Context';
import SearchBar from './SearchBar';
>>>>>>> main-group-16

export default function Header() {
  const { showSearchBar, setShowSearchBar } = useContext(Context);
  const displaySearchBar = () => {
    console.log(showSearchBar);
    if (!showSearchBar) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  };

  return (
<<<<<<< HEAD
    <header>
      <Link to="/perfil">
        <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">Título</h1>
      {/* <button type="button">
        <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
      </button> */}
=======
    <header className="container">
      <div className="row align-items-center" style={ { height: '80px' } }>
        <div className="col-2">
          <Link to="/perfil">
            <img
              data-testid="profile-top-btn"
              src={ ProfileIcon }
              alt="link para perfil"
            />
          </Link>
        </div>
        <div className="col-2">
          <button type="button" onClick={ displaySearchBar }>
            <img data-testid="search-top-btn" src={ SearchIcon } alt="buscar receita" />
          </button>
        </div>
      </div>
      { showSearchBar ? <SearchBar /> : null }
>>>>>>> main-group-16
    </header>
  );
}
