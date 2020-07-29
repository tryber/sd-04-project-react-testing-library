import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

const types = [];
pokemons.forEach((pokemon) => {
  if (!types.includes(pokemon.type)) types.push(pokemon.type);
});

describe('It should show the next Pokemon', () => {
  test('test the button #Próximopokémon', () => {
    const { getByTestId } = renderWithRouter(<App />);
    expect(getByTestId('next-pokemon')).toHaveTextContent('Próximo pokémon');
  });

  test('Button clicks should show the next Pokemon', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });

  test('should return the first Pokemon', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    for (let i = 0; i < 9; i += 1) {
      fireEvent.click(getByTestId('next-pokemon'));
    }
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});

test('display Pokémon at a time', () => {
  const { getAllByTestId, getByText } = renderWithRouter(<App />);
  expect(getAllByTestId('pokemon-name').length).toBe(1);
  expect(getByText('Encountered pokémons')).toBeInTheDocument();
});

describe('testing filter buttons', () => {
  test('embrace only a sort kind of Pokemon', () => {

    const { getByTestId, queryAllByTestId, getByText } = renderWithRouter(<App />);
    const next = getByTestId('next-pokemon');
    const buttons = queryAllByTestId('pokemon-type-button');

    types.forEach((type) => {
      const btn = buttons.find((element) => element.textContent === type);
      fireEvent.click(btn);
      expect(btn).toHaveTextContent(type);

      const pokemonByType = pokemons.filter((pokemon) => pokemon.type === type);
      pokemonByType.forEach((pokemon) => {
        expect(getByText(pokemon.name)).toBeInTheDocument();
        if (!next.disabled) {
          fireEvent.click(next);
        }
      });
    });
  });

  test('The type name #Psychic', () => {
    const { queryAllByTestId, getByTestId } = renderWithRouter(<App />);
    const buttons = queryAllByTestId('pokemon-type-button');
    buttons.forEach((button) => {
      fireEvent.click(button);
      const type = button.textContent;
      const pokemonType = getByTestId('pokemonType').textContent;
      expect(pokemonType).toBe(type);
    });
  });
});

describe('The Pokédex must contain a reset button', () => {
  test('The button text must be `All`', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('All')).toBeInTheDocument();
  });

  test('on a click, Pokédex must embrace all pokemons', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText('All'));
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });

  test('After loads, filter must be #All', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      expect(getByText(pokemon.name)).toBeInTheDocument();
      fireEvent.click(getByTestId('next-pokemon'));
    });
  });
});

test('Disable button if the filtred list of pokes have just one dude', () => {
  const { getByTestId, queryAllByTestId } = renderWithRouter(<App />);
  const next = getByTestId('next-pokemon');
  const buttons = queryAllByTestId('pokemon-type-button');
  types.forEach((type) => {
    const btn = buttons.find((element) => element.textContent === type);
    fireEvent.click(btn);
    const pokemonByType = pokemons.filter((pokemon) => pokemon.type === type);
    pokemonByType.forEach(() => {
      if (pokemonByType.length === 1) {
        expect(next.disabled).toBeTruthy();
      }
    });
  });
});
