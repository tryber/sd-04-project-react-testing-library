import React from 'react';
import { logDOM } from '@testing-library/react';
import { Pokemon } from '../components';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

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

test('Deve ser retornado um card com as informações de determinado pokémon;', () => {
  const { getByTestId, getByRole } = renderWithRouter(<Pokemon
    pokemon={pokemons[0]}
    isFavorite={isPokemonFavoriteById[pokemons[0].id]}
  />);
  logDOM();
  const name = getByTestId('pokemon-name');
  const pokemonType = getByTestId('pokemonType');
  const pokemonWeight = getByTestId('pokemon-weight');
  const img = getByRole('img');
  expect(name).toBeInTheDocument();
  expect(name.textContent).toBe(pokemons[0].name);
  expect(pokemonType).toBeInTheDocument();
  expect(pokemonType.textContent).toBe(pokemons[0].type);
  expect(pokemonWeight).toBeInTheDocument();
  expect(pokemonWeight.textContent).toBe(`Average weight:${pokemons[0].averageWeight.value}${pokemons[0].averageWeight.measurementUnit}`);
  expect(img).toBeInTheDocument();
  expect(img.src).toBe(pokemons[0].image);
});
