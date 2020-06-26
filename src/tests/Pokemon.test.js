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
    expect(pokemonName).toHaveTextContent('Pikachu');
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
