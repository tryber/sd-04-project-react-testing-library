import React from 'react';
import { render } from '@testing-library/react';
import { NotFound } from '../components';

describe('NotFound', () => {
  test('has a tag "H2" with text "Page requested not found"', () => {
    const { getByText } = render(<NotFound />);
    expect(getByText(/Page requested not found/i).tagName).toBe('H2');
  });

  test('has the gif of Pikachu crying ', () => {
    const { getByText, container } = render(<NotFound />);
    expect(getByText(/Page requested not found/i).tagName).toBe('H2');

    expect(container.querySelector('img').src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
