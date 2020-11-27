import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Profile from '../components/profile';

describe('Build profile', () => {
  test('renders Profile component', () => {
        <Router>
            <Profile />
        </Router>;
  });
});

describe('Page title', () => {
  test('get page title', () => {
    render(
            <Router>
                <Profile />
            </Router>,
    );
    expect(screen.getByText('Hey! Hope you are doing great!')).toBeInTheDocument();
  });
});

describe('Property section title', () => {
  test('get property section title', () => {
    render(
            <Router>
                <Profile />
            </Router>,
    );
    expect(screen.getByText('Your currently active listing')).toBeInTheDocument();
  });
});

describe('Messages section title', () => {
  test('get messages section title', () => {
    render(
            <Router>
                <Profile />
            </Router>,
    );
    expect(screen.getByText('Your messages')).toBeInTheDocument();
  });
});

describe('Find filter button', () => {
  test('find the filter button', () => {
    render(
            <Router>
                <Profile />
            </Router>,
    );
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });
});

describe('Filter', () => {
  test('press the filter button', () => {
    render(
            <Router>
                <Profile />
            </Router>,
    );
    const filterButton = screen.getByText('Filter');
    userEvent.click(filterButton);
  });
});

describe('Check for checkbox', () => {
  test('find a checkbox', async () => {
    render(
            <Router>
                <Profile />
            </Router>,
    );
    expect(await screen.getByText('Barbeque')).toBeInTheDocument();
  });
});

describe('All checkboxes', () => {
  test('get the total number of checkboxes', async () => {
    render(
            <Router>
                <Profile />
            </Router>,
    );
    const checkboxes = await screen.findAllByRole('checkbox');
    expect(checkboxes).toHaveLength(5);
  });
});

describe('Click checkbox', () => {
  test('click a checkbox', async () => {
    render(
            <Router>
                <Profile />
            </Router>,
    );
    const checkboxes = await screen.findAllByRole('checkbox');
    const testBox = checkboxes[1];
    expect(testBox.checked).toEqual(false);
    userEvent.click(testBox);
    expect(testBox.checked).toEqual(true);
  });
});

describe('Select - diselect', () => {
  test('click a checkbox and click again', async () => {
    render(
            <Router>
                <Profile />
            </Router>,
    );
    const checkboxes = await screen.findAllByRole('checkbox');
    const testBox = checkboxes[3];
    expect(testBox.checked).toEqual(false);
    userEvent.click(testBox);
    expect(testBox.checked).toEqual(true);
    userEvent.click(testBox);
    expect(testBox.checked).toEqual(false);
  });
});
