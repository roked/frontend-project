import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from '../layout/navbar';

describe('Build navbar', () => {
  test('renders Navbar component', () => {
        <Router>
            <NavBar />
        </Router>;
  });
});

describe('Logo button', () => {
  test('find the logo home button', () => {
    render(
            <Router>
                <NavBar />
            </Router>,
    );
    expect(screen.getByText(/Real Estate Listing/)).toBeInTheDocument();
  });
});

describe('Home button', () => {
  test('find the home button', () => {
    render(
            <Router>
                <NavBar />
            </Router>,
    );
    expect(screen.getByText(/Home/)).toBeInTheDocument();
  });
});

describe('About button', () => {
  test('find the about message button', () => {
    render(
            <Router>
                <NavBar />
            </Router>,
    );
    expect(screen.getByText(/About/)).toBeInTheDocument();
  });
});

describe('Sign In button', () => {
  test('find the sign in message button', () => {
    render(
            <Router>
                <NavBar />
            </Router>,
    );
    expect(screen.getByText(/Sign In/)).toBeInTheDocument();
  });
});

describe('Sign Up button', () => {
  test('find the sign up message button', () => {
    render(
            <Router>
                <NavBar />
            </Router>,
    );
    expect(screen.getByText(/Sign Up/)).toBeInTheDocument();
  });
});
