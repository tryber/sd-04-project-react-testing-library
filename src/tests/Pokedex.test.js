import React from 'react';
import { fireEvent, cleanup, getByText, getByTestId, getByRole } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('Pokedex component tests', () => {
  describe('Next button tests', () => {
    it('should contain `Próximo pokémon` text', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const nextBtn = getByTestId('next-pokemon');
      expect(nextBtn.textContent).toBe('Próximo pokémon');
    });

    it('subsequent clicks to button should always display the next pokémon', () => {
      const { getByTestId, getByText } = renderWithRouter(<App />);
      const nextBtn = getByTestId('next-pokemon');

      pokemons.forEach(pokemon => {
        expect(getByTestId('pokemon-name').textContent).toBe(pokemon.name);
        fireEvent.click(nextBtn);
      })
    });

    it('on the last pokémon, clicking the button should display the first pokémon', () => {
      const { getByTestId, getByText } = renderWithRouter(<App />);
      const nextBtn = getByTestId('next-pokemon');

      pokemons.forEach((pokemon, i) => {
        if (i === pokemons.length - 1) {
          fireEvent.click(nextBtn);
          expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
        } else fireEvent.click(nextBtn);
      })
    });
  });

  it('should render only one pokémon at a time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-name').length).toBe(1);
  });

  describe('Type buttons tests', () => {
    it('Pokédex should only render pokemons of selected type', () => {
      const { getAllByTestId, getByTestId } = renderWithRouter(<App />);

      getAllByTestId('pokemon-type-button').forEach((button) => {
        fireEvent.click(button);
        const pokemonType = getByTestId('pokemonType');
        expect(button.textContent).toBe(pokemonType.textContent);
      });
    });

    it('type buttons should contain own type name', () => {
      const { getAllByTestId } = renderWithRouter(<App />);

      pokemons.forEach(pokemon => {
        getAllByTestId('pokemon-type-button').forEach((button) => {
          if (button.textContent === pokemon.type)
            expect(button.textContent).toBe(pokemon.type);
        });
      })
    });
  });

  describe('All (reset) types button tests', () => {
    it('should contain `All` text', () => {
      const { getByText } = renderWithRouter(<App />);
      expect(getByText('All').type).toBe('button');
    });

    it('if clicked, should reset pokemons filtering by type', () => {
      const { getByText, getAllByTestId, getByTestId } = renderWithRouter(<App />);
      const allBtn = getByText('All');
      const electricBtn = getAllByTestId('pokemon-type-button')[0];
      const nextBtn = getByTestId('next-pokemon');

      fireEvent.click(electricBtn);
      expect(nextBtn).toBeDisabled();
      fireEvent.click(allBtn);
      expect(nextBtn).toBeEnabled();
    });
  });
});
