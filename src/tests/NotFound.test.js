import React from 'react';
import { cleanup } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils';

afterEach(cleanup);

test('Should heave a header with not found text', () => {
  const { getAllByRole } = renderWithRouter(<App />, {
    route: '/random-route',
  });
  const heading = getAllByRole('heading');
  const header2 = heading.find((h) => h.nodeName === 'H2');
  expect(header2.innerHTML).toMatch(
    'Page requested not found<span role="img" aria-label="Crying emoji"> 😭 </span>',
  );
});

test('Show image', () => {
  const { getByAltText } = renderWithRouter(<App />, {
    route: '/random-route',
  });
  const image = getByAltText(
    'Pikachu crying because the page requested was not found',
  );
  expect(image.src).toBe(
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
