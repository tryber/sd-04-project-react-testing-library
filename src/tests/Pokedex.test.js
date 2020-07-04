import React from 'react';
import {
  fireEvent,
  cleanup,
  render,
  getAllByText,
} from '@testing-library/react';
import pokemons from '../data';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../tests/renderWithRouter';

const favorites = {
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

const PokemonsTipo = [
  'Electric',
  'Fire',
  'Bug',
  'Poison',
  'Psychic',
  'Normal',
  'Dragon',
];

describe('Requisito 5', () => {
  afterEach(cleanup);

  it('Heading', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
    );
    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });

  describe('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    it('O botão deve conter o texto Próximo pokémon', () => {
      const { getByTestId } = renderWithRouter(
        <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
      );
      const btn = getByTestId('next-pokemon');
      expect(btn.textContent).toBe('Próximo pokémon');
    });

    it('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
      const { getByTestId } = renderWithRouter(
        <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
      );
      const pokes = getByTestId('pokemon-name');
      const btn = getByTestId('next-pokemon');
      pokemons.forEach((pokemon) => {
        expect(pokes.textContent).toBe(pokemon.name);
        fireEvent.click(btn);
      });
    });

    it('Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão', () => {
      const { getByTestId } = renderWithRouter(
        <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
      );
      const pokes = getByTestId('pokemon-name');
      const btn = getByTestId('next-pokemon');
      pokemons.forEach(() => {
        fireEvent.click(btn);
      });
      expect(pokes.textContent).toBe(pokemons[0].name);
    });
  });

  it('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
    );
    const pokes = getAllByTestId('pokemon-name');
    expect(pokes.length).toBe(1);
  });

  describe('A Pokédex deve conter um botão para resetar o filtro', () => {
    it('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
      const { getAllByTestId, getByTestId } = renderWithRouter(
        <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
      );
      const allTypes = getAllByTestId('pokemon-type-button');
      allTypes.forEach((btn) => {
        fireEvent.click(btn);
        const type = btn.textContent;
        const typePokemon = getByTestId('pokemonType').textContent;
        expect(typePokemon).toBe(type);
      });
    });

    it('O texto do botão deve ser o nome do tipo, p. ex. Psychic', () => {
      const { getByTestId, getByText } = renderWithRouter(
        <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
      );
      fireEvent.click(getByText('Psychic'));
      pokemons.forEach(() => {
        expect(getByTestId('pokemonType').innerHTML).toBe('Psychic');
        fireEvent.click(getByText('Próximo pokémon'));
      });
    });
  });

  describe('A Pokédex deve conter um botão para resetar o filtro', () => {
    it('O texto do botão deve ser All', () => {
      const { getByText } = renderWithRouter(
        <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
      );
      const btn = getByText('All');
      expect(btn).toBeInTheDocument();
    });

    it('Após clicá-lo, a Pokédex deve voltar a circular por todos os pokémons', () => {
      const { getByText } = renderWithRouter(
        <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
      );
      const btn = getByText('All');
      fireEvent.click(btn);
      pokemons.forEach(({ name }) => {
        expect(getByText(name)).toBeInTheDocument();
        fireEvent.click(getByText('Próximo pokémon'));
      });
    });
  });

  it('gerar dinamicamente...', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
    );
    const types = getAllByTestId('pokemon-type-button');
    const arrTypes = types.map((type) => type.textContent);
    expect(arrTypes).toEqual(PokemonsTipo);
  });
});
