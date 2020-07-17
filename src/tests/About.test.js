import React from 'react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Information about pokemons', () => {
  const { getByText } = renderWithRouter(<About />, '/about');
  const info = getByText(/digital encliclopedia containing all Pokémons/i);

  expect(info).toBeInTheDocument();
});