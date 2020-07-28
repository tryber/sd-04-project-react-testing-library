// import { fireEvent, within } from '@testing-library/react';
import React from 'react';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Tests - Pokemons.js', () => {
  test('Pokemon', () => {
    pokemons.forEach((id, name) => {
      const { getByText } = renderWithRouter(<App />, { route: `/pokemons/${id}`});
      const summary = getByText('Summary');
      const pkm = getByText(name);
      expect(summary).toBeInTheDocument();
      expect(pkm).toBeInTheDocument();
    });
  });
})
