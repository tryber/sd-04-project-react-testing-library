import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import { NotFound } from '../components';


test('testando not found page text', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const nofound = getByText(/Page requested not found/i);
  expect(nofound).toBeInTheDocument();
});

test('testando not found page img', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const img = getByAltText(/Pikachu crying because the page requested was not found/i);
  expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
