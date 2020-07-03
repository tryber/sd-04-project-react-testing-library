import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

describe('7. Tests of the PokemonDetails.js file', () => {
  test('testind the route', () => {
    const { history, getByText } = renderWithRouter(<App />, {
      route: `/pokemons/${pokemons[0].id}`,
    });
    history.push(`/pokemons/${pokemons[0].id}`);

    const phrase = getByText(`Game Locations of ${pokemons[0].name}`);
    expect(phrase).toBeDefined();
  });
});
