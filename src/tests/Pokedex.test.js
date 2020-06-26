import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from '../services/renderWithRouter';

describe('it tests Pokedex file', () => {

  const pokemons = [
    { id: 1, name: 'Pikachu', type: 'Electric',
      averageWeight: { value: '6.0', measurementUnit: 'kg' } },
    { id: 2, name: 'Charmander', type: 'Fire',
      averageWeight: { value: '8.5', measurementUnit: 'kg' } },
  ];
  const isPokemonFavoriteById = { 1: true, 2: false };

  test('it tests button Next Pokemon', () => {
    const { getByTestId, getByText } = renderWithRouter(<Pokedex pokemons={pokemons}
      isPokemonFavoriteById={isPokemonFavoriteById} />);
    const btnNext = getByTestId('next-pokemon');
    expect(btnNext.textContent).toBe('Próximo pokémon');

    pokemons.forEach((pokemon, i) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(btnNext);
      if (i === pokemons.length - 1) {
        expect(getByText(pokemons[0].name)).toBeInTheDocument();
      }
    });
  });

  test('it tests filter buttons', () => {
    const { getByTestId, getByText, container } = renderWithRouter(<Pokedex pokemons={pokemons}
      isPokemonFavoriteById={isPokemonFavoriteById} />);

    expect(container.querySelectorAll('.filter-button')).toBeTruthy();
    fireEvent.click(getByText('Fire'));
    pokemons.forEach(() => {
      expect(getByTestId('pokemonType').innerHTML).toBe('Fire');
      fireEvent.click(getByText('Próximo pokémon'));
    });
  });

  test("it tests the All button", () => {
    const { getByText, container } = renderWithRouter(<Pokedex pokemons={pokemons}
      isPokemonFavoriteById={isPokemonFavoriteById} />);

    fireEvent.click(getByText('All'));
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
    });
  });

  test('it tests one pokemon at a time', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<Pokedex pokemons={pokemons}
      isPokemonFavoriteById={isPokemonFavoriteById} />);

    expect(getAllByTestId('pokemon-name').length).toBe(1);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      expect(getAllByTestId('pokemon-name').length).toBe(1);
      fireEvent.click(getByText('Próximo pokémon'));
    });
  });

});
