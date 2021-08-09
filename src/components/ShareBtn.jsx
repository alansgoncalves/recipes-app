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
    <div>
      <button
        data-testid="share-btn"
        type="button"
        onClick={ copyToClipboard }
      >
        <img src={ shareIcon } alt="share icon" />
      </button>
      { clipboard && <p>Link copiado!</p> }
    </div>
  );
}
