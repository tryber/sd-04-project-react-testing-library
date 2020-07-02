import React from 'react';
import { cleanup, screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import data from '../data';

afterEach(cleanup);

describe('5. Tests of the Pokedex.js file', () => {
  test('When pressing the next button, the button should contain the text Next pokémon.', () => {
    renderWithRouter(<App />);

    const nextPokemon = screen.getByText(/Próximo pokémon/i);
    expect(nextPokemon).toBeInTheDocument();

    const buttonAll = screen.getByText('All');
    expect(buttonAll).toBeInTheDocument();
    fireEvent.click(buttonAll);

    data.forEach((element) => {
      const namePokemon = screen.getByTestId('pokemon-name');
      expect(namePokemon).toBeInTheDocument(element.name);
      fireEvent.click(nextPokemon);
    });
  });

  test('Pokédex must display only one Pokémon at a time.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getAllByText('More details');
    expect(moreDetails.length).toBe(1);

    const encounteredPok = screen.getByText('Encountered pokémons');
    expect(encounteredPok).toBeInTheDocument();
  });

  test('The Pokédex must contain filter buttons.', () => {
    renderWithRouter(<App />);

    const filterButton = screen.getAllByText(
      'All',
      'Eletric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    );
    filterButton.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  test('Filter Pokemons by type.', () => {
    renderWithRouter(<App />);

    const filterButton = screen.getAllByTestId('pokemon-type-button');
    const nextPokemonButton = screen.getByText('Próximo pokémon');

    expect(filterButton[1]).toContainHTML('Fire');
    fireEvent.click(filterButton[1]);
    expect(nextPokemonButton).toBeEnabled();
    fireEvent.click(nextPokemonButton);
    expect(screen.getByTestId('pokemonType')).toContainHTML('Fire');
  });
});
