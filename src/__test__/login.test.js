import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from '../components/login';

describe('Build login', () => {
  test('renders Login component', () => {
        <Router>
            <Login />
        </Router>;
        screen.debug();
  });
});

describe('Page title', () => {
  test('get page title', () => {
    render(
            <Router>
                <Login />
            </Router>,
    );
    expect(screen.getByText("Nice to meet you seller. Let's get started!")).toBeInTheDocument();
  });
});

describe('Get email input', () => {
  test('get email input field', () => {
    render(
            <Router>
                <Login />
            </Router>,
    );
    const input = screen.getByPlaceholderText('Enter email');
    expect(input).toBeInTheDocument();
  });
});

describe('Get password input', () => {
  test('get password input field', () => {
    render(
            <Router>
                <Login />
            </Router>,
    );
    const input = screen.getByPlaceholderText('Password');
    expect(input).toBeInTheDocument();
  });
});

describe('Write email', () => {
  test('fill in email', () => {
    render(
            <Router>
                <Login />
            </Router>,
    );
    const inputE = screen.getByPlaceholderText('Enter email');
    userEvent.type(inputE, 'donchevm@email.com');

    expect(inputE).toHaveValue('donchevm@email.com');
  });
});

describe('Write password', () => {
  test('fill in password', () => {
    render(
            <Router>
                <Login />
            </Router>,
    );
    const inputP = screen.getByPlaceholderText('Password');
    userEvent.type(inputP, 'testPass');

    expect(inputP).toHaveValue('testPass');
  });
});

describe('Find sign in', () => {
  test('find sign in button', () => {
    render(
            <Router>
                <Login />
            </Router>,
    );
    expect(screen.getByText(/Sign In/)).toBeInTheDocument();
  });
});

describe('Sign in', () => {
  test('press the sign in button', () => {
    render(
            <Router>
                <Login />
            </Router>,
    );
    const loginButton = screen.getByText(/Sign In/);
    userEvent.click(loginButton);
  });
});
