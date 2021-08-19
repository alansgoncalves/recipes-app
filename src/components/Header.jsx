import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProfileIcon from '../images/profileIcon.svg';
import SearchIcon from '../images/searchIcon.svg';
import Context from '../context/Context';
import SearchBar from './SearchBar';

export default function Header(props) {
  const { title } = props;
  const { showSearchBar, setShowSearchBar } = useContext(Context);
  const displaySearchBar = () => {
    if (!showSearchBar) {
      setShowSearchBar(true);
    } else {
      setShowSearchBar(false);
    }
  };

  return (
    <header>
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
          <button
            className="btn-search"
            type="button"
            onClick={ displaySearchBar }
            style={ { border: 'none', borderRadius: '5px' } }
          >
            <img data-testid="search-top-btn" src={ SearchIcon } alt="buscar receita" />
          </button>
        </div>
        <h1 data-testid="page-title">{ title }</h1>
      </div>
      { showSearchBar ? <SearchBar /> : null }
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
