import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Subdetail from './subdetail';

import SubscriberNames from './subsname';

import Subscribers from './youtube';

//Test case for Subdetail Component
jest.mock('axios'); // Mock the axios library

describe('Subdetail component', () => {
  it('should fetch and display subscriber details', async () => {
    const mockSubscriberData = {
      name: 'John Doe',
      subscribedChannel: 'Awesome Channel',
      subscribedDate: '2023-07-01',
    };

    // Set up the mock axios response
    axios.get.mockResolvedValueOnce({ data: mockSubscriberData });

    // Render the component with the desired route and mock dependencies
    const { getByText } = render(
      <MemoryRouter initialEntries={['/subdetail/123']}>
      <Routes>
        <Route path="/subdetail/:id" element={<Subdetail />} />
      </Routes>
      </MemoryRouter>
    );
    
    // Wait for the component to finish fetching and rendering the data
    await waitFor(() => {
      // Assert that the subscriber details are displayed correctly
      expect(getByText('Name: John Doe')).toBeInTheDocument();
      expect(getByText('subscribedChannel: Awesome Channel')).toBeInTheDocument();
      expect(getByText('subscribedDate: 2023-07-01')).toBeInTheDocument();
    });

    // Ensure that the axios.get function was called with the correct URL
    expect(axios.get).toHaveBeenCalledWith('https://subscribers-oyrz.onrender.com/subscribers/123?id=123');
  });
});

//Test case for Subscribername component


test('renders subscriber names', async () => {
  // Mock the axios.get method to return a sample response
  axios.get.mockResolvedValue({
    data: ['John', 'Jane', 'Bob'],
  });

  // Render the component
  const { getByText } = render(<SubscriberNames />);

  // Wait for the component to fetch and display the subscriber names
  await waitFor(() => {
    const johnElement = getByText('John');
    const janeElement = getByText('Jane');
    const bobElement = getByText('Bob');

    expect(johnElement).toBeInTheDocument();
    expect(janeElement).toBeInTheDocument();
    expect(bobElement).toBeInTheDocument();
  })
});


//Test case for Subscribers Component

test('renders subscribers', async () => {
  // Mock the axios.get method to return a sample response
  axios.get.mockResolvedValue({
    data: [
      { _id: '1', name: 'John', subscribedChannel: 'Channel 1' },
      { _id: '2', name: 'Jane', subscribedChannel: 'Channel 2' },
      { _id: '3', name: 'Bob', subscribedChannel: 'Channel 3' },
    ],
  });

  // Render the component
  const { getByText } = render(<Subscribers />);

  // Wait for the component to fetch and display the subscribers
  await waitFor(() => {
    const johnElement = getByText('John (Channel 1)');
    const janeElement = getByText('Jane (Channel 2)');
    const bobElement = getByText('Bob (Channel 3)');

    expect(johnElement).toBeInTheDocument();
    expect(janeElement).toBeInTheDocument();
    expect(bobElement).toBeInTheDocument();
  });
});
