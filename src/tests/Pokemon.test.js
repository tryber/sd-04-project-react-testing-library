import React from 'react';
import { createMemoryHistory } from 'history';
// import { Router } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { render, getByText } from '@testing-library/react';
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

test('check if  link to detail is correct', () => {
  const { getByRole } = renderWithRouter(
    <Pokemon pokemon={pokemon} isFavorite={false} />,
  );
  const link = getByRole('link');
  expect(link.href).toBe(`http://localhost/pokemons/${pokemon.id}`);
});

test('I pokemon is favorite check if there is an star as icon', () => {
  const { getAllByRole } = renderWithRouter(
    <Pokemon pokemon={pokemon} isFavorite={true} />,
  );
  const images = getAllByRole('img');
  let flag = false;
  images.map((image) => {
    if (
      image.alt === `${pokemon.name} is marked as favorite` &&
      image.src === 'http://localhost/star-icon.svg'
    )
      flag = true;
  });
  expect(flag).toBeTruthy();
});
