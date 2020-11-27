import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import EditProperty from '../components/editproperty';

describe('Build edit property', () => {
  test('renders Edit Property component', () => {
        <Router>
            <EditProperty />
        </Router>;
  });
});

describe('Page title', () => {
  test('get page title', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    expect(screen.getByText("Something new? Just click 'Update' when you are ready!")).toBeInTheDocument();
  });
});

describe('Get title', () => {
  test('get property title input field', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    const input = screen.getByPlaceholderText('My Property');
    expect(input).toBeInTheDocument();
  });
});

describe('Get price', () => {
  test('get property price input field', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    const input = screen.getByPlaceholderText('£30000');
    expect(input).toBeInTheDocument();
  });
});

describe('Get location', () => {
  test('get property location input field', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    const input = screen.getByPlaceholderText('Postcode');
    expect(input).toBeInTheDocument();
  });
});

describe('Get description', () => {
  test('get property description textarea', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    const textarea = screen.getByPlaceholderText('This property has...');
    expect(textarea).toBeInTheDocument();
  });
});

describe('Get category', () => {
  test('get property category selector', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    const selector = screen.getAllByDisplayValue('--Please Select--');
    // a total of 6 different categories
    expect(selector[0]).toHaveLength(6);
  });
});

describe('Get status', () => {
  test('get property status selector', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    const selector = screen.getAllByDisplayValue('--Please Select--');
    // a total of 4 different statuses
    expect(selector[1]).toHaveLength(4);
  });
});

describe('All checkboxes', () => {
  test('get the total number of checkboxes', async () => {
    render(
            <Router>
                <EditProperty />
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
                <EditProperty />
            </Router>,
    );
    const checkboxes = await screen.findAllByRole('checkbox');
    const testBox = checkboxes[0];
    expect(testBox.checked).toEqual(false);
    userEvent.click(testBox);
    expect(testBox.checked).toEqual(true);
  });
});

describe('Select - diselect', () => {
  test('click a checkbox and click again', async () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    const checkboxes = await screen.findAllByRole('checkbox');
    const testBox = checkboxes[2];
    expect(testBox.checked).toEqual(false);
    userEvent.click(testBox);
    expect(testBox.checked).toEqual(true);
    userEvent.click(testBox);
    expect(testBox.checked).toEqual(false);
  });
});

describe('Enter title', () => {
  test('fill the title of the property', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    const input = screen.getByPlaceholderText('My Property');
    userEvent.type(input, 'Test Property');

    expect(input).toHaveValue('Test Property');
  });
});

describe('Enter price', () => {
  test('fill the price of the property', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    const input = screen.getByPlaceholderText('£30000');
    userEvent.type(input, '500000');

    expect(input).toHaveValue('500000');
  });
});

describe('Enter location', () => {
  test('fill the postcode of the property', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    const input = screen.getByPlaceholderText('Postcode');
    userEvent.type(input, 'CV1 TEST');

    expect(input).toHaveValue('CV1 TEST');
  });
});

describe('Enter description', () => {
  test('fill the description of the property', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    const input = screen.getByPlaceholderText('This property has...');
    userEvent.type(input, 'A nice garden.');

    expect(input).toHaveValue('A nice garden.');
  });
});

describe('Select status', () => {
  test('select the status of the property', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    userEvent.selectOptions(screen.getByTestId('select-multiple'), 'New');

    expect(screen.getByTestId('select-multiple')).toHaveValue('New');
  });
});

describe('Select category', () => {
  test('select the category of the property', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    userEvent.selectOptions(screen.getByTestId('select-one'), 'Commercial');

    expect(screen.getByTestId('select-one')).toHaveValue('Commercial');
  });
});

describe('Find upload file button', () => {
  test('find the upload new image button', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    expect(screen.getByTestId('files-input')).toBeInTheDocument();
  });
});

// describe('Upload file', () => {
//     test('the featue to upload image', () => {
//         const file = new File(['hello'], 'hello.png', {type: 'image/png'})
//         render(
//             <Router>
//                 <EditProperty />
//             </Router>
//             );
//         const input = screen.getByTestId('files-input')
//         userEvent.upload(input, file)

//         expect(input.files[0]).toStrictEqual(file)
//         expect(input.files.item(0)).toStrictEqual(file)
//         expect(input.files).toHaveLength(1)
//     });
// });

describe('Find ppdate button', () => {
  test('find the ipdate button', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    expect(screen.getByText(/Update!/)).toBeInTheDocument();
  });
});

describe('Update', () => {
  test('press the update button', () => {
    render(
            <Router>
                <EditProperty />
            </Router>,
    );
    const updateButton = screen.getByText(/Update!/);
    userEvent.click(updateButton);
  });
});
