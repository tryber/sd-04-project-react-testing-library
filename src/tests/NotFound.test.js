import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import App from '../App';

test('shows the Not Found page when the route is `/something-else`', () => {
  const { getByText } = render(
    <MemoryRouter initialEntries={['/something-else']}>
      <App />
    </MemoryRouter>,
  );

  expect(getByText('Page requested not found')).toBeInTheDocument();
});

test('shows sad image image', () => {
  const { getByAltText } = render(
    <MemoryRouter initialEntries={['/something-else']}>
      <App />
    </MemoryRouter>,
  );

  const alt = getByAltText(/not found/i);
  expect(alt).toBeInTheDocument();
  expect(alt.src).toBe(
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
