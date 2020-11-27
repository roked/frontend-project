import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Property from '../components/property';

describe('Build property', () => {
  test('renders Property component', () => {
    render(
            <Router>
                <Property />
            </Router>,
    );
  });
});

describe('Page title', () => {
  test('get page title', () => {
    render(
            <Router>
                <Property />
            </Router>,
    );
    expect(screen.getByText('We hope you like it!')).toBeInTheDocument();
  });
});

describe('Send message textarea', () => {
  test('get send message textarea', () => {
    render(
            <Router>
                <Property />
            </Router>,
    );
    const textarea = screen.getByPlaceholderText('You have a nice...');
    expect(textarea).toBeInTheDocument();
  });
});

describe('Send message button', () => {
  test('find the send message button', () => {
    render(
            <Router>
                <Property />
            </Router>,
    );
    expect(screen.getByText(/Send/)).toBeInTheDocument();
  });
});

describe('Send message', () => {
  test('press the send button', () => {
    render(
            <Router>
                <Property />
            </Router>,
    );
    const sendButton = screen.getByText(/Send/);
    userEvent.click(sendButton);
  });
});
