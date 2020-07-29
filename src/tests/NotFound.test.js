import React from 'react';
import renderWithRouter from '../renderWithRouter';;
import { NotFound } from '../components';

test('tests to #NotFound', () => {
  const { getByText, getAllByRole } = renderWithRouter(<NotFound />);
  const pageText = getByText(/Page requested not found/i);
  expect(pageText).toBeInTheDocument();
  const imageSrc = getAllByRole('img')[1];
  expect(imageSrc.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
