import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Testes do arquivo Pokedex.js', () => {
  test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const nextPokemonBtn = getByText(/Próximo pokémon/);
    expect(nextPokemonBtn).toBeInTheDocument();
    for (let i = 0; i < pokemons.length; i += 1) {
      const pokemon = pokemons[i];
      const pokemonName = getByTestId('pokemon-name');
      expect(pokemonName.innerHTML).toBe(pokemon.name);
      if (i === pokemons.length - 1) {
        fireEvent.click(nextPokemonBtn);
        expect(pokemonName.innerHTML).toBe(pokemons[0].name);
        break;
      } else {
        fireEvent.click(nextPokemonBtn);
      }
    }
  });

  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { queryByText, getByTestId } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName.innerHTML).toBe(pokemons[0].name);
    for (let i = 1; i < pokemons.length; i += 1) {
      const nonExistentPokemon = queryByText(pokemons[i].name);
      expect(nonExistentPokemon).not.toBeInTheDocument();
    }
  });

  test('A Pokédex deve conter botões de filtro', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const nextPokemonBtn = getByTestId('next-pokemon');
    const allPokemonTypes = getAllByTestId('pokemon-type-button');
    allPokemonTypes.forEach(pokemonTypeButton => {
      fireEvent.click(pokemonTypeButton);
      for (let i = 0; i < pokemons.length; i += 1) {
        expect(getByTestId('pokemonType').innerHTML).toBe(pokemonTypeButton.innerHTML);
        fireEvent.click(nextPokemonBtn);
      }
    });
  });

  test('A Pokédex deve conter um botão para resetar o filtro', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const nextPokemonBtn = getByTestId('next-pokemon');
    const allPokemons = getByText('All');
    fireEvent.click(allPokemons);
    pokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(nextPokemonBtn);
    });
  });

  test('A Pokédex deve gerar, dinamicamente, um botão de filtro para cada tipo de pokémon', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const allPokemonTypesBtns = getAllByTestId('pokemon-type-button');
    const allPokemonTypes = pokemons.map(pokemon => pokemon.type);
    allPokemonTypes.forEach(pokemonType => {
      expect(allPokemonTypesBtns.some(btn => btn.innerHTML === pokemonType)).toBe(true);
    });
  });

  test('O botão de Próximo pokémon deve ser desabilitado se a lista filtrada de pokémons tiver um só pokémon', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const nextPokemonBtn = getByTestId('next-pokemon');
    const bugPokemonType = getByText('Bug');
    fireEvent.click(bugPokemonType);
    expect(nextPokemonBtn.disabled).toBe(true);
  });
});
