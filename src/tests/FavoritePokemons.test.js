import React from 'react';
import renderWithRouter from '../components/renderWithRouter';
import { FavoritePokemons } from '../components';


test('testando favoritos', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const noFavorite = getByText(/No favorite pokemon found/i);
  expect(noFavorite).toBeInTheDocument();
});
