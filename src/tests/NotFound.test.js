import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

test('A página deve conter um heading h2 com o texto Page requested not found 😭`', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  expect(getByText(/Page requested not found/i)).toBeInTheDocument();
});

test('A página deve exibir a imagem', () => {
  const { queryAllByRole } = renderWithRouter(<NotFound />);
  const img = queryAllByRole('img');
  expect(img[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
