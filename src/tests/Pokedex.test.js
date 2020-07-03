import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

import App from '../App';

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
