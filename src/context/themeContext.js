import React from 'react';

export const Theme = React.createContext();

export const themes = {
  light: {
    name: 'light',
    foreground: '#000000',
    background: '#eeeeee',
    color: 'red',
  },
  dark: {
    name: 'dark',
    foreground: '#ffffff',
    background: '#222222',
    color: 'white',
  },
};
