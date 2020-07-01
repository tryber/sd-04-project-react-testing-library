import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('4. Testing the NotFound.js file', () => {
  test('The page must contain an heading h2 with the text Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });

  test('The page should display the image https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
