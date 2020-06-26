import React from 'react';
import { cleanup } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils';

afterEach(cleanup);

test('renders nav links', () => {
  const { getAllByRole } = renderWithRouter(<App />, { route: '/about' });
  const heading = getAllByRole('heading');
  const header2 = heading.find((h) => h.nodeName === 'H2');
  expect(header2.innerHTML).toMatch('About Pokédex');
});

test('renders nav links', () => {
  const { container } = renderWithRouter(<App />, {
    route: '/about',
  });
  const paragraphs = container.getElementsByTagName('p');
  expect(paragraphs.length).toBe(2);
});

test('renders nav links', () => {
  const { getByAltText } = renderWithRouter(<App />, {
    route: '/about',
  });
  const image = getByAltText('Pokédex');
  expect(image.src).toBe(
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
  );
});
