import React from 'react';
import { render, screen, act } from '@testing-library/react';
import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);
  });

  screen.debug();
});
