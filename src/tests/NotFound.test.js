import React from 'react';
import renderWithRouter from '../utils/renderWithRouter';
import { NotFound } from '../components';

describe('Tests on NotFound page', () => {
  test('The page must contain a heading h2 with the text Page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });

  test('The page should display a gif', () => {
    const { queryByRole } = renderWithRouter(<NotFound />);
    const img = queryByRole('img');
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
