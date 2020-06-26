import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';

describe('it tests FavoritePokemon file', () => {
  test('it tests if theres no favorite pokemon', () => {
    const favoritePokemons = [];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={favoritePokemons} />);
    expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });

  test('shows every favorite pokemon card', () => {
    const favoritePokemons = [
      { id: 1, name: 'Picachu', averageWeight: { value: '6.0', measurementUnit: 'kg' } },
      { id: 2, name: 'Charmander', averageWeight: { value: '8.5', measurementUnit: 'kg' } },
    ];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={favoritePokemons} />);
    favoritePokemons.forEach((pokemon) => {
      const namePokemon = getByText(pokemon.name);
      expect(namePokemon).toBeInTheDocument();
    });
  });
});
