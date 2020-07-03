import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import pokemons from '../data';

afterEach(cleanup);

describe('7. Tests of the PokemonDetails.js file', () => {
  test('testind the route', () => {
    const { getByText, history } = renderWithRouter(<App />, {
      route: `/pokemons/${pokemons[0].id}`,
    });
    history.push(`/pokemons/${pokemons[0].id}`);
  });
});
