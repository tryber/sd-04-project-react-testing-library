import React from 'react';
import { fireEvent } from '@testing-library/react';
import { Pokemon } from '../components';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const isPokemonFavoriteById = {
  4: true,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};
describe('Pokemon', () => {
  test('Deve ser retornado um card com as informações de determinado pokémon;', () => {
    const { getByTestId, getByRole } = renderWithRouter(<Pokemon
      pokemon={pokemons[0]}
      isFavorite={isPokemonFavoriteById[pokemons[0].id]}
    />);
    const name = getByTestId('pokemon-name');
    const pokemonType = getByTestId('pokemonType');
    const pokemonWeight = getByTestId('pokemon-weight');
    const img = getByRole('img');
    expect(name).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });

  test('O nome correto do pokémon deve aparecer na tela;', () => {
    const { getByTestId } = renderWithRouter(<Pokemon
      pokemon={pokemons[0]}
      isFavorite={isPokemonFavoriteById[pokemons[0].id]}
    />);
    const name = getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();
    expect(name.textContent).toBe(pokemons[0].name);
  });

  test('O peso médio do pokémon deve ser exibido com um texto no formato `Average weight: <value> <measurementUnit>`', () => {
    const { getByTestId } = renderWithRouter(<Pokemon
      pokemon={pokemons[0]}
      isFavorite={isPokemonFavoriteById[pokemons[0].id]}
    />);
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight.textContent).toBe(`Average weight:${pokemons[0].averageWeight.value}${pokemons[0].averageWeight.measurementUnit}`);
  });

  test(' A imagem deve conter um atributo `src` com a URL da imagem do pokémon. A imagem deverá ter também um atributo `alt` com o texto `<name> sprite`,', () => {
    const { getByRole } = renderWithRouter(<Pokemon
      pokemon={pokemons[0]}
      isFavorite={isPokemonFavoriteById[pokemons[0].id]}
    />);
    const img = getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(pokemons[0].image);
    expect(img.alt).toBe(`${pokemons[0].name} sprite`);
  });

  test('O pokémon exibido na Pokédex deve conter um link de navegação para exibir detalhes deste pokémon.', () => {
    const { getByRole, history } = renderWithRouter(<Pokemon
      pokemon={pokemons[0]}
      isFavorite={isPokemonFavoriteById[pokemons[0].id]}
    />);
    const link = getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link.pathname).toBe(`/pokemons/${pokemons[0].id}`);
    expect(history.location.pathname).toBe('/');
    fireEvent.click(link);
    expect(history.location.pathname).toBe(`pokemons/${pokemons[0].id}`);
  });

  test('okémons favoritados devem exibir um ícone de uma estrela', () => {
    const { getAllByRole } = renderWithRouter(<Pokemon
      pokemon={pokemons[1]}
      isFavorite={isPokemonFavoriteById[pokemons[1].id]}
    />);
    const img = getAllByRole('img');
    expect(img[1]).toBeInTheDocument();
    expect(img[1].src).toBe('http://localhost/star-icon.svg');
    expect(img[1].alt).toBe(`${pokemons[1].name} is marked as favorite`);
  });
});
