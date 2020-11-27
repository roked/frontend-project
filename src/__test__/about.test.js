import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import About from '../components/about';

describe('Build about', () => {
  test('renders About component', () => {
        <Router>
            <About />
        </Router>;
        screen.debug();
  });
});
