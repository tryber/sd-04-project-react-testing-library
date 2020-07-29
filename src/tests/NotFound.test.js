import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

test('AA página deve conter um heading `h2` com o texto `Page requested not found 😭`', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const header = getByText(/Page requested not found/i);
  expect(header).toBeInTheDocument();
  expect(header.tagName).toBe('H2');
});
