import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';
import App from '../App';
// test('', () => {});

describe('Testing file Pokedex.js', () => {
  test('heading', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Encountered Pokémons/i)).toBeInTheDocument();
  });

  test('button Next changes the Pokémon', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    const nextButton = getByTestId('next-pokemon');
    expect(nextButton.textContent).toBe('Próximo pokémon');

    pokemons.forEach((pokemon, i) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(nextButton);
      if (i === pokemons.length - 1) expect(getByText(pokemons[0].name)).toBeInTheDocument();
    });
  });

  test('single pokémon', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
      expect(getAllByTestId('pokemon-name').length).toBe(1);
    });
  });

  test('filter buttons', () => {
    const { getByText, getAllByTestId, getByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-type-button')).toBeTruthy();
    fireEvent.click(getByText('Fire'));
    pokemons.forEach(() => {
      expect(getByTestId('pokemonType').innerHTML).toBe('Fire');
      fireEvent.click(getByText('Próximo pokémon'));
    });
  });

  test('reset button', () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('All'));
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
    });
  });
});
