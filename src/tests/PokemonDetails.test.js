// import { fireEvent, within } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Tests - PokemonDetails.js', () => {
  test('Pokemon', () => {
    pokemons.forEach(({ id, name, foundAt: [{map: map1}] }) => {
      const { getByText, getByAltText, getAllByAltText, container } = renderWithRouter(<App />, { route: `/pokemons/${id}` });
      expect(getByText(`Game Locations of ${name}`)).toBeInTheDocument();
      expect(getAllByAltText(`${name} location`)).toBeTruthy();
      expect(container.querySelector('div.pokemon-habitat img').src).toBe(`${map1}`);

    });
  });
});
