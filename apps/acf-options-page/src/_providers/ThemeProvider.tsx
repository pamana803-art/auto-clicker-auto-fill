import React, { ReactNode, createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export const ThemeContext = createContext({ theme: 'light' });

interface Props {
  children?: ReactNode;
  // any props that come into the component
}

function ThemeProvider({ children }:Props) {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    setTheme(localStorage.getItem('theme') || 'light');
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

ThemeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export default ThemeProvider;
