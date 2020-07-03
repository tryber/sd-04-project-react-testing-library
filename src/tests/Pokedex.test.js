import React from 'react';
import { cleanup, fireEvent, getByText } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

import App from '../App';
import { pokemonType } from '../types';
import { Pokedex } from '../components';

describe('Testing Pokedex Page', () => {
  afterEach(cleanup);
  test('checking the `next` button', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText(/Próximo pokémon/i)).toBeDefined();
  });
});

test('Show the next pokemon', () => {
  const { getByText } = renderWithRouter(<App />);

  pokemons.forEach(({ name }, index) => {
    expect(getByText(name)).toBeDefined();
    fireEvent.click(getByText('Próximo pokémon'));
    if (pokemons.length - 1 === index) {
      expect(getByText('Pikachu')).toBeDefined();
    }
  });
});

test('The screen should show just one pokemon', () => {
  const { container } = renderWithRouter(<App />);
  expect(container.querySelectorAll('.pokemon').length).toBe(1);
});

test('Filter buttons of Pokedex', () => {
  const { getByText } = renderWithRouter(<App />);
  expect(getByText('All')).toBeDefined();
});

test('Pokemon type button', () => {
  renderWithRouter(<App />);
  expect(document.querySelector('pokemon-type-button')).toBeDefined();
});

test('One type pokemons', () => {
  const favorite = { 25: false };
  const type = 'Psychic';
  const { getByTestId, getByText } = renderWithRouter(
    <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorite} />,
  );
  fireEvent.click(getByText(type));
  expect(getByTestId('pokemonType').innerHTML).toBe(type);
});
