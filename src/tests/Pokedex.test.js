import React from 'react';
import { fireEvent, cleanup, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('Pokedex component tests', () => {
  it('if clicked, next button should display the next pokemon on the list', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const pokemonNames = pokemons.map(pokemon => pokemon.name);
    const button = getByTestId('next-pokemon');
    expect(button).toBeInTheDocument();
    expect(button.textContent).toBe('Próximo pokémon');

    pokemonNames.forEach((name, i) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(button);

      if (i === pokemonNames.length - 1) {
        expect(getByText(pokemonNames[0])).toBeInTheDocument();
      }
    })
  });

  it('should render only one pokémon at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });
});
