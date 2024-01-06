import React from 'react';
import { useDarkMode } from '../hooks';

export const ToggleMode = () => {
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div>
      <div className="navbar">
        <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
      </div>
      <div
        style={{
          width: '300px',
          height: '300px',
          backgroundColor: darkMode ? 'black' : 'red',
        }}
      />
    </div>
  );
};
