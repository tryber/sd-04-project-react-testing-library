import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('shows the Favorite page when the route is `/favorites`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/favorites']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('No favorite pokemon found')).toBeInTheDocument();
});
