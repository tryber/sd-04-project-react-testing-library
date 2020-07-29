import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Should render the #AboutPage', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/about' });
  expect(getByText(/About Pokédex/i)).toBeInTheDocument();
});

test('Should render h2 with the #AboutPokedex text', () => {
  const { getByText } = renderWithRouter(<App />, { route: '/about' });
  const h2 = getByText(/About Pokédex/i);
  expect(h2.tagName).toBe('H2');
});

test('the page should render 2 paragraphs with text about Pokedex', () => {
  const { container } = renderWithRouter(<App />, { route: '/about' });
  const p = container.getElementsByTagName('p');
  expect(p.length).toBe(2);
});

test('The page should contain the following image of a Pokédex', () => {
  const { getByRole } = renderWithRouter(<App />, { route: '/about' });
  const img = getByRole('img');
  const src =
    'https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  expect(img.src).toBe(src);
});
