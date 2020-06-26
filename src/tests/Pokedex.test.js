import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Pokédex', () => {
  test('Contains the heading "Encountered pokémons"', () => {
    const { container } = renderWithRouter(<App />);
    expect(container.querySelector('h2').innerHTML).toBe('Encountered pokémons');
  });

  test('Button with text "Próximo pokémon"', () => {
    const { getByText } = renderWithRouter(<App />);
    expect(getByText('Próximo pokémon').type).toBe('button');
  });

  test('Próximo pokémon button change for the next pokemon, and after last start again', () => {
    const { getByText } = renderWithRouter(<App />);
    pokemons.forEach(({ name }, index) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
      if (index === pokemons.length - 1) {
        expect(getByText(pokemons[0].name)).toBeInTheDocument();
      }
    });
  });

  test('One pokemon each time', () => {
    const { container } = renderWithRouter(<App />);
    expect(container.querySelectorAll('div.pokemon').length).toBe(1);
  });

  test('There is filter buttons', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    expect(getAllByTestId('pokemon-type-button')).toBeTruthy();
  });

  test('Filter buttons filters', () => {
    const { getByText, getByTestId } = renderWithRouter(<App />);
    fireEvent.click(getByText('Psychic'));
    pokemons.forEach(() => {
      expect(getByTestId('pokemonType').innerHTML).toBe('Psychic');
      fireEvent.click(getByText('Próximo pokémon'));
    });
  });

  test("All button doesn't filter", () => {
    const { getByText } = renderWithRouter(<App />);
    fireEvent.click(getByText('All'));
    pokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
    });
  });

  test('start at no filter', () => {
    const { getByText, container } = renderWithRouter(<App />);
    fireEvent.load(container);
    pokemons.forEach(({ name }) => {
      expect(getByText(name)).toBeInTheDocument();
      fireEvent.click(getByText('Próximo pokémon'));
    });
  });

  test('create de type buttons dinamically', () => {});
});
