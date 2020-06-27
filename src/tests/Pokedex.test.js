import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

afterEach(cleanup);

describe('Pokedex tests', () => {
  const favorite = { 25: false };
  test('Checks for the H2.', () => {
    const { container } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorite} />,
    );
    expect(container.querySelector('h2').innerHTML).toBe('Encountered pokémons');
  });

  test('Checks for the "Next" button.', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorite} />,
    );
    expect(getByText(/Próximo pokémon/i)).toBeDefined();
  });

  test('Advancing to the next pokemon.', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorite} />,
    );
    pokemons.forEach(({ name }, indice) => {
      expect(getByText(name)).toBeDefined();
      fireEvent.click(getByText(/Próximo pokémon/i));
      if (pokemons.length - 1 === indice) {
        expect(getByText(/Pikachu/i)).toBeDefined();
      }
    });
  });

  test('Only one pokemon should be showed in on the screen.', () => {
    const { container } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorite} />,
    );
    expect(container.querySelectorAll('div.pokemon').length).toBe(1);
  });

  test('The Pokédex should contain filter buttons.', () => {
    const { container } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorite} />,
    );

    const filterButtons = container.querySelectorAll('.filter-button');
    filterButtons.forEach((btn) => {
      expect(btn).toBeDefined();
    });
  });

  test('Listing pokemons only of one type', () => {
    const type = 'Psychic';
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorite} />,
    );
    fireEvent.click(getByText(type));
    expect(getByTestId('pokemonType').innerHTML).toBe(type);
    fireEvent.click(getByText('Próximo pokémon'));
    expect(getByTestId('pokemonType').innerHTML).toBe(type);
  });

  test('Should contain a reset button with text All', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorite} />,
    );
    expect(getByText(/All/i)).toBeDefined();
  });

  test('Should return to enable the Next button for all pokemons.', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorite} />,
    );
    fireEvent.click(getByText(/All/i));
    pokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeDefined();
      fireEvent.click(getByText(/Próximo pokémon/i));
    });
  });

  test('Should return to enable the Next button for all pokemons.', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={favorite} />,
    );
    pokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(getByText(/Próximo pokémon/i));
    });
  });
});
