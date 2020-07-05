import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';
// test('', () => {});

describe('Testes do arquivo NotFound.js', () => {
  test('h2 includes `Page requested not found 😭`', () => {
    const { getByText } = render(<NotFound />);
    const title = getByText('Page requested not found');
    expect(title).toBeInTheDocument();
  });

  test('Must have an image', () => {
    const { getByAltText } = render(<NotFound />);
    const picture = getByAltText(/Pikachu crying/i);
    expect(picture.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
