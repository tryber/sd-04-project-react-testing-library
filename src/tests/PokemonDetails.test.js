import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../services/renderWithRouter';

describe('PokemonDetails', () => {
  test('show pokemon name', () => {
    pokemons.forEach(({ name, id }) => {
      const { getByText } = renderWithRouter(<App />, { route: `/pokemons/${id}` });
      expect(getByText(name)).toBeInTheDocument();
    });
  });
});
