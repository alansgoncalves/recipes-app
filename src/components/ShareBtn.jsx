import React, { useState } from 'react';
import { useHistory } from 'react-router';
import copytoclipboard from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn() {
  const [clipboard, setClipboard] = useState(false);
  const history = useHistory();
  const { location: { pathname } } = history;

  function copyToClipboard() {
    let url = window.location.href;
    if (pathname.includes('/in-progress')) {
      const newUrl = url.replace('/in-progress', '');
      url = newUrl;
    }
    copytoclipboard(url);
    setClipboard(true);
  }

  return (
    <div className="share-btn">
      <button
        data-testid="share-btn"
        type="button"
        onClick={ copyToClipboard }
        style={ { border: 'none', background: 'white' } }
      >
        <img
          src={ shareIcon }
          alt="share icon"
          style={ { color: 'red', border: 'none' } }
        />
      </button>
      { clipboard && <p style={ { color: 'red' } }>Link copiado!</p> }
    </div>
  );
}
