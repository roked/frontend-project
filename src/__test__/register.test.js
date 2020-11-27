import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Register from '../components/register';

describe('Build register', () => {
  test('renders Register component', () => {
        <Router>
            <Register />
        </Router>;
  });
});

describe('Page title', () => {
  test('get page title', () => {
    render(
            <Router>
                <Register />
            </Router>,
    );
    expect(screen.getByText("First time here? You're have one more step!")).toBeInTheDocument();
  });
});

describe('Get username input', () => {
  test('get username input field', () => {
    render(
            <Router>
                <Register />
            </Router>,
    );
    const input = screen.getByPlaceholderText('Enter Username');
    expect(input).toBeInTheDocument();
  });
});

describe('Get email input', () => {
  test('get email input field', () => {
    render(
            <Router>
                <Register />
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
                <Register />
            </Router>,
    );
    const input = screen.getByPlaceholderText('Password');
    expect(input).toBeInTheDocument();
  });
});

describe('Get sign-up code input', () => {
  test('get sign-up input field', () => {
    render(
            <Router>
                <Register />
            </Router>,
    );
    const input = screen.getByPlaceholderText('Sign-up code');
    expect(input).toBeInTheDocument();
  });
});

describe('Get checkbox', () => {
  test('get accept policy checkbox', () => {
    render(
            <Router>
                <Register />
            </Router>,
    );
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });
});

describe('Click checkbox', () => {
  test('accept policy', () => {
    render(
            <Router>
                <Register />
            </Router>,
    );
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.checked).toEqual(false);
    userEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });
});

describe('Find sign up', () => {
  test('find sign up button', () => {
    render(
            <Router>
                <Register />
            </Router>,
    );
    expect(screen.getByText(/Sign Up/)).toBeInTheDocument();
  });
});

describe('Sign up', () => {
  test('press the sign up button', () => {
    render(
            <Router>
                <Register />
            </Router>,
    );
    const registerButton = screen.getByText(/Sign Up/);
    userEvent.click(registerButton);
  });
});

describe('Enter username', () => {
  test('fill the username', () => {
    render(
            <Router>
                <Register />
            </Router>,
    );
    const inputU = screen.getByPlaceholderText('Enter Username');
    userEvent.type(inputU, 'donchevm');

    expect(inputU).toHaveValue('donchevm');
  });
});

describe('Enter email', () => {
  test('fill the email', () => {
    render(
            <Router>
                <Register />
            </Router>,
    );
    const inputE = screen.getByPlaceholderText('Enter email');
    userEvent.type(inputE, 'donchevm@email.com');

    expect(inputE).toHaveValue('donchevm@email.com');
  });
});

describe('Enter password', () => {
  test('fill the password', () => {
    render(
            <Router>
                <Register />
            </Router>,
    );
    const inputP = screen.getByPlaceholderText('Password');
    userEvent.type(inputP, 'testPass');

    expect(inputP).toHaveValue('testPass');
  });
});

describe('Enter sing-up code', () => {
  test('fill the sing-up code', () => {
    render(
            <Router>
                <Register />
            </Router>,
    );
    const inputS = screen.getByPlaceholderText('Sign-up code');
    userEvent.type(inputS, 'passcode');

    expect(inputS).toHaveValue('passcode');
  });
});
