import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { Pokedex } from '../components';
import { pokemons, isPokemonFavoriteById } from './mockedData';

describe('Requirement 5', () => {
  test('Button `Próximo pokémon` should show next pokemon in the list`', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );
    expect(getByTestId('pokemon-name').textContent).toBe('Dragonair');
    const nextPokemonButton = getByText('Próximo pokémon');
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemon-name').textContent).toBe('Charmander');
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemon-name').textContent).toBe('Mew');
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemon-name').textContent).toBe('Dragonair');
  });


  test('Pokedex should show only one pokemon', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  test('Contain all filters buttons and `all` button to reset', () => {
    const { getAllByTestId, getByTestId, getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );
    const pokemonTypeButtons = getAllByTestId('pokemon-type-button');
    expect(pokemonTypeButtons.length).toBe(3);
    expect(pokemonTypeButtons[0].textContent).toBe('Dragon');
    expect(pokemonTypeButtons[1].textContent).toBe('Fire');
    fireEvent.click(pokemonTypeButtons[1]);
    expect(getByTestId('pokemon-name').textContent).toBe('Charmander');
    const nextPokemonButton = getByText('Próximo pokémon');
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemon-name').textContent).toBe('Charmander');
    fireEvent.click(getByText('All'));
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemon-name').textContent).toBe('Charmander');
    expect(getByTestId('pokemonType').textContent).toBe('Fire');
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemon-name').textContent).toBe('Mew');
    expect(getByTestId('pokemonType').textContent).toBe('Psychic');
    fireEvent.click(nextPokemonButton);
    expect(getByTestId('pokemon-name').textContent).toBe('Dragonair');
    expect(getByTestId('pokemonType').textContent).toBe('Dragon');
  });

  test('Button `Próximo pokémon` should be disabled if there is only one pokemon in list', () => {
    const { getByText, getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );
    fireEvent.click(getAllByTestId('pokemon-type-button')[0]);
    const nextPokemonButton = getByText('Próximo pokémon');
    expect(nextPokemonButton).toBeDisabled();
  });

  test('Contain a h2 heading with "Encountered pokémons" text', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={pokemons} isPokemonFavoriteById={isPokemonFavoriteById} />,
    );
    const heading = getByText('Encountered pokémons');
    expect(heading).toBeInTheDocument();
    expect(heading.tagName).toBe('H2');
  });
});
