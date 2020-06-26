import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('it tests if page not found exists', () => {
  const { getByText, getByAltText } = render(<NotFound />);
  const heading = getByText(/Page requested not found/i);
  expect(heading).toBeInTheDocument();

  const img = getByAltText('Pikachu crying because the page requested was not found');
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
