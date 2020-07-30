import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

test('A página deve conter um heading `h2` com o texto `Page requested not found 😭`', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const header = getByText(/Page requested not found/i);
  expect(header).toBeInTheDocument();
  expect(header.tagName).toBe('H2');
});

test('A página deve exibir a imagem determinada', () => {
  renderWithRouter(<NotFound />);
  const image = document.querySelector('.not-found-image');

  expect(image).toBeInTheDocument();
  expect(image.getAttribute('src')).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
