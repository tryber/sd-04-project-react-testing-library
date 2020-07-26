import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import pokemons from '../data';
import renderWithRouter from '../helpers/renderWithRouter';
import Pokedex from '../components/Pokedex';

const favorites = {
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

const buscarTodosPokemons = (nextButton, getByText) => {
  pokemons.forEach((pokemon) => {
    const pokemonName = getByText(pokemon.name);
    expect(pokemonName).toBeInTheDocument();
    fireEvent.click(nextButton);
  });
};

describe('Testes do arquivo Pokedex.js', () => {
  afterEach(cleanup);

  it('Render Encountered pokémons', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
    );
    const texto = getByText(/Encountered pokémons/i);
    expect(texto).toBeInTheDocument();
  });

  it('O botão deve conter o texto Próximo pokémon', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
    );
    const button = getByTestId('next-pokemon');
    expect(button).toBeInTheDocument();
  });

  it('Cliques sucessivos no botão devem mostrar o próximo pokémon da lista', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
    );
    const button = getByTestId('next-pokemon');
    pokemons.forEach((pokemon) => {
      const pokemonName = getByTestId(/pokemon-name/i);
      expect(pokemonName.innerHTML).toBe(pokemon.name);
      fireEvent.click(button);
    });
  });

  it('Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
    );
    const button = getByTestId('next-pokemon');
    pokemons.forEach(() => {
      fireEvent.click(button);
    });
    const pokemonFound = getByTestId(/pokemon-name/i);
    expect(pokemonFound.innerHTML).toBe(pokemons[0].name);
  });

  it('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
    );
    const pokemonShown = getAllByTestId('pokemon-name');
    expect(pokemonShown.length).toBe(1);
  });

  it('A Pokédex deve conter botões de filtro', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
    );
    const buttonFire = getByText(/Fire/i);
    fireEvent.click(buttonFire);
    const typeOne = getByTestId('pokemonType');
    expect(typeOne.innerHTML).toBe('Fire');
    const nextButton = getByTestId('next-pokemon');
    fireEvent.click(nextButton);
    const typeTwo = getByTestId('pokemonType');
    expect(typeTwo.innerHTML).toBe('Fire');
  });

  it('A Pokédex deve conter um botão para resetar o filtro', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
    );
    const allButton = getByText(/All/i);
    const fireButton = getByText(/Fire/i);
    const nextButton = getByTestId('next-pokemon');
    buscarTodosPokemons(nextButton, getByText);
    fireEvent.click(fireButton);
    const typeOne = getByTestId('pokemonType');
    expect(typeOne.innerHTML).toBe('Fire');
    fireEvent.click(nextButton);
    const typeTwo = getByTestId('pokemonType');
    expect(typeTwo.innerHTML).toBe('Fire');
    fireEvent.click(allButton);
    buscarTodosPokemons(nextButton, getByText);
  });

  it('A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
    const { getAllByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
    );
    const types = ['All'];
    pokemons.forEach((pokemon) => {
      if (!types.includes(pokemon.type)) {
        types.push(pokemon.type);
      }
    });
    types.forEach((type) => {
      const typeShown = getAllByText(type);
      expect(typeShown[0]).toBeInTheDocument();
    });
  });

  it('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
    const { getByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorites} />,
    );
    const poisonButton = getByText(/Poison/i);
    const nextButton = getByTestId('next-pokemon');
    fireEvent.click(poisonButton);
    expect(nextButton.getAttributeNames().includes('disabled')).toBe(true);
  });
});
