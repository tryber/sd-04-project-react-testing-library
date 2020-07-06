import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderwithRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';
import Pokemons from '../data';

const pokemonsNames = Pokemons.map((pokemon) => pokemon.name);

describe('Next Button', () => {
  test('should contain "Próximo pokemon" button', () => {
    const { getByTestId } = renderWithRouter(<App />, { route: '/' });
    const nextButton = getByTestId('next-pokemon');

    expect(nextButton).toBeInTheDocument();
    expect(nextButton.tagName).toBe('BUTTON');
    expect(nextButton.textContent).toBe('Próximo pokémon');
  });

  test('should render next pokemon on click', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />, { route: '/' });
    const nextButton = getByTestId('next-pokemon');

    pokemonsNames.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });

  test('should go back to first pokemon after the last one', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />, { route: '/' });
    const nextButton = getByTestId('next-pokemon');

    pokemonsNames.forEach(() => fireEvent.click(nextButton));

    expect(getByText(pokemonsNames[0])).toBeInTheDocument();
  });
});

describe('Pokémon view', () => {
  test('should render only one pokemon', () => {
    const { getByTestId } = renderWithRouter(<App />, { route: '/' });
    const nextButton = getByTestId('next-pokemon');
    let pokemons = [];

    pokemons = document.querySelectorAll('.pokemon');
    expect(pokemons.length).toBe(1);
    fireEvent.click(nextButton);
    pokemons = document.querySelectorAll('.pokemon');
    expect(pokemons.length).toBe(1);
  });
});

describe('filter buttons', () => {
  test('should render type buttons based on avaible pokemons types', () => {
    // let { fetchPokemonTypes } = Pokedex.prototype;
    // fetchPokemonTypes = jest.fn();
    // fetchPokemonTypes.mockReturnValueOnce(['Eletric']);
    const types = ['Eletric', 'Psychic'];
    jest.spyOn(Pokedex.prototype, 'fetchPokemonTypes').mockReturnValueOnce(types);

    const { getAllByTestId } = renderWithRouter(<App />, { route: '/' });
    const typeButtons = getAllByTestId('pokemon-type-button');

    expect(typeButtons.length).toBe(2);
    typeButtons.forEach((button) => {
      expect(types).toContain(button.textContent);
    });
  });

  test('should render only pokemons filtered by type', () => {
    const { getAllByTestId, getByTestId, getByText } = renderWithRouter(<App />, { route: '/' });
    const nextButton = getByTestId('next-pokemon');
    const typeButtons = getAllByTestId('pokemon-type-button');

    const filteredPokemonsByType = Pokemons.filter(
      (pokemon) => pokemon.type === typeButtons[0].textContent
    );

    fireEvent.click(typeButtons[0]);
    filteredPokemonsByType.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      expect(typeButtons[0].textContent).toBe(pokemon.type);
      fireEvent.click(nextButton);
    });
  });
});

describe('Reset button', () => {
  test('should have a button with "All" text', () => {
    const { getByText } = renderWithRouter(<App />, { route: '/' });
    const allButton = getByText(/All/i);

    expect(allButton).toBeInTheDocument();
    expect(allButton.tagName).toBe('BUTTON');
  });

  test('should clear filters on click', () => {
    const { getAllByTestId, getByTestId, getByText } = renderWithRouter(<App />, { route: '/' });
    const nextButton = getByTestId('next-pokemon');
    const typeButtons = getAllByTestId('pokemon-type-button');
    const allButton = getByText(/All/i);

    fireEvent.click(typeButtons[0]);
    fireEvent.click(allButton);

    pokemonsNames.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });

  test('should have no filter after component mount', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />, { route: '/' });
    const nextButton = getByTestId('next-pokemon');

    pokemonsNames.forEach((name) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(nextButton);
    });
  });
});

describe('Next Button state', () => {
  beforeEach(cleanup);
  test('should disable next button with only one pokemon is avaible', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />, { route: '/' });
    const nextButton = getByTestId('next-pokemon');
    const typeButton = getByText('Poison');

    fireEvent.click(typeButton);
    expect(nextButton).toBeDisabled();
  });
});
