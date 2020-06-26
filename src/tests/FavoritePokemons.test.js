import React from 'react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
// import pokemons from '../data';

describe('FavoritePokemons tests', () => {
  test('Teste if thre are pokemons in the favorites.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText(/No favorite pokemon found/i)).toBeDefined();
  });
});
