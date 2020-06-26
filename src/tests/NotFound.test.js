import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';



test('The page must contain an heading h2 with the text Page requested not found', () => {
  const { getByText } = renderWithRouter(<NotFound />, { route:'/page/unknown/' });
  const unknownH2 = getByText('Page requested not found');
  expect(unknownH2).toBeInTheDocument();
  expect(unknownH2.tagName).toBe('H2');
});

test('The page should display a image', () => {
  const { container } = renderWithRouter(<NotFound />, { route:'/page/unknown/' });
  const img = container.querySelector('IMG');
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
