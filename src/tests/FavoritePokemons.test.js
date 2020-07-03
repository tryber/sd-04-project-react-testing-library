import React from 'react';
import renderWithRouter from './helpFunction';
import { FavoritePokemons } from '../components';


test('Favorites pokemons test', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const pageText = getByText(/No favorite pokemon found/m);
  expect(pageText).toBeInTheDocument();
});
