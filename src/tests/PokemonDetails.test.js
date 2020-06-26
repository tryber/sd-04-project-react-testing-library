import React from 'react';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../services/renderWithRouter';

describe('it tests PokemonDetails page', () => {
  pokemons.forEach(({ id, name, summary, foundAt }) => {
    test('show pokemon details', () => {
      const { getByText, getAllByAltText } = renderWithRouter(<App />, {
        route: `/pokemons/${id}`,
      });

      const pokemonLocation = getAllByAltText(`${name} location`);
      expect(getByText(`${name} Details`)).toBeInTheDocument();
      expect(getByText('Summary')).toBeInTheDocument();
      expect(getByText(summary)).toBeInTheDocument();
      expect(getByText('Pokémon favoritado?')).toBeInTheDocument();
      expect(getByText(`Game Locations of ${name}`)).toBeInTheDocument();
      foundAt.forEach(({ location, map }) => {
        expect(getByText(location)).toBeInTheDocument();
        expect(pokemonLocation.some(({ src }) => src === map)).toBeTruthy();
      });
    });
  });
});
