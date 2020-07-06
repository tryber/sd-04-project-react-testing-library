import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

test('Testing if header with message `Page requested not found 😭` is render', () => {
  const { container, getByText } = render(<NotFound />);
  const header = container('heading');
  const headingTxt = getByText('Page requested not found');
  expect(header).toHaveLength(1);
  expect(headingTxt).toBeInTheDocument();
});

test('Test if image path is https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
  const { textAbout } = render(<NotFound />);
  const notFound = textAbout('Pikachu crying because the page requested was not found');
  expect(notFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
