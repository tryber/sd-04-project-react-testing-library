import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

afterEach(cleanup);

const testPokemon = pokemons.find(({ id }) => id === 25);

describe('Testes do arquivo Pokedex.js', () => {
  test('A pagina carrega o pokemon passado', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={testPokemon} isFavorite />,
    );
    const poke = getByTestId('pokemon-name');
    expect(poke).toHaveTextContent(testPokemon.name);
  });

  test('A pagina exibe o peso e unidade de medida do pokemon passado', () => {
    const { getByTestId } = renderWithRouter(
      <Pokemon pokemon={testPokemon} isFavorite />,
    );
    const poke = getByTestId('pokemon-weight');
    expect(poke).toHaveTextContent(
      `Average weight:${testPokemon.averageWeight.value}${testPokemon.averageWeight.measurementUnit}`,
    );
  });

  test('A pagina exibe a imagem do pokemon passado', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={testPokemon} isFavorite />,
    );
    const poke = getByAltText(`${testPokemon.name} sprite`);
    expect(poke).toBeInTheDocument();
    expect(poke).toHaveAttribute('src', testPokemon.image);
  });

  test('A pagina exibe um link "More details"', () => {
    const { getByText } = renderWithRouter(
      <Pokemon pokemon={testPokemon} isFavorite />,
    );
    const more = getByText('More details');
    expect(more).toHaveAttribute('href', `/pokemons/${testPokemon.id}`);
  });

  test('O link "More details" redireciona para a pagina de detalhes do pokemon passado', () => {
    const { getByText, history } = renderWithRouter(
      <Pokemon pokemon={testPokemon} isFavorite />,
    );
    fireEvent.click(getByText('More details'));
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${testPokemon.id}`);
  });

  test('Pokémons favoritados devem exibir um ícone de uma estrela', () => {
    const { getByAltText } = renderWithRouter(
      <Pokemon pokemon={testPokemon} isFavorite />,
    );
    const poke = getByAltText(`${testPokemon.name} is marked as favorite`);
    expect(poke).toBeInTheDocument();
    expect(poke).toHaveAttribute('src', '/star-icon.svg');
  });
});
