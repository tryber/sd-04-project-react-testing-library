import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';

test('testando se não exibe nada', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const text = getByText('No favorite pokemon found');

  expect(text).toBeInTheDocument();
});

test('testando se exibe todos os pokemons favoritados', () => {
//  const { } = renderWithRouter(<FavoritePokemons />);
});

test('testando se não exibe nenhum card nao favoritado', () => {
//  const { } = renderWithRouter(<FavoritePokemons />);
});
