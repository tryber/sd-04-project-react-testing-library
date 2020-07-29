import React from 'react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Across the Pokedetails', () => {
  pokemons.forEach((pokemon) => {
    test('Show the information about the selected pokedude', () => {
      const { getByText, queryByText } = renderWithRouter(<App />, {
        route: `/pokemons/${pokemon.id}`,
      });
    
      expect(getByText(`${pokemon.name} Details`)).toBeInTheDocument();
      expect(queryByText(/More Details/i)).not.toBeInTheDocument();
      expect(getByText('Summary').tagName).toBe('H2');
      expect(getByText(pokemon.summary)).toBeInTheDocument();
      expect(getByText('Pokémon favoritado')).toBeInTheDocument();
      expect(getByText(`Game Locations of ${pokemon.name}`)).toBeInTheDocument();
    });