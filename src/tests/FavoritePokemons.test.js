import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

describe('Tests FavoritePokemons.js', () => {
  test('No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const text = getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });
});
