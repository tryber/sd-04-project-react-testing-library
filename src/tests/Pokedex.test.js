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
}
