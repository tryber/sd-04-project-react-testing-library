import React from 'react';
import { render } from '@testing-library/react';
import { Pokemon } from '../components';
import pokemons from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

test('A Pokédex deve exibir apenas um pokémon por vez', () => {
  const { getByTestId } = render(<Pokemon
    pokemon={pokemons[0]}
    isFavorite={isPokemonFavoriteById[pokemons[0].id]}
  />);
});
