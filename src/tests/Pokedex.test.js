import React from 'react';
import { fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

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
});
