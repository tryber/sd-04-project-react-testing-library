import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

afterEach(cleanup);

const favoritePokemons = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: true,
  143: false,
  148: false,
  151: false,
};

const pokeTypes = [...new Set(pokemons.reduce((types, { type }) => [...types, type], []))];

describe('Testes do arquivo Pokedex.js', () => {
  test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favoritePokemons} />,
    );
    const btn = getByTestId('next-pokemon');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Próximo pokémon');
  });

  test('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favoritePokemons} />,
    );
    pokemons.forEach(({ name }) => {
      const pokeName = getByTestId('pokemon-name');
      expect(pokeName).toHaveTextContent(name);
      fireEvent.click(getByTestId('next-pokemon'));
    });
    const pokeName = getByTestId('pokemon-name');
    expect(pokeName).toHaveTextContent(pokemons[0].name);
  });

  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { queryAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favoritePokemons} />,
    );
    const pokeName = queryAllByTestId('pokemon-name');
    expect(pokeName.length).toEqual(1);
  });

  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favoritePokemons} />,
    );
    getAllByTestId('pokemon-type-button').forEach((btn) => {
      fireEvent.click(btn);
      const filtered = pokemons.filter(({ type }) => type === btn.textContent);
      filtered.forEach(({ type }) => {
        const pokeType = getByTestId('pokemonType');
        expect(pokeType).toHaveTextContent(type);
        fireEvent.click(getByTestId('next-pokemon'));
      });
    });
  });

  test('A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favoritePokemons} />,
    );
    const pokeBtns = getAllByTestId('pokemon-type-button').map((poke) => poke.textContent);
    expect(pokeTypes).toEqual(expect.arrayContaining(pokeBtns));
  });
});
