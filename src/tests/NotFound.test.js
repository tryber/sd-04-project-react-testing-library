import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('NotFound tests', () => {
  test('The page should contain an H2 with the text Page requested not found.', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(getByText(/Page requested not found/i)).toBeDefined();
  });

  test('The page should show an image', () => {
    const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const { container } = renderWithRouter(<NotFound />);
    expect(container.querySelector('img').src).toBe(img);
  });
});
