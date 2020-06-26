import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

afterEach(cleanup);

const pokemonFavorite = {
  25: false,
  4: true,
  10: true,
  23: false,
  65: false,
  78: true,
  151: false,
  145: false,
  148: true,
};

const pokemonsFavored = data.filter(({ id }) => pokemonFavorite[id]);
const pokemonsNotFavored = data.filter(({ id }) => !pokemonFavorite[id]);

describe('Test on the FavoritePokemons page', () => {
  test('The message that appears if there are no favorite pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={[]} />, { route: '/favorites' });
    const text = getByText(/No favorite pokemon found/i);

    expect(text).toBeInTheDocument();
  });
  test('The page should display all favorite Pokémon cards', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={pokemonsFavored} />,
      { route: '/favorites' },
    );

    pokemonsFavored.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
    });
  });
  test('A page should not display any non-favorite Pokémon cards', () => {
    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={pokemonsFavored} />,
      { route: '/favorites' },
    );

    pokemonsNotFavored.forEach(({ name }) => {
      expect(queryByText(name)).not.toBeInTheDocument();
    });

  });
});
