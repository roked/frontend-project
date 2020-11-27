import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'

describe('Build app', () => {
    test('renders App component', () => {
        render(<App />);
    });
});

describe('Website title', () => {
    test('get website title', () => {
        render(<App />);
        expect(screen.getByText(/Real Estate Listing/)).toBeInTheDocument();
    });
});


describe('Get valid button', () => {
    test('get the home page button', () => {
        render(<App />);
        expect(screen.getByText(/Home/)).toBeInTheDocument();
    });
});

describe('All buttons', () => {
    test('get the total number of buttons', async () => {
        render(<App />);
        const buttons = await screen.findAllByRole('button');
        expect(buttons).toHaveLength(6);
    });
});

describe('Check for checkbox', () => {
    test('find a checkbox', async () => {
        render(<App />);
          expect(await screen.getByText('Barbeque')).toBeInTheDocument();
    });
});

describe('All checkboxes', () => {
    test('get the total number of checkboxes', async () => {
        render(<App />);
        const checkboxes = await screen.findAllByRole('checkbox');
        expect(checkboxes).toHaveLength(5);
    });
});

describe('Click checkbox', () => {
    test('click a checkbox', async () => {
        render(<App />);
        const checkboxes = await screen.findAllByRole('checkbox');
        const testBox = checkboxes[0];
        expect(testBox.checked).toEqual(false);
        userEvent.click(testBox);
        expect(testBox.checked).toEqual(true);
    });
});

describe('Select - diselect', () => {
    test('click a checkbox and click again', async () => {
        render(<App />);
        const checkboxes = await screen.findAllByRole('checkbox');
        const testBox = checkboxes[0];
        expect(testBox.checked).toEqual(false);
        userEvent.click(testBox);
        expect(testBox.checked).toEqual(true);
        userEvent.click(testBox);
        expect(testBox.checked).toEqual(false);
    });
});

describe('Find filter button', () => {
    test('find the filter button', () => {
        render(<App />);
        expect(screen.getByText('Filter')).toBeInTheDocument();
    });
});

describe('Filter', () => {
    test('press the filter button', () => {
        render(<App />);
        const filterButton = screen.getByText('Filter');
        userEvent.click(filterButton);
    });
});

describe('Sign up button', () => {
    test('click the sign up button', () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <App />
            </Router>
            );
        const signUp = screen.getByText(/Sign Up/);
    
        expect(screen.getByText(/Our active listings!/)).toBeInTheDocument();

        const leftClick = { button: 0 };
        userEvent.click(signUp, leftClick);

        // check that the content changed to the new page
        expect(screen.getByText("First time here? You're have one more step!")).toBeInTheDocument();
    });
});

describe('Sign in button', () => {
    test('click the sign in button', () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <App />
            </Router>
            );
        const signUp = screen.getByText(/Sign In/);
    
        expect(screen.getByText("First time here? You're have one more step!")).toBeInTheDocument();

        const leftClick = { button: 0 };
        userEvent.click(signUp, leftClick);

        // check that the content changed to the new page
        expect(screen.getByText("Nice to meet you seller. Let's get started!")).toBeInTheDocument();
    });
});
