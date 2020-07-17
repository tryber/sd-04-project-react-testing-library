import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Information about pokemons', () => {
  const { getByText } = renderWithRouter(<About />, '/about');
  const info = getByText(/digital encliclopedia containing all Pokémons/i);

  expect(info).toBeInTheDocument();
});

test('A página deve conter um heading `h2` com o texto `About Pokédex`', () => {
  const { getByText, container } = renderWithRouter(<About />);

  const h2 = container.querySelector('h2');
  expect(h2).toBeInTheDocument();

  const heading = getByText(/About Pokédex/i);
  expect(h2).toBe(heading);
});
