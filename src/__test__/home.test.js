import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from '../components/home';

describe('Build home', () => {
  test('renders Home component', () => {
        <Router>
            <Home />
        </Router>;
  });
});

describe('Page title', () => {
  test('get page title', () => {
    render(
            <Router>
                <Home />
            </Router>,
    );
    expect(screen.getByText('Our active listings!')).toBeInTheDocument();
  });
});

describe('Find filter button', () => {
  test('find the filter button', () => {
    render(
            <Router>
                <Home />
            </Router>,
    );
    expect(screen.getByText('Filter')).toBeInTheDocument();
  });
});

describe('Filter', () => {
  test('press the filter button', () => {
    render(
            <Router>
                <Home />
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
                <Home />
            </Router>,
    );
    expect(await screen.getByText('Barbeque')).toBeInTheDocument();
  });
});

describe('All checkboxes', () => {
  test('get the total number of checkboxes', async () => {
    render(
            <Router>
                <Home />
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
                <Home />
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
                <Home />
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
