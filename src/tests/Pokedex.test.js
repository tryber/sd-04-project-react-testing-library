import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';

afterEach(cleanup);

describe('Pokedex component tests', () => {
  test('???', () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const heading = getByText(/Encountered pokémons/);
    const typeBtns = getAllByTestId('pokemon-type-button');
    expect(heading).toBeInTheDocument();
    typeBtns.forEach((but) => {
      expect(but).toBeInTheDocument();
      expect(but.textContent).not.toBe('');
    });
  });

  describe('Next button tests', () => {
    it('should contain `Próximo pokémon` text', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const nextBtn = getByTestId('next-pokemon');
      expect(nextBtn.textContent).toBe('Próximo pokémon');
    });

    it('subsequent clicks to button should always display the next pokémon', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const nextBtn = getByTestId('next-pokemon');

      pokemons.forEach((pokemon) => {
        expect(getByTestId('pokemon-name').textContent).toBe(pokemon.name);
        fireEvent.click(nextBtn);
      });
    });

    it('on the last pokémon, clicking the button should display the first pokémon', () => {
      const { getByTestId } = renderWithRouter(<App />);
      const nextBtn = getByTestId('next-pokemon');

      pokemons.forEach((pokemon, i) => {
        if (i === pokemons.length - 1) {
          fireEvent.click(nextBtn);
          expect(getByTestId('pokemon-name').textContent).toBe(pokemons[0].name);
        } else fireEvent.click(nextBtn);
      });
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

      pokemons.forEach((pokemon) => {
        getAllByTestId('pokemon-type-button').forEach((button) => {
          if (button.textContent === pokemon.type) {
            expect(button.textContent).toBe(pokemon.type);
          }
        });
      });
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

  it('type buttons should be dynamically rendered', () => {
    const { getAllByTestId, getByText } = renderWithRouter(<App />);

    pokemons.forEach((pokemon) => {
      getAllByTestId('pokemon-type-button').forEach((button) => {
        if (button.textContent === pokemon.type) {
          expect(button).toBeInTheDocument();
          expect(getByText('All')).toBeInTheDocument();
        }
      });
    });
  });

  it('should disable next button if only one pokemon of a type is rendered', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const pokemonTypes = pokemons.reduce((acc, { type }) => {
      if (acc[type]) acc[type] += 1;
      else acc[type] = 1;
      return acc;
    }, {});
    const singlePokemon = Object.entries(pokemonTypes).find((type) => type[1] === 1);

    getAllByTestId('pokemon-type-button').forEach((button) => {
      if (button.textContent === singlePokemon[0]) {
        fireEvent.click(button);
        expect(getByTestId('next-pokemon')).toBeDisabled();
      }
    });
  });
});
