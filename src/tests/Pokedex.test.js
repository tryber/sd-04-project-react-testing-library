import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

const PokemonsByType = pokemons.reduce((acc, pokemon) => {
  if (!acc[pokemon.type]) acc[pokemon.type] = [];
  if (acc[pokemon.type]) {
    acc[pokemon.type].push(pokemon);
    return acc;
  }
  return acc;
}, {});

const types = Object.keys(PokemonsByType);

describe('Pokedex', () => {
  test('Ao apertar o botão de próximo, a página deve exibir o próximo pokémon da lista', () => {
    const { getByTestId } = renderWithRouter(<App />);
    const btnOfProx = getByTestId('next-pokemon');
    const pokemonName = getByTestId('pokemon-name');
    expect(btnOfProx).toBeInTheDocument();
    expect(btnOfProx.textContent).toBe('Próximo pokémon');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.textContent).toBe(pokemons[0].name);
    fireEvent.click(btnOfProx);
    expect(pokemonName.textContent).toBe(pokemons[1].name);
    for (let i = 1; i < 9; i += 1) {
      fireEvent.click(btnOfProx);
    }
    expect(pokemonName.textContent).toBe(pokemons[0].name);
    // console.log(pokemonName.textContent);
    // logDOM();
  });

  test('A Pokédex deve exibir apenas um pokémon por vez', () => {
    const { getByTestId, queryByText } = renderWithRouter(<App />);
    const pokemonName = getByTestId('pokemon-name');
    const pokemonName2 = queryByText(pokemons[1].name);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName.textContent).toBe(pokemons[0].name);
    expect(pokemonName2).not.toBeInTheDocument();
  });

  test('A Pokédex deve conter botões de filtro', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const buttonsOfTypes = getAllByTestId('pokemon-type-button');
    const btnOfProx = getByTestId('next-pokemon');
    // verifica os botões, texto dos botoẽs e funcionalidade
    buttonsOfTypes.forEach((button, index) => {
      // testa o texto do botão de tipo
      expect(button).toBeInTheDocument();
      expect(button.textContent).toBe(types[index]);
      // clica no botão de tipo e pega o primeiro pokemom
      fireEvent.click(button);
      console.log('clickei no tipo');
      const firstPokemom = getByTestId('pokemon-name');
      expect(firstPokemom).toBeInTheDocument();
      console.log(firstPokemom.textContent);
      // testa se todos os pokemons estão mesmo com o tipo certo
      if (!btnOfProx.disabled) {
        PokemonsByType[types[index]].forEach((pokemon) => {
          const renderedPokemon = getByTestId('pokemon-name');
          expect(renderedPokemon).toBeInTheDocument();
          expect(renderedPokemon.textContent).toBe(pokemon.name);
          expect(pokemon.type).toBe(button.textContent);
          fireEvent.click(btnOfProx);
          console.log('clickei em proximo');
        });
        // testa se voltou para o primeiro pokemom depois do loop
        const pokemonAfterLoop = getByTestId('pokemon-name');
        expect(pokemonAfterLoop).toBeInTheDocument();
        expect(pokemonAfterLoop.textContent).toBe(firstPokemom.textContent);
      } else {
        // testa se o botão esta desabilitado caso so tenha um pokemom daquele tipo
        expect(btnOfProx.disabled).toBe(true);
      }
    });
  });
});
