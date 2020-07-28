// import { fireEvent, within } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Tests - PokemonDetails.js', () => {
  test('Pokemon', () => {
    pokemons.forEach(({ id, name }) => {
      const { getByText, queryAllByText } = renderWithRouter(<App />, { route: `/pokemons/${id}` });
      const summary = queryAllByText('Summary');
      const pkm = getByText(name);
      expect(summary).toBeTruthy();
      expect(pkm).toBeInTheDocument();
    });
  });
});
