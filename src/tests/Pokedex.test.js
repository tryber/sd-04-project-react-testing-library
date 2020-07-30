import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokémon.js - When pressing the next button, the page should display the next pokémon in the list', () => {
  test('The button should contain the text "Próximo pokémon"', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('next-pokemon')).toHaveTextContent('Próximo pokémon');
  });

  test('Successive clicks on the button should show the next Pokémon in the list', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });

  test('When reaching the last Pokémon on the list, the Pokédex must return to the first Pokémon at the press of the button', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    for (let i = 0; i < pokemons.length; i += 1) {
      fireEvent.click(getByTestId('next-pokemon'));
    }
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});

test('Pokédex must display only one Pokémon at a time', () => {
  const { getAllByTestId } = renderWithRouter(<App />);
  expect(getAllByTestId('pokemon-name').length).toBe(1);
});

describe('The Pokédex must contain filter buttons', () => {
  test('From the selection of a type button, the Pokédex should only circulate through the Pokémon of that type', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const pokeTypeBtn = getAllByTestId('pokemon-type-button')[2];
    fireEvent.click(pokeTypeBtn);

    const pokeType = getByTestId('pokemonType').textContent;
    expect(pokeTypeBtn.textContent).toBe(pokeType);
  });
});

describe('The Pokédex must contain a button to reset the filter', () => {
  test('The button text must be `All`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('All')).toBeInTheDocument();
  });

  test('After clicking it, the Pokédex must circulate again through all pokémon', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText('All'));
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });

  test('When the page loads, the selected filter must be All', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });
});

describe('The Pokédex should dynamically generate a filter button for each type of Pokémon', () => {
  test('The filter buttons must be dynamic', () => {
    const pokemonTypes = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const allBtnTypes = getAllByTestId('pokemon-type-button').map((btn) => btn.textContent);
    const allBtn = getByText('All');

    expect(allBtnTypes).toEqual(pokemonTypes);
    expect(allBtn).toBeInTheDocument();
  });
});

test('The "Próximo pokémon" button should be disabled if the filtered list of Pokémon has only one Pokémon', () => {
  const { getByText, getByTestId } = renderWithRouter(<App />);
  fireEvent.click(getByText(/Dragon/i));
  expect(getByText(/Dragonair/i)).toBeInTheDocument();
  expect(getByTestId('next-pokemon').disabled).toBeTruthy();
});

test('The page must to have a h2 element with the "Encountered pokémons" text', () => {
  const { getByText } = renderWithRouter(<App />);
  const h2 = document.querySelector('h2');
  const heading = getByText('Encountered pokémons');
  expect(h2).toBeInTheDocument();
  expect(heading).toBeInTheDocument();
});
