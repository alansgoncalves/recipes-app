import React, { useState } from 'react';
import copytoclipboard from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';

export default function ShareBtn() {
  const [clipboard, setClipboard] = useState(false);

  function copyToClipboard() {
    copytoclipboard(window.location.href);
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
