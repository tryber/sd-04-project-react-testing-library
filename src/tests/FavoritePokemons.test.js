import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('FevoritePokemons', () => {
  test('when no favorite render No favorite pokemon, when some favorite render it', () => {
    const { getByText } = render(<FavoritePokemons />);
    const favoritePokemons = localStorage.favoritePokemonsIds;
    if (favoritePokemons === undefined || favoritePokemons.length === 0) {
      expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
    } else {
      favoritePokemons.forEach((idStored) => {
        expect(
          getByText(pokemons.find(({ favoriteId }) => favoriteId === idStored).name),
        ).toBeInTheDocument();
      });
    }
  });
});
