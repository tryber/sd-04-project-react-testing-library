import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

test('A página deve conter um heading h2 com o texto Page requested not found', () => {
  const { getByText } = render(<NotFound />);
  const notFound = getByText('Page requested not found');
  expect(notFound).toBeInTheDocument();
});

test('A página deve exibir a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  const { getByAltText } = render(<NotFound />);
  const img = getByAltText(/Pikachu crying/);
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
