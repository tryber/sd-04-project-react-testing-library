import React from 'react';
import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
// import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemon from './mockPokemon';

function renderWithRouter(
  ui,
  {
    route = '/',
    history = createMemoryHistory({ initialEntries: [route] }),
  } = {},
) {
  return {
    ...render(<Router history={history}>{ui}</Router>),
    history,
  };
}

describe('Must return information of specific pokemon/', () => {
  test('correct name must be display', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={pokemon} isFavorite={false} />,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(pokemon.name);
  });
  test('correct type must be display', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={pokemon} isFavorite={false} />,
    );
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent(pokemon.type);
  });
  test('correct weight must be display', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={pokemon} isFavorite={false} />,
    );
    const pokemonName = getByTestId('pokemon-weight');
    expect(pokemonName).toHaveTextContent(
      `Average weight:${pokemon.averageWeight.value}${pokemon.averageWeight.measurementUnit}`,
    );
  });
});

test('correct image information must be display', () => {
  const { getByRole } = renderWithRouter(
    <Pokemon pokemon={pokemon} isFavorite={false} />,
  );
  const image = getByRole('img');
  expect(image.src).toBe(pokemon.image);
  expect(image.alt).toBe(`${pokemon.name} sprite`);
});

test('correct image information must be display', () => {
  const { getByRole } = renderWithRouter(
    <Pokemon pokemon={pokemon} isFavorite={false} />,
  );
  const link = getByRole('link');
  expect(link.href).toBe(`http://localhost/pokemons/${pokemon.id}`);
});
