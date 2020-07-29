import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Test Pokedex.js', () => {
  test('it tests heading', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  test('Next Pokemon Button', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
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
    const { getByTestId, getByText, getAllByTestId } = renderWithRouter(<App />);

    expect(getAllByTestId('pokemon-type-button')).toBeTruthy();
    fireEvent.click(getByText('Fire'));
    pokemons.forEach(() => {
      expect(getByTestId('pokemonType').innerHTML).toBe('Fire');
      fireEvent.click(getByText('Próximo pokémon'));
    });
  });

  test('it tests the All button', () => {
    const { getByText } = renderWithRouter(<App />);

    fireEvent.click(getByText('All'));
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
    });
  });

  test('it tests one pokemon at a time', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);

    expect(getAllByTestId('pokemon-name').length).toBe(1);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
      expect(getAllByTestId('pokemon-name').length).toBe(1);
    });
  });
});
