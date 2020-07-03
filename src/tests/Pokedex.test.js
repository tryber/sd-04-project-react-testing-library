import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import App from '../App';
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
  expect(container.querySelectorAll('div.pokemon').length).toBe(1);
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
  const type = 'Psychic';
  const favorite = { 25: false };
  const { getByText, getByTestId } = renderWithRouter(
    <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorite} />,
  );
  fireEvent.click(getByText('Psychic'));
  expect(getByTestId('pokemonType').innerHTML).toBe(type);
  fireEvent.click(getByText('Próximo pokémon'));
  expect(getByTestId('pokemonType').innerHTML).toBe(type);
});

test('testing `pokemon-type-button`', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  expect(getAllByTestId(/pokemon-type-button/i)).toBeDefined();
});

  test('There is filter buttons', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  expect(getAllByTestId('pokemon-type-button')).toBeTruthy();
});

test('testing `Encountered pokémons`', () => {
  const favorite = { 25: false };
  const { container } = renderWithRouter(
    <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorite} />,
  );
  expect(container.querySelector('h2').innerHTML).toBe('Encountered pokémons');
});
