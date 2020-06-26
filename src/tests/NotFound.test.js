import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './services/renderWithRouter';

test('A página deve conter um heading h2 com o texto Page requested not found ', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const text = getByText('Page requested not found');
  expect(text).toBeInTheDocument();
  expect(text.tagName).toBe('H2');
});

test('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const img = getAllByRole('img')[1];
  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  expect(img.alt).toBe('Pikachu crying because the page requested was not found');
});
