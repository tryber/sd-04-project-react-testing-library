import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../services/renderWithRouter';

describe('PokemonDetails', () => {
  test('show pokemon name', () => {
    pokemons.forEach(({ name, id }) => {
      const { getByText, container } = renderWithRouter(<App />, { route: `/pokemons/${id}` });
      expect(getByText(name)).toBeInTheDocument();
      expect(container.querySelector('section.pokemon-details a')).toBeFalsy();
      expect(getByText('Summary').tagName).toBe('H2');
      expect(container.querySelector('section > p').innerHTML).toMatch('Pokémon');
    });
  });
});
