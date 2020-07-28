import React from 'react';
import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Tests - PokemonDetails.js', () => {
  test('Pokemon', () => {
    pokemons.forEach(({ id, name, foundAt: [{ map: map1 }], summary }) => {
      const { getByText, getAllByAltText, container, getAllByText } = renderWithRouter(<App />, { route: `/pokemons/${id}` });
      expect(getByText(`Game Locations of ${name}`)).toBeInTheDocument();
      expect(getAllByAltText(`${name} location`)).toBeTruthy();
      expect(container.querySelector('div.pokemon-habitat img').src).toBe(`${map1}`);
      expect(getAllByText('Summary')).toBeTruthy();
      expect(getByText(summary)).toBeInTheDocument();
      expect(getByText(`${name} Details`)).toBeInTheDocument();
      expect(container.querySelector('form.favorite-form label').textContent).toBe('Pokémon favoritado?');
    });
  });
});
