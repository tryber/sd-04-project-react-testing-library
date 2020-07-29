import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

afterEach(cleanup);

test('Verificação 1', () => {
  const { getByTestId } = renderWithRouter(
    <Pokemon pokemon={pokemons[7]} isFavorite={false} />,
  );
  const nomePokemon = getByTestId(/pokemon-name/i);
  const tipo = getByTestId(/pokemonType/i);
  expect(nomePokemon).toBeInTheDocument();
  expect(tipo).toBeInTheDocument();
  expect(nomePokemon).toHaveTextContent(/Snorlax/i);
  expect(tipo).toHaveTextContent(`${pokemons[7].type}`);
});
test('Verificação 2', () => {
  const { getByTestId } = renderWithRouter(
    <Pokemon pokemon={pokemons[7]} isFavorite={false} />,
  );
  const pesoPokemon = getByTestId('pokemon-weight');
  expect(pesoPokemon).toHaveTextContent(/Average weight:460.0kg/i);
});
test('Verificação 3', () => {
  const { getByRole } = renderWithRouter(
    <Pokemon pokemon={pokemons[7]} isFavorite={false} />,
  );
  const fotoPoke = getByRole('img');
  expect(fotoPoke.src).toBe(pokemons[7].image);
  expect(fotoPoke.alt).toBe(`${pokemons[7].name} sprite`);
});
test('Verificação 4', () => {
  const { getByRole } = renderWithRouter(
    <Pokemon pokemon={pokemons[7]} isFavorite={false} />,
  );
  const pokeRotas = getByRole(/link/i);
  expect(pokeRotas).toBeInTheDocument();
  expect(pokeRotas).toHaveAttribute(
    'href',
    `/pokemons/${pokemons[7].id}`,
  );
});
test('Verificação 5', () => {
  const { queryAllByRole } = renderWithRouter(
    <Pokemon pokemon={pokemons[7]} isFavorite />,
  );
  const favorito = queryAllByRole(/img/i)[1];
  expect(favorito).toHaveAttribute('src', '/star-icon.svg');
  expect(favorito).toHaveAttribute(
    'alt',
    `${pokemons[7].name} is marked as favorite`
  );
});
