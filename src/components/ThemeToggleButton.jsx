// Example toggle button
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { Button } from 'react-bootstrap';

const ThemeToggleButton = () => {
  const { dark, toggleTheme } = useContext(ThemeContext);

  return (
    <Button variant={dark ? 'light' : 'dark'} onClick={toggleTheme}>
      {dark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    </Button>
  );
};

export default ThemeToggleButton;
