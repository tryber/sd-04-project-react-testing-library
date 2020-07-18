import React from 'react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

test('A página "About" deve exibir informações sobre a Pokédex', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/about' });
  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
});

test('A página deve conter um heading h2 com o texto About Pokédex', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/about' });
  const h2 = getByText(/About Pokédex/i);
  expect(h2.tagName).toBe('H2');
});

test('A página deve conter dois parágrafos com texto sobre a Pokédex;', () => {
  const { container } = renderWithRouter(<App />, { route: '/about' });
  const p = container.getElementsByTagName('p');
  expect(p.length).toBe(2);
});

test('A página deve conter a seguinte imagem de uma Pokédex', () => {
  const { getByRole } = renderWithRouter(<App />, { route: '/about' });
  const img = getByRole('img');
  const src = 'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(img.src).toBe(src);
});
