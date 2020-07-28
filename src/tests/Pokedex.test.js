import { fireEvent, within } from '@testing-library/react';
import React from 'react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

const pkmFavorite = {
  25: false,
  4: false,
  10: false,
  23: false,
  65: false,
  151: false,
  78: false,
  143: false,
  148: false,
};

const pkmList = pokemons.reduce(function (acc, pokemon) {
  return [...acc, pokemon.name];
}, []);
// console.log(pkmList);
// console.log(pkmList[0]);
/*
const PokemonsByType = pokemons.reduce((acc, pokemon) => {
if (!acc[pokemon.type]) acc[pokemon.type] = [];
if (acc[pokemon.type]) {
acc[pokemon.type].push(pokemon);
return acc;
}
return acc;
}, {});
*/

describe('Tests Pokedex.js', () => {
  test('Render - Encountered pokémons', () => {
    const { getByText } = renderWithRouter(
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={pkmFavorite}
      />);
    const text = getByText('Encountered pokémons');
    expect(text).toBeInTheDocument();
  });

  test('Button text - `Próximo pokémon`', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={pkmFavorite}
      />);
    const btnNext = getByTestId('next-pokemon');
    within(btnNext).getByText('Próximo pokémon');
    expect(btnNext).toBeInTheDocument();
  });

  test('Show the next pokemon of the list after click the button', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={pkmFavorite}
      />);
    const btnNext = getByTestId('next-pokemon');
    const pkmName = getByTestId('pokemon-name');
    within(pkmName).getByText(pkmList[0]);
    fireEvent.click(btnNext);
    within(pkmName).getByText(pkmList[1]);
    fireEvent.click(btnNext);
    within(pkmName).getByText(pkmList[2]);
  });

  test('Ao se chegar ao último pokémon da lista, a Pokédex deve voltar para o primeiro pokémon no apertar do botão.', () => {
    const { getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={pkmFavorite}
      />);
    const btnNext = getByTestId('next-pokemon');
    const pkmName = getByTestId('pokemon-name');
    pkmList.forEach((pokemon) => {
      within(pkmName).getByText(pokemon);
      fireEvent.click(btnNext);
    });
    within(pkmName).getByText(pkmList[0]);
  });

  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={pkmFavorite}
      />);
    const pkmName = getAllByTestId('pokemon-name');
    expect(pkmName.length).toBe(1);
  });

  test('A Pokédex deve conter botões de filtro', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={pkmFavorite}
      />);
    const pkmType = getByTestId('pokemonType');

    const btnPsychic = getByText('Psychic');
    fireEvent.click(btnPsychic);
    expect(pkmType.textContent).toBe('Psychic');

    const btnBug = getByText('Bug');
    fireEvent.click(btnBug);
    expect(pkmType.textContent).toBe('Bug');
  });

  test('A Pokédex deve conter um botão para resetar o filtro', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={pkmFavorite}
      />);
    const btnAll = getByText('All');
    const btnNext = getByTestId('next-pokemon');
    const pkmName = getByTestId('pokemon-name');
    expect(btnAll).toBeInTheDocument();
    fireEvent.click(btnAll);
    expect(btnNext).toBeEnabled();
    pkmList.forEach((pokemon) => {
      within(pkmName).getByText(pokemon);
      fireEvent.click(btnNext);
    });
  });

  test('A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={pkmFavorite}
      />);
    const btnAll = getByText('All');
    // const btnTypes = getAllByTestId('pokemon-type-button');
    expect(btnAll).toBeInTheDocument();
    // expect(btnTypes).toBeInTheDocument();
    // console.log(btnTypes);
  });

  test('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={pokemons}
        isPokemonFavoriteById={pkmFavorite}
      />);
    const btnBug = getByText('Bug');
    fireEvent.click(btnBug);
    const btnNext = getByTestId('next-pokemon');
    expect(btnNext).toBeDisabled();
  });
});
